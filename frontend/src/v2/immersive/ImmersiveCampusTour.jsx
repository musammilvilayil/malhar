import { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY_PREVIEW, INSTITUTIONS, KEY_PERSONALITIES } from "../../data";
import StatsV2 from "../components/StatsV2";
import HomeEndV2 from "../components/HomeEndV2";
import "./ImmersiveCampusTour.css";

gsap.registerPlugin(ScrollTrigger);

const pad = (index) => String(index + 1).padStart(2, "0");

export default function ImmersiveCampusTour() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroPortalRef = useRef(null);
  const thresholdRef = useRef(null);
  const thresholdArchRef = useRef(null);
  const institutionsRef = useRef(null);
  const institutionsStageRef = useRef(null);
  const institutionsTrackRef = useRef(null);
  const courtyardRef = useRef(null);
  const officeRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 901px)",
        mobile: "(max-width: 900px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduce } = context.conditions;
        if (reduce) return undefined;

        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: desktop ? 1 : 0.55,
            invalidateOnRefresh: true,
          },
        });

        heroTimeline
          .to(
            heroImageRef.current,
            {
              scale: desktop ? 2.2 : 1.5,
              xPercent: desktop ? -4 : -2,
              yPercent: desktop ? 5 : 2,
              ease: "none",
            },
            0,
          )
          .to(
            heroCopyRef.current,
            {
              opacity: 0,
              y: desktop ? -70 : -36,
              scale: 0.96,
              ease: "none",
            },
            0.08,
          )
          .fromTo(
            heroPortalRef.current,
            { opacity: 0, scale: 0.68 },
            { opacity: 1, scale: desktop ? 1.18 : 1.04, ease: "none" },
            0.35,
          );

        const thresholdTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: thresholdRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: desktop ? 1 : 0.6,
          },
        });

        thresholdTimeline
          .fromTo(
            thresholdArchRef.current,
            { scale: desktop ? 0.82 : 0.94, yPercent: 8 },
            { scale: desktop ? 1.22 : 1.05, yPercent: -3, ease: "none" },
            0,
          )
          .fromTo(
            ".tour-threshold__copy",
            { opacity: 0.18, y: 45 },
            { opacity: 1, y: -12, ease: "none" },
            0,
          );

        if (desktop) {
          const track = institutionsTrackRef.current;
          const stage = institutionsStageRef.current;
          const section = institutionsRef.current;

          const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

          gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getDistance() + window.innerWidth * 0.35}`,
              pin: stage,
              scrub: 0.85,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          gsap.fromTo(
            ".tour-courtyard__image",
            { yPercent: 8 },
            {
              yPercent: -8,
              stagger: 0.04,
              ease: "none",
              scrollTrigger: {
                trigger: courtyardRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );

          gsap.fromTo(
            ".tour-office__frame",
            { y: 55, opacity: 0, rotateX: 7 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              stagger: 0.1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: officeRef.current,
                start: "top 62%",
              },
            },
          );
        }

        return undefined;
      },
    );

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  const scrollToThreshold = () => {
    thresholdRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main ref={rootRef} className="tour-root">
      <section ref={heroRef} className="tour-hero" aria-labelledby="tour-hero-title">
        <div className="tour-hero__stage">
          <img
            ref={heroImageRef}
            className="tour-hero__image"
            src="/assets/DSC_2363-1-1-1.jpg"
            alt="Malhar main campus"
            loading="eager"
            fetchPriority="high"
          />
          <div className="tour-hero__wash" aria-hidden="true" />
          <div className="tour-hero__grain" aria-hidden="true" />

          <div ref={heroCopyRef} className="tour-hero__copy">
            <p className="tour-kicker"><span>01</span> Arrival · Manjeshwar</p>
            <h1 id="tour-hero-title">
              Step into
              <em>Malhar.</em>
            </h1>
            <p className="tour-hero__intro">
              A journey through faith, learning and service — beginning at the real Malhar campus.
            </p>
            <button type="button" className="tour-button tour-button--primary" onClick={scrollToThreshold}>
              Begin the journey <ArrowDown size={16} />
            </button>
          </div>

          <div ref={heroPortalRef} className="tour-hero__portal" aria-hidden="true">
            <span className="tour-hero__portal-label">Enter campus</span>
          </div>

          <div className="tour-hero__scroll" aria-hidden="true">
            <span>Scroll to move closer</span>
            <i />
          </div>
        </div>
      </section>

      <section ref={thresholdRef} className="tour-threshold" aria-labelledby="tour-threshold-title">
        <div className="tour-threshold__stage">
          <div className="tour-threshold__walls" aria-hidden="true" />
          <div ref={thresholdArchRef} className="tour-threshold__arch">
            <img src="/assets/about-imgs.jpg" alt="A view from Malhar campus" loading="lazy" decoding="async" />
            <span className="tour-threshold__light" aria-hidden="true" />
          </div>
          <div className="tour-threshold__copy">
            <p className="tour-kicker"><span>02</span> The threshold</p>
            <h2 id="tour-threshold-title">From the courtyard,<br /><em>into a world of learning.</em></h2>
            <p>Architecture becomes navigation: each scroll moves you deeper into Malhar's story.</p>
          </div>
        </div>
      </section>

      <section ref={institutionsRef} className="tour-institutions" aria-labelledby="tour-institutions-title">
        <div ref={institutionsStageRef} className="tour-institutions__stage">
          <header className="tour-section-heading tour-institutions__heading">
            <p className="tour-kicker"><span>03</span> Learning corridor</p>
            <h2 id="tour-institutions-title">Seven institutions.<br /><em>One purpose.</em></h2>
            <p>Move through the corridor and discover each institution as its own room in the Malhar journey.</p>
          </header>

          <div ref={institutionsTrackRef} className="tour-institutions__track">
            {INSTITUTIONS.map((institution, index) => (
              <article key={institution.slug} className="tour-room" style={{ "--room-index": index }}>
                <img
                  className="tour-room__image"
                  src={institution.image}
                  alt={institution.name}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
                <div className="tour-room__shade" aria-hidden="true" />
                <div className="tour-room__frame" aria-hidden="true">
                  <span>{pad(index)}</span>
                </div>
                <div className="tour-room__content">
                  <p>Institution {pad(index)} · {pad(INSTITUTIONS.length - 1)}</p>
                  <h3>{institution.name}</h3>
                  <p className="tour-room__description">{institution.desc}</p>
                  <Link to={`/institutions/${institution.slug}`} className="tour-room__link">
                    Enter this institution <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={courtyardRef} className="tour-courtyard" aria-labelledby="tour-courtyard-title">
        <div className="tour-courtyard__copy">
          <p className="tour-kicker"><span>04</span> Between the lessons</p>
          <h2 id="tour-courtyard-title">A campus is also made of<br /><em>moments in between.</em></h2>
          <p>Real Malhar imagery keeps the journey grounded in the campus, its people and everyday learning environment.</p>
        </div>
        <div className="tour-courtyard__gallery" aria-label="Malhar campus moments">
          {GALLERY_PREVIEW.slice(0, 5).map((image, index) => (
            <figure key={image} className={`tour-courtyard__tile tour-courtyard__tile--${index + 1}`}>
              <img className="tour-courtyard__image" src={image} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <figcaption>{pad(index)} · Campus life</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section ref={officeRef} className="tour-office" aria-labelledby="tour-office-title">
        <div className="tour-office__ceiling" aria-hidden="true" />
        <div className="tour-office__floor" aria-hidden="true" />
        <div className="tour-office__inner">
          <header className="tour-office__heading">
            <p className="tour-kicker"><span>05</span> Leadership chamber</p>
            <h2 id="tour-office-title">From learning,<br /><em>to leadership.</em></h2>
            <p>The people who carry Malhar's vision forward are presented using their real portraits and roles.</p>
          </header>

          <div className="tour-office__gallery">
            {KEY_PERSONALITIES.map((person, index) => (
              <article key={person.slug} className="tour-office__frame">
                <div className="tour-office__portrait-wrap">
                  <img src={person.image} alt={person.name} loading="lazy" decoding="async" />
                </div>
                <p>{person.role}</p>
                <h3>{person.name}</h3>
                {person.knownAs && <span>{person.knownAs}</span>}
                <i aria-hidden="true">{pad(index)}</i>
              </article>
            ))}
          </div>

          <div className="tour-office__desk" aria-hidden="true">
            <span />
          </div>
        </div>
      </section>

      <section className="tour-impact-intro" aria-labelledby="tour-impact-title">
        <p className="tour-kicker"><span>06</span> The impact</p>
        <h2 id="tour-impact-title">The journey leaves the rooms<br /><em>and becomes measurable.</em></h2>
        <p>Published Malhar figures are kept as the source of truth below.</p>
      </section>

      <StatsV2 />
      <HomeEndV2 />
    </main>
  );
}
