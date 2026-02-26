import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, Moon, Sun, User, LogOut, Heart, Calendar, ShoppingCart, Bell, Ticket, MapPin, Sparkles, Settings, HelpCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/ThemeContext";
import { useModal } from "../hooks/ModalContext";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { clearCart } from "../store/cartSlice";

const navigationLinks = [
  { label: "Home", path: "/" },
  {
    label: "Hotels",
    path: "/hotels",
    dropdown: [
      { label: "All Hotels", path: "/hotels" },
      { label: "Luxury Collection", path: "/hotels?category=Hotel" },
      { label: "Boutique Stays", path: "/hotels?category=Boutique" },
      { label: "Resorts & Spas", path: "/hotels?category=Resort" },
    ]
  },
  {
    label: "Rooms",
    path: "/rooms",
    dropdown: [
      { label: "View All Rooms", path: "/rooms" },
      { label: "Executive Suites", path: "/rooms?type=Suite" },
      { label: "Deluxe Rooms", path: "/rooms?type=Deluxe" },
    ]
  },
  { label: "My Bookings", path: "/bookings", private: true },
  { label: "Offers", path: "/offers" },
  { label: "Support", path: "/support" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { items } = useSelector((state) => state.cart);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const profileRef = useRef(null);

  const isHomePage = location.pathname === "/";

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Click outside for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    setIsProfileOpen(false);
    navigate("/");
  };

  const isActiveRoute = (path) => {
    if (path === "/") return location.pathname === path;
    return location.pathname.startsWith(path);
  };


  const ProfileDropdown = () => (
    <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white dark:bg-[#0a0a0a] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)] border border-gray-100 dark:border-white/10 py-3 z-[110] overflow-hidden animate-fadeIn">
      <div className="px-5 py-3 border-b border-gray-50 dark:border-white/5 mb-1">
        <p className="text-[9px] font-black text-red-600 uppercase tracking-[0.1em] mb-0.5 italic">Authorized Member</p>
        <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tighter truncate">{user?.name || "Guest"}</p>
        <p className="text-[9px] text-gray-400 truncate">{user?.email}</p>
      </div>

      <div className="space-y-0.5 px-1.5">
        {[
          { icon: User, label: "My Profile", path: "/profile" },
          { icon: Calendar, label: "My Bookings", path: "/bookings" },
          { icon: ShoppingCart, label: "My Cart", path: "/cart", badge: items.length },
          { icon: Settings, label: "Settings", path: "/settings" },
          { icon: HelpCircle, label: "Help Center", path: "/help" },
        ].map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className={`flex items-center justify-between px-3.5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all group ${location.pathname === item.path ? 'bg-red-50 dark:bg-red-900/10 text-red-600' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-red-600'}`}
            onClick={() => setIsProfileOpen(false)}
          >
            <div className="flex items-center gap-2.5">
              <item.icon size={14} className={`${location.pathname === item.path ? 'text-red-600' : 'text-gray-400 group-hover:text-red-600'} transition-colors`} />
              <span>{item.label}</span>
            </div>
            {item.badge > 0 && (
              <span className="w-5 h-5 bg-red-600 text-white text-[9px] font-black rounded-lg flex items-center justify-center">{item.badge}</span>
            )}
          </Link>
        ))}
      </div>

      <div className="px-3 mt-3 pt-3 border-t border-gray-50 dark:border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all duration-300"
        >
          <LogOut size={12} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled || !isHomePage || isHovered
          ? "bg-white dark:bg-black lg:bg-white/95 lg:dark:bg-[#050505]/95 backdrop-blur-3xl shadow-xl border-b border-gray-100 dark:border-white/5"
          : "bg-white dark:bg-black lg:bg-transparent lg:backdrop-blur-none"
          } ${isScrolled ? "h-20" : "h-20 lg:h-24"} flex items-center px-4 lg:px-6`}
      >
        <div className="mx-auto max-w-7xl w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center transform group-hover:rotate-[15deg] transition-all duration-700 shadow-xl shadow-red-600/20">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none italic">
                <span className="text-red-600">LUX</span>STAY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationLinks
              .filter(link => !link.private || isAuthenticated)
              .map((link) => (
                <div key={link.label} className="relative group/nav">
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] rounded-xl transition-all ${isActiveRoute(link.path)
                      ? "text-red-600 bg-red-50 dark:bg-red-900/10"
                      : "text-gray-500 hover:text-red-600 hover:bg-gray-50 dark:hover:bg-white/5"
                      }`}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown size={10} className="group-hover/nav:rotate-180 transition-transform duration-300" />}
                  </Link>

                  {link.dropdown && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-black rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-gray-100 dark:border-white/5 py-4 invisible group-hover/nav:visible opacity-0 group-hover/nav:opacity-100 transition-all duration-300 z-[110]">
                      {link.dropdown.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={sub.path}
                          className="block px-6 py-2.5 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-red-600 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Cart Indicator */}
            {isAuthenticated && (
              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500 hover:text-red-600 transition-all border border-transparent hover:border-red-600/20"
              >
                <ShoppingCart size={18} />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[9px] font-black rounded-lg flex items-center justify-center border-2 border-white dark:border-[#050505]">
                    {items.length}
                  </span>
                )}
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500 hover:text-red-600 transition-all shadow-sm active:scale-95"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              {!isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2">
                  <button onClick={() => openModal("login")} className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-600 transition-colors">Sign In</button>
                  <button onClick={() => openModal("register")} className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all transform active:scale-95">Register</button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1.5 pr-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-red-600/20 transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
                      <User size={14} className="text-white" />
                    </div>
                    <ChevronDown size={12} className={`text-gray-400 transition-transform duration-500 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isProfileOpen && <ProfileDropdown />}
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-black text-white"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div className={`fixed inset-0 z-[110] lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white dark:bg-[#0a0a0a] shadow-2xl transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-12">
              <span className="text-xl font-black italic tracking-tighter text-gray-900 dark:text-white uppercase"><span className="text-red-600">LUX</span>STAY</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500"><X size={20} /></button>
            </div>

            <nav className="flex-grow space-y-4 overflow-y-auto no-scrollbar">
              {navigationLinks
                .filter(link => !link.private || isAuthenticated)
                .map((link) => (
                  <div key={link.label} className="space-y-2">
                    <Link
                      to={link.path}
                      onClick={() => !link.dropdown && setIsMobileMenuOpen(false)}
                      className={`block py-3 text-sm font-black uppercase tracking-widest ${isActiveRoute(link.path) ? "text-red-600" : "text-gray-500 hover:text-red-600"}`}
                    >
                      {link.label}
                    </Link>
                    {link.dropdown && (
                      <div className="pl-4 space-y-2 border-l border-gray-100 dark:border-white/5">
                        {link.dropdown.map((sub, idx) => (
                          <Link
                            key={idx}
                            to={sub.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-600"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </nav>

            {!isAuthenticated && (
              <div className="pt-8 border-t border-gray-50 dark:border-white/5 space-y-4">
                <button onClick={() => { openModal("login"); setIsMobileMenuOpen(false); }} className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 border border-gray-100 dark:border-white/5 rounded-2xl italic">Sign In</button>
                <button onClick={() => { openModal("register"); setIsMobileMenuOpen(false); }} className="w-full py-4 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Register Account</button>
              </div>
            )}
            {isAuthenticated && (
              <div className="pt-8 border-t border-gray-50 dark:border-white/5">
                <button onClick={handleLogout} className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-[10px] font-black uppercase tracking-widest italic">Sign Out Session</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}