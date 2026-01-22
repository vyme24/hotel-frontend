import { useState } from "react";

const PoliciesSettings = () => {
  const [checkIn, setCheckIn] = useState("12:00 PM");
  const [checkOut, setCheckOut] = useState("11:00 AM");
  const [cancellation, setCancellation] = useState(
    "Free cancellation within 24 hours."
  );

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800">Policies Settings</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Check-in Time
          </label>
          <input
            type="text"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Check-out Time
          </label>
          <input
            type="text"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Cancellation Policy
          </label>
          <textarea
            value={cancellation}
            onChange={(e) => setCancellation(e.target.value)}
            rows="4"
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
          Save Policies
        </button>
      </div>
    </div>
  );
};

export default PoliciesSettings;
