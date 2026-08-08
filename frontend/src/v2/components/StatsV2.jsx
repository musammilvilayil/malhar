import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import "./StatsV2.css";

const stats = [
  { value: 4200, suffix: "+", label: "Registered students" },
  { value: 150, suffix: "+", label: "Professional instructors" },
  { value: 15, suffix: "", label: "Different courses" },
  { value: 25, suffix: "", label: "Live sessions every month" },
];

function AnimatedNumber({ value, suffix, active, reduceMotion }) {
  const [displayValue, setDisplayValue] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!active) return undefined;
    if (reduceMotion) {
      setDisplayValue(value);
      return undefined;
    }

    const duration = 1500;
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduceMotion, value]);

  return (
    <span>
      {displayValue.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function StatsV2() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, amount: 0.28 });

  return (
    <section
      ref={sectionRef}
      className="v2-stats"
      aria-labelledby="v2-stats-title"
    >
      <div className="v2-stats__grain" aria-hidden="true" />

      <header className="v2-stats__header">
        <p>Malhar in numbers</p>
        <h2 id="v2-stats-title">
          Learning that
          <em>keeps growing.</em>
        </h2>
        <span>Figures published by Malhar</span>
      </header>

      <div className="v2-stats__grid">
        {stats.map((stat, index) => (
          <motion.article
            key={stat.label}
            className="v2-stats__item"
            initial={reduceMotion ? false : { opacity: 0, y: 26 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{
              duration: 0.7,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <strong>
              <AnimatedNumber
                value={stat.value}
                suffix={stat.suffix}
                active={isInView}
                reduceMotion={reduceMotion}
              />
            </strong>
            <p>{stat.label}</p>
            <i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
