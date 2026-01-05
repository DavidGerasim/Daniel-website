"use client";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

// components
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial";
import Journey from "@/components/Journey";

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
      className="h-screen flex items-center"
    >
      <div className="container mx-auto px-0">
        <div className="flex flex-col xl:flex-row items-center gap-24 w-full h-[680px]">
          {/* Left side */}
          <div className="w-full h-[680px]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <p>About me</p>
              </div>
              <h2 className="h2 mb-6">
                <span className="text-accent">Daniel</span> Salem
              </h2>
              <p className="max-w-[540px] mb-12">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                voluptate veniam corporis harum iusto ratione quo asperiores
              </p>
              <div className="flex flex-col items-start gap-16">
                <Stats />
                <Testimonial />
              </div>
            </div>
          </div>
          {/* Right side - Scrool Area */}
          <ScrollArea className="w-full h-[680px]">
            <div>
              <div className="flex flex-col items-start gap-16">
                <Journey />
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </motion.section>
  );
};

export default About;