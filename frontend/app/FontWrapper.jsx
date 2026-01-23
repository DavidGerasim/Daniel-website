// frontend/app/FontWrapper.jsx
"use client";

import { Sometype_Mono, Noto_Sans, Noto_Sans_Hebrew } from "next/font/google";
import { useI18n } from "./i18nProvider";

const latin = Sometype_Mono({ subsets: ["latin"] });
const ru = Noto_Sans({ subsets: ["cyrillic"] });
const he = Noto_Sans_Hebrew({ subsets: ["hebrew"] });

export default function FontWrapper({ children }) {
  const { lang } = useI18n();

  const fontClass =
    lang === "he"
      ? he.className
      : lang === "ru"
      ? ru.className
      : latin.className;

  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <div className={fontClass} dir={dir}>
      {children}
    </div>
  );
}
