import React from "react";
import Navlinks from "./NavLinks";
import Logo from "./Logo";

const MainNav = () => {
  return (
    <nav className="w-full pt-16 h-screen">
      <div className="relative h-full flex flex-col items-center">
        <Logo />
        <div className="absolute top-1/2 -translate-y-1/2">
          <Navlinks containerStyles="flex flex-col gap-16" />
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
