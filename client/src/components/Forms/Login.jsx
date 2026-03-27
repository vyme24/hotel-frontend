import { useEffect, useState } from "react";
import { useLoginMutation } from "../../services/auth";
import { useModal } from "../../hooks/ModalContext";
import toast from "react-hot-toast";
import { Mail, Phone, Lock, Sparkles } from "lucide-react";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

const Login = () => {
  const [loginMethod, setLoginMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { openModal } = useModal();

  const [login, { isLoading, isSuccess, data, isError, error, reset }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess && data) {
      openModal("otp", {
        email: loginMethod === "email" ? email.trim() : null,
        phone: loginMethod === "phone" ? phone.trim() : null,
        type: data.data?.type || "login",
        expired_at: data.data?.expired_at
      });
    }

    if (isError) {
      toast.error(error?.data?.message || "Login failed");
    }
  }, [isSuccess, data, isError, error, email, phone, loginMethod, openModal]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const identity = loginMethod === "email" ? email.trim() : phone.trim();
    if (!identity || !password.trim()) {
      toast.error("Please enter your credentials");
      return;
    }

    try {
      await login({ [loginMethod]: identity, password }).unwrap();
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
          Login to your Account
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Enter your details to continue</p>
      </div>

      <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
        <button
          onClick={() => setLoginMethod("email")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${loginMethod === "email" ? "bg-white dark:bg-gray-700 text-red-600 shadow-sm" : "text-gray-500"
            }`}
        >
          <Mail size={16} /> Email
        </button>
        <button
          onClick={() => setLoginMethod("phone")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${loginMethod === "phone" ? "bg-white dark:bg-gray-700 text-red-600 shadow-sm" : "text-gray-500"
            }`}
        >
          <Phone size={16} /> Phone
        </button>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-3">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
              {loginMethod === "email" ? <Mail size={18} /> : <Phone size={18} />}
            </div>
            <input
              type={loginMethod === "email" ? "email" : "tel"}
              placeholder={loginMethod === "email" ? "email@example.com" : "Phone Number"}
              value={loginMethod === "email" ? email : phone}
              onChange={(e) => {
                if (isError) reset();
                loginMethod === "email" ? setEmail(e.target.value) : setPhone(e.target.value);
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
        </div>

        <div className="flex justify-between items-center px-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-3 h-3 rounded border-gray-300 dark:border-gray-800 text-red-600 focus:ring-red-500/20" />
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Remember Me</span>
          </label>
          <button type="button" onClick={() => openModal("forgot")} className="text-[9px] font-black text-red-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Forgot Password?</button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-red-600 hover:bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-red-600/10"
        >
          {isLoading ? "Validating..." : "Sign In to LuxStay"}
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
        New Privilege Member? {" "}
        <button onClick={() => openModal("register")} className="text-red-600 hover:underline decoration-2 underline-offset-4">Register Now</button>
      </p>
    </div>
  );
};

export default Login;
