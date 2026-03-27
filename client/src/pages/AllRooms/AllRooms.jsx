import React, { useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGetRoomAllQuery } from "../../services/room";
import { Bed, Users, Square, Star, ArrowRight, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AllRooms = () => {
    const { data, isFetching, isLoading } = useGetRoomAllQuery();
    const navigate = useNavigate();
    const location = useLocation();
    const [visibleCount, setVisibleCount] = useState(8);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeType, setActiveType] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    const rooms = useMemo(() => {
        let list = data?.data?.filter(r => r.status === 'active') ?? [];

        const params = new URLSearchParams(location.search);
        const hotelId = params.get('hotelId');
        if (hotelId) {
            list = list.filter(r => r.hotelId === hotelId || r.hotelId?._id === hotelId);
        }

        if (searchQuery) {
            list = list.filter(r =>
                r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.roomTypeCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.roomTypeName?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (activeType !== "All") {
            list = list.filter(r => r.roomTypeName === activeType);
        }

        if (sortBy === "price_low") {
            list = [...list].sort((a, b) => (a.basePrice || 0) - (b.basePrice || 0));
        } else if (sortBy === "price_high") {
            list = [...list].sort((a, b) => (b.basePrice || 0) - (a.basePrice || 0));
        }

        return list;
    }, [data, searchQuery, activeType, location.search, sortBy]);

    const displayedRooms = useMemo(() => rooms.slice(0, visibleCount), [rooms, visibleCount]);

    const roomTypes = useMemo(() => {
        const types = new Set(["All"]);
        data?.data?.forEach(r => { if (r.roomTypeName) types.add(r.roomTypeName); });
        return Array.from(types);
    }, [data]);

    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-[#050505]">
                <div className="relative mb-8">
                    <div className="w-20 h-20 border-4 border-amber-500/20 rounded-full" />
                    <div className="absolute top-0 left-0 w-20 h-20 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-widest uppercase animate-pulse">
                    Loading Rooms...
                </p>
            </div>
        );
    }

    return (
        <section className="bg-white dark:bg-[#050505] min-h-screen">

            {/* Hero Banner */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=2070"
                        alt="Luxury Rooms"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-sm mb-5">
                        <Star size={10} className="text-amber-400 fill-amber-400" />
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-[0.3em]">Curated Accommodations</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Signature <span className="text-amber-400">Rooms</span>
                    </h1>
                    <p className="text-white/70 text-lg font-light max-w-xl leading-relaxed">
                        Individually designed rooms and suites crafted for ultimate comfort and unparalleled luxury.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* Search & Filter Bar */}
                <div className="bg-white dark:bg-[#111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl p-6 mb-12 -mt-10 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">

                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by room name or type..."
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl text-sm font-medium outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all dark:text-white placeholder:text-gray-400"
                            />
                        </div>

                        {/* Room Type Filter Pills */}
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                            {roomTypes.slice(0, 5).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => { setActiveType(type); setVisibleCount(8); }}
                                    className={`px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${activeType === type
                                        ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                                        : "bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-amber-900/10 hover:text-amber-500"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none pl-4 pr-10 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 outline-none focus:border-amber-500/50 cursor-pointer whitespace-nowrap"
                            >
                                <option value="default">Default</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-2xl font-black text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {rooms.length} <span className="text-amber-500">Rooms</span> Available
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            {activeType !== "All" ? `Showing ${activeType}` : "All room types"}
                            {searchQuery && ` matching "${searchQuery}"`}
                        </p>
                    </div>
                </div>

                {/* Rooms Grid */}
                {rooms.length === 0 ? (
                    <div className="text-center py-28 bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                        <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Search size={28} className="text-amber-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No Rooms Found</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                            Try adjusting your search or explore all available rooms.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveType("All"); }}
                            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-amber-500/30 active:scale-95"
                        >
                            View All Rooms
                        </button>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <AnimatePresence>
                                {displayedRooms.map((room, index) => (
                                    <motion.div
                                        key={room._id}
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                        onClick={() => navigate(`/room/${room._id}`)}
                                        className="group bg-white dark:bg-[#111] rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col cursor-pointer"
                                    >
                                        {/* Image */}
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={room.images?.[0] || room.image || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800"}
                                                alt={room.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                                <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                                                    {room.roomTypeName || "Suite"}
                                                </span>
                                            </div>

                                            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90">
                                                <Users size={12} className="text-amber-400" />
                                                <span className="text-[11px] font-medium">{room.maxAdults} Adults, {room.maxChildren} Children</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Bed size={12} className="text-amber-500" />
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{room.bedType || "King"} Bed</span>
                                                {room.roomSize && (
                                                    <>
                                                        <span className="text-gray-200 dark:text-gray-700">•</span>
                                                        <Square size={10} className="text-gray-400" />
                                                        <span className="text-[10px] text-gray-400">{room.roomSize} ft²</span>
                                                    </>
                                                )}
                                            </div>

                                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                                                {room.name}
                                            </h3>

                                            <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                                                {room.description || "A beautifully appointed room designed for luxury and comfort."}
                                            </p>

                                            {/* Price & CTA */}
                                            <div className="mt-auto pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                                                <div>
                                                    <span className="text-[9px] text-gray-400 block">Per night</span>
                                                    <span className="text-lg font-black text-gray-900 dark:text-white">
                                                        {room.basePrice ? `₹${room.basePrice.toLocaleString()}` : "Contact Us"}
                                                    </span>
                                                </div>
                                                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                                                    <ArrowRight size={18} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Load More */}
                        {visibleCount < rooms.length && (
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 8)}
                                    className="group flex items-center gap-3 px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-amber-500/30 transition-all duration-300 active:scale-95"
                                >
                                    Load More Rooms <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllRooms;
