import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useGetUserQuery } from "../services/auth";
import { User, Mail, Phone, Calendar, Shield, Award, LogOut, ChevronRight, MapPin, Zap, Settings, Bell, CreditCard, Clock, Box } from "lucide-react";
import { useGetMyBookingsQuery } from "../services/booking";
import toast from "react-hot-toast";

const Profile = () => {
    const { data: profileResult, isLoading: profileLoading } = useGetUserQuery();
    const user = profileResult?.data;
    const { data: bookingsData, isLoading: bookingsLoading } = useGetMyBookingsQuery();
    const bookings = bookingsData?.data || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Security session terminated. Redirecting...");
        navigate("/");
    };

    if (profileLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505]">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505]">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">You are not authenticated.</p>
                    <button onClick={() => navigate('/')} className="px-6 py-2 bg-red-600 text-white rounded-xl">Back Home</button>
                </div>
            </div>
        );
    }

    return (
        <section className="bg-white dark:bg-[#050505] min-h-screen pt-40 pb-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Panel - Bio & Stats */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="bg-[#0a0a0a] rounded-[4rem] p-12 text-white relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full -mr-32 -mt-32" />

                            <div className="relative space-y-10">
                                <div className="space-y-6">
                                    <div className="w-24 h-24 bg-white dark:bg-white/10 rounded-[2.5rem] flex items-center justify-center text-2xl font-black text-black dark:text-white shadow-2xl">
                                        {user.name?.charAt(0) || "G"}
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-black uppercase tracking-tighter leading-none font-heading mb-2">{user.name || "Guest User"}</h1>
                                        <div className="flex items-center gap-2 text-red-600 text-[9px] font-black uppercase tracking-[0.3em]">
                                            <Award size={12} fill="currentColor" /> Elite Member Tier
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-10 border-t border-white/10 italic">
                                    <p className="text-white/40 text-sm font-light leading-relaxed font-body">
                                        "A connoisseur of architectural excellence and world-class hospitality."
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-6">
                                    <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                                        <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block mb-1">Stays</span>
                                        <span className="text-xl font-black italic">{bookings.length}</span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                                        <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block mb-1">Active</span>
                                        <span className="text-xl font-black italic">{bookings.filter(b => b.bookingStatus === 'Confirmed').length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full py-6 bg-red-600/10 text-red-600 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-red-600 hover:text-white transition-all duration-700 flex items-center justify-center gap-4 group"
                        >
                            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Terminate Session
                        </button>
                    </div>

                    {/* Right Panel - Details & Actions */}
                    <div className="lg:col-span-8 space-y-16">
                        <div className="space-y-10">
                            <div className="flex items-center gap-4">
                                <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em]">Executive Identity</h2>
                                <div className="h-px flex-1 bg-gray-50 dark:bg-white/5" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 space-y-4 group hover:border-red-600/30 transition-colors">
                                    <div className="flex items-center gap-3 text-red-600">
                                        <Mail size={16} />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Digital Address</span>
                                    </div>
                                    <p className="text-lg font-black text-gray-900 dark:text-white tracking-tight">{user.email || "Not provided"}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 space-y-4 group hover:border-red-600/30 transition-colors">
                                    <div className="flex items-center gap-3 text-red-600">
                                        <Phone size={16} />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Secure Line</span>
                                    </div>
                                    <p className="text-lg font-black text-gray-900 dark:text-white tracking-tight">{user.phone || "Not provided"}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 space-y-4 group hover:border-red-600/30 transition-colors">
                                    <div className="flex items-center gap-3 text-red-600">
                                        <Calendar size={16} />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Registry Date</span>
                                    </div>
                                    <p className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : "Active Sequence"}
                                    </p>
                                </div>
                                <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 space-y-4 group hover:border-red-600/30 transition-colors">
                                    <div className="flex items-center gap-3 text-red-600">
                                        <Shield size={16} />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Security protocol</span>
                                    </div>
                                    <p className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Two-Factor Active</p>
                                </div>
                            </div>
                        </div>

                        {/* Command Center & Recent Bookings */}
                        <div className="space-y-16">
                            <div className="space-y-10">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em]">Executive History</h2>
                                    <div className="h-px flex-1 bg-gray-50 dark:bg-white/5" />
                                </div>

                                {bookingsLoading ? (
                                    <div className="flex justify-center py-10">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-600"></div>
                                    </div>
                                ) : bookings.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-6">
                                        {bookings.slice(0, 3).map((booking, i) => (
                                            <div
                                                key={i}
                                                onClick={() => navigate('/bookings')}
                                                className="group flex items-center justify-between p-8 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border border-transparent hover:border-red-600/30 transition-all cursor-pointer"
                                            >
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white dark:bg-black p-0.5">
                                                        <img
                                                            src={booking.hotelId?.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"}
                                                            className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all"
                                                            alt="Stay"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[9px] font-black text-red-600 uppercase tracking-widest">{booking.bookingStatus || "Confirmed"}</p>
                                                        <h4 className="text-base font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">{booking.hotelId?.name}</h4>
                                                        <p className="text-[10px] text-gray-400 font-medium">{new Date(booking.checkInDate).toLocaleDateString('en-GB')}</p>
                                                    </div>
                                                </div>
                                                <ChevronRight size={18} className="text-gray-300 group-hover:text-red-600 transition-all" />
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => navigate('/bookings')}
                                            className="text-[10px] font-black uppercase tracking-[0.3em] text-center w-full py-4 text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            View Full Chronicle Sequence
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-12 text-center bg-gray-50 dark:bg-white/5 rounded-[3rem] border border-dashed border-gray-200 dark:border-white/10">
                                        <p className="text-sm italic font-light text-gray-400">"Your travel diary is waiting for its first entry."</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-10">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em]">Command center</h2>
                                    <div className="h-px flex-1 bg-gray-50 dark:bg-white/5" />
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {[
                                        { icon: CreditCard, label: "Payment Instruments", desc: "Manage your encrypted settlement methods", path: "/cart" },
                                        { icon: Bell, label: "Intelligence Alerts", desc: "Configure your protocol notification preferences", path: "/settings" },
                                        { icon: Settings, label: "Digital Preferences", desc: "Personalize your architectural standards", path: "/settings" }
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            onClick={() => navigate(item.path)}
                                            className="group flex items-center justify-between p-8 bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] border border-gray-100 dark:border-white/5 hover:border-red-600 transition-all duration-700 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1"
                                        >
                                            <div className="flex items-center gap-8">
                                                <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-red-600 group-hover:text-white transition-all duration-700">
                                                    <item.icon size={24} strokeWidth={1.5} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-base font-black text-gray-900 dark:text-white uppercase tracking-tight italic">{item.label}</h4>
                                                    <p className="text-[11px] text-gray-400 font-light italic">{item.desc}</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={20} className="text-gray-200 group-hover:text-red-600 group-hover:translate-x-2 transition-all" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
