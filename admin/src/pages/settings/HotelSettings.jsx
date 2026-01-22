import { useState } from "react";

const HotelSettings = () => {
  const [defaultStatus, setDefaultStatus] = useState("active");
  const [autoApprove, setAutoApprove] = useState(true);
  const [featuredByDefault, setFeaturedByDefault] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800">Hotel Settings</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-5">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Default Hotel Status
          </label>
          <select
            value={defaultStatus}
            onChange={(e) => setDefaultStatus(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">
            Auto-approve new hotels
          </span>
          <input
            type="checkbox"
            checked={autoApprove}
            onChange={() => setAutoApprove(!autoApprove)}
            className="h-5 w-5 text-red-600"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">
            Mark new hotels as Featured
          </span>
          <input
            type="checkbox"
            checked={featuredByDefault}
            onChange={() => setFeaturedByDefault(!featuredByDefault)}
            className="h-5 w-5 text-red-600"
          />
        </div>

        <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
          Save Hotel Settings
        </button>
      </div>
    </div>
  );
};

export default HotelSettings;
