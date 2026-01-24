import { useEffect, useState } from "react";
import { Camera, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

const AdminProfile = ({ user }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user?.name || "Admin User");
      setEmail(user?.email || "admin@luxstay.com");
      setPhone(user?.phone || "");
      setAddress(user?.address || "");
      setCity(user?.city || "");
      setState(user?.state || "");
      setCountry(user?.country || "");
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name.trim()) return setMessage("❌ Name is required");
    if (!email.trim()) return setMessage("❌ Email is required");

    try {
      setLoading(true);

      // ✅ Replace this with API call (RTK Query mutation)
      // await updateProfile({ name, email, phone, address, city, state, country })

      setTimeout(() => {
        setMessage("✅ Profile updated successfully!");
        setLoading(false);
      }, 1000);
    } catch (err) {
      setLoading(false);
      setMessage("❌ Failed to update profile");
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-sm text-gray-500">
          Update your admin profile details here.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
        {/* Avatar */}
        <div className="relative">
          <div className="h-20 w-20 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={
                avatarPreview ||
                user?.avatar ||
                "https://ui-avatars.com/api/?name=Admin&background=dc2626&color=fff"
              }
              alt="avatar"
              className="h-full w-full object-cover"
            />
          </div>

          <label className="absolute -bottom-2 -right-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-xl p-2 shadow">
            <Camera className="w-4 h-4" />
            <input type="file" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900">
            {name || "Admin User"}
          </h2>

          <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            {user?.role || "Admin"} • {user?.status || "Active"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />{" "}
              {email || "Not added"}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />{" "}
              {phone || "Not added"}
            </p>
            <p className="flex items-center gap-2 sm:col-span-2">
              <MapPin className="w-4 h-4 text-gray-400" />{" "}
              {address ? `${address}, ${city}, ${state}, ${country}` : "Not added"}
            </p>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`rounded-xl px-4 py-3 text-sm font-medium border ${
            message.includes("✅")
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* Profile Form */}
      <form
        onSubmit={handleUpdateProfile}
        className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-4 max-w-3xl"
      >
        <h3 className="text-lg font-semibold text-gray-800">
          Profile Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Country</label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="India"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">State</label>
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Maharashtra"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Mumbai"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Enter address"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-fit px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
