// frontend/components/modals/DeleteBookingModal.jsx
import { useI18n } from "@/app/i18nProvider";
import { dictionaries } from "@/app/i18n";

export default function DeleteBookingModal({ booking, onCancel, onConfirm }) {
  const { lang } = useI18n();
  const t = dictionaries[lang];
  if (!booking) return null;

  // פונקציה לתרגום שירות לפי id
  const translateService = (serviceName) => {
    // מוצא את השירות לפי השם באנגלית
    const serviceObj = dictionaries["en"].services.list.find(
      (s) => s.title === serviceName
    );
    if (!serviceObj) return serviceName; // fallback אם לא נמצא
    // מחזיר את השם לפי השפה הנוכחית
    const translated = t.services.list.find((s) => s.id === serviceObj.id);
    return translated ? translated.title : serviceName;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-red-500 animate-fade-in">
        <h3 className="text-xl font-bold text-red-400 mb-4 text-center">
          {t.dashboard.deleteModal.title}
        </h3>

        <div className="bg-gray-800 rounded-xl p-4 mb-6 space-y-2">
          <p className="text-sm text-gray-300">
            <span className="font-semibold">
              {t.dashboard.deleteModal.service}:
            </span>{" "}
            {translateService(booking.service)}
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-semibold">
              {t.dashboard.deleteModal.date}:
            </span>{" "}
            {new Date(booking.date).toLocaleDateString("he-IL")}
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-semibold">
              {t.dashboard.deleteModal.time}:
            </span>{" "}
            {booking.time}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-600 py-2 hover:bg-gray-800 transition"
          >
            {t.dashboard.deleteModal.keep}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500 text-black font-semibold py-2 hover:bg-red-400 transition"
          >
            {t.dashboard.deleteModal.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
