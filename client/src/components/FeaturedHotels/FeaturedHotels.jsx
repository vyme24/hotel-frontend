import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetHotelAllQuery } from "../../services/hotel";
import { MapPin, Star, ArrowRight, Wifi, Coffee, Car, Waves } from "lucide-react";

const amenityIcons = {
    "WiFi": Wifi,
    "Wifi": Wifi,
    "Free WiFi": Wifi,
    "Pool": Waves,
    "Swimming Pool": Waves,
    "Restaurant": Coffee,
    "Parking": Car,
    "Gym": Coffee,
};

const getAmenityIcon = (amenity) => {
    const Icon = amenityIcons[amenity] || Coffee;
    return <Icon size={10} />;
};

const FeaturedHotels = () => {
    const navigate = useNavigate();
    const { data, isLoading, isFetching } = useGetHotelAllQuery();
    const hotels = useMemo(() => {
        return data?.data?.filter(h => h.status === 'active').slice(0, 4) ?? [];
    }, [data]);

    if (isLoading || isFetching) return null;

    return (
        <section className="py-24 bg-white dark:bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-amber-500" />
                            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.35em]">Our Collection</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Featured <span className="text-amber-500">Hotels</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md leading-relaxed">
                            Handpicked luxury properties offering world-class amenities and unforgettable experiences
                        </p>
                    </div>
                    <Link
                        to="/hotels"
                        className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-300 hover:border-amber-500 hover:text-amber-500 transition-all duration-300 whitespace-nowrap self-start md:self-auto"
                    >
                        See More Hotels
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Hotels Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {hotels.map((hotel, index) => (
                        <div
                            key={hotel._id}
                            onClick={() => navigate(`/hotel/${hotel._id}`)}
                            className="group bg-white dark:bg-[#111111] rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col cursor-pointer"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={hotel.images?.[0] || hotel.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800"}
                                    alt={hotel.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {hotel.isFeatured && (
                                    <div className="absolute top-4 left-4 bg-amber-500 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                                        Featured
                                    </div>
                                )}

                                <div className="absolute top-4 right-4 bg-white/95 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                                    <Star size={10} className="text-amber-500 fill-amber-500" />
                                    <span className="text-xs font-bold dark:text-white">{hotel.starRating || "5.0"}</span>
                                </div>

                                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90">
                                    <MapPin size={12} className="text-amber-400" />
                                    <span className="text-[11px] font-medium">{hotel.address?.city}, {hotel.address?.state}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-grow">
                                <div className="mb-1">
                                    <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">{hotel.propertyType}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-500 transition-colors line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {hotel.name}
                                </h3>

                                {/* Amenities */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {hotel.amenities?.slice(0, 3).map((amenity, i) => (
                                        <span key={i} className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 dark:bg-white/5 rounded-full text-[9px] font-medium text-gray-500 dark:text-gray-400">
                                            {getAmenityIcon(amenity)} {amenity}
                                        </span>
                                    ))}
                                </div>

                                {/* Price & CTA */}
                                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                                    <div>
                                        <span className="text-[9px] text-gray-400 block">Starting from</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xl font-black text-gray-900 dark:text-white">
                                                {hotel.pricing?.basePricePerNight
                                                    ? `₹${hotel.pricing.basePricePerNight.toLocaleString()}`
                                                    : hotel.priceRange?.min
                                                        ? `₹${hotel.priceRange.min.toLocaleString()}`
                                                        : "Contact Us"}
                                            </span>
                                            <span className="text-[10px] text-gray-400">/night</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); navigate(`/hotel/${hotel._id}`); }}
                                        className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/30 active:scale-95"
                                    >
                                        View <ArrowRight size={12} />
                                    </button>
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
