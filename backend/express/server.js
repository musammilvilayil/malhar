const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');
const connectDB = require('./src/config/db');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'change-me';
const JWT_EXPIRE_MINUTES = Number(process.env.JWT_EXPIRE_MINUTES || '720');
const APP_NAME = 'malhar';
const STORAGE_BASE = (process.env.INTEGRATION_PROXY_URL || '').trim() || 'https://integrations.emergentagent.com';
const STORAGE_URL = `${STORAGE_BASE.replace(/\/+$/, '')}/objstore/api/v1/storage`;
const EMERGENT_KEY = process.env.EMERGENT_LLM_KEY;
const MIME_TYPES = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
};

let storageKey = null;
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const nowIso = () => new Date().toISOString();
const slugify = (value) => {
  const slug = String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return slug || require('crypto').randomUUID().slice(0, 8);
};
const hashPassword = (password) => bcrypt.hashSync(password, 10);
const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

const initStorage = async (force = false) => {
  if (!EMERGENT_KEY) {
    throw new Error('INTEGRATION_PROXY_URL or EMERGENT_LLM_KEY must be configured for object storage');
  }

  const resp = await axios.post(`${STORAGE_URL}/init`, { emergent_key: EMERGENT_KEY }, { timeout: 30000 });
  if (resp.status !== 200) {
    throw new Error(`Storage init failed with status ${resp.status}`);
  }

  return resp.data.storage_key;
};

const putObject = async (storagePath, data, contentType, storageKey) => {
  try {
    const resp = await axios.put(`${STORAGE_URL}/objects/${storagePath}`, data, {
      headers: {
        'X-Storage-Key': storageKey,
        'Content-Type': contentType,
      },
      timeout: 120000,
    });
    return resp.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      const retryKey = await initStorage(true);
      const retry = await axios.put(`${STORAGE_URL}/objects/${storagePath}`, data, {
        headers: {
          'X-Storage-Key': retryKey,
          'Content-Type': contentType,
        },
        timeout: 120000,
      });
      return retry.data;
    }
    throw error;
  }
};

const getObject = async (storagePath, storageKey) => {
  try {
    const resp = await axios.get(`${STORAGE_URL}/objects/${storagePath}`, {
      headers: { 'X-Storage-Key': storageKey },
      responseType: 'arraybuffer',
      timeout: 60000,
    });
    return resp.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      const retryKey = await initStorage(true);
      const retry = await axios.get(`${STORAGE_URL}/objects/${storagePath}`, {
        headers: { 'X-Storage-Key': retryKey },
        responseType: 'arraybuffer',
        timeout: 60000,
      });
      return retry.data;
    }
    throw error;
  }
};

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
  },
  { collection: 'admins', versionKey: false }
);
const institutionSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    desc: { type: String, default: '' },
    image: { type: String, default: '' },
    order: { type: Number, required: true },
  },
  { collection: 'institutions', versionKey: false }
);
const instructorSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, default: '' },
    image: { type: String, default: '' },
    bio: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { collection: 'instructors', versionKey: false }
);
const contentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    kind: { type: String, required: true, enum: ['news', 'events', 'gallery'] },
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    body: { type: String, default: '' },
    image_url: { type: String, default: null },
    date: { type: String, default: null },
    location: { type: String, default: null },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    created_at: { type: String, required: true },
  },
  { collection: 'content', versionKey: false }
);
const contactSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    message: { type: String, required: true },
    created_at: { type: String, required: true },
  },
  { collection: 'contacts', versionKey: false }
);
const fileSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    storage_path: { type: String, required: true },
    original_filename: { type: String, required: true },
    content_type: { type: String, required: true },
    size: { type: Number, required: true },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: String, required: true },
  },
  { collection: 'files', versionKey: false }
);

const Admin = mongoose.model('Admin', adminSchema);
const Institution = mongoose.model('Institution', institutionSchema);
const Instructor = mongoose.model('Instructor', instructorSchema);
const Content = mongoose.model('Content', contentSchema);
const Contact = mongoose.model('Contact', contactSchema);
const File = mongoose.model('File', fileSchema);

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload?.sub) {
      throw new Error('Invalid token');
    }

    const admin = await Admin.findOne({ email: payload.sub });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const KINDS = ['news', 'events', 'gallery'];
const FILE_ID_RE = /\/api\/files\/([0-9a-fA-F-]{36})/;

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => res.json({ message: 'Malhar API' }));

apiRouter.get('/institutions', async (req, res) => {
  const institutions = await Institution.find().sort({ order: 1 }).lean();
  res.json(institutions);
});

apiRouter.get('/instructors', async (req, res) => {
  const instructors = await Instructor.find().sort({ order: 1 }).lean();
  res.json(instructors);
});

apiRouter.get('/instructors/:slug', async (req, res) => {
  const instructor = await Instructor.findOne({ slug: req.params.slug }).lean();
  if (!instructor) return res.status(404).json({ error: 'Not found' });
  res.json(instructor);
});

