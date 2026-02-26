import React from "react";
import { ShieldAlert, Clock, RefreshCcw, FileText, CheckCircle, Info } from "lucide-react";

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-32 pb-24">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 rounded-full mb-8 border border-red-600/20">
          <ShieldAlert className="w-4 h-4 text-red-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Flexibility Framework</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-8 leading-none italic">
          Cancellation <span className="text-red-600">Protocol</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed italic">
          "At LuxStay, we understand that luxury is also having the flexibility to change your plans seamlessly."
        </p>
      </section>

      {/* Policy Tiers */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 mb-24">
        <div className="bg-gray-50 dark:bg-gray-900/50 p-12 rounded-[3rem] border border-gray-100 dark:border-white/5 space-y-8">
            <div className="w-16 h-16 bg-white dark:bg-black rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
                <Clock size={20} />
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Standard Window</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                    Cancellations initiated more than 24 hours prior to the scheduled arrival time are eligible for a full credit restoration or refund.
                </p>
                <div className="pt-4 space-y-3">
                    {["Full Refund Eligibility", "No Restocking Fees", "Priority Processing"].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-500">
                            <CheckCircle size={14} className="text-green-500" /> {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 p-12 rounded-[3rem] border border-gray-100 dark:border-white/5 space-y-8">
            <div className="w-16 h-16 bg-white dark:bg-black rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
                <ShieldAlert size={20} />
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Executive Window</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                    Cancellations within the 24-hour window may be subject to a one-night commitment fee as per architectural reservation standards.
                </p>
                <div className="pt-4 space-y-3">
                    {["Partial Credit Rescue", "Concierge Review", "Emergency Waivers"].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-500">
                            <Info size={14} className="text-red-500" /> {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Detailed Clauses */}
      <section className="max-w-4xl mx-auto px-6 space-y-16">
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-0.5 bg-red-600" />
                <h2 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.4em]">Detailed Framework</h2>
            </div>
            
            <div className="space-y-12">
                {[
                    { title: "Refund Timelines", content: "Financial restorations are typically processed within 5-7 executive business days, depending on your banking institution's settlement protocols." },
                    { title: "Non-Refundable Selections", content: "Certain promotional or 'Flash Investment' rates may be designated as non-refundable. These are always explicitly marked during the selection process." },
                    { title: "No-Show Governance", content: "Failure to arrive without prior notification will result in the forfeiture of the full booking commitment to cover the reserved architectural capacity." }
                ].map((clause, i) => (
                    <div key={i} className="space-y-3">
                        <h4 className="text-lg font-black text-gray-900 dark:text-white italic tracking-tight">{clause.title}</h4>
                        <p className="text-sm text-gray-400 font-light leading-relaxed">{clause.content}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-red-600 p-12 rounded-[3.5rem] text-center text-white shadow-2xl shadow-red-600/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-700/50 translate-y-full hover:translate-y-0 transition-transform duration-700" />
            <div className="relative z-10">
                <RefreshCcw size={24} className="mx-auto mb-6 opacity-50" />
                <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Need Immediate Modification?</h3>
                <p className="text-red-100 font-light mb-8 max-w-sm mx-auto uppercase tracking-widest text-[9px]">Contact our global concierge for priority assistance</p>
                <a href="/contact" className="inline-flex items-center px-10 py-5 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all shadow-xl">
                    Executive Inquiry
                </a>
            </div>
        </div>
      </section>
    </div>
  );
};

export default CancellationPolicy;
