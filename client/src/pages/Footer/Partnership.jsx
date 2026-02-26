import React from "react";
import {
  Handshake,
  Building,
  Users,
  Globe,
  Shield,
  TrendingUp,
  BarChart,
  DollarSign,
  Headphones,
  Award,
  Zap,
  ChevronRight,
  Mail,
  Calendar,
  Sparkles
} from "lucide-react";

const Partnership = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gray-900 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 rounded-full mb-8 border border-red-600/20">
            <Handshake className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
              Growth & Alliances
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter">
            Elevate Your <span className="text-red-600 italic">Portfolio</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Partner with LuxStay to access a global network of elite travelers and cutting-edge distribution technology.
          </p>

          <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <div className="flex items-center gap-2">
              <Building size={14} className="text-red-600" /> 50K+ Properties
            </div>
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-red-600" /> 150+ Markets
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-red-600" /> 5K+ Active Partners
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Executive <span className="text-red-600 italic">Programs</span></h2>
            <p className="text-gray-500 font-light max-w-lg mx-auto uppercase tracking-widest text-[10px]">Tailored solutions for every scale</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Building, title: "Property Owners", desc: "List your boutique or luxury hotel in our exclusive collection.", points: ["Global Visibility", "Executive Marketing", "Live Inventory"] },
              { icon: Users, title: "Travel Curators", desc: "For agencies seeking high-tier commissions and support.", points: ["Priority Access", "Dedicated Desk", "Custom White-label"] },
              { icon: Globe, title: "Enterprise", desc: "Corporate travel solutions for global organizations.", points: ["Volume Rates", "Account Director", "Expense Analytics"] },
              { icon: Shield, title: "Technology", desc: "API integrations and digital distribution alliances.", points: ["Secure Webhooks", "Real-time Sync", "Co-engineered Solutions"] }
            ].map((v, i) => (
              <div key={i} className="group bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-gray-50 dark:border-gray-800 hover:-translate-y-3 transition-all duration-500 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-6 border border-gray-100 dark:border-gray-700 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                  <v.icon className={`h-6 w-6 text-red-600 group-hover:text-white`} />
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3 tracking-tight">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-6 flex-grow">{v.desc}</p>
                <ul className="space-y-2 mb-8">
                  {v.points.map((p, pi) => (
                    <li key={pi} className="flex items-center gap-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                      <Sparkles size={10} className="text-red-500" />
                      {p}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                  Explore Program
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: "Infinite Scale", desc: "Access high-spending demographics across multiple continents." },
              { icon: BarChart, title: "Smart Analytics", desc: "Real-time performance metrics and guest behavior insights." },
              { icon: DollarSign, title: "Optimized Yield", desc: "Dynamic pricing tools to maximize your revenue per room." },
              { icon: Headphones, title: "Elite Support", desc: "A dedicated partnership manager available 24/7." },
              { icon: Award, title: "Brand Prestige", desc: "Align with the most trusted name in luxury hospitality." },
              { icon: Zap, title: "Rapid Onboarding", desc: "Deploy your assets on our platform in record time." }
            ].map((v, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                  <v.icon className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900 dark:text-white mb-2 tracking-tight">{v.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
              Initiate your <span className="text-red-600 italic">Alliance</span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Our elite partnership team is ready to discuss how we can amplify your reach and refine your distribution strategy.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 lg:justify-start justify-center">
                <Mail className="text-red-600" />
                alliances@luxstay.com
              </div>
              <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 lg:justify-start justify-center">
                <Calendar className="text-red-600" />
                Schedule Executive Briefing
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-red-600/10 rounded-[3rem] blur-3xl opacity-50" />
            <div className="relative bg-white dark:bg-gray-900 p-10 md:p-14 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Partnership Inquiry</h3>
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-12 px-6 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl text-center">
                  <Zap className="w-12 h-12 text-red-600 mb-6 animate-pulse" />
                  <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2">System Enhancement in Progress</h4>
                  <p className="text-sm text-gray-400 font-light max-w-xs mb-8">We are updating our partner portal. Please contact our concierge directly for immediate inquiries.</p>
                  <a
                    href="mailto:alliances@luxstay.com"
                    className="px-10 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-red-600/20 hover:bg-black transition-all"
                  >
                    Contact Concierge
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Partnership;
