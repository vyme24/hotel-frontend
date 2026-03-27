import { Link } from "react-router-dom";
import React from 'react';
import { Compass, ArrowLeft, Sparkles } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/10 rounded-full mb-8 border border-red-100 dark:border-red-900/30">
          <Sparkles className="w-3 h-3 text-red-600" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">
            Lost in Transition
          </span>
        </div>

        <h1 className="text-[8rem] md:text-[12rem] font-black text-gray-100 dark:text-gray-900 leading-none mb-4 select-none">
          404
        </h1>

        <div className="relative -mt-20 md:-mt-32">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Sanctuary <span className="text-red-600 italic">Not Found</span>
          </h2>

          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 font-light leading-relaxed max-w-md mx-auto">
            The destination you are seeking has vanished from our elite collection. Let us guide you back to our primary retreats.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-2xl shadow-red-600/30 hover:bg-black transition-all duration-500"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Return to Sanctuary
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-black uppercase tracking-widest text-[10px] rounded-2xl border border-gray-100 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-bold"
            >
              Contact Concierge
            </Link>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="mt-20 flex justify-center opacity-20">
          <Compass className="w-16 h-16 text-gray-400 animate-spin-slow" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;