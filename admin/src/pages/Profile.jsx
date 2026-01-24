import { useState, useRef } from "react";
import toast from "react-hot-toast";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);





  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (!currentPassword.trim()) {
      toast.error("Enter current password");
      return;
    }

    if (!newPassword.trim()) {
      toast.error("Enter new password");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4">
      <div className="max-w-lg w-full space-y-8 bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl border p-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            <span className="text-red-600">LUX</span>STAY
          </h1>
          <p className="mt-2 text-sm text-gray-600">Edit Admin Profile</p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <input type="file"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-lg"
              />
                 </div>
                 <span>click for upload new image </span>
          </div>

          <form className="space-y-6" >
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-4 border rounded-2xl"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 border rounded-2xl"
              />
            </div>

            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              Update Profile
            </button>
          </form>
        </div>

        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-xl font-semibold text-gray-800">
            Change Password
          </h2>

          <form className="space-y-6" onSubmit={handlePasswordSubmit}>
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-4 border rounded-2xl"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute inset-y-0 right-3 text-sm text-blue-600"
                >
                  {showCurrent ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-4 border rounded-2xl"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 right-3 text-sm text-blue-600"
                >
                  {showNew ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-4 border rounded-2xl"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-3 text-sm text-blue-600"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-600 to-teal-600 text-white">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
