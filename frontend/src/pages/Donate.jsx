import { Heart, Building2, GraduationCap, BookOpen, Mail, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
            Malhar depends on the generosity of its community to sustain educational, spiritual and social programmes.
          </p>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-brass">Why your donation matters</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl font-light text-emerald md:text-5xl">
              A contribution supports the work Malhar already carries forward.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-8 text-charcoal/75">
              <p>
                The existing Malhar website states that donations help maintain Hiflul Qur'an, Da'wa College, Sharee'ath College, Madrasa, Dars, masjids, schools and colleges.
              </p>
              <p>
                This redesign keeps that purpose clear while avoiding unverified payment details or impact figures. Donors can contact Malhar directly for the current approved donation method.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {supportAreas.map(({ icon: Icon, title, description }) => (
                <article key={title} className="border border-emerald/10 bg-white p-6 shadow-sm">
                  <Icon className="h-7 w-7 text-gold-brass" aria-hidden="true" />
                  <h3 className="mt-5 font-serif text-xl text-emerald">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-charcoal/65">{description}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="self-start border border-emerald/10 bg-white p-7 shadow-xl md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-gold">
              <Heart className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-6 font-serif text-3xl text-emerald">How to donate</h2>
            <p className="mt-4 leading-7 text-charcoal/70">
              Please contact Malhar to receive the latest verified bank, UPI or QR payment details before making a contribution.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="tel:+918891001205"
                className="flex items-center justify-between border border-emerald/15 px-4 py-4 text-emerald transition hover:border-emerald hover:bg-emerald/5"
              >
                <span className="flex items-center gap-3"><Phone className="h-5 w-5" aria-hidden="true" /> 8891001205</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="tel:+919072901205"
                className="flex items-center justify-between border border-emerald/15 px-4 py-4 text-emerald transition hover:border-emerald hover:bg-emerald/5"
              >
                <span className="flex items-center gap-3"><Phone className="h-5 w-5" aria-hidden="true" /> 9072901205</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:Malhar.mjr@gmail.com?subject=Donation%20enquiry"
                className="flex items-center justify-between border border-emerald/15 px-4 py-4 text-emerald transition hover:border-emerald hover:bg-emerald/5"
              >
                <span className="flex items-center gap-3 break-all"><Mail className="h-5 w-5 shrink-0" aria-hidden="true" /> Malhar.mjr@gmail.com</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-6 text-xs leading-5 text-charcoal/55">
              For safety, payment credentials are not displayed until Malhar confirms the official details for this redesigned website.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-emerald py-20 text-cream">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Need more information?</p>
            <h2 className="mt-3 font-serif text-3xl font-light md:text-4xl">Speak with Malhar before you contribute.</h2>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-3 bg-gold px-6 py-3 font-medium text-emerald transition hover:bg-cream">
            Contact Malhar <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
