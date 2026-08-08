import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ease = [0.22, 1, 0.36, 1];

export default function CampusJourney({ gallery = [] }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const scenes = gallery.filter((item) => item?.src).slice(0, 5);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : `-${Math.max(0, scenes.length - 1) * 100}%`]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!scenes.length) return null;

  return (
    <section ref={ref} className="relative bg-charcoal text-cream lg:h-[500vh]">
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <div className="absolute inset-x-0 top-0 z-30 h-px bg-cream/10">
          <motion.div style={{ scaleX: progress, transformOrigin: "0 50%" }} className="h-full bg-gold" />
        </div>

        <div className="absolute left-5 right-5 top-24 z-30 flex items-end justify-between sm:left-8 sm:right-8 lg:left-12 lg:right-12 pointer-events-none">
          <div>
            <p className="text-[10px] uppercase tracking-[.3em] text-gold">Campus life · A visual journey</p>
            <h2 className="mt-3 max-w-xl font-serif text-3xl leading-none md:text-5xl">Scroll through the <span className="italic text-gold">rhythm of Malhar.</span></h2>
          </div>
          <p className="hidden lg:block text-[10px] uppercase tracking-[.24em] text-cream/50">Scroll to travel →</p>
        </div>

        <motion.div style={{ x }} className="hidden lg:flex h-screen" aria-label="Malhar campus life story">
          {scenes.map((scene, i) => (
            <figure key={`${scene.src}-${i}`} className="relative h-screen w-screen shrink-0 overflow-hidden">
              <motion.img
                src={scene.src}
                alt={scene.title || `Malhar campus life ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 1.2, ease }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,20,17,.58)_0%,rgba(3,20,17,.08)_38%,rgba(3,45,35,.86)_100%)]" />
              <figcaption className="absolute bottom-12 left-12 right-12 z-10 flex items-end justify-between gap-10">
                <div className="max-w-3xl">
                  <p className="font-serif text-2xl text-gold">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-serif text-5xl leading-[.95] md:text-7xl">{scene.title || "A moment at Malhar"}</h3>
                </div>
                <span className="font-serif text-xl text-cream/45">{String(i + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </motion.div>

        <div className="lg:hidden pt-48 pb-10 space-y-3 px-4">
          {scenes.map((scene, i) => (
            <motion.figure key={`${scene.src}-mobile-${i}`} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: .7, ease }} className="relative min-h-[72svh] overflow-hidden rounded-[1.5rem_1.5rem_4rem_1.5rem]">
              <img src={scene.src} alt={scene.title || `Malhar campus life ${i + 1}`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald via-emerald/20 to-black/10" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-serif text-xl text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-serif text-3xl leading-tight">{scene.title || "A moment at Malhar"}</h3>
              </figcaption>
            </motion.figure>
          ))}
          <Link to="/gallery" className="mx-2 mt-8 inline-flex items-center gap-2 text-gold">Explore the full gallery <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
