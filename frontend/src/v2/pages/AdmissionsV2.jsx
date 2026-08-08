import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { CONTACT, INSTITUTIONS } from "../../data";
import "../v2.css";
import "./AdmissionsV2.css";

const admissionSlugs = [
  "model-academy",
  "miid",
  "she-garden",
  "quran-studies",
  "sharia",
  "english-medium",
];

const admissionOptions = admissionSlugs
  .map((slug) => INSTITUTIONS.find((institution) => institution.slug === slug))
  .filter(Boolean);

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AdmissionsV2() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";
  const primaryPhone = CONTACT.phones[0];

  return (
    <main className="v2-admissions">
      <section className="v2-admissions__hero" aria-labelledby="v2-admissions-title">
        <img
          src="/assets/web-slide-1-2048x909.webp"
          alt="Malhar campus"
          className="v2-admissions__hero-image"
        />
        <div className="v2-admissions__hero-wash" aria-hidden="true" />

        <nav className="v2-admissions__nav" aria-label="Admissions page navigation">
          <Link to="/" className="v2-admissions__wordmark">
            <span>M</span>
            <strong>Malhar</strong>
          </Link>
          <div>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>

        <motion.div
          className="v2-admissions__hero-copy"
          initial={initial}
          animate="visible"
          variants={reveal}
          transition={{ duration: .85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>Admission information</p>
          <h1 id="v2-admissions-title">
            Begin with
            <em>a conversation.</em>
          </h1>
          <span>
            Explore the Malhar institutions currently listed on the official
            admissions page, then contact the trust for current availability
            and institution-specific guidance.
          </span>
        </motion.div>
      </section>

      <section className="v2-admissions__intro" aria-labelledby="v2-admissions-intro-title">
        <motion.div
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: .3 }}
          variants={reveal}
          transition={{ duration: .75 }}
        >
          <p>Choosing a path</p>
          <h2 id="v2-admissions-intro-title">Find the learning environment that fits.</h2>
        </motion.div>
        <motion.p
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: .3 }}
          variants={reveal}
          transition={{ duration: .75, delay: .08 }}
        >
          Programme requirements, dates and availability may differ by institution.
          Malhar&apos;s admissions team can provide the current details directly.
        </motion.p>
      </section>

      <section className="v2-admissions__options" aria-labelledby="v2-admission-options-title">
        <header>
          <p>Official admission options</p>
          <h2 id="v2-admission-options-title">Six paths currently listed.</h2>
          <span>Verified from Malhar&apos;s official admission page.</span>
        </header>

        <ol>
          {admissionOptions.map((institution, index) => (
            <motion.li
              key={institution.slug}
              initial={reduceMotion ? false : { opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: .55 }}
              transition={{ duration: .55, delay: Math.min(index * .06, .25) }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{institution.name}</strong>
                <p>{institution.desc}</p>
              </div>
              <Link to={`/institutions/${institution.slug}`} aria-label={`Explore ${institution.name}`}>
                Explore <i aria-hidden="true">↗</i>
              </Link>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="v2-admissions__contact" aria-labelledby="v2-admissions-contact-title">
        <div>
          <p>Current details</p>
          <h2 id="v2-admissions-contact-title">Speak with Malhar.</h2>
          <span>
            Contact the trust directly for current admission dates,
            programme details and application guidance.
          </span>
        </div>

        <address>
          <a href={`tel:${primaryPhone.replace(/\s/g, "")}`}>
            <small>Call admissions</small>
            <strong>{primaryPhone}</strong>
            <i aria-hidden="true">↗</i>
          </a>
          <a href={`mailto:${CONTACT.email}`}>
            <small>Email</small>
            <strong>{CONTACT.email}</strong>
            <i aria-hidden="true">↗</i>
          </a>
          <Link to="/contact">
            <small>Online enquiry</small>
            <strong>Contact form</strong>
            <i aria-hidden="true">↗</i>
          </Link>
        </address>
      </section>

      <section className="v2-admissions__official">
        <p>Prefer the original listing?</p>
        <a href="https://malharonline.com/admission/" target="_blank" rel="noreferrer">
          Visit Malhar&apos;s official admission page <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
