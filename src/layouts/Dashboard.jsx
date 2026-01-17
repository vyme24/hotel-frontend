import { useEffect } from "react";
import BreadCrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import HeaderTwo from "../components/HeaderTwo";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useGetUserQuery } from "../services/userService";

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
 const {isLoading, isError, data, isSuccess} = useGetUserQuery()

  useEffect(() => {
      const token = localStorage.getItem("token");
      if(!token){
       window.location.href="/login"
      }else{

        setUser(data?.data)
        
      }

  }, [isLoading, isError, isSuccess, data])
 

  return (
    <div className="section-bg dashboard-layout">
        {/* Dashboard layout content goes here */}
       
        <Sidebar/>
          <section className="dashboard-area">
             <HeaderTwo user={user}/>
             <div className="dashboard-content-wrap">
            <BreadCrumb/>
  
  <div class="dashboard-main-content">
     <Outlet/>

  </div>
         
          </div>
        </section>
        <Footer />
    </div>
  );
}
export default DashboardLayout;