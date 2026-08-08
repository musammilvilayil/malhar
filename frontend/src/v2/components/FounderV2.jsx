import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "./FounderV2.css";

const founder = {
  name: "Sheikh Sayyid Umarul Farooq Al Bukhari",
  knownAs: "Posoat Thangal",
  image: "/assets/Posoat-Thangal.jpg",
};

export default function FounderV2() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backdropScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1.08, 1.08] : [1.12, 1.03]
  );
  const portraitY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["3%", "-3%"]
  );
  const reveal = reduceMotion ? false : { opacity: 0, y: 28 };

  return (
    <section
      id="v2-next-chapter"
      ref={sectionRef}
      className="v2-founder"
      aria-labelledby="v2-founder-title"
    >
      <motion.img
        src={founder.image}
        alt=""
        aria-hidden="true"
        className="v2-founder__backdrop"
        style={{ scale: backdropScale }}
      />
      <div className="v2-founder__backdrop-wash" aria-hidden="true" />
      <motion.img
        src={founder.image}
        alt={founder.name + ", founder of Malhar"}
        className="v2-founder__portrait"
        style={{ y: portraitY }}
        loading="lazy"
        decoding="async"
      />
      <div className="v2-founder__shade" aria-hidden="true" />
      <div className="v2-founder__grain" aria-hidden="true" />
      <div className="v2-founder__frame">
        <motion.header
          className="v2-founder__chapter"
          initial={reveal}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          <p>The Vision</p>
        </motion.header>

        <div className="v2-founder__content">
          <motion.p
            className="v2-founder__tagline"
            initial={reveal}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.04 }}
          >
            Life between the lessons
          </motion.p>

          <motion.div
            className="v2-founder__identity"
            initial={reveal}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1 }}
          >
            <p>The founder</p>
            <h2 id="v2-founder-title">{founder.name}</h2>
            <strong>{founder.knownAs}</strong>
          </motion.div>

          <motion.div
            className="v2-founder__brand"
            initial={reveal}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.16 }}
          >
            <p>Malharu Nooril Islami Tha&apos;aleemi</p>
            <span>Faith · Learning · Service</span>
          </motion.div>

          <motion.blockquote
            className="v2-founder__quote"
            initial={reveal}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.22 }}
          >
            <p>“Bring light into the lives of thousands.”</p>
          </motion.blockquote>

          <motion.footer
            className="v2-founder__timeline"
            initial={reveal}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.28 }}
          >
            <span>2000</span><i /><span>Present</span>
          </motion.footer>
        </div>
      </div>
    </section>
  );
}
