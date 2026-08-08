import HeroV2 from "./components/HeroV2";
import "./v2.css";

export default function HomeV2() {
  return (
    <div className="v2-shell">
      <HeroV2 />

      <section id="v2-next-chapter" className="v2-transition" aria-label="Next chapter preview">
        <div className="v2-transition__index">01</div>
        <div>
          <p className="v2-transition__label">Next chapter</p>
          <h2>The beginning.</h2>
          <p>
            The founder story will become the second cinematic chapter after the
            new opening direction is approved.
          </p>
        </div>
      </section>
    </div>
  );
}
