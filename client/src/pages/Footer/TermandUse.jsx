import React from "react";
import { FileText, AlertCircle, Shield, CreditCard, Scale, Mail, CheckCircle, Sparkles } from "lucide-react";

const TermandUse = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 rounded-full mb-6 border border-red-600/20">
            <FileText className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
              Service Agreement
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tighter">
            Terms of <span className="text-red-600 italic">Engagement</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6 font-light leading-relaxed">
            The legal framework governing your luxury travel experiences and our commitment to excellence.
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-600/5 dark:bg-red-600/10 border border-red-600/20 rounded-2xl max-w-xl text-left">
            <AlertCircle className="text-red-500 flex-shrink-0" size={18} />
            <p className="text-red-200/80 text-[10px] uppercase font-bold tracking-widest leading-relaxed">
              By accessing the LuxStay platform, you enter into a binding covenant with our global hospitality collective.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">

          {/* Acceptance */}
          <div className="mb-16 space-y-6">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3 italic">
              Covenant Acceptance
            </h2>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                Utilization of LuxStay services constitutes an absolute acceptance of these terms. Our digital and physical sanctuaries are reserved for those who align with our standards of conduct and mutual respect.
              </p>
            </div>
          </div>

          {/* Grid of Terms */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {[
              { icon: Shield, title: "Eligibility", desc: "Access is exclusive to individuals aged 18 and above with full legal capacity." },
              { icon: Sparkles, title: "Service Scope", desc: "LuxStay acts as an elite intermediary, curating third-party hospitality assets of the highest caliber." },
              { icon: Scale, title: "Account Sovereignty", desc: "Members maintain total responsibility for their credential security and all associated activities." },
              { icon: CreditCard, title: "Transaction Logic", desc: "Bookings are subject to dynamic availability and individual property protocols. All payments are secured via high-tier encryption." }
            ].map((item, i) => (
              <div key={i} className="group p-10 bg-white dark:bg-gray-950 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl transition-all hover:border-red-600/20">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                  <item.icon size={20} />
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3 tracking-tight">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Conduct */}
          <div className="mb-24 space-y-8">
            <div className="text-center">
              <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-4">The <span className="text-red-600 italic">Code of Conduct</span></h2>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.3em]">Behaviors strictly prohibited within our network</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Utilization for illicit or state-violating activities",
                "Dissemination of fraudulent or malevolent content",
                "Interruption of platform architectural integrity",
                "Generation of non-authentic reservation inquiries"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <div className="w-2 h-2 rounded-full bg-red-600" />
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Finalization */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-black rounded-[3rem] blur-xl opacity-20" />
            <div className="relative bg-gray-900 p-12 md:p-16 rounded-[3rem] text-center border border-gray-800">
              <CheckCircle size={20} className="text-red-500 mx-auto mb-8 animate-pulse" />
              <h2 className="text-xl font-black text-white mb-6 tracking-tighter">Agreement Finality</h2>
              <p className="text-gray-400 font-light mb-10 max-w-sm mx-auto leading-relaxed">
                By persisting in your exploration of LuxStay, you signify your unreserved commitment to these Terms of Engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4 border-t border-gray-800">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Legal Archives</p>
                  <a href="mailto:legal@luxstay.com" className="text-sm font-bold text-white hover:text-red-600 transition-colors">legal@luxstay.com</a>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Global Registry</p>
                  <span className="text-sm font-bold text-white">+91 88948 10531</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default TermandUse;
