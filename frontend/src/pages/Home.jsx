import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Marquee from "react-fast-marquee";
import { ArrowRight, ArrowUpRight, Play, X, Building2, GraduationCap, Bus, Calendar, Film, Clock } from "lucide-react";
import { MANIFESTO, FACILITIES } from "../data";
import siteData from "../data/malharData";
import { MaskedLines, Reveal, Stagger, StaggerItem, Overline, GeoPattern, Counter, QuoteBlock } from "../components/site/Primitives";
import { StatsCounter, GalleryParallax } from "../components/scroll";

const ICONS = { Building2, GraduationCap, Bus };
const STATS = [
  { to: 50, suffix: "+", label: "Instructors" },
  { to: 25, suffix: "+", label: "Programmes" },
  { to: 25, suffix: "+", label: "Live Sessions / Month" },
  { to: 885, suffix: "+", label: "Registered Students" },
];

const { contact, institutions, about, founder, gallery, news, events, quotes, youtubeChannel, instructors } = siteData;

/* ---------------- Hero ---------------- */
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-center pt-20 md:pt-32 pb-12 md:pb-16 overflow-hidden" data-testid="hero">
      <div className="absolute inset-0 pointer-events-none"><GeoPattern color="#0A4D3C" opacity={0.045} /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-12 gap-10 items-center">
        <motion.div style={{ y: textY }} className="lg:col-span-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Overline>Est. 2000 · Kasaragod, Kerala</Overline>
          </motion.div>
          <MaskedLines
            tag="h1"
            className="mt-6 font-serif font-semibold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.02] tracking-tight bg-gradient-to-r from-gold to-emerald bg-clip-text text-transparent"
            lines={["Qur'anic heritage", "with modern", "educational excellence."]}
            delay={0.3}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-7 text-charcoal/60 text-lg font-light max-w-md leading-relaxed"
          >
            {about.mission}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/our-institutions" className="group inline-flex items-center gap-2 px-7 py-4 bg-emerald text-cream hover:bg-emerald-light transition-colors" data-testid="hero-cta-institutions">
              Explore Institutions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/admission" className="group inline-flex items-center gap-2 px-7 py-4 border border-charcoal/25 text-charcoal hover:border-emerald hover:text-emerald transition-colors" data-testid="hero-cta-admission">
              Apply for Admission <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-6">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="relative border border-charcoal/10 p-3 bg-cream"
          >
            <div className="overflow-hidden aspect-video">
              <motion.img
                style={{ y: imgY, scale: 1.05 }}
                src="https://i.pinimg.com/1200x/6e/31/d0/6e31d0003985dc6c691bf4f50df867c3.jpg"
                alt="Malhar campus hero"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* hero overlay stats removed per request */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Marquee ---------------- */
