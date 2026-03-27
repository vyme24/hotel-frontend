import React from "react";
import { useNavigate } from "react-router-dom";
import { Tag, Clock, ArrowRight, Percent } from "lucide-react";

const offers = [
    {
        id: 1,
        badge: "Limited Time",
        discount: "30% OFF",
        title: "Early Bird Deal",
        description: "Book 30 days in advance and save big on luxury suites",
        validity: "Valid till Dec 31, 2026",
        code: "EARLYBIRD30",
        gradient: "from-amber-500 to-orange-600",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        badge: "Weekend Escape",
        discount: "20% OFF",
        title: "Weekend Getaway",
        description: "Exclusive savings on Friday to Sunday stays at all our partner hotels",
        validity: "Every Weekend",
        code: "WEEKEND20",
        gradient: "from-purple-500 to-pink-600",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        badge: "Long Stay",
        discount: "40% OFF",
        title: "Stay & Save",
        description: "Book 7+ nights and unlock premium rates on our finest properties",
        validity: "Year Round",
        code: "LONGSTAY40",
        gradient: "from-teal-500 to-cyan-600",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800"
    }
];

const SpecialOffers = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-amber-500" />
                            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.35em]">Exclusive Deals</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Special <span className="text-amber-500">Offers</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
                            Curated deals and seasonal discounts on premium stays
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/offers")}
                        className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-300 hover:border-amber-500 hover:text-amber-500 transition-all duration-300 whitespace-nowrap self-start md:self-auto"
                    >
                        All Offers <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="group relative rounded-3xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl"
                            onClick={() => navigate("/hotels")}
                            style={{ minHeight: '380px' }}
                        >
                            {/* Background Image */}
                            <img
                                src={offer.image}
                                alt={offer.title}
                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-80`} />
                            <div className="absolute inset-0 bg-black/30" />

                            {/* Content */}
                            <div className="relative h-full flex flex-col justify-between p-8">
                                {/* Top */}
                                <div className="flex items-center justify-between">
                                    <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
                                        {offer.badge}
                                    </span>
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                                        <Percent size={20} className="text-gray-800" />
                                    </div>
                                </div>

                                {/* Bottom */}
                                <div>
                                    <div className="text-5xl font-black text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {offer.discount}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{offer.title}</h3>
                                    <p className="text-white/70 text-sm mb-4 leading-relaxed">{offer.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white/60 text-[9px] uppercase tracking-widest mb-1">Use code</p>
                                            <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                                                <span className="text-white font-black text-sm tracking-wider">{offer.code}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/70 text-[10px]">
                                            <Clock size={12} />
                                            <span>{offer.validity}</span>
                                        </div>
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

export default SpecialOffers;
