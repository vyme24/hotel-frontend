import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetRoomAllQuery } from "../services/room";
import { ArrowRight, Star, MapPin, Bed, Users } from "lucide-react";

const FeaturedRooms = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetRoomAllQuery();
    const rooms = useMemo(() => {
        return data?.data?.filter(r => r.status === 'active').slice(0, 4) ?? [];
    }, [data]);

    if (isLoading || rooms.length === 0) return null;

    return (
        <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Sequence */}
                <div className="flex items-end justify-between mb-12 border-b border-gray-100 dark:border-white/5 pb-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-red-600">
                            <Bed size={14} className="animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">Rooms</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">
                            Featured <span className="text-gray-400 font-light italic">Rooms</span>
                        </h2>
                    </div>
                    <Link
                        to="/rooms"
                        className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-red-600 transition-all border border-transparent hover:border-red-600/20 shadow-sm"
                    >
                        View All Rooms <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* 4-Column Grid for Featured Rooms */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {rooms.map((room) => (
                        <div
                            key={room._id}
                            onClick={() => navigate(`/room/${room._id}`)}
                            className="group bg-white dark:bg-[#121212] rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 flex flex-col h-full cursor-pointer"
                        >
                            <div className="relative aspect-[1] overflow-hidden">
                                <img
                                    src={room.images?.[0] || room.image || "/images/no-room.png"}
                                    alt={room.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                                />
                                <div className="absolute top-5 left-5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[7px] font-black text-white uppercase tracking-widest border border-white/10 shadow-lg">
                                    {room.roomTypeCode} | {room.roomTypeName || "Master Unit"}
                                </div>

                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-[0.2em] text-[8px] mb-4">
                                    <Users size={10} strokeWidth={3} /> {room.maxAdults} Adults, {room.maxChildren} Children
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-tight mb-2 group-hover:text-red-600 transition-colors line-clamp-1 italic">
                                    {room.name}
                                </h3>
                                <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-4 italic">
                                    {room.bedType} Bedding
                                </div>

                                <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 italic leading-relaxed">
                                    {room.description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest block italic">Nightly Yield</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter italic">
                                                {room.basePrice ? `₹${room.basePrice.toLocaleString()}` : "Price Not Available"}
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

export default FeaturedRooms;
