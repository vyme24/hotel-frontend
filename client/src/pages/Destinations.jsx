import React, { useMemo } from "react";
import { useGetHotelAllQuery } from "../services/hotel";
import { MapPin, ArrowRight, Zap, Star, Compass, Globe, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Destinations = () => {
    const { data, isLoading } = useGetHotelAllQuery();
    const navigate = useNavigate();

    const locations = useMemo(() => {
        const hotels = data?.data ?? [];
        const locMap = {};
        hotels.forEach(h => {
            if (h.location) {
                locMap[h.location] = (locMap[h.location] || 0) + 1;
            }
        });
        return Object.entries(locMap).map(([name, count]) => ({ name, count }));
    }, [data]);

    const images = [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2080",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2070"
    ];

    if (isLoading)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#050505]">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-8" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] animate-pulse italic">Mapping Global Sanctuaries...</p>
            </div>
        );

    return (
        <section className="bg-white dark:bg-[#050505] min-h-screen pt-40 pb-32">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Sequence */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32 border-b border-gray-50 dark:border-white/5 pb-24">
                    <div className="space-y-8 max-w-2xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 italic">
                            <Compass size={14} className="text-red-600" />
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Geographic Catalog</span>
                        </div>
                        <h1 className="text-4xl md:text-3xl font-black text-gray-900 dark:text-white leading-[0.85] tracking-tighter uppercase font-heading">
                            ELITE <br />
                            <span className="italic outline-text">LOCALES</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed italic">
                            "Explore our curated atlas of destinations, from pristine coastal retreats to the architectural heart of global capitals."
                        </p>
                    </div>
                    <div className="flex flex-col md:items-end gap-1">
                        <span className="text-[8px] font-black text-red-600 uppercase tracking-[0.5em] mb-4 text-right">Active Coordinates</span>
                        <div className="px-8 py-4 bg-gray-900 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3">
                            <Globe size={14} className="text-red-500 animate-spin-slow" /> {locations.length} Strategic Hubs
                        </div>
                    </div>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {locations.map((loc, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(`/search?query=${loc.name}&type=hotels`)}
                            className="group relative h-[600px] rounded-[3.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-1000 flex flex-col justify-end p-10 hover:-translate-y-2 border border-gray-100 dark:border-white/5"
                        >
                            <img
                                src={images[i % images.length]}
                                alt={loc.name}
                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms] grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-1000" />

                            <div className="relative space-y-4">
                                <div className="flex items-center gap-2 text-red-600">
                                    <MapPin size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Sector {i + 1}</span>
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter font-heading leading-tight">{loc.name}</h3>
                                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{loc.count} Active Properties</span>
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white backdrop-blur-md group-hover:bg-red-600 transition-all duration-700">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add More Placeholder Style */}
                    <div className="group relative h-[600px] rounded-[3.5rem] overflow-hidden border border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center p-12 text-center bg-gray-50/30 dark:bg-white/5 hover:bg-white transition-all duration-700">
                        <Camera size={24} className="text-gray-200 mb-8" />
                        <h4 className="text-xl font-black uppercase tracking-tight text-gray-400 mb-4">Expanding <br /> Horizons</h4>
                        <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest italic leading-relaxed">"We are currently surveying 12 new global territories for our next expansion phase."</p>
                    </div>
                </div>

                {/* Experience Banner */}
                <div className="mt-32 relative h-[500px] rounded-[4rem] overflow-hidden group">
                    <img
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=2070"
                        alt="Global Travels"
                        className="absolute inset-0 w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 space-y-10">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
                            <Zap size={14} className="text-red-600" />
                            <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Elite Logistical Standards</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none font-heading max-w-4xl">
                            A WORLD OF <span className="italic outline-text">STRUCTURAL CLARITY</span>
                        </h2>
                        <button className="px-12 py-6 bg-white text-black rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-red-600 hover:text-white transition-all duration-700 shadow-2xl">Download Portfolio PDF</button>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .outline-text {
                    -webkit-text-stroke: 1px white;
                    color: transparent;
                }
                .animate-spin-slow {
                    animation: spin 10s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}} />
        </section>
    );
};

export default Destinations;
