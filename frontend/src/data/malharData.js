export const siteData = {
  site: {
    name: "Malhar - Malharu Nooril Islami Tha'aleemi",
    tagline: 'Bringing light into the lives of thousands',
    established: 2000,
  },

  founder: {
    name: 'Sheikh Sayyid Umarul Farooq Al Bukhari',
    knownAs: 'Posoat Thangal',
    image: '/assets/Posoat-Thangal-360x370.jpg',
  },

  contact: {
    address: 'Al Buhakari Compound, Hosangadi, Manjeshwar PO, Kasaragod 671323, Kerala, India',
    email: 'Malhar.mjr@gmail.com',
    phone: '8891001205',
    phones: ['8891001205'],
    facebook: 'https://www.facebook.com/malharmanjeshwar/',
    instagram: 'https://www.instagram.com/malhar.she.garden/',
  },

  institutions: [
    {
      id: 1,
      name: "Malhar College of Qur'an Studies",
      slug: 'quran-studies',
      description: "Systematic Qur'an memorisation with emphasis on Tajweed and careful recitation.",
      image: '/assets/hifz.png',
      programs: ['Qur’an Studies', 'Hifz', 'Tajweed'],
      features: ['Qur’an Memorisation', 'Tajweed', 'Recitation'],
    },
    {
      id: 2,
      name: 'Malhar Model Academy',
      slug: 'model-academy',
      description: 'Early childhood learning for ages 3–6, with LZQ, MZQ and UZQ stages and an emphasis on creativity, collaboration and joyful learning.',
      image: '/assets/web-p.png',
      programs: ['LZQ', 'MZQ', 'UZQ'],
      features: ['Early Childhood Education', 'Creative Learning', 'Collaborative Learning'],
    },
    {
      id: 3,
      name: 'Malhar She Garden',
      slug: 'she-garden',
      description: "Women's education combining Sharee'a and Da'wa studies with academic subjects including literature, history, culture and home sciences.",
      image: '/assets/girls highschooll.jpg',
      programs: ['Plus One', 'Plus Two', "Sharee'a Studies", "Da'wa Studies", 'Literature', 'Home Sciences'],
      features: ["Women's Education", 'Islamic Studies', 'Academic Learning'],
      contact: { email: 'info@malharshegarden.com', phone: '7907009373' },
    },
    {
      id: 4,
      name: "Malhar College of Sharee'a",
      slug: 'sharia',
      description: 'Traditional Islamic learning focused on developing knowledgeable scholars with communication and analytical skills.',
      image: '/assets/Untitled-1.png',
      programs: ["Sharee'a Studies"],
      features: ['Islamic Studies', 'Scholarship', 'Communication Skills'],
    },
    {
      id: 5,
      name: "Malhar Institute of Islamic Da'awa",
      slug: 'miid',
      description: "Islamic scholarship and secular education with learning spaces including a computer lab, reading café, talent hub and research centre.",
      image: '/assets/web-hifl.png',
      programs: ['Islamic Studies', "Da'wa Studies"],
      features: ['Computer Lab', 'Reading Café', 'Talent Hub', 'Research Centre'],
      contact: { email: 'malhardawa@gmail.com', phone: '8891001205', location: 'Hosangady Junction' },
    },
    {
      id: 6,
      name: 'Malhar English Medium School',
      slug: 'english-medium',
      description: 'An English-medium learning environment focused on the all-round development and well-being of learners.',
      image: '/assets/english-school.png',
      programs: [],
      features: ['English Medium Education', 'Student Development'],
    },
    {
      id: 7,
      slug: 'commerce',
      name: 'Malhar College of Commerce',
      description: "Commerce and business education within Malhar's learning environment.",
      image: '/assets/19-1.jpg',
      programs: ['Commerce'],
      features: ['Commerce Education', 'Business Studies'],
    },
  ],

  institutionDetails: [
    { slug: 'quran-studies', headline: "Qur'an learning with a focus on memorisation and Tajweed.", description: "Malhar College of Qur'an Studies supports systematic memorisation and careful recitation of the Holy Qur'an.", overview: 'Contact the institution for current programme, curriculum and admission information.', programs: ['Qur’an Studies', 'Hifz', 'Tajweed'], admission: 'Contact the institution for current admission information.', eligibility: 'Contact the institution for current eligibility requirements.', contact: 'Malhar Administration', phone: '8891001205' },
    { slug: 'model-academy', headline: 'Joyful early learning for young children.', description: 'Malhar Model Academy provides early childhood learning through LZQ, MZQ and UZQ stages.', overview: 'The programme focuses on creativity, collaboration and joyful learning for ages 3–6.', programs: ['LZQ', 'MZQ', 'UZQ'], admission: 'Contact the institution for current admission information.', eligibility: 'Contact the institution for current eligibility requirements.', contact: 'Malhar Administration', phone: '8891001205' },
    { slug: 'she-garden', headline: "Women's education rooted in Islamic and academic learning.", description: "Malhar She Garden provides Sharee'a and Da'wa education alongside academic subjects.", overview: 'Available subjects include Qur’an, Hadith, literature, history, culture and home sciences.', programs: ['Plus One', 'Plus Two', "Sharee'a Studies", "Da'wa Studies", 'Literature', 'Home Sciences'], admission: 'Contact the institution for current admission information.', eligibility: 'Contact the institution for current eligibility requirements.', contact: 'Malhar She Garden', phone: '7907009373' },
    { slug: 'sharia', headline: "Traditional Sharee'a learning and scholarship.", description: "Malhar College of Sharee'a focuses on Islamic scholarship and the development of communication and analytical skills.", overview: 'Contact the institution for current programme and curriculum information.', programs: ["Sharee'a Studies"], admission: 'Contact the institution for current admission information.', eligibility: 'Contact the institution for current eligibility requirements.', contact: 'Malhar Administration', phone: '8891001205' },
    { slug: 'miid', headline: "Islamic Da'awa education with modern learning facilities.", description: "MIID combines Islamic scholarship with secular education and practical learning spaces.", overview: 'Facilities mentioned by Malhar include a computer lab, reading café, talent hub and research centre.', programs: ['Islamic Studies', "Da'wa Studies"], admission: 'Contact MIID for current admission information.', eligibility: 'Contact MIID for current eligibility requirements.', contact: "Malhar Institute of Islamic Da'awa", phone: '8891001205' },
    { slug: 'english-medium', headline: 'English-medium education focused on learner development.', description: 'Malhar English Medium School supports the all-round well-being and development of learners.', overview: 'Contact the school for current curriculum and programme information.', programs: [], admission: 'Contact the school for current admission information.', eligibility: 'Contact the school for current eligibility requirements.', contact: 'Malhar Administration', phone: '8891001205' },
    { slug: 'commerce', headline: 'Commerce and business education.', description: "Malhar College of Commerce supports commerce learning within Malhar's educational environment.", overview: 'Contact the institution for current programme and curriculum information.', programs: ['Commerce'], admission: 'Contact the institution for current admission information.', eligibility: 'Contact the institution for current eligibility requirements.', contact: 'Malhar Administration', phone: '8891001205' },
  ],

  about: {
    mission: "Malhar seeks to provide an educational environment that brings together Islamic and secular learning while supporting the educational, spiritual and social needs of the community.",
    vision: "Malhar creates an educational environment for Islamic and secular education and seeks to shape well-educated, open-minded and multi-talented generations with Islamic moral education.",
    achievements: 'Since its establishment in 2000, Malhar has continued its educational, spiritual and social work from Manjeshwar, Kasaragod.',
    stats: { established: 2000, institutions: 7 },
  },

  gallery: [
    { id: 1, src: '/assets/DSC_2363-1-1-1.jpg', title: 'Campus Life', category: 'events' },
    { id: 2, src: '/assets/about-imgs.jpg', title: 'About Malhar', category: 'general' },
    { id: 3, src: '/assets/web-hifl.png', title: 'Qur’an Studies', category: 'education' },
    { id: 4, src: '/assets/Untitled-1.png', title: 'Model Academy', category: 'campus' },
    { id: 5, src: '/assets/gal.jpg', title: 'Campus Panorama', category: 'campus' },
    { id: 6, src: '/assets/gal1.jpg', title: 'Students & Events', category: 'events' },
    { id: 7, src: '/assets/gal3.jpg', title: 'Campus Moments', category: 'general' },
    { id: 8, src: '/assets/web-slide-1-scaled.png', title: 'Main Campus', category: 'campus' },
    { id: 9, src: '/assets/GAIJpIRvuPg-maxresdefault.jpg', title: 'Event', category: 'events' },
  ],

  news: [],
  events: [],

  instructors: [
    { id: 1, slug: 'marhoom-qasi-sayyid-muhammad-umarul-farook-al-bukhari', name: 'Marhoom Qasi Sayyid Muhammad Umarul Farook Al Bukhari', role: 'Founder', image: '/assets/Posoat-Thangal-360x370.jpg', bio: 'Founder of Malhar.' },
    { id: 2, slug: 'sayyid-abdu-rahman-shaheer-al-bukhari', name: 'Sayyid Abdu Rahman Shaheer Al Bukhari', role: 'Trust Member', image: '/assets/web-sh.png', bio: '' },
    { id: 3, slug: 'sayyid-jalaluddeen-sa-adi-al-bukhari', name: 'Sayyid Jalaluddeen Sa-adi Al Bukhari', role: 'Trust Member', image: '/assets/jl-web.png', bio: '' },
    { id: 4, slug: 'adv-hassan-kunhi-b', name: 'Adv Hassan Kunhi B', role: 'Advocate / Trustee', image: '/assets/Hassan-Kunhi-360x370.jpg', bio: '' },
  ],

  youtubeChannel: {
    title: 'Malhar Media',
    description: 'Malhar Educational Trust channel for lectures, campus updates and community stories.',
    url: 'https://www.youtube.com/@MalharMedia',
    latestVideoId: 'GAIJpIRvuPg',
  },

  quotes: [
    { arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ', translation: 'Read in the name of your Lord who created', source: 'Surah Al-Alaq (96:1)' },
    { arabic: 'وَقُلْ رَبِّ زِدْنِي عِلْمًا', translation: 'And say: My Lord, increase me in knowledge', source: 'Surah Taha (20:114)' },
  ],
};

export default siteData;
