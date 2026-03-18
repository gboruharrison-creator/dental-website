import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DeveloperCard from "./DeveloperCard";

const services = ["General Dentistry", "Teeth Whitening", "Dental Implants", "Invisalign", "Emergency Dentistry", "Veneers"];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🦷</span>
              </div>
              <div>
                <span className="font-bold text-lg leading-none block">BrightSmile</span>
                <span className="text-xs text-gray-400">Dental Clinic</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{t("footer.tagline")}</p>
            <div className="flex gap-3 mt-4">
              {["F", "I", "X"].map((s) => (
                <a key={s} href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center text-xs">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">{t("footer.services")}</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-gray-400 hover:text-accent text-sm transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              {[
                { label: t("footer.about"), to: "/about" },
                { label: t("footer.blog"), to: "/blog" },
                { label: t("footer.contactLink"), to: "/contact" },
                { label: t("footer.bookAppointment"), to: "/contact" },
                { label: t("footer.patientReviews"), to: "/about" },
                { label: t("footer.emergency"), to: "/services" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-gray-400 hover:text-accent text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2"><span>📍</span><span>42 Harley Street, London W1G 9PR</span></li>
              <li className="flex gap-2"><span>📞</span><a href="tel:02079460321" className="hover:text-accent transition-colors">020 7946 0321</a></li>
              <li className="flex gap-2"><span>✉️</span><a href="mailto:hello@brightsmile.co.uk" className="hover:text-accent transition-colors">hello@brightsmile.co.uk</a></li>
              <li className="flex gap-2"><span>🕐</span><span>Mon–Fri: 8am–7pm<br />Sat: 9am–5pm</span></li>
            </ul>
            <div className="mt-4 p-3 bg-red-900/40 border border-red-700/50 rounded-lg">
              <p className="text-red-300 text-xs font-semibold">{t("footer.emergencyTitle")}</p>
              <a href="tel:08001234567" className="text-white font-bold hover:text-accent transition-colors">0800 123 4567</a>
              <p className="text-gray-400 text-xs">{t("footer.emergencyAvail")}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">{t("footer.copyright")}</p>
          <DeveloperCard />
          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-gray-300">{t("footer.terms")}</a>
            <a href="#" className="hover:text-gray-300">{t("footer.cookies")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}