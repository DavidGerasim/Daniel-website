// frontend/app/privacy/page.jsx
"use client";
import { motion } from "framer-motion";
import { useI18n } from "../i18nProvider";
import { dictionaries } from "../i18n";

const Privacy = () => {
  const { lang } = useI18n();
  const t = dictionaries[lang].privacy;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, duration: 0.4 },
      }}
      className="py-12"
    >
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="h2 mb-6 text-accent">{t.title}</h1>

        {t.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>

            {section.paragraphs.map((p, i) => (
              <p key={i} className="mb-2 text-white/80">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Privacy;
