// frontend/app/services/page.jsx
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useI18n } from "../i18nProvider";
import { dictionaries } from "../i18n";

import Image from "next/image";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ScrollArea } from "@/components/ui/scroll-area";

const Services = () => {
  const { lang } = useI18n();
  const t = dictionaries[lang];
  const services = t.services.list;
  const router = useRouter();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.3, duration: 0.4 },
      }}
      className="min-h-screen py-10 md:py-16"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <h2 className="h2 max-w-[700px] leading-tight">
            {t.services.title.normal}{" "}
            <span className="text-accent">{t.services.title.accent}</span>{" "}
            {t.services.title.rest}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="
                bg-secondary/90
                rounded-[24px]
                p-5 md:p-7
                border border-white/10
                backdrop-blur-md
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-accent/40
                flex flex-col
                min-h-[320px]
                overflow-hidden
              "
            >
              {/* Top */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <Image
                  src={service.icon}
                  width={48}
                  height={48}
                  alt={service.title}
                  className="shrink-0"
                />

                <button
                  onClick={() => {
                    router.push(`/login?service=${service.id}`);
                  }}
                  className="
                    w-11 h-11
                    min-w-[44px]
                    rounded-full
                    bg-accent
                    flex items-center justify-center
                    text-black
                    text-xl
                    hover:rotate-45
                    transition-all
                  "
                >
                  <MdOutlineArrowOutward />
                </button>
              </div>

              {/* Title */}
              <h3
                className="
                  text-xl
                  md:text-2xl
                  font-semibold
                  mb-4
                  leading-snug
                  break-words
                  whitespace-normal
                "
              >
                {service.title}
              </h3>

              {/* Description */}
              <ScrollArea className="flex-1 pr-2">
                <p
                  className="
                    text-sm
                    md:text-base
                    text-white/70
                    leading-relaxed
                    break-words
                    whitespace-normal
                  "
                >
                  {service.description}
                </p>
              </ScrollArea>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
