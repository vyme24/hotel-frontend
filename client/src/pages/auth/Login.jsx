import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useLoginMutation, useVerifyOtpMutation } from "../../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [Otpmodel, setOtpmodel] = useState(false);

  const [
    login,
    { isLoading, isSuccess, data, isError, error }
  ] = useLoginMutation();

  const [
    verifyLogin,
    {
      isLoading: isVLoading,
      isSuccess: isVSuccess,
      data: vData,
      isError: vErr,
      error: vError,
    },
  ] = useVerifyOtpMutation();

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("userEmail", email);
      toast.success("OTP sent to your email. Please verify.");
      setOtpmodel(true);
    }

    if (isError) {
      toast.error(error?.data?.message || "Login failed");
    }
  }, [isSuccess, data, isError, error, email]);

  useEffect(() => {
    if (isVSuccess && vData) {
      localStorage.setItem("token", vData.data?.token || vData.token);
      localStorage.removeItem("userEmail");
      toast.success("Login successful!");
      window.location.href = "/";
    }

    if (vErr) {
      toast.error(vError?.data?.message || "OTP verification failed");
    }
  }, [isVSuccess, vData, vErr, vError]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await login({ email, password }).unwrap();
    } catch (err) {}
  };

  const handleverifyLogin = async (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem("userEmail");

    if (!otp.trim()) {
      toast.error("Please enter the OTP.");
      return;
    }

    if (!userEmail) {
      toast.error("User email missing. Please login again.");
      return;
    }

    try {
      await verifyLogin({
        email: userEmail,
        otp,
        type: "login",
      }).unwrap();
    } catch (err) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl border border-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            <span className="text-red-600">LUX</span>STAY
          </h1>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {Otpmodel ? "Two-Factor Authentication" : "Sign in to your account"}
          </h2>
        </div>

        {!Otpmodel && (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
                />
              </div>
            </div>
            <div className="flex justify-between">
 <div className="text-sm">
                            <Link to="/forgot-password" className="font-medium text-red-600 hover:text-red-500">
                                Forgot Password?
                            </Link>
                        </div>
 <div className="text-sm  ">
                         <Link to="/signup" className="font-medium  text-red-600 hover:text-red-500 ml-1">
                            Sign up
                        </Link>
                  </div>
            </div>
           

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-md bg-red-600 text-white disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Signin"}
            </button>
            
            


               

                   
                    
          </form>
        )}

        {Otpmodel && (
          <form onSubmit={handleverifyLogin} className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 text-center mb-4">
                OTP sent to {localStorage.getItem("userEmail")}
              </p>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-center"
              />
            </div>

            <button
              type="submit"
              disabled={isVLoading}
              className="w-full py-2 rounded-md bg-green-600 text-white disabled:opacity-50"
            >
              {isVLoading ? "Verifying..." : "Verify and Login"}
            </button>

            <p className="text-center text-sm">
              <button
                type="button"
                onClick={() => setOtpmodel(false)}
                className="text-red-600"
              >
                Back to Password Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
