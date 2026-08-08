import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import siteData from "../data/malharData";
import { GeoPattern } from "../components/site/Primitives";
import CampusJourney from "../components/site/CampusJourney";

const { institutions = [], about = {}, founder = {}, gallery = [] } = siteData;
const ease = [0.22, 1, 0.36, 1];

function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, reduce ? 1.03 : 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -64]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.9, 0.2]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const goToStory = () => document.getElementById("origin-story")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={ref} className="relative min-h-[92svh] md:min-h-screen overflow-hidden bg-emerald text-cream">
      <motion.img src="/assets/DSC_2363-1-1-1.jpg" alt="Malhar campus in Manjeshwar, Kasaragod" style={{ y: imageY, scale: imageScale }} className="absolute inset-0 h-[112%] w-full object-cover object-[56%_50%] md:object-[58%_52%]" loading="eager" fetchPriority="high" decoding="async" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,18,14,.18)_0%,rgba(3,42,32,.32)_35%,rgba(3,45,35,.84)_74%,rgba(3,45,35,.98)_100%)] md:bg-[linear-gradient(90deg,rgba(2,27,21,.97)_0%,rgba(3,45,35,.84)_38%,rgba(3,45,35,.23)_72%,rgba(3,45,35,.08)_100%)]" />
      <div className="absolute inset-0 opacity-[.13]"><GeoPattern color="#F5E9CF" opacity={0.1} /></div>

      <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10 mx-auto flex min-h-[92svh] md:min-h-screen max-w-7xl items-end md:items-center px-5 sm:px-8 lg:px-12 pb-10 md:pb-16 pt-28">
        <div className="grid w-full lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease }} className="flex flex-wrap gap-3 items-center text-[10px] sm:text-xs uppercase tracking-[.24em]">
              <span className="inline-flex items-center gap-2 border border-cream/20 bg-black/15 backdrop-blur-md rounded-full px-4 py-2"><span className="w-1.5 h-1.5 bg-gold rounded-full" /> Est. 2000</span>
              <span className="text-cream/70">Manjeshwar · Kasaragod · Kerala</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 52 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .1, ease }} className="mt-6">
              <p className="inline-flex border-l-2 border-gold bg-black/25 backdrop-blur-md px-3 py-2 text-[10px] sm:text-xs uppercase tracking-[.28em] font-semibold text-cream">Malhar Educational Trust</p>
              <h1 className="mt-4 font-serif font-semibold tracking-[-.05em] leading-[.88] text-white text-[clamp(3.2rem,11vw,8rem)]">Qur&apos;anic<span className="block">heritage.</span><span className="block mt-3 font-light italic text-gold text-[.78em] leading-[.95]">Education for tomorrow.</span></h1>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .34, ease }} className="mt-6 max-w-2xl text-[15px] sm:text-lg leading-7 sm:leading-8 font-light text-cream/82">Islamic and modern learning connected by one purpose — nurturing faith, knowledge and character in Manjeshwar.</motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .48, ease }} className="mt-7 flex flex-col sm:flex-row gap-3">
              <button onClick={goToStory} className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold text-emerald font-semibold px-7 py-4 hover:bg-cream transition-all duration-300 hover:-translate-y-1">Begin the journey <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" /></button>
              <Link to="/admission" className="group inline-flex items-center justify-center gap-3 rounded-full border border-cream/30 bg-black/10 backdrop-blur-md px-7 py-4 text-cream hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">Admission Information <ArrowUpRight size={17} className="group-hover:rotate-45 transition-transform" /></Link>
            </motion.div>
          </div>

          <motion.aside initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, delay: .55, ease }} className="hidden lg:block lg:col-span-4 pb-8">
            <div className="ml-auto max-w-xs border-l border-gold/60 pl-6"><p className="text-[10px] uppercase tracking-[.28em] text-gold">One purpose</p><p className="mt-4 font-serif text-3xl leading-tight">Faith. Knowledge. Character.</p><p className="mt-4 text-sm leading-6 font-light text-cream/62">An educational mission rooted in Islamic values and contemporary learning since 2000.</p></div>
          </motion.aside>
        </div>
      </motion.div>

      <div className="absolute left-0 right-0 bottom-0 h-px bg-cream/10"><motion.div style={{ scaleX: progress, transformOrigin: "0 50%" }} className="h-full bg-gold" /></div>
    </section>
  );
}

