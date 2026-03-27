import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, Mail, Phone, ShieldCheck, Save, Bell, Moon } from "lucide-react";
import toast from "react-hot-toast";
import { setUser } from "../../store/authSlice";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../redux/apiSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const { data: profile } = useGetProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [name, setName] = useState("");

  const user = profile || authUser;

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  if (!user) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      const response = await updateProfile({ name: name.trim() }).unwrap();
      const nextUser = response?.data || response?.user || { ...user, name: name.trim() };
      dispatch(setUser(nextUser));
      toast.success("Name updated successfully.");
    } catch (error) {
      toast.error(error?.data?.message || "Unable to update your name right now.");
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl">
          <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-300">Settings</div>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Account Preferences</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/65">
            Update only the details that are allowed from the frontend. Email and phone stay locked for account safety.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <form onSubmit={handleSubmit} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <User size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">Profile Settings</h2>
                <p className="text-sm text-slate-500">Change your display name. Email and phone are read-only.</p>
              </div>
            </div>

            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Display Name</label>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base font-medium text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Email Address</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-4 text-slate-500">
                  <Mail size={18} />
                  <span>{user.email || "Not provided"}</span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Phone Number</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-4 text-slate-500">
                  <Phone size={18} />
                  <span>{user.phone || "Not provided"}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:from-orange-600 hover:to-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={16} />
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <ShieldCheck size={18} className="text-orange-500" />
                <h3 className="text-lg font-black text-slate-900">Account Security</h3>
              </div>
              <p className="text-sm leading-6 text-slate-500">
                Email and phone updates are locked here to protect your account. If you need to change them, use a verified support flow later.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <Bell size={18} className="text-orange-500" />
                <h3 className="text-lg font-black text-slate-900">Notifications</h3>
              </div>
              <p className="text-sm leading-6 text-slate-500">
                Booking, payment, and offer alerts appear in your notifications page with a cleaner inbox-style view.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <Moon size={18} className="text-orange-500" />
                <h3 className="text-lg font-black text-slate-900">More settings</h3>
              </div>
              <p className="text-sm leading-6 text-slate-500">
                Theme and notification preference toggles can be added next if you want a fuller settings panel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
