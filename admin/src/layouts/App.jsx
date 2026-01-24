import { Outlet } from "react-router-dom";

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
    <div className="app-layout">
       
       <div className="flex-1">
         <Outlet/>
       </div>
        <Footer />
    </div>
  );
}
export default AppLayout;