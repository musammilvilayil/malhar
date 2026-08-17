import { motion, useReducedMotion } from "framer-motion";

const pillars = [
  { number: "01", title: "Faith", text: "A clear spiritual foundation that gives learning its direction." },
  { number: "02", title: "Learning", text: "Traditional values and contemporary education moving together." },
  { number: "03", title: "Service", text: "Knowledge carried outward through responsibility, community and purpose." },
];

export default function V3Manifesto() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="v3-manifesto" aria-labelledby="v3-manifesto-title">
      <div className="v3-manifesto__orb" aria-hidden="true" />

      <div className="v3-manifesto__inner">
        <div className="v3-manifesto__meta">
          <span>Malhar</span>
          <i />
          <span>Manjeshwar</span>
          <i />
          <span>Since 2000</span>
        </div>

        <motion.h2
          id="v3-manifesto-title"
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          Rooted in <em>faith.</em><br />
          Built around <em>learning.</em><br />
          Carried through <em>service.</em>
        </motion.h2>

        <div className="v3-manifesto__pillars">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.1 }}
            >
              <span>{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
