import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { NAV_LINKS, CONTACT, INSTITUTION_ORDER, INSTITUTIONS } from "../../data";
import { api } from "../../lib/api";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [institutions, setInstitutions] = useState(INSTITUTIONS || []);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    api.get("/institutions").then((r) => {
      if (Array.isArray(r.data) && r.data.length > 0) setInstitutions(r.data);
    }).catch(() => {
      // keep local INSTITUTIONS fallback
    });
  }, []);

  const isActiveLink = (to) => {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };
  const linkColorClass = scrolled ? "text-charcoal/80" : "text-black";

  return (
    <header className="fixed top-0 inset-x-0 z-50" data-testid="site-header">
      <div className="bg-emerald text-cream/80 text-xs tracking-wide hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`tel:${CONTACT.phones[0]}`} className="flex items-center gap-2 hover:text-gold transition-colors" data-testid="utility-phone">
              <Phone size={13} /> {CONTACT.phones[0]}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-gold transition-colors" data-testid="utility-email">
              <Mail size={13} /> {CONTACT.email}
            </a>
          </div>
          <span className="font-arabic text-sm text-gold">بسم الله الرحمن الرحيم</span>
        </div>
      </div>

      <div className={`transition-all duration-500 ${scrolled ? "bg-cream/80 backdrop-blur-xl border-b border-charcoal/10" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <Link to="/" className="flex items-center" data-testid="nav-logo">
            <img src="/assets/logo.png" alt="Malhar logo" className="h-10 object-contain" />
          </Link>

          <nav className={`hidden lg:flex items-center gap-7 text-sm ${linkColorClass}`}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`link-underline hover:text-cream ${isActiveLink(l.to) ? "text-cream font-semibold" : linkColorClass}`}
                data-testid={`nav-${l.to.replace("/", "").replace(/-/g, "-")}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/donate-us" className={`hidden sm:inline-flex text-sm px-5 py-2.5 border border-gold btn-swipe text-gold-brass hover:text-cream transition-colors duration-300 ${linkColorClass}`} data-testid="nav-donate">
              <span className={`${linkColorClass} group-hover:text-cream`}>Donate</span>
            </Link>
            <Link to="/admission" className="hidden sm:inline-flex text-sm px-5 py-2.5 bg-emerald text-cream hover:bg-emerald-light transition-colors" data-testid="nav-admission">
              Admission
            </Link>
            <button className="lg:hidden text-charcoal p-2" onClick={() => setOpen(true)} data-testid="nav-menu-open" aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {open && (
          createPortal(
            <motion.div
              key="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-50 bg-emerald text-cream p-6 flex flex-col lg:hidden"
              data-testid="mobile-menu"
            >
              <div className="flex justify-between items-center mb-12">
                <img src="/assets/logo.png" alt="Malhar logo" className="h-10 object-contain" />
                <button onClick={() => setOpen(false)} data-testid="nav-menu-close" aria-label="Close menu"><X size={26} /></button>
              </div>
              <nav className="flex flex-col gap-5 text-2xl font-serif">
                <Link to="/" className={`${pathname === "/" ? "text-cream" : ""}`}>Home</Link>
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`${isActiveLink(l.to) ? "text-cream" : ""}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3">
                <Link to="/admission" className="px-5 py-3 bg-gold text-emerald text-center font-medium" data-testid="mobile-admission">Apply for Admission</Link>
                <Link to="/donate-us" className="px-5 py-3 border border-gold text-gold text-center" data-testid="mobile-donate">Donate</Link>
              </div>
            </motion.div>,
            document.body
          )
        )}
      </AnimatePresence>
    </header>
  );
};
