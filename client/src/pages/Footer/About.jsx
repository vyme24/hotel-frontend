import React from "react";
import {
  Hotel,
  Globe,
  Shield,
  Heart,
  Users,
  Award,
  Clock,
  CheckCircle,
  Star,
  Sparkles,
  ArrowRight
} from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-hidden">

      {/* Hero Section */}
      <section className="relative py-24 md:py-40 bg-gray-900 border-b border-gray-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-600/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-600/10 rounded-full mb-8 border border-red-600/20">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">
              The Heritage of Excellence
            </span>
          </div>

          <h1 className="text-3xl md:text-3xl font-black text-white mb-8 tracking-tighter">
            Redine <span className="text-red-600 italic">Travel</span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            LuxStay is not just a booking platform. It's a sanctuary for the modern traveler, where global sophistication meets local warmth.
          </p>

          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center">
              <p className="text-xl font-black text-white">4.9</p>
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-red-600 text-red-600" />)}
              </div>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest text-center">Global Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6 -mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, val: "500K+", label: "Elite Members" },
              { icon: Hotel, val: "50K+", label: "Curated Hotels" },
              { icon: Globe, val: "150+", label: "Destinations" },
              { icon: Clock, val: "24/7", label: "Concierge" }
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-8 text-center border border-gray-100 dark:border-gray-800 transform hover:-translate-y-2 transition-all duration-500">
                <stat.icon className="h-6 w-6 text-red-600 mx-auto mb-4" />
                <div className="text-xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">{stat.val}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-red-50 dark:bg-red-900/10 rounded-full border border-red-100 dark:border-red-900/30 font-black text-[9px] text-red-600 uppercase tracking-widest">
              Our Narrative
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
              Crafting <span className="text-red-600">Unforgettable</span> Stays Since 2015
            </h2>
            <div className="space-y-6 text-gray-500 dark:text-gray-400 font-light leading-relaxed text-lg">
              <p>LuxStay emerged from a singular vision: to democratize luxury travel without compromising on the executive standards of hospitality.</p>
              <p>What began as a boutique collection of 100 handpicked hotels has evolved into a global network of 50,000+ properties across 150 countries, each vetted for excellence.</p>
              <p>We are driven by the intersection of cutting-edge technology and the timeless principles of hospitality—ensuring every stay is seamless, secure, and purely spectacular.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {['Guaranteed Best Price', 'Zero Booking Fees', 'Instant Confirmation', 'Premium Concierge'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-50 dark:bg-green-900/10 flex items-center justify-center text-green-600">
                    <CheckCircle size={14} />
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-red-600/20 rounded-[3rem] blur-2xl group-hover:bg-red-600/30 transition-all duration-700 opacity-50" />
            <div className="relative bg-gray-50 dark:bg-gray-900 rounded-[3rem] p-12 border border-gray-100 dark:border-gray-800 shadow-2xl">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 tracking-tight italic">Our Milestones</h3>
              <div className="space-y-8 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-red-600/10" />
                {[
                  { yr: '2015', txt: 'Inception in New Delhi' },
                  { yr: '2017', txt: '10,000 Premium Properties reached' },
                  { yr: '2019', txt: 'Redefining Mobile Luxury stays' },
                  { yr: '2021', txt: '5 Million Trust Milestones achieved' },
                  { yr: '2024', txt: 'Awarded Elite Hospitality Platform' }
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-6 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-red-600 border-4 border-white dark:border-gray-900 shadow-xl shadow-red-600/20" />
                    <div>
                      <span className="text-xs font-black text-red-600 uppercase tracking-widest">{m.yr}</span>
                      <p className="text-sm font-bold text-gray-600 dark:text-gray-300 tracking-tight">{m.txt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Our Core <span className="text-red-600 italic">Values</span></h2>
            <p className="text-gray-500 font-light max-w-lg mx-auto uppercase tracking-widest text-[10px]">The pillars of the LuxStay experience</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Unwavering Trust", desc: "Military-grade data protection and transparent transactions.", color: "text-red-500" },
              { icon: Heart, title: "Guest Centric", desc: "Predicting your needs before you even realize them.", color: "text-red-600" },
              { icon: Globe, title: "Global Vision", desc: "Bringing the world's finest keys to your fingertips.", color: "text-gray-400" },
              { icon: Award, title: "Elite Quality", desc: "No compromise on the standards of our curated stays.", color: "text-red-700" }
            ].map((v, i) => (
              <div key={i} className="group bg-white dark:bg-gray-900 rounded-[2rem] p-10 shadow-xl border border-gray-100 dark:border-gray-800 hover:-translate-y-3 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <v.icon className={`h-7 w-7 ${v.color}`} />
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3 tracking-tight">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 blur-[120px] rounded-full -z-10" />
        <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter">
          Join the <span className="text-red-600 italic">Sanctuary</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-12 font-light text-lg">
          Experience why millions of travelers choose LuxStay for their most precious memories.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a href="/search" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-red-600 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl shadow-2xl shadow-red-600/30 hover:bg-black transition-all duration-500 transform hover:-translate-y-1">
            Search Hotels
            <ArrowRight size={14} />
          </a>
          <a href="/contact" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition-all duration-500 transform hover:-translate-y-1">
            Executive Inquiry
          </a>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
