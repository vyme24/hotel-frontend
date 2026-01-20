import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";

const AppLayout = () => {

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
         window.location.href="/"
        }
  
    }, [])
  return (
    <div className="app-layout py-5">
        {/* App layout content goes here */}
        <Header />
       <div className="col-lg-4 col-12 mx-auto py-5 min-vh-100 flex flex-column justify-content-center">
         <Outlet/>
       </div>
        <Footer />
    </div>
  );
}
export default AppLayout;