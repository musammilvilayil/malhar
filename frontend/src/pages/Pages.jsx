import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, Heart, Send } from "lucide-react";
import { api } from "../lib/api";
import siteData from "../data/malharData";
import socialMediaData from "../data/socialMediaData";
import { Reveal, Stagger, StaggerItem, Overline, GeoPattern, QuoteBlock } from "../components/site/Primitives";
import About from "./About";

const { about, contact, institutions, institutionDetails, gallery, news, events, youtube, instructors } = siteData;
const { socialLinks, socialMediaEvents } = socialMediaData;

const PageHero = ({ overline, title, sub, arabic, backgroundImage }) => (
  <section className="relative pt-44 pb-20 bg-emerald text-cream overflow-hidden" data-testid="page-hero">
    <div className="absolute inset-0">
      {backgroundImage ? (
        <>
          <img src={backgroundImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-emerald/65" />
        </>
      ) : (
        <GeoPattern color="#C5A059" opacity={0.05} />
      )}
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {arabic && <Reveal><span className="font-arabic text-xl text-gold">{arabic}</span></Reveal>}
      <Reveal delay={0.05}><Overline>{overline}</Overline></Reveal>
      <Reveal delay={0.1}><h1 className="mt-5 font-serif font-light text-5xl md:text-6xl leading-tight">{title}</h1></Reveal>
      {sub && <Reveal delay={0.2}><p className="mt-5 max-w-2xl text-cream/70 font-light text-lg">{sub}</p></Reveal>}
    </div>
  </section>
);

export const AboutPage = () => <About />;

export const InstitutionsPage = () => (
  <>
    <PageHero overline="Our Institutions" title="Seven pillars of learning." sub="From Qur'anic studies to preschool, each Malhar institution is dedicated to nurturing the whole person." />
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Stagger>
          {institutions.map((it, i) => {
            const detail = institutionDetails.find((d) => d.slug === it.slug) || {};
            return (
              <StaggerItem key={it.slug}>
                <div className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                  <div className="img-zoom border border-charcoal/10 aspect-[4/3] [direction:ltr]">
                    <img src={it.image} alt={it.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="[direction:ltr]">
                    <span className="font-serif text-gold text-2xl">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="mt-3 font-serif font-light text-3xl md:text-4xl text-charcoal">{it.name}</h2>
                    <p className="mt-4 text-charcoal/60 font-light leading-relaxed">{detail.headline || it.description}</p>
                    <div className="mt-6">
                      <Link to={`/institution/${it.slug}`} className="inline-flex items-center gap-2 text-charcoal/70 hover:text-emerald">Explore {it.name} <ArrowUpRight size={16} /></Link>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  </>
);

export const VenturesPage = () => (
  <>
    <PageHero overline="Ventures" title="Beyond the classroom." sub="Malhar's community ventures extend our mission through education, social service and outreach." />
    <section className="py-24 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-charcoal/70 font-light text-lg leading-relaxed">
        <Reveal>
          <p>Malhar supports a growing network of educational and community ventures, including women’s colleges, research centres and outreach programmes for families across Manjeshwar.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Faith-centered curriculum",
              "Modern academic preparation",
              "Women’s leadership and inclusion"
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-charcoal/10 bg-white/70 p-5">
                <p className="font-semibold text-charcoal">{item}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  </>
);

export const InstitutionPage = () => {
  const { slug } = useParams();
  const institution = institutions.find((it) => it.slug === slug);
  const detail = institutionDetails.find((d) => d.slug === slug) || {};
  if (!institution) return (
    <section className="pt-44 pb-24 bg-cream min-h-screen text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-charcoal/60">We could not find that institution. Please choose from our institutions list.</p>
        <Link to="/our-institutions" className="mt-8 inline-flex items-center gap-2 text-emerald link-underline">View institutions</Link>
      </div>
    </section>
  );

  return (
    <>
      <PageHero overline="Institution" title={institution.name} sub={detail.headline || institution.description} backgroundImage={institution.image} />
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
            <div>
              <div className="rounded-3xl overflow-hidden border border-charcoal/10">
                <img src={institution.image} alt={institution.name} className="w-full h-full object-cover" />
              </div>
              <p className="mt-4 text-charcoal/70 font-light leading-relaxed">{detail.overview}</p>
            </div>
            <aside className="space-y-8">
              <div className="rounded-3xl border border-charcoal/10 bg-white/70 p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-gold-brass">Programme highlights</p>
                <ul className="mt-4 space-y-3 text-charcoal/70">
                  {(detail.programs || []).map((p) => <li key={p} className="rounded-3xl border border-charcoal/10 bg-emerald/5 p-4">{p}</li>)}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export const MediaPage = () => {
  const { youtube, facebook, instagram, socialMediaEvents: smEvents, socialLinks } = socialMediaData;

  return (
    <>
      <section className="relative h-[56vh] min-h-[360px] overflow-hidden">
        <img src="/assets/DSC_2363-1-1-1.jpg" alt="Malhar campus" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-emerald/65 backdrop-blur-sm" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-cream max-w-2xl">
            <span className="inline-flex items-center gap-3 text-xs md:text-sm font-medium tracking-[0.22em] uppercase text-cream"><span className="h-px w-8 bg-cream/50" />Media & Social</span>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl">Malhar Media — videos, updates and social highlights</h1>
            <p className="mt-4 text-cream/90 font-light">Watch lectures, event coverage and community stories from our official channels. Follow us for the latest announcements and campus moments.</p>
            <div className="mt-6 flex gap-3">
              <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-lg">YouTube</a>
              <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg">Facebook</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <Overline>Featured video</Overline>
                <h2 className="mt-3 font-serif font-light text-3xl text-charcoal">Latest from Malhar Media</h2>
                <p className="mt-3 text-charcoal/70">Explore recent videos from our channel covering lectures, events and campus life.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {youtube.videos.slice(0, 6).map((v) => (
                  <article key={v.id} className="bg-white rounded-2xl overflow-hidden border border-charcoal/10">
                    <a href={`https://www.youtube.com/watch?v=${v.videoId}`} target="_blank" rel="noreferrer" className="block">
                      <img src={v.thumbnail} alt={v.title} className="w-full h-44 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold text-charcoal line-clamp-2">{v.title}</h3>
                        <p className="text-sm text-charcoal/60 mt-2 line-clamp-2">{v.description}</p>
                        <div className="mt-3 text-xs text-gray-500 flex items-center justify-between"><span>👁 {v.views}</span><span>{v.publishedAt}</span></div>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            </div>

            <aside className="space-y-8">
              <div className="rounded-2xl border border-charcoal/10 p-6 bg-white/70">
                <h4 className="font-semibold text-charcoal">Follow</h4>
                <p className="text-sm text-charcoal/70 mt-2">Stay connected across our social platforms for announcements and live updates.</p>
                <div className="mt-4 flex flex-col gap-3">
                  <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="text-sm text-red-600">YouTube · {youtube.subscribers}</a>
                  <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="text-sm text-blue-600">Facebook · {facebook.likes} likes</a>
                  <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="text-sm text-pink-600">Instagram · {instagram.followers} followers</a>
                </div>
              </div>

              <div className="rounded-2xl border border-charcoal/10 p-6 bg-white/70">
                <h4 className="font-semibold text-charcoal">Recent posts</h4>
                <div className="mt-4 space-y-4">
                  {facebook.posts.slice(0, 4).map((p) => (
                    <div key={p.id} className="text-charcoal/80">
                      <p className="text-sm font-medium">{p.date} · {p.type}</p>
                      <p className="text-sm mt-1">{p.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-serif text-2xl mb-6">Events from our channels</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {smEvents.map((e) => (
              <div key={e.id} className="bg-white rounded-2xl border border-charcoal/10 overflow-hidden">
                <img src={e.image} alt={e.title} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-charcoal">{e.title}</h4>
                  <p className="text-sm text-charcoal/60 mt-2">{e.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export const GalleryPage = () => {
  const images = (gallery || []).map((g) => ({ src: g.src, caption: g.title || "" }));
  return (
    <>
      <PageHero overline="Media · Gallery" title="Life at Malhar." sub="Moments from our campuses, events and community." />
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stagger className="columns-2 md:columns-3 gap-4 [&>*]:mb-4">
            {images.map((img, i) => (
              <StaggerItem key={i} className="relative img-zoom border border-charcoal/10 break-inside-avoid group">
                <img src={img.src} alt={img.caption || `Gallery ${i + 1}`} className={`w-full object-cover ${i % 4 === 0 ? "aspect-[3/4]" : "aspect-square"}`} loading="lazy" />
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald/90 to-transparent p-4 pt-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-cream text-sm font-light">{img.caption}</p>
                  </div>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
};

export const NewsPage = () => {
  const sortedNews = [...(news || [])].sort((a, b) => new Date(b.date) - new Date(a.date));
  const sortedEvents = [...(events || [])].sort((a, b) => new Date(b.date) - new Date(a.date));

  const getEventThumbnail = (ev) => {
    if (ev.image) return ev.image;
    const sm = (socialMediaData.socialMediaEvents || []).find((s) => s.title === ev.title || s.date === ev.date);
    if (sm && sm.image) return sm.image;
    return '/assets/DSC_2363-1-1-1.jpg';
  };

  return (
    <>
      <PageHero overline="Media · News" title="News & announcements." />
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedNews.length === 0 && sortedEvents.length === 0 ? (
            <div className="border border-charcoal/10 p-16 text-center text-charcoal/50 font-light">Malhar news and events are being updated. Please check back soon for the latest trust developments.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-2xl mb-6">News</h3>
                <div className="grid gap-6">
                  {sortedNews.map((n) => (
                    <article key={n.id} className="border border-charcoal/10 img-zoom flex gap-4" data-testid={`news-${n.id}`}>
                      <div className="w-36 h-24 overflow-hidden">
                        <img src={n.image || '/assets/web-slide-1-scaled.png'} alt={n.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 flex-1">
                        <p className="text-xs text-gold-brass tracking-wide">{n.date}</p>
                        <h3 className="mt-2 font-serif text-xl text-charcoal">{n.title}</h3>
                        <p className="mt-2 text-charcoal/60 text-sm font-light">{n.excerpt}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl mb-6">Events</h3>
                <div className="grid gap-6">
                  {sortedEvents.map((e) => (
                    <article key={e.id} className="border border-charcoal/10 img-zoom flex gap-4" data-testid={`event-${e.id}`}>
                      <div className="w-36 h-24 overflow-hidden">
                        <img src={getEventThumbnail(e)} alt={e.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 flex-1">
                        <p className="text-xs text-gold-brass tracking-wide">{e.date}</p>
                        <h3 className="mt-2 font-serif text-xl text-charcoal">{e.title}</h3>
                        <p className="mt-2 text-charcoal/60 text-sm font-light">{e.location || e.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/contact", form);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {}
    setLoading(false);
  };

  return (
    <>
      <PageHero overline="Contact" title="Get in touch." sub="We would love to hear from you. Reach out with any question about admissions, our institutions or the trust." />
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold-brass mb-2">Address</p>
              <p className="text-charcoal/70 font-light">{contact.address}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-charcoal/10 bg-white/70 p-5">
                <p className="text-xs uppercase tracking-widest text-gold-brass mb-2">Admissions</p>
                <p className="text-charcoal/70">Call <a href={`tel:${contact.phones[0]}`} className="text-emerald hover:text-emerald-light">{contact.phones[0]}</a> or email <a href={`mailto:${contact.email}`} className="text-emerald hover:text-emerald-light">{contact.email}</a>.</p>
              </div>
              <div className="rounded-3xl border border-charcoal/10 bg-white/70 p-5">
                <p className="text-xs uppercase tracking-widest text-gold-brass mb-2">General Enquiries</p>
                <p className="text-charcoal/70">For campus visits, programme questions, or media requests, reach our office directly during business hours.</p>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gold-brass mb-2">Office Hours</p>
              <p className="text-charcoal/70">Monday – Saturday, 9:00 AM – 6:00 PM</p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-4" data-testid="contact-form">
            <p className="text-charcoal/60 leading-relaxed">Complete this form and our admissions team will respond within one business day. For urgent questions, please call or email us directly.</p>
            <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-charcoal/15 bg-transparent px-4 py-3.5 focus:border-emerald outline-none" data-testid="contact-name" />
            <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-charcoal/15 bg-transparent px-4 py-3.5 focus:border-emerald outline-none" data-testid="contact-email" />
            <input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-charcoal/15 bg-transparent px-4 py-3.5 focus:border-emerald outline-none" data-testid="contact-phone" />
            <textarea required rows={5} placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-charcoal/15 bg-transparent px-4 py-3.5 focus:border-emerald outline-none resize-none" data-testid="contact-message" />
            <button disabled={loading} className="inline-flex items-center gap-2 px-7 py-4 bg-emerald text-cream hover:bg-emerald-light transition-colors disabled:opacity-60" data-testid="contact-submit">{loading ? "Sending..." : "Send Message"} <Send size={16} /></button>
          </form>
        </div>
      </section>
    </>
  );
};

export const DonatePage = () => (
  <>
    <PageHero overline="Support Us" arabic="مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا" title="Donate to Malhar." />
    <section className="py-28 bg-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal><span className="w-16 h-16 rounded-full bg-emerald text-gold flex items-center justify-center mx-auto"><Heart size={26} /></span></Reveal>
        <Reveal delay={0.1}><h2 className="mt-8 font-serif font-light text-3xl md:text-4xl text-charcoal">Support Malhar today.</h2></Reveal>
        <Reveal delay={0.2}><p className="mt-5 text-charcoal/60 font-light text-lg">To make a contribution, contact the trust office directly. Our team will provide the current support details and help you complete your donation.</p></Reveal>
      </div>
    </section>
  </>
);

export const AdmissionPage = () => (
  <>
    <PageHero overline="Admission" title="Apply to Malhar." sub="Admissions are open across all Malhar institutions. Submit your enquiry and our team will help you complete the process." />
    <section className="py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Reveal>
          <p className="text-charcoal/60 font-light text-lg">{about.vision}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="grid gap-4 md:grid-cols-2">
            {institutions.map((institution) => (
              <div key={institution.slug} className="border border-charcoal/10 p-5 bg-white/5">
                <p className="text-charcoal font-medium">{institution.name}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  </>
);

export const InstructorPage = () => {
  const { slug } = useParams();
  const p = (instructors || []).find((item) => item.slug === slug);
  if (!p) return <div className="pt-44 pb-24 text-center bg-cream min-h-screen"><p className="text-charcoal/50">Profile not found.</p><Link to="/" className="text-emerald link-underline">Back home</Link></div>;
  return (
    <>
      <section className="pt-44 pb-24 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-start">
          <Reveal><div className="border border-charcoal/10 p-3"><div className="aspect-[3/4] overflow-hidden grayscale">{p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-emerald/10 flex items-center justify-center font-serif text-6xl text-emerald/40">{p.name?.charAt(0)}</div>}</div></div></Reveal>
          <Reveal delay={0.1}>
            <Link to="/" className="inline-flex items-center gap-2 text-charcoal/50 hover:text-emerald mb-6" data-testid="instructor-back"><ArrowLeft size={16} /> Back</Link>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-brass">{p.role}</p>
            <h1 className="mt-3 font-serif font-light text-4xl md:text-5xl text-charcoal">{p.name}</h1>
            <p className="mt-6 text-charcoal/60 font-light text-lg leading-relaxed">{p.bio}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default null;
