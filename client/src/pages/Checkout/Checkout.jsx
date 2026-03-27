import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ShieldCheck,
  CreditCard,
  Lock,
  Calendar,
  Users,
  MapPin,
  Star,
  ArrowRight,
  Info,
  Zap
} from "lucide-react";
import { useGetRoomByIdQuery } from "../../services/room";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import toast from "react-hot-toast";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleAuthorizedAction, isAuthenticated } = useAuthCheck();
  const { data, isLoading, isError } = useGetRoomByIdQuery(id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  const r = data?.data;
  const taxRate = 0.12;
  const price = r?.basePrice || r?.price || 0;
  const taxes = Math.round(price * taxRate);
  const total = price + taxes;

  const initiatePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
        },
        body: JSON.stringify({
          amount: total * 100,
          currency: 'INR',
          receipt: `receipt#${Date.now()}`,
          notes: { roomId: id }
        })
      });
      const orderData = await response.json();

      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create order");
      }

      const options = {
        key: 'rzp_live_S9FPjGIs1C3tlt',
        amount: total * 100,
        currency: 'INR',
        name: 'LuxStay Premium',
        description: `Booking for ${r?.name}`,
        order_id: orderData.data.id,
        handler: function (response) {
          toast.success("Transaction Complete");
          navigate('/payment-success');
        },
        prefill: {
          name: 'Guest User',
          email: 'guest@example.com'
        },
        theme: {
          color: '#000000'
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.message || "Payment initiation failed");
      setIsProcessing(false);
    }
  };

  const handlePayment = () => {
    handleAuthorizedAction(initiatePayment);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505]">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] animate-pulse italic">Securing Your Sanctuary...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505] px-6">
        <div className="max-w-md w-full p-12 bg-gray-50 dark:bg-white/5 rounded-[4rem] border border-gray-100 dark:border-white/10 text-center shadow-2xl">
          <div className="w-20 h-20 bg-red-50 dark:bg-red-900/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Info className="text-red-600" size={24} />
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter leading-none">BRIDGE <span className="italic text-gray-400">LOST</span></h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 font-light leading-relaxed italic">"We encountered an architectural fault while finalizing your reservation. Please return to the portfolio."</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl active:scale-95 transition-all"
          >
            Return to Discovery
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12 border-b border-gray-50 dark:border-white/5 pb-24">
          <div className="space-y-8 max-w-2xl">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] hover:text-red-600 transition-all"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Suite
            </button>
            <h1 className="text-4xl md:text-3xl font-black text-gray-900 dark:text-white leading-[0.85] tracking-tighter uppercase font-heading">
              SECURE <br />
              <span className="italic outline-text">SETTLEMENT</span>
            </h1>
          </div>
          <div className="flex flex-col md:items-end gap-2 text-right">
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.5em] mb-2 italic">Transaction Status</span>
            <div className="px-6 py-3 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/30 text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} /> Encrypted Protocol Active
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-8 space-y-12">
            <div className="bg-gray-50 dark:bg-white/5 rounded-[3.5rem] border border-gray-100 dark:border-white/5 p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] rounded-full -mr-32 -mt-32" />
              <div className="relative space-y-12">
                <div className="space-y-4">
                  <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">Gateway <span className="italic text-gray-400">Authorization</span></h2>
                  <p className="text-sm font-light text-gray-500 italic max-w-xl">"Authorize the financial transfer to secure your signature sanctuary. All transactions are governed by global encryption standards."</p>
                </div>
                <div className="space-y-6">
                  <div onClick={handlePayment} className="p-10 bg-white dark:bg-black border-2 border-red-600 rounded-[2.5rem] relative overflow-hidden group cursor-pointer shadow-2xl transition-all">
                    <div className="absolute top-8 right-8">
                      <div className="w-6 h-6 rounded-full border-2 border-red-600 flex items-center justify-center">
                        <div className="w-3 h-3 bg-red-600 rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-start gap-8">
                      <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-red-600/30">
                        <CreditCard size={28} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">RAZORPAY SECURE</h3>
                        <p className="text-[11px] text-gray-500 uppercase font-black tracking-widest">UPI • Cards • Net Banking • Wallets</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-10 bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[2.5rem] opacity-40">
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-white/10 rounded-2xl flex items-center justify-center text-gray-400">
                        <Zap size={28} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-black text-gray-400 uppercase tracking-tight">Pay at Sanctuary</h3>
                        <p className="text-[11px] text-gray-400 uppercase font-black tracking-widest leading-none">On-site Settlement Protocol</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="group w-full py-8 bg-black dark:bg-white text-white dark:text-black rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.4em] transition-all duration-700 shadow-2xl flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 hover:bg-red-600 hover:text-white"
                  >
                    {isProcessing ? "Establishing Gateway..." : "Initiate Protocol"}
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                  <div className="flex items-center justify-center gap-10 mt-12">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-green-600 opacity-60">
                      <ShieldCheck size={16} /> Secure Transaction
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-gray-400 opacity-60">
                      <Lock size={16} /> AES-256 Encrypted
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="bg-gray-900 rounded-[3.5rem] text-white overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.5)] border border-white/5 p-4">
              <div className="relative h-64 rounded-[2.5rem] overflow-hidden">
                <img
                  src={r?.image || r?.images?.[0] || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070"}
                  alt={r?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10">
                  <span className="bg-red-600 text-white text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-lg mb-4 inline-block shadow-2xl">
                    {r?.roomTypeName || "Luxury Selection"}
                  </span>
                  <h3 className="text-xl font-black text-white leading-none uppercase tracking-tighter italic">{r?.name}</h3>
                </div>
              </div>
              <div className="p-10 space-y-10">
                <div className="grid grid-cols-2 gap-8 pb-10 border-b border-white/10">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Duration</span>
                    <div className="flex items-center gap-3 text-sm font-black italic">
                      <Calendar size={14} className="text-red-600" />
                      1 Night
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Guests</span>
                    <div className="flex items-center justify-end gap-3 text-sm font-black italic">
                      {r?.maxAdults || 2} Elite
                      <Users size={14} className="text-red-600" />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-white/40">
                    <span className="text-[10px] font-black uppercase tracking-widest">Signature Rate</span>
                    <span className="text-lg font-black italic tracking-tight text-white">₹{price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/40">
                    <span className="text-[10px] font-black uppercase tracking-widest">Taxation (12%)</span>
                    <span className="text-lg font-black italic tracking-tight text-white">₹{taxes.toLocaleString()}</span>
                  </div>
                </div>
                <div className="pt-10 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-2 italic">Total Commitment</span>
                    <p className="text-3xl font-black text-white tracking-tighter leading-none italic font-heading">₹{total.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] block mb-2 italic">Currency</span>
                    <p className="text-base font-black text-white leading-none tracking-widest">INR</p>
                  </div>
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default Checkout;
