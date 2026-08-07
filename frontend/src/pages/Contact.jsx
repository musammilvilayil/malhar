import React, { useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { api } from "../lib/api";
import siteData from "../data/malharData";

export default function ContactPage() {
  const contact = siteData?.contact || {};
  const phone = Array.isArray(contact.phones) && contact.phones.length ? contact.phones[0] : (contact.phone || "8891001205");
  const email = contact.email || "Malhar.mjr@gmail.com";
  const address = contact.address || "Al Buhakari Compound, Hosangadi, Manjeshwar PO, Kasaragod 671323, Kerala, India";

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      await api.post("/contact", form);
      setForm({ name: "", email: "", phone: "", message: "" });
      setStatus("Thank you. Your message has been sent.");
    } catch (error) {
      setStatus("We could not send the form right now. Please call or email Malhar directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative min-h-[48vh] pt-32 overflow-hidden bg-emerald text-cream">
        <img src="/assets/DSC_2363-1-1-1.jpg" alt="Malhar campus" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-emerald/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[48vh] flex items-center">
          <div className="max-w-2xl">
            <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-gold">Contact</p>
            <h1 className="mt-4 font-serif text-5xl md:text-6xl font-light">Get in touch.</h1>
            <p className="mt-5 text-cream/85 text-lg font-light">Reach Malhar for admissions, institution information, campus visits and general enquiries.</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-6">
            <div className="rounded-3xl border border-charcoal/10 bg-white/70 p-6">
              <div className="flex gap-3 items-start"><MapPin className="mt-1 text-emerald" size={20} /><div><p className="text-xs uppercase tracking-widest text-gold-brass">Address</p><p className="mt-2 text-charcoal/70 leading-relaxed">{address}</p></div></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href={`tel:${phone}`} className="rounded-3xl border border-charcoal/10 bg-white/70 p-6 hover:border-emerald/30 transition-colors">
                <Phone className="text-emerald" size={20} /><p className="mt-4 text-xs uppercase tracking-widest text-gold-brass">Phone</p><p className="mt-2 text-charcoal">{phone}</p>
              </a>
              <a href={`mailto:${email}`} className="rounded-3xl border border-charcoal/10 bg-white/70 p-6 hover:border-emerald/30 transition-colors break-words">
                <Mail className="text-emerald" size={20} /><p className="mt-4 text-xs uppercase tracking-widest text-gold-brass">Email</p><p className="mt-2 text-charcoal">{email}</p>
              </a>
            </div>
            <div className="rounded-3xl border border-charcoal/10 bg-emerald/5 p-6">
              <p className="text-xs uppercase tracking-widest text-gold-brass">Office hours</p>
              <p className="mt-2 text-charcoal/70">Monday – Saturday, 9:00 AM – 6:00 PM</p>
            </div>
          </div>

          <form onSubmit={submit} className="rounded-3xl border border-charcoal/10 bg-white p-6 sm:p-8 space-y-4" data-testid="contact-form">
            <div><p className="text-xs uppercase tracking-widest text-gold-brass">Send a message</p><h2 className="mt-2 font-serif text-3xl text-charcoal">How can we help?</h2></div>
            <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-charcoal/15 bg-transparent px-4 py-3.5 focus:border-emerald outline-none rounded-xl" />
            <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-charcoal/15 bg-transparent px-4 py-3.5 focus:border-emerald outline-none rounded-xl" />
            <input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-charcoal/15 bg-transparent px-4 py-3.5 focus:border-emerald outline-none rounded-xl" />
            <textarea required rows={5} placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-charcoal/15 bg-transparent px-4 py-3.5 focus:border-emerald outline-none resize-none rounded-xl" />
            <button disabled={loading} className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-emerald text-cream hover:bg-emerald-light transition-colors disabled:opacity-60 rounded-xl">{loading ? "Sending..." : "Send Message"} <Send size={16} /></button>
            {status && <p role="status" className="text-sm text-charcoal/70">{status}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
