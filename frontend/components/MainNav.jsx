// frontend/components/MainNav.jsx
import React from "react";
import Navlinks from "./NavLinks";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";

const MainNav = () => {
  return (
    <nav className="w-full pt-16 h-screen">
      <div className="relative h-full flex flex-col items-center">
        <Logo />

        {/* center nav links */}
        <div className="absolute top-1/2 -translate-y-1/2">
          <Navlinks containerStyles="flex flex-col gap-16" />
        </div>

        {/* language selector */}
        <div className="absolute bottom-8">
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
