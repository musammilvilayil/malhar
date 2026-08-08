import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "./FounderV2.css";

const founder = {
  name: "Sheikh Sayyid Umarul Farooq Al Bukhari",
  knownAs: "Posoat Thangal",
  image: "/assets/Posoat-Thangal-360x370.jpg",
};

const ease = [0.22, 1, 0.36, 1];

export default function FounderV2() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const portraitY = useTransform(
    scrollYProgress,
    [0, 1],
    [reduceMotion ? 0 : 48, reduceMotion ? 0 : -48]
  );

  const portraitScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [1.02, 1, 1.035]
  );

  return (
    <section
      id="v2-next-chapter"
      ref={sectionRef}
      className="v2-founder"
      aria-labelledby="v2-founder-title"
    >
      <div className="v2-founder__grain" aria-hidden="true" />
      <div className="v2-founder__chapter" aria-hidden="true">01</div>

      <div className="v2-founder__layout">
        <div className="v2-founder__visual-column">
          <div className="v2-founder__sticky">
            <motion.figure
              className="v2-founder__portrait-wrap"
              style={{ y: portraitY }}
            >
              <motion.img
                src={founder.image}
                alt={`${founder.name}, founder of Malhar`}
                className="v2-founder__portrait"
                style={{ scale: portraitScale }}
                loading="lazy"
                decoding="async"
              />
              <div className="v2-founder__portrait-wash" aria-hidden="true" />
              <figcaption className="v2-founder__portrait-caption">
                <span>Founder</span>
                <strong>{founder.knownAs}</strong>
              </figcaption>
            </motion.figure>

            <div className="v2-founder__timeline" aria-label="Malhar timeline">
              <span>2000</span>
              <span className="v2-founder__timeline-line" />
              <span>Present</span>
            </div>
          </div>
        </div>

        <div className="v2-founder__story-column">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.75, ease }}
            className="v2-founder__intro"
          >
            <p className="v2-founder__eyebrow">Chapter 01 · The beginning</p>
            <h2 id="v2-founder-title">
              A vision shaped by
              <span>faith and learning.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-14%" }}
            transition={{ duration: 0.8, delay: 0.06, ease }}
            className="v2-founder__identity"
          >
            <p className="v2-founder__identity-label">The founder</p>
            <h3>{founder.name}</h3>
            <p className="v2-founder__known-as">Known as {founder.knownAs}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-14%" }}
            transition={{ duration: 0.8, ease }}
            className="v2-founder__statement"
          >
            <p className="v2-founder__statement-kicker">The name</p>
            <p className="v2-founder__brand-name">Malharu Nooril Islami Tha&apos;aleemi</p>
            <p>
              Malhar was established in 2000 through the efforts of Sheikh Sayyid
              Umarul Farooq Al Bukhari, known as Posoat Thangal.
            </p>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, x: 34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-16%" }}
            transition={{ duration: 0.85, ease }}
            className="v2-founder__mission"
          >
            <span className="v2-founder__mission-mark" aria-hidden="true">“</span>
            <p>To bring light into the lives of thousands.</p>
            <cite>Malhar&apos;s stated purpose</cite>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.8, ease }}
            className="v2-founder__body-copy"
          >
            <p>
              From Manjeshwar, Malhar developed as an educational and social
              institution bringing Islamic and secular education into one learning
              environment.
            </p>
            <p>
              Its stated purpose extends beyond a single community, serving
              educational, spiritual and social needs irrespective of religion,
              caste, creed or gender.
            </p>
          </motion.div>

          <div className="v2-founder__closing-rule" aria-hidden="true">
            <span>2000</span>
            <span />
            <span>Manjeshwar</span>
          </div>
        </div>
      </div>
    </section>
  );
}
