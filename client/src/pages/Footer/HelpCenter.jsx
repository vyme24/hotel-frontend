import React from "react";
import { HelpCircle, Search, MessageSquare, Phone, Mail, ChevronRight, Sparkles, ShieldCheck } from "lucide-react";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-32 pb-24">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 rounded-full mb-8 border border-red-600/20">
          <HelpCircle className="w-4 h-4 text-red-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">LuxStay Support Protocol</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-8 leading-none italic">
          Executive <span className="text-red-600">Assistance</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed italic">
          "Navigating your luxury journey should be as seamless as your stay. Our dedicated assistance team is available 24/7."
        </p>
      </section>

      {/* Quick Access Categories */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 mb-24">
        {[
          { icon: Sparkles, title: "Booking Management", desc: "Modify, extend, or secure your signature reservations." },
          { icon: ShieldCheck, title: "Payment Security", desc: "Understanding our encrypted transaction protocols and invoicing." },
          { icon: MessageSquare, title: "Member Experience", desc: "Exclusive benefits, loyalty status, and profile governance." }
        ].map((cat, i) => (
          <div key={i} className="bg-gray-50 dark:bg-gray-900/50 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-12 h-12 bg-white dark:bg-gray-950 rounded-2xl flex items-center justify-center text-red-600 mb-6 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-all">
              <cat.icon size={24} />
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 uppercase tracking-tight">{cat.title}</h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">{cat.desc}</p>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-600">
              Explore Articles <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </section>

      {/* Major FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 bg-gray-50 dark:bg-gray-900/20 rounded-[4rem] border border-gray-100 dark:border-white/5">
        <h2 className="text-xl font-black text-gray-900 dark:text-white text-center mb-16 uppercase tracking-tighter">Instant <span className="italic text-red-600">Intelligence</span></h2>
        <div className="space-y-4">
          {[
            { q: "How do I secure an early arrival?", a: "Elite members can request early check-in via the reservation dashboard. High-priority arrivals are secured subject to suite restoration cycles." },
            { q: "What is the signature refund protocol?", a: "Cancellations made within the 24-hour executive window are eligible for full credit restoration. Detailed timelines are available in our Cancellation Framework." },
            { q: "Are international transactions supported?", a: "Precisely. Our financial gateways support localized currency settlement for 150+ countries under military-grade encryption." }
          ].map((faq, i) => (
            <div key={i} className="bg-white dark:bg-gray-950 p-8 rounded-3xl border border-gray-50 dark:border-gray-800 shadow-sm">
              <h4 className="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-widest mb-3 italic">{faq.q}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Concierge */}
      <section className="max-w-7xl mx-auto px-6 mt-24 text-center">
        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-12 uppercase tracking-tighter italic">Direct <span className="text-red-600">Concierge</span></h2>
        <div className="flex flex-wrap justify-center gap-12">
            <a href="mailto:arvind889481@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <Mail size={20} />
                </div>
                <div className="text-left">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Email Support</span>
                    <span className="text-sm font-black text-gray-900 dark:text-white">arvind889481@gmail.com</span>
                </div>
            </a>
            <a href="tel:+918894810531" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <Phone size={20} />
                </div>
                <div className="text-left">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Voice Line</span>
                    <span className="text-sm font-black text-gray-900 dark:text-white">+91 88948 10531</span>
                </div>
            </a>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
