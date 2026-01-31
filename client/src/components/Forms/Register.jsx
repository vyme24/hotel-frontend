import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRegisterMutation } from "../../services/auth";
import { useModal } from "../../hooks/ModalContext";
import VerifyOTP from "../Auth/VerifyOtp";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Otpmodel, setOtpmodel] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

   const  {openModal} =  useModal();

    const [register, { isLoading, isError, isSuccess, data, error }] = useRegisterMutation();


      useEffect(() => {
        if (isSuccess && data) {
          toast.success("OTP sent to your email. Please verify.");
          setOtpmodel(true);
        }
    
        if (isError) {
          toast.error(error?.data?.message || "Login failed");
        }
      }, [isSuccess, data, isError, error, email]);
    

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        
        try {
           await register({ 
                name: name.trim(), 
                email: email.toLowerCase().trim(), 
                password 
            }).unwrap();
        } catch (err) {
            toast.error(err?.data?.message || "Something went wrong");
        }
    };

    return (
          <>
           {!Otpmodel && ( <div className="max-w-md w-full space-y-8 ">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        <span className="text-red-600">LUX</span>STAY
                    </h1>
                </div>
                <h3 className="text-center text-xl font-medium text-gray-700">Create your new account</h3>

                <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="w-full">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>

                        <div className="w-full">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="w-full">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>

                        <div className="w-full">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700"> Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition duration-150" 
                    >
                        {isLoading ? "Creating..." : "Sign up"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Already have an account? 
                    <button  onClick={() => openModal("login")} className="font-medium text-red-600 hover:text-red-500 ml-1">Sign in</button>
                </p>
            </div>)}
            {Otpmodel && <VerifyOTP user={data?.data}/>}
       </>
    );
};

export default Register;
