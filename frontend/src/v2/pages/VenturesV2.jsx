import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Home, MapPin, BookOpen, Cpu, Archive } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../v2.css";
import "./VenturesV2.css";
import { INSTITUTIONS } from "../../data";
import { siteData } from "../../data/malharData";

const ventures = [
  /* Institutions */
  { name: "SHAREEATH COLLEGE", category: "Institutions" },
  { name: "ISLAMIC DA'AWA", category: "Institutions" },
  { name: "MODEL ACADEMY", category: "Institutions" },
  { name: "COLLEGE OF COMMERCE", category: "Institutions" },
  { name: "SHE GARDEN", category: "Institutions" },
  { name: "COLLEGE OF QURA'N STUDIES", category: "Institutions" },
  { name: "NOORUL HUDA MACHAMPADI", category: "Institutions" },
  { name: "ACADEMY OF GENERAL EDUCATION KOTEKAR", category: "Institutions" },
  { name: "ENGLISH SCHOOL BEJJANGALA", category: "Institutions" },
  { name: "MALHARUL HIDAYA BEJJANGALA", category: "Institutions" },
  { name: "MALHARUL HUDA BERIKE", category: "Institutions" },

  /* Mosques */
  { name: "AL BUKHARI JUMA MASJID", category: "Mosques" },
  { name: "ABOOBAKKAR SIDEEQUE JUMA MASJID", category: "Mosques" },
  { name: "RAHMATHAL MASJID", category: "Mosques" },

  /* Creative / Clubs */
  { name: "SMART WRITERS", category: "Creative" },
  { name: "SMART PEN GALLERY", category: "Creative" },
  { name: "LITTERARY JUNCTION", category: "Creative" },
  { name: "LANGUAGE FUNCTION", category: "Creative" },
  { name: "MORAL THEATRE", category: "Creative" },
  { name: "SPEACH CRAFT", category: "Creative" },
  { name: "READING CAFE", category: "Creative" },

  /* Centers & Services */
  { name: "COMPUTER CENTER", category: "Centers" },
  { name: "TAILORING CENTER", category: "Centers" },
  { name: "MIID RESEARCH CENTER", category: "Centers" },
  { name: "RELIEF & DA'AWA CELL", category: "Centers" },

  /* Foundations */
  { name: "ZEAL FOUNDATION BALLARI", category: "Foundations" },
];

const categories = [
  { key: "Institutions", icon: Home, desc: "Colleges, schools and formal learning centres." },
  { key: "Mosques", icon: MapPin, desc: "Community mosques and prayer spaces." },
  { key: "Creative", icon: BookOpen, desc: "Clubs, programmes and creative initiatives." },
  { key: "Centers", icon: Cpu, desc: "Service centres and training hubs." },
  { key: "Foundations", icon: Archive, desc: "Foundational trusts and community outreach." },
];

const reveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

function findInstitutionSlug(name) {
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "");
  const n = norm(name);
  for (const inst of INSTITUTIONS) {
    const instNorm = norm(inst.name);
    // match by shared long word
    const instWords = instNorm.split(" ").filter((w) => w.length > 3);
    if (instWords.some((w) => n.includes(w))) return inst.slug;
  }
  return null;
}

export default function VenturesV2() {
  const reduceMotion = useReducedMotion();
  const [compactMotion, setCompactMotion] = useState(false);
  const heroRef = useRef(null);
  const motionDisabled = reduceMotion || compactMotion;
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, motionDisabled ? 0 : -22]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const updateMotionPreference = () => setCompactMotion(query.matches);

    updateMotionPreference();
    query.addEventListener?.("change", updateMotionPreference);
    return () => query.removeEventListener?.("change", updateMotionPreference);
  }, []);

  const getImageForVenture = (v) => {
    // prefer institutional images
    const slug = findInstitutionSlug(v.name);
    if (slug) {
      const inst = INSTITUTIONS.find((i) => i.slug === slug) || siteData.institutions.find((i) => i.slug === slug);
      if (inst?.image) return inst.image;
    }
    // fallback: match gallery by keyword
    const keyword = v.name.split(" ")[0].toLowerCase();
    const galleryHit = (siteData.gallery || []).find((g) => g.title.toLowerCase().includes(keyword));
    if (galleryHit) return galleryHit.src;
    // last resort: a neutral campus/thumbnail
    return "/assets/web-slide-1-2048x909.webp";
  };

  return (
    <main className="v2-ventures">
      <Navbar />

      <section className="v2-ventures__hero" ref={heroRef}>
        <motion.img
          src="/assets/web-slide-1-2048x909.webp"
          className="v2-ventures__hero-bg"
          style={{ y: heroY }}
          alt=""
          aria-hidden="true"
          width="2048"
          height="909"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="v2-ventures__hero-wash" />
        <div className="v2-ventures__letterbox-top" aria-hidden="true" />
        <div className="v2-ventures__letterbox-bottom" aria-hidden="true" />
        <motion.div
          className="v2-ventures__hero-copy"
          initial={motionDisabled ? false : "hidden"}
          animate="visible"
          variants={reveal}
          transition={{ duration: motionDisabled ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          <p>Our ventures</p>
          <h1>Malhar's <em>community of initiatives.</em></h1>
          <span>Programs, institutions, mosques and community centres supported by Malhar.</span>
        </motion.div>
      </section>

      <section className="v2-ventures__list">
        <div className="v2-ventures__grid-shell">
          {categories.map((cat) => (
            <article key={cat.key} className="v2-ventures__category">
              <header>
                <cat.icon className="v2-ventures__cat-icon" />
                <h2>{cat.key}</h2>
                <p className="v2-ventures__cat-desc">{cat.desc}</p>
              </header>

              <div className="v2-ventures__cards">
                {ventures.filter((v) => v.category === cat.key).map((v, idx) => {
                  const img = getImageForVenture(v);
                  const slug = findInstitutionSlug(v.name);
                  const href = slug ? `/institutions/${slug}` : "/admissions";
                  return (
                    <motion.article
                      key={v.name}
                      className="v2-ventures__card"
                      initial={motionDisabled ? false : { opacity: 0, y: 18, scale: 0.996 }}
                      whileInView={motionDisabled ? undefined : { opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.16 }}
                      transition={{ duration: 0.46, delay: Math.min(idx * 0.025, 0.2), ease: [0.4, 0, 0.2, 1] }}
                      whileHover={motionDisabled ? undefined : { y: -5, scale: 1.008 }}
                    >
                      <div className="v2-ventures__card-media">
                        <motion.img
                          src={img}
                          alt={v.name}
                          width="360"
                          height="240"
                          loading="lazy"
                          decoding="async"
                          whileHover={motionDisabled ? undefined : { scale: 1.045 }}
                        />
                      </div>
                      <div className="v2-ventures__card-body">
                        <strong>{v.name}</strong>
                        <Link className="v2-ventures__learn" to={href}>Learn more</Link>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