apiRouter.get('/content/:kind', async (req, res) => {
  const { kind } = req.params;
  if (!KINDS.includes(kind)) return res.status(404).json({ error: 'Unknown content type' });

  let query = Content.find({ kind });
  if (kind === 'gallery') {
    query = query.sort({ order: 1, created_at: -1 });
  } else {
    query = query.sort({ created_at: -1 });
  }
  const items = await query.lean();
  res.json(items);
});

apiRouter.post('/contact', async (req, res) => {
  const { name, email, phone = '', message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  const contact = new Contact({ id: require('crypto').randomUUID(), name, email, phone, message, created_at: nowIso() });
  await contact.save();
  res.json({ success: true, message: 'Thank you. Your message has been received.' });
});

apiRouter.get('/files/:fileId', async (req, res) => {
  const file = await File.findOne({ id: req.params.fileId, is_deleted: false }).lean();
  if (!file) return res.status(404).json({ error: 'File not found' });

  try {
    const storageKey = await initStorage();
    const data = await getObject(file.storage_path, storageKey);
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.type(file.content_type || 'application/octet-stream');
    res.send(Buffer.from(data));
  } catch (error) {
    console.error('File fetch error:', error);
    res.status(500).json({ error: 'Failed to retrieve file' });
  }
});

apiRouter.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  const admin = await Admin.findOne({ email });
  if (!admin || !comparePassword(password, admin.password_hash)) {
    return res.status(401).json({ error: 'Incorrect email or password' });
  }

  const token = jwt.sign({ sub: admin.email }, JWT_SECRET, { expiresIn: `${JWT_EXPIRE_MINUTES}m` });
  res.json({ access_token: token, token_type: 'bearer' });
});

apiRouter.get('/admin/me', auth, async (req, res) => {
  res.json({ email: req.admin.email });
});

apiRouter.post('/admin/content/:kind', auth, async (req, res) => {
  const { kind } = req.params;
  if (!KINDS.includes(kind)) return res.status(404).json({ error: 'Unknown content type' });

  const content = new Content({
    id: require('crypto').randomUUID(),
    kind,
    title: req.body.title || '',
    summary: req.body.summary || '',
    body: req.body.body || '',
    image_url: req.body.image_url || null,
    date: req.body.date || null,
    location: req.body.location || null,
    order: req.body.order != null ? req.body.order : kind === 'gallery' ? await Content.countDocuments({ kind: 'gallery' }) : 0,
    published: req.body.published != null ? req.body.published : true,
    created_at: nowIso(),
  });

  await content.save();
  res.status(201).json(content.toObject());
});

apiRouter.put('/admin/content/:kind/:itemId', auth, async (req, res) => {
  const { kind, itemId } = req.params;
  const update = {
    title: req.body.title || '',
    summary: req.body.summary || '',
    body: req.body.body || '',
    image_url: req.body.image_url || null,
    date: req.body.date || null,
    location: req.body.location || null,
    published: req.body.published != null ? req.body.published : true,
  };
  if (req.body.order != null) update.order = req.body.order;

  const content = await Content.findOneAndUpdate({ id: itemId, kind }, update, { new: true }).lean();
  if (!content) return res.status(404).json({ error: 'Not found' });
  res.json(content);
});

apiRouter.delete('/admin/content/:kind/:itemId', auth, async (req, res) => {
  const { kind, itemId } = req.params;
  const content = await Content.findOne({ id: itemId, kind }).lean();
  if (!content) return res.status(404).json({ error: 'Not found' });

  if (kind === 'gallery' && content.image_url) {
    const match = content.image_url.match(FILE_ID_RE);
    if (match) {
      await File.findOneAndUpdate({ id: match[1] }, { is_deleted: true });
    }
  }

  await Content.deleteOne({ id: itemId, kind });
  res.status(204).send();
});

apiRouter.put('/admin/gallery/reorder', auth, async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'Invalid payload' });

  await Promise.all(ids.map((id, idx) => Content.updateOne({ id, kind: 'gallery' }, { order: idx })));
  res.json({ success: true });
});

apiRouter.post('/admin/gallery/bulk', auth, async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ error: 'Invalid payload' });

  const start = await Content.countDocuments({ kind: 'gallery' });
  const created = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const content = new Content({
      id: require('crypto').randomUUID(),
      kind: 'gallery',
      title: item.title || 'Gallery photo',
      summary: item.summary || '',
      body: '',
      image_url: item.image_url,
      order: start + i,
      published: true,
      created_at: nowIso(),
    });
    await content.save();
    created.push(content.toObject());
  }

  res.status(201).json(created);
});

