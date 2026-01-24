import { Link } from "react-router-dom";
import {
  CalendarCheck2,
  Hotel,
  BedDouble,
  Users,
  UserCog,
  Star,
  Wallet,
  Megaphone,
  BarChart3,
  Settings,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import { useGetMatrixQuery } from "../services/dashboardService";

/* -------------------- Helpers -------------------- */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

const normalizeMonthlyData = (arr, key) => {
  // ensures all months exist
  const map = new Map(MONTHS.map((m) => [m, 0]));

  safeArray(arr).forEach((x) => {
    if (x?.month && map.has(x.month)) {
      map.set(x.month, Number(x[key] || 0));
    }
  });

  return MONTHS.map((m) => ({ month: m, [key]: map.get(m) }));
};

/* -------------------- UI Components -------------------- */
const StatCard = ({ title, count, description, link, icon: Icon, gradient }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`h-11 w-11 rounded-xl flex items-center justify-center text-white shadow-sm ${gradient}`}
            >
              <Icon className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {title}
              </p>
              <p className="text-xs text-gray-500 truncate">{description}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl font-extrabold text-gray-900 leading-none">
              {count ?? 0}
            </p>
            <p className="text-[11px] text-gray-500 mt-1">Total</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Link
            to={link}
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:text-red-800 transition"
          >
            View Details
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <div className="text-[11px] text-gray-500 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            Live
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  /* -------------------- API Call -------------------- */
  const { data: matrixData, isLoading: matrixLoading } = useGetMatrixQuery();

  const stats = matrixData || matrixData?.data || {};
  const api = matrixData?.data || matrixData || {};

  // Your response looks like: matrixData.data = { booking:{total}, ... }
  const totalBookings = api?.booking?.total || 0;
  const totalHotels = api?.hotel?.total || 0;
  const totalRooms = api?.room?.total || 0;
  const totalGuests = api?.guest?.total || 0;
  const totalStaff = api?.user?.total || 0;
  const totalReviews = api?.review?.total || 0;
  const totalPayments = api?.payment?.total || 0;
  const totalCoupons = api?.coupon?.total || 0;

  /* -------------------- Chart Data (Real API Only) -------------------- */
  const revenueChartData = normalizeMonthlyData(api?.RevenueOverview, "revenue");
  const bookingsChartData = normalizeMonthlyData(api?.BookingsOverview, "bookings");

  /* -------------------- Recent Bookings -------------------- */
  const recentBookings = safeArray(api?.RecentBookings).slice(0, 8);

  /* -------------------- Cards Config -------------------- */
  const dashboardItems = [
    {
      title: "Booking Management",
      icon: CalendarCheck2,
      count: totalBookings,
      description: "Total bookings made",
      link: "/bookings",
      gradient: "bg-gradient-to-r from-red-800 to-red-600",
    },
    {
      title: "Hotel Management",
      icon: Hotel,
      count: totalHotels,
      description: "Hotels available",
      link: "/hotels",
      gradient: "bg-gradient-to-r from-emerald-600 to-emerald-500",
    },
    {
      title: "Room Management",
      icon: BedDouble,
      count: totalRooms,
      description: "Rooms managed",
      link: "/rooms",
      gradient: "bg-gradient-to-r from-amber-500 to-orange-500",
    },
    {
      title: "Guests / Customers",
      icon: Users,
      count: totalGuests,
      description: "Registered guests",
      link: "/guests",
      gradient: "bg-gradient-to-r from-indigo-600 to-violet-500",
    },
    {
      title: "Staff & Roles",
      icon: UserCog,
      count: totalStaff,
      description: "Staff roles defined",
      link: "/staff",
      gradient: "bg-gradient-to-r from-pink-600 to-rose-500",
    },
    {
      title: "Reviews & Ratings",
      icon: Star,
      count: totalReviews,
      description: "Reviews received",
      link: "/reviews",
      gradient: "bg-gradient-to-r from-blue-600 to-cyan-500",
    },
    {
      title: "Finance & Payments",
      icon: Wallet,
      count: totalPayments,
      description: "Payments processed",
      link: "/payments",
      gradient: "bg-gradient-to-r from-teal-600 to-emerald-500",
    },
    {
      title: "Marketing",
      icon: Megaphone,
      count: totalCoupons,
      description: "Coupons & campaigns",
      link: "/coupons",
      gradient: "bg-gradient-to-r from-orange-600 to-amber-500",
    },
    {
      title: "Reports",
      icon: BarChart3,
      count: totalBookings,
      description: "Reports generated",
      link: "/reports/bookings",
      gradient: "bg-gradient-to-r from-fuchsia-600 to-pink-500",
    },
    {
      title: "Settings",
      icon: Settings,
      count: "—",
      description: "System settings",
      link: "/settings/general",
      gradient: "bg-gradient-to-r from-gray-700 to-gray-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-extrabold text-gray-900">
              Dashboard Overview
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Track bookings, revenue and activity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/bookings/new"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-800 to-red-600 text-white text-sm font-semibold shadow-sm hover:opacity-95 transition"
            >
              + New Booking
            </Link>

            <Link
              to="/reports/bookings"
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm font-semibold hover:bg-gray-50 transition"
            >
              View Reports
            </Link>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {matrixLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 animate-pulse"
              >
                <div className="h-4 w-32 bg-gray-200 rounded-md" />
                <div className="h-8 w-20 bg-gray-100 rounded-md mt-3" />
              </div>
            ))
          : dashboardItems.map((item, index) => (
              <StatCard key={index} {...item} />
            ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Revenue Overview
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Monthly revenue from payments
              </p>
            </div>

            <Link
              to="/payments"
              className="text-sm font-semibold text-red-700 hover:text-red-800 transition"
            >
              View Payments
            </Link>
          </div>

          <div className="mt-4 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings Chart */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Bookings Overview
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Monthly bookings count
              </p>
            </div>

            <Link
              to="/bookings"
              className="text-sm font-semibold text-red-700 hover:text-red-800 transition"
            >
              View Bookings
            </Link>
          </div>

          <div className="mt-4 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">Recent Bookings</h3>
            <p className="text-xs text-gray-500 mt-1">
              Latest booking activity in your system
            </p>
          </div>

          <Link
            to="/bookings"
            className="text-sm font-semibold text-red-700 hover:text-red-800 transition"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Booking ID</th>
                <th className="text-left px-5 py-3 font-semibold">Guests</th>
                <th className="text-left px-5 py-3 font-semibold">Payment</th>
                <th className="text-left px-5 py-3 font-semibold">Status</th>
                <th className="text-left px-5 py-3 font-semibold">Check In</th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.length > 0 ? (
                recentBookings.map((b) => (
                  <tr
                    key={b?._id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-5 py-4 font-semibold text-gray-900">
                      {b?.bookingId || "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-700">
                      {b?.guests?.adults ?? 0} Adults, {b?.guests?.children ?? 0}{" "}
                      Kids
                    </td>

                    <td className="px-5 py-4 text-gray-700">
                      {b?.paymentStatus || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {b?.bookingStatus || "—"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {b?.checkInDate
                        ? new Date(b.checkInDate).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-gray-500">
                    No recent bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-500 text-center pt-2">
        © {new Date().getFullYear()} LUXSTAY Admin Panel
      </p>
    </div>
  );
};

export default Dashboard;
