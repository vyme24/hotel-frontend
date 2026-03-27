import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import { useForgotPasswordMutation } from "../../redux/apiSlice";
import toast from "react-hot-toast";
import "./Login/Login.css";
import "./Register/Register.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [usePhone, setUsePhone] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [usePhone]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!identifier.trim()) {
      setError(`Please enter your ${usePhone ? "phone number" : "email"}`);
      return;
    }

    try {
      const body = usePhone
        ? { phone: identifier.trim() }
        : { email: identifier.trim() };

      const res = await forgotPassword(body).unwrap();
      const isSuccess = res?.success || res?.status;

      if (isSuccess) {
        toast.success(res.message || "OTP sent successfully!");
        navigate("/auth/otp", {
          state: {
            type: "forgot",
            identifier: identifier.trim(),
            isEmail: !usePhone,
          },
        });
        return;
      }

      toast.error(res?.message || "Unable to continue");
    } catch (err) {
      const message = err?.data?.message || "Unable to send OTP";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Link to="/" className="auth-card__logo">
          <div className="auth-card__logo-icon">L</div>
          <span className="auth-card__logo-text">Lux<span>Stay</span></span>
        </Link>

        <h1 className="auth-card__title">Forgot password</h1>
        <p className="auth-card__subtitle">
          Enter your {usePhone ? "phone number" : "email address"} to receive a verification OTP.
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-role-toggle">
            <button
              type="button"
              className={`auth-role-btn${!usePhone ? " active" : ""}`}
              onClick={() => setUsePhone(false)}
            >
              Email
            </button>
            <button
              type="button"
              className={`auth-role-btn${usePhone ? " active" : ""}`}
              onClick={() => setUsePhone(true)}
            >
              Phone
            </button>
          </div>

          <div className="auth-field">
            <label>{usePhone ? "Phone Number" : "Email Address"}</label>
            <div className="auth-field__input-wrap">
              <span className="auth-field__icon">
                {usePhone ? <Phone size={16} /> : <Mail size={16} />}
              </span>
              <input
                className={`auth-input${error ? " error" : ""}`}
                type={usePhone ? "tel" : "email"}
                placeholder={usePhone ? "+91 9876543210" : "you@example.com"}
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                autoComplete={usePhone ? "tel" : "email"}
              />
            </div>
            {error && <span className="auth-error-msg">{error}</span>}
          </div>

          <button className="auth-submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? <span className="auth-btn-spinner" /> : null}
            {isLoading ? "Sending OTP..." : "Send OTP ->"}
          </button>
        </form>

        <p className="auth-footer">
          Remembered your password?{" "}
          <Link to="/auth/login">Back to login</Link>
        </p>

        <button
          type="button"
          className="otp-back-link"
          style={{ margin: "1rem auto 0" }}
          onClick={() => navigate("/auth/login")}
        >
          <ArrowLeft size={16} /> Go back
        </button>
      </motion.div>
    </div>
  );
}
