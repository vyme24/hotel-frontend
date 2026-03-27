import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRegisterMutation } from "../../services/auth";
import { useModal } from "../../hooks/ModalContext";
import { User, Mail, Phone, Lock, Sparkles } from "lucide-react";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

const Register = () => {
    const [registerMethod, setRegisterMethod] = useState("email");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { openModal } = useModal();
    const [register, { isLoading, isError, isSuccess, data, error, reset }] = useRegisterMutation();

    useEffect(() => {
        if (isSuccess && data) {
            openModal("otp", {
                name: name.trim(),
                email: registerMethod === "email" ? email.toLowerCase().trim() : null,
                phone: registerMethod === "phone" ? phone.trim() : null,
                type: data.data?.type || "register",
                expired_at: data.data?.expired_at
            });
        }

        if (isError) {
            toast.error(error?.data?.message || "Registration failed");
        }
    }, [isSuccess, data, isError, error, email, phone, registerMethod, name, openModal]);

    const handleSignup = async (e) => {
        e.preventDefault();
        const identity = registerMethod === "email" ? email.trim() : phone.trim();
        if (!name.trim() || !identity || !password || !confirmPassword) {
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
                [registerMethod]: identity,
                password
            }).unwrap();
        } catch (err) { }
    };


    return (
        <div className="w-full animate-fadeIn">
            <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center transform hover:rotate-[15deg] transition-all duration-700 shadow-xl shadow-red-600/20">
                        <Sparkles size={20} className="text-white" />
                    </div>
                </div>
                <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2 italic">
                    <span className="text-red-600 non-italic">LUX</span>STAY
                </h1>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                    Create an Account
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Join us to book your next stay</p>
            </div>

            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
                <button
                    onClick={() => setRegisterMethod("email")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${registerMethod === "email" ? "bg-white dark:bg-gray-700 text-red-600 shadow-sm" : "text-gray-500"
                        }`}
                >
                    <Mail size={16} /> Email
                </button>
                <button
                    onClick={() => setRegisterMethod("phone")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${registerMethod === "phone" ? "bg-white dark:bg-gray-700 text-red-600 shadow-sm" : "text-gray-500"
                        }`}
                >
                    <Phone size={16} /> Phone
                </button>
            </div>

            <form className="space-y-4" onSubmit={handleSignup}>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                        <User size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => {
                            if (isError) reset();
                            setName(e.target.value);
                        }}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50/50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-[11px] font-bold tracking-widest text-gray-900 dark:text-white"
                        required
                    />
                </div>

                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                        {registerMethod === "email" ? <Mail size={18} /> : <Phone size={18} />}
                    </div>
                    <input
                        type={registerMethod === "email" ? "email" : "tel"}
                        placeholder={registerMethod === "email" ? "Email Address" : "Phone Number"}
                        value={registerMethod === "email" ? email : phone}
                        onChange={(e) => {
                            if (isError) reset();
                            registerMethod === "email" ? setEmail(e.target.value) : setPhone(e.target.value);
                        }}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50/50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-[11px] font-bold tracking-widest text-gray-900 dark:text-white"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                            <Lock size={18} />
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                if (isError) reset();
                                setPassword(e.target.value);
                            }}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-[11px] font-bold tracking-widest text-gray-900 dark:text-white"
                            required
                        />
                    </div>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                            <Lock size={18} />
                        </div>
                        <input
                            type="password"
                            placeholder="Confirm"
                            value={confirmPassword}
                            onChange={(e) => {
                                if (isError) reset();
                                setConfirmPassword(e.target.value);
                            }}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-[11px] font-bold tracking-widest text-gray-900 dark:text-white"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-red-600 hover:bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-red-600/10 mt-2"
                >
                    {isLoading ? "Provisioning..." : "Create Elite Account"}
                </button>
            </form>

            <div className="flex items-center gap-4 my-6 before:h-px before:flex-1 before:bg-gray-200 dark:before:bg-gray-800 after:h-px after:flex-1 after:bg-gray-200 dark:after:bg-gray-800">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">OR</span>
            </div>

            <div className="flex justify-center gap-4 mb-6">
                <a href="http://localhost:5000/api/auth/google" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:scale-110 hover:shadow-md hover:text-red-600 transition-all text-gray-600 dark:text-gray-400">
                    <FaGoogle size={16} />
                </a>
                <a href="http://localhost:5000/api/auth/github" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:scale-110 hover:shadow-md hover:text-red-600 transition-all text-gray-600 dark:text-gray-400">
                    <FaGithub size={16} />
                </a>
                <a href="http://localhost:5000/api/auth/facebook" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:scale-110 hover:shadow-md hover:text-red-600 transition-all text-gray-600 dark:text-gray-400">
                    <FaFacebook size={16} />
                </a>
            </div>

            <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Already part of the Sanctuary? {" "}
                <button onClick={() => openModal("login")} className="text-red-600 hover:underline decoration-2 underline-offset-4">Sign In</button>
            </p>
        </div>
    );
};

export default Register;
