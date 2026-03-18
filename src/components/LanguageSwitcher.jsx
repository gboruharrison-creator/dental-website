import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-primary transition-colors text-sm font-medium text-dark bg-white"
      >
        <span style={{ fontSize: "16px" }}>{current.flag}</span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
        <span
          className="text-gray-400 text-xs transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden"
          style={{ zIndex: 100, minWidth: "140px" }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => select(lang.code)}
              className={
                "flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-light " +
                (lang.code === i18n.language ? "bg-card text-primary font-semibold" : "text-dark")
              }
            >
              <span style={{ fontSize: "16px" }}>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}