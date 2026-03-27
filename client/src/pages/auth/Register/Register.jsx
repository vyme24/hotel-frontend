import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";
import { useRegisterMutation } from "../../../redux/apiSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { STORAGE_KEYS } from "../../../utils/storage";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();
  const redirectTo = location.state?.from || sessionStorage.getItem(STORAGE_KEYS.postLoginRedirect) || "/";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [usePhone, setUsePhone] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated && token) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate, token]);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (usePhone) {
      if (!form.phone.trim()) nextErrors.phone = "Phone is required";
    } else {
      if (!form.email.trim()) nextErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = "Invalid email";
    }
    if (!form.password) nextErrors.password = "Password is required";
    else if (form.password.length < 6) nextErrors.password = "At least 6 characters";
    if (form.password !== form.confirm) nextErrors.confirm = "Passwords do not match";
    if (!agreed) nextErrors.agreed = "You must accept the terms";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const body = {
      name: form.name.trim(),
      password: form.password,
      ...(usePhone ? { phone: form.phone.trim() } : { email: form.email.trim() }),
    };

    try {
      const res = await register(body).unwrap();
      const isSuccess = res?.success || res?.status;

      if (isSuccess) {
        toast.success(res.message || "OTP sent!");
        navigate("/auth/otp", {
          state: {
            type: res?.data?.type || "register",
            identifier: usePhone ? form.phone.trim() : form.email.trim(),
            isEmail: !usePhone,
            from: redirectTo,
          },
        });
        return;
      }

      toast.error(res?.message || "Registration failed");
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card"
        style={{ maxWidth: 440 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Link to="/" className="auth-card__logo">
          <div className="auth-card__logo-icon">L</div>
          <span className="auth-card__logo-text">Lux<span>Stay</span></span>
        </Link>

        <h1 className="auth-card__title">Create account</h1>
        <p className="auth-card__subtitle">
          Join LuxStay to unlock premium stays worldwide
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label>Full Name</label>
            <div className="auth-field__input-wrap">
              <span className="auth-field__icon"><User size={16} /></span>
              <input
                className={`auth-input${errors.name ? " error" : ""}`}
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={set("name")}
                autoComplete="name"
              />
            </div>
            {errors.name && <span className="auth-error-msg">{errors.name}</span>}
          </div>

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

          {!usePhone ? (
            <div className="auth-field">
              <label>Email Address</label>
              <div className="auth-field__input-wrap">
                <span className="auth-field__icon"><Mail size={16} /></span>
                <input
                  className={`auth-input${errors.email ? " error" : ""}`}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="auth-error-msg">{errors.email}</span>}
            </div>
          ) : (
            <div className="auth-field">
              <label>Phone Number</label>
              <div className="auth-field__input-wrap">
                <span className="auth-field__icon"><Phone size={16} /></span>
                <input
                  className={`auth-input${errors.phone ? " error" : ""}`}
                  type="tel"
                  placeholder="+91 9876543210"
                  value={form.phone}
                  onChange={set("phone")}
                  autoComplete="tel"
                />
              </div>
              {errors.phone && <span className="auth-error-msg">{errors.phone}</span>}
            </div>
          )}

          <div className="auth-field">
            <label>Password</label>
            <div className="auth-field__input-wrap">
              <span className="auth-field__icon"><Lock size={16} /></span>
              <input
                className={`auth-input${errors.password ? " error" : ""}`}
                type={showPass ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={set("password")}
                autoComplete="new-password"
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

          <div className="auth-field">
            <label>Confirm Password</label>
            <div className="auth-field__input-wrap">
              <span className="auth-field__icon"><Lock size={16} /></span>
              <input
                className={`auth-input${errors.confirm ? " error" : ""}`}
                type="password"
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={set("confirm")}
                autoComplete="new-password"
              />
            </div>
            {errors.confirm && <span className="auth-error-msg">{errors.confirm}</span>}
          </div>

          <label className="auth-terms">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" target="_blank">Terms of Use</Link> and{" "}
              <Link to="/privacy" target="_blank">Privacy Policy</Link>
            </span>
          </label>
          {errors.agreed && <span className="auth-error-msg">{errors.agreed}</span>}

          <button className="auth-submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? <span className="auth-btn-spinner" /> : null}
            {isLoading ? "Sending OTP..." : "Create Account ->"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/auth/login">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
