import React from "react";
import { Link } from "react-router-dom";
import { MaskedLines, Reveal, Overline, Parallax } from "../components/site/Primitives";
import siteData from "../data/malharData";

export default function About() {
  const about = siteData?.about || {};
  const founder = siteData?.founder || {};
  const established = about?.stats?.established || siteData?.site?.established || 2000;
  const institutionCount = about?.stats?.institutions || siteData?.institutions?.length || 7;

  return (
    <main>
      <section className="relative min-h-[48vh] flex items-center pt-24 md:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Parallax src="/assets/about-imgs.jpg" alt="Malhar campus and community" className="w-full h-full" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <MaskedLines
              tag="h1"
              lines={["About Malhar", "Our Purpose", "Our Community"]}
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-charcoal"
              delay={0.2}
            />
            <Reveal delay={0.2}>
              <p className="mt-6 text-charcoal/70 max-w-2xl leading-relaxed">
                {about.mission || "Malhar brings together Islamic and secular learning while supporting the educational, spiritual and social needs of the community."}
              </p>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/our-institutions" className="inline-flex items-center px-6 py-3 bg-emerald text-cream">Our Institutions</Link>
              <Link to="/admission" className="inline-flex items-center px-6 py-3 border border-charcoal/20">Admissions</Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <Reveal>
              <div className="border border-charcoal/10 p-4 bg-cream">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={founder.image || "/assets/Posoat-Thangal-360x370.jpg"}
                    alt={founder.name || "Founder of Malhar"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-3 font-serif text-lg text-charcoal">
                  {founder.name || "Sheikh Sayyid Umarul Farooq Al Bukhari"}
                </p>
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
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-serif text-3xl text-charcoal">A foundation for faith and learning.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-charcoal/70">
                {about.vision || "An educational environment that brings Islamic values and modern learning together."}
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal><Overline>Our Journey</Overline></Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-charcoal/70">
                {about.achievements || "Malhar has continued its educational, spiritual and social work from Manjeshwar, Kasaragod."}
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal><Overline>At a Glance</Overline></Reveal>
            <div className="mt-5 space-y-5">
              <div>
                <p className="font-serif text-4xl text-emerald">{established}</p>
                <p className="mt-1 text-sm text-charcoal/60">Established</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-emerald">{institutionCount}</p>
                <p className="mt-1 text-sm text-charcoal/60">Institutions represented in this redesign</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