apiRouter.post('/admin/upload', auth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const ext = path.extname(req.file.originalname).slice(1).toLowerCase();
  if (!MIME_TYPES[ext]) return res.status(400).json({ error: 'Only JPG, PNG, GIF or WEBP images are allowed' });

  try {
    const storageKey = await initStorage();
    const fileId = require('crypto').randomUUID();
    const storagePath = `${APP_NAME}/gallery/${fileId}.${ext}`;
    const result = await putObject(storagePath, req.file.buffer, MIME_TYPES[ext], storageKey);

    const file = new File({
      id: fileId,
      storage_path: result.path,
      original_filename: req.file.originalname,
      content_type: MIME_TYPES[ext],
      size: result.size || req.file.size,
      is_deleted: false,
      created_at: nowIso(),
    });
    await file.save();

    res.status(201).json({ file_id: fileId, url: `/api/files/${fileId}` });
  } catch (error) {
    console.error('Upload failed:', error?.response?.data || error.message || error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use(limiter);

app.use('/api', apiRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.json({ message: 'Malhar Express backend is running.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const INSTITUTIONS = [
  {
    slug: 'quran-studies',
    name: "Malhar College of Qur'an Studies",
    desc: "The College of Qur'an enlightens the heart with divine light — systematically training students to memorise the Holy Qur'an while strictly adhering to the rules of Thajweed and recitation.",
    image: '/assets/hifz.png',
  },
  {
    slug: 'model-academy',
    name: 'Malhar Model Academy',
    desc: 'A blending of modern and Islamic sciences, the Academy in Manjeshwar nurtures Islamic consciousness and a spiritual mindset in every learner.',
    image: '/assets/Untitled-1.png',
  },
  {
    slug: 'she-garden',
    name: 'Malhar She Garden',
    desc: 'Providing high-quality undergraduate and graduate education for women — promoting research, scholarship and creativity through a spiritual platform.',
    image: '',
  },
  {
    slug: 'sharia',
    name: "Malhar College of Sharee'a",
    desc: 'A traditional way of knowledge transmission that moulds Islamic scholars to lead society with excellence, developing their communication, analytical skills, and a spiritual mindset.',
    image: '/assets/web-sh.png',
  },
  {
    slug: 'miid',
    name: "Malhar Institute of Islamic Da'awa",
    desc: 'MIID is a threshold to the new world driven by traditional learning, wisdom and modern trends — giving students exposure to current affairs, technical trends and practical guidance in creative areas.',
    image: '/assets/web-hifl.png',
  },
  {
    slug: 'english-medium',
    name: 'Malhar English Medium School',
    desc: 'A well-equipped hub of learning that creates a better future, focusing on the all-round well-being of every learner.',
    image: '/assets/english-school.png',
  },
  {
    slug: 'commerce',
    name: 'Malhar College of Commerce',
    desc: "Commerce and business education within Malhar's learning environment.",
    image: '/assets/19-1.jpg',
  },
];

const INSTRUCTORS = [
  {
    slug: 'umarul-farook-al-bukhari',
    name: 'Marhoom Qasi Sayyid Muhammad Umarul Farook Al Bukhari',
    role: 'Founder · Posoat Thangal',
    image: '/assets/Posoat-Thangal-360x370.jpg',
    bio: "Qazi Sayyid Muhammad Umarul Farook Al-Bukhari, of the Bukhari lineage, was born on 21 September 1961 (Muharram 24). Known affectionately as Posoat Thangal, he was the visionary founder of Malhar Nooril Islami Tha'eleemi, establishing the trust in the year 2000 to bring the light of Islamic and modern education to people from all walks of life — irrespective of religion, caste, creed or gender.",
  },
  {
    slug: 'sayyid-abdu-rahman-shaheer-al-bukhari',
    name: 'Sayyid Abdu Rahman Shaheer Al Bukhari',
    role: 'Key Personality',
    image: '/assets/web-sh.png',
    bio: '[Biography to be provided by the trust.]',
  },
  {
    slug: 'sayyid-jalaluddeen-sa-adi-al-bukhari',
    name: 'Sayyid Jalaluddeen Sa-adi Al Bukhari',
    role: 'Key Personality',
    image: '/assets/jl-web.png',
    bio: '[Biography to be provided by the trust.]',
  },
  {
    slug: 'adv-hassan-kunhi-b',
    name: 'Adv. Hassan Kunhi B',
    role: 'Key Personality',
    image: '/assets/Hassan-Kunhi-360x370.jpg',
    bio: '[Biography to be provided by the trust.]',
  },
];

const seedDatabase = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    if (!(await Admin.findOne({ email: adminEmail }))) {
      await new Admin({ email: adminEmail, password_hash: hashPassword(adminPassword) }).save();
      console.log('Seeded admin');
    }
  } else {
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      console.warn('ADMIN_EMAIL and ADMIN_PASSWORD are not set; skipping admin seed. No admin user exists yet.');
    } else {
      console.log('Admin user already exists; skipping admin seed.');
    }
  }

  if ((await Institution.countDocuments()) === 0) {
    await Institution.insertMany(INSTITUTIONS.map((item, index) => ({ ...item, order: index })));
    console.log('Seeded institutions');
  }

  if ((await Instructor.countDocuments()) === 0) {
    await Instructor.insertMany(INSTRUCTORS.map((item, index) => ({ ...item, id: require('crypto').randomUUID(), order: index })));
    console.log('Seeded instructors');
  }
};

const start = async () => {
  await connectDB();

  try {
    await initStorage();
    console.log('Storage initialized');
  } catch (error) {
    console.warn('Storage initialization failed:', error.message || error);
  }

  await seedDatabase();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
