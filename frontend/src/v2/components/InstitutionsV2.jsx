import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INSTITUTIONS } from "../../data";
import "./InstitutionsV2.css";

gsap.registerPlugin(ScrollTrigger);

const padNumber = (index) => String(index + 1).padStart(2, "0");
const mediaMatches = (query) => typeof window !== "undefined" && window.matchMedia(query).matches;

function InstitutionPanel({ institution, index, mobile = false }) {
  const panelClass = mobile ? "v2-institutions__mobile-panel" : "v2-institutions__panel";

  return (
    <article className={`${panelClass}${institution.image ? "" : " is-text-only"}`}>
      {institution.image && (
        <img
          src={institution.image}
          alt={institution.name}
          className="v2-institutions__image"
          loading={index === 0 || mobile ? "eager" : "lazy"}
          decoding="async"
        />
      )}
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
          <Link className="v2-institutions__explore" to={`/institutions/${institution.slug}`}>
            Explore institution <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function InstitutionsV2() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileSlider, setMobileSlider] = useState(() => mediaMatches("(max-width: 900px)"));
  const [reduceMotion, setReduceMotion] = useState(() => mediaMatches("(prefers-reduced-motion: reduce)"));
  const [isPaused, setIsPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const pauseTimeoutRef = useRef(null);
  const compactLayout = mobileSlider || reduceMotion;

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 900px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPreferences = () => {
      setMobileSlider(mobileQuery.matches);
      setReduceMotion(motionQuery.matches);
    };

    syncPreferences();
    mobileQuery.addEventListener("change", syncPreferences);
    motionQuery.addEventListener("change", syncPreferences);

    return () => {
      mobileQuery.removeEventListener("change", syncPreferences);
      motionQuery.removeEventListener("change", syncPreferences);
    };
  }, []);

  useEffect(() => {
    if (!mobileSlider || reduceMotion || isPaused) return undefined;

    const interval = window.setInterval(() => {
      if (!document.hidden) {
        setCurrentSlide((previous) => (previous + 1) % INSTITUTIONS.length);
      }
    }, 4000);

    return () => window.clearInterval(interval);
  }, [mobileSlider, reduceMotion, isPaused, timerKey]);

  useEffect(() => () => window.clearTimeout(pauseTimeoutRef.current), []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (compactLayout || !section || !track) return undefined;

    const context = gsap.context(() => {
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
    }, section);

    return () => context.revert();
  }, [compactLayout]);

  const selectSlide = (index) => {
    window.clearTimeout(pauseTimeoutRef.current);
    setCurrentSlide(index);
    setIsPaused(true);
    setTimerKey((key) => key + 1);

    pauseTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
      setTimerKey((key) => key + 1);
    }, 5000);
  };

  const activeInstitution = INSTITUTIONS[currentSlide];

  return (
    <section
      ref={sectionRef}
      id="institutions-journey"
      className="v2-institutions"
      aria-labelledby="v2-institutions-title"
    >
      <header className="v2-institutions__chapter">
        <p><span>Institutions Journey</span><i /></p>
        <h2 id="v2-institutions-title">Seven paths.<em>One purpose.</em></h2>
        <span className="v2-institutions__hint">Scroll to explore</span>
      </header>

      {!compactLayout ? (
        <div className="v2-institutions__desktop" aria-label="Seven Malhar institutions">
          <div ref={trackRef} className="v2-institutions__track">
            {INSTITUTIONS.map((institution, index) => (
              <InstitutionPanel key={institution.slug} institution={institution} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="v2-institutions__mobile"
          aria-label="Seven Malhar institutions — automatic slideshow"
          aria-live="off"
        >
          <InstitutionPanel
            key={activeInstitution.slug}
            institution={activeInstitution}
            index={currentSlide}
            mobile
          />

          <p className="v2-institutions__autoplay-note">
            {isPaused ? "Paused · Resuming shortly" : "Auto-playing · Tap to explore"}
          </p>

          <div className="v2-institutions__dots" role="group" aria-label="Choose an institution">
            {INSTITUTIONS.map((institution, index) => (
              <button
                key={institution.slug}
                type="button"
                className={index === currentSlide ? "is-active" : ""}
                onClick={() => selectSlide(index)}
                aria-label={`Show ${institution.name}`}
                aria-current={index === currentSlide ? "true" : undefined}
              >
                <span />
              </button>
            ))}
          </div>

          <div className="v2-institutions__progress" aria-hidden="true">
            <span
              key={`${activeInstitution.slug}-${timerKey}`}
              className={isPaused ? "is-paused" : ""}
              style={{ "--slide-progress": `${((currentSlide + 1) / INSTITUTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
