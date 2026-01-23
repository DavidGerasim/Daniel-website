// frontend/app/page.jsx
"use client";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

// components
import Blob from "@/components/Blob";
import Image from "next/image";
import avatarImg from "@/public/assets/avatar.png";
import Socials from "@/components/Socials";
import Pattern from "@/components/Pattern";

const Home = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
    >
      <div className="h-screen flex items-center">
        {/* pattern */}
        <Pattern />
        <div className="flex flex-col xl:flex-row items-center justify-between w-full">
          {/* text */}
          <div className="w-full xl:w-[550px] flex flex-col items-center xl:items-start text-center xl:text-left">
            <h1 className="h1 mb-[28px] flex flex-wrap items-center gap-x-2">
              <span>Hello! I'm Daniel,</span>

              <span className="relative inline-block min-w-[170px] text-accent">
                <TypeAnimation
                  sequence={["Professional", 2000, "Osteopath", 2000]}
                  speed={40}
                  wrapper="span"
                  repeat={Infinity}
                />
              </span>
            </h1>

            <p className="max-w-[500px] mb-[44px]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. harum
              maiores? voluptas veniam itaque dolorem repudiandae natus sapiente
              facilis maiores! Dolor?
            </p>
            <Link href="/login">
              <button className="btn btn-lg btn-accent mb-16">
                <div>
                  <span>Book Now</span>
                </div>
              </button>
            </Link>
            {/* socials */}
            <Socials
              containerStyles="flex 2xl:flex-col gap-6 xl:hidden 2xl:flex 2xl:absolute 2xl:top-1/2 2xl:right-2 2xl:transform 2xl:-translate-x-1/2 2xl:-translate-y-1/2"
              iconStyles="bg-accent text-white hover:bg-accent-hover transition w-[48px] h-[48px] text-[22px] flex items-center justify-center rounded-full cursor-pointer"
            />
          </div>

          {/* blob & image */}
          <div className="hidden xl:block flex-1 relative z-20">
            {/* blob */}
            <Blob containerStyles="w-[560px] h-[560px]" />
            {/* avartar img*/}
            <Image
              src={avatarImg}
              alt=""
              width={440}
              height={600}
              quality={100}
              className="absolute -top-16 left-[120px]"
            />
            {/* overlay gradient */}
            <div className="w-full h-[164px] absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary via-primary/90 to-primary/40"></div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Home;
