import { motion, useReducedMotion } from "framer-motion";
import { KEY_PERSONALITIES } from "../../data";
import "./KeyPersonalitiesV2.css";

export default function KeyPersonalitiesV2() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="v2-personalities" aria-labelledby="v2-personalities-title">
      <div className="v2-personalities__grain" aria-hidden="true" />
      <div className="v2-personalities__overlay" aria-hidden="true" />

      <div className="v2-personalities__inner">
        <header className="v2-personalities__header">
          <p>Malhar · Leadership</p>
          <h2 id="v2-personalities-title">
            Key <em>personalities.</em>
          </h2>
          <span>The visionaries shaping Malhar through service, faith and education.</span>
        </header>

        <div className="v2-personalities__grid">
          {KEY_PERSONALITIES.map((person, index) => (
            <motion.article
              key={person.slug}
              className="v2-personalities__person"
              initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.98 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduceMotion ? undefined : { y: -8, scale: 1.01 }}
            >
              <div className="v2-personalities__card">
                <div className="v2-personalities__card-media">
                  <img src={person.image} alt={person.name} loading="lazy" decoding="async" />
                  <div className="v2-personalities__card-overlay" />
                </div>

                <div className="v2-personalities__card-copy">
                  <p>{person.role}</p>
                  <h3>{person.name}</h3>
                  {person.knownAs && <span>{person.knownAs}</span>}
                </div>
              </div>

              <div className="v2-personalities__card-glow" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
