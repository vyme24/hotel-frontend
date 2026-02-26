import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft, Construction, Clock, ShieldCheck } from "lucide-react";

const ComingSoon = ({ title, description }) => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-gray-950 px-6 py-24 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -z-0" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-600/5 blur-[100px] rounded-full -z-0" />

            <div className="max-w-3xl w-full text-center relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/10 rounded-full mb-8 border border-red-100 dark:border-red-900/30">
                    <Clock className="w-4 h-4 text-red-600 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">
                        Coming Soon
                    </span>
                </div>

                {/* Icon */}
                <div className="mb-10 flex justify-center">
                    <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-red-600/10 border border-gray-100 dark:border-gray-800 transform hover:rotate-6 transition-transform duration-500">
                        <Construction className="w-10 h-10 text-red-600" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                    {title || "Feature"} <span className="text-red-600 italic">Underway</span>
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 font-light leading-relaxed max-w-xl mx-auto">
                    {description || "We’re working on this feature to bring you the most premium hotel booking experience. Our architects are currently crafting something extraordinary for you."}
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <ShieldCheck size={14} className="text-green-500" />
                        Premium Quality
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <Sparkles size={14} className="text-red-500" />
                        Exclusive Content
                    </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-2xl shadow-red-600/30 hover:bg-black hover:shadow-black/20 transform hover:-translate-y-1 transition-all duration-500"
                    >
                        <ArrowLeft size={16} />
                        Back to Sanctuary
                    </Link>

                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-500"
                    >
                        Notify Me
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
