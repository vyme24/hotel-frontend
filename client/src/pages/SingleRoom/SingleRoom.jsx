import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Users, Bed, Square, ShieldCheck, ArrowRight, CheckCircle,
  Star, Shield, Calendar, Clock, X, ChevronLeft, ChevronRight, MapPin
} from "lucide-react";
import { useGetRoomByIdQuery } from "../../services/room";
import { useGetReviewAllQuery } from "../../services/review";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import toast from "react-hot-toast";
import { buildCartItemFromRoom, buildPendingCartIntent } from "../../utils/cart";
import { STORAGE_KEYS, writeSessionStorage } from "../../utils/storage";
import { formatPrice } from "../../utils/price";

const SingleRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { handleAuthorizedAction, isAuthenticated } = useAuthCheck();
  const { data, isLoading, isError } = useGetRoomByIdQuery(id);
  const { data: reviewsData } = useGetReviewAllQuery();
  const [activeImage, setActiveImage] = useState("");
  const [duration, setDuration] = useState(1);

  const roomReviews = reviewsData?.data?.filter(
    review => review.roomId?._id === id || review.bookingId?.roomId?._id === id
  ) || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (data?.data) {
      const r = data.data;
      setActiveImage(r.images?.[0] || r.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb");
    }
  }, [data]);

  const handleBookNow = () => {
    if (data?.data && !isAuthenticated) {
      writeSessionStorage(
        STORAGE_KEYS.pendingCartIntent,
        buildPendingCartIntent(data.data, { duration })
      );
    }

    handleAuthorizedAction(() => {
      if (data?.data) {
        const r = data.data;
        if (r.availableRooms <= 0) {
          toast.error("This room is currently fully booked.");
          return;
        }

        const cartItem = buildCartItemFromRoom(r, { duration });
        const isAlreadyInCart = items.find((item) => item.cartKey === cartItem.cartKey);
        if (isAlreadyInCart) {
          toast.success("Room is already in your cart.");
          navigate('/cart');
          return;
        }

        dispatch(addToCart(cartItem));
        toast.success("Room added to your cart.");
        navigate('/cart');
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-amber-500/20 rounded-full" />
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-widest uppercase animate-pulse">Loading Room...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505] px-6">
        <div className="max-w-md w-full p-12 bg-white dark:bg-gray-900 rounded-3xl text-center border border-gray-100 dark:border-white/5 shadow-2xl">
          <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <X size={24} className="text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Room Not Found</h2>
          <p className="text-gray-500 mb-8 leading-relaxed text-sm">This room may no longer be available or the link is invalid.</p>
          <button onClick={() => navigate(-1)} className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-amber-500/30">
            Explore Other Rooms
          </button>
        </div>
      </div>
    );
  }

  const r = data?.data;
  const roomImages = r?.images || [r?.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"];
  const totalPrice = r?.basePrice ? r.basePrice * duration : 0;
  const taxes = Math.round(totalPrice * 0.12);
  const grandTotal = totalPrice + taxes;

  const specs = [
    { icon: Square, label: "Room Size", val: r?.roomSize ? `${r.roomSize} ft²` : "N/A" },
    { icon: Users, label: "Max Guests", val: `${r?.maxAdults || 0} Adults, ${r?.maxChildren || 0} Children` },
    { icon: Bed, label: "Bed Type", val: r?.bedType || "N/A" },
    { icon: ShieldCheck, label: "Status", val: r?.availableRooms > 0 ? "Available" : "Fully Booked" },
  ];

  return (
    <div className="bg-white dark:bg-[#050505] min-h-screen pt-24">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/rooms" className="hover:text-amber-500 transition-colors">Rooms</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-200 font-medium truncate max-w-xs">{r?.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Left Column: Gallery & Details */}
          <div className="lg:col-span-7 space-y-8">

            {/* Main Image */}
            <div className="h-[420px] lg:h-[520px] w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-white/5 relative group">
              <img
                src={activeImage}
                alt={r?.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
              />
              {r?.availableRooms <= 0 && (
                <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  Fully Booked
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {roomImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                {roomImages.map((img, i) => (
                  <button
                    key={`img-${i}`}
                    onClick={() => setActiveImage(img)}
                    className={`w-24 h-16 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === img
                      ? 'border-amber-500 shadow-lg shadow-amber-500/20'
                      : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`View ${i}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Room Details */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/10 rounded-full">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                      {r?.roomTypeCode} | {r?.roomTypeName || "Suite"}
                    </span>
                  </div>
                  {r?.availableRooms > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/10 rounded-full">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Available Now</span>
                    </div>
                  )}
                </div>
                <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {r?.name}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed text-base">
                  {r?.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100 dark:border-white/5">
                {specs.map((spec, i) => (
                  <div key={i} className="group text-center p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-amber-500/30 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-all duration-300">
                    <div className="w-10 h-10 bg-white dark:bg-black/50 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                      <spec.icon size={18} className="text-amber-500 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{spec.label}</p>
                    <p className="text-xs font-bold text-gray-700 dark:text-gray-200">{spec.val}</p>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              {r?.amenities?.length > 0 && (
                <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                  <h3 className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em] mb-5">Room Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {r.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                        <CheckCircle size={14} className="text-amber-500 flex-shrink-0" />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Booking Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">

              {/* Booking Card */}
              <div className="bg-white dark:bg-[#0c0c0c] p-8 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl">

                {/* Price */}
                <div className="mb-6">
                  <span className="text-xs text-gray-400 block mb-1">Price per night</span>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-black text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {r?.basePrice ? `₹${r.basePrice.toLocaleString()}` : "Contact Us"}
                    </p>
                    {r?.basePrice && <span className="text-sm text-gray-400">/night</span>}
                  </div>
                </div>

                {/* Duration */}
                <div className="mb-6">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">
                    Duration of Stay
                  </label>
                  <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-3 rounded-2xl border border-gray-100 dark:border-white/10">
                    <button
                      onClick={() => setDuration(Math.max(1, duration - 1))}
                      className="w-10 h-10 rounded-xl bg-white dark:bg-black/50 border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-500 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all font-bold shadow-sm"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-xl font-black text-gray-900 dark:text-white">{duration}</span>
                      <span className="text-xs text-gray-400 ml-1.5">night{duration !== 1 ? 's' : ''}</span>
                    </div>
                    <button
                      onClick={() => setDuration(duration + 1)}
                      className="w-10 h-10 rounded-xl bg-white dark:bg-black/50 border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-500 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all font-bold shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Extra Charges */}
                {(r?.extraAdultPrice > 0 || r?.extraChildPrice > 0) && (
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    {r?.extraAdultPrice > 0 && (
                      <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Extra Adult</span>
                        <span className="text-sm font-bold text-gray-800 dark:text-white">₹{r.extraAdultPrice.toLocaleString()}</span>
                      </div>
                    )}
                    {r?.extraChildPrice > 0 && (
                      <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Extra Child</span>
                        <span className="text-sm font-bold text-gray-800 dark:text-white">₹{r.extraChildPrice.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Price Breakdown */}
                {r?.basePrice > 0 && (
                  <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-4 mb-6 space-y-2 border border-amber-100 dark:border-amber-900/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">₹{r.basePrice.toLocaleString()} × {duration} night{duration !== 1 ? 's' : ''}</span>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Taxes & fees (12%)</span>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">₹{taxes.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t border-amber-200 dark:border-amber-800/30 flex justify-between">
                      <span className="font-bold text-gray-700 dark:text-gray-200">Total</span>
                      <span className="text-xl font-black text-amber-600">₹{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <button
                  onClick={handleBookNow}
                  disabled={r?.availableRooms <= 0}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-2xl font-bold tracking-wide transition-all duration-300 shadow-xl shadow-amber-500/30 active:scale-95"
                >
                  {r?.availableRooms <= 0 ? "Not Available" : "Book Now"}
                </button>
              </div>

              {/* Trust Highlights */}
              <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-3xl border border-gray-100 dark:border-white/5 space-y-4">
                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Shield size={16} className="text-amber-500" />
                  Booking Policies
                </h4>
                <div className="space-y-3">
                  {[
                    { label: "Check-in Time", val: "14:00" },
                    { label: "Check-out Time", val: "12:00" },
                    { label: "Cancellation", val: "24h Flexible" },
                    { label: "Payment", val: "Secure & Encrypted" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-100 dark:border-white/5 last:border-0">
                      <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guest Reviews */}
        <section id="reviews" className="py-16 border-t border-gray-100 dark:border-white/5 mt-16">
          <div className="mb-10">
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.35em] block mb-2">Guest Feedback</span>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Verified <span className="text-amber-500">Reviews</span>
            </h2>
          </div>

          {roomReviews.length === 0 ? (
            <div className="p-16 bg-gray-50 dark:bg-white/5 rounded-3xl text-center border border-dashed border-gray-200 dark:border-white/10">
              <Star size={32} className="text-gray-200 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-sm text-gray-400 leading-relaxed">
                No reviews yet. Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roomReviews.map((review, i) => (
                <div key={review._id} className="p-6 bg-white dark:bg-[#0a0a0a] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-amber-500 rounded-2xl flex items-center justify-center text-white font-bold">
                        {review.userId?.name?.charAt(0) || "G"}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">{review.userId?.name || "Guest"}</h4>
                        <span className="text-[10px] text-gray-400">{new Date(review.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className={j < (review.rating || 5) ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SingleRoom;
