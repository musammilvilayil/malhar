import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "./CampusLifeV2.css";

const moments = [
  {
    title: "Campus Assembly",
    subtitle: "Students gathering in the shared life of the campus.",
    image: "/assets/DSC_2363-1-1-1.jpg",
  },
  {
    title: "Main Campus",
    subtitle: "The learning environment at the heart of Malhar.",
    image: "/assets/web-slide-1-2048x909.webp",
  },
  {
    title: "Campus Panorama",
    subtitle: "A wider view of the spaces that connect the community.",
    image: "/assets/gal.jpg",
  },
  {
    title: "Students & Events",
    subtitle: "Moments of participation, expression and togetherness.",
    image: "/assets/gal1.jpg",
  },
  {
    title: "Learning Spaces",
    subtitle: "Everyday spaces shaped around study and growth.",
    image: "/assets/about-imgs.jpg",
  },
];

function CampusMoment({ moment, index }) {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-3%", "3%"]
  );

  return (
    <motion.article
      ref={cardRef}
      className={`v2-campus__card v2-campus__card--${index + 1}`}
      initial={reduceMotion ? false : { opacity: 0, y: 54 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.85, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <figure className="v2-campus__media">
        <motion.img
          src={moment.image}
          alt={moment.title}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          style={{ y: imageY }}
        />
        <div className="v2-campus__media-wash" aria-hidden="true" />
        <figcaption>
          <p>{moment.title}</p>
          <span>{moment.subtitle}</span>
        </figcaption>
      </figure>
    </motion.article>
  );
}

export default function CampusLifeV2() {
  return (
    <section id="campus-life" className="v2-campus" aria-labelledby="v2-campus-title">
      <div className="v2-campus__grain" aria-hidden="true" />

      <header className="v2-campus__intro">
        <p><span>Campus Life</span><i /></p>
        <div className="v2-campus__intro-grid">
          <h2 id="v2-campus-title">
            <span>Life between</span>
            <em>the lessons.</em>
          </h2>

          <div className="v2-campus__intro-copy">
            <span>Everyday Malhar</span>
            <p>
              A quiet visual journal of the spaces, gatherings and everyday moments
              that shape life at Malhar.
            </p>
          </div>
        </div>

        <div className="v2-campus__intro-footer" aria-hidden="true">
          <span>Study</span><i /><span>Friendship</span><i /><span>Community</span>
        </div>
      </header>

      <div className="v2-campus__editorial">
        {moments.map((moment, index) => (
          <CampusMoment key={moment.title} moment={moment} index={index} />
        ))}
      </div>
    </section>
  );
}
