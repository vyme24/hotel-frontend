import { useState } from "react";

const GeneralSettings = () => {
  const [siteName, setSiteName] = useState("LUXSTAY");
  const [supportEmail, setSupportEmail] = useState("support@luxstay.com");

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800">General Settings</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Site Name
          </label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Support Email
          </label>
          <input
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default GeneralSettings;
