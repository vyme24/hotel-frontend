import { useGetAllBookingsQuery } from "../../services/bookingService";
import { Link } from "react-router-dom";

const CustomerReports = () => {
  const { data, isLoading, isError } = useGetAllBookingsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg font-medium">Analyzing customer data...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500 font-bold">
        Failed to load customer reports.
      </div>
    );
  }

  const bookings = data?.data || [];
  const customersMap = {};

  bookings.forEach((b) => {
    const u = b.userId;
    if (!u?._id) return;

    if (!customersMap[u._id]) {
      customersMap[u._id] = {
        _id: u._id,
        name: u.name,
        email: u.email,
        totalBookings: 0,
        confirmed: 0,
        cancelled: 0,
        pending: 0,
        totalAmount: 0,
        lastBooking: null,
      };
    }

    const c = customersMap[u._id];
    c.totalBookings += 1;
    c.totalAmount += b.price?.totalAmount || 0;

    if (b.bookingStatus === "confirmed") c.confirmed += 1;
    if (b.bookingStatus === "cancelled") c.cancelled += 1;
    if (b.bookingStatus === "pending") c.pending += 1;

    if (!c.lastBooking || new Date(b.createdAt) > new Date(c.lastBooking)) {
      c.lastBooking = b.createdAt;
    }
  });

  const customers = Object.values(customersMap);

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Customer Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Detailed spending and booking behavior per customer</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase">Total Unique Customers</span>
          <p className="text-xl font-black text-blue-600">{customers.length}</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Total Stays</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider">Total Spend</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-400 font-medium">
                    No customer data found.
                  </td>
                </tr>
              ) : (
                customers.map((c, index) => (
                  <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs mr-3">
                          {c.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{c.name}</div>
                          <div className="text-[10px] text-gray-400 font-mono tracking-tight">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center font-bold text-gray-700">
                      {c.totalBookings}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 rounded tracking-tighter">✔ {c.confirmed} Confirmed</span>
                        <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 rounded tracking-tighter">✖ {c.cancelled} Cancelled</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-black text-gray-900">
                      ₹{c.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                      {c.lastBooking ? new Date(c.lastBooking).toLocaleDateString("en-GB") : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <Link
                        to={`/guests/history/${c._id}`}
                        className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all duration-200"
                      >
                        View History
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerReports;