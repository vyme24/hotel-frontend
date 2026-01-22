import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderTwo from "../components/HeaderTwo";
import { useGetUserQuery } from "../services/userService";

const DashboardLayout = () => {
  const [user, setUser] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile
  const [isCollapsed, setIsCollapsed] = useState(true); // ✅ default minimal

  const { isLoading, isError, data, isSuccess } = useGetUserQuery();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    setUser(data?.data);
  }, [isLoading, isError, isSuccess, data]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        user={user}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >
        <HeaderTwo
          user={user}
          toggleSidebar={() => setIsSidebarOpen((p) => !p)}
        />

        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
