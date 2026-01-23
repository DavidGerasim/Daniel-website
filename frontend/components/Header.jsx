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
              className="bg-primary border-0 flex flex-col items-center pt-16 pb-20"
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
              <div className="flex-1 flex items-center">
                <NavLinks containerStyles="flex flex-col gap-16 max-w-[100px]" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
