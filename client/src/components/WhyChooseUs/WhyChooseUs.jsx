import React from "react";
import { Shield, Star, Clock, BadgeCheck, Headphones, CreditCard } from "lucide-react";

const features = [
    {
        icon: BadgeCheck,
        title: "Best Price Guarantee",
        description: "We match or beat any price you find elsewhere — no hidden fees, ever.",
        color: "from-amber-500 to-amber-600",
        bg: "bg-amber-50 dark:bg-amber-900/10",
        iconColor: "text-amber-500"
    },
    {
        icon: Shield,
        title: "Secure Payments",
        description: "256-bit SSL encryption on all transactions. Your data stays private.",
        color: "from-blue-500 to-blue-600",
        bg: "bg-blue-50 dark:bg-blue-900/10",
        iconColor: "text-blue-500"
    },
    {
        icon: Star,
        title: "Luxury Hotels Only",
        description: "Every property is hand-vetted by our team for quality and excellence.",
        color: "from-purple-500 to-purple-600",
        bg: "bg-purple-50 dark:bg-purple-900/10",
        iconColor: "text-purple-500"
    },
    {
        icon: Headphones,
        title: "24/7 Concierge",
        description: "Our expert team is always available to assist you, day or night.",
        color: "from-rose-500 to-rose-600",
        bg: "bg-rose-50 dark:bg-rose-900/10",
        iconColor: "text-rose-500"
    },
    {
        icon: BadgeCheck,
        title: "Verified Properties",
        description: "All listings are physically verified and regularly audited for standards.",
        color: "from-green-500 to-green-600",
        bg: "bg-green-50 dark:bg-green-900/10",
        iconColor: "text-green-500"
    },
    {
        icon: CreditCard,
        title: "Flexible Cancellation",
        description: "Plans change. Our flexible policies ensure you're never stuck.",
        color: "from-orange-500 to-orange-600",
        bg: "bg-orange-50 dark:bg-orange-900/10",
        iconColor: "text-orange-500"
    }
];

const WhyChooseUs = () => {
    return (
        <section className="py-24 bg-white dark:bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-px w-8 bg-amber-500" />
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.35em]">Why LuxStay</span>
                        <div className="h-px w-8 bg-amber-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        The LuxStay <span className="text-amber-500">Difference</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
                        Trusted by over 2 million travelers — here's why they choose us every time
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-gray-50 dark:bg-[#111] rounded-3xl border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                        >
                            <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon size={24} className={feature.iconColor} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Stats Row */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { value: "500+", label: "Luxury Hotels" },
                        { value: "2M+", label: "Happy Guests" },
                        { value: "50+", label: "Cities Covered" },
                        { value: "4.9★", label: "Average Rating" }
                    ].map((stat, i) => (
                        <div key={i} className="text-center p-8 bg-amber-500 rounded-3xl">
                            <p className="text-4xl font-black text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</p>
                            <p className="text-amber-100 text-sm font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
