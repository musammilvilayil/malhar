import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import "./ContactV2.css";

const contact = {
  phone: "+91 8891001205",
  phoneHref: "tel:+918891001205",
  email: "Malhar.mjr@gmail.com",
  emailHref: "mailto:Malhar.mjr@gmail.com",
  address: "Al Buhakari Compound, Hosangadi, Manjeshwar PO, Kasaragod 671323, Kerala, India",
};

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

export default function ContactV2() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await api.post("/contact", form);
      setForm({ name: "", email: "", phone: "", message: "" });
      setStatus({ type: "success", message: "Thank you. Your message has been sent to Malhar." });
    } catch {
      setStatus({
        type: "error",
        message: "The form could not be sent right now. Please call or email Malhar directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="v2-contact">
      <section className="v2-contact__hero">
        <img
          className="v2-contact__hero-image"
          src="/assets/about-imgs.jpg"
          alt="Malhar campus"
        />
        <div className="v2-contact__hero-wash" />

        <nav className="v2-contact__nav" aria-label="Contact page navigation">
          <Link className="v2-contact__wordmark" to="/">
            <span>M</span><strong>Malhar</strong>
          </Link>
          <div>
            <Link to="/about">About</Link>
            <Link to="/admissions">Admissions</Link>
          </div>
        </nav>

        <motion.div className="v2-contact__hero-copy" {...reveal}>
          <p>Contact Malhar</p>
          <h1>Begin a <em>conversation.</em></h1>
          <span>
            Reach the Malhar office for admissions, institution information,
            campus visits and general enquiries.
          </span>
        </motion.div>
      </section>

      <section className="v2-contact__details">
        <motion.header {...reveal}>
          <p>Reach us directly</p>
          <h2>One place for every enquiry.</h2>
        </motion.header>

        <div className="v2-contact__detail-list">
          <motion.a href={contact.phoneHref} {...reveal}>
            <small>01 / Phone</small>
            <strong>{contact.phone}</strong>
            <span aria-hidden="true">↗</span>
          </motion.a>
          <motion.a href={contact.emailHref} {...reveal}>
            <small>02 / Email</small>
            <strong>{contact.email}</strong>
            <span aria-hidden="true">↗</span>
          </motion.a>
          <motion.address {...reveal}>
            <small>03 / Address</small>
            <strong>{contact.address}</strong>
          </motion.address>
        </div>
      </section>

      <section className="v2-contact__message">
        <motion.div className="v2-contact__message-intro" {...reveal}>
          <p>Send a message</p>
          <h2>Tell us how we can help.</h2>
          <span>
            Complete the form and the Malhar team can respond using the contact
            details you provide.
          </span>
        </motion.div>

        <motion.form onSubmit={submit} {...reveal}>
          <label>
            <span>Your name</span>
            <input
              required
              autoComplete="name"
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Enter your full name"
            />
          </label>

          <div className="v2-contact__field-row">
            <label>
              <span>Email address</span>
              <input
                required
                type="email"
                autoComplete="email"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="name@example.com"
              />
            </label>
            <label>
              <span>Phone <small>Optional</small></span>
              <input
                type="tel"
                autoComplete="tel"
                name="phone"
                value={form.phone}
                onChange={updateField}
                placeholder="+91"
              />
            </label>
          </div>

          <label>
            <span>Your message</span>
            <textarea
              required
              rows="5"
              name="message"
              value={form.message}
              onChange={updateField}
              placeholder="Write your enquiry here"
            />
          </label>

          <div className="v2-contact__form-footer">
            <button type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send message"} <span aria-hidden="true">→</span>
            </button>
            <p
              className={status.type ? `is-${status.type}` : ""}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </p>
          </div>
        </motion.form>
      </section>

      <section className="v2-contact__closing">
        <motion.div {...reveal}>
          <p>Visit the official website</p>
          <h2>Stay connected with Malhar.</h2>
          <a href="https://malharonline.com/contact/" target="_blank" rel="noreferrer">
            Official contact page <span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </section>
    </main>
  );
}
