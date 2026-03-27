import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Settings,
  Bell,
  ChevronRight,
  CreditCard,
} from "lucide-react";
import { useGetProfileQuery, useGetUserBookingsQuery } from "../../redux/apiSlice";

export default function Profile() {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);
  const { data: profile, isLoading } = useGetProfileQuery();
  const { data: bookings = [] } = useGetUserBookingsQuery();

  const user = profile || authUser;

  if (isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-12 w-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const quickLinks = [
    {
      icon: Settings,
      title: "Settings",
      description: "Change your display name and account preferences",
      path: "/settings",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "See booking, payment, and offer updates",
      path: "/notifications",
    },
    {
      icon: CreditCard,
      title: "Cart & Payments",
      description: "Review your selected stays and complete checkout",
      path: "/cart",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="rounded-[28px] bg-slate-950 p-8 text-white shadow-2xl">
            <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-white/10 text-3xl font-black">
              {(user.name || "G").charAt(0).toUpperCase()}
            </div>
            <h1 className="mt-6 text-3xl font-black tracking-tight">{user.name || "Guest User"}</h1>
            <p className="mt-2 text-sm text-white/65">Manage your account, bookings, and checkout preferences.</p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Bookings</div>
                <div className="mt-2 text-2xl font-bold">{bookings.length}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Status</div>
                <div className="mt-2 text-base font-semibold">Verified</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-500">Account</div>
                <h2 className="mt-2 text-2xl font-black text-slate-900">Profile Overview</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    <User size={14} /> Full Name
                  </div>
                  <div className="mt-3 text-lg font-bold text-slate-900">{user.name || "Not set"}</div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    <Mail size={14} /> Email
                  </div>
                  <div className="mt-3 text-lg font-bold text-slate-900">{user.email || "Not provided"}</div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    <Phone size={14} /> Phone
                  </div>
                  <div className="mt-3 text-lg font-bold text-slate-900">{user.phone || "Not provided"}</div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    <Calendar size={14} /> Member Since
                  </div>
                  <div className="mt-3 text-lg font-bold text-slate-900">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "Recently joined"}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <Shield size={18} className="text-orange-500" />
                <h3 className="text-xl font-black text-slate-900">Quick Access</h3>
              </div>

              <div className="grid gap-4">
                {quickLinks.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5 text-left transition hover:border-orange-300 hover:bg-orange-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <div className="text-base font-bold text-slate-900">{item.title}</div>
                        <div className="mt-1 text-sm text-slate-500">{item.description}</div>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
