import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { removeFromCart, clearCart } from '../store/cartSlice';
import {
    Trash2,
    ChevronLeft,
    MapPin,
    ShieldCheck,
    ArrowRight,
    Sparkles,
    Lock,
    CreditCard,
    Calendar,
    Zap,
    Users,
    Info,
    CheckCircle,
    Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useCreateOrderMutation, useVerifyPaymentMutation } from '../services/payment';
import { useAuthCheck } from '../hooks/useAuthCheck';

const CartItem = ({ item, handleRemove }) => {
    const imageUrl = item.images?.[0] || item.image || "/images/no-hotel.png";
    const arrivalDate = item.checkIn ? new Date(item.checkIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Not Set";

    return (
        <div className="group bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="flex flex-col md:flex-row">
                {/* Fixed Image - No Sliders */}
                <div className="md:w-[320px] shrink-0 relative overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[8px] font-black text-white uppercase tracking-widest border border-white/10">
                            {item.type === 'FULL_HOTEL' ? "Entire Sanctuary" : (item.roomTypeName || "Executive")}
                        </span>
                    </div>
                </div>

                {/* Simplified Details */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-red-600 text-[8px] font-black uppercase tracking-[0.2em] mb-1">
                                    <MapPin size={12} /> {item.location || (item.address?.city ? `${item.address.city}, ${item.address.state}` : "Prime Location")}
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none italic">
                                    {item.name}
                                </h3>
                            </div>
                            <button
                                onClick={() => handleRemove(item._id)}
                                className="w-10 h-10 bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-red-600 transition-all rounded-xl flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/10"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-gray-50 dark:border-white/5">
                            <div className="space-y-1">
                                <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest block">Arrival</span>
                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-900 dark:text-white uppercase">
                                    <Calendar size={12} className="text-red-600" /> {arrivalDate}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest block">Duration</span>
                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-900 dark:text-white uppercase font-black">
                                    <Clock size={12} className="text-red-600" /> {item.duration || 1} {item.duration === 1 ? 'Night' : 'Nights'}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest block">Occupancy</span>
                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-900 dark:text-white uppercase">
                                    <Users size={12} className="text-red-600" /> {item.maxAdults || 2} Elite
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex items-baseline justify-between">
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter italic">₹{(item.basePrice || item.price || 0).toLocaleString()}</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">/Night</span>
                        </div>
                        <div className="flex items-center gap-2 text-red-600 text-[9px] font-black uppercase tracking-widest">
                            <Zap size={12} className="animate-pulse" /> Subtotal: ₹{((item.basePrice || item.price || 0) * (item.duration || 1)).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Icon removed

const Cart = () => {
    const { items } = useSelector((state) => state.cart);
    const { token, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isProcessing, setIsProcessing] = useState(false);
    const [createPayment, { data, isSuccess }] = useCreateOrderMutation();
    const [verifyPayment] = useVerifyPaymentMutation();
    const { handleAuthorizedAction } = useAuthCheck();

    const subtotal = items.reduce((acc, item) => acc + ((item.basePrice || item.price || 0) * (item.duration || 1)), 0);
    const taxes = Math.round(subtotal * 0.12);
    const total = subtotal + taxes;

    // Razorpay script is in index.html
    const isRazorpayLoaded = true;

    useEffect(() => {
        if (isSuccess && data?.data) {
            const options = {
                "key": "rzp_test_SKMOiYjHTsBDOD",
                "amount": data.data.amount,
                "currency": "INR",
                "name": "LuxStay Hotels",
                "description": "Premium Room Booking",
                "order_id": data.data.id,
                "handler": async function (response) {
                    setIsProcessing(true);
                    try {
                        const verificationData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        };

                        const result = await verifyPayment(verificationData).unwrap();

                        if (result.status) {
                            toast.success('Reservation Confirmed!', { icon: '⭐' });
                            dispatch(clearCart());
                            navigate('/bookings');
                        } else {
                            toast.error('Payment verification failed.');
                        }
                    } catch (error) {
                        toast.error('Security verification failed.');
                    } finally {
                        setIsProcessing(false);
                    }
                },
                "prefill": {
                    "name": user?.name || "Guest User",
                    "email": user?.email || "guest@example.com",
                    "contact": user?.phone || ""
                },
                "theme": { "color": "#ef4444" }
            };

            const razr = new window.Razorpay(options);
            razr.open();
        }
    }, [data, isSuccess, user, verifyPayment, dispatch, navigate]);

    useEffect(() => {
        if (location.state?.autoPayment && isRazorpayLoaded && items.length > 0 && !isProcessing) {
            handlePayment();
            window.history.replaceState({}, document.title);
        }
    }, [location.state, isRazorpayLoaded, items.length]);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
        toast.success('Removed from selection');
    };

    const initiatePaymentFlow = async () => {
        if (items.length === 0) return;
        try {
            const roomItem = items[0]; // Assuming single item checkout as per request
            await createPayment({
                roomid: roomItem._id,
                guests: roomItem.maxAdults || 2,
                nights: roomItem.duration || 1,
                bookingType: roomItem.type || 'ROOM',
                checkIn: roomItem.checkIn,
                checkOut: roomItem.checkOut
            }).unwrap();
        } catch (error) {
            console.error("Payment initiation failure:", error);
            toast.error('Financial gateway error. Please retry.');
        }
    };

    const handlePayment = () => {
        handleAuthorizedAction(initiatePaymentFlow);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-40 pb-20 bg-white dark:bg-[#050505] flex flex-col items-center justify-center px-6">
                <div className="max-w-md w-full text-center space-y-8">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-gray-100 dark:border-white/10">
                        <Sparkles size={20} className="text-red-500" />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">Your <span className="text-gray-300 non-italic">Portfolio</span> is Empty</h1>
                        <p className="text-gray-500 font-light italic text-sm">Explore our curated collections to start your journey.</p>
                    </div>
                    <button
                        onClick={() => navigate('/hotels')}
                        className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all"
                    >
                        Explore Stays
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-40 pb-24 bg-white dark:bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Simplified Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-gray-100 dark:border-white/5 pb-10">
                    <div className="space-y-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="group flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-600 transition-all"
                        >
                            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
                        </button>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-none italic">
                            Cart <span className="text-gray-300 non-italic">Selections</span>
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Items List */}
                    <div className="lg:col-span-7 space-y-8">
                        {items.map((item, i) => (
                            <CartItem key={item._id || `cart-${i}`} item={item} handleRemove={handleRemove} />
                        ))}

                        <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-white/10 flex items-center gap-6">
                            <div className="w-12 h-12 bg-white dark:bg-black rounded-xl flex items-center justify-center text-red-600 shadow-sm">
                                <ShieldCheck size={24} />
                            </div>
                            <p className="text-[11px] font-medium text-gray-500 italic leading-relaxed">
                                "Your reservation is protected by LuxStay's real-time inventory protocols."
                            </p>
                        </div>
                    </div>

                    {/* Simple Payment Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-gray-950 p-10 rounded-[3rem] text-white space-y-10 shadow-2xl border border-white/5">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-red-600">
                                    <Lock size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest italic">Encrypted Secure Portal</span>
                                </div>
                                <h2 className="text-xl font-black uppercase tracking-tighter leading-none italic">Order <span className="text-white/40 non-italic">Summary</span></h2>
                            </div>

                            <div className="space-y-6 pt-6 border-t border-white/5">
                                <div className="flex justify-between items-center text-white/40">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Subtotal</span>
                                    <span className="text-lg font-black italic tracking-tight text-white">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-white/40 border-t border-white/5 pt-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Taxes (12%)</span>
                                    <span className="text-lg font-black italic tracking-tight text-white">₹{taxes.toLocaleString()}</span>
                                </div>
                                <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                                    <div>
                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest block mb-1 italic">Amount Due</span>
                                        <p className="text-3xl font-black text-white tracking-tighter leading-none italic">₹{total.toLocaleString()}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                                        <CreditCard size={20} className="text-red-600" />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full py-6 bg-red-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 shadow-xl active:scale-95 disabled:opacity-50"
                            >
                                {isProcessing ? "Processing..." : "Pay Now"}
                            </button>

                            <div className="flex flex-col items-center gap-4 pt-4 border-t border-white/5">
                                <div className="flex gap-6 opacity-40">
                                    <CheckCircle size={16} className="text-green-500" />
                                    <Info size={16} className="text-red-500" />
                                </div>
                                <p className="text-[9px] text-center text-white/30 font-black uppercase tracking-widest leading-relaxed italic">
                                    Security Protocol AES-256 Enabled
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isProcessing && (
                <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-6" />
                    <p className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic animate-pulse">Establishing Gateway...</p>
                </div>
            )}
        </div>
    );
};

export default Cart;
