import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../services/auth";
import { useModal } from "../../hooks/ModalContext";
import VerifyOTP from "../../components/Auth/VerifyOtp";
import { Sparkles } from "lucide-react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [Otpmodel, setOtpmodel] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const { openModal } = useModal();
    const navigate = useNavigate();

    const [register, { isLoading, isError, isSuccess, data, error }] = useRegisterMutation();



    useEffect(() => {
        if (isSuccess && data) {
            toast.success(data.message || "OTP sent successfully. Please verify.");
            setOtpmodel(true);
            openModal("otp", {
                name: name.trim(),
                email: email.toLowerCase().trim() || null,
                phone: phone.trim() || null,
                type: data.data?.type || "register",
                expired_at: data.data?.expired_at
            });
        }

        if (isError) {
            toast.error(error?.data?.message || "Registration failed");
        }
    }, [isSuccess, data, isError, error]);


    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || (!email && !phone) || !password || !confirmPassword) {
            toast.error("Please fill Name, Password and either Email or Phone");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await register({
                name: name.trim(),
                email: email.toLowerCase().trim() || undefined,
                phone: phone.trim() || undefined,
                password
            }).unwrap();
        } catch (err) { }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 py-20 bg-white dark:bg-[#0a0a0a]">
            <div className="max-w-xl w-full p-10 bg-white dark:bg-[#0a0a0a] rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-white/5 transition-all duration-700 hover:shadow-[0_50px_100px_rgba(0,0,0,0.1)] animate-fadeIn">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center transform hover:rotate-[15deg] transition-all duration-700 shadow-xl shadow-red-600/20">
                            <Sparkles size={24} className="text-white" />
                        </div>
                    </div>
                    <div className="inline-block px-4 py-1.5 bg-red-50 dark:bg-red-500/10 rounded-full text-[9px] font-black text-red-600 uppercase tracking-[0.3em] mb-4">
                        New Membership
                    </div>
                    <h1 className="text-2xl md:text-3xl font-heading font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-none italic">
                        CREATE <span className="text-gray-300 non-italic">IDENTITY</span>
                    </h1>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-3 italic">Join the Inner Circle of LuxStay</p>
                </div>

                <form className="space-y-6" onSubmit={handleSignup}>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest px-1 italic">Full Name</label>
                            <input
                                type="text"
                                placeholder="YOUR NAME"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none text-[11px] font-black uppercase tracking-widest text-gray-900 dark:text-white"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest px-1 italic">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="YOU@DOMAIN.COM"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none text-[11px] font-black uppercase tracking-widest text-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest px-1 italic">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="91XXXXXXXX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none text-[11px] font-black uppercase tracking-widest text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest px-1 italic">Security Code</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none text-[11px] font-black uppercase tracking-widest text-gray-900 dark:text-white"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest px-1 italic">Confirm Code</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none text-[11px] font-black uppercase tracking-widest text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-5 px-6 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all duration-500 disabled:opacity-50 transform active:scale-95 mt-4"
                    >
                        {isLoading ? "Establishing Identity..." : "Authorize Registry"}
                    </button>
                </form>

                <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest mt-8">
                    Already Registered?
                    <button type="button" onClick={() => navigate("/login")} className="text-red-600 hover:underline decoration-2 underline-offset-4 ml-2">Initiate Session</button>
                </p>
            </div>
        </div>
    );
};

export default Register;
