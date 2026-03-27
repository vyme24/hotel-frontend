import React, { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && email.includes("@") && email.includes(".")) {
            setStatus("success");
            setEmail("");
            setTimeout(() => setStatus(null), 4000);
        } else {
            setStatus("error");
            setTimeout(() => setStatus(null), 3000);
        }
    };

    return (
        <section className="py-24 bg-white dark:bg-[#050505] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 text-center relative">

                {/* Icon */}
                <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-amber-500/30">
                    <Mail size={28} className="text-white" />
                </div>

                {/* Text */}
                <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-px w-8 bg-amber-500" />
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.35em]">Stay Updated</span>
                        <div className="h-px w-8 bg-amber-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Unlock <span className="text-amber-500">Exclusive</span> Offers
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                        Join 500,000+ travelers receiving premium deals, early access to new properties, and travel inspiration
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mt-8">
                    <div className="flex-1 relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 rounded-2xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-sm font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-amber-500/30 active:scale-95 whitespace-nowrap"
                    >
                        <Send size={16} />
                        Subscribe
                    </button>
                </form>

                {/* Status Messages */}
                {status === "success" && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-green-500 text-sm font-medium animate-fadeIn">
                        <CheckCircle size={16} />
                        You're subscribed! Welcome to LuxStay exclusive.
                    </div>
                )}
                {status === "error" && (
                    <p className="mt-4 text-red-500 text-sm">Please enter a valid email address.</p>
                )}

                {/* Trust note */}
                <p className="mt-6 text-gray-400 text-[11px]">
                    No spam, ever. Unsubscribe anytime. By subscribing, you agree to our{" "}
                    <a href="/privacy" className="text-amber-500 hover:underline">Privacy Policy</a>.
                </p>
            </div>
        </section>
    );
};

export default Newsletter;
