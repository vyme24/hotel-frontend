import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useResetPasswordMutation } from "../../redux/apiSlice";
import toast from "react-hot-toast";
import "./Login/Login.css";

export default function NewPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or expired reset link.");
      navigate("/auth/forgot-password", { replace: true });
    }
  }, [navigate, token]);

  const validate = () => {
    const nextErrors = {};
    if (!form.password) nextErrors.password = "New password is required";
    else if (form.password.length < 6) nextErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = "Passwords do not match";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const res = await resetPassword({
        newPassword: form.password,
        token,
      }).unwrap();

      toast.success(res?.message || "Password updated successfully!");
      navigate("/auth/login", {
        replace: true,
        state: {
          message: "Password updated successfully. Please login.",
          toastType: "success",
        },
      });
    } catch (err) {
      toast.error(err?.data?.message || "Unable to update password");
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

        <h1 className="auth-card__title">Set new password</h1>
        <p className="auth-card__subtitle">
          Create a secure password for your account and continue back to login.
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label>New Password</label>
            <div className="auth-field__input-wrap">
              <span className="auth-field__icon"><Lock size={16} /></span>
              <input
                className={`auth-input${errors.password ? " error" : ""}`}
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                autoComplete="new-password"
              />
              <button type="button" className="auth-eye-btn" onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="auth-error-msg">{errors.password}</span>}
          </div>

          <div className="auth-field">
            <label>Confirm New Password</label>
            <div className="auth-field__input-wrap">
              <span className="auth-field__icon"><Lock size={16} /></span>
              <input
                className={`auth-input${errors.confirmPassword ? " error" : ""}`}
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                value={form.confirmPassword}
                onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
                autoComplete="new-password"
              />
              <button type="button" className="auth-eye-btn" onClick={() => setShowConfirm((value) => !value)}>
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && <span className="auth-error-msg">{errors.confirmPassword}</span>}
          </div>

          <button className="auth-submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? <span className="auth-btn-spinner" /> : null}
            {isLoading ? "Updating..." : "Update Password ->"}
          </button>
        </form>

        <p className="auth-footer">
          <Link to="/auth/login">Back to login</Link>
        </p>
      </motion.div>
    </div>
  );
}
