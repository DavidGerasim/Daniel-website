// frontend/components/BookingCalendar.jsx
"use client";

import { useI18n } from "@/app/i18nProvider";
import { registerLocale } from "react-datepicker";
import enUS from "date-fns/locale/en-US";
import he from "date-fns/locale/he";
import ru from "date-fns/locale/ru";

registerLocale("en", enUS);
registerLocale("he", he);
registerLocale("ru", ru);

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingCalendar({
  date,
  setDate,
  disabled,
  fullyBookedDates = [],
}) {
  const { lang } = useI18n();
  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isAvailableDate = (d) => {
    const day = d.getDay();
    if (day === 5 || day === 6) return false;

    const iso = formatDate(d);
    return !fullyBookedDates.includes(iso);
  };

  return (
    <div className="calendar-dark">
      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        filterDate={isAvailableDate}
        minDate={new Date()}
        inline
        disabled={disabled}
        locale={lang}
      />
    </div>
  );
}
