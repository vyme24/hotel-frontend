import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// Removed import '../../css/NewPassword.css'
import { Toaster, toast } from "react-hot-toast";
import { useResetPasswordMutation } from "../../services/auth";
import { Sparkles } from "lucide-react";

const NewPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const [
        resetPassword,
        {
            isLoading,
            isSuccess,
            isError,
            error
        }
    ] = useResetPasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password updated successfully!");
            setTimeout(() => {
                navigate("/", { state: { openLogin: true } });
            }, 1000);
        }

        if (isError) {
            const errorMessage = error?.data?.message || "Something went wrong. Please try again later.";
            toast.error(errorMessage);
        }
    }, [isSuccess, isError, error]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword === "" || confirmPassword === "") {
            toast.error("Please fill all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        let token = null;
        try {

            token = window.location.pathname.split("/reset-password/")[1];
        } catch (e) {
            toast.error("Invalid or missing reset link token.");
            return;
        }

        if (!token) {
            toast.error("Invalid or missing reset link token.");
            return;
        }

        try {
            await resetPassword({
                newPassword,
                token
            }).unwrap();
        } catch (err) {
            // Error handling in useEffect
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="max-w-md w-full space-y-6 bg-white dark:bg-[#0a0a0a] p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/5">

                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center transform hover:rotate-[15deg] transition-all duration-700 shadow-xl shadow-red-600/20">
                            <Sparkles size={24} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white italic">
                        <span className="text-red-600 non-italic">LUX</span>STAY
                    </h1>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Set New Password</h2>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                        <div className="mt-1">
                            <input
                                type="password"
                                id="newPassword"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="appearance-none relative block w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 sm:text-sm font-black tracking-widest"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                        <div className="mt-1">
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Re-enter new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="appearance-none relative block w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 sm:text-sm font-black tracking-widest"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black tracking-widest uppercase rounded-2xl text-white bg-red-600 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition duration-300 shadow-xl"
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Update Password"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    <Link to="/" state={{ openLogin: true }} className="font-medium text-red-600 hover:text-red-500">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default NewPassword;