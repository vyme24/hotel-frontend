import { useState } from "react";
import { toast } from "react-hot-toast";
import { useResetPasswordMutation } from "../../services/auth";
import { useModal } from "../../hooks/ModalContext";
import { Lock, KeyRound } from "lucide-react";

const ResetPassword = ({ data }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { openModal } = useModal();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const handleReset = async (e) => {
        e.preventDefault();
        if (!newPassword || !confirmPassword) {
            return toast.error("Please provide both passwords");
        }
        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            await resetPassword({
                newPassword,
                token: data?.token,
            }).unwrap();

            toast.success("Your password changed successfully ✅");
            openModal("login");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to reset password");
        }
    };

    return (
        <div className="w-full animate-fadeIn">
            <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Reset Password
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Create a new secure password for your account</p>
            </div>

            <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-3">
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                            <KeyRound size={18} />
                        </div>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm text-gray-900 dark:text-white"
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                            <Lock size={18} />
                        </div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm text-gray-900 dark:text-white"
                            required
                            minLength={6}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-red-600/20 mt-2"
                >
                    {isLoading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
