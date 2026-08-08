import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { api } from "@/lib/api";
import "../v2.css";
import "./ContactV2.css";

const contact = {
  phone: "+91 8891001205",
  phoneHref: "tel:+918891001205",
  email: "Malhar.mjr@gmail.com",
  emailHref: "mailto:Malhar.mjr@gmail.com",
  address: "Al Buhakari Compound, Hosangadi, Manjeshwar PO, Kasaragod 671323, Kerala, India",
};

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

const methods = [
  {
    label: "Phone",
    value: contact.phone,
    href: contact.phoneHref,
    hint: "Call us",
  },
  {
    label: "Email",
    value: contact.email,
    href: contact.emailHref,
    hint: "Write directly",
  },
  {
    label: "Address",
    value: contact.address,
    href: "https://www.google.com/maps/search/Al+Buhakari+Compound+Hosangadi+Manjeshwar",
    hint: "Visit our campus",
  },
];

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
      <Navbar />

      <header className="v2-contact__hero">
        <img
          className="v2-contact__hero-image"
          src="/assets/about-imgs.jpg"
          alt="Malhar campus"
        />
        <div className="v2-contact__hero-wash" />

        <motion.div className="v2-contact__hero-copy" {...reveal}>
          <span className="v2-contact__eyebrow">Contact Malhar</span>
          <h1 id="contact-hero-title">
            Begin a <em>conversation.</em>
          </h1>
          <p>
            Reach the Malhar office for admissions, institution information,
            campus visits and general enquiries.
          </p>

          <div className="v2-contact__hero-actions">
            <a className="v2-primary-action" href={contact.phoneHref}>
              Call us
            </a>
            <Link className="v2-secondary-action" to="/admissions">
              Admissions support
            </Link>
          </div>
        </motion.div>
      </header>

      <section className="v2-contact__methods" aria-labelledby="contact-methods-title">
        <div className="v2-section-heading">
          <span>Reach us directly</span>
          <h2 id="contact-methods-title">One place for every enquiry.</h2>
        </div>

        <div className="v2-contact__method-grid">
          {methods.map((method) => (
            <motion.a
              key={method.label}
              href={method.href}
              target={method.label === "Address" ? "_blank" : undefined}
              rel={method.label === "Address" ? "noreferrer" : undefined}
              className="v2-contact__method-card"
              {...reveal}
            >
              <strong>{method.label}</strong>
              <span>{method.value}</span>
              <small>{method.hint}</small>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="v2-contact__form-section" aria-labelledby="contact-form-title">
        <motion.div className="v2-contact__message-intro" {...reveal}>
          <span>Send a message</span>
          <h2 id="contact-form-title">Tell us how we can help.</h2>
          <p>
            Complete the form below and the Malhar team will follow up using the
            details you provide.
          </p>
        </motion.div>

        <motion.form className="v2-contact__form" onSubmit={submit} {...reveal}>
          <label>
            <span>Your name</span>
            <input
              name="name"
              value={form.name}
              onChange={updateField}
              required
              autoComplete="name"
              placeholder="Enter your full name"
            />
          </label>

          <div className="v2-contact__field-row">
            <label>
              <span>Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                required
                autoComplete="email"
                placeholder="name@example.com"
              />
            </label>

            <label>
              <span>
                Phone <small>Optional</small>
              </span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={updateField}
                autoComplete="tel"
                placeholder="+91 8891001205"
              />
            </label>
          </div>

          <label>
            <span>Your message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              rows={6}
              required
              placeholder="Write your enquiry here"
            />
          </label>

          <div className="v2-contact__form-footer">
            <button type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send message"}
              <span aria-hidden="true">→</span>
            </button>
            <p className={status.type ? `is-${status.type}` : ""} role="status" aria-live="polite">
              {status.message}
            </p>
          </div>
        </motion.form>
      </section>

      <section className="v2-contact__closing">
        <motion.div {...reveal}>
          <span>Visit the official website</span>
          <h2>Stay connected with Malhar.</h2>
          <a href="https://malharonline.com/contact/" target="_blank" rel="noreferrer">
            Official contact page <span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </section>
    </main>
  );
}
