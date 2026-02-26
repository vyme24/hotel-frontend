import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useModal } from "../hooks/ModalContext"
import Header from "../components/Header"
import Footer from "../components/Footer"

const AppLayout = () => {
    const location = useLocation();
    const { openModal } = useModal();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (location.state?.openLogin && !isAuthenticated) {
            openModal("login");
            // Clear the state to prevent re-triggering
            window.history.replaceState({}, document.title);
        }
    }, [location.state, openModal, isAuthenticated]);

    return (
        <>
            <Header />
            <main className={location.pathname === "/" ? "" : "pt-32"}>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default AppLayout