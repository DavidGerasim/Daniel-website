"use client";

import { BiLogoFacebook, BiLogoInstagram } from "react-icons/bi";
import { useI18n } from "@/app/i18nProvider";

const socials = [
  {
    icon: <BiLogoFacebook />,
    path: "",
  },
  {
    icon: <BiLogoInstagram />,
    path: "",
  },
];

const Socials = ({ iconStyles }) => {
  const { lang } = useI18n();

  const positionClass =
    lang === "he" ? "2xl:left-2 2xl:right-auto" : "2xl:right-2 2xl:left-auto";

  return (
    <div
      className={`flex 2xl:flex-col gap-6 xl:hidden 2xl:flex 
      2xl:absolute 2xl:top-1/2 2xl:-translate-y-1/2
      ${positionClass}`}
    >
      {socials.map((item, index) => (
        <div key={index} className={iconStyles}>
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default Socials;
