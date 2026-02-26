import React from "react";
import { useGetOfferAllQuery } from "../services/offer";
import { Ticket, Percent, Calendar, ShieldCheck, ArrowRight, Zap, Info, Clock, Star, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Offers = () => {
    const { data, isLoading } = useGetOfferAllQuery();
    const navigate = useNavigate();
    const offers = data?.data ?? [];

    if (isLoading)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#050505]">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-8" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] animate-pulse italic">Scanning Value Opportunities...</p>
            </div>
        );

    return (
        <section className="bg-white dark:bg-[#050505] min-h-screen pt-40 pb-32">
            <div className="max-w-7xl mx-auto px-6">

                {/* Cinematic Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32 border-b border-gray-50 dark:border-white/5 pb-24">
                    <div className="space-y-8 max-w-2xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 italic">
                            <Ticket size={14} className="text-red-600" />
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Exclusive Incentives</span>
                        </div>
                        <h1 className="text-4xl md:text-3xl font-black text-gray-900 dark:text-white leading-[0.85] tracking-tighter uppercase font-heading">
                            SIGNATURE <br />
                            <span className="italic outline-text">OFFERS</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed italic">
                            "Unlock unprecedented value with our curated selection of seasonal incentives and loyal guest protocols."
                        </p>
                    </div>
                    <div className="flex flex-col md:items-end gap-1">
                        <span className="text-[8px] font-black text-red-600 uppercase tracking-[0.5em] mb-4 text-right">Yield Management</span>
                        <div className="px-8 py-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3">
                            <Zap size={14} className="text-red-500 animate-pulse" /> {offers.length || 0} Signal Streams
                        </div>
                    </div>
                </div>

                {offers.length === 0 ? (
                    <div className="bg-gray-50 dark:bg-white/5 rounded-[4.5rem] p-32 text-center border border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center">
                        <div className="w-24 h-24 bg-white dark:bg-black rounded-[2.5rem] shadow-sm flex items-center justify-center mb-12 text-gray-200">
                            <Star size={24} />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">Inventory <span className="italic text-gray-400">Locked</span></h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm font-light italic mb-12 leading-relaxed">"Our seasonal offers are currently being recalibrated. Return shortly for updated incentive protocols."</p>
                        <button
                            onClick={() => navigate('/hotels')}
                            className="bg-black dark:bg-white text-white dark:text-black px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all duration-700 active:scale-95"
                        >
                            Explore Collections
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {offers.map((offer) => (
                            <div key={offer._id} className="group relative bg-white dark:bg-[#0a0a0a] rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-1000 flex flex-col h-full hover:-translate-y-2 border border-gray-100 dark:border-white/5">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full -mr-32 -mt-32" />

                                <div className="p-12 relative flex flex-col h-full space-y-10">
                                    <div className="flex justify-between items-start">
                                        <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-red-600 border border-gray-100 dark:border-white/5 group-hover:bg-red-600 group-hover:text-white transition-all duration-700">
                                            <span className="text-2xl font-black leading-none">{offer.discountType === 'PERCENT' ? `${offer.discountValue}%` : `₹${offer.discountValue}`}</span>
                                            <span className="text-[8px] font-black uppercase tracking-widest mt-1">Reduction</span>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-white/5 px-4 py-1.5 rounded-full border border-gray-100 dark:border-white/5">
                                            <span className="text-[8px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest italic">{offer.applicableOn} ACCESS</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1.1] italic font-heading group-hover:text-red-600 transition-colors uppercase">{offer.title}</h3>
                                        <div className="flex items-center gap-3 py-3 px-5 bg-gray-50 dark:bg-white/5 rounded-2xl w-max border border-gray-100 dark:border-white/5 group-hover:border-red-600/30 transition-all">
                                            <Tag size={14} className="text-red-500" />
                                            <span className="text-sm font-black text-gray-900 dark:text-white tracking-[0.2em]">{offer.code}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-light leading-relaxed italic font-body">
                                        "{offer.description}. Governed by signature architectural standards and elite guest protocols."
                                    </p>

                                    <div className="grid grid-cols-1 gap-6 pt-10 border-t border-gray-100 dark:border-white/10 mt-auto">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-red-600">
                                                <Clock size={12} />
                                                <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Validity Sequence</span>
                                            </div>
                                            <p className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest">
                                                {new Date(offer.validTill).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>

                                        {offer.minBookingAmount > 0 && (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-red-600">
                                                    <Info size={12} />
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Entry Floor</span>
                                                </div>
                                                <p className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest">Min ₹{offer.minBookingAmount.toLocaleString()}</p>
                                            </div>
                                        )}

                                        {offer.discountType === 'PERCENT' && offer.maxDiscount && (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-red-600">
                                                    <ShieldCheck size={12} />
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Cap Protocol</span>
                                                </div>
                                                <p className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest">Max ₹{offer.maxDiscount.toLocaleString()}</p>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(offer.code);
                                            import("react-hot-toast").then(t => t.default.success("Code Captured to System"));
                                        }}
                                        className="w-full py-6 bg-gray-100 dark:bg-white text-gray-900 dark:text-black rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-700 shadow-xl flex items-center justify-center gap-4 group/btn active:scale-95"
                                    >
                                        Copy Code <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Info Strip */}
                <div className="mt-32 p-12 bg-gray-50 dark:bg-white/5 rounded-[4rem] flex flex-col md:flex-row items-center gap-10 border border-gray-100 dark:border-white/5">
                    <div className="flex -space-x-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-14 h-14 rounded-full border-4 border-white dark:border-[#050505] overflow-hidden bg-gray-200">
                                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 space-y-2 text-center md:text-left">
                        <h4 className="text-lg font-black uppercase tracking-tight text-gray-900 dark:text-white italic">Elite Access Program</h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-light italic">Join over 12,000 global travelers who receive early-access incentive protocols and private sanctuary unveilings.</p>
                    </div>
                    <button className="px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] active:scale-95">Enroll Now</button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .outline-text {
                    -webkit-text-stroke: 1px currentColor;
                    color: transparent;
                }
                .dark .outline-text {
                    -webkit-text-stroke: 1px white;
                }
            `}} />
        </section>
    );
};

export default Offers;
