import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INSTITUTIONS } from "../../data";
import "./InstitutionsV2.css";

gsap.registerPlugin(ScrollTrigger);

const padNumber = (index) => String(index + 1).padStart(2, "0");

function InstitutionPanel({ institution, index, mobile = false }) {
  return (
    <article className={mobile ? "v2-institutions__mobile-panel" : "v2-institutions__panel"}>
      <img
        src={institution.image}
        alt={institution.name}
        className="v2-institutions__image"
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
        referrerPolicy="no-referrer"
      />
      <div className="v2-institutions__wash" aria-hidden="true" />
      <div className="v2-institutions__grain" aria-hidden="true" />

      <div className="v2-institutions__panel-content">
        <p className="v2-institutions__number" aria-hidden="true">{padNumber(index)}</p>
        <div>
          <p className="v2-institutions__position">
            Institution {padNumber(index)} · {String(INSTITUTIONS.length).padStart(2, "0")}
          </p>
          <h3>{institution.name}</h3>
          <p className="v2-institutions__description">{institution.desc}</p>
        </div>
      </div>
    </article>
  );
}

export default function InstitutionsV2() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const context = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)": () => {
          const horizontalDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

          const tween = gsap.to(track, {
            x: () => -horizontalDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${horizontalDistance()}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="institutions-journey"
      className="v2-institutions"
      aria-labelledby="v2-institutions-title"
    >
      <header className="v2-institutions__chapter">
        <p><span>Chapter 03</span><i />Institutions Journey</p>
        <h2 id="v2-institutions-title">Seven paths.<em>One purpose.</em></h2>
        <span className="v2-institutions__hint">Scroll to explore</span>
      </header>

      <div className="v2-institutions__desktop" aria-label="Seven Malhar institutions">
        <div ref={trackRef} className="v2-institutions__track">
          {INSTITUTIONS.map((institution, index) => (
            <InstitutionPanel key={institution.slug} institution={institution} index={index} />
          ))}
        </div>
      </div>

      <div className="v2-institutions__mobile" aria-label="Seven Malhar institutions">
        {INSTITUTIONS.map((institution, index) => (
          <InstitutionPanel
            key={institution.slug}
            institution={institution}
            index={index}
            mobile
          />
        ))}
      </div>
    </section>
  );
}
