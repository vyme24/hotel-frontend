import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Notification from "./Header/Notification";
import { useLogoutMutation } from "../services/userService";

import {
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Home,
} from "lucide-react";

const HeaderTwo = ({ user, toggleSidebar }) => {
  const location = useLocation();
 const [logouthandle, { isLoading, data, isSuccess }] = useLogoutMutation();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.removeItem("token");
      toast.success(data.message || "Logged out successfully");
      window.location.href = "/login";
    }
  }, [isSuccess, data]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const logoutSubmit = async () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      await logouthandle().unwrap();
    }
  };

  const pageTitle = () => {
    const path = location.pathname;
    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("bookings")) return "Bookings";
    if (path.includes("hotels")) return "Hotels";
    if (path.includes("rooms")) return "Rooms";
    if (path.includes("guests")) return "Guests";
    if (path.includes("staff")) return "Staff";
    if (path.includes("reviews")) return "Reviews";
    if (path.includes("payments")) return "Payments";
    if (path.includes("reports")) return "Reports";
    if (path.includes("settings")) return "Settings";
    return "Admin Panel";
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="px-4 lg:px-6">
        <div className="h-14 lg:h-16 flex items-center justify-between gap-3">
          {/* LEFT */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition"
              onClick={toggleSidebar}
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>

            <div className="min-w-0">
              <h2 className="text-base lg:text-lg font-bold text-gray-900 truncate">
                {pageTitle()}
              </h2>
              <p className="text-[11px] text-gray-500 hidden sm:block truncate">
                Welcome back, manage everything easily
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <Notification />

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl border border-transparent hover:border-gray-200 hover:bg-gray-50 transition"
                onClick={() => setIsUserMenuOpen((p) => !p)}
              >
                <img
                  src={user?.avatar || "/images/team9.jpg"}
                  alt="user"
                  className="h-9 w-9 rounded-xl object-cover ring-1 ring-gray-200"
                />
                <div className="hidden md:block text-left leading-tight">
                  <p className="text-sm font-semibold text-gray-900 truncate max-w-[140px]">
                    {user?.name || "Admin"}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate max-w-[140px]">
                    {user?.role || "Administrator"}
                  </p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden z-[999999]">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user?.email || user?.name || "Admin"}
                    </p>
                  </div>

                  <div className="p-2 space-y-1">
                

                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      Profile
                    </Link>

                  
                    <div className="border-t border-gray-100 my-1" />

                    <button
                      onClick={logoutSubmit}
                      disabled={isLoading}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition disabled:opacity-60"
                    >
                      <LogOut className="w-4 h-4" />
                      {isLoading ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTwo;
