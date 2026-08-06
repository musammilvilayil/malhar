import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { CONTACT, NAV_LINKS, SOCIAL_LINKS } from "../../data";
import { GeoPattern } from "./Primitives";

export const Footer = () => (
  <footer className="relative bg-emerald text-cream overflow-hidden" data-testid="site-footer">
    <div className="absolute inset-0"><GeoPattern color="#C5A059" opacity={0.06} /></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
      <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-cream/15">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <img src="/assets/footerlogo.png" alt="Malhar logo" className="h-12 object-contain" />
            <div>
              <span className="font-arabic text-2xl text-gold">مالهار</span>
              <p className="text-sm text-cream/70 uppercase tracking-[0.22em]">Malhar Nooril Islami Tha'eleemi</p>
            </div>
          </div>
          <p className="mt-4 text-cream/70 text-sm leading-relaxed max-w-sm font-light">
            An educational trust founded in 2000, blending Islamic tradition with modern learning for Kasaragod and beyond.
          </p>
          <div className="flex gap-4 mt-6">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-cream/25 flex items-center justify-center hover:bg-gold hover:text-emerald hover:border-gold transition-colors" data-testid={`footer-social-${i}`} aria-label={label}>
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs uppercase tracking-[0.22em] text-gold mb-5">Explore</p>
          <ul className="space-y-3 text-sm text-cream/75">
            {NAV_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="link-underline hover:text-gold">{l.label}</Link></li>
            ))}
            <li><Link to="/admission" className="link-underline hover:text-gold">Admission</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.22em] text-gold mb-5">Reach Us</p>
          <ul className="space-y-4 text-sm text-cream/75">
            <li className="flex gap-3"><MapPin size={17} className="text-gold shrink-0 mt-0.5" /><span>{CONTACT.address}</span></li>
            {CONTACT.phones.map((p) => (
              <li key={p} className="flex gap-3"><Phone size={16} className="text-gold shrink-0" /><a href={`tel:${p}`} className="hover:text-gold">{p}</a></li>
            ))}
            <li className="flex gap-3"><Mail size={16} className="text-gold shrink-0" /><a href={`mailto:${CONTACT.email}`} className="hover:text-gold">{CONTACT.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/50">
        <p>© {new Date().getFullYear()} Malhar Nooril Islami Tha'eleemi. All rights reserved.</p>
        <p>Kasaragod, Kerala, India</p>
      </div>
    </div>

    <div className="relative overflow-hidden border-t border-cream/10">
      <p className="font-serif text-7xl md:text-[10rem] leading-none text-cream/5 text-center whitespace-nowrap select-none -mb-24 pt-4">Malhar</p>
    </div>
  </footer>
);
