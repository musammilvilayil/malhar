import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./NewsV2.css";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

export default function NewsV2() {
  return (
    <main className="v2-news">
      <section className="v2-news__hero">
        <img
          className="v2-news__hero-image"
          src="/assets/DSC_2363-1-1-1.jpg"
          alt="A gathering at Malhar"
        />
        <div className="v2-news__hero-wash" />

        <nav className="v2-news__nav" aria-label="News page navigation">
          <Link className="v2-news__wordmark" to="/">
            <span>M</span><strong>Malhar</strong>
          </Link>
          <div>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>

        <motion.div className="v2-news__hero-copy" {...reveal}>
          <p>News & announcements</p>
          <h1>Stories in <em>motion.</em></h1>
          <span>
            Official updates, campus moments and announcements from across
            Malhar will be collected here.
          </span>
        </motion.div>
      </section>

      <section className="v2-news__latest">
        <motion.header {...reveal}>
          <p>Latest from Malhar</p>
          <h2>A newsroom built for verified stories.</h2>
        </motion.header>

        <motion.div className="v2-news__empty" {...reveal}>
          <span>Current status</span>
          <div>
            <h3>No verified posts are available yet.</h3>
            <p>
              New articles will appear here after they are published through
              Malhar’s official channels. No sample headlines, dates or events
              have been added.
            </p>
          </div>
          <a href="https://malharonline.com/" target="_blank" rel="noreferrer">
            Check official site <span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </section>

      <section className="v2-news__channels">
        <motion.div {...reveal}>
          <p>Stay informed</p>
          <h2>For current announcements, contact Malhar directly.</h2>
        </motion.div>

        <div className="v2-news__channel-list">
          <motion.a href="tel:+918891001205" {...reveal}>
            <small>Phone</small>
            <strong>+91 8891001205</strong>
            <span aria-hidden="true">↗</span>
          </motion.a>
          <motion.a href="mailto:Malhar.mjr@gmail.com" {...reveal}>
            <small>Email</small>
            <strong>Malhar.mjr@gmail.com</strong>
            <span aria-hidden="true">↗</span>
          </motion.a>
          <motion.a
            href="https://www.facebook.com/malharmanjeshwar/"
            target="_blank"
            rel="noreferrer"
            {...reveal}
          >
            <small>Official social channel</small>
            <strong>Malhar on Facebook</strong>
            <span aria-hidden="true">↗</span>
          </motion.a>
        </div>
      </section>

      <section className="v2-news__closing">
        <motion.div {...reveal}>
          <p>Have an enquiry?</p>
          <h2>Start a conversation with Malhar.</h2>
          <Link to="/contact">Contact Malhar <span aria-hidden="true">→</span></Link>
        </motion.div>
      </section>
    </main>
  );
}
