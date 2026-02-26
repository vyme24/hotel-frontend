import React from "react";
import { Shield, Lock, Eye, Mail, AlertCircle, Sparkles } from "lucide-react";

const PrivacyandPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 rounded-full mb-6 border border-red-600/20">
            <Shield className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
              Secure Sanctuary
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tighter">
            Privacy <span className="text-red-600 italic">Governance</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4 font-light leading-relaxed">
            Our commitment to protecting your digital footprint is as robust as our dedication to your physical comfort.
          </p>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 italic">Effective: October 26, 2024</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">

          {/* Section 1 */}
          <div className="mb-16 space-y-6">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
              <span className="text-red-600 text-sm italic mr-2 font-black">01</span>
              Introduction
            </h2>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                Welcome to the LuxStay network. Your privacy is the cornerstone of our trust. This document outlines the sophisticated protocols we employ to collect, utilize, and safeguard your personal data across our global platform.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-16 space-y-6">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
              <span className="text-red-600 text-sm italic mr-2 font-black">02</span>
              Intelligence Collection
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Identities", desc: "Names, executive handles, and contact credentials." },
                { title: "Financials", desc: "Encrypted payment tokens and transaction histories." },
                { title: "Digital Footprint", desc: "IP metadata, device profiles, and behavioral paths." },
                { title: "Associations", desc: "Third-party loyalty data and social integrations." }
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-gray-950 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-100/10 transition-all hover:border-red-600/20 group">
                  <Sparkles size={14} className="text-red-600 mb-4 group-hover:animate-pulse" />
                  <h3 className="text-sm font-black text-gray-900 dark:text-white mb-2 uppercase tracking-widest">{item.title}</h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-16 space-y-6 text-center">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Data <span className="text-red-600 italic">Security</span>
            </h2>
            <div className="relative group">
              <div className="absolute -inset-4 bg-red-600/5 rounded-[3rem] blur-2xl opacity-50" />
              <div className="relative bg-gray-900 p-12 rounded-[2.5rem] text-center border border-gray-800">
                <Lock size={20} className="text-red-600 mx-auto mb-6" />
                <p className="text-gray-400 font-light leading-relaxed max-w-xl mx-auto italic">
                  "We employ military-grade AES-256 encryption for all data at rest and TLS 1.3 for data in transit. Your security is not a feature; it is our foundation."
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-24 space-y-6">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
              <span className="text-red-600 text-sm italic mr-2 font-black">03</span>
              Member Rights
            </h2>
            <div className="space-y-4">
              {[
                { icon: Eye, title: "Transparency", desc: "Unlimited access to request a summary of your data stored within our vaults." },
                { icon: Shield, title: "Erasure", desc: "The right to be forgotten across our entire digital ecosystem upon verified request." }
              ].map((right, i) => (
                <div key={i} className="flex gap-6 p-8 bg-white dark:bg-gray-950 rounded-3xl border border-gray-50 dark:border-gray-800 shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-red-600">
                    <right.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-gray-900 dark:text-white mb-1 tracking-tight">{right.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{right.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal CTA */}
          <div className="bg-red-600 p-12 md:p-16 rounded-[3rem] text-center shadow-2xl shadow-red-600/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full" />
            <h2 className="text-xl font-black text-white mb-4 tracking-tighter">Legal Concierge</h2>
            <p className="text-red-100 font-light mb-10 max-w-sm mx-auto uppercase tracking-widest text-[10px]">Direct line to our data protection officers</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="mailto:privacy@luxstay.com" className="inline-flex items-center justify-center h-16 px-8 bg-white text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-black hover:text-white transition-all">
                <Mail size={16} className="mr-3" />
                privacy@luxstay.com
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default PrivacyandPolicy;
