import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ArrowRight, MapPin, Star, Zap, Info, ShieldCheck } from "lucide-react";
import { useGetRoomAllQuery } from "../services/room";

const Wishlist = () => {
    const { data: roomsData, isLoading } = useGetRoomAllQuery();
    const navigate = useNavigate();

    // For now, we'll demonstrate using a selection of rooms as "Favorites" 
    // to show how the UI looks with real data mapping.
    const favorites = roomsData?.data?.slice(0, 3) ?? [];

    if (isLoading)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#050505]">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-8" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] animate-pulse italic">Retrieving Curated Favorites...</p>
            </div>
        );

    return (
        <section className="bg-white dark:bg-[#050505] min-h-screen pt-40 pb-32">
            <div className="max-w-7xl mx-auto px-6">

                {/* Executive Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32 border-b border-gray-50 dark:border-white/5 pb-24">
                    <div className="space-y-8 max-w-2xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 italic">
                            <Heart size={14} className="text-red-600 animate-pulse" />
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Personal Collection</span>
                        </div>
                        <h1 className="text-4xl md:text-3xl font-black text-gray-900 dark:text-white leading-[0.85] tracking-tighter uppercase font-heading">
                            MY <br />
                            <span className="italic outline-text">WISHLIST</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed italic">
                            "A catalog of architectural sanctuaries curated for your future sequences. Ready for activation at your command."
                        </p>
                    </div>
                    <div className="flex flex-col md:items-end gap-1">
                        <span className="text-[8px] font-black text-red-600 uppercase tracking-[0.5em] mb-4 text-right">Inventory Status</span>
                        <div className="px-8 py-4 bg-gray-900 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3">
                            <Zap size={14} className="text-red-500" /> {favorites.length} Saved Protocols
                        </div>
                    </div>
                </div>

                {favorites.length === 0 ? (
                    <div className="bg-gray-50 dark:bg-white/5 rounded-[4.5rem] p-32 text-center border border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center">
                        <div className="w-24 h-24 bg-white dark:bg-black rounded-[2.5rem] shadow-sm flex items-center justify-center mb-12 text-gray-200">
                            <Heart size={24} />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">Collection <span className="italic text-gray-400">Empty</span></h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm font-light italic mb-12 leading-relaxed">"Bridge your desires with reality by adding elite properties to your curated wishlist for future escapes."</p>
                        <button
                            onClick={() => navigate('/hotels')}
                            className="bg-black dark:bg-white text-white dark:text-black px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all duration-700 active:scale-95"
                        >
                            Explore Portfolio
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {favorites.map((item, index) => (
                            <div key={item._id} className="group bg-white dark:bg-[#0a0a0a] rounded-[3.5rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-1000 flex flex-col h-full hover:-translate-y-2">
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src={item.image || item.images?.[0] || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070"}
                                        alt={item.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms]"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                                    <button className="absolute top-8 right-8 w-12 h-12 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-red-600 shadow-2xl transition-all hover:scale-110 active:scale-90">
                                        <Heart size={20} fill="currentColor" />
                                    </button>
                                </div>

                                <div className="p-10 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-red-600 mb-6">
                                        <MapPin size={16} strokeWidth={2} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">{item.location || "Elite Sector"}</span>
                                    </div>

                                    <Link to={`/room/${item._id}`}>
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-red-600 transition-colors leading-none uppercase tracking-tighter">
                                            {item.name}
                                        </h3>
                                    </Link>

                                    <div className="mt-auto pt-8 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                                        <div>
                                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1 italic">Signature Rate</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter italic leading-none">₹{(item.price || item.basePrice || 1999).toLocaleString()}</span>
                                                <span className="text-[9px] font-black text-gray-400 uppercase">/nt</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/room/${item._id}`)}
                                            className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all duration-700 shadow-xl"
                                        >
                                            View Suite
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Security Trust Strip */}
                <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { icon: ShieldCheck, title: "Guaranteed Inventory", desc: "Real-time verification of signature luxury availability." },
                        { icon: Info, title: "Price Assurance", desc: "Our algorithm ensures the most competitive rate protocol." },
                        { icon: Zap, title: "Instant Activation", desc: "Seamless conversion from wishlist to confirmed stay." }
                    ].map((feature, i) => (
                        <div key={i} className="flex gap-8 group">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-red-600 flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all duration-700">
                                <feature.icon size={24} />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-black uppercase tracking-tight text-gray-900 dark:text-white">{feature.title}</h4>
                                <p className="text-[11px] text-gray-400 font-light italic leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .outline-text {
                    -webkit-text-stroke: 1px currentColor;
                    color: transparent;
                }
                .dark .outline-text {
                    -webkit-text-stroke: 1px white;
                }
            `}} />
        </section>
    );
};

export default Wishlist;
