import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "./QuranVersesV2.css";

const verses = [
  {
    number: "01",
    arabic: "يَرْفَعِ ٱللَّهُ ٱلَّذِينَ ءَامَنُوا۟ مِنكُمْ وَٱلَّذِينَ أُوتُوا۟ ٱلْعِلْمَ دَرَجَـٰتٍۢ",
    english: "Allah will elevate those of you who are faithful, and raise those gifted with knowledge in rank.",
    reference: "Al-Mujādilah · 58:11",
  },
];

function VersePanel({ verse, index, reducedMotion }) {
  return (
    <motion.article
      className="v2-quran__verse"
      initial={reducedMotion ? false : { opacity: 0, y: 70 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.9, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="v2-quran__verse-index" aria-hidden="true">
        <span>{verse.number}</span>
        <i />
      </div>

      <div className="v2-quran__verse-body">
        <p className="v2-quran__arabic" lang="ar" dir="rtl">
          {verse.arabic}
        </p>

        <div className="v2-quran__translation-row">
          <p className="v2-quran__translation">{verse.english}</p>
          <p className="v2-quran__reference">{verse.reference}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function QuranVersesV2() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const haloY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [80, -90]);
  const chapterY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [28, -28]);

  return (
    <section ref={sectionRef} id="divine-wisdom" className="v2-quran" aria-labelledby="v2-quran-title">
      <motion.div className="v2-quran__halo" style={{ y: haloY }} aria-hidden="true" />
      <div className="v2-quran__grain" aria-hidden="true" />
      <div className="v2-quran__chapter-mark" aria-hidden="true">02</div>

      <div className="v2-quran__inner">
        <motion.header
          className="v2-quran__header"
          style={{ y: chapterY }}
          initial={reducedMotion ? false : { opacity: 0, y: 35 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="v2-quran__chapter-label">
            <span>Chapter 02</span>
            <i />
            <span>Divine Wisdom</span>
          </div>

          <div className="v2-quran__intro-grid">
            <h2 id="v2-quran-title">
              Knowledge begins
              <em>with revelation.</em>
            </h2>
            <p>
              Three Qur’anic passages frame learning not simply as achievement,
              but as reading, understanding and elevation through knowledge.
            </p>
          </div>
        </motion.header>

        <div className="v2-quran__verses">
          {verses.map((verse, index) => (
            <VersePanel
              key={verse.reference}
              verse={verse}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        <footer className="v2-quran__footer">
          <span>A Qur’anic passage on knowledge</span>
          <span>Arabic text + English meaning</span>
        </footer>
      </div>
    </section>
  );
}
