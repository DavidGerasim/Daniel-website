export default function BookingSuccessModal({ show }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 border border-accent rounded-2xl p-8 text-center animate-fade-in">
        <h3 className="text-2xl font-bold text-accent mb-2">
          ✅ Booking Successful
        </h3>
        <p className="text-gray-300">
          Your appointment has been booked successfully.
        </p>
      </div>
    </div>
  );
}
