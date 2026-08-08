import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import BrandLogoV2 from "../components/BrandLogoV2";
import { siteData } from "../../data/malharData";
import "./InstitutionV2.css";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

export default function InstitutionV2() {
  const { slug } = useParams();
  const institution = siteData.institutions.find((item) => item.slug === slug);
  const details = siteData.institutionDetails.find((item) => item.slug === slug);

  if (!institution) return <Navigate to="/admissions" replace />;

  const programmes = details?.programs?.length ? details.programs : institution.programs;
  const phone = details?.phone || siteData.contact.phone;

  return (
    <main className="v2-institution-detail">
      <section className="v2-institution-detail__hero">
        <img src={institution.image} alt={institution.name} />
        <div className="v2-institution-detail__wash" aria-hidden="true" />

        <nav className="v2-institution-detail__nav" aria-label="Institution page navigation">
          <Link to="/" aria-label="Malhar home"><BrandLogoV2 /></Link>
          <div>
            <Link to="/admissions">Admissions</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>

        <motion.div className="v2-institution-detail__hero-copy" {...reveal}>
          <p>Malhar · Institution</p>
          <h1>{institution.name}</h1>
          <span>{details?.headline || institution.description}</span>
        </motion.div>
      </section>

      <section className="v2-institution-detail__story">
        <motion.header {...reveal}>
          <p>Learning at Malhar</p>
          <h2>{details?.description || institution.description}</h2>
        </motion.header>
        <motion.div className="v2-institution-detail__overview" {...reveal}>
          <p>{details?.overview || institution.description}</p>
          {programmes?.length > 0 && (
            <div>
              <span>Programmes & focus areas</span>
              <ul>{programmes.map((programme) => <li key={programme}>{programme}</li>)}</ul>
            </div>
          )}
        </motion.div>
      </section>

      <section className="v2-institution-detail__contact">
        <motion.div {...reveal}>
          <p>Current information</p>
          <h2>Speak directly with Malhar.</h2>
          <span>{details?.admission || "Contact Malhar for current admission information."}</span>
        </motion.div>
        <motion.div className="v2-institution-detail__actions" {...reveal}>
          <a href={`tel:+91${phone.replace(/\D/g, "").slice(-10)}`}>+91 {phone.replace(/\D/g, "").slice(-10)} <span>↗</span></a>
          <Link to="/contact">Contact page <span>→</span></Link>
          <Link to="/admissions">All admission options <span>→</span></Link>
        </motion.div>
      </section>
    </main>
  );
}
