import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bell, Shield, Eye, Smartphone, Languages, Moon, Sun, Lock, ChevronRight, User } from "lucide-react";
import { useTheme } from "../hooks/ThemeContext";
import toast from "react-hot-toast";

const Settings = () => {
    const { user } = useSelector((state) => state.auth);
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const settingsGroups = [
        {
            title: "Security & Access",
            items: [
                { icon: Lock, label: "Authentication Sequence", desc: "Update your biometric and digital signatures", action: "Modify" },
                { icon: Shield, label: "Privacy Protocol", desc: "Manage your encrypted data visibility", action: "Configure" },
                { icon: Smartphone, label: "Device Registry", desc: "View authorized executive terminals", action: "View" }
            ]
        },
        {
            title: "Interface Standards",
            items: [
                {
                    icon: Moon, label: "Night Vision Mode", desc: "Optimize for low-light architectural study", action: "Toggle", component: (
                        <button
                            onClick={toggleTheme}
                            className="w-12 h-6 bg-red-600/20 rounded-full relative p-1 group-hover:bg-red-600/30 transition-all"
                        >
                            <div className={`w-4 h-4 bg-red-600 rounded-full transition-all duration-500 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    )
                },
                { icon: Languages, label: "Linguistic Settings", desc: "Select your preferred dialogue framework", action: "English (UK)" },
                { icon: Eye, label: "Visual Density", desc: "Toggle between expansive and compact layouts", action: "Expansive" }
            ]
        },
        {
            title: "Notification Hub",
            items: [
                { icon: Bell, label: "Intelligence Alerts", desc: "Real-time updates on signature bookings", action: "Active" }
            ]
        }
    ];

    if (!user) return null;

    return (
        <section className="bg-white dark:bg-[#050505] min-h-screen pt-40 pb-32">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Sequence */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 border-b border-gray-50 dark:border-white/5 pb-24">
                    <div className="space-y-8 max-w-2xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 italic">
                            <Shield size={14} className="text-red-600" />
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Protocol Governance</span>
                        </div>
                        <h1 className="text-4xl md:text-3xl font-black text-gray-900 dark:text-white leading-[0.85] tracking-tighter uppercase font-heading">
                            DIGITAL <br />
                            <span className="italic outline-text">PREFERENCES</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed italic">
                            "Fine-tune your LuxStay experience. Every parameter is designed to harmonize with your executive lifestyle standards."
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-[8px] font-black text-red-600 uppercase tracking-[0.5em] mb-4 block">System Status</span>
                        <div className="px-8 py-4 bg-gray-900 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Verified Node
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* User Mini Card */}
                    <div className="lg:col-span-4">
                        <div className="bg-[#0a0a0a] rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl sticky top-40">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full -mr-32 -mt-32" />
                            <div className="relative space-y-10">
                                <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-2xl font-black italic">
                                    {user.name?.charAt(0)}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-black uppercase tracking-tighter italic">{user.name}</h3>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Executive Tier Guest</p>
                                </div>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="w-full py-5 bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase tracking-widest rounded-2xl border border-white/5 transition-all flex items-center justify-center gap-2"
                                >
                                    <User size={12} /> View Personal Identity
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Settings Control Panel */}
                    <div className="lg:col-span-8 space-y-20">
                        {settingsGroups.map((group, i) => (
                            <div key={i} className="space-y-10">
                                <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.6em] flex items-center gap-6">
                                    {group.title} <div className="h-px flex-1 bg-gray-50 dark:bg-white/5" />
                                </h2>

                                <div className="grid grid-cols-1 gap-6">
                                    {group.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="group p-10 bg-white dark:bg-[#0a0a0a] rounded-[3rem] border border-gray-100 dark:border-white/5 hover:border-red-600/30 transition-all duration-700 shadow-sm hover:shadow-2xl cursor-pointer flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-8">
                                                <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-red-600 group-hover:text-white transition-all duration-700">
                                                    <item.icon size={24} strokeWidth={1} />
                                                </div>
                                                <div className="space-y-2">
                                                    <h4 className="text-base font-black text-gray-900 dark:text-white uppercase tracking-tight italic">{item.label}</h4>
                                                    <p className="text-[11px] text-gray-400 font-light italic">{item.desc}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                {item.component ? item.component : (
                                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.action}</span>
                                                )}
                                                <ChevronRight size={18} className="text-gray-200 group-hover:text-red-600 group-hover:translate-x-2 transition-all" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
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

export default Settings;
