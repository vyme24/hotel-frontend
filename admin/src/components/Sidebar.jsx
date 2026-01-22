import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  CalendarCheck2,
  Hotel,
  BedDouble,
  Users,
  UserCog,
  Star,
  Wallet,
  Megaphone,
  BarChart3,
  Settings,
  ChevronDown,
  Menu,
  User,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen, user, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({
    booking: false,
    hotel: false,
    room: false,
    guest: false,
    staff: false,
    review: false,
    finance: false,
    marketing: false,
    report: false,
    setting: false,
  });

  const [hoverMenu, setHoverMenu] = useState(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  const handleMenuClick = () => {
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const menuConfig = [
    { id: "dashboard", label: "Dashboard", link: "/admin/dashboard", icon: LayoutDashboard },
    {
      id: "booking",
      label: "Booking Management",
      icon: CalendarCheck2,
      children: [
        { label: "All Bookings", link: "/bookings" },
        { label: "New Bookings", link: "/bookings/new" },
      ],
    },
    { id: "hotel", label: "Hotel Management", icon: Hotel, children: [{ label: "All Hotels", link: "/hotels" }] },
    { id: "room", label: "Room Management", icon: BedDouble, children: [{ label: "All Rooms", link: "/rooms" }] },
    { id: "guest", label: "Guests", icon: Users, children: [{ label: "All Guests", link: "/guests" }] },
    { id: "staff", label: "Staff", icon: UserCog, children: [{ label: "All Staff", link: "/staff" }] },
    { id: "review", label: "Reviews", icon: Star, children: [{ label: "All Reviews", link: "/reviews" }] },
    { id: "finance", label: "Payments", icon: Wallet, children: [{ label: "All Payments", link: "/payments" }] },
    { id: "marketing", label: "Marketing", icon: Megaphone, children: [{ label: "Coupons", link: "/coupons" }] },
    { id: "report", label: "Reports", icon: BarChart3, children: [{ label: "Booking Report", link: "/reports/bookings" }] },
    { id: "setting", label: "Settings", icon: Settings, children: [{ label: "General Settings", link: "/settings/general" }] },
  ];

  const SidebarWidth = isCollapsed ? "w-20" : "w-72";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 shadow-xl transition-all duration-300
        ${SidebarWidth}
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
      {/* TOP AREA */}
<div className="relative border-b border-gray-100">
  <div
    className={`h-16 flex items-center ${
      isCollapsed ? "justify-center" : "justify-between px-4"
    }`}
  >
    {/* ✅ Logo Icon Always */}
    <Link
      to="/admin/dashboard"
      className="flex items-center gap-2"
      title="Dashboard"
    >
      <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-red-800 to-red-600 text-white flex items-center justify-center shadow-sm">
        <span className="font-extrabold text-sm">L</span>
      </div>

      {/* Show text only when expanded */}
      {!isCollapsed && (
        <div className="leading-tight">
          <p className="font-extrabold text-gray-900 text-lg">
            <span className="text-red-600">LUX</span>STAY
          </p>
          <p className="text-[11px] text-gray-500 -mt-1">Admin Panel</p>
        </div>
      )}
    </Link>
  </div>

  {/* Floating Toggle Button */}
  <button
    className="absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-gray-50 transition flex items-center justify-center"
    onClick={() => setIsCollapsed((p) => !p)}
    title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
  >
    <Menu className="w-5 h-5 text-gray-700" />
  </button>
</div>


        {/* USER ICON ON MINIMAL */}
        {isCollapsed && (
          <div className="px-3 py-4 border-b border-gray-100 flex justify-center">
            <Link
              to="/profile"
              className="h-12 w-12 rounded-xl border border-gray-200 hover:bg-gray-50 transition flex items-center justify-center"
              title={user?.name || "Profile"}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="user"
                  className="h-10 w-10 rounded-xl object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-gray-700" />
              )}
            </Link>
          </div>
        )}

        {/* MENU */}
        <div className="p-3 overflow-y-auto h-[calc(100vh-90px)]">
          <nav className="space-y-2">
            {menuConfig.map((item) => {
              const Icon = item.icon;

              const active = item.link && location.pathname === item.link;
              const isDropdownActive =
                item.children && item.children.some((c) => location.pathname === c.link);

              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={(e) => {
                    if (isCollapsed && item.children) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setPopupPos({ top: rect.top, left: rect.right + 12 });
                      setHoverMenu(item.id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isCollapsed && item.children) setHoverMenu(null);
                  }}
                >
                  {/* Parent */}
                  <div
                    className={`flex items-center rounded-xl border transition cursor-pointer
                    ${isCollapsed ? "justify-center px-3 py-3" : "px-4 py-3"}
                    ${
                      active || isDropdownActive
                        ? "bg-gradient-to-r from-red-800 to-red-600 text-white border-red-700 shadow-md"
                        : "bg-white text-gray-700 border-gray-100 hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      if (item.children) {
                        if (!isCollapsed) toggleMenu(item.id);
                      }
                    }}
                    title={isCollapsed ? item.label : ""}
                  >
                    <Icon className="w-5 h-5" />

                    {!isCollapsed && (
                      <div className="flex items-center w-full ml-3">
                        {item.children ? (
                          <>
                            <span className="font-medium">{item.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 ml-auto transition-transform ${
                                openMenus[item.id] ? "rotate-180" : ""
                              }`}
                            />
                          </>
                        ) : (
                          <Link to={item.link} className="w-full" onClick={handleMenuClick}>
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        )}
                      </div>
                    )}

                    {isCollapsed && !item.children && (
                      <Link to={item.link} className="absolute inset-0" onClick={handleMenuClick} />
                    )}
                  </div>

                  {/* Expanded children */}
                  {!isCollapsed && item.children && (
                    <div
                      className={`ml-3 overflow-hidden transition-all duration-300 ${
                        openMenus[item.id] ? "max-h-[500px] mt-2 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-2 space-y-1">
                        {item.children.map((child) => {
                          const childActive = location.pathname === child.link;
                          return (
                            <Link
                              key={child.link}
                              to={child.link}
                              onClick={handleMenuClick}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition
                              ${
                                childActive
                                  ? "bg-white text-red-700 shadow border border-red-100"
                                  : "text-gray-700 hover:bg-white"
                              }`}
                            >
                              <span className="w-2 h-2 rounded-full bg-gray-400" />
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Collapsed Hover Popup */}
                  {isCollapsed && item.children && hoverMenu === item.id && (
                    <div
                      className="fixed w-64"
                      style={{
                        top: popupPos.top,
                        left: popupPos.left,
                        zIndex: 999999,
                      }}
                    >
                      <div className="bg-white border border-gray-200 shadow-2xl rounded-xl overflow-hidden">
                        <div className="px-4 py-3 border-b bg-gray-50">
                          <p className="font-semibold text-gray-900 text-sm">
                            {item.label}
                          </p>
                        </div>

                        <div className="p-2 space-y-1">
                          {item.children.map((child) => {
                            const childActive = location.pathname === child.link;

                            return (
                              <Link
                                key={child.link}
                                to={child.link}
                                onClick={handleMenuClick}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition
                                ${
                                  childActive
                                    ? "bg-red-50 text-red-700"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                <span className="w-2 h-2 rounded-full bg-gray-400" />
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