function OriginStory() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 70, reduce ? 0 : -55]);
  const yearY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 90, reduce ? 0 : -90]);

  return (
    <section id="origin-story" ref={ref} className="relative overflow-hidden bg-cream text-charcoal py-24 md:py-36">
      <motion.div style={{ y: yearY }} className="pointer-events-none absolute -right-8 top-10 font-serif text-[34vw] md:text-[24vw] leading-none text-emerald/[.035] select-none">2000</motion.div>
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <motion.div style={{ y: portraitY }} className="relative max-w-md mx-auto lg:mx-0">
            <div className="absolute -left-4 -top-4 w-24 h-24 border-l border-t border-gold/60" />
            <div className="overflow-hidden rounded-[2rem_2rem_7rem_2rem] bg-emerald/5 aspect-[4/5] shadow-[0_35px_100px_rgba(5,61,48,.12)]"><img src={founder?.image || "/assets/Posoat-Thangal-360x370.jpg"} alt={`${founder?.name || "Sheikh Sayyid Umarul Farooq Al Bukhari"}, founder of Malhar`} className="w-full h-full object-cover grayscale-[.15]" loading="lazy" /></div>
            <div className="mt-6 flex items-start gap-4"><span className="mt-2 h-px w-10 bg-gold shrink-0" /><div><p className="font-serif text-xl md:text-2xl">{founder?.name || "Sheikh Sayyid Umarul Farooq Al Bukhari"}</p><p className="mt-1 text-xs uppercase tracking-[.2em] text-gold-brass">Founder · {founder?.knownAs || "Posoat Thangal"}</p></div></div>
          </motion.div>
        </div>

        <div className="lg:col-span-7 lg:pt-24">
          <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: .7, ease }} className="text-xs uppercase tracking-[.28em] text-gold-brass">The beginning</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: .9, delay: .08, ease }} className="mt-5 max-w-3xl font-serif font-light text-4xl md:text-6xl leading-[1.02] tracking-[-.025em] text-charcoal">A story that began with <span className="italic text-emerald">light</span>, and grew through learning.</motion.h2>
          <motion.p initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: .8, delay: .14, ease }} className="mt-8 max-w-2xl text-lg md:text-xl leading-8 md:leading-9 font-light text-charcoal/68">{about?.mission || "Malhar seeks to bring light into lives through Islamic and secular education, serving educational, spiritual and social needs."}</motion.p>

          <div className="mt-16 border-t border-charcoal/10">
            {[["01","A vision","Malhar was established in 2000 through the efforts of Sheikh Sayyid Umarul Farooq Al Bukhari, known as Posoat Thangal."],["02","A mission","Malhar brings Islamic values and contemporary education together in one learning environment."],["03","A community","Its wider purpose includes educational, spiritual and social needs for people from different backgrounds."]].map(([n,title,body],i)=><motion.div key={n} initial={{opacity:0,x:26}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:"-12%"}} transition={{duration:.75,delay:i*.08,ease}} className="grid grid-cols-[54px_1fr] md:grid-cols-[80px_1fr] gap-4 border-b border-charcoal/10 py-7 md:py-9"><span className="font-serif text-2xl text-gold">{n}</span><div><h3 className="font-serif text-2xl md:text-3xl">{title}</h3><p className="mt-2 max-w-xl text-charcoal/60 leading-7 font-light">{body}</p></div></motion.div>)}
          </div>
          <Link to="/about-us" className="mt-10 inline-flex items-center gap-2 text-emerald font-medium group">Read the full story <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" /></Link>
        </div>
      </div>
    </section>
  );
}

function InstitutionsStory() {
  const [active, setActive] = useState(0);
  const current = institutions[active] || institutions[0];
  if (!institutions.length) return null;

  return (
    <section className="relative bg-emerald text-cream py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[.1]"><GeoPattern color="#C5A059" opacity={0.08} /></div>
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl mb-14 md:mb-20"><p className="text-xs uppercase tracking-[.28em] text-gold">Our institutions · One continuum</p><h2 className="mt-5 font-serif text-4xl md:text-6xl font-light leading-[1.02]">Learning changes shape.<br/><span className="italic text-gold">The purpose stays.</span></h2></div>

        <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 sticky top-24 h-[72vh] min-h-[560px]">
            <div className="relative h-full overflow-hidden rounded-[2.5rem_8rem_2.5rem_2.5rem] bg-black/20 shadow-[0_40px_120px_rgba(0,0,0,.22)]"><motion.img key={current?.slug} src={current?.image} alt={current?.name} initial={{opacity:0,scale:1.08}} animate={{opacity:1,scale:1}} transition={{duration:.85,ease}} className="absolute inset-0 w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-emerald via-emerald/20 to-transparent" /><div className="absolute left-10 right-10 bottom-10"><p className="text-[10px] uppercase tracking-[.28em] text-gold">{String(active+1).padStart(2,"0")} / {String(institutions.length).padStart(2,"0")}</p><motion.h3 key={`${current?.slug}-title`} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.55,ease}} className="mt-3 max-w-2xl font-serif text-5xl leading-[1.02]">{current?.name}</motion.h3></div></div>
          </div>
          <div className="lg:col-span-5">{institutions.map((it,i)=><motion.article key={it.slug} onViewportEnter={()=>setActive(i)} viewport={{amount:.6}} className="min-h-[54vh] flex items-center border-t border-cream/15 py-12 first:border-t-0"><div className={`transition-opacity duration-300 ${active===i?"opacity-100":"opacity-45"}`}><p className="font-serif text-gold text-2xl">{String(i+1).padStart(2,"0")}</p><h3 className="mt-4 font-serif text-3xl leading-tight">{it.name}</h3><p className="mt-4 text-cream/65 leading-7 font-light max-w-md">{it.description || it.desc}</p><Link to={`/institution/${it.slug}`} className="mt-6 inline-flex items-center gap-2 text-gold group">Explore institution <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" /></Link></div></motion.article>)}</div>
        </div>

        <div className="lg:hidden space-y-5">{institutions.map((it,i)=><motion.article key={it.slug} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-8%"}} transition={{duration:.7,ease}} className="relative min-h-[58svh] overflow-hidden rounded-[1.5rem_1.5rem_4.5rem_1.5rem]"><img src={it.image} alt={it.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-emerald via-emerald/30 to-black/5" /><div className="absolute inset-x-0 bottom-0 p-6"><p className="text-xs tracking-[.22em] text-gold">{String(i+1).padStart(2,"0")}</p><h3 className="mt-2 font-serif text-3xl leading-tight">{it.name}</h3><p className="mt-3 text-sm leading-6 text-cream/72">{it.description || it.desc}</p><Link to={`/institution/${it.slug}`} className="mt-5 inline-flex items-center gap-2 text-gold">Explore <ArrowUpRight size={15} /></Link></div></motion.article>)}</div>
      </div>
    </section>
  );
}

