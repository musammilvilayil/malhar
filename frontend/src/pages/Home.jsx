import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import siteData from "../data/malharData";
import { GeoPattern, Overline } from "../components/site/Primitives";

const { institutions = [], gallery = [] } = siteData;

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

/* ---------------- Hero: Since 2000 ---------------- */
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.92, 0]);

  return (
    <section ref={ref} className="relative min-h-[92svh] md:min-h-screen overflow-hidden bg-emerald text-cream" data-testid="hero">
      <motion.img
        src="/assets/DSC_2363-1-1-1.jpg"
        alt="Malhar campus in Manjeshwar, Kasaragod"
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 h-[112%] w-full object-cover object-[58%_52%] md:object-center will-change-transform"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,22,17,.28)_0%,rgba(2,35,27,.42)_35%,rgba(3,46,36,.88)_78%,rgba(3,46,36,.98)_100%)] md:bg-[linear-gradient(90deg,rgba(3,37,29,.92)_0%,rgba(3,45,35,.62)_46%,rgba(3,45,35,.18)_82%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none"><GeoPattern color="#F5E9CF" opacity={0.12} /></div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 mx-auto flex min-h-[92svh] md:min-h-screen max-w-7xl items-end md:items-center px-5 sm:px-8 lg:px-12 pb-12 md:pb-16 pt-28 will-change-transform">
        <div className="max-w-5xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.65 }} className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.24em]">
            <span className="border-l-2 border-gold pl-3 text-cream/90">Malhar Educational Trust</span>
            <span className="text-cream/55">Manjeshwar · Kasaragod · Kerala</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08 }}
            className="mt-8 font-serif text-gold leading-none tracking-[-0.05em]"
            style={{ fontSize: "clamp(5.5rem, 18vw, 13rem)" }}
          >
            2000
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 max-w-4xl font-serif font-light leading-[0.92] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(3.15rem, 8vw, 7rem)" }}
          >
            Since then, bringing <span className="italic text-gold">light into lives.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.36 }}
            className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl font-light leading-relaxed text-cream/80"
          >
            Through Islamic and secular education rooted in faith, knowledge and service.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#founder-story" className="group inline-flex min-h-12 items-center gap-3 bg-gold px-6 py-3 text-sm font-semibold text-emerald transition hover:bg-cream">
              Begin the journey <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
            </a>
            <Link to="/our-institutions" className="inline-flex min-h-12 items-center gap-3 border border-cream/30 bg-black/10 px-6 py-3 text-sm text-cream backdrop-blur-md transition hover:bg-white/10">
              Explore institutions <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

/* ---------------- Founder Story ---------------- */
const FounderStory = () => (
  <section id="founder-story" className="relative bg-cream text-charcoal py-20 md:py-28 overflow-hidden" data-testid="founder-story">
    <div className="absolute inset-0 opacity-[0.035]"><GeoPattern color="#0A4D3C" opacity={0.2} /></div>
    <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-20">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8 }} className="relative overflow-hidden min-h-[520px] md:min-h-[620px] bg-emerald">
            <img src="/assets/Posoat-Thangal-360x370.jpg" alt="Sheikh Sayyid Umarul Farooq Al Bukhari, founder of Malhar" className="absolute inset-0 w-full h-full object-cover object-top grayscale" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald via-emerald/10 to-transparent" />
            <div className="absolute left-0 right-0 bottom-0 p-7 md:p-9 text-cream">
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Founder · Malhar</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">Posoat Thangal</h2>
              <p className="mt-2 text-sm text-cream/72">Sheikh Sayyid Umarul Farooq Al Bukhari</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="lg:col-span-7 lg:pt-16 lg:pb-36">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} transition={{ duration: 0.75 }}>
          <Overline>A vision takes root</Overline>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl md:text-6xl font-light leading-[1.02] tracking-[-0.03em]">An institution imagined as more than a place of study.</h2>
          <p className="mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-charcoal/65 font-light">Malhar was established in 2000 through the efforts of Sheikh Sayyid Umarul Farooq Al Bukhari, known as Posoat Thangal.</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={fadeUp} transition={{ duration: 0.75 }} className="mt-28 md:mt-40 border-t border-charcoal/15 pt-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold-brass">A mission</p>
          <p className="mt-6 max-w-3xl font-serif text-3xl md:text-5xl leading-[1.14] text-charcoal/90">To bring light into lives and serve educational, spiritual and social needs across the community.</p>
          <p className="mt-7 max-w-2xl text-base md:text-lg leading-relaxed text-charcoal/60">Malhar presents itself as a refuge for people from all walks of life, irrespective of religion, caste, creed or gender.</p>
          <Link to="/about-us" className="mt-8 inline-flex items-center gap-2 text-emerald font-medium link-underline">Read the full story <ArrowRight size={17} /></Link>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ---------------- Institutions Journey ---------------- */
