import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

const destinations = [
    {
        name: "Goa",
        subtitle: "Beaches & Vibes",
        hotels: "48 Hotels",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800",
        path: "/destinations/goa"
    },
    {
        name: "Jaipur",
        subtitle: "The Pink City",
        hotels: "36 Hotels",
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800",
        path: "/destinations/jaipur"
    },
    {
        name: "Mumbai",
        subtitle: "City of Dreams",
        hotels: "62 Hotels",
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800",
        path: "/destinations/mumbai"
    },
    {
        name: "Delhi",
        subtitle: "Heart of India",
        hotels: "54 Hotels",
        image: "https://images.unsplash.com/photo-1597022779547-038e4c2e85d4?auto=format&fit=crop&q=80&w=800",
        path: "/destinations/delhi"
    },
    {
        name: "Manali",
        subtitle: "Mountain Retreat",
        hotels: "28 Hotels",
        image: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&q=80&w=800",
        path: "/destinations/manali"
    },
    {
        name: "Shimla",
        subtitle: "Queen of Hills",
        hotels: "22 Hotels",
        image: "https://images.unsplash.com/photo-1590322286487-d32e8e24ddf5?auto=format&fit=crop&q=80&w=800",
        path: "/destinations/shimla"
    }
];

const TopDestinations = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-gray-950 dark:bg-black relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative">

                {/* Header */}
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-px w-8 bg-amber-500" />
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.35em]">Explore India</span>
                        <div className="h-px w-8 bg-amber-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Top <span className="text-amber-500">Destinations</span>
                    </h2>
                    <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                        From pristine beaches to majestic mountains — explore India's most iconic destinations
                    </p>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {destinations.map((dest, index) => (
                        <div
                            key={dest.name}
                            onClick={() => navigate(dest.path)}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer"
                            style={{ aspectRatio: index < 2 ? '1/1.4' : '1/1.2' }}
                        >
                            <img
                                src={dest.image}
                                alt={dest.name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-all duration-300" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <div className="flex items-center gap-1 mb-1">
                                    <MapPin size={10} className="text-amber-400" />
                                    <span className="text-[9px] text-amber-400 font-medium">{dest.hotels}</span>
                                </div>
                                <h3 className="text-lg font-black text-white leading-none mb-0.5">{dest.name}</h3>
                                <p className="text-[10px] text-white/60 font-medium">{dest.subtitle}</p>
                            </div>

                            {/* Hover Arrow */}
                            <div className="absolute top-3 right-3 w-8 h-8 bg-white/0 group-hover:bg-amber-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                <ArrowRight size={14} className="text-white" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="text-center mt-10">
                    <button
                        onClick={() => navigate("/destinations")}
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-amber-500/30 hover:border-amber-500 text-amber-400 hover:text-amber-300 rounded-full text-sm font-semibold transition-all duration-300 group"
                    >
                        Explore All Destinations
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TopDestinations;
