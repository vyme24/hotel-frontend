import React from "react";
import {
    MapPin,
    Clock,
    Phone,
    Mail,
    User,
    Utensils,
    Hotel,
    Thermometer,
    Sun,
    Moon,
    Coffee,
    Car,
    Wifi,
    Dumbbell,
    Sparkles,
    Calendar,
    CreditCard,
    Shield,
    Award
} from 'lucide-react';

const Information = () => {
    // Using saved user information for personalization
    const managerName = "Arvind Singh";
    const managerPhone = "8894810531";
    const managerEmail = "arvind889481@gmail.com";

    // Formatting for display
    const formattedPhone = `+91 ${managerPhone.substring(0, 5)} ${managerPhone.substring(5)}`;
    const callLink = `tel:+91${managerPhone}`;

    // Current date for check-in/out display
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <section className="py-24 md:py-32 bg-white dark:bg-gray-950 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-600/5 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-red-50 dark:bg-red-900/10 rounded-full mb-6 border border-red-100 dark:border-red-900/30">
                        <Hotel className="w-4 h-4 text-red-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">
                            Service Excellence
                        </span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                        Concierge <span className="text-red-600 italic">Insights</span>
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Curated essential information to ensure your stay at LuxStay is seamless, sophisticated, and entirely unforgettable.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">

                    {/* Left Column - Timings & Dining */}
                    <div className="group">
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-10 h-full border border-gray-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl transition-all duration-700 hover:-translate-y-1.5">

                            {/* Check-in/out */}
                            <div className="mb-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-red-600" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        Arrival & Departure
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-5 bg-red-50/50 dark:bg-red-900/5 rounded-2xl border border-red-100/50 dark:border-red-900/20">
                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Check-in</span>
                                        <span className="text-sm font-black text-red-600 uppercase tracking-tight">After 2:00 PM</span>
                                    </div>
                                    <div className="flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Check-out</span>
                                        <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">Before 12:00 PM</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4 text-right">
                                        * Subject to availability
                                    </p>
                                </div>
                            </div>

                            <hr className="border-gray-100 dark:border-gray-800 mb-10" />

                            {/* Dining */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                                        <Utensils className="w-5 h-5 text-red-600" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        Gourmet Dining
                                    </span>
                                </div>

                                <div className="space-y-5">
                                    <div className="flex items-center justify-between px-2">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl"><Coffee className="w-4 h-4 text-gray-400" /></div>
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-tight">Breakfast</span>
                                        </div>
                                        <span className="text-sm font-black text-gray-900 dark:text-white font-mono">07:00 - 10:30</span>
                                    </div>
                                    <div className="flex items-center justify-between px-2">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl"><Sun className="w-4 h-4 text-gray-400" /></div>
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-tight">Grand Lunch</span>
                                        </div>
                                        <span className="text-sm font-black text-gray-900 dark:text-white font-mono">12:30 - 15:00</span>
                                    </div>
                                    <div className="flex items-center justify-between px-2">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl"><Moon className="w-4 h-4 text-gray-400" /></div>
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-tight">Dinner</span>
                                        </div>
                                        <span className="text-sm font-black text-gray-900 dark:text-white font-mono">19:00 - 23:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column - Location & Temperature */}
                    <div className="group">
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-10 h-full border border-gray-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl transition-all duration-700 hover:-translate-y-1.5">

                            {/* Location */}
                            <div className="mb-10 text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/20 mb-6">
                                    <MapPin className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                                    LuxStay <span className="text-red-600">Elite</span>
                                </h3>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 mb-6">
                                    Andheri East Corporate Hub, Mumbai, India
                                </p>

                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <span className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl text-[9px] font-black uppercase tracking-widest border border-green-100 dark:border-green-900/30">
                                        <Shield size={10} /> Safe Zone
                                    </span>
                                    <span className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl text-[9px] font-black uppercase tracking-widest border border-red-100 dark:border-red-900/30">
                                        <Award size={10} /> Airport Hub
                                    </span>
                                </div>
                            </div>

                            <hr className="border-gray-100 dark:border-gray-800 mb-10" />

                            {/* Current Weather */}
                            <div className="mb-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                                        <Thermometer className="w-5 h-5 text-red-600" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        Meteorological View
                                    </span>
                                </div>

                                <div className="flex items-end justify-between bg-gradient-to-br from-red-600 to-red-800 p-8 rounded-[2rem] text-white overflow-hidden relative group/weather">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/weather:scale-125 transition-transform duration-700">
                                        <Sun size={48} />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-3xl font-black tracking-tighter">28°C</p>
                                        <p className="text-xs font-bold uppercase tracking-widest opacity-80 mt-1 italic">Vibrant Sunshine</p>
                                    </div>
                                    <div className="text-right relative z-10">
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Humidity 65%</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Wind 12km/h</p>
                                    </div>
                                </div>
                            </div>

                            {/* GSTIN */}
                            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm text-center">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Authenticated Entity</p>
                                <p className="text-xl font-black text-gray-900 dark:text-white tracking-[0.2em] font-mono">
                                    27AAXXX1234X1ZX
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact & CTA */}
                    <div className="group">
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-10 h-full border border-gray-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl transition-all duration-700 hover:-translate-y-1.5">

                            {/* Contact Header */}
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                                    <User className="w-5 h-5 text-red-600" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    Executive Concierge
                                </span>
                            </div>

                            {/* Manager Info */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-5 p-5 bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-50 dark:border-gray-700/50 group/mgr hover:border-red-500/30 transition-colors">
                                    <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-red-600/20 transform group-hover/mgr:rotate-3 transition-transform">
                                        {managerName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-gray-900 dark:text-white leading-none mb-1">{managerName}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-red-600 italic">Senior Property Lead</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <a href={`mailto:${managerEmail}`}
                                        className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-500 group/link border border-gray-50 dark:border-gray-800">
                                        <Mail className="w-4 h-4 text-red-600 group-hover/link:text-white" />
                                        <span className="text-sm font-bold tracking-tight">{managerEmail}</span>
                                    </a>

                                    <a href={callLink}
                                        className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-500 group/link border border-gray-50 dark:border-gray-800">
                                        <Phone className="w-4 h-4 text-red-600 group-hover/link:text-white" />
                                        <span className="text-sm font-bold tracking-tight">{formattedPhone}</span>
                                    </a>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="space-y-4 mt-12">
                                <a href={callLink}
                                    className="flex items-center justify-center gap-3 w-full py-5 bg-red-600 text-white font-black uppercase tracking-widest rounded-[1.5rem] shadow-2xl shadow-red-600/30 hover:bg-black hover:shadow-black/20 transform hover:-translate-y-1 transition-all duration-500 text-sm">
                                    <Phone className="w-5 h-5" />
                                    Instant Direct Call
                                </a>

                                <a href={`https://wa.me/91${managerPhone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full py-4 bg-gray-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-green-600 transition-all duration-500 text-[10px] border border-gray-800">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.447-1.273.607-1.446c.16-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.072.043.419-.101.824z" />
                                    </svg>
                                    WhatsApp Support
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Information;