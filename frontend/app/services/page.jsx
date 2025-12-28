"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ScrollArea } from "@/components/ui/scroll-area";

import { services } from "./services";

const Services = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.4 } }}
      className="h-screen flex items-center"
    >
      <div className="container mx-auto w-full flex flex-col gap-16">
        {/* header */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
          <h2 className="h2 max-w-[480px]">
            Personalized <span className="text-accent">Osteopathic Care</span>{" "}
            for Your Body
          </h2>
        </div>

        {/* slider */}
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="h-[320px]"
        >
          {services.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-secondary/90 w-full h-[284px] rounded-[20px] px-[30px] py-[40px] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-12">
                  <Image src={item.icon} width={48} height={48} alt="" />
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-2xl hover:rotate-45 transition-all">
                    <MdOutlineArrowOutward />
                  </div>
                </div>
                <ScrollArea className="max-h-[100px] overflow-y-auto">
                  <h5 className="text-[22px] font-medium">{item.title}</h5>
                </ScrollArea>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
};

export default Services;
