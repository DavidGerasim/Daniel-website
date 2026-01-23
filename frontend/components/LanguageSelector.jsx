// frontend/components/LanguageSelector.jsx
"use client";

import { useI18n } from "@/app/i18nProvider";

const LanguageSelector = () => {
  const { lang, changeLanguage } = useI18n();

  return (
    <div className="w-full flex justify-center">
      <select
        value={lang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="
          bg-transparent
          border border-white/30
          text-white
          px-3 py-2
          rounded-md
          text-sm
          outline-none
          cursor-pointer
          hover:border-accent
          transition
        "
      >
        <option value="en" className="text-black">
          English
        </option>
        <option value="he" className="text-black">
          עברית
        </option>
        <option value="ru" className="text-black">
          Русский
        </option>
      </select>
    </div>
  );
};

export default LanguageSelector;
