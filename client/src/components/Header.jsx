import { useState } from "react";
import { ChevronDown, Link, Menu, X } from "lucide-react";

import { useModal } from "../hooks/ModalContext";
import LoginModal from "./Forms/Login";

const menus = {
  Stays: [
    { label: "Luxury Suites", path: "/stays/luxury-suites" },
    { label: "Deluxe Rooms", path: "/stays/deluxe-rooms" },
    { label: "Family Rooms", path: "/stays/family-rooms" },
    { label: "Villas", path: "/stays/villas" },
    { label: "Presidential Suite", path: "/stays/presidential" },
  ],
  Experiences: [
    { label: "Spa & Wellness", path: "/experiences/spa" },
    { label: "Fine Dining", path: "/experiences/dining" },
    { label: "Adventure Tours", path: "/experiences/adventure" },
    { label: "Yoga Retreats", path: "/experiences/yoga" },
  ],
  Destinations: [
    { label: "Beach Resorts", path: "/destinations/beach" },
    { label: "Mountain Lodges", path: "/destinations/mountain" },
    { label: "City Hotels", path: "/destinations/city" },
    { label: "Island Getaways", path: "/destinations/island" },
  ],
  Support: [
    { label: "Contact Us", path: "/support/contact" },
    { label: "FAQs", path: "/support/faqs" },
    { label: "Booking Help", path: "/support/booking-help" },
    { label: "Policies", path: "/support/policies" },
    { label: "About Us", path: "/about" },
  ],
};

export default function Header() {
  const [openMenu1, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const {openModal} = useModal();

  const isAuthenticated = false;


  const handleLoginModal = () => {
    openModal(<>
    <LoginModal/>
    </>)
  }

  return (
    <header className="sticky top-0 z-[60] bg-red-700 text-white shadow-lg">
      {/* Top Bar */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            LUXSTAY
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {Object.keys(menus).map((menu) => (
              <div
                key={menu}
                className="relative"
                onMouseEnter={() => setOpenMenu(menu)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button className="flex items-center gap-1 font-medium hover:text-red-200">
                  {menu}
                  <ChevronDown size={16} />
                </button>

                {/* Dropdown */}
                {openMenu1 === menu && (
                  <div className="absolute left-0 top-full mt-2 w-56 rounded-lg bg-white text-gray-800 shadow-xl z-[70]">
                    {menus[menu].map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-700 transition"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={ () => handleLoginModal()}
                  className="rounded-md border border-white px-4 py-1.5 text-sm hover:bg-white hover:text-red-700 transition"
                >
                  Login
                </button>
                <Link
                  to="/signup"
                  className="rounded-md bg-white px-4 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-100 transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link to="/profile">My Account</Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-red-800 text-white px-6 py-4 space-y-4">
          {Object.entries(menus).map(([menu, items]) => (
            <div key={menu}>
              <p className="font-semibold">{menu}</p>
              <div className="ml-4 mt-2 space-y-2">
                {items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-sm opacity-90"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {!isAuthenticated && (
            <div className="pt-4 flex gap-3">
              <button
                onClick={() => handleLoginModal()}
                className="flex-1 text-center rounded-md border border-white py-2 text-sm"
              >
                Login
              </button>
              <button
                 onClick={() => handleLoginModal()}
                className="flex-1 text-center rounded-md bg-white py-2 text-sm font-semibold text-red-700"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
