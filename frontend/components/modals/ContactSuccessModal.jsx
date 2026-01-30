// frontend/components/modals/ContactSuccessModal.jsx
import { useI18n } from "@/app/i18nProvider";
import { dictionaries } from "@/app/i18n";

export default function ContactSuccessModal({ open, onClose }) {
  const { lang } = useI18n();
  const t = dictionaries[lang];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 border border-accent rounded-2xl p-8 text-center animate-fade-in">
        <h3 className="text-2xl font-bold text-accent mb-2">
          ✅ {t.contact.successModal.title}
        </h3>
        <p className="text-gray-300">{t.contact.successModal.message}</p>
      </div>
    </div>
  );
}
