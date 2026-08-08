import { motion, useReducedMotion } from "framer-motion";
import { KEY_PERSONALITIES } from "../../data";
import "./KeyPersonalitiesV2.css";

export default function KeyPersonalitiesV2() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="v2-personalities" aria-labelledby="v2-personalities-title">
      <div className="v2-personalities__inner">
        <header className="v2-personalities__header">
          <p>Malhar · Leadership</p>
          <h2 id="v2-personalities-title">
            Key <em>personalities.</em>
          </h2>
          <span>The people whose vision and service continue to shape Malhar.</span>
        </header>

        <div className="v2-personalities__grid">
          {KEY_PERSONALITIES.map((person, index) => (
            <motion.article
              key={person.slug}
              className="v2-personalities__person"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="v2-personalities__portrait">
                <img src={person.image} alt={person.name} loading="lazy" decoding="async" />
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="v2-personalities__copy">
                <p>{person.role}</p>
                <h3>{person.name}</h3>
                {person.knownAs && <span>{person.knownAs}</span>}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
