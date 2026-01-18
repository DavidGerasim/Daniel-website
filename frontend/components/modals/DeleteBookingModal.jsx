export default function DeleteBookingModal({ booking, onCancel, onConfirm }) {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-red-500 animate-fade-in">
        <h3 className="text-xl font-bold text-red-400 mb-4 text-center">
          Cancel Booking?
        </h3>

        <div className="bg-gray-800 rounded-xl p-4 mb-6 space-y-2">
          <p className="text-sm text-gray-300">
            <span className="font-semibold">Service:</span> {booking.service}
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-semibold">Date:</span>{" "}
            {new Date(booking.date).toLocaleDateString("he-IL")}
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-semibold">Time:</span> {booking.time}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-600 py-2 hover:bg-gray-800 transition"
          >
            Keep Booking
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500 text-black font-semibold py-2 hover:bg-red-400 transition"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
}
