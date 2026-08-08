import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./DonationV2.css";

const supportAreas = [
  {
    number: "01",
    title: "Qur’an & religious education",
    body: "Support the Hiflul Qur’an, Da’wa, Sharee’ath, Madrasa and Dars initiatives presented by Malhar.",
  },
  {
    number: "02",
    title: "Schools & colleges",
    body: "Help sustain the learning environments through which Malhar serves its students and community.",
  },
  {
    number: "03",
    title: "Masjids & community",
    body: "Contribute towards Malhar’s masjids and its wider educational and community programmes.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

export default function DonationV2() {
  return (
    <main className="v2-donation">
      <section className="v2-donation__hero">
        <img
          className="v2-donation__hero-image"
          src="/assets/DSC_2363-1-1-1.jpg"
          alt="A gathering at Malhar campus"
        />
        <div className="v2-donation__hero-wash" />

        <nav className="v2-donation__nav" aria-label="Donation page navigation">
          <Link className="v2-donation__wordmark" to="/">
            <span>M</span>
            <strong>Malhar</strong>
          </Link>
          <div>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>

        <motion.div className="v2-donation__hero-copy" {...reveal}>
          <p>Support Malhar</p>
          <h1>Give with <em>purpose.</em></h1>
          <span>
            Your support strengthens Qur’an education, institutions and
            community initiatives carried forward by Malhar.
          </span>
        </motion.div>
      </section>

      <section className="v2-donation__intro">
        <motion.div {...reveal}>
          <p>Where support reaches</p>
          <h2>Education that continues beyond a classroom.</h2>
        </motion.div>
        <motion.p {...reveal}>
          Malhar’s official donation appeal identifies religious education,
          schools, colleges, masjids and community programmes as areas supported
          through contributions.
        </motion.p>
      </section>

      <section className="v2-donation__areas" aria-labelledby="support-areas-title">
        <motion.header {...reveal}>
          <p>Areas of support</p>
          <h2 id="support-areas-title">A contribution can carry many stories forward.</h2>
        </motion.header>
        <div className="v2-donation__area-list">
          {supportAreas.map((area, index) => (
            <motion.article
              key={area.number}
              {...reveal}
              transition={{ ...reveal.transition, delay: index * 0.08 }}
            >
              <span>{area.number}</span>
              <h3>{area.title}</h3>
              <p>{area.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="v2-donation__method">
        <motion.div className="v2-donation__method-copy" {...reveal}>
          <p>Donate safely</p>
          <h2>Confirm the current payment method before transferring.</h2>
          <span>
            Payment details can change. Contact the Malhar office using the
            verified phone number or email below to receive and confirm the
            current donation instructions.
          </span>
        </motion.div>

        <motion.address {...reveal}>
          <a href="tel:+918891001205">
            <small>Call</small>
            <strong>+91 8891001205</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a href="mailto:Malhar.mjr@gmail.com">
            <small>Email</small>
            <strong>Malhar.mjr@gmail.com</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://malharonline.com/donate-us/"
            target="_blank"
            rel="noreferrer"
          >
            <small>Official source</small>
            <strong>Malhar donation page</strong>
            <span aria-hidden="true">↗</span>
          </a>
        </motion.address>
      </section>

      <section className="v2-donation__cta">
        <motion.div {...reveal}>
          <p>Begin with a conversation</p>
          <h2>Every responsible gift starts with verified details.</h2>
          <div>
            <a href="tel:+918891001205">Call Malhar <span>↗</span></a>
            <Link to="/contact">Contact page <span>→</span></Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
