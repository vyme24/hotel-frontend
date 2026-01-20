import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <div className="app-layout">
        {/* App layout content goes here */}
        <Header />
        <Outlet/>
        <Footer />
    </div>
  );
}
export default AppLayout;