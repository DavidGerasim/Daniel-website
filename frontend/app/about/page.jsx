// frontend/app/about/page.jsx
"use client";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useI18n } from "../i18nProvider";
import { dictionaries } from "../i18n";

// components
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial";
import Journey from "@/components/Journey";

const About = () => {
  const { lang } = useI18n();
  const t = dictionaries[lang];
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
                <p>{t.about.title}</p>
              </div>
              <h2 className="h2 mb-6">
                <span className="text-accent">{t.about.name.first}</span>{" "}
                {t.about.name.last}
              </h2>
              <p className="max-w-[540px] mb-12">{t.about.description}</p>
              <div className="flex flex-col items-start gap-16">
                <Stats stats={t.about.stats} />
                <Testimonial testimonials={t.about.testimonials} />
              </div>
            </div>
          </div>
          {/* Right side - Scrool Area */}
          <ScrollArea className="w-full h-[680px]">
            <div>
              <div className="flex flex-col items-start gap-16">
                <Journey
                  journey={t.about.journey}
                  title={t.about.journeyTitle}
                />
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
