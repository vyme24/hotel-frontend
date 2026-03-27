import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetRoomAllQuery } from "../../services/room";
import { ArrowRight, Bed, Users, Square } from "lucide-react";

const FeaturedRooms = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetRoomAllQuery();
    const rooms = useMemo(() => {
        return data?.data?.filter(r => r.status === 'active').slice(0, 4) ?? [];
    }, [data]);

    if (isLoading || rooms.length === 0) return null;

    return (
        <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-amber-500" />
                            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.35em]">Curated Rooms</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Signature <span className="text-amber-500">Suites</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md leading-relaxed">
                            Individually designed rooms crafted for ultimate comfort and unparalleled luxury
                        </p>
                    </div>
                    <Link
                        to="/rooms"
                        className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-300 hover:border-amber-500 hover:text-amber-500 transition-all duration-300 whitespace-nowrap self-start md:self-auto"
                    >
                        View All Rooms
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Rooms Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {rooms.map((room, index) => (
                        <div
                            key={room._id}
                            onClick={() => navigate(`/room/${room._id}`)}
                            className="group bg-white dark:bg-[#111111] rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col cursor-pointer"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={room.images?.[0] || room.image || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800"}
                                    alt={room.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Room Type Badge */}
                                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                    <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                                        {room.roomTypeName || "Suite"}
                                    </span>
                                </div>

                                {/* Capacity */}
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

                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {room.name}
                                </h3>

                                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                                    {room.description || "A beautifully appointed room designed for luxury and comfort."}
                                </p>

                                {/* Price & CTA */}
                                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                                    <div>
                                        <span className="text-[9px] text-gray-400 block">Per night</span>
                                        <span className="text-xl font-black text-gray-900 dark:text-white">
                                            {room.basePrice ? `₹${room.basePrice.toLocaleString()}` : "Contact Us"}
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
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

export default FeaturedRooms;
