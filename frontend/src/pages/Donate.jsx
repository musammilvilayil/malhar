import { useState } from "react";
import { Heart, Building2, GraduationCap, BookOpen, Mail, Phone, ArrowRight, Copy, Check, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const UPI_ID = "malharmjr@sbi";
const DONATION_PHONE = "9847013786";
const PAYEE_NAME = "Malharu Nooril Islami Tha'Aleemi";
const UPI_LINK = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&cu=INR`;
const QR_IMAGE = `https://quickchart.io/qr?text=${encodeURIComponent(UPI_LINK)}&size=420&margin=2`;

const supportAreas = [
  {
    icon: BookOpen,
    title: "Qur'an & Islamic studies",
    description: "Support Hiflul Qur'an, Da'wa, Sharee'ath, Madrasa and Dars programmes.",
  },
  {
    icon: GraduationCap,
    title: "Schools & colleges",
    description: "Help Malhar continue educational programmes across its schools and colleges.",
  },
  {
    icon: Building2,
    title: "Institutions & community services",
    description: "Contribute towards the upkeep of institutions, masjids, programmes and community services.",
  },
];

export default function DonatePage() {
  const [copied, setCopied] = useState(false);

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-emerald pt-40 pb-24 text-cream">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full border border-gold/50" />
          <div className="absolute top-20 right-20 h-48 w-48 rounded-full border border-gold/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Support Malhar</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-light leading-tight md:text-7xl">
            Your support helps learning, service and community life continue.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-8 text-cream/75">
            Contribute directly through the verified Malhar UPI account or contact the trust for donation assistance.
          </p>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-brass">Why your donation matters</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl font-light text-emerald md:text-5xl">
              A contribution supports Malhar's educational and community work.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-8 text-charcoal/75">
              Donations help sustain Qur'an education, Da'wa and Sharee'ath programmes, schools, colleges, masjids and community services connected with Malhar.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {supportAreas.map(({ icon: Icon, title, description }) => (
                <article key={title} className="border border-emerald/10 bg-white p-6 shadow-sm">
                  <Icon className="h-7 w-7 text-gold-brass" aria-hidden="true" />
                  <h3 className="mt-5 font-serif text-xl text-emerald">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-charcoal/65">{description}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex items-start gap-3 rounded-2xl border border-emerald/10 bg-emerald/5 p-5 text-sm leading-6 text-charcoal/70">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald" aria-hidden="true" />
              <p>Before completing a large contribution, you may contact the Malhar office to confirm the payment details and purpose of the donation.</p>
            </div>
          </div>

          <aside className="self-start rounded-3xl border border-emerald/10 bg-white p-6 shadow-xl sm:p-8 md:p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-brass">Scan and pay</p>
                <h2 className="mt-2 font-serif text-3xl text-emerald">Donate through UPI</h2>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald text-gold">
                <Heart className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-7 overflow-hidden rounded-2xl border border-charcoal/10 bg-white p-4">
              <img
                src={QR_IMAGE}
                alt={`UPI QR code for ${PAYEE_NAME}`}
                className="mx-auto aspect-square w-full max-w-sm object-contain"
                width="420"
                height="420"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-cream p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-charcoal/50">Account name</p>
              <p className="mt-1 font-medium text-emerald">{PAYEE_NAME}</p>

              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-charcoal/50">UPI ID</p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <code className="break-all text-lg font-semibold text-charcoal">{UPI_ID}</code>
                <button
                  type="button"
                  onClick={copyUpiId}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald/20 px-4 py-2 text-sm font-medium text-emerald transition hover:bg-emerald hover:text-cream"
                  aria-label="Copy UPI ID"
                >
                  {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-charcoal/50">UPI phone</p>
              <a href={`tel:+91${DONATION_PHONE}`} className="mt-1 inline-block text-lg font-semibold text-charcoal hover:text-emerald">
                {DONATION_PHONE}
              </a>
            </div>

            <a
              href={UPI_LINK}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-emerald px-6 py-4 font-semibold text-cream transition hover:bg-emerald-light"
            >
              Open UPI app <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="mt-4 text-center text-xs leading-5 text-charcoal/55">Works with supported UPI apps such as Google Pay, PhonePe and Paytm.</p>
          </aside>
        </div>
      </section>

      <section className="bg-emerald py-20 text-cream">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Donation assistance</p>
            <h2 className="mt-3 font-serif text-3xl font-light md:text-4xl">Need confirmation before you contribute?</h2>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-cream/75">
              <a href="tel:+918891001205" className="inline-flex items-center gap-2 hover:text-gold"><Phone className="h-4 w-4" aria-hidden="true" /> 8891001205</a>
              <a href="mailto:Malhar.mjr@gmail.com?subject=Donation%20enquiry" className="inline-flex items-center gap-2 hover:text-gold"><Mail className="h-4 w-4" aria-hidden="true" /> Malhar.mjr@gmail.com</a>
            </div>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-3 bg-gold px-6 py-3 font-medium text-emerald transition hover:bg-cream">
            Contact Malhar <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
