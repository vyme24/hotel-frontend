import React from "react";
import { useGetNotificationAllQuery, useUpdateNotificationMutation } from "../services/notification";
import { Bell, CheckCircle2, Clock, Trash2, ArrowLeft, Info, Zap, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Notifications = () => {
    const { data, isLoading, isError, refetch } = useGetNotificationAllQuery();
    const [updateNotification] = useUpdateNotificationMutation();
    const navigate = useNavigate();
    const notifications = data?.data ?? [];

    const handleMarkAsRead = async (id) => {
        try {
            await updateNotification({ id, isRead: true }).unwrap();
            refetch();
        } catch (error) {
            toast.error("Protocol error during update.");
        }
    };

    if (isLoading)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#050505]">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-8" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] animate-pulse italic">Syncing Intelligence Stream...</p>
            </div>
        );

    return (
        <section className="bg-white dark:bg-[#050505] min-h-screen pt-40 pb-32">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header Sequence */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 border-b border-gray-50 dark:border-white/5 pb-24">
                    <div className="space-y-8 max-w-xl">
                        <button
                            onClick={() => navigate(-1)}
                            className="group flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] hover:text-red-600 transition-all"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Terminal
                        </button>
                        <h1 className="text-4xl md:text-3xl font-black text-gray-900 dark:text-white leading-[0.85] tracking-tighter uppercase font-heading">
                            INBOX <br />
                            <span className="italic outline-text underline underline-offset-[20px] decoration-red-600/20">ALERTS</span>
                        </h1>
                    </div>
                    <div className="flex flex-col md:items-end gap-1">
                        <span className="text-[8px] font-black text-red-600 uppercase tracking-[0.5em] mb-4 text-right">Activity Stream</span>
                        <div className="px-8 py-4 bg-gray-900 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3">
                            <Bell size={14} className="text-red-500 animate-bounce" /> {notifications.length} Active Packets
                        </div>
                    </div>
                </div>

                {/* Notifications Logic */}
                {notifications.length === 0 ? (
                    <div className="bg-gray-50 dark:bg-white/5 rounded-[4.5rem] p-32 text-center border border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center">
                        <div className="w-24 h-24 bg-white dark:bg-black rounded-[2.5rem] shadow-sm flex items-center justify-center mb-12 text-gray-200">
                            <ShieldCheck size={24} />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">Stream is <span className="italic text-gray-400">Pristine</span></h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm font-light italic mb-12 leading-relaxed">"No new intelligence packets detected. Your security and logistical status is currently nominal."</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {notifications.map((note) => (
                            <div
                                key={note._id}
                                className={`group p-10 rounded-[3rem] border transition-all duration-700 hover:shadow-2xl flex flex-col md:flex-row items-center gap-10 hover:-translate-y-1 ${note.isRead
                                        ? 'bg-white dark:bg-[#0a0a0a] border-gray-100 dark:border-white/5 opacity-60 hover:opacity-100'
                                        : 'bg-red-50/10 dark:bg-red-900/5 border-red-600/20'
                                    }`}
                            >
                                <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center flex-shrink-0 transition-all ${note.isRead ? 'bg-gray-50 dark:bg-white/5 text-gray-400' : 'bg-red-600 text-white shadow-2xl shadow-red-600/30'
                                    }`}>
                                    {note.type === 'booking' ? <Clock size={28} /> : <Zap size={28} />}
                                </div>

                                <div className="flex-1 space-y-4 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-4">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${note.isRead ? 'text-gray-400' : 'text-red-600'}`}>
                                            {note.type || 'System Packet'}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-medium italic">• {new Date(note.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none italic">{note.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-xl">{note.message}</p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {!note.isRead && (
                                        <button
                                            onClick={() => handleMarkAsRead(note._id)}
                                            className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all shadow-xl group/btn"
                                        >
                                            <CheckCircle2 size={20} className="group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                    )}
                                    <button className="w-14 h-14 bg-gray-50 dark:bg-white/5 text-gray-300 rounded-2xl flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

export default Notifications;
