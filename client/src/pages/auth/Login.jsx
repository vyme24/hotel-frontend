import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../services/auth";
import { useModal } from "../../hooks/ModalContext";
import VerifyOTP from "../../components/Auth/VerifyOtp";
import { Sparkles } from "lucide-react";

import toast from "react-hot-toast";


const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [Otpmodel, setOtpmodel] = useState(false);
  const { openModal } = useModal();
  const [
    login,
    { isLoading, isSuccess, data, isError, error }
  ] = useLoginMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("userEmail", identifier);
      toast.success(data.message || "OTP sent. Please verify.");
      setOtpmodel(true);
      openModal("otp", {
        email: identifier.includes('@') ? identifier : null,
        phone: !identifier.includes('@') ? identifier : null,
        type: data.data?.type || "login",
        expired_at: data.data?.expired_at
      });
    }

    if (isError) {
      toast.error(error?.data?.message || "Login failed");
    }
  }, [isSuccess, data, isError, error, identifier]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    const email = identifier.includes('@') ? identifier : undefined;
    const phone = identifier.includes('@') ? undefined : identifier;

    try {
      await login({ email, phone, password }).unwrap();
    } catch (err) { }
  };



  return (
    <div className="max-w-md w-full p-8 bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 transition-all duration-300 hover:shadow-2xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center transform hover:rotate-[15deg] transition-all duration-700 shadow-xl shadow-red-600/20">
            <Sparkles size={24} className="text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2 italic">
          <span className="text-red-600 non-italic">LUX</span>STAY
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">Premium Luxury Stays</p>
        <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-sm mt-1">Sign in to continue your journey</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1 italic">
              Credential Protocol (Email or Phone)
            </label>
            <input
              type="text"
              placeholder="IDENTITY@DOMAIN.COM OR PHONE"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="block w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none text-[11px] font-black uppercase tracking-widest text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1 italic">
              Security Phrase (Password)
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none text-[11px] font-black uppercase tracking-widest text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex justify-between items-center px-1">
          <button
            type="button"
            onClick={() => openModal("forgot")}
            className="text-[9px] font-black text-red-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
          >
            Restore Access?
          </button>
          <div className="text-gray-400 text-[9px] font-black uppercase tracking-widest">
            New?
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="ml-2 text-red-600 hover:underline decoration-2 underline-offset-4"
            >
              Join Sanctuary
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-5 px-6 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all duration-500 disabled:opacity-50 transform active:scale-95"
        >
          {isLoading ? "Validating Protocol..." : "Initialize Session"}
        </button>
      </form>
    </div>
  );
};

export default Login;