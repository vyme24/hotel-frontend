import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "../../services/auth";

const OTP_LENGTH = 6;

const VerifyOTP = ({ user }) => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [expiredAt, setExpiredAt] = useState(user?.expired_at);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const inputsRef = useRef([]);
  const timerRef = useRef(null);

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resendLoading }] =
    useResendOtpMutation();

  /* ---------------- SINGLE TIMER EFFECT ---------------- */
  useEffect(() => {
    if (!expiredAt) return;

    // Clear old timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

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

  /* ---------------- OTP INPUT ---------------- */
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

  /* ---------------- VERIFY OTP ---------------- */
  const handleVerify = async (e) => {
    e.preventDefault();

    if (otpValue.length !== OTP_LENGTH) {
      toast.error("Enter complete OTP");
      return;
    }

    try {
    const res =  await verifyOtp({
        email: user.email,
        type: user.type,
        otp: otpValue,
      }).unwrap();
 console.lg("ss",res)
      toast.success(res.message);

    } catch (err) {
      toast.error(err?.data?.message || "Invalid OTP");
    }
  };

  /* ---------------- RESEND OTP ---------------- */
  const handleResend = async () => {
    try {
      const res = await resendOtp({
        email: user.email,
        type: user.type,
      }).unwrap();

      toast.success("New OTP sent");

      setOtp(Array(OTP_LENGTH).fill(""));
      setExpiredAt(res.data.expired_at); 

    } catch (err) {
      toast.error(err?.data?.message || "Failed to resend OTP");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-md w-full bg-white rounded-xl p-8">
      <h2 className="text-2xl font-semibold text-center">
        Verify your email
      </h2>

      <p className="text-center text-sm text-gray-500 mt-2">
        Enter the 6-digit code sent to <br />
        <span className="font-medium text-gray-800">
          {user.email}
        </span>
      </p>

      <form onSubmit={handleVerify} className="mt-8 space-y-6">
        <div className="flex justify-center gap-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleBackspace(e, i)}
              maxLength={1}
              className="w-12 h-12 text-xl text-center border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          ))}
        </div>

        <p className="text-center text-sm">
          {timeLeft > 0 ? (
            <span className="text-gray-500">
              Code expires in{" "}
              <strong>
                {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
              </strong>
            </span>
          ) : (
            <span className="text-red-500">Code expired</span>
          )}
        </p>

        <button
          type="submit"
          disabled={isLoading || timeLeft === 0}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify & Continue"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={handleResend}
          disabled={!canResend || resendLoading}
          className="text-sm font-medium text-blue-600 disabled:text-gray-400"
        >
          {resendLoading
            ? "Resending..."
            : canResend
            ? "Resend code"
            : `Resend in ${timeLeft}s`}
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
