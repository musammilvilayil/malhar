import { Facebook, Instagram, Youtube } from "lucide-react";

export const INSTITUTION_ORDER = [
  "quran-studies", "model-academy", "she-garden", "sharia", "miid", "english-medium", "buds-school",
];

export const INSTITUTIONS = [
  {
    slug: "quran-studies",
    name: "Malhar College of Qur'an Studies",
    desc: "Systematic Qur'an memorisation with emphasis on Tajweed and careful recitation.",
    image: "/assets/hifz.png",
  },
  {
    slug: "model-academy",
    name: "Malhar Model Academy",
    desc: "Early childhood learning for ages 3–6 through LZQ, MZQ and UZQ stages.",
    image: "/assets/web-p.png",
  },
  {
    slug: "she-garden",
    name: "Malhar She Garden",
    desc: "Women's education combining Sharee'a and Da'wa studies with academic learning.",
    image: "/assets/web-sh.png",
    imageReference: "https://in.pinterest.com/pin/18929260940768729/",
  },
  {
    slug: "sharia",
    name: "Malhar College of Sharee'a",
    desc: "Traditional Islamic learning focused on scholarship, communication and analytical skills.",
    image: "/assets/Untitled-1.png",
  },
  {
    slug: "miid",
    name: "Malhar Institute of Islamic Da'awa",
    desc: "Islamic scholarship and secular education with practical learning facilities.",
    image: "/assets/web-hifl.png",
  },
  {
    slug: "english-medium",
    name: "Malhar English Medium School",
    desc: "An English-medium learning environment focused on all-round learner development.",
    image: "/assets/english-school.png",
  },
  {
    slug: "buds-school",
    name: "She Garden Buds School",
    desc: "ZeeQue preschool learning for ages 3–6 across LZQ, MZQ and UZQ stages.",
    image: "/assets/zq-3.png",
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

export const INSTITUTION_DETAILS = [];

export const GALLERY_IMAGES = [
  { src: "/assets/DSC_2363-1-1-1.jpg", caption: "Campus assembly and student life", cols: 2, rows: 2 },
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
  { n: "01", title: "Rooted in Tradition", body: "Established in 2000 through the vision of Sheikh Sayyid Umarul Farooq Al Bukhari (Posoat Thangal), Malhar carries forward a living heritage of Qur'anic scholarship and modern education." },
  { n: "02", title: "Light for Thousands", body: "Malhar seeks to bring light into the lives of thousands by combining faith, knowledge and service through its institutions in Kasaragod." },
  { n: "03", title: "A Refuge for All", body: "Our trust welcomes people from every background, supporting education, spiritual growth and social upliftment without distinction." },
];

export const FACILITIES = [
  { icon: "Building2", title: "Campus & Classrooms", body: "Learning spaces designed for focused Qur'anic and academic study." },
  { icon: "GraduationCap", title: "Scholars & Teachers", body: "Teachers and scholars support learning across Islamic and modern subjects." },
  { icon: "Bus", title: "Student Transport", body: "Transportation supports students travelling from nearby communities." },
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
