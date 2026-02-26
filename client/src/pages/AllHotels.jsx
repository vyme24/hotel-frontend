import React, { useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGetHotelAllQuery } from "../services/hotel";
import { MapPin, Star, Wifi, Coffee, Car, Waves, ArrowRight, Search, SlidersHorizontal, Info, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AllHotels = () => {
    const { data, isFetching, isLoading, isError } = useGetHotelAllQuery();
    const location = useLocation();
    const navigate = useNavigate();

    // Parse category from URL if any
    const queryParams = new URLSearchParams(location.search);
    const categoryFilter = queryParams.get("category");

    const [visibleCount, setVisibleCount] = useState(6);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState(categoryFilter || "All");

    const hotels = useMemo(() => {
        let list = data?.data?.filter(h => h.status === 'active') ?? [];

        if (searchQuery) {
            list = list.filter(h =>
                h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                h.address?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                h.address?.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                h.propertyType?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (activeCategory !== "All") {
            list = list.filter(h => h.propertyType === activeCategory);
        }

        return list;
    }, [data, searchQuery, activeCategory]);

    const displayedHotels = useMemo(() => {
        return hotels.slice(0, visibleCount);
    }, [hotels, visibleCount]);

    if (isLoading || isFetching)
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-[#050505]">
                <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-8"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 animate-pulse italic">Scanning Strategic Inventory...</p>
            </div>
        );

    return (
        <section className="bg-white dark:bg-[#050505] min-h-screen">
            {/* Premium Hero Banner */}
            <div className="relative h-[70vh] w-full overflow-hidden flex items-center">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070"
                        alt="Hotels Banner"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-20">
                    <div className="max-w-3xl space-y-10">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
                            <Zap size={14} className="text-red-600 animate-pulse" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Global Portfolio 2026</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                            Discover <span className="italic outline-text">Collections</span>
                        </h1>
                        <p className="text-white/60 text-xl font-light tracking-wide max-w-xl font-body italic leading-relaxed">
                            "A curated sequence of architectural masterpieces. Explore the intersection of structural discipline and legendary comfort."
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-40">

                {/* Advanced Control System */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16 mb-32 transition-all">
                    <div className="space-y-4">
                        <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em] block mb-2">Protocol Status</span>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter font-heading leading-none">
                            {hotels.length} ACTIVE <span className="text-gray-400 font-light italic">IDENTIFIERS</span>
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8 flex-1 max-w-3xl">
                        <div className="relative flex-1 group w-full">
                            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-red-600 transition-transform group-focus-within:scale-110" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Scan city, state or property name..."
                                className="w-full pl-20 pr-8 py-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[2.5rem] focus:border-red-600 outline-none text-base font-medium italic transition-all shadow-sm hover:shadow-xl dark:text-white"
                            />
                        </div>

                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 p-2 rounded-[2rem] border border-gray-100 dark:border-white/5 whitespace-nowrap overflow-x-auto no-scrollbar max-w-full">
                            {["All", "Hotel", "Resort", "Villa", "Boutique"].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? "bg-black dark:bg-white text-white dark:text-black shadow-2xl" : "text-gray-400 hover:text-red-600"}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hotels Intelligence Grid */}
                {hotels.length === 0 ? (
                    <div className="text-center py-40 bg-gray-50 dark:bg-white/5 rounded-[5rem] border border-dashed border-gray-200 dark:border-white/10 px-8">
                        <div className="w-24 h-24 bg-white dark:bg-black rounded-[2.5rem] shadow-sm flex items-center justify-center mx-auto mb-10 text-red-600">
                            <Info size={24} />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">No data available <span className="italic text-gray-400">yet.</span></h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-sm mx-auto font-light leading-relaxed italic">"Our scouts are currently surveying new luxury territories. Please return shortly or adjust your search filters."</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveCategory("All") }}
                            className="bg-black dark:bg-white text-white dark:text-black px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all duration-700 active:scale-95"
                        >
                            Reset Sequence
                        </button>
                    </div>
                ) : (
                    <div className="space-y-20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <AnimatePresence>
                                {displayedHotels.map((hotel, index) => (
                                    <motion.div
                                        key={hotel._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                        className="group bg-white dark:bg-[#121212] rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col h-full hover:-translate-y-2 cursor-pointer"
                                        onClick={() => navigate(`/hotel/${hotel._id}`)}
                                    >
                                        {/* Sensory Media Unit */}
                                        <div className="relative aspect-square overflow-hidden">
                                            <img
                                                src={hotel.images?.[0] || hotel.image || "/images/no-hotel.png"}
                                                alt={hotel.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                            {hotel.isFeatured && (
                                                <div className="absolute top-5 left-5 bg-red-600 px-3 py-1.5 rounded-xl text-[7px] font-black text-white uppercase tracking-widest shadow-lg">
                                                    Featured
                                                </div>
                                            )}

                                            <div className="absolute top-5 right-5 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-lg">
                                                <Star size={10} className="text-red-600 fill-red-600" />
                                                <span className="text-[10px] font-black leading-none dark:text-white">{hotel.starRating || "0.0"}</span>
                                            </div>

                                            <div className="absolute bottom-5 left-5">
                                                <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-[0.2em] text-[8px]">
                                                    <MapPin size={10} strokeWidth={3} /> {hotel.address?.city}, {hotel.address?.state}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Intelligence Module */}
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="mb-4 flex items-center justify-between">
                                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest italic">{hotel.propertyType}</span>
                                                <div className="flex gap-2">
                                                    {hotel.amenities?.slice(0, 3).map((a, i) => (
                                                        <span key={i} className="text-[7px] font-bold text-gray-500 uppercase tracking-widest px-2 py-1 bg-gray-50 dark:bg-white/5 rounded-md">
                                                            {a}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <Link to={`/hotel/${hotel._id}`}>
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-tight mb-2 group-hover:text-red-600 transition-colors line-clamp-1 italic">
                                                    {hotel.name}
                                                </h3>
                                            </Link>

                                            <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 italic leading-relaxed">
                                                {hotel.description}
                                            </p>

                                            <div className="mt-auto pt-6 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest block italic">
                                                        {hotel.pricing?.basePricePerNight ? "Full Portfolio Vault" : (hotel.priceRange?.min !== hotel.priceRange?.max ? "Portfolio Range" : "Entry Valuation")}
                                                    </span>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter italic leading-none">
                                                            {hotel.pricing?.basePricePerNight
                                                                ? `₹${hotel.pricing.basePricePerNight.toLocaleString()}`
                                                                : (hotel.priceRange?.min !== hotel.priceRange?.max
                                                                    ? `₹${hotel.priceRange?.min?.toLocaleString()} - ₹${hotel.priceRange?.max?.toLocaleString()}`
                                                                    : (hotel.priceRange?.min ? `₹${hotel.priceRange.min.toLocaleString()}` : "Price Not Available")
                                                                )
                                                            }
                                                        </span>
                                                        <span className="text-[8px] font-bold text-gray-400">/night</span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => navigate(`/hotel/${hotel._id}`)}
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
                        {visibleCount < hotels.length && (
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 6)}
                                    className="group flex items-center gap-3 px-12 py-6 bg-black dark:bg-white text-white dark:text-black rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all duration-700 active:scale-95"
                                >
                                    Access More Properties <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
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

export default AllHotels;
