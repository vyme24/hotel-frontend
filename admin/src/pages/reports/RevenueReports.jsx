import { useGetAllBookingsQuery } from "../../services/bookingService";
import { Link } from "react-router-dom";

const RevenueReports = () => {
  const { data, isLoading, isError } = useGetAllBookingsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg font-medium">Calculating financial data...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500 font-bold">
        Failed to load revenue reports.
      </div>
    );
  }


  const today = new Date();
  const todayStr = today.toDateString();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();


  const totalRevenue = bookings.reduce((sum, b) => sum + (b.price?.totalAmount || 0), 0);
  
  const todayRevenue = bookings
    .filter(b => new Date(b.createdAt).toDateString() === todayStr)
    .reduce((sum, b) => sum + (b.price?.totalAmount || 0), 0);

  const monthRevenue = bookings
    .filter(b => {
      const d = new Date(b.createdAt);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, b) => sum + (b.price?.totalAmount || 0), 0);

  const avgBookingValue = bookings.length ? Math.round(totalRevenue / bookings.length) : 0;

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Revenue Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Track your earnings, taxes, and average order values</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Last Updated</span>
          <p className="text-xs font-bold text-gray-900">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Financial Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-b-4 border-b-green-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Revenue</p>
          <p className="text-3xl font-black text-gray-900 mt-1">₹{totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-b-4 border-b-blue-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Earnings Today</p>
          <p className="text-3xl font-black text-gray-900 mt-1">₹{todayRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 border-b-4 border-b-purple-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">This Month</p>
          <p className="text-3xl font-black text-gray-900 mt-1">₹{monthRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-b-4 border-b-orange-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Avg. Ticket Size</p>
          <p className="text-3xl font-black text-gray-900 mt-1">₹{avgBookingValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Revenue Detailed Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-white">
          <h2 className="font-bold text-gray-800 text-lg">Transaction History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Guest</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Hotel</th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider font-bold">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-400 font-medium">
                    No financial transactions recorded.
                  </td>
                </tr>
              ) : (
                bookings.map((b, index) => (
                  <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-[10px] text-gray-400">
                      #{b.bookingId || b._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900">{b.userId?.name || "Guest User"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {b.hotelId?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-black text-green-700">
                      ₹{(b.price?.totalAmount || 0).toLocaleString()}
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

export default RevenueReports;