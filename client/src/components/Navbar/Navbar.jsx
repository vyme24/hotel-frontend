import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hotel, Bell, User, LogOut, Settings, BookOpen,
  Tag, Menu, X, ChevronDown, ShoppingCart,
} from "lucide-react";
import { logout } from "../../store/authSlice";
import { useGetNotificationsQuery } from "../../redux/apiSlice";
import { useConfirmDialog } from "../../hooks/ConfirmDialogContext";
import "./Navbar.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { confirm } = useConfirmDialog();
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const cartCount = useSelector((s) => s.cart.items.length);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: notifData } = useGetNotificationsQuery(undefined, {
    skip: !isAuthenticated,
  });
  const unreadCount = notifData?.data?.filter((n) => !n.isRead)?.length || 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    const accepted = await confirm({
      title: "Sign out?",
      message: "You will be signed out from this device. Your account cart will stay saved only for your profile.",
      confirmText: "Sign Out",
      cancelText: "Stay Here",
      tone: "danger",
    });

    if (!accepted) return;

    dispatch(logout());
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/hotels", label: "Hotels" },
    { to: "/offers", label: "Offers" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <Link to="/" className="navbar__logo">
        <div className="navbar__logo-icon">L</div>
        <span className="navbar__logo-text">
          Lux<span>Stay</span>
        </span>
      </Link>

      {/* Desktop Nav Links */}
      <ul className="navbar__links">
        {navLinks.map((l) => (
          <li key={l.to}>
            <NavLink to={l.to} className={({ isActive }) => (isActive ? "active" : "")}>
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="navbar__actions">
        {isAuthenticated ? (
          <>
            <button
              className="navbar__icon-btn"
              onClick={() => navigate("/cart")}
              title="Cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="navbar__badge">{cartCount > 9 ? "9+" : cartCount}</span>
              )}
            </button>

            {/* Notifications */}
            <button
              className="navbar__icon-btn"
              onClick={() => navigate("/notifications")}
              title="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="navbar__badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
              )}
            </button>

            {/* User Dropdown */}
            <div className="navbar__user-area" ref={dropdownRef}>
              <div
                className="navbar__avatar"
                onClick={() => setDropdownOpen((o) => !o)}
                title="Account"
              >
                {user?.name?.[0]?.toUpperCase() || <User size={16} />}
              </div>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="navbar__dropdown"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="navbar__dropdown-header">
                      <div className="navbar__dropdown-name">{user?.name || "My Account"}</div>
                      <div className="navbar__dropdown-email">{user?.email || user?.phone}</div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="navbar__dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <BookOpen size={15} /> My Bookings
                    </Link>
                    <Link
                      to="/notifications"
                      className="navbar__dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Bell size={15} /> Notifications
                      {unreadCount > 0 && (
                        <span
                          style={{
                            marginLeft: "auto",
                            background: "#F97316",
                            color: "white",
                            borderRadius: "20px",
                            padding: "1px 7px",
                            fontSize: "10px",
                            fontWeight: 700,
                          }}
                        >
                          {unreadCount}
                        </span>
                      )}
                    </Link>
                    <div className="navbar__dropdown-divider" />
                    <button className="navbar__dropdown-item danger" onClick={handleLogout}>
                      <LogOut size={15} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <>
            <Link to="/auth/login" className="navbar__btn navbar__btn--ghost">
              Sign In
            </Link>
            <Link to="/auth/register" className="navbar__btn navbar__btn--primary">
              Get Started
            </Link>
          </>
        )}

        {/* Mobile toggle */}
        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: "absolute",
              top: "68px",
              left: 0,
              right: 0,
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(30,58,138,0.1)",
              overflow: "hidden",
              zIndex: 999,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <div className="navbar__mobile-menu">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className="navbar__mobile-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </NavLink>
              ))}

              {isAuthenticated && (
                <button
                  type="button"
                  className="navbar__mobile-link navbar__mobile-link--button"
                  onClick={() => {
                    navigate("/cart");
                    setMobileOpen(false);
                  }}
                >
                  <ShoppingCart size={16} /> Cart {cartCount > 0 ? `(${cartCount})` : ""}
                </button>
              )}

              {!isAuthenticated && (
                <div className="navbar__mobile-auth">
                  <Link to="/auth/login" className="navbar__btn navbar__btn--ghost" onClick={() => setMobileOpen(false)}>
                    Sign In
                  </Link>
                  <Link to="/auth/register" className="navbar__btn navbar__btn--primary" onClick={() => setMobileOpen(false)}>
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
