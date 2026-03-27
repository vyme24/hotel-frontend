import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShieldCheck, Zap, Info } from "lucide-react";
import { useGetHotelsQuery } from "../../redux/apiSlice";
import HotelCard from "../../components/HotelCard/HotelCard";
import { SkeletonGrid } from "../../components/Loader/Loader";
import EmptyState from "../../components/ui/EmptyState";
import { STORAGE_KEYS, readStorage } from "../../utils/storage";

const Wishlist = () => {
  const navigate = useNavigate();
  const wishlistIds = readStorage(STORAGE_KEYS.wishlist, []);
  const { data, isLoading, refetch } = useGetHotelsQuery();

  const favorites = useMemo(() => {
    const hotels = data?.hotels || [];
    return hotels.filter((hotel) => wishlistIds.includes(hotel._id));
  }, [data?.hotels, wishlistIds]);

  return (
    <section className="bg-white dark:bg-[#050505] min-h-screen pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 border-b border-gray-50 dark:border-white/5 pb-12">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 italic">
              <Heart size={14} className="text-red-600" />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Saved stays</span>
            </div>
            <h1 className="text-4xl md:text-3xl font-black text-gray-900 dark:text-white leading-[0.85] tracking-tighter uppercase font-heading">
              My Wishlist
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed">
              Revisit the hotels you saved and continue your booking journey from where you left off.
            </p>
          </div>
          <div className="px-8 py-4 bg-gray-900 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3">
            <Zap size={14} className="text-red-500" /> {favorites.length} saved hotel{favorites.length !== 1 ? "s" : ""}
          </div>
        </div>

        {isLoading ? (
          <SkeletonGrid count={6} />
        ) : favorites.length === 0 ? (
          <EmptyState
            icon="♡"
            title="Your wishlist is empty"
            message="Save hotels you love from the listing page and they will appear here automatically."
            actionLabel="Explore hotels"
            onAction={() => navigate("/hotels")}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {favorites.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}

        {wishlistIds.length > 0 && favorites.length === 0 && !isLoading ? (
          <div className="mt-10">
            <EmptyState
              icon="!"
              title="Saved hotels are temporarily unavailable"
              message="We found wishlist items in your browser, but could not match them with live hotel data."
              actionLabel="Retry"
              onAction={refetch}
            />
          </div>
        ) : null}

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: ShieldCheck, title: "Saved locally", desc: "Wishlist items stay available even after refresh through browser persistence." },
            { icon: Info, title: "Quick revisit", desc: "Jump back into hotel details and room selection from one place." },
            { icon: Zap, title: "Ready to book", desc: "Move from wishlist to hotel details and room booking in a single click." },
          ].map((feature) => (
            <div key={feature.title} className="flex gap-8 group">
              <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-red-600 flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all duration-700">
                <feature.icon size={24} />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-black uppercase tracking-tight text-gray-900 dark:text-white">{feature.title}</h4>
                <p className="text-[11px] text-gray-400 font-light leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