function EditorialGallery() {
  const picks = gallery.filter((item)=>item?.src).slice(0,6);
  if (!picks.length) return null;
  return (
    <section className="bg-cream text-charcoal py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"><div><p className="text-xs uppercase tracking-[.28em] text-gold-brass">A living campus</p><h2 className="mt-5 font-serif text-4xl md:text-6xl font-light">Moments that continue the story.</h2></div><Link to="/gallery" className="inline-flex items-center gap-2 text-emerald group">Full gallery <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" /></Link></div>
        <div className="space-y-20 md:space-y-28">{picks.map((img,i)=><motion.figure key={`${img.src}-${i}`} initial={{opacity:0,x:i%2===0?-80:80}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:"-10%"}} transition={{duration:.85,ease}} className={`max-w-4xl ${i%2===0?"mr-auto":"ml-auto"}`}><div className={`relative overflow-hidden ${i%3===0?"aspect-[16/10] rounded-[2rem_7rem_2rem_2rem]":i%3===1?"aspect-[5/4] rounded-[6rem_2rem_2rem_2rem]":"aspect-[3/2] rounded-[2rem]"}`}><img src={img.src} alt={img.title || `Malhar campus moment ${i+1}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.035]" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-emerald/55 via-transparent to-transparent" /></div>{img.title&&<figcaption className="mt-5 flex items-center gap-4"><span className="h-px w-10 bg-gold" /><span className="font-serif text-xl md:text-2xl">{img.title}</span></figcaption>}</motion.figure>)}</div>
      </div>
    </section>
  );
}

function FinalInvitation() {
  return (
    <section className="relative min-h-[70svh] md:min-h-[85svh] flex items-center overflow-hidden bg-emerald text-cream py-28 md:py-40">
      <div className="absolute inset-0 opacity-[.11]"><GeoPattern color="#C5A059" opacity={0.08} /></div>
      <div className="relative max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8"><motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-10%"}} transition={{duration:.8,ease}}><p className="inline-flex items-center gap-2 text-xs uppercase tracking-[.28em] text-gold"><Sparkles size={14}/> Begin here</p><h2 className="mt-5 font-serif text-5xl md:text-7xl leading-[.95] tracking-[-.035em]">The next chapter is <span className="italic text-gold">yours.</span></h2><p className="mt-6 max-w-xl text-lg leading-8 text-cream/68 font-light">Explore Malhar’s institutions or contact the administration for current admission information.</p></motion.div></div>
        <div className="lg:col-span-4 flex lg:justify-end"><div className="flex flex-col gap-3 w-full max-w-sm"><Link to="/admission" className="group inline-flex items-center justify-between gap-3 rounded-full bg-gold text-emerald font-semibold px-7 py-4">Admission Information <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" /></Link><Link to="/contact" className="group inline-flex items-center justify-between gap-3 rounded-full border border-cream/25 px-7 py-4 text-cream hover:bg-white/5 transition-colors">Contact Malhar <ArrowUpRight size={17} className="group-hover:rotate-45 transition-transform" /></Link></div></div>
      </div>
    </section>
  );
}

export default function HomeCinematic() {
  return <><Hero/><OriginStory/><InstitutionsStory/><CampusJourney gallery={gallery}/><EditorialGallery/><FinalInvitation/></>;
}
