import { useParams, Link } from "react-router-dom";
import { useGetBookingQuery } from "../../services/bookingService";

const GuestDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookingQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg">Loading guest details...</div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-2xl font-semibold">Guest not found</div>
          <p className="text-gray-600">The guest you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/guests"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Guests
          </Link>
        </div>
      </div>
    );
  }

  const booking = data.data;
  const guest = booking.userId;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Section with No. and Image */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm">
              No. {booking.bookingId || "1"}
            </div>
            <img
              src={booking.hotelId?.images?.[0] || "/images/no-hotel.png"}
              alt="hotel"
              className="w-24 h-16 object-cover rounded-lg border shadow-sm"
              onError={(e) => { e.target.src = "/images/no-hotel.png"; }}
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Guest Details</h1>
              <p className="text-sm text-gray-600 font-mono italic">System ID: {booking._id}</p>
            </div>
          </div>
          <Link
            to="/guests"
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition shadow-sm text-sm"
          >
            Back to Guests
          </Link>
        </div>

        {/* Guest Overview Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-900">Guest Profile</h2>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase border ${
              guest?.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'
            }`}>
              {guest?.status || 'Unknown'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Guest Name</p>
                <p className="text-lg font-medium text-gray-900">{guest?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-50 rounded-full text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                <p className="text-lg font-medium text-gray-900">{guest?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-50 rounded-full text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Total Paid</p>
                <p className="text-lg font-bold text-gray-900">₹{booking.price?.totalAmount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
                Booking Information
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Hotel</span>
                  <span className="font-bold text-gray-900">{booking.hotelId?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Room Category</span>
                  <span className="font-bold text-gray-900">{booking.roomId?.roomTypeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Stay Duration</span>
                  <span className="font-bold text-gray-900">{booking.nights} Nights</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-6 bg-purple-600 rounded-full mr-3"></span>
                Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Check-In</span>
                  <span className="font-bold text-gray-900">{new Date(booking.checkInDate).toDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Check-Out</span>
                  <span className="font-bold text-gray-900">{new Date(booking.checkOutDate).toDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></span>
                Billing Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Payment</span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Transaction ID</span>
                  <span className="font-bold text-gray-900 font-mono uppercase">{booking.transactionId || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
                Stay Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-500 font-medium">Booking Status</span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    booking.bookingStatus === 'confirmed' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {booking.bookingStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS - View History & Delete Only */}
        <div className="mt-12 flex items-center justify-center space-x-6 border-t pt-8">
          <Link
            to={`/guests/history/${guest?._id}`}
            className="inline-flex items-center px-10 py-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition shadow-sm"
          >
            View History
          </Link>
          <Link
            to={`/bookings/delete/${booking._id}`}
            className="inline-flex items-center px-10 py-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition shadow-sm"
          >
            Delete Booking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuestDetails;