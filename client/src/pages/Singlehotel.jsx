import { useParams, Link } from "react-router-dom";
import { useGetHotelByIdQuery } from "../services/hotel";

const SingleHotel = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetHotelByIdQuery(id);


    async function payNow() {
      const amount = 100;

      // Create order by calling the server endpoint
      const response = await fetch('http://127.0.0.1:5000/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, currency: 'INR', receipt: 'receipt#1', notes: {} })
      });

      const order = await response.json();
      console.log(order)

      // Open Razorpay Checkout
      const options = {
        key: 'rzp_live_S9FPjGIs1C3tlt', // Replace with your Razorpay key_id
        amount: '50000', // Amount is in currency subunits.
        currency: 'INR',
        name: 'Acme Corp',
        description: 'Test Transaction',
        order_id: order.data.id, // This is the order_id created in the backend
        callback_url: 'http://localhost:3000/payment-success', // Your success URL
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg">
          Loading hotel...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-2xl font-semibold">
            Failed to load hotel
          </div>
          <p className="text-gray-600">Please try again later.</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  const h = data?.data;
  const hotelImage = h?.images?.[0];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            {h?.name || "Hotel"}
          </h1>
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            Back
          </Link>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Image */}
          <div className="md:col-span-2">
            <img
              src={hotelImage || "/images/no-hotel.png"}
              alt={h?.name}
              className="w-full h-96 object-cover rounded-3xl shadow-lg"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/no-hotel.png";
              }}
            />
          </div>

          {/* Booking Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Property Type</p>
              <p className="font-medium text-gray-900">
                {h?.propertyType || "N/A"}
              </p>

              <p className="text-sm text-gray-500 pt-2">Star Rating</p>
              <p className="font-medium text-yellow-500">
                {"★".repeat(h?.starRating || 0)}
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Link
                to={`/rooms?hotel=${h?._id}`}
                className="block text-center px-4 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition"
              >
                View Rooms
              </Link>

              <Link
               onClick={payNow}
                className="block text-center px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:opacity-90 transition"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-3xl shadow p-8 space-y-5">
          <h2 className="text-xl font-semibold text-gray-900">
            About this hotel
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {h?.description || "Luxury hotel with premium amenities."}
          </p>

          {h?.amenities?.length > 0 && (
            <div className="pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                {h.amenities.map((a, i) => (
                  <span
                    key={i}
                    className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
