import { useState } from "react";
import { useTranslation } from "react-i18next";
import { team } from "../../data/team";
import SEOHead from "../../components/SEOHead";

const awards = [
  { year: "2024", title: "Best Dental Practice", body: "London Health Awards" },
  { year: "2023", title: "Patient Experience Excellence", body: "Dental Industry Awards" },
  { year: "2022", title: "Top Invisalign Provider", body: "Align Technology UK" },
  { year: "2021", title: "Outstanding Clinical Care", body: "Royal College of Surgeons" },
];

const clinicPhotos = [
  { url: "photo-1629909613654-28e377c37b09", alt: "Reception area" },
  { url: "photo-1606811841689-23dfddce3e95", alt: "Treatment room" },
  { url: "photo-1588776814546-1ffbb7d57e4d", alt: "Patient care" },
  { url: "photo-1581595220892-b0739db3ba8c", alt: "Modern equipment" },
  { url: "photo-1559839734-2b71ea197ec2", alt: "Dr Mitchell" },
  { url: "photo-1570813673498-d26843df1c04", alt: "Whitening treatment" },
];

export default function About({ onBooking }) {
  const { t } = useTranslation();
  const [activeTeam, setActiveTeam] = useState(0);

  const values = [
    { icon: "🤝", title: "Patient First, Always", desc: "Every decision we make starts with one question: what is best for this patient? Your comfort, your budget, and your goals guide everything." },
    { icon: "🔬", title: "Clinical Excellence", desc: "Our team holds advanced qualifications and commits to ongoing training. We only use techniques and materials backed by the latest clinical evidence." },
    { icon: "💬", title: "Honest Conversations", desc: "We tell you exactly what you need — and what you don't. No upselling, no pressure. Just clear, honest advice you can trust." },
    { icon: "🌍", title: "Community Commitment", desc: "We offer reduced-fee treatments for NHS-referred patients and run a free annual dental health day for local schoolchildren." },
  ];

  return (
    <div>
      <SEOHead
        title="About Us — Meet Our Dentists"
        description="Meet the BrightSmile team — three specialist dentists with over 15 years of experience in cosmetic, restorative and orthodontic dentistry in London."
        canonical="/about"
      />

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-primary to-[#0d4f6b] text-white section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-accent/20 border border-accent/40 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                {t("aboutPage.heroBadge")}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {t("aboutPage.heroTitle1")}<br />
                <span className="text-accent">{t("aboutPage.heroTitle2")}</span>
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed mb-6">{t("aboutPage.heroPara1")}</p>
              <p className="text-blue-100 text-lg leading-relaxed mb-8">{t("aboutPage.heroPara2")}</p>
              <button
                onClick={onBooking}
                className="bg-accent hover:opacity-90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200"
              >
                {t("aboutPage.heroCta")}
              </button>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {clinicPhotos.slice(0, 4).map((photo, i) => (
                <img
                  key={photo.url}
                  src={"https://images.unsplash.com/" + photo.url + "?w=400&h=300&fit=crop"}
                  alt={photo.alt}
                  className={"rounded-2xl w-full h-48 object-cover" + (i % 2 !== 0 ? " mt-8" : "")}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section-padding bg-light">
        <div className="container-max">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t("aboutPage.valuesBadge")}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mt-2">{t("aboutPage.valuesTitle")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center text-2xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-dark mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t("aboutPage.teamBadge")}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mt-2">{t("aboutPage.teamTitle")}</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">{t("aboutPage.teamSubtitle")}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {team.map((member, i) => (
              <button
                key={member.id}
                onClick={() => setActiveTeam(i)}
                className={
                  "flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-200 " +
                  (activeTeam === i
                    ? "bg-primary text-white border-primary shadow-lg"
                    : "bg-white text-dark border-gray-200 hover:border-primary/40")
                }
              >
                <img src={member.image} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="text-sm font-medium">{member.name.split(" ")[1]}</span>
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-light rounded-3xl overflow-hidden border border-gray-100">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={team[activeTeam].image}
                    alt={team[activeTeam].name}
                    className="w-full object-cover"
                    style={{ height: "380px" }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                    <p className="font-bold text-dark">{team[activeTeam].name}</p>
                    <p className="text-primary text-sm font-medium">{team[activeTeam].role}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{team[activeTeam].speciality}</p>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <p className="text-gray-600 leading-relaxed mb-6">{team[activeTeam].bio}</p>
                  <div>
                    <p className="text-sm font-semibold text-dark mb-3 uppercase tracking-wider">{t("aboutPage.credentials")}</p>
                    <ul className="space-y-2">
                      {team[activeTeam].credentials.map((cred) => (
                        <li key={cred} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center text-accent text-xs flex-shrink-0">✓</span>
                          {cred}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={onBooking}
                    className="mt-8 bg-primary text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-all duration-200 text-sm"
                  >
                    {t("aboutPage.bookWith")} {team[activeTeam].name.split(" ")[1]} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section className="section-padding bg-light">
        <div className="container-max">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t("aboutPage.awardsBadge")}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mt-2">{t("aboutPage.awardsTitle")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {awards.map((award) => (
              <div key={award.title} className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🏆</div>
                <p className="text-primary font-bold text-lg mb-1">{award.year}</p>
                <h3 className="font-bold text-dark text-sm mb-1">{award.title}</h3>
                <p className="text-gray-400 text-xs">{award.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLINIC PHOTOS ── */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t("aboutPage.clinicBadge")}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mt-2">{t("aboutPage.clinicTitle")}</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">{t("aboutPage.clinicSubtitle")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {clinicPhotos.map((photo) => (
              <div key={photo.url} className="rounded-2xl overflow-hidden aspect-square">
                <img
                  src={"https://images.unsplash.com/" + photo.url + "?w=400&h=400&fit=crop"}
                  alt={photo.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-primary text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("aboutPage.ctaTitle")}</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">{t("aboutPage.ctaSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBooking}
              className="bg-accent hover:opacity-90 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200"
            >
              {t("aboutPage.ctaBtn1")}
            </button>
            <a
              href="/contact"
              className="border-2 border-white/40 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-all duration-200"
            >
              {t("aboutPage.ctaBtn2")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}