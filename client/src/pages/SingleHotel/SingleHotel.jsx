import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft, ChevronRight, MapPin, Star, ShieldCheck, Waves, Coffee,
  Utensils, Wifi, ArrowRight, Bed, Users, Square, Shield, CheckCircle,
  Calendar, Clock, Phone, Mail, Award, X
} from "lucide-react";
import { useGetHotelByIdQuery } from "../../services/hotel";
import { useGetRoomAllQuery } from "../../services/room";
import { useGetReviewAllQuery } from "../../services/review";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import toast from "react-hot-toast";

const SingleHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [duration, setDuration] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { handleAuthorizedAction } = useAuthCheck();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarType, setCalendarType] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null);

  const { data, isLoading, isError } = useGetHotelByIdQuery(id);
  const { data: roomsData } = useGetRoomAllQuery();
  const { data: reviewsData } = useGetReviewAllQuery();

  const hotelRooms = roomsData?.data?.filter(room => room.hotelId === id || room.hotelId?._id === id) || [];
  const hotelReviews = reviewsData?.data?.filter(review => review.hotelId?._id === id) || [];

  useEffect(() => {
    if (data?.data) {
      const h = data.data;
      setActiveImage(h.images?.[0] || h.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb");
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) setShowCalendar(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handleDateSelect = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    if (calendarType === "checkIn") {
      setCheckIn(formattedDate);
      setCalendarType("checkOut");
    } else {
      setCheckOut(formattedDate);
      setShowCalendar(false);
      if (checkIn) {
        const start = new Date(checkIn);
        const diffTime = Math.abs(selectedDate - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDuration(diffDays || 1);
      }
    }
  };

  const handleFullHotelBook = () => {
    handleAuthorizedAction(() => {
      if (!h) return;
      if (!checkIn || !checkOut) {
        toast.error("Please select check-in and check-out dates first.");
        return;
      }
      const hotelBookingItem = {
        _id: h._id,
        hotelId: h._id,
        name: `${h.name} (Full Hotel)`,
        basePrice: h.pricing?.basePricePerNight || h.price || 0,
        image: h.images?.[0] || h.image,
        type: 'FULL_HOTEL',
        duration: duration,
        checkIn: checkIn,
        checkOut: checkOut
      };

      const isAlreadyInCart = items.find(item => item._id === h._id);
      if (isAlreadyInCart) {
        toast.success("Hotel is already in your cart.");
        navigate('/cart');
        return;
      }

      dispatch(addToCart(hotelBookingItem));
      toast.success("Full hotel added to your cart.");
      navigate('/cart');
    });
  };

  const handleRoomBook = (room) => {
    handleAuthorizedAction(() => {
      if (!checkIn || !checkOut) {
        toast.error("Please select check-in and check-out dates first.");
        return;
      }
      if (room.availableRooms <= 0) {
        toast.error("This room is currently fully booked.");
        return;
      }

      const isAlreadyInCart = items.find(item => item._id === room._id);
      if (isAlreadyInCart) {
        toast.success("Room is already in your cart.");
        navigate('/cart');
        return;
      }

      const roomWithDates = {
        ...room,
        roomId: room._id,
        hotelId: typeof room.hotelId === "object" ? room.hotelId : h?._id || room.hotelId,
        checkIn,
        checkOut,
        duration,
      };
      dispatch(addToCart(roomWithDates));
      toast.success("Room added to your cart.");
      navigate('/cart');
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
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-widest uppercase animate-pulse">Loading Hotel...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505] px-6">
        <div className="max-w-md w-full p-12 bg-white dark:bg-[#0a0a0a] rounded-3xl border border-gray-100 dark:border-white/5 shadow-2xl text-center">
          <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <X size={24} className="text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Hotel Not Found</h2>
          <p className="text-gray-500 mb-8 leading-relaxed text-sm">We couldn't find the hotel you're looking for. It may have been removed or the link is invalid.</p>
          <button onClick={() => navigate(-1)} className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-amber-500/30">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const h = data?.data;
  const hotelImages = h?.images || [h?.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"];
  const displayRoomsLimit = hotelRooms.slice(0, 3);
  const avgRating = hotelReviews.length > 0
    ? (hotelReviews.reduce((sum, r) => sum + (r.rating || 5), 0) / hotelReviews.length).toFixed(1)
    : h?.starRating || "5.0";

  return (
    <div className="bg-white dark:bg-[#050505] min-h-screen pt-24">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/hotels" className="hover:text-amber-500 transition-colors">Hotels</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-200 font-medium truncate max-w-xs">{h?.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Left Column: Gallery & Info */}
          <div className="lg:col-span-7 space-y-8">

            {/* Main Image */}
            <div className="h-[420px] lg:h-[520px] w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-white/5 relative group">
              <img
                src={activeImage}
                alt={h?.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Thumbnails */}
            {hotelImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                {hotelImages.map((img, i) => (
                  <button
                    key={`hotel-img-${i}`}
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

            {/* Hotel Info */}
            <div className="space-y-6">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 bg-amber-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <Star size={10} className="fill-white" />
                  {avgRating} Rating
                </div>
                <div className="px-3 py-1.5 bg-gray-100 dark:bg-white/10 rounded-full text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  {h?.propertyType}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
                  <MapPin size={14} className="text-amber-500" />
                  {h?.address?.city}, {h?.address?.state}, {h?.address?.country}
                </div>
              </div>

              {/* Name & Description */}
              <div>
                <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {h?.brand && <span className="text-gray-400 font-light mr-2">{h.brand}</span>}
                  {h?.name}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed text-base">
                  {h?.description}
                </p>
              </div>

              {/* Amenities */}
              {h?.amenities?.length > 0 && (
                <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                  <h3 className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em] mb-5">Hotel Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {h.amenities.map((amenity, i) => (
                      <div key={`amenity-${i}`} className="flex items-center gap-3 group cursor-default">
                        <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/10 rounded-xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                          <CheckCircle size={16} />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Policies & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100 dark:border-white/5">
                <div>
                  <h3 className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em] mb-5">Hotel Policies</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Check-in Time", val: h?.policies?.checkInTime },
                      { label: "Check-out Time", val: h?.policies?.checkOutTime },
                      { label: "Cancellation", val: h?.policies?.cancellationPolicy },
                      { label: "Pets Policy", val: h?.policies?.petPolicy },
                      { label: "Smoking Policy", val: h?.policies?.smokingPolicy }
                    ].filter(p => p.val).map((p, i) => (
                      <div key={`policy-${i}`} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-white/5">
                        <span className="text-xs text-gray-400 font-medium">{p.label}</span>
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{p.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em] mb-5">Contact Information</h3>
                  <div className="space-y-4">
                    {h?.contact?.email && (
                      <a href={`mailto:${h.contact.email}`} className="flex items-center gap-3 group">
                        <div className="w-9 h-9 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-amber-500 group-hover:text-white transition-all">
                          <Mail size={14} />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-amber-500 transition-colors">{h.contact.email}</span>
                      </a>
                    )}
                    {h?.contact?.phone && (
                      <a href={`tel:${h.contact.phone}`} className="flex items-center gap-3 group">
                        <div className="w-9 h-9 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-amber-500 group-hover:text-white transition-all">
                          <Phone size={14} />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-amber-500 transition-colors">{h.contact.phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              {hotelReviews.length > 0 && (
                <div className="pt-8 border-t border-gray-100 dark:border-white/5">
                  <h3 className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em] mb-6">
                    Guest Reviews ({hotelReviews.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hotelReviews.slice(0, 4).map((review, i) => (
                      <div key={review._id} className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                            {review.userId?.name?.charAt(0) || "G"}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{review.userId?.name || "Guest"}</p>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} size={10} className={j < (review.rating || 5) ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic leading-relaxed line-clamp-3">
                          "{review.comment}"
                        </p>
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
                  <span className="text-xs text-gray-400 block mb-1">Starting from</span>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-black text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {h?.pricing?.basePricePerNight
                        ? `₹${h.pricing.basePricePerNight.toLocaleString()}`
                        : (h?.priceRange?.min !== h?.priceRange?.max
                          ? `₹${h?.priceRange?.min?.toLocaleString()} – ₹${h?.priceRange?.max?.toLocaleString()}`
                          : (h?.priceRange?.min ? `₹${h.priceRange.min.toLocaleString()}` : "Contact Us")
                        )
                      }
                    </p>
                    {h?.pricing?.basePricePerNight && <span className="text-sm text-gray-400">/night</span>}
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-3 relative">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Check-in</label>
                      <button
                        onClick={() => { setShowCalendar(!showCalendar || calendarType !== "checkIn"); setCalendarType("checkIn"); }}
                        className="w-full py-3 px-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 text-sm font-medium text-gray-900 dark:text-white text-left flex items-center gap-2 hover:border-amber-500/50 transition-all"
                      >
                        <Calendar size={14} className="text-amber-500" />
                        {checkIn ? new Date(checkIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : "Select"}
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Check-out</label>
                      <button
                        onClick={() => { setShowCalendar(!showCalendar || calendarType !== "checkOut"); setCalendarType("checkOut"); }}
                        className="w-full py-3 px-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 text-sm font-medium text-gray-900 dark:text-white text-left flex items-center gap-2 hover:border-amber-500/50 transition-all"
                      >
                        <Calendar size={14} className="text-amber-500" />
                        {checkOut ? new Date(checkOut).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : "Select"}
                      </button>
                    </div>

                    {showCalendar && (
                      <div ref={calendarRef} className="absolute left-0 right-0 top-full mt-3 bg-white dark:bg-[#0c0c0c] rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/5 p-6 z-[10000] animate-fadeIn">
                        <div className="flex items-center justify-between mb-5">
                          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="p-2 hover:text-amber-500 transition-colors dark:text-gray-300"><ChevronLeft size={18} /></button>
                          <span className="text-sm font-bold dark:text-white uppercase tracking-wider">
                            {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                          </span>
                          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="p-2 hover:text-amber-500 transition-colors dark:text-gray-300"><ChevronRight size={18} /></button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-[9px] font-bold text-center mb-3">
                          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={`day-${i}`} className="text-gray-300 py-1">{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {Array(getFirstDayOfMonth(currentMonth)).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
                          {Array(getDaysInMonth(currentMonth)).fill(null).map((_, i) => {
                            const day = i + 1;
                            const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0];
                            const isSelected = checkIn === dateStr || checkOut === dateStr;
                            const isPast = new Date(dateStr) < new Date().setHours(0, 0, 0, 0);
                            return (
                              <button
                                key={day}
                                onClick={() => !isPast && handleDateSelect(day)}
                                disabled={isPast}
                                className={`h-8 flex items-center justify-center text-xs font-medium rounded-xl transition-all ${isSelected ? "bg-amber-500 text-white" : isPast ? "text-gray-300 cursor-not-allowed" : "hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-500 dark:text-gray-300"}`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                        <button onClick={() => setShowCalendar(false)} className="mt-4 w-full text-center text-xs font-bold text-amber-500 py-2 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-xl transition-colors">
                          Done
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Duration display */}
                {h?.pricing?.basePricePerNight && (
                  <div className="flex justify-between items-center py-4 border-t border-b border-gray-50 dark:border-white/5 mb-6">
                    <span className="text-sm text-gray-500">{duration} night{duration !== 1 ? 's' : ''}</span>
                    <span className="text-xl font-black text-amber-500">
                      ₹{(h.pricing.basePricePerNight * duration).toLocaleString()}
                    </span>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleFullHotelBook}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-2xl font-bold tracking-wide transition-all duration-300 shadow-xl shadow-amber-500/30 active:scale-95"
                  >
                    Book Full Hotel
                  </button>
                  <a
                    href="#rooms-section"
                    className="w-full inline-flex items-center justify-center py-4 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-2xl font-semibold border border-gray-100 dark:border-white/5 hover:border-amber-500/30 hover:text-amber-500 transition-all duration-300"
                  >
                    View Available Rooms
                  </a>
                </div>
              </div>

              {/* Trust Card */}
              <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-3xl border border-gray-100 dark:border-white/5 space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="text-amber-500" size={20} />
                  <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">Booking Guarantee</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Shield, label: "Encrypted Payments", val: "256-bit SSL" },
                    { icon: CheckCircle, label: "Verified Property", val: "Certified" },
                    { icon: Clock, label: "24/7 Support", val: "Always Available" }
                  ].map((item, i) => (
                    <div key={`trust-${i}`} className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                        <item.icon size={14} className="text-amber-500" />
                        {item.label}
                      </div>
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Rooms Section */}
        {hotelRooms.length > 0 && (
          <section id="rooms-section" className="py-20 border-t border-gray-100 dark:border-white/5 mt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.35em] block mb-2">Available</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Rooms & <span className="text-amber-500">Suites</span>
                </h2>
              </div>
              {hotelRooms.length > 3 && (
                <button
                  onClick={() => navigate(`/rooms?hotelId=${id}`)}
                  className="group flex items-center gap-2 px-6 py-3 bg-gray-50 dark:bg-white/5 rounded-2xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-amber-500 transition-all border border-gray-100 dark:border-white/5 hover:border-amber-500/30"
                >
                  View All Rooms <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayRoomsLimit.map((room) => (
                <div key={room._id} className="group bg-white dark:bg-[#111] rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={room.images?.[0] || room.image || activeImage}
                      alt={room.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90">
                      <Users size={12} className="text-amber-400" />
                      <span className="text-xs font-medium">{room.maxAdults} Adults, {room.maxChildren} Children</span>
                    </div>
                    {room.availableRooms <= 0 && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold">
                        Fully Booked
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <Bed size={12} className="text-amber-500" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{room.bedType || "King"} Bed</span>
                      {room.roomSize && (
                        <>
                          <span className="text-gray-200 dark:text-gray-700">•</span>
                          <span className="text-[10px] text-gray-400">{room.roomSize} ft²</span>
                        </>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-amber-500 transition-colors line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {room.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-5 leading-relaxed">
                      {room.description || "A beautifully appointed room with premium amenities."}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-gray-400 block">Per night</span>
                        <span className="text-xl font-black text-gray-900 dark:text-white">
                          {room.basePrice ? `₹${room.basePrice.toLocaleString()}` : "Contact Us"}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRoomBook(room)}
                        disabled={room.availableRooms <= 0}
                        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-amber-500/30 active:scale-95"
                      >
                        {room.availableRooms <= 0 ? "Unavailable" : "Book Now"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default SingleHotel;
