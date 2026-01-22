import { useGetAllBookingsQuery } from "../../services/bookingService";
import { Link } from "react-router-dom";

const BookingReports = () => {
  const { data, isLoading, isError } = useGetAllBookingsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg font-medium">Generating reports...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">
        Failed to load booking reports.
      </div>
    );
  }

  const bookings = data?.data || [];

  const total = bookings.length;
  const confirmed = bookings.filter(b => b.bookingStatus === "confirmed").length;
  const cancelled = bookings.filter(b => b.bookingStatus === "cancelled").length;
  const pending = bookings.filter(b => b.bookingStatus === "pending").length;

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Booking Analytics</h1>
        <p className="text-sm text-gray-600 mt-1">Detailed overview of system bookings and performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Bookings</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{total}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-green-500">
          <p className="text-xs font-bold text-green-500 uppercase tracking-wider">Confirmed</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{confirmed}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-red-500">
          <p className="text-xs font-bold text-red-500 uppercase tracking-wider">Cancelled</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{cancelled}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-yellow-500">
          <p className="text-xs font-bold text-yellow-500 uppercase tracking-wider">Pending</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{pending}</p>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="font-bold text-gray-800 text-lg">Booking Details Log</h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
            Showing {bookings.length} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Guest</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                    No booking records found.
                  </td>
                </tr>
              ) : (
                bookings.map((b, index) => (
                  <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-500">
                      #{b._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900">{b.userId?.name || "Guest User"}</div>
                      <div className="text-[10px] text-gray-400">{b.userId?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                          b.bookingStatus === "confirmed"
                            ? "bg-green-50 text-green-700 border-green-100"
                            : b.bookingStatus === "cancelled"
                            ? "bg-red-50 text-red-700 border-red-100"
                            : "bg-yellow-50 text-yellow-700 border-yellow-100"
                        }`}
                      >
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                      ₹{b.price?.totalAmount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {b.createdAt ? new Date(b.createdAt).toLocaleDateString("en-GB") : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <Link
                        to={`/bookings/${b._id}`}
                        className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all duration-200"
                      >
                        View Report
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

export default BookingReports;