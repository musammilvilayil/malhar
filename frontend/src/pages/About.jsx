import React from "react";
import { Link } from "react-router-dom";
import { MaskedLines, Reveal, Overline, Parallax, Counter } from "../components/site/Primitives";
import siteData from "../data/malharData";

export default function About() {
  const { about, founder } = siteData;
  return (
    <main>
      <section className="relative min-h-[48vh] flex items-center pt-24 md:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Parallax src="/assets/about-imgs.jpg" alt="About background" className="w-full h-full" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <MaskedLines tag="h1" lines={["About Malhar", "Our Purpose", "Our Community"]} className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-charcoal" delay={0.2} />
            <Reveal delay={0.2}>
              <p className="mt-6 text-charcoal/70 max-w-2xl leading-relaxed">{about.mission}</p>
            </Reveal>
            <div className="mt-8 flex gap-4">
              <Link to="/our-institutions" className="inline-flex items-center px-6 py-3 bg-emerald text-cream">Our Institutions</Link>
              <Link to="/admission" className="inline-flex items-center px-6 py-3 border border-charcoal/20">Admissions</Link>
            </div>
          </div>
          <div className="md:col-span-5">
            <Reveal>
              <div className="border border-charcoal/10 p-4 bg-cream">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                </div>
                <p className="mt-3 font-serif text-lg text-charcoal">{founder.name}</p>
                <p className="text-sm text-gold-brass uppercase">Founder</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream border-t border-charcoal/10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <Reveal><Overline>Our Vision</Overline></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-serif text-3xl text-charcoal">A foundation for faith and learning.</h2></Reveal>
            <Reveal delay={0.2}><p className="mt-4 text-charcoal/70">{about.vision}</p></Reveal>
          </div>
          <div>
            <Reveal><Overline>Achievements</Overline></Reveal>
            <Reveal delay={0.1}><p className="mt-4 text-charcoal/70">{about.achievements}</p></Reveal>
          </div>
          <div>
            <Reveal><Overline>By Numbers</Overline></Reveal>
            <div className="mt-4 space-y-4">
              <div className="text-2xl font-bold text-emerald"><Counter to={about.stats.years} suffix="+" /></div>
              <div className="text-2xl font-bold text-emerald"><Counter to={5000} suffix="+" /></div>
              <div className="text-2xl font-bold text-emerald"><Counter to={about.stats.faculty.replace ? parseInt(about.stats.faculty) : 150} suffix="+" /></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
