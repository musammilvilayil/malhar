import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { NAV_LINKS, CONTACT } from "../../data";
import Magnet from "../reactbits/Magnet";
import ShinyText from "../reactbits/ShinyText";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const safeLinks = (NAV_LINKS || []).filter((link) => link && typeof link.to === "string" && link.to.length > 0);
  const primaryPhone = Array.isArray(CONTACT?.phones) && CONTACT.phones.length ? CONTACT.phones[0] : "";
  const email = CONTACT?.email || "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const isActiveLink = (to) => {
    if (typeof to !== "string") return false;
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  const useOverlayNav = pathname === "/" && !scrolled;
  const linkColorClass = useOverlayNav ? "text-cream" : "text-charcoal/80";
  const navSurfaceClass = useOverlayNav
    ? "bg-transparent"
    : "bg-cream/95 backdrop-blur-xl border-b border-charcoal/10 shadow-[0_1px_0_rgba(26,26,26,0.04)]";
  const donateActive = pathname.startsWith("/donation");
  const donateClass = donateActive
    ? "border-gold bg-gold text-emerald"
    : useOverlayNav
      ? "border-gold/90 text-cream hover:bg-gold hover:text-emerald"
      : "border-gold text-charcoal hover:bg-gold hover:text-emerald";

  return (
    <header className="fixed inset-x-0 top-0 z-[100]" data-testid="site-header">
      <div className="bg-emerald text-cream/80 text-xs tracking-wide hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {primaryPhone && (
              <a href={`tel:${primaryPhone}`} className="flex items-center gap-2 hover:text-gold transition-colors" data-testid="utility-phone">
                <Phone size={13} /> {primaryPhone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-gold transition-colors" data-testid="utility-email">
                <Mail size={13} /> {email}
              </a>
            )}
          </div>
          <span className="font-arabic text-sm"><ShinyText text="بسم الله الرحمن الرحيم" color="#c5a059" shineColor="#fff1bf" speed={4.2} /></span>
        </div>
      </div>

      <div className={`transition-all duration-500 ${navSurfaceClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <Magnet padding={45} magnetStrength={5}>
            <Link to="/" className="flex items-center relative z-10" data-testid="nav-logo">
              <img src="/assets/logo.png" alt="Malhar logo" className="h-10 object-contain" />
            </Link>
          </Magnet>

          <nav className={`hidden lg:flex items-center gap-7 text-sm ${linkColorClass}`}>
            {safeLinks.map((l, index) => (
              <Link
                key={l.to}
                to={l.to}
                className={`link-underline transition-colors hover:text-gold ${isActiveLink(l.to) ? "text-gold font-semibold" : linkColorClass}`}
                data-testid={`nav-link-${index}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-[110] flex items-center gap-3">
            <Magnet padding={35} magnetStrength={4} wrapperClassName="hidden sm:inline-block">
              <Link
                to="/donation"
                className={`inline-flex items-center text-sm px-5 py-2.5 border transition-all duration-300 ${donateClass}`}
                data-testid="nav-donate"
                aria-current={donateActive ? "page" : undefined}
              >
                <span>Donate</span>
              </Link>
            </Magnet>
            <Magnet padding={35} magnetStrength={4} wrapperClassName="hidden sm:inline-block">
              <Link to="/admissions" className="inline-flex text-sm px-5 py-2.5 bg-emerald text-cream hover:bg-emerald-light transition-colors" data-testid="nav-admission">
                Admission
              </Link>
            </Magnet>
            <button
              type="button"
              className="relative z-[120] inline-flex h-12 w-12 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-xl bg-cream/95 text-charcoal shadow-sm ring-1 ring-charcoal/10 lg:hidden"
              onClick={() => setOpen((value) => !value)}
              data-testid="nav-menu-open"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              {open ? <X size={27} aria-hidden="true" /> : <Menu size={27} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[105] flex min-h-[100dvh] flex-col overflow-y-auto bg-emerald p-6 pt-24 text-cream lg:hidden"
            data-testid="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-5 text-2xl font-serif">
              {safeLinks.map((l, index) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.045 }}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`block py-2 ${isActiveLink(l.to) ? "text-gold" : "text-cream"}`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 pt-10">
              <Link to="/admissions" onClick={() => setOpen(false)} className="px-5 py-3 bg-gold text-emerald text-center font-medium" data-testid="mobile-admission">Apply for Admission</Link>
              <Link to="/donation" onClick={() => setOpen(false)} className={`px-5 py-3 border text-center ${donateActive ? "border-gold bg-gold text-emerald" : "border-gold text-gold"}`} data-testid="mobile-donate">Donate</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