const Strip = () => (
  <div className="bg-gold py-6 border-y border-brass/40" data-testid="marquee">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Arabic verse removed as requested */}
        <div className="mt-4 overflow-hidden">
        <Marquee speed={40} gradient={false} autoFill>
          {["Malhar Educational Trust", "Empowering Generations", "Tradition meets Tomorrow", "Knowledge · Faith · Character", "Years of Excellence", "Students Educated", "Expert Faculty"].map((t, i) => (
            <span key={i} className="font-serif italic text-emerald text-2xl md:text-3xl mx-8 whitespace-nowrap">
              {t} <span className="text-brass not-italic">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  </div>
);

/* ---------------- Stats ---------------- */
const Stats = () => <StatsCounter />;

/* ---------------- Manifesto / About ---------------- */
const Manifesto = () => (
  <section className="py-28 bg-cream border-t border-charcoal/10" data-testid="about">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-14">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <div className="border border-charcoal/10 p-3">
              <div className="overflow-hidden aspect-[4/5] grayscale">
                <img src="/assets/Posoat-Thangal-360x370.jpg" alt="Portrait of founder Sheikh Sayyid Umarul Farooq Al Bukhari (Posoat Thangal)" className="w-full h-full object-cover" />
              </div>
            </div>
            <p className="mt-5 font-serif text-xl text-charcoal">Sheikh Sayyid Umarul Farooq Al Bukhari</p>
            <p className="text-sm text-gold-brass tracking-wide uppercase">Founder · Posoat Thangal</p>
          </Reveal>
        </div>
      </div>
      <div className="lg:col-span-7">
        <Reveal><Overline>Our Vision</Overline></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-serif font-light text-4xl md:text-5xl leading-tight text-charcoal">A foundation for faith, knowledge and character.</h2>
        </Reveal>
        <div className="mt-12 space-y-10">
          {MANIFESTO.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.1}>
              <div className="flex gap-6 border-t border-charcoal/10 pt-6">
                <span className="font-serif text-2xl text-gold shrink-0">{m.n}</span>
                <div>
                  <h3 className="font-serif text-2xl text-charcoal">{m.title}</h3>
                  <p className="mt-2 text-charcoal/60 font-light leading-relaxed">{m.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <Link to="/about-us" className="mt-10 inline-flex items-center gap-2 text-emerald font-medium link-underline" data-testid="about-readmore">
            Read our full story <ArrowRight size={17} />
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- Institutions ---------------- */
const Institutions = () => {
  const items = institutions;
  // create a display copy and swap model-academy and she-bud positions
  const displayItems = [...items];
  const idxModel = displayItems.findIndex((it) => it.slug === "model-academy");
  const idxShe = displayItems.findIndex((it) => it.slug === "she-bud");
  if (idxModel >= 0 && idxShe >= 0) {
    const tmp = displayItems[idxModel];
    displayItems[idxModel] = displayItems[idxShe];
    displayItems[idxShe] = tmp;
  }
  return (
    <section className="py-28 bg-emerald text-cream relative overflow-hidden" data-testid="institutions">
      <div className="absolute inset-0"><GeoPattern color="#C5A059" opacity={0.05} /></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Reveal><Overline>Our Institutions</Overline></Reveal>
            <Reveal delay={0.1}><h2 className="mt-5 font-serif font-light text-4xl md:text-5xl">Seven pillars of learning.</h2></Reveal>
          </div>
          <Reveal delay={0.2}><Link to="/our-institutions" className="inline-flex items-center gap-2 text-gold link-underline" data-testid="institutions-viewall">View all <ArrowRight size={17} /></Link></Reveal>
        </div>
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/10">
          {displayItems.map((it, i) => (
            <StaggerItem key={it.slug} className={`bg-emerald ${i === 0 ? "lg:col-span-2" : ""}`}>
              <Link to="/our-institutions" className="group block img-zoom relative h-full min-h-[320px]" data-testid={`inst-card-${it.slug}`}>
                <img
                  src={it.image}
                  alt={it.name}
                  className={`absolute inset-0 w-full h-full object-cover opacity-55 ${it.slug === 'shareath-college' || it.slug === 'english-school' ? 'object-right' : ''}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald via-emerald/40 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-8">
                  <h3 className="font-serif text-2xl leading-snug">{it.name}</h3>
                  <p className="mt-2 text-cream/70 text-sm font-light max-w-sm">{it.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-gold text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">Learn More <ArrowUpRight size={16} /></span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

/* ---------------- Campus Video ---------------- */
const CampusVideo = () => {
  const [play, setPlay] = useState(false);
  return (
    <section className="py-28 bg-cream" data-testid="campus-video">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <Overline className="justify-center">Campus Life</Overline>
          <h2 className="mt-5 font-serif font-light text-4xl md:text-5xl text-charcoal">Step inside Malhar.</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative border border-charcoal/10 p-3">
            <div className="relative aspect-video overflow-hidden bg-charcoal">
              {play ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeChannel.latestVideoId}?autoplay=1&rel=0`}
                  title={youtubeChannel.title}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src="/assets/gal.jpg"
                    alt="Malhar campus cover"
                    className="w-full h-full object-cover opacity-60"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald/85 via-emerald/15 to-emerald/40" />
                  <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 bg-gold text-emerald text-xs font-semibold tracking-[0.15em] uppercase px-3 py-1.5" data-testid="video-badge"><Film size={13} /> Campus Film</span>
                  <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-cream text-xs px-3 py-1.5 border border-cream/25" data-testid="video-duration"><Clock size={12} /> Full Tour</span>
                  <button onClick={() => setPlay(true)} className="absolute inset-0 flex items-center justify-center group" data-testid="video-play" aria-label="Play campus tour">
                    <span className="w-20 h-20 rounded-full bg-gold text-emerald flex items-center justify-center group-hover:scale-110 transition-transform"><Play size={28} className="ml-1" fill="currentColor" /></span>
                  </button>
                  <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                    <p className="text-gold text-xs tracking-[0.2em] uppercase">Watch the film</p>
                    <h3 className="mt-1 font-serif text-2xl md:text-3xl text-cream">Inside Malhar</h3>
                  </div>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ---------------- Personalities ---------------- */
const MediaHighlight = () => {
  const videoId = youtubeChannel.latestVideoId;
  const previewSrc = `/assets/${videoId}-maxresdefault.jpg`;
  return (
    <section className="py-28 bg-gold/5 border-t border-charcoal/10" data-testid="media-highlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <Reveal><Overline>Media Highlight</Overline></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-serif font-light text-4xl md:text-5xl text-charcoal">Explore Malhar Media on YouTube.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-charcoal/70 font-light text-lg max-w-xl">
              Subscribe to our official YouTube channel for lectures, campus updates, events and community stories from Malhar.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/media" className="inline-flex items-center gap-2 px-6 py-4 bg-emerald text-cream hover:bg-emerald-light transition-colors">
                Explore Media
              </Link>
              <Link to="/media" className="inline-flex items-center gap-2 px-6 py-4 border border-charcoal/20 text-charcoal hover:border-emerald hover:text-emerald transition-colors">
                View Media Page
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="relative overflow-hidden border border-charcoal/10 bg-charcoal aspect-video">
            <img src={previewSrc} alt={`${youtubeChannel.title} preview`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-cream/80">YouTube Channel</p>
              <h3 className="mt-2 font-serif text-3xl text-cream">{youtubeChannel.title}</h3>
              <p className="mt-3 text-sm text-cream/70 max-w-sm">{youtubeChannel.description}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Personalities = () => {
  const items = instructors;
  return (
    <section className="py-28 bg-cream border-t border-charcoal/10" data-testid="personalities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-14"><Overline>Key Personalities</Overline><h2 className="mt-5 font-serif font-light text-4xl md:text-5xl text-charcoal">The people behind Malhar.</h2></Reveal>
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p) => (
            <StaggerItem key={p.slug}>
              <Link to={`/instructor/${p.slug}`} className="group block" data-testid={`person-${p.slug}`}>
                <div className="img-zoom border border-charcoal/10 aspect-[3/4] grayscale group-hover:grayscale-0 transition-all duration-500">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-emerald/10 flex items-center justify-center font-serif text-5xl text-emerald/40">{p.name?.charAt(0)}</div>
                  )}
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.15em] text-gold-brass">{p.role}</p>
                <p className="mt-1 font-serif text-lg text-charcoal leading-snug">{p.name}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

/* ---------------- News & Events ---------------- */
const NewsEvents = () => {
  const newsItems = news || [];
  const eventsItems = events || [];

  return (
    <section className="py-28 bg-emerald text-cream" data-testid="news-events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-7">
          <Reveal className="flex items-end justify-between mb-10">
            <div><Overline>Latest News</Overline><h2 className="mt-4 font-serif font-light text-3xl md:text-4xl">From the trust</h2></div>
            <Link to="/news" className="text-gold link-underline text-sm" data-testid="news-viewall">All news</Link>
          </Reveal>
          {newsItems.length === 0 ? (
            <Reveal className="border border-cream/15 p-10 text-cream/60 font-light">The latest Malhar announcements will appear here as soon as they are published.</Reveal>
          ) : (
            <Stagger className="grid sm:grid-cols-2 gap-6">
              {newsItems.slice(0, 4).map((n) => (
                <StaggerItem key={n.id} className="border border-cream/15 img-zoom">
                  {n.image_url && <div className="aspect-[16/10] overflow-hidden"><img src={n.image_url} alt={n.title} className="w-full h-full object-cover" /></div>}
                  <div className="p-6">
                    <p className="text-xs text-gold tracking-wide">{n.date || new Date(n.created_at).toLocaleDateString()}</p>
                    <h3 className="mt-2 font-serif text-xl">{n.title}</h3>
                    <p className="mt-2 text-cream/60 text-sm font-light line-clamp-2">{n.summary}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
        <div className="lg:col-span-5">
          <Reveal className="mb-10"><Overline>Upcoming Events</Overline><h2 className="mt-4 font-serif font-light text-3xl md:text-4xl">Mark your calendar</h2></Reveal>
          {eventsItems.length === 0 ? (
            <Reveal className="border border-cream/15 p-10 text-cream/60 font-light flex items-center gap-4"><Calendar className="text-gold" /> No upcoming events are scheduled at this time. Visit News for the latest campus updates.</Reveal>
          ) : (
            <Stagger className="divide-y divide-cream/15 border-t border-cream/15">
              {eventsItems.slice(0, 5).map((e) => (
                <StaggerItem key={e.id} className="py-5 flex gap-5 items-start">
                  <span className="font-serif text-gold text-lg w-24 shrink-0">{e.date || "TBA"}</span>
                  <div><h3 className="font-serif text-lg">{e.title}</h3>{e.location && <p className="text-cream/50 text-sm">{e.location}</p>}</div>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Facilities ---------------- */
const Facilities = () => (
  <section className="py-28 bg-cream" data-testid="facilities">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="mb-14"><Overline>Facilities</Overline><h2 className="mt-5 font-serif font-light text-4xl md:text-5xl text-charcoal">Built for focused learning.</h2></Reveal>
      <div className="grid md:grid-cols-3 border-t border-l border-charcoal/10">
        {FACILITIES.map((f, i) => {
          const Icon = ICONS[f.icon];
          return (
            <Reveal key={f.title} delay={i * 0.1} className="border-r border-b border-charcoal/10 p-10">
              <Icon size={34} strokeWidth={1.2} className="text-emerald" />
              <h3 className="mt-6 font-serif text-2xl text-charcoal">{f.title}</h3>
              <p className="mt-3 text-charcoal/60 font-light leading-relaxed">{f.body}</p>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------------- Gallery ---------------- */
const GalleryStrip = () => {
  const images = gallery.slice(0, 9).map((g) => ({ src: g.src, caption: g.title || "", cols: 1 }));
  return (
    <section className="py-28 bg-cream border-t border-charcoal/10" data-testid="gallery-preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex items-end justify-between mb-12">
          <div><Overline>Gallery</Overline><h2 className="mt-5 font-serif font-light text-4xl md:text-5xl text-charcoal">Moments at Malhar.</h2></div>
          <Link to="/gallery" className="text-emerald link-underline text-sm" data-testid="gallery-viewall">Full gallery</Link>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div key={`${img.src}-${i}`} className={`relative img-zoom border border-charcoal/10 overflow-hidden group ${img.cols === 2 ? "md:col-span-2" : ""}`}>
              <img src={img.src} alt={img.caption || `Malhar gallery ${i + 1}`} className={`w-full h-full object-cover ${img.cols === 2 ? "aspect-[4/3]" : "aspect-[4/5]"}`} loading="lazy" />
              {img.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald/90 to-transparent p-4 pt-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-cream text-sm font-light">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Admission Banner (parallax) ---------------- */
const AdmissionBanner = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-emerald" data-testid="admission-banner">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src="/assets/about-imgs.jpg" alt="Campus background" className="w-full h-full object-cover opacity-25" />
      </motion.div>
      <div className="absolute inset-0 bg-emerald/60" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal><span className="font-arabic text-2xl text-gold">اقرأ باسم ربك</span></Reveal>
        <Reveal delay={0.1}><h2 className="mt-6 font-serif font-light text-4xl md:text-6xl text-cream leading-tight">Begin your journey with Malhar.</h2></Reveal>
        <Reveal delay={0.2}><p className="mt-6 text-cream/70 font-light text-lg max-w-xl mx-auto">Admissions are open across our institutions. Join a community rooted in faith and reaching toward the future.</p></Reveal>
        <Reveal delay={0.3}>
          <Link to="/admission" className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-gold text-emerald font-medium hover:bg-brass transition-colors" data-testid="banner-admission-cta">
            Apply for Admission <ArrowRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <Hero />
      <Strip />
      <Stats />
      <Manifesto />
      <Institutions />
      <MediaHighlight />
      <CampusVideo />
      <Personalities />
      <NewsEvents />
      <Facilities />
      <GalleryParallax />
      <GalleryStrip />
      <AdmissionBanner />
    </>
  );
}
