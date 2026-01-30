import { useParams, Link } from "react-router-dom";
import { useGetHotelByIdQuery } from "../services/hotel";

const Checkout = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetHotelByIdQuery(id);
  const h = data?.data;

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg">Preparing checkout…</div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-500">Failed to load checkout</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        
        {/* Left – Payment Placeholder */}
        <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
            <span className="text-3xl text-red-600">💳</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Secure Payment
          </h2>

          <p className="text-gray-500 max-w-md">
            You will be redirected to our secure payment gateway to complete your booking safely.
          </p>

          <div className="w-full max-w-sm mt-6">
            <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold text-lg hover:opacity-90 transition">
              Proceed to Payment
            </button>
          </div>

          <p className="text-xs text-gray-400 pt-2">
            Powered by secure payment partners
          </p>
        </div>

        {/* Right – Summary */}
        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4">
          <img
            src={h?.image || "/images/no-hotel.png"}
            alt={h?.name}
            className="w-full h-40 object-cover rounded-2xl"
            onError={(e) => (e.target.src = "/images/no-hotel.png")}
          />

          <h3 className="text-lg font-bold text-gray-900">{h?.name}</h3>
          <p className="text-sm text-gray-500">{h?.location}</p>

          <div className="flex justify-between pt-3 border-t">
            <span className="text-gray-600">1 Night</span>
            <span className="font-semibold">₹{h?.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Taxes</span>
            <span className="font-semibold">₹{Math.round((h?.price || 0) * 0.12)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span>₹{Math.round((h?.price || 0) * 1.12)}</span>
          </div>

          <Link
            to={`/hotel/${h?._id}`}
            className="block text-center text-sm text-blue-600 hover:underline"
          >
            Back to Hotel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
