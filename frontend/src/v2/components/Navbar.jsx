import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import BrandLogoV2 from "./BrandLogoV2";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/admissions", label: "Admissions" },
  { path: "/donation", label: "Donation" },
  { path: "/media", label: "Media" },
  { path: "/ventures", label: "Ventures" },
  { path: "/contact", label: "Contact" },
  { path: "/news", label: "News" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <nav className="v2-navbar" aria-label="Primary navigation">
      <div className="v2-navbar__inner">
        <Link to="/" className="v2-navbar__logo" aria-label="Malhar home">
          <BrandLogoV2 />
        </Link>

        <div className="v2-navbar__links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`v2-navbar__link${location.pathname === link.path ? " v2-navbar__link--active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="v2-navbar__toggle"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="malhar-mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <svg className="v2-navbar__toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="malhar-mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="v2-navbar__mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`v2-navbar__mobile-link${location.pathname === link.path ? " v2-navbar__link--active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
