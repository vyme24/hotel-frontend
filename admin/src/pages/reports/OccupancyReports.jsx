import { useGetAllBookingsQuery } from "../../services/bookingService";
import { Link } from "react-router-dom";

const OccupancyReports = () => {
  const { data, isLoading, isError } = useGetAllBookingsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg font-medium">Calculating occupancy rates...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500 font-bold">
        Failed to load occupancy data.
      </div>
    );
  }

  const bookings = data?.data || [];
  const todayDate = new Date().toDateString();

  // Categories
  const checkedIn = bookings.filter(b => b.bookingStatus === "checked_in");
  const confirmed = bookings.filter(b => b.bookingStatus === "confirmed");
  const cancelled = bookings.filter(b => b.bookingStatus === "cancelled");

  const todayCheckIn = bookings.filter(
    b => new Date(b.checkInDate).toDateString() === todayDate
  );

  const todayCheckOut = bookings.filter(
    b => new Date(b.checkOutDate).toDateString() === todayDate
  );

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Occupancy Reports</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time room availability and guest flow analysis</p>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-green-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Occupied</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{checkedIn.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-blue-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Arrivals Today</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{todayCheckIn.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-purple-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Departures</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{todayCheckOut.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-yellow-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Upcoming</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{confirmed.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-red-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cancelled</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{cancelled.length}</p>
        </div>
      </div>

      {/* Occupancy Detail Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-white">
          <h2 className="font-bold text-gray-800 text-lg">Occupancy Status Details</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Guest</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Room / Hotel</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Check-In</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Check-Out</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-400 font-medium">
                    No active occupancy records found.
                  </td>
                </tr>
              ) : (
                bookings.map((b, index) => (
                  <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900">{b.userId?.name || "Guest"}</div>
                      <div className="text-[10px] text-gray-400 font-mono tracking-tighter">{b._id.slice(-8).toUpperCase()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900 font-medium">{b.hotelId?.name}</div>
                      <div className="text-xs text-gray-500">{b.roomId?.roomTypeName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(b.checkInDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(b.checkOutDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase border ${
                        b.bookingStatus === "checked_in" 
                        ? "bg-green-50 text-green-700 border-green-100" 
                        : b.bookingStatus === "confirmed" 
                        ? "bg-blue-50 text-blue-700 border-blue-100"
                        : "bg-gray-50 text-gray-600 border-gray-100"
                      }`}>
                        {b.bookingStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <Link
                        to={`/bookings/${b._id}`}
                        className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all duration-200"
                      >
                        View Stay
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

export default OccupancyReports;