// frontend/app/i18n/i18nProvider.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const I18nContext = createContext(null);

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    setLang(savedLang);
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  // ⛔ עדיין לא יודעים שפה → לא מרנדרים כלום
  if (!lang) return null;

  return (
    <I18nContext.Provider value={{ lang, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return context;
};
