import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Heart, Share2, Award, X, Users, Bed, Square, ShieldCheck, Sparkles, ArrowRight, Waves, Wind, Coffee, Zap, Info, Shield, CheckCircle } from "lucide-react";
import { useGetRoomByIdQuery } from "../services/room";
import { useGetReviewAllQuery } from "../services/review";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import toast from "react-hot-toast";

const SingleRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { handleAuthorizedAction } = useAuthCheck();
  const { data, isLoading, isError } = useGetRoomByIdQuery(id);
  const { data: reviewsData } = useGetReviewAllQuery();
  const [activeImage, setActiveImage] = useState("");
  const [duration, setDuration] = useState(1);

  const roomReviews = reviewsData?.data?.filter(review => review.roomId?._id === id || review.bookingId?.roomId?._id === id) || [];

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
    handleAuthorizedAction(() => {
      if (data?.data) {
        const r = data.data;
        if (r.availableRooms <= 0) {
          toast.error("This masterpiece is currently fully reserved.");
          return;
        }

        const isAlreadyInCart = items.find(item => item._id === r._id);
        if (isAlreadyInCart) {
          toast.success("Suite is waiting in your selection.");
          navigate('/cart');
          return;
        }

        dispatch(addToCart(r));
        toast.success("Suite added to selection.");
        navigate('/cart');
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505]">
        <div className="flex flex-col items-center gap-8">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] animate-pulse italic">Initializing your suite...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505] px-6">
        <div className="max-w-md w-full p-12 bg-white dark:bg-gray-900 rounded-[3rem] text-center border border-gray-100 dark:border-white/5 shadow-2xl">
          <X className="text-red-600 mx-auto mb-8" size={20} />
          <h2 className="text-2xl font-black text-black dark:text-white mb-4 uppercase tracking-tighter">Suite Unavailable</h2>
          <p className="text-gray-500 mb-10 font-light italic leading-relaxed text-sm">"Even the most coveted sanctuaries sometimes require restoration. Let us find you another."</p>
          <button onClick={() => navigate(-1)} className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl active:scale-95 transition-all">Explore Other Rooms</button>
        </div>
      </div>
    );
  }

  const r = data?.data;
  const roomImages = r?.images || [r?.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"];

  return (
    <div className="bg-white dark:bg-[#050505] min-h-screen pt-24">
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Gallery Module (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="h-[500px] w-full rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-2xl bg-gray-50 dark:bg-white/5">
              <img src={activeImage} alt={r?.name} className="w-full h-full object-cover transition-all duration-1000" />
            </div>

            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-4">
              {roomImages.map((img, i) => (
                <button
                  key={`img-${i}`}
                  onClick={() => setActiveImage(img)}
                  className={`w-28 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === img ? 'border-red-600' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`View ${i}`} />
                </button>
              ))}
            </div>

            {/* Information Hub */}
            <div className="space-y-12 py-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {r?.roomTypeCode} | {r?.roomTypeName || "Master Suite Collection"}
                  </div>
                  <div className="flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-widest italic">
                    <Sparkles size={14} className="animate-pulse" /> Elite Inventory 2026
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none italic">
                  {r?.name}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-light italic leading-relaxed text-base max-w-2xl">
                  {r?.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-gray-100 dark:border-white/5">
                {[
                  { icon: Square, label: "Floor Area", val: `${r?.roomSize || "0"} FT²` },
                  { icon: Users, label: "Capacity", val: `${r?.maxAdults || "0"}A / ${r?.maxChildren || "0"}C` },
                  { icon: Bed, label: "Bedding", val: r?.bedType || "N/A" },
                  { icon: ShieldCheck, label: "Status", val: r?.availableRooms > 0 ? "AVAILABLE" : "OCCUPIED" }
                ].map((spec, i) => (
                  <div key={i} className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-red-600 group-hover:text-white transition-all">
                      <spec.icon size={20} strokeWidth={1} />
                    </div>
                    <div>
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1">{spec.label}</span>
                      <span className="text-[10px] font-black tracking-widest uppercase">{spec.val}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Amenities List */}
              <div className="pt-10 border-t border-gray-100 dark:border-white/5">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-red-600 italic mb-8">Suite Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {r?.amenities?.map((a, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle size={14} className="text-red-600" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Settlement Control Module (Right) */}
          <div className="lg:col-span-5">
            <div className="space-y-8">
              <div className="bg-white dark:bg-[#0c0c0c] p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-xl space-y-10 group/sidebar">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/10 flex items-center justify-center text-red-600">
                      <Zap className="animate-pulse" size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-tighter italic text-gray-900 dark:text-white leading-none font-heading">Secure Sanctuary</h3>
                      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Live Inventory Protocol</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-10 pt-8 border-t border-gray-100 dark:border-white/5">
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic block">Base Yield / Night</span>
                        <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter italic leading-none">
                          {r?.basePrice ? `₹${r.basePrice.toLocaleString()}` : "Price Not Available"}
                        </p>
                      </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1">Extra Adult</span>
                        <span className="text-[10px] font-black text-gray-900 dark:text-white">₹{r?.extraAdultPrice?.toLocaleString() || "0"}</span>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1">Extra Child</span>
                        <span className="text-[10px] font-black text-gray-900 dark:text-white">₹{r?.extraChildPrice?.toLocaleString() || "0"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-gray-50/50 dark:bg-white/[0.02] rounded-3xl border border-gray-100 dark:border-white/5 space-y-8 shadow-inner">
                    <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <span>Stay Duration</span>
                      <div className="flex items-center gap-4 bg-white dark:bg-black p-1.5 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <button onClick={() => setDuration(Math.max(1, duration - 1))} className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center justify-center text-gray-400 hover:text-red-600 transition-all font-black">-</button>
                        <span className="text-sm font-black w-4 text-center text-gray-900 dark:text-white">{duration}</span>
                        <button onClick={() => setDuration(duration + 1)} className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center justify-center text-gray-400 hover:text-red-600 transition-all font-black">+</button>
                      </div>
                    </div>
                    <div className="h-px bg-gray-200/50 dark:bg-white/5" />
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Valuation</span>
                      <span className="text-2xl font-black text-red-600 tracking-tighter italic leading-none">₹{(r?.basePrice * duration).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full py-6 bg-red-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all duration-700 shadow-2xl shadow-red-600/20 active:scale-95"
                >
                  Book Now
                </button>

                <div className="flex justify-center gap-4 pt-4">
                  {[1, 2, 3].map(i => <div key={`indicator-${i}`} className={`w-1 h-1 rounded-full ${i === 1 ? 'bg-red-600 animate-pulse' : 'bg-gray-200 dark:bg-white/10'}`} />)}
                </div>
              </div>

              {/* Security Index */}
              <div className="bg-gray-50 dark:bg-white/5 p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 space-y-6">
                <div className="flex items-center gap-4">
                  <Shield className="text-red-600" size={24} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Security Parameters</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Check-in Protocol", val: "14:00" },
                    { label: "Cancellation Cycle", val: "24h Flex" },
                    { label: "Payment Standard", val: "Encrypted" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      <span>{item.label}</span>
                      <span className="text-gray-900 dark:text-white">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Feedback Loop */}
        <section id="reviews" className="py-32 border-t border-black/5 dark:border-white/5 mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] italic">Guest Chronology</span>
              <h2 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none italic">
                Verified <span className="text-gray-400 font-light">Experiences</span>
              </h2>
            </div>
          </div>

          {roomReviews.length === 0 ? (
            <div className="p-20 bg-gray-50 dark:bg-white/5 rounded-[4rem] text-center border border-dashed border-gray-200 dark:border-white/10">
              <p className="text-sm font-light italic text-gray-400">"The narrative of this sanctuary is yet to be written."</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {roomReviews.map((review, i) => (
                <div key={review._id} className="p-10 bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-700 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white font-black uppercase">{review.userId?.name?.charAt(0) || "G"}</div>
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-tight italic">{review.userId?.name || "Premium Guest"}</h4>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-red-600">
                      <Sparkles size={12} fill="currentColor" />
                      <span className="text-xs font-black">{review.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm italic leading-relaxed">"{review.comment}"</p>
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