import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import SEOHead from "../../components/SEOHead";

const hours = [
  { day: "Monday", time: "8:00am – 7:00pm", open: true },
  { day: "Tuesday", time: "8:00am – 7:00pm", open: true },
  { day: "Wednesday", time: "8:00am – 7:00pm", open: true },
  { day: "Thursday", time: "8:00am – 7:00pm", open: true },
  { day: "Friday", time: "8:00am – 7:00pm", open: true },
  { day: "Saturday", time: "9:00am – 5:00pm", open: true },
  { day: "Sunday", time: "Closed", open: false },
];

const servicesList = [
  "General Check-up", "Teeth Whitening", "Dental Implants",
  "Invisalign", "Emergency Appointment", "Veneers",
  "Root Canal", "Children's Dentistry", "Other / Not sure",
];

const today = new Date().toLocaleDateString("en-GB", { weekday: "long" });

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", date: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success(t("contactPage.successTitle") + "! " + t("contactPage.successMsg"));
  };

  return (
    <div>
      <SEOHead
        title="Book an Appointment"
        description="Book a dental appointment at BrightSmile Clinic, 42 Harley Street London. Same-day emergency slots available. Call 020 7946 0321 or book online."
        canonical="/contact"
      />

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-primary to-[#0d4f6b] text-white section-padding">
        <div className="container-max text-center">
          <span className="inline-block bg-accent/20 border border-accent/40 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            {t("contactPage.heroBadge")}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t("contactPage.heroTitle")}</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">{t("contactPage.heroSubtitle")}</p>
        </div>
      </section>

      {/* ── EMERGENCY BANNER ── */}
      <div className="bg-red-600 text-white py-3 px-4">
        <div className="container-max flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <span className="font-semibold text-sm">{t("contactPage.emergency")}</span>
          <span className="text-red-200 text-sm hidden sm:inline">—</span>
          <span className="text-sm text-red-100">{t("contactPage.emergencyLine")}</span>
          <a href="tel:08001234567" className="font-bold text-white hover:text-red-200 transition-colors text-sm underline">
            0800 123 4567
          </a>
          <span className="text-red-200 text-xs">{t("contactPage.emergencyAvail")}</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <section className="section-padding bg-light">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* FORM */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-primary px-8 py-6">
                  <h2 className="text-white text-xl font-bold">{t("contactPage.formTitle")}</h2>
                  <p className="text-blue-100 text-sm mt-1">{t("contactPage.formSubtitle")}</p>
                </div>

                {submitted ? (
                  <div className="p-10 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
                    <h3 className="text-2xl font-bold text-dark mb-3">
                      {t("contactPage.successTitle")}, {form.name.split(" ")[0]}!
                    </h3>
                    <p className="text-gray-500 leading-relaxed mb-2">{t("contactPage.successMsg")}</p>
                    <p className="text-gray-400 text-sm mb-8">
                      {t("contactPage.confirmSent")} <span className="font-medium text-primary">{form.email}</span>
                    </p>
                    <div className="bg-light rounded-2xl p-6 text-left mb-6 max-w-sm mx-auto">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">{t("contactPage.yourRequest")}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">{t("contactPage.serviceSummary")}</span>
                          <span className="font-medium text-dark">{form.service}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">{t("contactPage.dateSummary")}</span>
                          <span className="font-medium text-dark">{form.date}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", date: "", message: "" }); }}
                      className="text-primary font-medium hover:underline text-sm"
                    >
                      {t("contactPage.submitAnother")}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("contactPage.name")} *</label>
                        <input name="name" value={form.name} onChange={handleChange} required placeholder="Jane Smith"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("contactPage.phone")}</label>
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="07700 000000"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("contactPage.email")} *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jane@example.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("contactPage.service")} *</label>
                        <select name="service" value={form.service} onChange={handleChange} required
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-white">
                          <option value="">{t("contactPage.selectService")}</option>
                          {servicesList.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("contactPage.date")} *</label>
                        <input name="date" type="date" value={form.date} onChange={handleChange} required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("contactPage.notes")}</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                        placeholder={t("contactPage.notesPlaceholder")}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
                    </div>

                    <button type="submit" disabled={loading}
                      className="w-full bg-primary text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm">
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t("contactPage.sending")}
                        </span>
                      ) : t("contactPage.submit")}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      {t("contactPage.preferCall")}{" "}
                      <a href="tel:02079460321" className="text-primary font-medium hover:underline">020 7946 0321</a>
                      {" "}— {t("contactPage.hours")}
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-dark mb-5">{t("contactPage.contactTitle")}</h3>
                <ul className="space-y-4">
                  {[
                    { icon: "📍", label: t("contactPage.address"), value: "42 Harley Street\nLondon, W1G 9PR" },
                    { icon: "📞", label: "Phone", value: "020 7946 0321", href: "tel:02079460321" },
                    { icon: "✉️", label: "Email", value: "hello@brightsmile.co.uk", href: "mailto:hello@brightsmile.co.uk" },
                  ].map((item) => (
                    <li key={item.label} className="flex gap-3">
                      <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-xs text-gray-400 font-medium mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-primary font-medium hover:underline">{item.value}</a>
                        ) : (
                          <p className="text-sm text-dark whitespace-pre-line">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-dark mb-5">{t("contactPage.hoursTitle")}</h3>
                <ul className="space-y-2">
                  {hours.map((h) => (
                    <li key={h.day}
                      className={"flex justify-between items-center py-2 border-b border-gray-50 last:border-0 " + (h.day === today ? "text-primary font-semibold" : "")}>
                      <span className="text-sm flex items-center gap-2">
                        {h.day === today && <span className="w-1.5 h-1.5 bg-accent rounded-full inline-block" />}
                        {h.day}
                      </span>
                      <span className={"text-sm " + (h.open ? "text-dark" : "text-red-400 font-medium")}>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-dark mb-4">{t("contactPage.gettingHere")}</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2"><span>🚇</span><span><strong className="text-dark">{t("contactPage.tube")}</strong> {t("contactPage.tubeDesc")}</span></li>
                  <li className="flex gap-2"><span>🚌</span><span><strong className="text-dark">{t("contactPage.bus")}</strong> {t("contactPage.busDesc")}</span></li>
                  <li className="flex gap-2"><span>🚗</span><span><strong className="text-dark">{t("contactPage.car")}</strong> {t("contactPage.carDesc")}</span></li>
                  <li className="flex gap-2"><span>♿</span><span><strong className="text-dark">{t("contactPage.access")}</strong> {t("contactPage.accessDesc")}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="bg-white">
        <div className="container-max px-4 md:px-8 lg:px-16 pb-16">
          <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <iframe
              title="BrightSmile Dental Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.3!2d-0.1476!3d51.5237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ad554c3db1f%3A0x2b0e0d2aef13dc99!2sHarley%20St%2C%20London!5e0!3m2!1sen!2suk!4v1699999999999!5m2!1sen!2suk"
              width="100%"
              height="400"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}