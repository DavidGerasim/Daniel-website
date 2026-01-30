// frontend/components/Header.jsx
import Logo from "./Logo";
import { CiMenuFries } from "react-icons/ci";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LanguageSelector from "./LanguageSelector";

import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <header className="2xl:hidden z-40">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-6">
          {/* logo */}
          <Logo />
          {/* nav mobile - (Sheet component) */}
          <Sheet>
            <SheetTrigger className="cursor-pointer text-[30px] text-white">
              <CiMenuFries />
            </SheetTrigger>
            <SheetContent
              className="bg-primary border-0 flex flex-col h-full pt-16 pb-20 items-center"
              side="right"
            >
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu
                </SheetDescription>
              </SheetHeader>

              {/* Nav Links */}
              <div className="flex flex-col flex-1 items-center justify-center gap-16 w-full">
                <NavLinks containerStyles="flex flex-col gap-6 items-center w-full" />
              </div>

              {/* Language Selector */}
              <div className="mt-auto w-full flex justify-center">
                <LanguageSelector />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
