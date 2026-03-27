import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Smartphone } from "lucide-react";
import { useVerifyOtpMutation, useResendOtpMutation } from "../../redux/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";
import toast from "react-hot-toast";
import "./Otp.css";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

export default function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { type = "login", identifier = "", isEmail = true } =
    location.state || {};

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const inputRefs = useRef([]);

  const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resending }] = useResendOtpMutation();

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Focus first box on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = useCallback((index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    setError("");
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  const handleKeyDown = useCallback((index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        setOtp((prev) => { const n = [...prev]; n[index] = ""; return n; });
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        setOtp((prev) => { const n = [...prev]; n[index - 1] = ""; return n; });
      }
    }
    if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  }, [otp]);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (text.length) {
      const next = [...Array(OTP_LENGTH).fill("")];
      text.split("").forEach((d, i) => { next[i] = d; });
      setOtp(next);
      inputRefs.current[Math.min(text.length, OTP_LENGTH - 1)]?.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      setError("Please enter all 6 digits");
      return;
    }

    const body = {
      otp: code,
      type,
      ...(isEmail ? { email: identifier } : { phone: identifier }),
    };

    try {
      const res = await verifyOtp(body).unwrap();
      if (res.status && res.data?.token) {
        dispatch(setCredentials({ token: res.data.token, user: res.data.user }));
        toast.success(type === "register" ? "Account created! Welcome to LuxStay 🎉" : "Login successful! Welcome back!");
        navigate("/", { replace: true });
      } else if (res.status) {
        // Forgot password flow — redirect to reset
        navigate("/auth/reset-password", { state: { token: res.data?.token } });
      } else {
        setError(res.message || "Verification failed");
      }
    } catch (err) {
      const msg = err?.data?.message || "Invalid OTP. Please try again.";
      setError(msg);
      toast.error(msg);
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    try {
      const body = {
        type,
        ...(isEmail ? { email: identifier } : { phone: identifier }),
      };
      await resendOtp(body).unwrap();
      toast.success("OTP resent!");
      setCountdown(RESEND_SECONDS);
      setOtp(Array(OTP_LENGTH).fill(""));
      setError("");
      inputRefs.current[0]?.focus();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to resend OTP");
    }
  };

  const maskedIdentifier = isEmail
    ? identifier.replace(/(.{2}).+(@.+)/, "$1***$2")
    : identifier.replace(/(\+?\d{2,3})\d+(\d{4})/, "$1*****$2");

  return (
    <div className="otp-page">
      <motion.div
        className="otp-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="otp-icon">
          {isEmail ? <Mail size={32} /> : <Smartphone size={32} />}
        </div>

        <h1 className="otp-title">Verify your {isEmail ? "email" : "phone"}</h1>
        <p className="otp-subtitle">
          We sent a 6-digit code to{" "}
          <strong>{maskedIdentifier}</strong>. Enter it below to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-boxes" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <motion.input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                className={`otp-box${digit ? " filled" : ""}${error ? " error" : ""}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              />
            ))}
          </div>

          {error && <div className="otp-error-msg">{error}</div>}

          <button
            className="otp-submit-btn"
            type="submit"
            disabled={verifying || otp.join("").length < OTP_LENGTH}
          >
            {verifying ? <span className="otp-btn-spinner" /> : null}
            {verifying ? "Verifying…" : "Verify & Continue →"}
          </button>
        </form>

        <div className="otp-resend">
          {countdown > 0 ? (
            <>
              Resend OTP in{" "}
              <span className="otp-timer">{countdown}s</span>
            </>
          ) : (
            <>
              Didn't receive it?{" "}
              <button onClick={handleResend} disabled={resending}>
                {resending ? "Sending…" : "Resend OTP"}
              </button>
            </>
          )}
        </div>

        <button
          className="otp-back-link"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Go back
        </button>
      </motion.div>
    </div>
  );
}
