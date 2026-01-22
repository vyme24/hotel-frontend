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

import { useGetAllBookingsQuery } from "../services/bookingService";
import { useGetAllHotelsQuery } from "../services/hotelService";
import { useGetAllRoomsQuery } from "../services/roomService";
import { useGetAllUsersQuery } from "../services/userService";
import { useGetRolesQuery } from "../services/roleService";
import { useGetAllReviewsQuery } from "../services/reviewService";
import { useGetAllPaymentsQuery } from "../services/paymentService";

/* -------------------- Helpers -------------------- */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const safeArray = (res) => res?.data || res || [];

const parseDate = (v) => {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
};

const getMonthIndex = (dateVal) => {
  const d = parseDate(dateVal);
  if (!d) return null;
  return d.getMonth(); // 0-11
};

const getPaymentAmount = (p) => {
  const amount =
    p?.amount ??
    p?.totalAmount ??
    p?.paidAmount ??
    p?.price ??
    p?.total ??
    0;

  const num = Number(amount);
  return Number.isNaN(num) ? 0 : num;
};

/* -------------------- Skeleton UI -------------------- */
const StatCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 animate-pulse">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-gray-200" />
        <div>
          <div className="h-4 w-40 bg-gray-200 rounded-md" />
          <div className="h-3 w-28 bg-gray-100 rounded-md mt-2" />
        </div>
      </div>
      <div>
        <div className="h-7 w-16 bg-gray-200 rounded-md" />
        <div className="h-3 w-10 bg-gray-100 rounded-md mt-2 ml-auto" />
      </div>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <div className="h-4 w-24 bg-gray-100 rounded-md" />
      <div className="h-4 w-12 bg-gray-100 rounded-md" />
    </div>
  </div>
);

const ChartSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 animate-pulse">
    <div className="flex items-center justify-between">
      <div>
        <div className="h-4 w-32 bg-gray-200 rounded-md" />
        <div className="h-3 w-44 bg-gray-100 rounded-md mt-2" />
      </div>
      <div className="h-8 w-24 bg-gray-100 rounded-xl" />
    </div>
    <div className="mt-4 h-[260px] bg-gray-100 rounded-xl" />
  </div>
);

const TableSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-pulse">
    <div className="px-5 py-4 border-b border-gray-100">
      <div className="h-4 w-40 bg-gray-200 rounded-md" />
      <div className="h-3 w-56 bg-gray-100 rounded-md mt-2" />
    </div>
    <div className="p-5 space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-10 bg-gray-100 rounded-xl" />
      ))}
    </div>
  </div>
);

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
              {count}
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
  /* -------------------- API Calls -------------------- */
  const { data: bookingsData, isLoading: bookingsLoading } = useGetAllBookingsQuery();
  const { data: hotelsData, isLoading: hotelsLoading } = useGetAllHotelsQuery();
  const { data: roomsData, isLoading: roomsLoading } = useGetAllRoomsQuery();
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: rolesData, isLoading: rolesLoading } = useGetRolesQuery();
  const { data: reviewsData, isLoading: reviewsLoading } = useGetAllReviewsQuery();
  const { data: paymentsData, isLoading: paymentsLoading } = useGetAllPaymentsQuery();

  const bookings = safeArray(bookingsData);
  const payments = safeArray(paymentsData);

  /* -------------------- Totals -------------------- */
  const totalBookings = bookings.length || 0;
  const totalHotels = hotelsData?.data?.length || 0;
  const totalRooms = roomsData?.data?.length || 0;
  const totalGuests = usersData?.data?.length || 0;
  const totalStaff = rolesData?.data?.length || 0;
  const totalReviews = reviewsData?.data?.length || 0;
  const totalPayments = payments.length || 0;

  const isStatsLoading =
    bookingsLoading ||
    hotelsLoading ||
    roomsLoading ||
    usersLoading ||
    rolesLoading ||
    reviewsLoading ||
    paymentsLoading;

  /* -------------------- Chart Data (with sample fallback) -------------------- */
  let bookingsChartData = MONTHS.map((m) => ({ month: m, bookings: 0 }));
  let revenueChartData = MONTHS.map((m) => ({ month: m, revenue: 0 }));

  // Fill bookings chart
  bookings.forEach((b) => {
    const idx = getMonthIndex(b?.createdAt || b?.created_at);
    if (idx === null) return;
    bookingsChartData[idx].bookings += 1;
  });

  // Fill revenue chart
  payments.forEach((p) => {
    const idx = getMonthIndex(p?.createdAt || p?.created_at);
    if (idx === null) return;
    revenueChartData[idx].revenue += getPaymentAmount(p);
  });

  // Check empty chart
  const isBookingsEmpty = bookingsChartData.every((x) => x.bookings === 0);
  const isRevenueEmpty = revenueChartData.every((x) => x.revenue === 0);

  // Sample fallback
  if (isBookingsEmpty) {
    bookingsChartData = [
      { month: "Jan", bookings: 12 },
      { month: "Feb", bookings: 18 },
      { month: "Mar", bookings: 10 },
      { month: "Apr", bookings: 25 },
      { month: "May", bookings: 20 },
      { month: "Jun", bookings: 28 },
      { month: "Jul", bookings: 22 },
      { month: "Aug", bookings: 30 },
      { month: "Sep", bookings: 19 },
      { month: "Oct", bookings: 26 },
      { month: "Nov", bookings: 15 },
      { month: "Dec", bookings: 33 },
    ];
  }

  if (isRevenueEmpty) {
    revenueChartData = [
      { month: "Jan", revenue: 45000 },
      { month: "Feb", revenue: 68000 },
      { month: "Mar", revenue: 52000 },
      { month: "Apr", revenue: 90000 },
      { month: "May", revenue: 74000 },
      { month: "Jun", revenue: 98000 },
      { month: "Jul", revenue: 88000 },
      { month: "Aug", revenue: 120000 },
      { month: "Sep", revenue: 76000 },
      { month: "Oct", revenue: 105000 },
      { month: "Nov", revenue: 64000 },
      { month: "Dec", revenue: 140000 },
    ];
  }

  const showSampleBadge = isBookingsEmpty || isRevenueEmpty;

  /* -------------------- Recent Bookings -------------------- */
  const recentBookings = [...bookings]
    .sort((a, b) => {
      const da = new Date(a?.createdAt || a?.created_at || 0).getTime();
      const db = new Date(b?.createdAt || b?.created_at || 0).getTime();
      return db - da;
    })
    .slice(0, 8);

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
      count: "—",
      description: "Coupons & campaigns",
      link: "/coupons",
      gradient: "bg-gradient-to-r from-orange-600 to-amber-500",
    },
    {
      title: "Reports",
      icon: BarChart3,
      count: "—",
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
        {isStatsLoading
          ? Array.from({ length: 8 }).map((_, i) => <StatCardSkeleton key={i} />)
          : dashboardItems.map((item, index) => <StatCard key={index} {...item} />)}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Revenue Chart */}
        {paymentsLoading ? (
          <ChartSkeleton />
        ) : (
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

              <div className="flex items-center gap-2">
                {showSampleBadge && (
                  <span className="text-[11px] font-semibold text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
                    Sample Data
                  </span>
                )}

                <Link
                  to="/payments"
                  className="text-sm font-semibold text-red-700 hover:text-red-800 transition"
                >
                  View Payments
                </Link>
              </div>
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
        )}

        {/* Bookings Chart */}
        {bookingsLoading ? (
          <ChartSkeleton />
        ) : (
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

              <div className="flex items-center gap-2">
                {showSampleBadge && (
                  <span className="text-[11px] font-semibold text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
                    Sample Data
                  </span>
                )}

                <Link
                  to="/bookings"
                  className="text-sm font-semibold text-red-700 hover:text-red-800 transition"
                >
                  View Bookings
                </Link>
              </div>
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
        )}
      </div>

      {/* Recent Bookings Table */}
      {bookingsLoading ? (
        <TableSkeleton />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Recent Bookings
              </h3>
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
                  <th className="text-left px-5 py-3 font-semibold">Guest</th>
                  <th className="text-left px-5 py-3 font-semibold">Hotel</th>
                  <th className="text-left px-5 py-3 font-semibold">Status</th>
                  <th className="text-left px-5 py-3 font-semibold">Date</th>
                </tr>
              </thead>

              <tbody>
                {recentBookings.length > 0 ? (
                  recentBookings.map((b) => (
                    <tr
                      key={b?.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-4 font-semibold text-gray-900">
                        #{b?.id || "—"}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {b?.guestName || b?.guest?.name || "Guest"}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {b?.hotelName || b?.hotel?.name || "Hotel"}
                      </td>

                      <td className="px-5 py-4">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                          {b?.status || "Pending"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {b?.createdAt || b?.created_at
                          ? new Date(b.createdAt || b.created_at).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-gray-500"
                    >
                      No recent bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer */}
      <p className="text-xs text-gray-500 text-center pt-2">
        © {new Date().getFullYear()} LUXSTAY Admin Panel
      </p>
    </div>
  );
};

export default Dashboard;
