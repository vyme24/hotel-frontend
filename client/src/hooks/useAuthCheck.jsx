import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export const useAuthCheck = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleAuthorizedAction = (action) => {
        if (!isAuthenticated) {
            toast.error("Please login first to continue");
            navigate("/auth/login", {
                state: {
                    from: `${location.pathname}${location.search}${location.hash}`,
                    message: "Please login first to continue",
                },
            });
            return false;
        }

        if (action && typeof action === "function") {
            return action();
        }

        return true;
    };

    return { handleAuthorizedAction, isAuthenticated };
};
