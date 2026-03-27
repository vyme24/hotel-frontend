import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const AppLayout = () => {
    const location = useLocation();
    // pages that have their own full-height hero don't need top padding
    const noTopPad = ["/", "/auth/login", "/auth/register", "/auth/otp", "/auth/forgot-password"];
    const hasPad = !noTopPad.includes(location.pathname);

    return (
        <>
            <Navbar />
            <main style={{ minHeight: "100vh", paddingTop: hasPad ? "68px" : 0, width: "100%", overflowX: "hidden" }}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default AppLayout;
