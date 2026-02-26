import React from "react";
import {
  Briefcase,
  Users,
  Target,
  Award,
  Clock,
  DollarSign,
  Heart,
  MapPin,
  ChevronRight,
  Mail,
  GraduationCap,
  Zap,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const Careers = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gray-900 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 rounded-full mb-8 border border-red-600/20">
            <Briefcase className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
              Careers at LuxStay
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter">
            Build the Future of <span className="text-red-600 italic">Hospitality</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Join an elite team dedicated to redefining the luxury booking experience through innovation, design, and impeccable service.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <div className="flex items-center gap-2">
              <Users size={14} className="text-red-600" /> 200+ Visionaries
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-red-600" /> Global & Remote
            </div>
            <div className="flex items-center gap-2">
              <Target size={14} className="text-red-600" /> Series B Scale
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">The LuxStay <span className="text-red-600 italic">Legacy</span></h2>
            <p className="text-gray-500 font-light max-w-lg mx-auto uppercase tracking-widest text-[10px]">Why top talent chooses us</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: DollarSign, title: "Executive Compensation", desc: "Industry-leading packages with equity options.", color: "text-green-500" },
              { icon: Clock, title: "Pure Flexibility", desc: "Work from anywhere in the world on your schedule.", color: "text-red-600" },
              { icon: Heart, title: "Holistic Wellness", desc: "Comprehensive health and mental wellness coverage.", color: "text-red-500" },
              { icon: GraduationCap, title: "Continuous Mastery", desc: "Generous budget for personal and professional growth.", color: "text-gray-400" },
              { icon: Award, title: "Meritocratic Rewards", desc: "Bi-annual bonuses and performance incentives.", color: "text-red-700" },
              { icon: Zap, title: "Cutting Edge Stack", desc: "Build with the latest technologies and tools.", color: "text-amber-500" }
            ].map((v, i) => (
              <div key={i} className="group bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-xl border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                  <v.icon className={`h-6 w-6 ${v.color} group-hover:text-white`} />
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3 tracking-tight">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-4">Open <span className="text-red-600 italic">Quests</span></h2>
            <p className="text-gray-500 font-light uppercase tracking-widest text-[10px]">Current opportunities to lead</p>
          </div>

          <div className="space-y-6 text-center">
            <div className="bg-white dark:bg-gray-950 p-12 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-6 py-2 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest rounded-bl-3xl">
                High Priority
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Engineering & Design</h3>
              <p className="text-gray-500 font-light mb-8 max-w-md mx-auto">We are actively seeking visionary developers and designers to build our next generation mobile ecosystem.</p>

              <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-red-600/20 hover:bg-black transition-all">
                Inquire for Details
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="mt-12 text-center decoration-red-600 underline-offset-8">
              <a
                href="mailto:talent@luxstay.com"
                className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-red-600 transition-colors"
              >
                <Mail size={16} className="text-red-600" />
                Submit Spontaneous Application
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <h2 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">Not Ready <span className="text-red-600 italic">Yet?</span></h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 font-light leading-relaxed">
          Follow our journey on LinkedIn or stay tuned for our next talent wave.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/blog" className="px-10 py-5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
            Inside LuxStay
          </Link>
          <Link to="/contact" className="px-10 py-5 bg-black text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-red-600 transition-all">
            Talk to Talent Team
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Careers;
