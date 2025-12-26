import BreadCrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import HeaderTwo from "../components/HeaderTwo";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="section-bg dashboard-layout">
        {/* Dashboard layout content goes here */}
       
        <Sidebar/>
          <section className="dashboard-area">
             <HeaderTwo/>
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