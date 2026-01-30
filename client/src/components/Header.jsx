import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { AuthAPI } from "../services/auth";

const { useGetUserQuery } = AuthAPI;

const Header = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef(null);
  const [imgError, setImgError] = useState(false);
 
  const { data: userData, error, isLoading, isSuccess } = useGetUserQuery(token, {
    skip: !token,
  });


  useEffect(() => {
    if (userData?.data) {
      setUser(userData.data);
    } else if (token && error) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } else if (!token) {
      setUser(null);
    }
  }, [userData, token, error]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    window.location.href = "/";
  };

  const userDisplayData = user ? {
    name: user.fullName || user.email?.split('@')[0] || "User",
    email: user.email || "No email",
  } : null;

  const dropdownData = {
    Stays: [
      { label: "Luxury Suites", path: "/stays/luxury-suites" },
      { label: "Standard Rooms", path: "/stays/standard-rooms" },
      { label: "Deluxe Rooms", path: "/stays/deluxe-rooms" },
      { label: "Executive Suites", path: "/stays/executive-suites" },
      { label: "Family Rooms", path: "/stays/family-rooms" },
      { label: "Penthouse", path: "/stays/penthouse" },
      { label: "Villa", path: "/stays/villa" },
      { label: "Bungalow", path: "/stays/bungalow" },
      { label: "Ocean View Rooms", path: "/stays/ocean-view" },
      { label: "Mountain View Suites", path: "/stays/mountain-view" },
      { label: "Presidential Suite", path: "/stays/presidential-suite" },
      { label: "Garden Villas", path: "/stays/garden-villas" },
      { label: "City Center Apartments", path: "/stays/city-apartments" },
      { label: "Rooftop Cabins", path: "/stays/rooftop-cabins" },
      { label: "Heritage Rooms", path: "/stays/heritage-rooms" },
      { label: "Spa Retreat Rooms", path: "/stays/spa-retreat" },
      { label: "Business Class Suites", path: "/stays/business-suites" },
      { label: "Honeymoon Villas", path: "/stays/honeymoon-villas" },
      { label: "Accessible Rooms", path: "/stays/accessible-rooms" },
      { label: "Pet-Friendly Suites", path: "/stays/pet-friendly" },
    ],

    Experiences: [
      { label: "Spa Retreats", path: "/experiences/spa-retreats" },
      { label: "Adventure Tours", path: "/experiences/adventure" },
      { label: "Cultural Events", path: "/experiences/culture" },
      { label: "Fine Dining", path: "/experiences/fine-dining" },
      { label: "Wellness Programs", path: "/experiences/wellness" },
      { label: "Excursions", path: "/experiences/excursions" },
      { label: "Workshops", path: "/experiences/workshops" },
      { label: "Nightlife", path: "/experiences/nightlife" },
      { label: "Wine Tastings", path: "/experiences/wine" },
      { label: "Cooking Classes", path: "/experiences/cooking" },
      { label: "Art Galleries", path: "/experiences/art" },
      { label: "Music Festivals", path: "/experiences/music" },
      { label: "Yoga Sessions", path: "/experiences/yoga" },
      { label: "Hiking Trails", path: "/experiences/hiking" },
      { label: "Boat Cruises", path: "/experiences/cruise" },
      { label: "Theater Shows", path: "/experiences/theater" },
      { label: "Golf Lessons", path: "/experiences/golf" },
      { label: "Scuba Diving", path: "/experiences/scuba" },
      { label: "Photography Tours", path: "/experiences/photography" },
      { label: "Meditation Retreats", path: "/experiences/meditation" },
    ],

    Destinations: [
      { label: "Beach Resorts", path: "/destinations/beach" },
      { label: "Mountain Lodges", path: "/destinations/mountain" },
      { label: "City Centers", path: "/destinations/city" },
      { label: "Island Getaways", path: "/destinations/island" },
      { label: "Desert Oases", path: "/destinations/desert" },
      { label: "Historic Sites", path: "/destinations/historic" },
      { label: "National Parks", path: "/destinations/parks" },
      { label: "Urban Escapes", path: "/destinations/urban" },
      { label: "Tropical Islands", path: "/destinations/tropical" },
      { label: "Ski Resorts", path: "/destinations/ski" },
      { label: "Metropolitan Cities", path: "/destinations/metro" },
      { label: "Countryside Retreats", path: "/destinations/countryside" },
      { label: "Safari Adventures", path: "/destinations/safari" },
      { label: "Lakefront Cabins", path: "/destinations/lakefront" },
      { label: "Coastal Towns", path: "/destinations/coastal" },
      { label: "Hill Stations", path: "/destinations/hill" },
      { label: "Vineyard Estates", path: "/destinations/vineyard" },
      { label: "Arctic Expeditions", path: "/destinations/arctic" },
      { label: "Jungle Lodges", path: "/destinations/jungle" },
      { label: "Coral Reef Resorts", path: "/destinations/coral-reef" },
    ],

    Support: [
      { label: "Contact Us", path: "/support/contact" },
      { label: "FAQs", path: "/support/faqs" },
      { label: "Booking Help", path: "/support/booking-help" },
      { label: "Cancellation Policy", path: "/support/cancellation" },
      { label: "Terms of Service", path: "/support/terms" },
      { label: "Privacy Policy", path: "/support/privacy" },
      { label: "Customer Reviews", path: "/support/reviews" },
      { label: "Feedback", path: "/support/feedback" },
      { label: "Live Chat Support", path: "/support/chat" },
      { label: "Phone Assistance", path: "/support/phone" },
      { label: "Email Help", path: "/support/email" },
      { label: "Travel Insurance", path: "/support/insurance" },
      { label: "Refund Process", path: "/support/refund" },
      { label: "Complaint Resolution", path: "/support/complaints" },
      { label: "Accessibility Info", path: "/support/accessibility" },
      { label: "Partnership Inquiries", path: "/support/partners" },
      { label: "Newsletter Signup", path: "/support/newsletter" },
      { label: "App Download", path: "/support/app" },
      { label: "Site Map", path: "/support/sitemap" },
      { label: "About Us", path: "/about" },
    ],
  };

  const handleMouseEnterDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
  };

  const handleMouseLeaveDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300);
  };

  const handleItemClick = (category, item) => {
    setSelectedItems(prev => {
      const existing = prev.find(sel => sel.category === category && sel.item === item);
      if (existing) {
        return prev.filter(sel => !(sel.category === category && sel.item === item));
      } else {
        return [...prev, { category, item }];
      }
    });
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
  
   <nav className="fixed top-0 left-0 w-full z-[100] bg-white backdrop-blur-md shadow-md border-b border-gray-200"

      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2" aria-label="LuxStay homepage">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center shadow-md">
            <Sparkles size={22} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-gray-900">
            LUX<span className="text-red-600">STAY</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {Object.keys(dropdownData).map((item) => (
            <div
              key={item}
              className="relative"
              onMouseEnter={() => {
                handleMouseEnterDropdown();
                setOpenDropdown(item);
              }}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                onClick={() => setOpenDropdown(openDropdown === item ? null : item)}
                className="text-sm font-semibold px-3 py-2 rounded-lg transition-colors text-gray-700 hover:text-red-600"
              >
                {item}
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {user ? (
            <div className="relative profile-dropdown">
            <button
  onClick={toggleProfileDropdown}
  className="
    flex items-center gap-3
    bg-white border-red-600 border-1 shadow-md rounded-full
    px-4 py-2
    w-36
    overflow-hidden
  "
>
  <div className="w-10 h-10 rounded-full overflow-hidden border shrink-0">
    {!imgError && user?.avatar ? (
      <img
        src={user.avatar}
        alt="user"
        onError={() => setImgError(true)}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-300 text-sm font-semibold text-gray-700">
        {userDisplayData.name
          ?.split(" ")
          .map(n => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)}
      </div>
    )}
  </div>

  <span className="text-sm font-semibold text-gray-800 truncate">
    {userDisplayData.name}
  </span>
</button>


              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden">
                  <div className="p-4 flex items-start justify-between border-b">
                    <div className="flex gap-3 items-center">
                      <div className="w-14 h-14 rounded-full overflow-hidden border">
                        {!imgError && user?.avatar ? (
                          <img src={user.avatar} alt="user" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-sm font-semibold text-gray-700">
                            {userDisplayData.name
                              ?.split(" ")
                              .map(n => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {userDisplayData.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {userDisplayData.email}
                        </p>
                        <Link to="/profile" className="text-xs text-blue-600 hover:underline">
                          View & Update Profile
                        </Link>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="py-2">
                    <Link to="/bookings" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      My Bookings
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Settings
                    </Link>
                    <Link to="/help" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      FAQs
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/signin"
                  className="px-4 py-2 rounded-xl font-semibold text-sm text-gray-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-red-500/30"
                >
                  Sign Up
                </Link>
              </div>

              <div className="md:hidden flex items-center gap-3">
                <Link
                  to="/signin"
                  className="px-4 py-2 rounded-xl font-semibold text-sm text-gray-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-red-500/30"
                >
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {openDropdown && (
        <div
          className="fixed top-20 left-0 w-screen bg-white shadow-lg border-t border-gray-200 z-[99] max-h-[40vh] overflow-y-auto transition-opacity duration-300"
          onMouseEnter={handleMouseEnterDropdown}
          onMouseLeave={handleMouseLeaveDropdown}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-rows-4 grid-cols-5 gap-4">
              {dropdownData[openDropdown].map((subItem, index) => {
                const isSelected = selectedItems.some(
                  sel => sel.category === openDropdown && sel.item === subItem.label
                );

                return (
                  <Link
                    key={index}
                    to={subItem.path}
                    onClick={() => setOpenDropdown(null)}
                    className={`block bg-gray-50 border rounded-lg p-3 hover:bg-red-50 transition-colors ${
                      isSelected ? "border-red-500 bg-red-50" : "border-gray-200"
                    }`}
                  >
                    <span className="text-gray-700 hover:text-red-600 font-medium text-sm block">
                      {subItem.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;