const InstitutionsJourney = () => {
  const [active, setActive] = useState(0);
  const current = institutions[active] || institutions[0];

  return (
    <section className="relative bg-emerald text-cream py-24 md:py-32 overflow-hidden" data-testid="institutions">
      <div className="absolute inset-0 opacity-[0.08]"><GeoPattern color="#C5A059" opacity={0.14} /></div>
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <Overline>Our Institutions</Overline>
            <h2 className="mt-5 font-serif text-4xl md:text-6xl font-light leading-tight">Seven pillars of learning.</h2>
          </div>
          <Link to="/our-institutions" className="inline-flex items-center gap-2 text-gold link-underline">View all <ArrowRight size={17} /></Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="hidden lg:block lg:col-span-7">
            <div className="sticky top-28 h-[70vh] min-h-[560px] overflow-hidden bg-black/20">
              {institutions.map((inst, i) => (
                <motion.img
                  key={inst.slug}
                  src={inst.image}
                  alt={inst.name}
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.05 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald/90 via-transparent to-transparent" />
              <div className="absolute left-7 bottom-7 right-7 flex items-end justify-between gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-gold">{String(active + 1).padStart(2, "0")} / {String(institutions.length).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-serif text-3xl md:text-4xl">{current?.name}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            {institutions.map((inst, i) => (
              <motion.article
                key={inst.slug}
                onViewportEnter={() => setActive(i)}
                viewport={{ amount: 0.55 }}
                initial={{ opacity: 0.3 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-[62vh] lg:min-h-[72vh] flex flex-col justify-center border-t border-cream/15 first:border-t-0 py-10 lg:py-16"
              >
                <div className="lg:hidden mb-7 relative h-[48vh] min-h-[340px] overflow-hidden">
                  <img src={inst.image} alt={inst.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald/70 via-transparent to-transparent" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-serif text-3xl md:text-4xl leading-tight">{inst.name}</h3>
                <p className="mt-5 text-base md:text-lg leading-relaxed text-cream/65 font-light">{inst.description || inst.desc}</p>
                <Link to={`/institution/${inst.slug}`} className="mt-7 inline-flex items-center gap-2 text-gold font-medium link-underline w-fit">Explore institution <ArrowUpRight size={16} /></Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Campus Life Horizontal Story ---------------- */
const CampusLife = () => {
  const items = gallery.slice(0, 4);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${Math.max(0, items.length - 1) * 100}%`]);

  if (!items.length) return null;

  return (
    <section ref={ref} className="relative bg-charcoal text-cream md:h-[400vh]" data-testid="campus-story">
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden">
        <div className="hidden md:block absolute z-20 left-8 top-28 text-cream">
          <Overline>Campus life</Overline>
          <p className="mt-3 font-serif text-3xl">A day at Malhar, frame by frame.</p>
        </div>
        <motion.div style={{ x }} className="hidden md:flex h-screen will-change-transform" aria-hidden="true">
          {items.map((item, i) => (
            <div key={`${item.src}-${i}`} className="relative w-screen h-screen shrink-0">
              <img src={item.src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25" />
              <div className="absolute left-10 lg:left-16 bottom-14 max-w-2xl">
                <p className="text-[10px] uppercase tracking-[0.24em] text-gold">Frame {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-serif text-4xl lg:text-6xl leading-tight">{item.title || "Life at Malhar"}</h3>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="md:hidden px-5 py-20 space-y-14">
          <div><Overline>Campus life</Overline><h2 className="mt-4 font-serif text-4xl">A day at Malhar, frame by frame.</h2></div>
          {items.map((item, i) => (
            <motion.figure key={`${item.src}-${i}`} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}>
              <img src={item.src} alt={item.title || `Malhar campus moment ${i + 1}`} className="w-full h-[62vh] object-cover" loading="lazy" decoding="async" />
              <figcaption className="mt-4 font-serif text-2xl">{item.title || "Life at Malhar"}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Editorial Gallery Story ---------------- */
const GalleryStory = () => {
  const items = gallery.slice(4, 10).length ? gallery.slice(4, 10) : gallery.slice(0, 6);
  return (
    <section className="bg-cream text-charcoal py-24 md:py-32" data-testid="gallery-preview">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6 mb-16 md:mb-24">
          <div><Overline>Gallery</Overline><h2 className="mt-5 font-serif text-4xl md:text-6xl font-light">Glimpses of Malhar.</h2></div>
          <Link to="/gallery" className="hidden sm:inline-flex items-center gap-2 text-emerald link-underline">Full gallery <ArrowRight size={16} /></Link>
        </div>

        <div className="space-y-20 md:space-y-28">
          {items.map((item, i) => (
            <motion.figure
              key={`${item.src}-${i}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -70 : 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`max-w-5xl ${i % 2 === 0 ? "mr-auto" : "ml-auto"}`}
            >
              <div className={`overflow-hidden ${i % 3 === 0 ? "md:w-[82%]" : i % 3 === 1 ? "md:w-[68%] md:ml-auto" : "md:w-[76%]"}`}>
                <img src={item.src} alt={item.title || `Malhar gallery image ${i + 1}`} className={`w-full object-cover ${i % 2 === 0 ? "h-[54vh] md:h-[68vh]" : "h-[46vh] md:h-[58vh]"}`} loading="lazy" decoding="async" />
              </div>
              <figcaption className={`mt-5 max-w-xl ${i % 2 === 0 ? "" : "md:ml-auto"}`}>
                <p className="text-[10px] uppercase tracking-[0.24em] text-gold-brass">Moment {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl">{item.title || "A moment at Malhar"}</h3>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <Link to="/gallery" className="sm:hidden mt-14 inline-flex items-center gap-2 text-emerald link-underline">Full gallery <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
};

/* ---------------- Final Admission CTA ---------------- */
const AdmissionCTA = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative min-h-[82vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-emerald text-cream" data-testid="admission-banner">
      <motion.img style={{ y: imageY }} src="/assets/about-imgs.jpg" alt="Malhar campus" className="absolute inset-0 w-full h-[120%] object-cover opacity-30" loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-emerald/75" />
      <div className="absolute inset-0 opacity-[0.1]"><GeoPattern color="#F5E9CF" opacity={0.14} /></div>
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.85 }} className="relative z-10 max-w-5xl mx-auto px-5 text-center">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-gold">The next chapter</p>
        <h2 className="mt-6 font-serif font-light leading-[0.94] tracking-[-0.04em]" style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}>Ready to begin <span className="block italic text-gold">your journey?</span></h2>
        <p className="mt-7 max-w-xl mx-auto text-base md:text-lg text-cream/70 font-light leading-relaxed">For current admission dates, eligibility and programme details, contact the relevant Malhar institution.</p>
        <Link to="/admission" className="mt-9 inline-flex min-h-14 items-center gap-3 bg-gold px-8 py-4 text-sm md:text-base font-semibold text-emerald transition hover:bg-cream">Admission information <ArrowRight size={18} /></Link>
      </motion.div>
    </section>
  );
};

export default function Home() {
  return <><Hero /><FounderStory /><InstitutionsJourney /><CampusLife /><GalleryStory /><AdmissionCTA /></>;
}
