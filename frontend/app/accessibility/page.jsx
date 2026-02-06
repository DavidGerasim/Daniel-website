// frontend/app/accessibility/page.jsx
"use client";

import { motion } from "framer-motion";
import { useI18n } from "../i18nProvider";
import { dictionaries } from "../i18n";

export default function AccessibilityPage() {
  const { lang } = useI18n();
  const t = dictionaries[lang].accessibility;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.4 } }}
      className="min-h-screen py-12"
    >
      <div className="container mx-auto px-4 max-w-[900px]">
        <h1 className="h2 mb-6 text-accent">{t.title}</h1>

        <p className="mb-4 text-white/80">{t.intro}</p>

        <p className="mb-8 text-white/80">{t.aboutSite}</p>

        <h2 className="text-xl font-semibold mb-4">{t.featuresTitle}</h2>

        <ul className="list-disc pl-6 mb-8 text-white/80 space-y-2">
          {t.features.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-4">{t.limitationsTitle}</h2>

        <p className="mb-8 text-white/80">{t.limitations}</p>

        <h2 className="text-xl font-semibold mb-4">{t.contactTitle}</h2>

        <p className="mb-4 text-white/80">{t.contactText}</p>

        <div className="bg-secondary/40 p-6 rounded-xl text-white/80 space-y-2">
          <p>
            <strong>{t.phone}:</strong> {t.phoneValue}
          </p>
          <p>
            <strong>{t.email}:</strong> {t.emailValue}
          </p>
          <p>
            <strong>{t.address}:</strong> {t.addressValue}
          </p>
        </div>

        <p className="mt-8 text-sm text-white/60">{t.updated}</p>
      </div>
    </motion.section>
  );
}
