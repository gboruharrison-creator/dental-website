import { useState } from "react";
import { useTranslation } from "react-i18next";
import { services } from "../../data/services";
import SEOHead from "../../components/SEOHead";

const faqs = [
  {
    q: "Do you offer payment plans?",
    a: "Yes. We offer 0% interest finance on treatments over £300, spread over 6 to 24 months. Ask at reception or mention it when booking and we'll send you the details.",
  },
  {
    q: "How long do appointments usually take?",
    a: "A standard check-up is 30–45 minutes. Cosmetic consultations are 45–60 minutes. Complex treatments like implants or Invisalign fittings are typically 60–90 minutes.",
  },
  {
    q: "Are your treatments painful?",
    a: "We use the latest anaesthetic techniques and take your comfort seriously. Most patients are surprised by how little they feel. For nervous patients we offer sedation options.",
  },
  {
    q: "Do you see NHS patients?",
    a: "We are a private practice, but our prices are competitive and we accept all major dental insurance plans including BUPA, AXA, Aviva, Cigna, and Vitality.",
  },
  {
    q: "How soon can I get an appointment?",
    a: "Routine appointments are usually available within 3–5 days. For emergencies we offer same-day appointments — call our emergency line on 0800 123 4567.",
  },
  {
    q: "What happens at my first visit?",
    a: "Your first appointment includes a full oral health assessment, digital X-rays if needed, and a personalised treatment plan. There is no pressure to proceed with any treatment on the day.",
  },
];

const whyItems = [
  { icon: "🏆", titleKey: "Award-Winning Care", desc: "Voted London's Best Dental Practice 2024. Our team holds advanced qualifications from the Royal College of Surgeons." },
  { icon: "🔬", titleKey: "Latest Technology", desc: "Digital X-rays, intraoral cameras, 3D scanning for implants, and same-day crowns using CAD/CAM technology." },
  { icon: "💙", titleKey: "Nervous Patient Friendly", desc: "We specialise in treating anxious patients. Sedation options available. We go at your pace, always." },
  { icon: "💳", titleKey: "Flexible Finance", desc: "0% interest payment plans available on treatments over £300. We believe cost should never stand between you and your health." },
  { icon: "📅", titleKey: "Extended Hours", desc: "Open Monday to Friday 8am–7pm and Saturdays 9am–5pm. Early morning and evening appointments available." },
  { icon: "🚨", titleKey: "24/7 Emergency Line", desc: "Dental emergencies don't keep office hours. Our emergency line is available 7 days a week, including bank holidays." },
];

export default function Services({ onBooking }) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedService, setExpandedService] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { key: "All", label: t("services.filterAll") },
    { key: "general", label: t("services.filterGeneral") },
    { key: "cosmetic", label: t("services.filterCosmetic") },
    { key: "restorative", label: t("services.filterRestorative") },
    { key: "orthodontics", label: t("services.filterOrthodontics") },
  ];

  const filtered = activeCategory === "All"
    ? services
    : services.filter((s) => s.category === activeCategory);

  return (
    <div>
      <SEOHead
        title="Dental Services & Prices"
        description="Full range of dental treatments in London — check-ups from £50, teeth whitening from £299, implants from £1,200. View all services and book online."
        canonical="/services"
      />

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-primary to-[#0d4f6b] text-white section-padding">
        <div className="container-max text-center">
          <span className="inline-block bg-accent/20 border border-accent/40 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            {t("servicesPage.heroBadge")}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t("servicesPage.heroTitle")}</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">{t("servicesPage.heroSubtitle")}</p>
          <button
            onClick={onBooking}
            className="bg-accent hover:opacity-90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200"
          >
            {t("servicesPage.heroCta")}
          </button>
        </div>
      </section>

      {/* ── FILTER + GRID ── */}
      <section className="section-padding bg-light">
        <div className="container-max">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border " +
                  (activeCategory === cat.key
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary")
                }
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((service) => (
              <div
                key={service.id}
                className={
                  "bg-white rounded-2xl border transition-all duration-300 overflow-hidden " +
                  (expandedService === service.id
                    ? "border-primary shadow-lg"
                    : "border-gray-100 hover:shadow-md hover:-translate-y-1")
                }
              >
                <div className="p-6">
                  <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center text-2xl mb-4">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-dark mb-1">{service.title}</h3>
                  <p className="text-primary font-semibold text-sm mb-3">{service.price}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
                  <button
                    onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                    className={
                      "text-sm font-medium transition-colors " +
                      (expandedService === service.id ? "text-primary" : "text-gray-400 hover:text-primary")
                    }
                  >
                    {expandedService === service.id ? t("services.lessInfo") : t("services.moreInfo")}
                  </button>
                </div>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: expandedService === service.id ? "200px" : "0px" }}
                >
                  <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                    <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-4">{service.details}</p>
                    <button
                      onClick={onBooking}
                      className="w-full bg-primary text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all"
                    >
                      {t("services.bookThis")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t("servicesPage.whyBadge")}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mt-2">{t("servicesPage.whyTitle")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {whyItems.map((item) => (
              <div key={item.titleKey} className="flex gap-4">
                <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-dark mb-1">{item.titleKey}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-light">
        <div className="container-max">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t("servicesPage.faqBadge")}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mt-2">{t("servicesPage.faqTitle")}</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={
                  "bg-white rounded-2xl border overflow-hidden transition-all duration-200 " +
                  (openFaq === i ? "border-primary shadow-md" : "border-gray-100")
                }
              >
                <button
                  className="w-full text-left px-6 py-5 flex justify-between items-center gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-dark text-sm md:text-base">{faq.q}</span>
                  <span
                    className={
                      "text-primary text-xl transition-transform duration-200 flex-shrink-0 " +
                      (openFaq === i ? "rotate-45" : "")
                    }
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openFaq === i ? "200px" : "0px" }}
                >
                  <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-primary text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("servicesPage.ctaTitle")}</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">{t("servicesPage.ctaSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBooking}
              className="bg-accent hover:opacity-90 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200"
            >
              {t("servicesPage.ctaBtn1")}
            </button>
            <a
              href="tel:02079460321"
              className="border-2 border-white/40 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-all duration-200"
            >
              {t("servicesPage.ctaBtn2")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}