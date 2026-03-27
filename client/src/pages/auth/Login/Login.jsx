import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";
import { useLoginMutation } from "../../../redux/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../../store/authSlice";
import toast from "react-hot-toast";
import { removeStoredValue, STORAGE_KEYS } from "../../../utils/storage";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const redirectTo = location.state?.from || sessionStorage.getItem(STORAGE_KEYS.postLoginRedirect) || "/";

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [usePhone, setUsePhone] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated && token) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo, token]);

  useEffect(() => {
    if (location.state?.message) {
      const toastType = location.state?.toastType || "error";
      if (toastType === "success") {
        toast.success(location.state.message, { id: "auth-state" });
      } else {
        toast.error(location.state.message, { id: "auth-state" });
      }
    }
  }, [location.state]);

  const validate = () => {
    const nextErrors = {};
    if (!form.identifier.trim()) nextErrors.identifier = "This field is required";
    if (!form.password) nextErrors.password = "Password is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const isPhone = /^\d{10,}/.test(form.identifier.trim());
    const body = isPhone
      ? { phone: form.identifier.trim(), password: form.password }
      : { email: form.identifier.trim(), password: form.password };

    try {
      const res = await login(body).unwrap();
      const isSuccess = res?.success || res?.status;

      if (isSuccess && res.data?.token) {
        dispatch(setCredentials({ token: res.data.token, user: res.data.user }));
        removeStoredValue(STORAGE_KEYS.postLoginRedirect, "session");
        toast.success(res.message || "Login successful!");
        navigate(redirectTo, { replace: true });
        return;
      }

      if (isSuccess) {
        toast.success(res.message || `OTP sent to your ${isPhone ? "phone" : "email"}!`);
        navigate("/auth/otp", {
          state: {
            type: res?.data?.type || "login",
            identifier: form.identifier.trim(),
            isEmail: !isPhone,
            from: redirectTo,
          },
        });
        return;
      }

      toast.error(res?.message || "Login failed");
    } catch (err) {
      toast.error(err?.data?.message || "Login failed. Please check your credentials.");
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

        <h1 className="auth-card__title">Welcome back</h1>
        <p className="auth-card__subtitle">
          Sign in to access your bookings and exclusive deals
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label>{usePhone ? "Phone Number" : "Email Address"}</label>
            <div className="auth-field__input-wrap">
              <span className="auth-field__icon">
                {usePhone ? <Phone size={16} /> : <Mail size={16} />}
              </span>
              <input
                className={`auth-input${errors.identifier ? " error" : ""}`}
                type={usePhone ? "tel" : "email"}
                placeholder={usePhone ? "+91 9876543210" : "you@example.com"}
                value={form.identifier}
                onChange={(event) => setForm({ ...form, identifier: event.target.value })}
                autoComplete="username"
              />
            </div>
            {errors.identifier && <span className="auth-error-msg">{errors.identifier}</span>}
            <button
              type="button"
              className="auth-link"
              style={{ alignSelf: "flex-end", fontSize: "0.78rem" }}
              onClick={() => {
                setUsePhone((value) => !value);
                setForm({ ...form, identifier: "" });
              }}
            >
              Use {usePhone ? "email" : "phone"} instead
            </button>
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div className="auth-field__input-wrap">
              <span className="auth-field__icon">
                <Lock size={16} />
              </span>
              <input
                className={`auth-input${errors.password ? " error" : ""}`}
                type={showPass ? "text" : "password"}
                placeholder="Your password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowPass((value) => !value)}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="auth-error-msg">{errors.password}</span>}
          </div>

          <div className="auth-forgot">
            <Link to="/auth/forgot-password">Forgot password?</Link>
          </div>

          <button className="auth-submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? <span className="auth-btn-spinner" /> : null}
            {isLoading ? "Sending OTP..." : "Continue ->"}
          </button>
        </form>

        <p className="auth-footer">
          New to LuxStay?{" "}
          <Link to="/auth/register">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}
