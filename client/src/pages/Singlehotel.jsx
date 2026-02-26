import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Share2, Award, X, MapPin, Star, ShieldCheck, Waves, Coffee, Utensils, Wifi, ArrowRight, Bed, Users, Square, Info, Shield, CheckCircle, Zap } from "lucide-react";
import { useGetHotelByIdQuery } from "../services/hotel";
import { useGetRoomAllQuery } from "../services/room";
import { useGetReviewAllQuery } from "../services/review";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
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
      const hotelBookingItem = {
        _id: h._id,
        name: `${h.name} (Full Sanctuary)`,
        basePrice: h.pricing?.basePricePerNight || h.price || 0,
        image: h.images?.[0] || h.image,
        type: 'FULL_HOTEL',
        duration: duration,
        checkIn: checkIn,
        checkOut: checkOut
      };

      const isAlreadyInCart = items.find(item => item._id === h._id);
      if (isAlreadyInCart) {
        toast.success("Sanctuary is already in your selection.");
        navigate('/cart');
        return;
      }

      dispatch(addToCart(hotelBookingItem));
      toast.success("Full sanctuary added to selection.");
      navigate('/cart');
    });
  };

  const handleRoomBook = (room) => {
    handleAuthorizedAction(() => {
      if (room.availableRooms <= 0) {
        toast.error("This masterpiece is currently fully reserved.");
        return;
      }

      const isAlreadyInCart = items.find(item => item._id === room._id);
      if (isAlreadyInCart) {
        toast.success("Suite is waiting in your selection.");
        navigate('/cart');
        return;
      }

      const roomWithDates = { ...room, checkIn, checkOut, duration };
      dispatch(addToCart(roomWithDates));
      toast.success("Suite added to selection.");
      navigate('/cart');
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505]">
        <div className="flex flex-col items-center gap-8">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] animate-pulse italic">Designing your elite stay...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505] px-6">
        <div className="max-w-md w-full p-12 bg-white dark:bg-[#0a0a0a] rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl text-center">
          <ChevronLeft className="text-red-600 mx-auto mb-8" size={20} />
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">Location Lost</h2>
          <p className="text-gray-500 mb-10 font-light italic leading-relaxed text-sm">"Even the finest destinations occasionally vanish. Let us guide you back."</p>
          <button onClick={() => navigate(-1)} className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl active:scale-95 transition-all">Return to Discovery</button>
        </div>
      </div>
    );
  }

  const h = data?.data;
  const hotelImages = h?.images || [h?.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"];
  const displayRoomsLimit = hotelRooms.slice(0, 3);

  return (
    <div className="bg-white dark:bg-[#050505] min-h-screen pt-24">
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Visual Asset Module (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="h-[500px] w-full rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-2xl bg-gray-50 dark:bg-white/5">
              <img src={activeImage} alt={h?.name} className="w-full h-full object-cover transition-all duration-1000" />
            </div>

            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-4">
              {hotelImages.map((img, i) => (
                <button
                  key={`hotel-img-${i}`}
                  onClick={() => setActiveImage(img)}
                  className={`w-28 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === img ? 'border-red-600' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`View ${i}`} />
                </button>
              ))}
            </div>

            {/* Content Core */}
            <div className="space-y-12 py-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                    <Star size={10} className="inline-block mr-1.5 fill-white mb-0.5" />
                    {h?.starRating || "0.0"} | {h?.propertyType}
                  </div>
                  <div className="flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-widest italic">
                    <MapPin size={14} /> {h?.address?.city}, {h?.address?.state}, {h?.address?.country}
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none italic">
                  {h?.brand && <span className="text-gray-400 font-light mr-2 italic">{h.brand}</span>}
                  {h?.name}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-light italic leading-relaxed text-base max-w-2xl">
                  {h?.description}
                </p>
              </div>

              {/* Amenities Index */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-gray-100 dark:border-white/5">
                {h?.amenities?.map((amenity, i) => (
                  <div key={`amenity-${i}`} className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-red-600 group-hover:text-white transition-all">
                      <ShieldCheck size={20} strokeWidth={1} />
                    </div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{amenity}</span>
                  </div>
                ))}
              </div>

              {/* Policies & Contact Module */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-20 border-t border-gray-100 dark:border-white/5">
                <div className="space-y-8">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-red-600 italic">Property Policies</h3>
                  <div className="space-y-6">
                    {[
                      { label: "Check-in Protocol", val: h?.policies?.checkInTime },
                      { label: "Checkout Cycle", val: h?.policies?.checkOutTime },
                      { label: "Cancellation", val: h?.policies?.cancellationPolicy },
                      { label: "Pets", val: h?.policies?.petPolicy },
                      { label: "Smoking", val: h?.policies?.smokingPolicy }
                    ].map((p, i) => (
                      <div key={`policy-${i}`} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-gray-400">{p.label}</span>
                        <span className="text-gray-900 dark:text-white">{p.val || "Standard"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-red-600 italic">Communication Access</h3>
                  <div className="space-y-6">
                    {[
                      { label: "Email Gateway", val: h?.contact?.email },
                      { label: "Voice Support", val: h?.contact?.phone },
                      { label: "Digital Message", val: h?.contact?.whatsapp }
                    ].map((p, i) => (
                      <div key={`contact-${i}`} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-gray-400">{p.label}</span>
                        <span className="text-gray-900 dark:text-white">{p.val || "Restricted"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Economic Settlement Module (Right Sidebar) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-28 space-y-8">
              <div className="bg-white dark:bg-[#0c0c0c] p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-xl space-y-10 group/sidebar">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/10 flex items-center justify-center text-red-600">
                      <Zap className="animate-pulse" size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-tighter italic text-gray-900 dark:text-white leading-none">Settlement Protocol</h3>
                      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Inventory Lock Guaranteed</p>
                    </div>
                  </div>
                  <div className="h-0.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 w-1/3" />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1 italic">
                        {h?.pricing?.basePricePerNight ? "Full Sanctuary Access" : (h?.priceRange?.min !== h?.priceRange?.max ? "Portfolio Range" : "Yield Per Night")}
                      </span>
                      <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter italic leading-none">
                        {h?.pricing?.basePricePerNight
                          ? `₹${h.pricing.basePricePerNight.toLocaleString()}`
                          : (h?.priceRange?.min !== h?.priceRange?.max
                            ? `₹${h?.priceRange?.min?.toLocaleString()} - ₹${h?.priceRange?.max?.toLocaleString()}`
                            : (h?.priceRange?.min ? `₹${h.priceRange.min.toLocaleString()}` : "Price Not Available")
                          )
                        }
                      </p>
                    </div>
                  </div>

                  <div className="p-8 bg-gray-50/50 dark:bg-white/[0.02] rounded-3xl border border-gray-100 dark:border-white/5 space-y-8 shadow-inner">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 relative">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Arrival</span>
                        <button
                          onClick={() => { setShowCalendar(!showCalendar || calendarType !== "checkIn"); setCalendarType("checkIn"); }}
                          className="w-full py-3 px-4 bg-white dark:bg-black rounded-xl border border-gray-100 dark:border-white/10 text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest text-left truncate"
                        >
                          {checkIn ? new Date(checkIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : "Pick Date"}
                        </button>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Departure</span>
                        <button
                          onClick={() => { setShowCalendar(!showCalendar || calendarType !== "checkOut"); setCalendarType("checkOut"); }}
                          className="w-full py-3 px-4 bg-white dark:bg-black rounded-xl border border-gray-100 dark:border-white/10 text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest text-left truncate"
                        >
                          {checkOut ? new Date(checkOut).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : "Pick Date"}
                        </button>
                      </div>

                      {showCalendar && (
                        <div ref={calendarRef} className="absolute left-0 right-0 top-full mt-4 bg-white dark:bg-[#0c0c0c] rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-white/5 p-6 z-[10000] animate-fadeIn">
                          <div className="flex items-center justify-between mb-6">
                            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="text-gray-400 hover:text-red-600 transition-colors"><ChevronLeft size={18} /></button>
                            <span className="text-[11px] font-black uppercase tracking-widest text-gray-900 dark:text-white italic">{currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}</span>
                            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="text-gray-400 hover:text-red-600 transition-colors"><ChevronRight size={18} /></button>
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-[9px] font-black text-center mb-4">
                            {["S", "M", "T", "W", "T", "F", "S"].map(d => <div key={d} className="text-gray-300 py-2">{d}</div>)}
                          </div>
                          <div className="grid grid-cols-7 gap-1">
                            {Array(getFirstDayOfMonth(currentMonth)).fill(null).map((_, i) => <div key={i} />)}
                            {Array(getDaysInMonth(currentMonth)).fill(null).map((_, i) => {
                              const day = i + 1;
                              const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0];
                              const isSelected = checkIn === dateStr || checkOut === dateStr;
                              return (
                                <button
                                  key={day}
                                  onClick={() => handleDateSelect(day)}
                                  className={`aspect-square flex items-center justify-center text-[10px] font-black rounded-xl transition-all ${isSelected ? "bg-red-600 text-white shadow-lg" : "text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600"}`}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>
                          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                            <span className="text-[8px] font-bold text-gray-400 uppercase italic">Selection Protocol Active</span>
                            <button onClick={() => setShowCalendar(false)} className="text-[9px] font-black text-red-600 uppercase tracking-widest">Close</button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="h-px bg-gray-200/50 dark:bg-white/5" />
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{duration} Night Valuation</span>
                      <span className="text-2xl font-black text-red-600 tracking-tighter italic leading-none">
                        ₹{(((h?.pricing?.basePricePerNight || h?.price || 0)) * duration).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <button
                    onClick={handleFullHotelBook}
                    className="w-full py-6 bg-red-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all duration-700 shadow-2xl shadow-red-600/20 active:scale-95"
                  >
                    Book Full Hotel
                  </button>
                  <a
                    href="#suites"
                    className="w-full inline-flex items-center justify-center py-6 bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[10px] border border-gray-100 dark:border-white/5 hover:border-red-600/30 hover:text-red-600 transition-all duration-700"
                  >
                    View Rooms
                  </a>
                </div>
              </div>

              {/* Trust Index */}
              <div className="bg-gray-50 dark:bg-white/5 p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 space-y-8">
                <div className="flex items-center gap-4">
                  <Award className="text-red-600" size={20} />
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400">Security Standard</h4>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: Shield, label: "Encrypted Payments", val: "Verified" },
                    { icon: CheckCircle, label: "Safety Protocol", val: "Elite Tier" },
                    { icon: Info, label: "Concierge 24/7", val: "Active" }
                  ].map((item, i) => (
                    <div key={`trust-${i}`} className="flex justify-between items-center text-[10px] font-bold uppercase">
                      <div className="flex items-center gap-2 text-gray-400">
                        <item.icon size={14} className="text-red-600" /> {item.label}
                      </div>
                      <span className="text-gray-900 dark:text-white tracking-widest">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suites Inventory Sequence - RESTRICTED PREVIEW */}
        <section id="suites" className="py-32 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] italic">Portfolio Preview</span>
              <h2 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none italic">
                Signature <span className="text-gray-400 font-light">Suites</span>
              </h2>
            </div>
            <button
              onClick={() => navigate(`/rooms?hotelId=${id}`)}
              className="group flex items-center gap-4 px-10 py-5 bg-gray-50 dark:bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-600 transition-all border border-transparent hover:border-red-600/20"
            >
              View Full Inventory <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayRoomsLimit.map((room) => (
              <div key={room._id} className="group bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col">
                <div className="p-4">
                  {/* EXACTLY 3 IMAGES GRID */}
                  <div className="grid grid-cols-3 gap-3 h-52">
                    <div className="col-span-2 h-full rounded-2xl overflow-hidden relative">
                      <img src={room.images?.[0] || room.image || activeImage} alt={room.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms]" />
                    </div>
                    <div className="flex flex-col gap-3 h-full">
                      <div className="h-[calc(50%-6px)] rounded-xl overflow-hidden">
                        <img src={room.images?.[1] || room.images?.[0] || activeImage} className="w-full h-full object-cover" />
                      </div>
                      <div className="h-[calc(50%-6px)] rounded-xl overflow-hidden">
                        <img src={room.images?.[2] || room.images?.[0] || activeImage} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-4 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[7px] font-black text-red-600 uppercase tracking-widest italic">{room.roomTypeCode} | {room.roomTypeName || "Elite Suite"}</span>
                    <div className="flex items-center gap-1 text-red-600">
                      <Star size={8} fill="currentColor" />
                      <span className="text-[9px] font-black">Elite</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight italic mb-2 group-hover:text-red-600 transition-colors uppercase truncate">{room.name}</h4>
                  <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-6 italic">{room.bedType} Bedding</div>

                  <div className="flex items-center justify-between py-6 border-y border-black/5 dark:border-white/5 mb-8">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Square size={14} />
                      <span className="text-[9px] font-black uppercase tracking-widest">{room.roomSize} FT²</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users size={14} />
                      <span className="text-[9px] font-black uppercase tracking-widest">{room.maxAdults}A / {room.maxChildren}C</span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1 italic">Nightly Rate</span>
                      <p className="text-2xl font-black tracking-tighter italic">
                        {room.basePrice ? `₹${room.basePrice.toLocaleString()}` : "Price Not Available"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRoomBook(room)}
                      className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[9px] hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all duration-500 shadow-xl"
                    >
                      Plan Stay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SingleHotel;
