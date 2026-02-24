import { useParams, Link } from "react-router-dom";
import { useGetRoomByIdQuery } from "../services/room";
import toast from "react-hot-toast";

const SingleRoom = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetRoomByIdQuery(id);


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg">
          Loading room...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-2xl font-semibold">
            Failed to load room
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

const r = data?.data;
const roomImage = r?.images?.[0];


const handlePayment = () => {

      const token = localStorage.getItem("token");
      console.log("Token:", token); // Debugging line
      if (!token) {
        toast.error("Please log in to book this room.");
        window.location.href = "/auth/login"; // Redirect to login page
        return;
      }
  // Implement payment logic here, e.g., redirect to checkout page
  console.log("Redirecting to payment for room ID:", r?._id);
}

return (
  <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {r?.roomTypeName || "Room"}
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
            src={roomImage}
            alt={r?.roomTypeName}
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
            <p className="text-sm text-gray-500">Base Price</p>
            <p className="font-semibold text-2xl text-red-600">
              ₹{r?.basePrice}
            </p>

            <p className="text-sm text-gray-500 pt-2">Room Size</p>
            <p className="font-medium text-gray-900">
              {r?.roomSize} sq.ft
            </p>

            <p className="text-sm text-gray-500 pt-2">Bed Type</p>
            <p className="font-medium text-gray-900">
              {r?.bedType}
            </p>

            <p className="text-sm text-gray-500 pt-2">Guests</p>
            <p className="font-medium text-gray-900">
              {r?.maxAdults} Adults, {r?.maxChildren} Children
            </p>

            <p className="text-sm text-gray-500 pt-2">Available Rooms</p>
            <p className="font-medium text-green-600">
              {r?.availableRooms} left
            </p>
          </div>

          <div className="pt-4">
            <button onClick={handlePayment}
              className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-3xl shadow p-8 space-y-5">
        <h2 className="text-xl font-semibold text-gray-900">
          About this room
        </h2>

        <p className="text-gray-600 leading-relaxed">
          {r?.description}
        </p>

        {r?.amenities?.length > 0 && (
          <div className="pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Amenities
            </h3>
            <div className="flex flex-wrap gap-2">
              {r.amenities.map((a, i) => (
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

export default SingleRoom;
