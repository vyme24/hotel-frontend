import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { useGetRoomByIdQuery } from "../services/room";
import { useConfirmBookingMutation } from "../services/booking";
import { ShieldCheck, Lock, Loader2, Info } from "lucide-react";
import toast from "react-hot-toast";
import { useCreateOrderMutation } from "../services/payment";

const Payment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: roomData, isLoading: isRoomLoading, isError } = useGetRoomByIdQuery(id);
    const [confirmBooking] = useConfirmBookingMutation();
    const [createOrder] = useCreateOrderMutation();
    const [isProcessing, setIsProcessing] = useState(false);
    const [hasOpenedRazorpay, setHasOpenedRazorpay] = useState(false);
    const initiatedRef = useRef(false);

    const r = roomData?.data;
    const taxRate = 0.12;
    const price = r?.basePrice || r?.price || 0;
    const taxes = Math.round(price * taxRate);
    const total = price + taxes;

    const handlePayment = async () => {
        if (initiatedRef.current) return;
        initiatedRef.current = true;
        setIsProcessing(true);

        try {
            // create order via RTK query (headers including token are handled by baseAPI)
            const orderData = await createOrder({
                amount: total * 100,
                currency: 'INR',
            }).unwrap();

            if (!orderData.status) {
                throw new Error(orderData.message || "Failed to create order");
            }

            const options = {
                key: 'rzp_live_S9FPjGIs1C3tlt',
                amount: total * 100,
                currency: 'INR',
                name: 'LuxStay Premium',
                description: `Booking for ${r?.name}`,
                order_id: orderData.data.id,
                handler: async function (response) {
                    try {
                        const confirmRes = await confirmBooking({
                            roomId: id,
                            hotelId: r.hotelId,
                            price: {
                                roomPrice: price,
                                taxes: taxes,
                                totalAmount: total
                            },
                            checkInDate: new Date(),
                            checkOutDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                        }).unwrap();

                        if (confirmRes.status) {
                            toast.success("Reservation Masterpiece Confirmed!");
                            dispatch(clearCart());
                            navigate('/bookings');
                        }
                    } catch (err) {
                        toast.error("Payment successful but booking confirmation failed. Please contact concierge.");
                    }
                },
                prefill: {
                    name: 'Guest User',
                    email: 'guest@example.com'
                },
                theme: {
                    color: '#dc2626'
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                        initiatedRef.current = false;
                        navigate(-1);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
            setHasOpenedRazorpay(true);
        } catch (err) {
            toast.error(err.message || "Payment initiation failed");
            setIsProcessing(false);
            initiatedRef.current = false;
        }
    };

    useEffect(() => {
        if (r && !hasOpenedRazorpay && !isRoomLoading) {
            handlePayment();
        }
    }, [r, isRoomLoading]);

    if (isRoomLoading || isProcessing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-6 text-center">
                <div className="relative mb-12">
                    <div className="w-24 h-24 border-4 border-red-600/10 rounded-full" />
                    <div className="absolute top-0 left-0 w-24 h-24 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                    <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600" size={20} />
                </div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4 animate-pulse">Initializing Secure Gateway</h1>
                <p className="text-gray-500 dark:text-gray-400 font-light max-w-sm italic">"Your sanctuary is being prepared. Please do not refresh as we secure your luxury reservation."</p>

                <div className="mt-12 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest">
                        <ShieldCheck size={14} /> 256-Bit SSL
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <Lock size={14} className="text-red-500" /> Data Protected
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-6">
                <div className="max-w-md w-full p-10 bg-gray-50 dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 text-center shadow-2xl">
                    <div className="w-20 h-20 bg-red-50 dark:bg-red-900/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        <Info className="text-red-600" size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Gateway Error</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-10 font-light leading-relaxed">We encountered a temporary interruption in our neural payment bridge. Please return to the portfolio.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-red-600/20 hover:bg-black transition-all"
                    >
                        Return to Discovery
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default Payment;
