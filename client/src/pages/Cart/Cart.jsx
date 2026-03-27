import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../../store/cartSlice';
import {
    ChevronLeft,
    MapPin,
    ShieldCheck,
    Sparkles,
    Lock,
    CreditCard,
    Calendar,
    Users,
    Info,
    CheckCircle,
    Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useCreateBookingMutation } from '../../redux/apiSlice';
import { useAuthCheck } from '../../hooks/useAuthCheck';
import { formatPrice, getPriceValue } from '../../utils/price';
import { STORAGE_KEYS, writeSessionStorage } from '../../utils/storage';
import Button from '../../components/ui/Button';
import { useConfirmDialog } from '../../hooks/ConfirmDialogContext';

const CartItem = ({ item, handleRemove, onPayNow }) => {
    const imageUrl = item.images?.[0] || item.image || "/images/no-hotel.png";
    const arrivalDate = item.checkIn ? new Date(item.checkIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Not Set";
    const destination = item.type === 'FULL_HOTEL' ? `/hotel/${item._id}` : `/room/${item.roomId || item._id}`;

    return (
        <div className="group bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="flex flex-col md:flex-row">
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

                <div className="flex-1 p-8 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-amber-500 text-[8px] font-bold uppercase tracking-[0.2em] mb-1">
                                    <MapPin size={12} /> {item.location || (item.address?.city ? `${item.address.city}, ${item.address.state}` : "Prime Location")}
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none italic">
                                    {item.name}
                                </h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-gray-50 dark:border-white/5">
                            <div className="space-y-1">
                                <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest block">Arrival</span>
                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-900 dark:text-white uppercase">
                                    <Calendar size={12} className="text-amber-500" /> {arrivalDate}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest block">Duration</span>
                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-900 dark:text-white uppercase font-black">
                                    <Clock size={12} className="text-amber-500" /> {item.duration || 1} {(item.duration || 1) === 1 ? 'Night' : 'Nights'}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest block">Occupancy</span>
                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-900 dark:text-white uppercase">
                                    <Users size={12} className="text-amber-500" /> {item.maxAdults || item.guests?.adults || 2} Guests
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 space-y-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter italic">{formatPrice(getPriceValue(item))}</span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">/Night</span>
                            </div>
                            <div className="flex items-center gap-2 text-amber-500 text-[9px] font-bold uppercase tracking-widest">
                                <span className="font-bold">Subtotal:</span> {formatPrice(getPriceValue(item) * (item.duration || 1))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <Link
                                to={destination}
                                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-amber-500 hover:text-amber-600"
                            >
                                View
                            </Link>
                            <button
                                type="button"
                                onClick={() => onPayNow(item)}
                                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:from-amber-600 hover:to-amber-700"
                            >
                                Pay Now
                            </button>
                            <button
                                type="button"
                                onClick={() => handleRemove(item.cartKey || item._id)}
                                className="inline-flex items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Cart = () => {
    const { items } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { confirm } = useConfirmDialog();
    const [isProcessing, setIsProcessing] = useState(false);
    const [createBooking] = useCreateBookingMutation();
    const { handleAuthorizedAction } = useAuthCheck();

    const subtotal = items.reduce((acc, item) => acc + (getPriceValue(item) * (item.duration || 1)), 0);
    const taxes = Math.round(subtotal * 0.12);
    const total = subtotal + taxes;

    const handleRemove = async (id) => {
        const accepted = await confirm({
            title: "Remove this stay?",
            message: "This room will be removed from your cart. You can add it again later if you want.",
            confirmText: "Remove",
            cancelText: "Keep It",
            tone: "danger",
        });

        if (!accepted) return;

        dispatch(removeFromCart(id));
        toast.success('Removed from selection');
    };

    const buildBookingPayload = (item) => {
        const hotelId = typeof item.hotelId === 'object'
            ? item.hotelId?._id
            : item.hotelId || (item.type === 'FULL_HOTEL' ? item._id : null);
        const roomId = item.type === 'FULL_HOTEL'
            ? undefined
            : (typeof item.roomId === 'object' ? item.roomId?._id : item.roomId || item._id);
        const roomPrice = Number(getPriceValue(item));
        const nights = Number(item.duration || 1);

        if (!hotelId) {
            throw new Error(`Missing hotel details for ${item.name || 'cart item'}`);
        }
        if (!item.checkIn || !item.checkOut) {
            throw new Error(`Select check-in and check-out dates for ${item.name || 'your stay'}`);
        }

        return {
            hotelId,
            roomId,
            checkIn: item.checkIn,
            checkOut: item.checkOut,
            guests: {
                adults: item.maxAdults || item.guests?.adults || 2,
                children: item.guests?.children || 0,
            },
            totalAmount: roomPrice * nights + Math.round(roomPrice * nights * 0.18),
            guestInfo: {
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phone || '',
            },
        };
    };

    const initiatePaymentFlow = async () => {
        if (items.length === 0 || isProcessing) return;

        setIsProcessing(true);
        try {
            const bookings = [];

            for (const item of items) {
                const payload = buildBookingPayload(item);
                const result = await createBooking(payload).unwrap();
                if (!result?.data?._id) {
                    throw new Error(`Failed to prepare payment for ${item.name || 'cart item'}`);
                }
                bookings.push(result.data);
            }

            writeSessionStorage(STORAGE_KEYS.cartCheckout, {
                bookings,
                cartKeys: items.map((item) => item.cartKey || item._id),
            });
            navigate('/payment', { state: { source: 'cart' } });
        } catch (error) {
            toast.error(error?.message || error?.data?.message || 'Unable to continue to payment.');
        } finally {
            setIsProcessing(false);
        }
    };

    const initiateSingleItemPaymentFlow = async (item) => {
        if (!item || isProcessing) return;

        setIsProcessing(true);
        try {
            const payload = buildBookingPayload(item);
            const result = await createBooking(payload).unwrap();
            if (!result?.data?._id) {
                throw new Error(`Failed to prepare payment for ${item.name || 'cart item'}`);
            }

            writeSessionStorage(STORAGE_KEYS.cartCheckout, {
                bookings: [result.data],
                cartKeys: [item.cartKey || item._id],
            });
            navigate('/payment', { state: { source: 'cart' } });
        } catch (error) {
            toast.error(error?.message || error?.data?.message || 'Unable to continue to payment.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePayment = () => {
        handleAuthorizedAction(initiatePaymentFlow);
    };

    const handleItemPayment = (item) => {
        handleAuthorizedAction(() => initiateSingleItemPaymentFlow(item));
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-40 pb-20 bg-white dark:bg-[#050505] flex flex-col items-center justify-center px-6">
                <div className="max-w-md w-full text-center space-y-8">
                    <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/10 rounded-3xl flex items-center justify-center mx-auto border border-amber-100 dark:border-amber-900/20">
                        <Sparkles size={24} className="text-amber-500" />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Your Cart is <span className="text-amber-500">Empty</span></h1>
                        <p className="text-gray-500 text-sm leading-relaxed">Explore our luxury hotels and rooms to find your perfect stay.</p>
                    </div>
                    <button
                        onClick={() => navigate('/hotels')}
                        className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-2xl font-bold text-sm shadow-xl shadow-amber-500/30 transition-all active:scale-95"
                    >
                        Explore Hotels
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-40 pb-24 bg-white dark:bg-[#050505]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 border-b border-gray-100 dark:border-white/5 pb-8">
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="group flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-amber-500 transition-all"
                        >
                            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
                        </button>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                            My <span className="text-amber-500">Cart</span>
                        </h1>
                        <p className="text-sm text-gray-400">{items.length} item{items.length !== 1 ? 's' : ''} selected</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-7 space-y-8">
                        {items.map((item, i) => (
                            <CartItem
                                key={item.cartKey || item._id || `cart-${i}`}
                                item={item}
                                handleRemove={handleRemove}
                                onPayNow={handleItemPayment}
                            />
                        ))}

                        <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20 flex items-center gap-4">
                            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-sm">
                                <ShieldCheck size={20} />
                            </div>
                            <p className="text-xs font-medium text-gray-600 dark:text-amber-200/70 leading-relaxed">
                                Your booking is 100% secure. We use industry-standard encryption to protect your data and payment.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="bg-gray-950 p-10 rounded-[3rem] text-white space-y-10 shadow-2xl border border-white/5">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-amber-400">
                                    <Lock size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</span>
                                </div>
                                <h2 className="text-xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Order <span className="text-white/50">Summary</span></h2>
                            </div>

                            <div className="space-y-6 pt-6 border-t border-white/5">
                                <div className="flex justify-between items-center text-white/40">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Subtotal</span>
                                    <span className="text-lg font-black italic tracking-tight text-white">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between items-center text-white/40 border-t border-white/5 pt-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Taxes (12%)</span>
                                    <span className="text-lg font-black italic tracking-tight text-white">{formatPrice(taxes)}</span>
                                </div>
                                <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                                    <div>
                                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">Total Amount</span>
                                        <p className="text-3xl font-black text-white tracking-tight leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>{formatPrice(total)}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                                        <CreditCard size={20} className="text-amber-400" />
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full justify-center rounded-2xl py-5 text-sm uppercase tracking-[0.2em]"
                            >
                                {isProcessing ? "Preparing Checkout..." : "Proceed to Payment"}
                            </Button>

                            <div className="flex flex-col items-center gap-4 pt-4 border-t border-white/5">
                                <div className="flex gap-3 justify-center opacity-40">
                                    <CheckCircle size={16} className="text-green-500" />
                                    <Info size={16} className="text-amber-400" />
                                </div>
                                <p className="text-[9px] text-center text-white/30 font-medium uppercase tracking-widest leading-relaxed">
                                    256-bit encrypted • payment processed only for the stays currently in your cart
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {isProcessing && (
                    <div className="fixed inset-0 z-[2200] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center">
                        <div className="relative mb-8">
                            <div className="w-16 h-16 border-4 border-amber-500/20 rounded-full" />
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                        <p className="text-sm font-semibold text-white uppercase tracking-widest animate-pulse">
                            Preparing Checkout...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
