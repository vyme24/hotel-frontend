import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForgotPasswordMutation } from "../../services/auth";
import { useModal } from "../../hooks/ModalContext";
import { Mail, Phone, ArrowLeft, KeyRound, Sparkles } from "lucide-react";

const ForgotPassword = () => {
  const [forgotMethod, setForgotMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { openModal } = useModal();

  const [forgotPassword, { isLoading, isSuccess, isError, error, data: resData }] = useForgotPasswordMutation();

  useEffect(() => {
    if (isSuccess && resData) {
      toast.success(`OTP sent to your ${forgotMethod}.`);
      openModal("otp", {
        email: forgotMethod === "email" ? email.trim() : null,
        phone: forgotMethod === "phone" ? phone.trim() : null,
        type: "forgot",
        expired_at: resData.data?.expired_at
      });
    }
    if (isError) {
      toast.error(error?.data?.message || "Account recovery failed");
    }
  }, [isSuccess, isError, error, resData, email, phone, forgotMethod, openModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const identity = forgotMethod === "email" ? email.trim() : phone.trim();
    if (!identity) {
      toast.error(`Please enter your ${forgotMethod}`);
      return;
    }

    try {
      await forgotPassword({ [forgotMethod]: identity }).unwrap();
    } catch (err) { }
  };

  return (
    <div className="w-full animate-fadeIn">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center transform hover:rotate-[15deg] transition-all duration-700 shadow-xl shadow-red-600/20">
            <Sparkles size={20} className="text-white" />
          </div>
        </div>
        <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2 italic">
          <span className="text-red-600 non-italic">LUX</span>STAY
        </h1>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Enter your identity to reset your password</p>
      </div>

      <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
        <button
          onClick={() => setForgotMethod("email")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${forgotMethod === "email" ? "bg-white dark:bg-gray-700 text-red-600 shadow-sm" : "text-gray-500"
            }`}
        >
          <Mail size={16} /> Email
        </button>
        <button
          onClick={() => setForgotMethod("phone")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${forgotMethod === "phone" ? "bg-white dark:bg-gray-700 text-red-600 shadow-sm" : "text-gray-500"
            }`}
        >
          <Phone size={16} /> Phone
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
            {forgotMethod === "email" ? <Mail size={18} /> : <Phone size={18} />}
          </div>
          <input
            type={forgotMethod === "email" ? "email" : "tel"}
            placeholder={forgotMethod === "email" ? "Registered Email" : "Registered Phone"}
            value={forgotMethod === "email" ? email : phone}
            onChange={(e) => forgotMethod === "email" ? setEmail(e.target.value) : setPhone(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm text-gray-900 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-red-600/20"
        >
          {isLoading ? "Sending OTP..." : "Reset Password"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={() => openModal("login")}
          className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
