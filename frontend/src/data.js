import { Facebook, Instagram, Youtube } from "lucide-react";

export const INSTITUTION_ORDER = [
  "model-academy", "miid", "she-bud", "malhar-hifz", "shareath-college", "english-school",
];

export const INSTITUTIONS = [
  {
    slug: "model-academy",
    name: "Malhar Model Academy",
    desc: "LZQ, MZQ and UZQ education for learners who need strong academic foundations, English fluency and confident leadership.",
    image: "/assets/zq-3.png",
  },
  {
    slug: "miid",
    name: "Malhar Institute of Islamic Da'awa (MIID)",
    desc: "A modern Da'awa institute offering Islamic scholarship, research, communication skills and community outreach training.",
    image: "/assets/web-p.png",
  },
  {
    slug: "she-garden",
    name: "Malhar She Garden",
    desc: "A women's college focused on Sharee'a, Da'wa and higher secondary education for women scholars.",
    image: "/assets/web-sh.png",
  },
  {
    slug: "malhar-hifz",
    name: "Malhar Hifz",
    desc: "Hifz memorization with tajwīd, Arabic language and spiritual formation for serious learners.",
    image: "/assets/web-slide-1-2048x909.webp",
  },
  {
    slug: "shareath-college",
    name: "Shareath College",
    desc: "Sharee'a education with supporting subjects, preparing students for scholarship and community leadership.",
    image: "/assets/web-hifl.png",
  },
  {
    slug: "english-school",
    name: "Malhar English Medium School",
    desc: "A modern English-medium curriculum rooted in Islamic values, character education and life skills.",
    image: "/assets/english-school.png",
  },
];

export const CONTACT = {
  address: "Al Buhakari Compound, Hosangadi, Manjeshwar PO, Kasaragod 671323, Kerala, India",
  phones: ["+91 8891001205", "+91 7907009373"],
  email: "Malhar.mjr@gmail.com",
  fax: "04998 273714",
  departments: [
    { name: "MIID", email: "malhardawa@gmail.com", phone: "+91 8891001205" },
    { name: "She Garden", email: "info@malharshegarden.com", phone: "+91 7907009373" },
  ],
};

export const NAV_LINKS = [
  { label: "About", to: "/about-us" },
  { label: "Institutions", to: "/our-institutions" },
  { label: "Media", to: "/media" },
  { label: "Gallery", to: "/gallery" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/contact" },
];

export const LIVE_URL = "https://www.youtube.com/@malharmedia1205";

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/malharmanjeshwar/", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/malhar.she.garden/", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/@malharmedia1205", icon: Youtube },
];

export const YOUTUBE_CHANNEL = {
  url: "https://www.youtube.com/@malharmedia1205",
  title: "Malhar Media",
  description: "Subscribe for lectures, campus updates and community highlights.",
  latestVideoId: "GAIJpIRvuPg",
};

export const INSTITUTION_DETAILS = [
  {
    slug: "model-academy",
    name: "Malhar Model Academy",
    headline: "LZQ, MZQ and UZQ programmes for strong academic foundations.",
    overview: "Malhar Model Academy is built for learners seeking a balanced school experience in English, science and values-based education. The academy offers LZQ, MZQ and UZQ study paths with a focus on character, leadership and digital literacy.",
    eligibility: "Open to girls and boys with basic primary education. Admissions are based on assessment of reading, writing and English communication skills.",
    admission: "Submit the application form, attend the placement assessment, and complete the admission interview with the academy leadership.",
    programs: ["LZQ: foundational learning", "MZQ: intermediate development", "UZQ: advanced preparation"],
    contact: "Malhar.mjr@gmail.com",
    phone: "+91 8891001205",
  },
  {
    slug: "miid",
    name: "Malhar Institute of Islamic Da'awa (MIID)",
    headline: "Islamic da'awa training, research and modern communication.",
    overview: "MIID combines classical Islamic study with modern methods of community outreach, public speaking and publication. Students learn da'awa, Arabic, tafsir and contemporary communication skills.",
    eligibility: "Students who have completed secondary education or equivalent and demonstrate strong commitment to Islamic scholarship and outreach.",
    admission: "Apply with academic records, attend an interview and submit a statement of purpose for da'awa practice.",
    programs: ["Diploma in Da'awa", "Advanced Arabic and Tafsir", "Community Leadership"],
    contact: "malhardawa@gmail.com",
    phone: "+91 8891001205",
  },
  {
    slug: "she-bud",
    name: "Malhar She Buds",
    headline: "A women’s college of Sharee'a and Da'wa.",
    overview: "She Buds offers women a dedicated space for Sharee'a studies, da'awa training and higher secondary education. The college nurtures female scholars with an emphasis on religious knowledge, leadership and social responsibility.",
    eligibility: "Open to female students who have completed secondary education or equivalent and wish to pursue advanced Islamic and secular studies.",
    admission: "Complete the women’s programme application, participate in the candidate interview, and receive guidance on course selection.",
    programs: ["Sharee'a studies", "Da'wa and leadership", "Higher secondary education"],
    contact: "info@malharshegarden.com",
    phone: "+91 7907009373",
  },
  {
    slug: "malhar-hifz",
    name: "Malhar Hifz",
    headline: "Dedicated Hifz memorization with tajwīd and Arabic sciences.",
    overview: "Malhar Hifz provides a structured and supportive environment for students to pursue Hifz memorization, master tajwīd and deepen their Arabic language skills. The programme balances memorization with spiritual formation.",
    eligibility: "Open to students with basic reading skills in Arabic or those ready to begin formal memorization training.",
    admission: "Register for assessment, meet with the hifz faculty and begin the programme with guided tajwīd instruction.",
    programs: ["Hifz memorization", "Tajwīd training", "Arabic language development"],
    contact: "Malhar.mjr@gmail.com",
    phone: "+91 8891001205",
  },
  {
    slug: "shareath-college",
    name: "Shareath College",
    headline: "Sharee'a education for future Islamic leaders.",
    overview: "Shareath College offers advanced Sharee'a instruction and allied disciplines, preparing students for scholarship, community service and ethical leadership.",
    eligibility: "Students with prior Islamic study background and a desire to pursue deeper Sharee'a learning are encouraged to apply.",
    admission: "Submit academic and religious study records, attend the Shareath assessment and meet the college faculty.",
    programs: ["Sharee'a degree preparation", "Islamic ethics", "Community-focused study"],
    contact: "Malhar.mjr@gmail.com",
    phone: "+91 8891001205",
  },
  {
    slug: "english-school",
    name: "Malhar English Medium School",
    headline: "A modern English-medium curriculum rooted in Islamic values.",
    overview: "English School delivers a strong academic programme in English while preserving Malhar’s Islamic identity. Students benefit from a curriculum that includes science, mathematics, languages and character education.",
    eligibility: "Open to learners ready to enter an English-medium learning environment from primary through higher secondary levels.",
    admission: "Complete the application, attend the school assessment and connect with the English School admissions team.",
    programs: ["Primary English curriculum", "Secondary preparation", "Character and values education"],
    contact: "Malhar.mjr@gmail.com",
    phone: "+91 8891001205",
  },
];

