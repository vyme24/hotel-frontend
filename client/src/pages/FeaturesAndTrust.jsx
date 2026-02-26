import React, { useEffect, useRef, useState } from 'react';
import {
    Shield,
    Award,
    Clock,
    HeadphonesIcon,
    CreditCard,
    Users,
    Lock,
    CheckCircle,
} from 'lucide-react';

const FeaturesAndTrust = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => sectionRef.current && observer.unobserve(sectionRef.current);
    }, []);


    const features = [
        {
            icon: Award,
            title: "Best Price Guarantee",
            description: "Lowest prices guaranteed",
        },
        {
            icon: Shield,
            title: "Verified Hotels",
            description: "Quality assured stays",
        },
        {
            icon: Clock,
            title: "Free Cancellation",
            description: "Flexible booking options",
        },
        {
            icon: HeadphonesIcon,
            title: "24/7 Support",
            description: "Help anytime, anywhere",
        },
    ];

    const trustItems = [
        { icon: Lock, text: "Secure Payments" },
        { icon: Users, text: "10,000+ Happy Guests" },
        { icon: CreditCard, text: "Multiple Payment Options" },
        { icon: CheckCircle, text: "4.8/5 Guest Rating" },
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-red-600/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Stats / Proof section */}
                <div className="text-center mb-20 space-y-4">
                    <span className="text-red-600 text-xs font-black uppercase tracking-[0.4em] block">Why Choose LuxStay</span>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                        Elevating Your <span className="text-red-600 italic">Travel Experience</span>
                    </h2>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className={`
                                  group relative p-10 bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 transition-all duration-700 hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl hover:-translate-y-1.5
                                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
                                `}
                                style={{ transitionDelay: `${index * 150}ms`, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                                    <Icon className="w-20 h-20 text-red-600" />
                                </div>
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-red-50 dark:bg-red-900/20 mb-8 transition-all duration-500">
                                    <Icon className="w-10 h-10 text-red-600" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Trust Bar Premium */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                    <div className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] p-10 md:p-14 overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-2 h-full bg-red-600" />

                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="space-y-4 text-center lg:text-left">
                                <h4 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Trusted by discerning travelers worldwide</h4>
                                <p className="text-gray-400 font-light max-w-md">Our commitment to excellence is reflected in every stay and every interaction.</p>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
                                {trustItems.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center gap-3 group/item"
                                        >
                                            <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-100 dark:border-gray-700 group-hover/item:border-red-500/30 transition-all duration-500">
                                                <Icon className="w-6 h-6 text-red-600" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-gray-100">{item.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default FeaturesAndTrust;
