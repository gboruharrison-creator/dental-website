import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({ onBooking }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const links = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.services"), to: "/services" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.blog"), to: "/blog" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={
        "sticky top-0 z-50 w-full transition-all duration-300 " +
        (scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm")
      }
    >
      <div className="container-max flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">

        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🦷</span>
          </div>
          <div>
            <span className="text-primary font-bold text-lg leading-none block">BrightSmile</span>
            <span className="text-xs text-gray-400 leading-none">Dental Clinic</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={
                "text-sm font-medium transition-colors duration-200 hover:text-primary " +
                (pathname === link.to
                  ? "text-primary border-b-2 border-primary pb-0.5"
                  : "text-dark")
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="tel:02079460321"
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            {t("nav.phone")}
          </a>
          <button onClick={onBooking} className="btn-primary text-sm py-2 px-5">
            {t("nav.book")}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={
                "block w-6 h-0.5 bg-dark transition-all duration-300 " +
                (menuOpen ? "rotate-45 translate-y-2" : "")
              }
            />
            <span
              className={
                "block w-6 h-0.5 bg-dark transition-all duration-300 " +
                (menuOpen ? "opacity-0" : "")
              }
            />
            <span
              className={
                "block w-6 h-0.5 bg-dark transition-all duration-300 " +
                (menuOpen ? "-rotate-45 -translate-y-2" : "")
              }
            />
          </button>
        </div>
      </div>

      <div
        className={
          "md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100 " +
          (menuOpen ? "max-h-96" : "max-h-0")
        }
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={
                "text-sm font-medium py-1 transition-colors hover:text-primary " +
                (pathname === link.to ? "text-primary" : "text-dark")
              }
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { onBooking(); setMenuOpen(false); }}
            className="btn-primary text-sm py-2.5 text-center mt-2"
          >
            {t("nav.book")}
          </button>
        </nav>
      </div>
    </header>
  );
}