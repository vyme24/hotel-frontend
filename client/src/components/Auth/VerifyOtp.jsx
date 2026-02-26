import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useModal } from "../../hooks/ModalContext";
import {
  useVerifyOtpMutation,
  useResendOtpMutation
} from "../../services/auth";
import { ShieldCheck, Timer } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";

const OTP_LENGTH = 6;

const VerifyOTP = ({ user }) => {
  if (!user) return null;

  const dispatch = useDispatch();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [expiredAt, setExpiredAt] = useState(user?.expired_at);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { closeModal, openModal } = useModal();

  const inputsRef = useRef([]);
  const timerRef = useRef(null);

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();

  useEffect(() => {
    if (!expiredAt) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const expiry = new Date(expiredAt).getTime();
    timerRef.current = setInterval(() => {
      const diff = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
      setTimeLeft(diff);
      if (diff === 0) {
        setCanResend(true);
        clearInterval(timerRef.current);
      } else {
        setCanResend(false);
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [expiredAt]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const otpValue = otp.join("");

  const handleVerify = async (e) => {
    e.preventDefault();
    if ((!user.email && !user.phone) || !user.type) {
      toast.error("Session expired. Please try again.");
      return;
    }
    if (otpValue.length !== OTP_LENGTH) {
      toast.error("Please enter the full code");
      return;
    }

    try {
      const res = await verifyOtp({
        [user.phone ? "phone" : "email"]: user.phone || user.email,
        type: user.type,
        otp: otpValue,
      }).unwrap();

      toast.success(res.message || "Identity verified");

      if (user.type === "login" && res.data?.token) {
        dispatch(setCredentials({ token: res.data.token, user: res.data.user }));
        if (location.state?.from) {
          navigate(location.state.from, { replace: true });
        }
        closeModal();
      }

      if (user.type === "register") {
        if (res.data?.token) {
          dispatch(setCredentials({ token: res.data.token, user: res.data.user }));
          toast.success("Welcome aboard!");
          if (location.state?.from) {
            navigate(location.state.from, { replace: true });
          }
        } else {
          toast.success("Registration confirmed. Please login.");
          openModal("login");
          return;
        }
        closeModal();
      }

      if (user.type === "forgot" && res.data?.token) {
        openModal("reset", { token: res.data.token });
      }

    } catch (err) {
      toast.error(err?.data?.message || "Invalid code");
    }
  };

  const handleResend = async () => {
    if ((!user.email && !user.phone) || !user.type) return;
    try {
      const res = await resendOtp({
        [user.phone ? "phone" : "email"]: user.phone || user.email,
        type: user.type,
      }).unwrap();
      toast.success("Code resent successfully");
      setOtp(Array(OTP_LENGTH).fill(""));
      setExpiredAt(res.data?.expired_at);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to resend code");
    }
  };

  return (
    <div className="w-full animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          Verify OTP
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Enter the code sent to <br />
          <span className="font-semibold text-gray-900 dark:text-white">{user?.phone || user?.email}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex justify-center gap-2">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleBackspace(e, i)}
              maxLength={1}
              className="w-10 h-12 text-xl font-bold text-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all text-gray-900 dark:text-white"
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <Timer size={14} className={timeLeft > 0 ? 'text-red-500' : 'text-gray-400'} />
            {timeLeft > 0 ? (
              <span>Resend in {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</span>
            ) : (
              <span className="text-red-600">Code expired</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || timeLeft === 0}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-red-600/20"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={handleResend}
          disabled={!canResend || resendLoading}
          className="text-sm font-bold text-red-600 hover:underline disabled:text-gray-400 disabled:no-underline transition-all"
        >
          {resendLoading ? "Sending..." : "Resend Code"}
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
