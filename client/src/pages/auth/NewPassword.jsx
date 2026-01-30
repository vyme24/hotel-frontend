import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Removed import '../../css/NewPassword.css'
import { Toaster, toast } from "react-hot-toast"; 
import { useUpdatePasswordMutation } from "../../services/auth";

const NewPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [
        updatePassword,
        {
            isLoading,
            isSuccess,
            isError,
            error
        }
    ] = useUpdatePasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password updated successfully!");
            setTimeout(() => {
                window.location.href = "/signin";
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
        
            await updatePassword({ 
                password: newPassword, 
                confirmPassword: confirmPassword, 
                token: token 
            });

          
        } catch (err) {
            
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-100">

                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        <span className="text-red-600">LUX</span>STAY
                    </h1>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 text-center">Set New Password</h2>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <div className="mt-1">
                            <input
                                type="password"
                                id="newPassword"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <div className="mt-1">
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Re-enter new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition duration-150"
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Update Password"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    <Link to="/signin" className="font-medium text-red-600 hover:text-red-500">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default NewPassword;