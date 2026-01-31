import { useEffect, useState } from "react";
import { useLoginMutation, useVerifyOtpMutation } from "../../services/auth";
import { useModal } from "../../hooks/ModalContext";
import VerifyOTP from "../Auth/VerifyOtp";
import toast from "react-hot-toast";
const Login= () => {
     const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [Otpmodel, setOtpmodel] = useState(false);
const {openModal} = useModal();
  const [
    login,
    { isLoading, isSuccess, data, isError, error }
  ] = useLoginMutation();



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

return (
    <>
    

        {!Otpmodel && (
            <div className="max-w-md w-full space-y-8">
         <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        <span className="text-red-600">LUX</span>STAY
                    </h1>
                </div>
        <div className="text-center">
        
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
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
                            <button onClick={() => openModal("forgot")} className="font-medium text-red-600 hover:text-red-500">
                                Forgot Password?
                            </button>
                        </div>
 <div className="text-sm  ">
                         <a to="/signup" className="font-medium  text-red-600 hover:text-red-500 ml-1">
                            Sign up
                        </a>
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
          </div>
        )}

        {Otpmodel && (
          <VerifyOTP/>
        )}
    
    </>
)

}

export default Login;