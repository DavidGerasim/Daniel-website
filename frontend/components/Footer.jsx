// frontend/components/Footer.jsx
"use client";

import Link from "next/link";
import { useI18n } from "@/app/i18nProvider";
import { dictionaries } from "@/app/i18n";

const Footer = () => {
  const { lang } = useI18n();
  const t = dictionaries[lang].footer;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-secondary/30 backdrop-blur-sm py-4">
      <div className="px-6">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/80">
          <span>
            © {currentYear} {t.businessName} – {t.rights}
          </span>

          <span className="hidden sm:inline">|</span>

          <Link href="/privacy" className="hover:text-accent transition">
            {t.privacy}
          </Link>

          <span className="hidden sm:inline">|</span>

          <Link href="/terms" className="hover:text-accent transition">
            {t.terms}
          </Link>

          <span className="hidden sm:inline">|</span>

          <Link href="/accessibility" className="hover:text-accent transition">
            {t.accessibility}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
