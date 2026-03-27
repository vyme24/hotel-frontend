import React from "react";
import { Wifi, Waves, Utensils, Dumbbell, Car, Plane, Coffee, Tv, Snowflake, Bath } from "lucide-react";

const amenities = [
    { icon: Wifi, name: "Free WiFi", desc: "High-speed internet", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { icon: Waves, name: "Swimming Pool", desc: "Infinity & heated", color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-900/20" },
    { icon: Utensils, name: "Restaurant", desc: "Fine dining on-site", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
    { icon: Dumbbell, name: "Gym & Fitness", desc: "State-of-the-art", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { icon: Car, name: "Free Parking", desc: "Valet available", color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
    { icon: Plane, name: "Airport Pickup", desc: "Luxury transfers", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" },
    { icon: Coffee, name: "Spa & Wellness", desc: "Full-service spa", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
    { icon: Snowflake, name: "Air Conditioning", desc: "Climate control", color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-900/20" },
];

const AmenitiesShowcase = () => {
    return (
        <section className="py-24 bg-white dark:bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-px w-8 bg-amber-500" />
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.35em]">World Class Service</span>
                        <div className="h-px w-8 bg-amber-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Premium <span className="text-amber-500">Amenities</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                        Everything you need for the perfect stay — and so much more
                    </p>
                </div>

                {/* Amenities Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {amenities.map((amenity, index) => (
                        <div
                            key={index}
                            className="group p-6 bg-gray-50 dark:bg-[#111] rounded-3xl border border-gray-100 dark:border-white/5 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
                        >
                            <div className={`w-16 h-16 ${amenity.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                <amenity.icon size={28} className={amenity.color} />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{amenity.name}</h3>
                            <p className="text-gray-400 text-[11px]">{amenity.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Luxury Experience Banner */}
                <div className="mt-16 relative rounded-3xl overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=2070"
                        alt="Luxury Experience"
                        className="w-full h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                    <div className="absolute inset-0 flex items-center px-12">
                        <div className="max-w-lg">
                            <p className="text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-3">The LuxStay Promise</p>
                            <h3 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Redefining Luxury, <br />One Stay at a Time
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                From the moment you arrive to the day you depart, every detail is meticulously curated for your ultimate comfort and pleasure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AmenitiesShowcase;
