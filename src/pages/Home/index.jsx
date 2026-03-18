import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { services } from "../../data/services";
import { blogPosts } from "../../data/blogPosts";
import SEOHead from "../../components/SEOHead";

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.6s ease " + delay + "s, transform 0.6s ease " + delay + "s",
      }}
    >
      {children}
    </div>
  );
}

const insurers = ["BUPA", "AXA", "Aviva", "Cigna", "Vitality", "WPA"];

const testimonials = [
  {
    name: "Emily R.",
    treatment: "Invisalign",
    text: "I was so self-conscious about my teeth for years. After 14 months with BrightSmile, my smile has completely transformed. The team made every visit genuinely enjoyable.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Marcus T.",
    treatment: "Dental Implants",
    text: "Dr. Sharma is an absolute artist. I had two implants done and honestly felt nothing. Six months later they look and feel completely natural. Worth every penny.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Sophia L.",
    treatment: "Teeth Whitening",
    text: "I got the in-chair whitening before my wedding and the results were stunning. Seven shades whiter in one session. My photos look incredible.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
  },
];

export default function Home({ onBooking }) {
  const { t } = useTranslation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);

  const stats = [
    { value: "4,800+", label: t("stats.patients") },
    { value: "15+", label: t("stats.experience") },
    { value: "98%", label: t("stats.reviews") },
    { value: "3", label: t("stats.dentists") },
  ];

  const steps = [
    { num: "01", title: t("howItWorks.step1Title"), desc: t("howItWorks.step1Desc") },
    { num: "02", title: t("howItWorks.step2Title"), desc: t("howItWorks.step2Desc") },
    { num: "03", title: t("howItWorks.step3Title"), desc: t("howItWorks.step3Desc") },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <SEOHead
        title="Award-Winning Dental Care in London"
        description="BrightSmile Dental Clinic — professional teeth whitening, implants, Invisalign and more in Harley Street, London. Book your free consultation today."
        canonical="/"
      />

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-[#0d4f6b] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1400&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <span className="inline-block bg-accent/20 border border-accent/40 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                {t("hero.badge")}
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                {t("hero.title1")}
                <span className="text-accent block">{t("hero.title2")}</span>
                {t("hero.title3")}
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-lg">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onBooking}
                  className="bg-accent hover:opacity-90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-center"
                >
                  {t("hero.cta1")}
                </button>
                <Link
                  to="/services"
                  className="border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-center"
                >
                  {t("hero.cta2")}
                </Link>
              </div>
              <div className="flex items-center gap-3 mt-8">
                <div className="flex -space-x-2">
                  {["photo-1559839734-2b71ea197ec2", "photo-1612349317150-e413f6a5b16d", "photo-1594824476967-48c8b964273f"].map((id) => (
                    <img
                      key={id}
                      src={"https://images.unsplash.com/" + id + "?w=40&h=40&fit=crop&crop=face"}
                      className="w-9 h-9 rounded-full border-2 border-white object-cover"
                      alt="dentist"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex text-accent text-sm">{"★★★★★"}</div>
                  <p className="text-blue-200 text-xs">{t("hero.reviews")}</p>
                </div>
              </div>
            </div>

            <div
              className="hidden lg:block"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateX(0)" : "translateX(40px)",
                transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
              }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=700&fit=crop"
                  alt="Modern dental clinic"
                  className="rounded-3xl w-full object-cover"
                  style={{ height: "500px" }}
                />
                <div className="absolute -bottom-6 -left-6 bg-white text-dark rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
                    <div>
                      <p className="font-semibold text-sm">{t("hero.badge2")}</p>
                      <p className="text-gray-400 text-xs">{t("hero.badge3")}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-accent text-white rounded-2xl p-4 shadow-xl">
                  <p className="text-2xl font-bold">15+</p>
                  <p className="text-xs text-white/80">{t("hero.years")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-max px-4 md:px-8 lg:px-16 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="section-padding bg-light">
        <div className="container-max">
          <FadeIn className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t("services.badge")}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mt-2">{t("services.title")}</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">{t("services.subtitle")}</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 8).map((service, i) => (
              <FadeIn key={service.id} delay={i * 0.07}>
                <div className="bg-white rounded-2xl p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
                  <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-primary/10 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-dark mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{service.description}</p>
                  <p className="text-primary font-semibold text-sm">{service.price}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="text-center mt-10">
            <Link to="/services" className="btn-primary inline-block">
              {t("services.viewAll")}
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <FadeIn className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t("howItWorks.badge")}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mt-2">{t("howItWorks.title")}</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/20 via-accent to-primary/20" />
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.15} className="text-center relative">
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-5 shadow-lg">
                  {step.num}
                </div>
                <h3 className="font-bold text-dark text-lg mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-padding bg-gradient-to-br from-primary to-[#0d4f6b] text-white">
        <div className="container-max">
          <FadeIn className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t("testimonials.badge")}</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-2">{t("testimonials.title")}</h2>
          </FadeIn>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 text-center">
              <div className="flex justify-center mb-2">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-accent text-xl">{s}</span>
                ))}
              </div>
              <p className="text-white/90 text-lg leading-relaxed mb-8 italic">
                "{testimonials[activeTestimonial].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-accent"
                />
                <div className="text-left">
                  <p className="font-semibold">{testimonials[activeTestimonial].name}</p>
                  <p className="text-accent text-sm">{testimonials[activeTestimonial].treatment}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={
                    "h-2.5 rounded-full transition-all duration-300 " +
                    (i === activeTestimonial ? "bg-accent w-6" : "bg-white/30 w-2.5")
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INSURANCE ── */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container-max px-4 md:px-8 lg:px-16">
          <p className="text-center text-gray-400 text-sm mb-6 uppercase tracking-wider font-medium">
            {t("insurance.label")}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {insurers.map((name) => (
              <div key={name} className="px-6 py-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-500 font-semibold text-sm hover:border-primary/30 hover:text-primary transition-colors">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      <section className="section-padding bg-light">
        <div className="container-max">
          <FadeIn className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t("blog.badge")}</span>
              <h2 className="text-3xl font-bold text-dark mt-1">{t("blog.title")}</h2>
            </div>
            <Link to="/blog" className="text-primary font-semibold text-sm hover:underline">
              {t("blog.viewAll")}
            </Link>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, i) => (
              <FadeIn key={post.id} delay={i * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <img src={post.image} alt={post.title} className="w-full h-44 object-cover" />
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-accent text-xs font-semibold uppercase tracking-wider">{post.category}</span>
                    <h3 className="font-bold text-dark mt-2 mb-2 leading-snug">{post.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="section-padding bg-accent">
        <div className="container-max text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t("cta.title")}</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onBooking}
                className="bg-white text-accent font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-200"
              >
                {t("cta.btn1")}
              </button>
              <a
                href="tel:02079460321"
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                {t("cta.btn2")}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}