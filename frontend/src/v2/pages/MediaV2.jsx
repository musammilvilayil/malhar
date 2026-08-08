import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../v2.css";
import "./MediaV2.css";
import { LIVE_URL, YOUTUBE_CHANNEL, CONTACT } from "../../data";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export default function MediaV2() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -18]);
  return (
    <main className="v2-media">
      <Navbar />

      <section className="v2-media__hero" ref={heroRef}>
        <motion.img
          src="/assets/web-slide-1-2048x909.webp"
          alt="Malhar campus"
          className="v2-media__hero-bg"
          style={{ y: bgY }}
          aria-hidden="true"
        />
        <div className="v2-media__hero-wash" />
        <div className="v2-media__hero-grain" aria-hidden="true" />

        <motion.div className="v2-media__hero-copy" {...reveal}>
          <span>Malhar Media</span>
          <h1>Stories, talks <em>and updates.</em></h1>
          <p>Official videos, social highlights and verified coverage from Malhar.</p>
        </motion.div>
      </section>

      

      <section className="v2-media__videos" aria-labelledby="media-videos-title">
        <motion.header {...reveal}>
          <span>Featured</span>
          <h2 id="media-videos-title">Latest from Malhar Media</h2>
        </motion.header>

        <div className="v2-media__video-grid">
          <motion.div
            className="v2-media__video-card"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.35 }}
          >
            <div className="v2-media__video-frame">
              <iframe
                title="Latest video"
                src={`https://www.youtube.com/embed/${YOUTUBE_CHANNEL?.latestVideoId || ""}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>

          <motion.aside className="v2-media__video-actions" {...reveal}>
            <p>Explore more videos and channel updates.</p>
            <a className="v2-primary-action" href={LIVE_URL} target="_blank" rel="noreferrer">Visit YouTube channel</a>
            <Link to="/news" className="v2-secondary-action">View Newsroom</Link>
          </motion.aside>
        </div>
      </section>

      <section className="v2-media__channels">
        <motion.header {...reveal}>
          <span>Connect</span>
          <h2>Follow Malhar on social</h2>
        </motion.header>

        <div className="v2-media__channel-list">
          <a href="https://www.facebook.com/malharmanjeshwar/" target="_blank" rel="noreferrer">
            <small>Facebook</small>
            <strong>Malhar on Facebook</strong>
          </a>
          <a href={LIVE_URL} target="_blank" rel="noreferrer">
            <small>YouTube</small>
            <strong>Malhar Media</strong>
          </a>
          <a href={`mailto:${CONTACT.email}`}>
            <small>Contact</small>
            <strong>{CONTACT.email}</strong>
          </a>
        </div>
      </section>

      <section className="v2-media__closing">
        <motion.div {...reveal}>
          <span>Have media enquiries?</span>
          <h2>Contact Malhar's media team.</h2>
          <a href={`tel:${CONTACT.phones?.[0] ? CONTACT.phones[0].replace(/\s/g, "") : ""}`}>Call {CONTACT.phones?.[0]}</a>
          <Link to="/contact">Contact form <span aria-hidden="true">→</span></Link>
        </motion.div>
      </section>
    </main>
  );
}
