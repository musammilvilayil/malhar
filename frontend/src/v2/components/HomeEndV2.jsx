import { Link } from "react-router-dom";
import BrandLogoV2 from "./BrandLogoV2";
import "./HomeEndV2.css";

export default function HomeEndV2() {
  return (
    <>
      <section className="v2-home-end" aria-labelledby="v2-home-end-title">
        <p>Continue with Malhar</p>
        <h2 id="v2-home-end-title">Choose the next step.</h2>
        <div className="v2-home-end__actions">
          <Link to="/admissions">
            <small>Study at Malhar</small>
            <strong>Admission information</strong>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link to="/donation">
            <small>Support the mission</small>
            <strong>Donation information</strong>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <footer className="v2-footer">
        <div className="v2-footer__brand">
          <Link to="/" aria-label="Malhar home"><BrandLogoV2 className="v2-brand-logo--footer" /></Link>
          <p>
            Malhar Nooril Islami Tha&apos;aleemi<br />
            Manjeshwar, Kasaragod, Kerala
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <Link to="/about">About</Link>
          <Link to="/admissions">Admissions</Link>
          <Link to="/donation">Donation</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/news">News</Link>
        </nav>

        <address>
          <a href="tel:+918891001205">+91 8891001205</a>
          <a href="mailto:Malhar.mjr@gmail.com">Malhar.mjr@gmail.com</a>
        </address>

        <div className="v2-footer__base">
          <span>Established 2000</span>
          <a href="https://malharonline.com/" target="_blank" rel="noreferrer">
            Official website ↗
          </a>
        </div>
      </footer>
    </>
  );
}
