// frontend/components/NavLinks.jsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/app/i18nProvider";
import { dictionaries } from "@/app/i18n/index";
import BookButton from "./BookButton";

const NavLinks = ({ containerStyles }) => {
  const pathname = usePathname();
  const { lang } = useI18n();
  const t = dictionaries[lang];

  console.log("lang:", lang);
  console.log("dictionaries:", dictionaries);
  console.log("t:", t);
  console.log("t.nav:", t?.nav);

  const links = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.about, path: "/about" },
    { name: t.nav.services, path: "/services" },
    { name: t.nav.gallery, path: "/gallery" },
    { name: t.nav.contact, path: "/contact" },
  ];

  return (
    <ul className={containerStyles}>
      {links.map((link, index) => {
        const isActive = pathname === link.path;
        const charLength = link.name.length;
        const lineWidth = charLength > 5 ? "after:w-[120%]" : "after:w-[90%]";

        return (
          <li key={index}>
            <Link
              href={link.path}
              className={`relative text-lg uppercase text-white ${
                isActive &&
                `after:content-[''] after:block after:absolute after:left-0 after:top-1/2 ${lineWidth} after:h-[4px] after:bg-accent after:-translate-y-1/2 after:z-0`
              }`}
            >
              <span className="relative z-10">{link.name}</span>
            </Link>
          </li>
        );
      })}

      <li>
        <BookButton className="mt-4" />
      </li>
    </ul>
  );
};

export default NavLinks;
