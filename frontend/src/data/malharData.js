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
      name: 'Malhar Model Academy',
      slug: 'model-academy',
      description: 'Early childhood education (LZQ, MZQ, UZQ) with focus on creativity, collaboration, and joyful learning for ages 3-6.',
      image: '/assets/Untitled-1.png',
      programs: ['LZQ (Lower ZeeQue)', 'MZQ (Middle ZeeQue)', 'UZQ (Upper ZeeQue)'],
      features: ['Creative Learning', 'Moral Theatre', 'English Club', 'Computer Education', 'Writing & Speech Craft'],
    },
    {
      id: 2,
      name: "Malhar Institute of Islamic Da'awa (MIID)",
      slug: 'miid',
      description: 'Islamic scholarship with secular education, featuring computer lab, moral theater, Nano-magazine, reading café, talent hub, and smart Research Center.',
      image: '/assets/collage of sharee\'a.png',
      programs: ['Islamic Studies', "Da'wa Training", 'Research', 'Computer Lab'],
      features: ['Moral Theater', 'Reading Café', 'Talent Hub', 'Smart Research Center', 'Nano Magazine'],
      contact: {
        email: 'malhardawa@gmail.com',
        phone: '8891001205',
        location: 'Hosangady Junction',
      },
    },
    {
      id: 3,
        name: 'Malhar She Buds',
        slug: 'she-bud',
        description: "Women's College of Sharee'a and Women's College of Da'wa offering Plus One, Plus Two, Hifz, Hadith, Literature, History, Culture, and Home Sciences.",
        image: '/assets/she-garden.png',
      programs: ['Plus One', 'Plus Two', "Sharee'a Studies", "Da'wa Training", 'Islamic Literature', 'Home Sciences'],
      features: ["Women's Education", 'Islamic Studies', 'Modern Curriculum', 'Cultural Programs'],
      contact: {
        email: 'info@malharshegarden.com',
        phone: '7907009373',
      },
    },
    {
      id: 4,
        name: 'Malhar Hifz',
        slug: 'hifz',
        description: 'Systematic Hifz memorization programme with strict adherence to Tajweed rules and high recitation standards.',
        image: '/assets/web-slide-1-2048x909.webp',
        programs: ['Hifz Program', 'Tajweed', 'Hifz Recitation'],
        features: ['Systematic Training', 'Tajweed Rules', 'Qualified Instructors', 'Spiritual Environment'],
    },
    {
      id: 5,
      name: 'Shareath College',
      slug: 'shareath-college',
      description: 'Advanced Islamic studies with modern educational methods and comprehensive curriculum.',
      image: '/assets/institute of islamic miid.webp',
      programs: ['Islamic Jurisprudence', 'Arabic Literature', 'Islamic History', 'Comparative Religion'],
      features: ['Advanced Studies', 'Research Focus', 'Experienced Faculty'],
    },
    {
      id: 6,
      name: 'English School',
      slug: 'english-school',
      description: 'English medium education with strong moral and ethical foundation based on Islamic values.',
      image: '/assets/english-school.webp',
      programs: ['Primary Education', 'Secondary Education', 'Higher Secondary'],
      features: ['English Medium', 'Moral Education', 'Modern Curriculum', 'Extracurricular Activities'],
    },
  ],

  institutionDetails: [
    {
      slug: 'model-academy',
      headline: 'Nurturing early learners with a joyful, faith-centered curriculum.',
      description: 'Malhar Model Academy provides a structured beginning to education through Qur’anic literacy, modern learning and moral development in a safe, engaging environment.',
      overview: 'Our early education campus blends creative learning, character-building activities and practical English support for children aged 3–6.',
      programs: ['LZQ (Lower ZeeQue)', 'MZQ (Middle ZeeQue)', 'UZQ (Upper ZeeQue)'],
      admission: 'Open admissions for preschool and early years. Families may schedule a campus visit to discuss placement and programme fit.',
      eligibility: 'Children are eligible based on age and readiness assessment. Priority is given to local families and siblings of current students.',
      contact: 'Admissions Office, Malhar Model Academy',
      phone: '8891001205',
    },
    {
      slug: 'miid',
      headline: 'Islamic scholarship and community training with modern facilities.',
      description: 'MIID offers a balanced curriculum of Qur’anic studies, da’awa, research support and computer education for motivated learners.',
      overview: 'The institute supports academic excellence, spiritual growth and practical skills through research, moral theatre, and community engagement.',
      programs: ['Islamic Studies', "Da'wa Training", 'Research', 'Computer Lab'],
      admission: 'Admissions open for new academic year cohorts. Prospective students may contact the MIID office for guidance.',
      eligibility: 'Applicants should demonstrate commitment to Islamic studies and community service, along with age-appropriate academic readiness.',
      contact: 'Malhar Institute of Islamic Da’awa (MIID)',
      phone: '8891001205',
    },
    {
      slug: 'she-bud',
      headline: 'Women’s higher education rooted in Sharee’a, da’awa and modern subjects.',
      description: 'Malhar She Buds empowers women through Islamic scholarship, academic subjects and practical programmes for leadership and service.',
      overview: 'The college delivers a respectful learning environment for women, with courses in Sharee’a, literature, history and home sciences.',
      programs: ['Plus One', 'Plus Two', "Sharee'a Studies", "Da'wa Training", 'Islamic Literature', 'Home Sciences'],
      admission: 'Women interested in higher education and religious studies may apply for new admissions each term.',
      eligibility: 'Open to female applicants meeting the academic readiness and personal commitment standards of the college. ',
      contact: 'Malhar She Buds Admissions Office',
      phone: '7907009373',
    },
    {
      slug: 'hifz',
      headline: 'A systematic Quran memorization programme with Tajweed excellence.',
      description: 'Malhar Hifz guides students through disciplined Quran memorization and recitation practice under qualified instructors.',
      overview: 'The programme emphasizes tajweed rules, accuracy and spiritual development across a supportive campus setting.',
      programs: ['Hifz Program', 'Tajweed', 'Quran Recitation'],
      admission: 'Students may join the Hifz programme after an initial recitation evaluation and placement assessment.',
      eligibility: 'Suitable for learners committed to memorization, daily practice and classical Quranic recitation standards.',
      contact: 'Malhar Hifz Programme Coordinator',
      phone: '8891001205',
    },
    {
      slug: 'shareath-college',
      headline: 'Advanced Islamic studies with practical research and leadership training.',
      description: 'Shareath College prepares learners for deep jurisprudence and Arabic scholarship through contemporary teaching methods.',
      overview: 'Students engage in advanced courses, debate, research and community outreach while maintaining strong moral foundations.',
      programs: ['Islamic Jurisprudence', 'Arabic Literature', 'Islamic History', 'Comparative Religion'],
      admission: 'Admission is available for learners seeking advanced Sharee’a and Arabic studies with a strong emphasis on character and service.',
      eligibility: 'Applicants should have prior Islamic studies experience and readiness for intensive academic study.',
      contact: 'Shareath College Admissions',
      phone: '8891001205',
    },
    {
      slug: 'english-school',
      headline: 'English medium learning with moral and academic excellence.',
      description: 'The English School offers modern education built on Islamic values, preparing students for higher education and community leadership.',
      overview: 'Students follow a strong English medium curriculum while receiving supplementary Islamic and character-based instruction.',
      programs: ['Primary Education', 'Secondary Education', 'Higher Secondary'],
      admission: 'Admissions are open for new academic years. Parents may contact the school office for enrolment information.',
      eligibility: 'Open to students seeking a faith-based English medium education with balanced academic support.',
      contact: 'English School Admissions Office',
      phone: '8891001205',
    },
  ],

  about: {
    mission: "Malhar nurtures character and excellence through a faith-centered education that blends classical Qur’anic learning with modern curricula. We cultivate confident, compassionate learners ready to serve their communities.",
    vision: "'Malhar' creates an excellent educational environment with global standards in Islamic and secular education. It goes hand in hand with the significant changes taking place in the structure of daily life. 'Malhar' is shaping well-educated, open-minded and multi-talented generations with Islamic moral education.",
    achievements: 'After two decades, thousands of students and families share a happy and satisfied smile and mind as a response to the effort of the Institution.',
    stats: {
      years: 25,
      students: '5000+',
      faculty: '150+',
      institutions: 6,
    },
  },

  gallery: [
    { id: 1, src: '/assets/DSC_2363-1-1-1.jpg', title: 'Campus Life', category: 'events' },
    { id: 2, src: '/assets/about-imgs.jpg', title: 'About Malhar', category: 'general' },
    { id: 3, src: '/assets/web-hifl.png', title: 'Hifz Program', category: 'education' },
    { id: 4, src: '/assets/Untitled-1.png', title: 'Model Academy', category: 'campus' },
    { id: 5, src: '/assets/gal.jpg', title: 'Campus Panorama', category: 'campus' },
    { id: 6, src: '/assets/gal1.jpg', title: 'Students & Events', category: 'events' },
    { id: 7, src: '/assets/gal3.jpg', title: 'Campus Moments', category: 'general' },
    { id: 8, src: '/assets/web-slide-1-scaled.png', title: 'Main Campus', category: 'campus' },
    { id: 9, src: '/assets/GAIJpIRvuPg-maxresdefault.jpg', title: 'Event', category: 'events' },
  ],

  news: [
    {
      id: 1,
      title: 'Malhar Silver Jubilee Celebrations',
      date: '2025-06-22',
      excerpt: 'Grand celebration marking 25 years of educational excellence',
      category: 'events',
    },
  ],

  events: [
    {
      id: 1,
      title: 'Annual Community Ijtema',
      date: '2025-07-15',
      location: 'Malhar Main Campus'
    },
    {
      id: 2,
      title: 'Islamic Education Seminar',
      date: '2025-08-01',
      location: 'Hosangadi Auditorium'
    },
  ],

  instructors: [
    {
      id: 1,
      slug: 'marhoom-qasi-sayyid-muhammad-umarul-farook-al-bukhari',
      name: 'Marhoom Qasi Sayyid Muhammad Umarul Farook Al Bukhari',
      role: 'Founder',
      image: '/assets/Posoat-Thangal-360x370.jpg',
      bio: 'Founder of Malhar, leading the trust with a commitment to Qur’anic education, community uplift and interfaith understanding.',
    },
    {
      id: 2,
      slug: 'sayyid-abdu-rahman-shaheer-al-bukhari',
      name: 'Sayyid Abdu Rahman Shaheer Al Bukhari',
      role: 'Trust Member',
      image: '/assets/web-sh.png',
      bio: '',
    },
    {
      id: 3,
      slug: 'sayyid-jalaluddeen-sa-adi-al-bukhari',
      name: 'Sayyid Jalaluddeen Sa-adi Al Bukhari',
      role: 'Trust Member',
      image: '/assets/jl-web.png',
      bio: '',
    },
    {
      id: 4,
      slug: 'adv-hassan-kunhi-b',
      name: 'Adv Hassan Kunhi B',
      role: 'Advocate / Trustee',
      image: '/assets/Hassan-Kunhi-360x370.jpg',
      bio: '',
    },
  ],

  youtubeChannel: {
    title: 'Malhar Media',
    description: 'Official Malhar Educational Trust channel for lectures, campus updates and community stories.',
    url: 'https://www.youtube.com/@MalharMedia',
    latestVideoId: 'GAIJpIRvuPg',
  },

  quotes: [
    {
      arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
      translation: 'Read in the name of your Lord who created',
      source: 'Surah Al-Alaq (96:1)',
    },
    {
      arabic: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
      translation: 'Seeking knowledge is obligatory upon every Muslim',
      source: 'Hadith (Ibn Majah)',
    },
    {
      arabic: 'وَقُلْ رَبِّ زِدْنِي عِلْمًا',
      translation: 'And say: My Lord, increase me in knowledge',
      source: 'Surah Taha (20:114)',
    },
  ],
};

export default siteData;