export const GALLERY_IMAGES = [
  { src: "/assets/121.jpg", caption: "Campus assembly and student life", cols: 2, rows: 2 },
  { src: "/assets/11a.jpg", caption: "Learning spaces and classrooms", cols: 1, rows: 1 },
  { src: "/assets/1-2.jpg", caption: "Community engagement", cols: 1, rows: 1 },
  { src: "/assets/2.jpg", caption: "Campus grounds", cols: 1, rows: 1 },
  { src: "/assets/3.jpg", caption: "Student studies", cols: 1, rows: 1 },
  { src: "/assets/4-1.jpg", caption: "Campus event", cols: 1, rows: 1 },
  { src: "/assets/5-2.jpg", caption: "Classroom learning", cols: 1, rows: 1 },
  { src: "/assets/6.jpg", caption: "Trust activities", cols: 1, rows: 1 },
  { src: "/assets/7-2.jpg", caption: "Campus life", cols: 2, rows: 1 },
  { src: "/assets/Posoat-Thangal.jpg", caption: "Founder Sheikh Sayyid Umarul Farooq Al Bukhari", cols: 1, rows: 1 },
  { src: "/assets/Hassan-Kunhi.jpg", caption: "Faculty leadership", cols: 1, rows: 1 },
];

export const MANIFESTO = [
  {
    n: "01",
    title: "Rooted in Tradition",
    body: "Established in 2000 through the vision of Sheikh Sayyid Umarul Farooq Al Bukhari (Posoat Thangal), Malhar carries forward a living heritage of Qur'anic scholarship and high-quality modern education.",
  },
  {
    n: "02",
    title: "Light for Thousands",
    body: "Malhar seeks to bring light into the lives of thousands by combining faith, knowledge and service through its institutions in Kasaragod.",
  },
  {
    n: "03",
    title: "A Refuge for All",
    body: "Our trust welcomes people from every background, supporting education, spiritual growth and social upliftment without distinction.",
  },
];

export const FACILITIES = [
  {
    icon: "Building2",
    title: "Campus & Classrooms",
    body: "Spacious classrooms, study halls and dedicated learning spaces built for focused Qur'anic and academic study.",
  },
  {
    icon: "GraduationCap",
    title: "Scholars & Teachers",
    body: "Qualified teachers and scholars deliver balanced instruction across Islamic sciences and modern subjects.",
  },
  {
    icon: "Bus",
    title: "Student Transport",
    body: "Reliable transportation serves students from Kasaragod and nearby communities for safe daily travel.",
  },
];

export const GALLERY_PREVIEW = [
  "/assets/web-slide-1-scaled.png",
  "/assets/about-imgs.jpg",
  "/assets/web-slide-1-2048x909.webp",
  "/assets/english-school.png",
  "/assets/zq-3.png",
  "/assets/web-p.png",
  "/assets/DSC_2363-1-1-1.jpg",
  "/assets/Untitled-1.png",
];
