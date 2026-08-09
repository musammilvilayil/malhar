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
          <div className="v2-personalities__ornament" aria-hidden="true">
            <span />
            <i>✦</i>
            <span />
          </div>
          <h2 id="v2-personalities-title">Key Personalities</h2>
          <p>Guided by faith. Driven by purpose.</p>
        </header>

        <div className="v2-personalities__grid">
          {KEY_PERSONALITIES.map((person, index) => (
            <motion.article
              key={person.slug}
              className="v2-personalities__person"
              initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.98 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
            >
              <div className="v2-personalities__card">
                <div className="v2-personalities__card-media">
                  <div className="v2-personalities__card-media-inner">
                    <img
                      src={person.image}
                      alt={person.name}
                      width="360"
                      height="370"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="v2-personalities__card-pattern" aria-hidden="true" />
                    <div className="v2-personalities__card-overlay" aria-hidden="true" />
                  </div>
                </div>

                <div className="v2-personalities__card-copy">
                  <div className="v2-personalities__role">
                    <span aria-hidden="true">◆</span>
                    <p>{person.role}</p>
                    <span aria-hidden="true">◆</span>
                  </div>
                  <h3>{person.name}</h3>
                  {person.knownAs && <span>{person.knownAs}</span>}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
