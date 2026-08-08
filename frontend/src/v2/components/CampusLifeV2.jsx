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
    reduceMotion ? ["0%", "0%"] : ["-2.5%", "2.5%"]
  );

  return (
    <motion.article
      ref={cardRef}
      className={`v2-campus__card v2-campus__card--${index + 1}`}
      initial={reduceMotion ? false : { opacity: 0, y: 42 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <figure className="v2-campus__media">
        <motion.img
          src={moment.image}
          alt={moment.title}
          loading="lazy"
          decoding="async"
          style={{ y: imageY }}
        />
        <div className="v2-campus__media-wash" aria-hidden="true" />
        <figcaption>
          <span>{String(index + 2).padStart(2, "0")}</span>
          <div>
            <p>{moment.title}</p>
            <small>{moment.subtitle}</small>
          </div>
        </figcaption>
      </figure>
    </motion.article>
  );
}

export default function CampusLifeV2() {
  const lead = moments[0];

  return (
    <section id="campus-life" className="v2-campus" aria-labelledby="v2-campus-title">
      <header className="v2-campus__hero">
        <img
          src={lead.image}
          alt={lead.title}
          className="v2-campus__hero-image"
          loading="lazy"
          decoding="async"
        />
        <div className="v2-campus__hero-wash" aria-hidden="true" />
        <div className="v2-campus__hero-grain" aria-hidden="true" />

        <div className="v2-campus__hero-content">
          <p className="v2-campus__eyebrow"><span>Campus Life</span><i /></p>

          <div className="v2-campus__hero-grid">
            <h2 id="v2-campus-title">
              Life between
              <em>the lessons.</em>
            </h2>

            <div className="v2-campus__hero-copy">
              <span>Everyday Malhar</span>
              <p>
                A visual journal of the spaces, gatherings and everyday moments
                that shape life at Malhar.
              </p>
            </div>
          </div>

          <div className="v2-campus__hero-footer">
            <div>
              <span>01</span>
              <strong>{lead.title}</strong>
            </div>
            <p>{lead.subtitle}</p>
          </div>
        </div>
      </header>

      <div className="v2-campus__journal">
        <div className="v2-campus__journal-heading">
          <p>Inside the campus</p>
          <span>Study · Friendship · Community</span>
        </div>

        <div className="v2-campus__editorial">
          {moments.slice(1).map((moment, index) => (
            <CampusMoment key={moment.title} moment={moment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
