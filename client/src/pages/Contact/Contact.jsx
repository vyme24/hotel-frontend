import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Headset, MessageCircle, ChevronDown, User, Sparkles, Send, ShieldCheck } from 'lucide-react';

const Contact = () => {
    // --- Accordion Item Component ---
    const FaqItem = ({ question, answer }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="mb-4 bg-white dark:bg-gray-950 rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm transition-all hover:border-red-600/20">
                <button
                    className="flex justify-between items-center w-full p-8 text-left text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {question}
                    <ChevronDown className={`w-4 h-4 ml-4 transition-transform duration-500 text-red-600 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100 p-8 pt-0' : 'max-h-0 opacity-0'}`}
                >
                    <div className="text-gray-500 dark:text-gray-400 font-light leading-relaxed text-base border-t border-gray-100 dark:border-gray-800 pt-6 italic">
                        {answer}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-950 pt-20">
            {/* Hero Section */}
            <section className="relative py-24 bg-gray-900 overflow-hidden border-b border-gray-800">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 rounded-full mb-8 border border-red-600/20">
                        <Headset className="w-4 h-4 text-red-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
                            24/7 Global Support
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-3xl font-black text-white mb-8 tracking-tighter">
                        Concierge <span className="text-red-600 italic">Access</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                        Whether you seek a bespoke booking or high-priority assistance, our executive support team is standing by.
                    </p>

                    <div className="flex justify-center gap-8 flex-wrap">
                        <a href="tel:+918894810531" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all group">
                            <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                                <Phone size={18} className="text-red-500 group-hover:text-white" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">+91 88948 10531</span>
                        </a>
                        <a href="mailto:concierge@luxstay.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all group">
                            <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                                <Mail size={18} className="text-red-500 group-hover:text-white" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">concierge@luxstay.com</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16">

                        {/* Contact Form */}
                        <div className="lg:col-span-7">
                            <div className="bg-white dark:bg-gray-950 rounded-[3rem] p-10 md:p-16 border border-gray-100 dark:border-gray-800 shadow-[0_50px_100px_rgba(0,0,0,0.05)]">
                                <div className="mb-12">
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-4">Direct Inquiry</h3>
                                    <p className="text-gray-500 font-light text-sm uppercase tracking-widest">Expect a response from our elite team within 30 minutes</p>
                                </div>

                                <form className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-red-600">First Name</label>
                                            <input type="text" className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-red-600/30 rounded-2xl outline-none transition-all text-gray-900 dark:text-white font-medium" placeholder="Alexander" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                                            <input type="text" className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-red-600/30 rounded-2xl outline-none transition-all text-gray-900 dark:text-white font-medium" placeholder="Pierce" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                                            <input type="email" className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-red-600/30 rounded-2xl outline-none transition-all text-gray-900 dark:text-white font-medium" placeholder="alex@corporate.com" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact No.</label>
                                            <input type="tel" className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-red-600/30 rounded-2xl outline-none transition-all text-gray-900 dark:text-white font-medium" placeholder="+91 XXX XXX XXXX" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject of interest</label>
                                        <div className="relative">
                                            <select className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-red-600/30 rounded-2xl outline-none transition-all text-gray-900 dark:text-white font-medium appearance-none">
                                                <option>Elite Booking Protocol</option>
                                                <option>Corporate Partnership</option>
                                                <option>Property Integration</option>
                                                <option>Feedback & Experience</option>
                                            </select>
                                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={18} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
                                        <textarea className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-red-600/30 rounded-2xl outline-none transition-all text-gray-900 dark:text-white font-medium resize-none" rows={6} placeholder="How can we elevate your stay?" required />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-red-600 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl shadow-2xl shadow-red-600/30 hover:bg-black transition-all duration-500 transform hover:-translate-y-1 group"
                                    >
                                        <span className="flex items-center justify-center gap-3">
                                            Transmit Message
                                            <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="lg:col-span-5 space-y-10">

                            {/* Headquarters */}
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
                                        <MapPin size={22} />
                                    </div>
                                    <h4 className="text-xl font-black text-gray-900 dark:text-white tracking-tight italic">Global Headquarters</h4>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                                            <span className="block font-black text-xs text-gray-900 dark:text-white uppercase tracking-widest mb-2">Sanctuary One</span>
                                            12th Floor, Elite Arch
                                            <br />
                                            Andheri East Business District
                                            <br />
                                            Mumbai 400072, Bharat
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 text-red-600">
                                        <Clock size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Always Online (24/7/365)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Widgets */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-red-600 rounded-[2rem] p-8 text-white group cursor-default">
                                    <ShieldCheck size={20} className="mb-6 opacity-80 group-hover:scale-110 transition-transform" />
                                    <h5 className="font-black uppercase tracking-widest text-[10px] mb-2 leading-none">Security</h5>
                                    <p className="text-[10px] font-light opacity-80 uppercase tracking-widest">AES-256 Vaulted Comms</p>
                                </div>
                                <div className="bg-gray-900 dark:bg-white rounded-[2rem] p-8 text-white dark:text-gray-900 group cursor-default">
                                    <Sparkles size={20} className="mb-6 opacity-80 text-red-600 group-hover:animate-pulse" />
                                    <h5 className="font-black uppercase tracking-widest text-[10px] mb-2 leading-none">Excellence</h5>
                                    <p className="text-[10px] font-light opacity-80 uppercase tracking-widest">Certified 5-Star Hub</p>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 h-[300px] shadow-2xl">
                                <iframe
                                    title="LuxStay Headquarters Map"
                                    src="https://maps.google.com/maps?q=Andheri+East,+Mumbai,+India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(90%)' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* FAQ Strategy Section */}
            <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">Instant <span className="text-red-600">Intelligence</span></h2>
                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em]">Common resolutions for the discerning guest</p>
                    </div>

                    <div className="space-y-4">
                        <FaqItem
                            question="How can I modify a luxury reservation?"
                            answer="Our elite members can modify bookings directly through the executive dashboard. For high-priority changes, contact your dedicated concierge via the secure line provided in your confirmation protocol."
                        />
                        <FaqItem
                            question="Is the financial gateway encrypted?"
                            answer="Precisely. Every transaction on LuxStay is protected by military-grade SSL encryption and processed through our sandboxed financial vaults. We do not store executive credit credentials."
                        />
                        <FaqItem
                            question="Do you offer global corporate accounts?"
                            answer="LuxStay Corporate is specifically designed for high-performing organizations. Bespoke billing, priority room blocks, and dedicated account managers are available for our enterprise partners."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
