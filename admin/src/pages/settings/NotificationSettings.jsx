import { useState } from "react";

const NotificationSettings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800">
        Notification Settings
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Email Notifications</span>
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
            className="h-5 w-5 text-red-600"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">SMS Notifications</span>
          <input
            type="checkbox"
            checked={smsNotif}
            onChange={() => setSmsNotif(!smsNotif)}
            className="h-5 w-5 text-red-600"
          />
        </div>

        <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
