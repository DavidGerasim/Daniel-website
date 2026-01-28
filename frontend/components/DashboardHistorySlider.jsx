// frontend/components/DashboardHistorySlider.jsx
"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useI18n } from "@/app/i18nProvider";
import { dictionaries } from "@/app/i18n";

import "swiper/css";
import "swiper/css/pagination";

export default function DashboardHistorySlider({ treatmentHistory, onDelete }) {
  const { lang } = useI18n();
  const t = dictionaries[lang];

  const now = new Date();

  const translateService = (serviceId) => {
    const translated = t.services.list.find((s) => s.id === serviceId);
    return translated ? translated.title : "Service not found";
  };

  const isFuture = (t) => {
    const [hours, minutes] = t.time.split(":").map(Number);
    const treatmentDate = new Date(t.date);
    treatmentDate.setHours(hours);
    treatmentDate.setMinutes(minutes);
    treatmentDate.setSeconds(0);
    treatmentDate.setMilliseconds(0);

    return treatmentDate.getTime() > now.getTime();
  };

  // פונקציה שעושה Date מלא מתור
  const getDateTime = (t) => {
    const [h, m] = t.time.split(":").map(Number);
    const d = new Date(t.date);
    d.setHours(h, m, 0, 0);
    return d;
  };

  // כל התורים העתידיים
  const futureBookings = treatmentHistory
    .filter((t) => getDateTime(t) > now)
    .sort((a, b) => getDateTime(a) - getDateTime(b));

  // כל התורים שעברו
  const pastBookings = treatmentHistory.filter((t) => getDateTime(t) <= now);

  // התור האחרון שעבר (רק אחד!)
  const lastPastBooking = pastBookings.sort(
    (a, b) => getDateTime(b) - getDateTime(a),
  )[0];

  // הרשימה הסופית להצגה
  const bookingsToShow = lastPastBooking
    ? [lastPastBooking, ...futureBookings]
    : futureBookings;

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
        {bookingsToShow.map((treatment, idx) => (
          <SwiperSlide key={idx}>
            <div
              className={`relative w-full rounded-2xl p-4 flex flex-col gap-2
        bg-gray-900/80
        border ${isFuture(treatment) ? "border-accent" : "border-gray-700"}`}
            >
              {isFuture(treatment) && (
                <button
                  onClick={() => onDelete(treatment)}
                  className="absolute top-2 right-2 rtl:right-auto rtl:left-2 text-gray-400 hover:text-red-500 transition"
                  title="Cancel booking"
                >
                  🗑️
                </button>
              )}

              <h5 className="text-base font-semibold leading-tight">
                {translateService(treatment.serviceId)}
              </h5>

              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  📅{" "}
                  {new Date(treatment.date).toLocaleDateString(
                    lang === "he" ? "he-IL" : "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    },
                  )}
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
