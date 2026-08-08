import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { INSTITUTIONS } from "../../data";
import "../v2.css";
import "./AboutV2.css";

const principles = [
  {
    number: "01",
    title: "Faith",
    body: "An educational environment grounded in Islamic values, scholarship and spiritual formation.",
  },
  {
    number: "02",
    title: "Learning",
    body: "Islamic and secular education moving together with the changing needs of everyday life.",
  },
  {
    number: "03",
    title: "Service",
    body: "Educational, spiritual and social support offered to people from every background.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutV2() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  return (
    <main className="v2-about">
      <Navbar />
      <section className="v2-about__hero" aria-labelledby="v2-about-title">
        <img
          src="/assets/about-imgs.jpg"
          alt="Malhar campus and community"
          className="v2-about__hero-image"
        />
        <div className="v2-about__hero-wash" aria-hidden="true" />

        <motion.div
          className="v2-about__hero-copy"
          initial={initial}
          animate="visible"
          variants={reveal}
          transition={{ duration: .85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>About Malhar · Established 2000</p>
          <h1 id="v2-about-title">
            Learning with
            <em>light and purpose.</em>
          </h1>
          <span>
            Malhar Nooril Islami Tha&apos;aleemi brings Islamic tradition,
            modern learning and community service into one living educational mission.
          </span>
        </motion.div>
      </section>

      <section className="v2-about__story" aria-labelledby="v2-about-story-title">
        <motion.div
          className="v2-about__story-copy"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: .25 }}
          variants={reveal}
          transition={{ duration: .8 }}
        >
          <p>Our beginning</p>
          <h2 id="v2-about-story-title">A vision rooted in Manjeshwar.</h2>
          <div>
            <p>
              Malhar was established in 2000 through the efforts of
              Sheikh Sayyid Umarul Farooq Al Bukhari, widely known as
              Posoat Thangal.
            </p>
            <p>
              The name stands for more than an institution. Malhar serves
              educational, spiritual and social needs without distinction
              of religion, caste, creed or gender.
            </p>
          </div>
          <blockquote>“Bring light into the lives of thousands.”</blockquote>
        </motion.div>

        <motion.figure
          className="v2-about__founder"
          initial={reduceMotion ? false : { opacity: 0, scale: .97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: .25 }}
          transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/assets/Posoat-Thangal.jpg"
            alt="Sheikh Sayyid Umarul Farooq Al Bukhari"
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <span>Founder</span>
            <strong>Sheikh Sayyid Umarul Farooq Al Bukhari</strong>
            <small>Posoat Thangal</small>
          </figcaption>
        </motion.figure>
      </section>

      <section className="v2-about__principles" aria-labelledby="v2-principles-title">
        <header>
          <p>What guides us</p>
          <h2 id="v2-principles-title">Faith. Learning. Service.</h2>
        </header>

        <div className="v2-about__principle-grid">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.title}
              initial={initial}
              whileInView="visible"
              viewport={{ once: true, amount: .4 }}
              variants={reveal}
              transition={{ duration: .7, delay: index * .08 }}
            >
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="v2-about__paths" aria-labelledby="v2-paths-title">
        <header>
          <p>Featured learning paths</p>
          <h2 id="v2-paths-title">Seven expressions of one purpose.</h2>
          <span>
            A selection of institutions featured in the Malhar V2 journey.
          </span>
        </header>

        <ol>
          {INSTITUTIONS.map((institution, index) => (
            <motion.li
              key={institution.slug}
              initial={reduceMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: .6 }}
              transition={{ duration: .55, delay: Math.min(index * .05, .25) }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{institution.name}</strong>
              <p>{institution.desc}</p>
            </motion.li>
          ))}
        </ol>

        <Link to="/admissions" className="v2-about__text-link">
          Explore all institutions <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className="v2-about__cta" aria-labelledby="v2-about-cta-title">
        <p>Continue the journey</p>
        <h2 id="v2-about-cta-title">Find your place at Malhar.</h2>
        <div>
          <Link to="/admissions">Admission information <span aria-hidden="true">↗</span></Link>
          <Link to="/contact">Contact Malhar <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
