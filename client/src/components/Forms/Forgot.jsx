import { useState, useEffect } from "react";

import {  toast } from "react-hot-toast";
import { useForgotPasswordMutation, useVerifyOtpMutation } from "../../services/auth";
import { useModal } from "../../hooks/ModalContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const {openModal} = useModal();

  const [
    forgotPassword,
    { isLoading: loadingEmail, isSuccess: isEmailSuccess, isError: isEmailError, error: emailError }
  ] = useForgotPasswordMutation();

  const [
    verifyOtp,
    { isLoading: loadingOtp, isSuccess: isOtpSuccess, data: verifyData, isError: isOtpError, error: otpError }
  ] = useVerifyOtpMutation();

  useEffect(() => {
    if (isEmailSuccess) {
      setOtpSent(true);
      toast.success("OTP sent to your email!");
    }
    if (isEmailError) {
      toast.error(emailError?.data?.message || "Something went wrong!");
    }
  }, [isEmailSuccess, isEmailError, emailError]);

  useEffect(() => {
    if (isOtpSuccess) {
      if (verifyData?.data?.token) {
        toast.success("OTP verified!");
        window.location.href = "/reset-password/" + verifyData.data.token;
      } else {
        toast.error("Reset token missing.");
      }
    }
    if (isOtpError) {
      toast.error(otpError?.data?.message || "Verification failed.");
    }
  }, [isOtpSuccess, isOtpError, otpError, verifyData]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email");

   try {
  await forgotPassword({ email: email.trim() }).unwrap();
} catch (err) {
  toast.error(err?.data?.message || "Something went wrong");
}
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return toast.error("Please enter OTP");

    try {
      await verifyOtp({
        email: email.trim(),
        otp: otp.trim(),
        type: "forgot",
      }).unwrap();
    } catch (err) {}
  };

  return (
    
      <div className="max-w-md w-full space-y-6 ">

        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            <span className="text-red-600">LUX</span>STAY
          </h1>
        </div>

        {!otpSent && (
          <>
            <h2 className="text-2xl font-bold text-center">Forgot Password?</h2>
            <p className="text-center text-sm text-gray-600">Enter your email to receive OTP.</p>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />

              <button
                disabled={loadingEmail}
                className="w-full py-2 bg-red-600 text-white rounded-md disabled:opacity-50"
              >
                {loadingEmail ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {otpSent && (
          <>
            <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
            <p className="text-center text-sm text-green-600">OTP sent to {email}</p>

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="123456"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-center"
              />

              <button
                disabled={loadingOtp}
                className="w-full py-2 bg-red-600 text-white rounded-md disabled:opacity-50"
              >
                {loadingOtp ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </>
        )}

        <p className="text-center text-sm pt-4">
          Remember your password?
          <button  onClick={() => openModal("login")} className="text-red-600 ml-1">Back to Login</button>
        </p>
      </div>
    
  );
};

export default ForgotPassword;
