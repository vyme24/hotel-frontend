import { useNavigate } from "react-router-dom";
import { useModal } from "./ModalContext";
import { useSelector } from "react-redux";

export const useAuthCheck = () => {
    const { openModal } = useModal();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleAuthorizedAction = (action) => {
        if (!isAuthenticated) {
            openModal("login");
            return false;
        }

        if (action && typeof action === "function") {
            action();
        }

        return true;
    };

    return { handleAuthorizedAction, isAuthenticated };
};
