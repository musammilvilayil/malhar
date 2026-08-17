import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroV2() {
  const scrollNext = () => {
    document.getElementById("v2-next-chapter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="v2-hero" aria-labelledby="v2-hero-title">
      <img
        src="/assets/DSC_2363-1-1-1.jpg"
        alt="Malhar campus in Manjeshwar, Kasaragod"
        className="v2-hero__media"
        loading="eager"
      />

      <div className="v2-hero__wash" />
      <div className="v2-hero__grain" aria-hidden="true" />
      <div className="v3-hero__wordmark" aria-hidden="true">MALHAR</div>

      <div className="v2-hero__content">
        <div className="v2-hero__eyebrow">
          <span className="v2-hero__eyebrow-line" />
          <span>Since 2000 · Manjeshwar, Kerala</span>
        </div>

        <h1 id="v2-hero-title" className="v2-hero__title">
          A journey of
          <span>faith, learning</span>
          and service.
        </h1>

        <div className="v2-hero__footer-copy">
          <p>
            Malhar Nooril Islami Tha&apos;aleemi — an educational vision rooted in
            Islamic values and contemporary learning.
          </p>

          <div className="v2-hero__actions">
            <button type="button" className="v2-primary-action" onClick={scrollNext}>
              Enter the story <ArrowDown size={16} />
            </button>
            <Link to="/admissions" className="v2-secondary-action">
              Admission information <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      <aside className="v3-hero-card" aria-label="Malhar identity">
        <div className="v3-hero-card__top">
          <span>Educational Trust</span>
          <span>EST. 2000</span>
        </div>
        <strong>Malhar</strong>
        <p>Nooril Islami Tha&apos;aleemi</p>
        <div className="v3-hero-card__line" />
        <small>Manjeshwar · Kasaragod · Kerala</small>
      </aside>

      <aside className="v2-hero__rail" aria-label="Malhar location">
        <span>KERALA</span>
        <span className="v2-hero__rail-line" />
        <span>MANJESHWAR</span>
      </aside>
    </section>
  );
}
