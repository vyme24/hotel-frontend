// import { useGetAllBookingsQuery, useDeleteBookingMutation } from "../../services/bookingService";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const TaxesCharges = () => {
  const { data, isLoading, isError, refetch } = useGetAllBookingsQuery();
  const [deleteBooking] = useDeleteBookingMutation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg font-medium">Loading taxes & charges...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">
        Failed to load tax data.
      </div>
    );
  }

  const bookings = data?.data || [];

  const totalTax = bookings.reduce(
    (sum, b) => sum + (b.price?.taxes || 0),
    0
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteBooking(id).unwrap();
        toast.success("Record deleted successfully");
        refetch();
      } catch (err) {
        toast.error("Failed to delete record");
      }
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Taxes & Charges</h1>
          <p className="text-sm text-gray-600 mt-1">Detailed breakdown of taxes collected per booking</p>
        </div>
        <div className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg border border-blue-700">
          <p className="text-xs uppercase font-bold opacity-80">Total Tax Collected</p>
          <p className="text-2xl font-black">₹{totalTax.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Guest</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Room Price</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider font-bold text-blue-600">Tax Charged</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500 font-medium">
                    No tax records found.
                  </td>
                </tr>
              ) : (
                bookings.map((b, index) => (
                  <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-500 uppercase">
                      {b.bookingId || b._id.slice(-8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(b.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{b.userId?.name || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">₹{b.price?.roomPrice || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-blue-600">₹{b.price?.taxes || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">₹{b.price?.totalAmount || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          to={`/bookings/${b._id}`}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs font-bold hover:bg-red-600 hover:text-white transition-all"
                        >
                          Delete
                        </button>
                      </div>
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

export default TaxesCharges;