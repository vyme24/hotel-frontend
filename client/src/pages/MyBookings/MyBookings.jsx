import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetMyBookingsQuery } from "../../services/booking";
import { Calendar, MapPin, Users, ChevronRight, Info, Star, ShieldCheck, ArrowRight, Zap, Clock } from "lucide-react";

const MyBookings = () => {
    const { data, isLoading, isError } = useGetMyBookingsQuery();
    const navigate = useNavigate();
    const [selectedBooking, setSelectedBooking] = React.useState(null);
    const bookings = data?.data ?? [];

    if (isLoading)
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white dark:bg-[#050505]">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-8" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] animate-pulse italic">Retrieving your travel diary...</p>
            </div>
        );

    if (isError)
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-[#050505] px-6">
                <div className="max-w-md w-full p-12 bg-gray-50 dark:bg-white/5 rounded-[4rem] text-center border border-gray-100 dark:border-white/10 shadow-2xl">
                    <div className="w-20 h-20 bg-red-50 dark:bg-red-900/10 rounded-full flex items-center justify-center mx-auto mb-10">
                        <Info className="text-red-600" size={20} />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">Connection Lost</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-12 font-light italic leading-relaxed">"Your travel history is securely preserved, but we're currently unable to establish a sync. Please retry the sequence."</p>
                    <button onClick={() => window.location.reload()} className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl active:scale-95 transition-all">Retry Synchronization</button>
                </div>
            </div>
        );

    const BookingDetailsModal = ({ booking, onClose }) => {
        if (!booking) return null;
        return (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
                <div className="relative w-full max-w-2xl bg-white dark:bg-[#0c0c0c] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 animate-scaleIn">
                    <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-red-600 z-10 p-2 bg-gray-100 dark:bg-white/5 rounded-full"><Zap size={20} fill="currentColor" /></button>

                    <div className="h-64 relative">
                        <img src={booking.hotelId?.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"} className="w-full h-full object-cover" alt="Hotel" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
                        <div className="absolute bottom-6 left-8">
                            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{booking.hotelId?.name}</h3>
                            <p className="text-red-600 text-[10px] font-black uppercase tracking-widest">{booking.roomId?.name}</p>
                        </div>
                    </div>

                    <div className="p-10 space-y-8">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block">Booking Status</span>
                                <span className="px-4 py-1.5 bg-green-500/10 text-green-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-500/20">{booking.bookingStatus || "Confirmed"}</span>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block">Payment Status</span>
                                <span className="px-4 py-1.5 bg-red-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-red-600/20">{booking.paymentStatus || "Paid"}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-gray-50 dark:border-white/5">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl text-red-600"><Calendar size={18} /></div>
                                    <div>
                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Duration Sequence</p>
                                        <p className="text-[11px] font-black uppercase tracking-tighter dark:text-white">
                                            {new Date(booking.checkInDate).toLocaleDateString('en-GB')} - {new Date(booking.checkOutDate).toLocaleDateString('en-GB')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl text-red-600"><Users size={18} /></div>
                                    <div>
                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Guest Payload</p>
                                        <p className="text-[11px] font-black uppercase tracking-tighter dark:text-white">
                                            {booking.guests?.adults} Adults, {booking.guests?.children || 0} Children
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl text-red-600"><MapPin size={18} /></div>
                                    <div>
                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Geographical Node</p>
                                        <p className="text-[11px] font-black uppercase tracking-tighter dark:text-white truncate">{booking.hotelId?.location || "Prime District, Metropolis"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl text-red-600"><ShieldCheck size={18} /></div>
                                    <div>
                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Total Settlement</p>
                                        <p className="text-[11px] font-black uppercase tracking-tighter dark:text-white">₹{booking.price?.totalAmount?.toLocaleString()} Verified</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <div className="flex items-center gap-3">
                                <Clock size={14} className="text-gray-400" />
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Reserved on {new Date(booking.createdAt).toLocaleString()}</span>
                            </div>
                            <button onClick={onClose} className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl text-[10px] font-black uppercase tracking-widest outline-none active:scale-95 transition-all">Close Entry</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="bg-white dark:bg-[#050505] min-h-screen">
            {/* Minimal Header */}
            <div className="max-w-7xl mx-auto px-6 pt-40 pb-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 border-b border-gray-50 dark:border-white/5 pb-24">
                    <div className="space-y-8 max-w-2xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 italic">
                            <Clock size={14} className="text-red-600" />
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Chronicle Sequence</span>
                        </div>
                        <h1 className="text-4xl md:text-3xl font-black text-gray-900 dark:text-white leading-[0.85] tracking-tighter uppercase font-heading">
                            TRAVEL <br />
                            <span className="italic outline-text">DIARY</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed italic">
                            "A curated history of your stays across the globe. Manage your upcoming sanctuaries and relive your finest architectural experiences."
                        </p>
                    </div>
                    <div className="flex flex-col md:items-end gap-1">
                        <span className="text-[8px] font-black text-red-600 uppercase tracking-[0.5em] mb-4">Registry Status</span>
                        <div className="px-8 py-4 bg-gray-900 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3">
                            <Zap size={14} className="text-red-500 animate-pulse" /> {bookings.length} Verified Entries
                        </div>
                    </div>
                </div>

                {bookings.length === 0 ? (
                    <div className="bg-gray-50 dark:bg-white/5 rounded-[4.5rem] p-32 text-center border border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center">
                        <div className="w-24 h-24 bg-white dark:bg-black rounded-[2.5rem] shadow-sm flex items-center justify-center mb-12 text-gray-200">
                            <Calendar size={24} />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">Your Diary is <span className="italic text-gray-400">Pristine</span></h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm font-light italic mb-12 leading-relaxed">"Every extraordinary journey begins with a single selection. Explore our collection to write your next chapter."</p>
                        <button
                            onClick={() => navigate('/hotels')}
                            className="bg-black dark:bg-white text-white dark:text-black px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all duration-700 active:scale-95"
                        >
                            Begin Your Legacy
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-12">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                onClick={() => setSelectedBooking(booking)}
                                className="group bg-white dark:bg-[#0a0a0a] rounded-[3.5rem] border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-1000 flex flex-col lg:flex-row hover:-translate-y-2 cursor-pointer"
                            >
                                {/* Media Panel */}
                                <div className="lg:w-96 h-80 lg:h-auto relative overflow-hidden">
                                    <img
                                        src={booking.roomId?.image || booking.hotelId?.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070"}
                                        alt={booking.hotelId?.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms] grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000" />
                                    <div className="absolute top-8 left-8">
                                        <div className="bg-red-600 text-white text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-2xl shadow-red-600/30 border border-white/10 uppercase">
                                            {booking.bookingStatus || "Confirmed"}
                                        </div>
                                    </div>
                                </div>

                                {/* Context Panel */}
                                <div className="flex-1 p-12 lg:p-16 flex flex-col justify-between">
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mb-16">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-[0.4em]">
                                                <MapPin size={16} />
                                                {booking.hotelId?.location || "Luxury District"}
                                            </div>
                                            <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none group-hover:text-red-600 transition-colors italic">
                                                {booking.hotelId?.name}
                                            </h3>
                                            <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">{booking.roomId?.name || "Premium Selection Portfolio"}</p>
                                        </div>
                                        <div className="flex flex-col lg:items-end">
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 italic">Registry ID</span>
                                            <span className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter font-mono tracking-[0.2em]">#{booking.bookingId || booking._id.slice(-8).toUpperCase()}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 mb-auto border-b border-gray-50 dark:border-white/5">
                                        <div className="space-y-3">
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block italic">Check-in Sequence</span>
                                            <div className="flex items-center gap-4 text-[13px] font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                                <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl text-red-600"><Calendar size={18} /></div>
                                                {new Date(booking.checkInDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long' })}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block italic">Elite Guests</span>
                                            <div className="flex items-center gap-4 text-[13px] font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                                <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl text-red-600"><Users size={18} /></div>
                                                {booking.guests?.adults || 2} Members
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block italic">Settlement</span>
                                            <div className="flex items-center gap-4 text-[13px] font-black text-green-600 uppercase tracking-tight">
                                                <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-2xl text-green-600"><ShieldCheck size={18} /></div>
                                                ₹{booking.price?.totalAmount?.toLocaleString()} Verified
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-12 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Star size={14} className="fill-red-600 text-red-600" />
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2 italic">Premium Experience</span>
                                        </div>
                                        <div className="group flex items-center gap-4 text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.4em] transition-all font-subheading group-hover:text-red-600">
                                            Expand Sequence <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform text-red-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedBooking && <BookingDetailsModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />}

            <style dangerouslySetInnerHTML={{
                __html: `
                .outline-text {
                    -webkit-text-stroke: 1px currentColor;
                    color: transparent;
                }
                .dark .outline-text {
                    -webkit-text-stroke: 1px white;
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}} />
        </section>
    );
};

export default MyBookings;
