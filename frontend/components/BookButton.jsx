// frontend/components/BookButton.jsx
"use client";

import Link from "next/link";
import { useI18n } from "@/app/i18nProvider";
import { dictionaries } from "@/app/i18n";

const BookButton = ({ className = "" }) => {
  const { lang } = useI18n();
  const t = dictionaries[lang];

  return (
    <Link href="/login">
      <button className={`btn btn-lg btn-accent ${className}`}>
        {t.nav.bookNow}
      </button>
    </Link>
  );
};

export default BookButton;
