"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";

import { useI18n } from "../i18nProvider";
import { dictionaries } from "../i18n";

import Image from "next/image";
import { MdOutlineArrowOutward } from "react-icons/md";

// Custom responsive container to avoid edge padding on small screens,
// but enable a centered, consistent look from md and up.
function ResponsiveContainer({ children, className = "" }) {
  return (
    <div
      className={
        // px-4 on small, auto max-w to center, more px on md+ for breathing room
        "w-full max-w-7xl mx-auto px-0 sm:px-4 md:px-8 " + className
      }
    >
      {children}
    </div>
  );
}

const Services = () => {
  const { lang } = useI18n();
  const t = dictionaries[lang];
  const services = t.services.list;
  const router = useRouter();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.4 } }}
      className="w-full flex flex-col items-center" // Section centered
    >
      {/* Header */}
      <ResponsiveContainer>
        <div className="flex flex-col items-center justify-center gap-6 pt-10 pb-8 text-center">
          <h2 className="h2 max-w-full sm:max-w-[520px] break-words">
            {t.services.title.normal}{" "}
            <span className="text-accent">{t.services.title.accent}</span>{" "}
            {t.services.title.rest}
          </h2>
        </div>
      </ResponsiveContainer>

      {/* Slider Wrapper */}
      <ResponsiveContainer className="pb-16">
        <Swiper
          key={lang}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          className="w-full max-w-full pb-14" // pb space for bullets
        >
          {services.map((service) => (
            <SwiperSlide key={service.id} className="flex justify-center">
              <div
                className={`
                  bg-secondary/90 rounded-xl flex flex-col shadow-md
                  px-5 py-7
                  min-h-[220px]
                  w-full max-w-xs
                  mx-auto
                  items-stretch
                  md:max-w-sm
                  lg:max-w-md
                  transition-all
                `}
              >
                {/* Icon + arrow */}
                <div className="flex items-center justify-between mb-5">
                  <Image
                    src={service.icon}
                    width={40}
                    height={40}
                    alt={service.title}
                  />
                  <div
                    onClick={() => router.push(`/login?service=${service.id}`)}
                    className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-xl hover:rotate-45 transition-all cursor-pointer"
                  >
                    <MdOutlineArrowOutward />
                  </div>
                </div>
                <h5
                  className="text-lg font-medium mb-2 break-words"
                  style={{
                    // Prevents title cut-off for long translations
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                  title={service.title}
                >
                  {service.title}
                </h5>
                <div className="overflow-y-auto max-h-36">
                  <p className="text-sm text-white/70 leading-relaxed break-words">
                    {service.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Swiper Pagination moves itself with 'pb-14' – no overlap */}
      </ResponsiveContainer>
    </motion.section>
  );
};

export default Services;