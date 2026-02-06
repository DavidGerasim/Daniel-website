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
    <footer className="w-full border-t border-white/10 bg-secondary/30 backdrop-blur-sm py-6">
      <div className="px-8">
        <div className="flex flex-col items-center gap-4 text-sm text-white/80">
          <div className="text-center">
            © {currentYear} {t.businessName} – {t.rights}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="hover:text-accent transition">
              {t.privacy}
            </Link>

            <span>|</span>

            <Link href="/terms" className="hover:text-accent transition">
              {t.terms}
            </Link>

            <span>|</span>

            <Link
              href="/accessibility"
              className="hover:text-accent transition"
            >
              {t.accessibility}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
