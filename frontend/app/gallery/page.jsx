// frontend/app/gallery/page.jsx
"use client";
import { motion } from "framer-motion";
import { useI18n } from "../i18nProvider";
import { dictionaries } from "../i18n";

const Gallery = () => {
  const { lang } = useI18n();
  const t = dictionaries[lang];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
      className="h-screen flex items-center justify-center text-center"
    >
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl md:text-6xl font-semibold">
          <span className="text-accent">{t.gallery.title.accent}</span>{" "}
          {t.gallery.title.rest}
        </h1>

        <p className="text-lg text-muted-foreground max-w-md">
          {t.gallery.description}
        </p>
      </div>
    </motion.section>
  );
};

export default Gallery;
