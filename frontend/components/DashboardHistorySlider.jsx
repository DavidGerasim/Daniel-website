"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function DashboardHistorySlider({ treatmentHistory, onDelete }) {
  const now = new Date();

  const isFuture = (t) => {
    const [hours, minutes] = t.time.split(":").map(Number);
    const treatmentDate = new Date(t.date);
    treatmentDate.setHours(hours);
    treatmentDate.setMinutes(minutes);
    treatmentDate.setSeconds(0);
    treatmentDate.setMilliseconds(0);

    return treatmentDate.getTime() > now.getTime();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.4 } }}
      className="w-full"
    >
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination]}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="pb-6"
      >
        {treatmentHistory
          .sort((a, b) => {
            const [hA, mA] = a.time.split(":").map(Number);
            const [hB, mB] = b.time.split(":").map(Number);
            const dateA = new Date(a.date);
            dateA.setHours(hA, mA, 0, 0);
            const dateB = new Date(b.date);
            dateB.setHours(hB, mB, 0, 0);
            return dateA - dateB;
          })
          .map((treatment, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={`relative w-full rounded-2xl p-4 flex flex-col gap-2
                  bg-gray-900/80
                  border ${
                    isFuture(treatment) ? "border-accent" : "border-gray-700"
                  }`}
              >
                {isFuture(treatment) && (
                  <button
                    onClick={() => onDelete(treatment)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
                    title="Cancel booking"
                  >
                    🗑️
                  </button>
                )}

                <h5 className="text-base font-semibold leading-tight">
                  {treatment.service}
                </h5>

                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    📅 {new Date(treatment.date).toLocaleDateString("he-IL")}
                  </span>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    🕒 {treatment.time}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </motion.div>
  );
}
