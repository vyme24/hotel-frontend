import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetHotelAllQuery } from "../services/hotel";
import { MapPin, Star, ArrowRight, Zap } from "lucide-react";

const FeaturedHotels = () => {
    const navigate = useNavigate();
    const { data, isLoading, isFetching } = useGetHotelAllQuery();
    const hotels = useMemo(() => {
        return data?.data?.filter(h => h.status === 'active').slice(0, 4) ?? [];
    }, [data]);

    if (isLoading || isFetching) return null;

    return (
        <section className="py-24 bg-white dark:bg-[#050505] border-b border-gray-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Sequence */}
                <div className="flex items-end justify-between mb-12 border-b border-gray-100 dark:border-white/5 pb-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-red-600">
                            <Zap size={14} className="animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">Hotels</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">
                            Featured <span className="text-gray-400 font-light italic">Hotels</span>
                        </h2>
                    </div>
                    <Link
                        to="/hotels"
                        className="group flex items-center gap-2 px-6 py-3 bg-gray-50 dark:bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-red-600 transition-all border border-transparent hover:border-red-600/20"
                    >
                        View All Hotels <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* 4-Column Grid for Featured Hotels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {hotels.map((hotel) => (
                        <div
                            key={hotel._id}
                            onClick={() => navigate(`/hotel/${hotel._id}`)}
                            className="group bg-white dark:bg-[#121212] rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 flex flex-col h-full cursor-pointer"
                        >
                            <div className="relative aspect-[1] overflow-hidden">
                                <img
                                    src={hotel.images?.[0] || hotel.image || "/images/no-hotel.png"}
                                    alt={hotel.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                                />
                                {hotel.isFeatured && (
                                    <div className="absolute top-5 left-5 bg-red-600 px-3 py-1.5 rounded-xl text-[7px] font-black text-white uppercase tracking-widest shadow-lg">
                                        Featured
                                    </div>
                                )}
                                <div className="absolute top-5 right-5 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-lg">
                                    <Star size={10} className="text-red-600 fill-red-600" />
                                    <span className="text-[10px] font-black leading-none dark:text-white">{hotel.starRating || "0.0"}</span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-[0.2em] text-[8px] mb-4">
                                    <MapPin size={10} strokeWidth={3} /> {hotel.address?.city}, {hotel.address?.state}
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-tight mb-2 group-hover:text-red-600 transition-colors line-clamp-1 italic">
                                    {hotel.name}
                                </h3>
                                <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-4 italic">
                                    {hotel.propertyType}
                                </div>

                                {/* Amenities Preview */}
                                <div className="flex gap-2 mb-6">
                                    {hotel.amenities?.slice(0, 3).map((amenity, i) => (
                                        <span key={i} className="px-2 py-1 bg-gray-50 dark:bg-white/5 rounded-md text-[7px] font-bold text-gray-500 uppercase">
                                            {amenity}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto pt-6 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest block italic">
                                            {hotel.pricing?.basePricePerNight ? "Full Stay Valuation" : (hotel.priceRange?.min !== hotel.priceRange?.max ? "Suite Range" : "Entry Valuation")}
                                        </span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter italic">
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
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-all shadow-sm">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedHotels;
