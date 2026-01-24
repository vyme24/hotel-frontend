import { Link } from "react-router-dom";
import { useGetAllBookingsQuery } from "../../services/bookingService";

const PendingPayments = () => {
  const { data, isLoading, isError } = useGetAllBookingsQuery();

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading pending payments...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load data.</div>;
  }


  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Pending Payments</h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Booking</th>
              <th className="px-4 py-3 text-left">Guest</th>
              <th className="px-4 py-3 text-left">Hotel</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {pending.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No pending payments.
                </td>
              </tr>
            )}

            {pending.map((b) => (
              <tr key={b._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{b.bookingId || b._id}</td>
                <td className="px-4 py-3">{b.userId?.name}</td>
                <td className="px-4 py-3">{b.hotelId?.name}</td>
                <td className="px-4 py-3">₹{b.price?.totalAmount}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                    Pending
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/bookings/${b._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Booking
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingPayments;
