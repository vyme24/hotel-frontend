import { useMemo, useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { MapPin, Star, Search as SearchIcon, ArrowRight, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetHotelsQuery, useGetRoomsQuery } from "../../redux/apiSlice";
import EmptyState from "../../components/ui/EmptyState";
import { SkeletonGrid } from "../../components/Loader/Loader";
import { formatPrice, getPriceValue } from "../../utils/price";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const type = params.get("type") || "hotels";
  const query = params.get("query") || params.get("location") || "";
  const hotelId = params.get("hotelId");

  const [activeTab, setActiveTab] = useState(type);
  const [filterQuery, setFilterQuery] = useState(query);

  const { data: hotelsRes, isLoading: isLoadingHotels, refetch: refetchHotels } = useGetHotelsQuery(filterQuery ? { location: filterQuery } : {});
  const { data: roomsRes, isLoading: isLoadingRooms, refetch: refetchRooms } = useGetRoomsQuery(hotelId, { skip: activeTab !== "rooms" || !hotelId });

  useEffect(() => {
    setActiveTab(type);
    setFilterQuery(query);
  }, [type, query]);

  const filteredHotels = useMemo(() => {
    const hotels = hotelsRes?.hotels || [];
    if (!filterQuery) return hotels;

    return hotels.filter((hotel) =>
      [hotel.name, hotel.location?.city, hotel.address?.city]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(filterQuery.toLowerCase()))
    );
  }, [filterQuery, hotelsRes?.hotels]);

  const filteredRooms = useMemo(() => {
    const rooms = roomsRes || [];
    if (!filterQuery) return rooms;

    return rooms.filter((room) =>
      [room.name, room.type, room.roomTypeName]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(filterQuery.toLowerCase()))
    );
  }, [filterQuery, roomsRes]);

  const isLoading = activeTab === "hotels" ? isLoadingHotels : isLoadingRooms;
  const currentResults = activeTab === "hotels" ? filteredHotels : filteredRooms;

  const handleTabChange = (newTab) => {
    const nextParams = new URLSearchParams(location.search);
    nextParams.set("type", newTab);
    navigate(`/search?${nextParams.toString()}`);
  };

  const handleRetry = () => {
    if (activeTab === "hotels") {
      refetchHotels();
    } else {
      refetchRooms();
    }
  };

  return (
    <div className="bg-white dark:bg-[#050505] min-h-screen pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-20 border-b border-gray-50 dark:border-white/5 pb-14">
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 italic">
              <SearchIcon size={14} className="text-red-600" />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Search results</span>
            </div>
            <h1 className="text-4xl md:text-3xl font-black text-gray-900 dark:text-white leading-[0.9] tracking-tighter uppercase font-heading">
              Find your next stay
            </h1>
          </div>

          <div className="flex flex-col gap-6 lg:items-end flex-1 max-w-2xl">
            <div className="relative w-full group">
              <SearchIcon className="absolute left-8 top-1/2 -translate-y-1/2 text-red-600" size={20} />
              <input
                type="text"
                value={filterQuery}
                onChange={(event) => setFilterQuery(event.target.value)}
                placeholder="Search by name, city, or room type"
                className="w-full pl-20 pr-8 py-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[2.5rem] focus:border-red-600 outline-none text-base font-medium transition-all shadow-sm hover:shadow-xl dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 p-2 rounded-[2rem] border border-gray-100 dark:border-white/5">
              <button
                onClick={() => handleTabChange("hotels")}
                className={`px-10 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "hotels" ? "bg-black dark:bg-white text-white dark:text-black shadow-2xl" : "text-gray-400 hover:text-red-600"}`}
              >
                Hotels
              </button>
              <button
                onClick={() => handleTabChange("rooms")}
                className={`px-10 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "rooms" ? "bg-black dark:bg-white text-white dark:text-black shadow-2xl" : "text-gray-400 hover:text-red-600"}`}
              >
                Rooms
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <SkeletonGrid count={6} />
        ) : currentResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence>
              {currentResults.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-white dark:bg-[#0a0a0a] rounded-[3.5rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-1000 flex flex-col h-full hover:-translate-y-2"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={item.images?.[0] || item.image || (activeTab === "hotels" ? "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070" : "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=2071")}
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                    <div className="absolute top-6 right-6 bg-white/95 dark:bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/20 flex items-center gap-2 shadow-2xl">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest leading-none">
                        {Number(item.averageRating || item.rating || 4.8).toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-red-600 mb-6">
                      <MapPin size={16} strokeWidth={2} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                        {item.location?.city || item.address?.city || item.hotelName || "Prime Location"}
                      </span>
                    </div>

                    <Link to={activeTab === "hotels" ? `/hotel/${item._id}` : `/room/${item._id}`}>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-red-600 transition-colors leading-none uppercase tracking-tighter">
                        {item.name || item.roomTypeName}
                      </h3>
                    </Link>

                    <p className="text-gray-500 dark:text-gray-400 text-sm font-light leading-relaxed mb-10 line-clamp-2 h-10">
                      {item.description || "Comfortable, professionally managed stay with polished amenities and a refined guest experience."}
                    </p>

                    <div className="mt-auto pt-8 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1">Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">{formatPrice(getPriceValue(item))}</span>
                          <span className="text-[9px] font-black text-gray-400 uppercase">/night</span>
                        </div>
                      </div>
                      <Link
                        to={activeTab === "hotels" ? `/hotel/${item._id}` : `/room/${item._id}`}
                        className="w-16 h-16 rounded-[2rem] bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all duration-700 shadow-xl group/btn"
                      >
                        <ArrowRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <EmptyState
            icon={<Info size={22} />}
            title={activeTab === "rooms" && !hotelId ? "Open a hotel to view its rooms" : "No results found"}
            message={activeTab === "rooms" && !hotelId
              ? "Room search is tied to a hotel so guests always see the correct inventory for the selected property."
              : "Try a different search term, switch tabs, or reset your search to explore more stays."}
            actionLabel="Retry"
            onAction={handleRetry}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
