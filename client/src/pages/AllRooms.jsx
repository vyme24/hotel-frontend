import React, { useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGetRoomAllQuery } from "../services/room";
import { Bed, Users, Square, Star, ArrowRight, Zap, Info, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AllRooms = () => {
    const { data, isFetching, isLoading, isError } = useGetRoomAllQuery();
    const navigate = useNavigate();
    const location = useLocation();
    const [visibleCount, setVisibleCount] = useState(6);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeType, setActiveType] = useState("All");

    const rooms = useMemo(() => {
        let list = data?.data?.filter(r => r.status === 'active') ?? [];

        // Hotel ID filter from query params
        const params = new URLSearchParams(location.search);
        const hotelId = params.get('hotelId');
        if (hotelId) {
            list = list.filter(r => r.hotelId === hotelId || r.hotelId?._id === hotelId);
        }

        if (searchQuery) {
            list = list.filter(r =>
                r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.roomTypeCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.hotelName?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (activeType !== "All") {
            list = list.filter(r => r.roomTypeName === activeType);
        }

        return list;
    }, [data, searchQuery, activeType, location.search]);

    const displayedRooms = useMemo(() => {
        return rooms.slice(0, visibleCount);
    }, [rooms, visibleCount]);

    const roomTypes = useMemo(() => {
        const types = new Set(["All"]);
        data?.data?.forEach(r => {
            if (r.roomTypeName) types.add(r.roomTypeName);
        });
        return Array.from(types);
    }, [data]);

    if (isLoading || isFetching)
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-[#050505]">
                <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-8"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 animate-pulse italic">Aligning Sanctuary Inventory...</p>
            </div>
        );

    return (
        <section className="bg-white dark:bg-[#050505] min-h-screen">
            {/* Cinematic Background Sequence */}
            <div className="relative h-[60vh] w-full overflow-hidden flex items-center">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=2071"
                        alt="Rooms Portfolio"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-20">
                    <div className="max-w-3xl space-y-10">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
                            <Zap size={14} className="text-red-600 animate-pulse" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Elite Units Active</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                            Explore <span className="italic outline-text">Suites</span>
                        </h1>
                        <p className="text-white/60 text-xl font-light tracking-wide max-w-xl font-body italic leading-relaxed">
                            "A catalog of meticulously engineered living spaces. Each suite is a testament to structural clarity and curated comfort."
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-40">

                {/* Control Interlink */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16 mb-32">
                    <div className="space-y-4">
                        <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em] block mb-2">Inventory Discovery</span>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter font-heading leading-none">
                            {rooms.length} SUITES <span className="text-gray-400 font-light italic">VERIFIED</span>
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8 flex-1 max-w-3xl">
                        <div className="relative flex-1 group w-full">
                            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-red-600" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Filter by hotel, type or code..."
                                className="w-full pl-20 pr-8 py-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[2.5rem] focus:border-red-600 outline-none text-base font-medium italic transition-all shadow-sm hover:shadow-xl dark:text-white"
                            />
                        </div>

                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 p-2 rounded-[2rem] border border-gray-100 dark:border-white/5 overflow-x-auto no-scrollbar max-w-full">
                            {roomTypes.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setActiveType(type)}
                                    className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeType === type ? "bg-black dark:bg-white text-white dark:text-black shadow-2xl" : "text-gray-400 hover:text-red-600"}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {rooms.length === 0 ? (
                    <div className="text-center py-40 bg-gray-50 dark:bg-white/5 rounded-[5rem] border border-dashed border-gray-200 dark:border-white/10 px-8">
                        <div className="w-24 h-24 bg-white dark:bg-black rounded-[2.5rem] shadow-sm flex items-center justify-center mx-auto mb-10 text-red-600">
                            <Info size={24} />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">No data available <span className="italic text-gray-400">yet.</span></h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-sm mx-auto font-light leading-relaxed italic">"The sanctuary vaults are currently being replenished. Check back soon for exclusive new room availability."</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveType("All") }}
                            className="bg-black dark:bg-white text-white dark:text-black px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all duration-700 active:scale-95"
                        >
                            Reset Parameters
                        </button>
                    </div>
                ) : (
                    <div className="space-y-20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <AnimatePresence>
                                {displayedRooms.map((room, index) => (
                                    <motion.div
                                        key={room._id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                        className="group bg-white dark:bg-[#121212] rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col h-full hover:-translate-y-2 cursor-pointer"
                                        onClick={() => navigate(`/room/${room._id}`)}
                                    >
                                        {/* Media Asset Section */}
                                        <div className="relative aspect-square overflow-hidden">
                                            <img
                                                src={room.images?.[0] || room.image || "/images/no-room.png"}
                                                alt={room.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms]"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />

                                            <div className="absolute top-5 left-5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[7px] font-black text-white uppercase tracking-[0.3em] border border-white/10 shadow-lg">
                                                {room.roomTypeCode} | {room.roomTypeName || "Master Unit"}
                                            </div>


                                        </div>

                                        {/* Data Core Section */}
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-[0.2em] text-[8px] mb-4">
                                                <Users size={10} strokeWidth={3} /> {room.maxAdults} Adults, {room.maxChildren} Children
                                            </div>

                                            <Link to={`/room/${room._id}`}>
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-tight mb-2 group-hover:text-red-600 transition-colors line-clamp-1 italic">
                                                    {room.name}
                                                </h3>
                                            </Link>

                                            <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-4 italic">
                                                {room.bedType} Bedding
                                            </div>

                                            <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 italic leading-relaxed">
                                                {room.description}
                                            </p>

                                            {/* Financial Protocol */}
                                            <div className="mt-auto pt-6 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest block italic">Nightly Rate</span>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter italic leading-none">
                                                            {room.basePrice ? `₹${room.basePrice.toLocaleString()}` : "Price Not Available"}
                                                        </span>
                                                        <span className="text-[8px] font-bold text-gray-400">/night</span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => navigate(`/room/${room._id}`)}
                                                    className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-95"
                                                >
                                                    <ArrowRight size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination Trigger */}
                        {visibleCount < rooms.length && (
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 6)}
                                    className="group flex items-center gap-3 px-12 py-6 bg-black dark:bg-white text-white dark:text-black rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all duration-700 active:scale-95"
                                >
                                    Unlock More Sanctuaries <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .outline-text {
                    -webkit-text-stroke: 1px white;
                    color: transparent;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </section>
    );
};

export default AllRooms;
