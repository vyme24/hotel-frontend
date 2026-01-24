import { useEffect, useState } from "react";
import { useLoginMutation } from "../../services/adminService";
import toast from "react-hot-toast";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loginAccount, { isLoading, isSuccess, data, isError, error }] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message || "Login successful");
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    }

    if (isError) {
      toast.error(error?.data?.message || "Login failed!");
    }
  }, [isSuccess, data, isError, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.trim() === "") {
      toast.error("Please enter username");
      return;
    }

    if (password.trim() === "") {
      toast.error("Please enter password");
      return;
    }

    try {
      await loginAccount({ user, password }).unwrap();
      toast.success("Login successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/50 p-8 sm:p-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
            <span className="text-red-600">LUX</span>STAY
          </h1>
          <p className="mt-2 text-sm text-gray-600">Admin Panel Access</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-4 border border-gray-300 rounded-2xl shadow-sm"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl shadow-sm"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 text-sm text-blue-600"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !user.trim() || !password.trim()}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-lg disabled:opacity-60"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
