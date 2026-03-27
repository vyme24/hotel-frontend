import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { useSelector } from "react-redux";

const SessionTimer = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [timeLeft, setTimeLeft] = useState(20 * 60);

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.removeItem("site_session_end");
            return;
        }

        let sessionEnd = localStorage.getItem("site_session_end");

        if (!sessionEnd) {
            sessionEnd = Date.now() + 20 * 60 * 1000;
            localStorage.setItem("site_session_end", sessionEnd);
        }

        const interval = setInterval(() => {
            const now = Date.now();
            const distance = sessionEnd - now;

            if (distance <= 0) {
                clearInterval(interval);
                setTimeLeft(0);

                // Reset and clear session data
                localStorage.removeItem("site_session_end");
                localStorage.removeItem("token");
                window.location.reload();
            } else {
                setTimeLeft(Math.floor(distance / 1000));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    if (!isAuthenticated || timeLeft <= 0) return null;

    return (
        <div className="bg-red-600 text-white flex items-center justify-center gap-2 py-1 text-[10px] font-black uppercase tracking-widest sticky top-0 z-[100]">
            <Timer size={12} className="animate-pulse" />
            <span>YOUR SESSION END : {formatTime(timeLeft)} MIN</span>
        </div>
    );
};

export default SessionTimer;
