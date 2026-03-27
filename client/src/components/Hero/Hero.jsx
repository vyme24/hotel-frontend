import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  Calendar as CalendarIcon,
  Users,
  ChevronLeft,
  ChevronRight,
  Hotel as HotelIcon,
  Home as HomeIcon,
  Minus,
  Plus,
  Star,
  Shield,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetHotelAllQuery } from "../../services/hotel";

const Hero = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("hotels");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [isGuestSelectorOpen, setIsGuestSelectorOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarType, setCalendarType] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { data: hotelsData } = useGetHotelAllQuery();
  const hotels = hotelsData?.data || [];

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calendarRef = useRef(null);
  const guestSelectorRef = useRef(null);
  const searchDropdownRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) setShowCalendar(false);
      if (guestSelectorRef.current && !guestSelectorRef.current.contains(e.target)) setIsGuestSelectorOpen(false);
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const isDateDisabled = (year, month, day) => {
    const dateToCheck = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateToCheck < today) return true;
    if (calendarType === "checkOut" && checkIn) {
      const checkInDate = new Date(checkIn);
      return dateToCheck <= checkInDate;
    }
    return false;
  };

  const handleDateSelect = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    if (calendarType === "checkIn") {
      setCheckIn(formattedDate);
      setCalendarType("checkOut");
    } else {
      setCheckOut(formattedDate);
      setShowCalendar(false);
    }
  };

  const handleSearch = () => {
    if (searchType === "hotels") {
      navigate("/hotels");
    } else {
      navigate("/rooms");
    }
  };

  const stats = [
    { icon: HotelIcon, value: "500+", label: "Luxury Hotels" },
    { icon: Star, value: "4.9★", label: "Average Rating" },
    { icon: Shield, value: "100%", label: "Secure Booking" },
    { icon: Clock, value: "24/7", label: "Concierge Support" },
  ];

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center z-40 overflow-visible">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/hero-luxury.jpg"
          alt="Luxury Hotel"
          className="w-full h-full object-cover scale-[1.02] transition-transform duration-[10000ms] ease-out"
          style={{ transform: isLoaded ? 'scale(1)' : 'scale(1.05)' }}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070";
          }}
        />
        {/* Layered gradients for premium look */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-pulse"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-sm mb-8">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-[0.35em]">India's #1 Luxury Booking Platform</span>
        </div>

        {/* Main Headline */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Discover Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
              Perfect Escape
            </span>
          </h1>
          <p className="text-white/70 text-sm md:text-lg font-light tracking-wide max-w-xl mx-auto leading-relaxed">
            Handpicked luxury hotels & curated suites across India's most breathtaking destinations
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/95 dark:bg-[#0c0c0c]/95 backdrop-blur-2xl rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/20 dark:border-white/5 overflow-visible">

            {/* Search Type Tabs */}
            <div className="flex gap-1 p-2 border-b border-gray-100 dark:border-white/5">
              <button
                onClick={() => setSearchType("hotels")}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${searchType === 'hotels'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                  : 'text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
              >
                <HotelIcon size={14} strokeWidth={2} /> Hotels
              </button>
              <button
                onClick={() => setSearchType("rooms")}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${searchType === 'rooms'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                  : 'text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
              >
                <HomeIcon size={14} strokeWidth={2} /> Rooms
              </button>
            </div>

            {/* Search Fields */}
            <div className="flex flex-col md:flex-row items-stretch px-2 pb-2 gap-1 pt-2">

              {/* Destination */}
              <div className="flex-1 relative group" ref={searchDropdownRef}>
                <div className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all cursor-text">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] group-hover:text-amber-500 transition-colors">Where to?</label>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-amber-500 shrink-0" />
                    <input
                      type="text"
                      placeholder="City, hotel, or destination"
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
                      onFocus={() => setShowDropdown(true)}
                      className="bg-transparent text-sm font-medium outline-none dark:text-white w-full placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {showDropdown && searchQuery.length > 0 && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-[#0c0c0c] rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden z-[10000] animate-fadeIn max-h-60 overflow-y-auto">
                    {filteredHotels.length > 0 ? (
                      filteredHotels.map((hotel) => (
                        <div
                          key={hotel._id}
                          onClick={() => { setSearchQuery(hotel.name); setShowDropdown(false); }}
                          className="px-4 py-3 hover:bg-amber-50 dark:hover:bg-white/5 cursor-pointer border-b border-gray-50 dark:border-white/5 last:border-0 flex items-center gap-3 transition-colors"
                        >
                          <HotelIcon size={14} className="text-amber-500" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{hotel.name}</p>
                            <p className="text-[10px] text-gray-400">{hotel.address?.city}, {hotel.address?.country}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-400 italic">No matches found</div>
                    )}
                  </div>
                )}
              </div>

              <div className="hidden md:block w-px bg-gray-100 dark:bg-white/5 self-stretch my-2" />

              {/* Check-In */}
              <div className="md:w-40 relative" ref={null}>
                <div className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">Check-in</label>
                  <button
                    onClick={() => { setShowCalendar(!showCalendar || calendarType !== "checkIn"); setCalendarType("checkIn"); }}
                    className="flex items-center gap-2 text-sm font-medium dark:text-white hover:text-amber-500 transition-colors text-left"
                  >
                    <CalendarIcon size={14} className="text-amber-500 shrink-0" />
                    <span className="truncate">{checkIn ? new Date(checkIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : "Add date"}</span>
                  </button>
                </div>

                {showCalendar && calendarType === "checkIn" && (
                  <div ref={calendarRef} className="absolute top-full left-1/2 mt-2 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 bg-white dark:bg-[#0c0c0c] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/5 p-4 z-[2100] animate-fadeIn">
                    <div className="flex items-center justify-between mb-4">
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="p-1 hover:text-amber-500 transition-colors"><ChevronLeft size={16} /></button>
                      <span className="text-sm font-bold uppercase tracking-wider">{currentMonth.toLocaleString("default", { month: "short", year: "numeric" })}</span>
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="p-1 hover:text-amber-500 transition-colors"><ChevronRight size={16} /></button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-[9px] font-bold text-center mb-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={`${d}-${i}`} className="text-gray-300 py-1">{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array(getFirstDayOfMonth(currentMonth)).fill(null).map((_, i) => <div key={i} />)}
                      {Array(getDaysInMonth(currentMonth)).fill(null).map((_, i) => {
                        const day = i + 1;
                        const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0];
                        const isSelected = checkIn === dateStr || checkOut === dateStr;
                        const disabled = isDateDisabled(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                        return (
                          <button
                            key={day}
                            onClick={() => !disabled && handleDateSelect(day)}
                            disabled={disabled}
                            className={`h-8 flex items-center justify-center text-xs font-medium rounded-lg transition-all ${isSelected ? "bg-amber-500 text-white" : disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-500"}`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden md:block w-px bg-gray-100 dark:bg-white/5 self-stretch my-2" />

              {/* Check-Out */}
              <div className="md:w-40 relative">
                <div className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">Check-out</label>
                  <button
                    onClick={() => { setShowCalendar(!showCalendar || calendarType !== "checkOut"); setCalendarType("checkOut"); }}
                    className="flex items-center gap-2 text-sm font-medium dark:text-white hover:text-amber-500 transition-colors text-left"
                  >
                    <CalendarIcon size={14} className="text-amber-500 shrink-0" />
                    <span className="truncate">{checkOut ? new Date(checkOut).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : "Add date"}</span>
                  </button>
                </div>

                {showCalendar && calendarType === "checkOut" && (
                  <div ref={calendarRef} className="absolute top-full left-1/2 mt-2 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 bg-white dark:bg-[#0c0c0c] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/5 p-4 z-[2100] animate-fadeIn">
                    <div className="flex items-center justify-between mb-4">
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="p-1 hover:text-amber-500 transition-colors"><ChevronLeft size={16} /></button>
                      <span className="text-sm font-bold uppercase tracking-wider">{currentMonth.toLocaleString("default", { month: "short", year: "numeric" })}</span>
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="p-1 hover:text-amber-500 transition-colors"><ChevronRight size={16} /></button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-[9px] font-bold text-center mb-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={`${d}-${i}`} className="text-gray-300 py-1">{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array(getFirstDayOfMonth(currentMonth)).fill(null).map((_, i) => <div key={i} />)}
                      {Array(getDaysInMonth(currentMonth)).fill(null).map((_, i) => {
                        const day = i + 1;
                        const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0];
                        const isSelected = checkIn === dateStr || checkOut === dateStr;
                        const disabled = isDateDisabled(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                        return (
                          <button
                            key={day}
                            onClick={() => !disabled && handleDateSelect(day)}
                            disabled={disabled}
                            className={`h-8 flex items-center justify-center text-xs font-medium rounded-lg transition-all ${isSelected ? "bg-amber-500 text-white" : disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-500"}`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden md:block w-px bg-gray-100 dark:bg-white/5 self-stretch my-2" />

              {/* Guests */}
              <div className="md:w-36 relative" ref={guestSelectorRef}>
                <div className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">Guests</label>
                  <button
                    onClick={() => setIsGuestSelectorOpen(!isGuestSelectorOpen)}
                    className="flex items-center gap-2 text-sm font-medium dark:text-white hover:text-amber-500 transition-colors text-left"
                  >
                    <Users size={14} className="text-amber-500 shrink-0" />
                    <span>{guests.adults + guests.children} Guest{guests.adults + guests.children !== 1 ? 's' : ''}</span>
                  </button>
                </div>

                {isGuestSelectorOpen && (
                  <div className="absolute top-full right-0 mt-2 w-60 bg-white dark:bg-[#0c0c0c] rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5 p-5 z-[2100] space-y-4 animate-fadeIn">
                    {[
                      { label: "Adults", key: "adults", min: 1 },
                      { label: "Children", key: "children", min: 0 }
                    ].map(({ label, key, min }) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold dark:text-white">{label}</p>
                          <p className="text-[10px] text-gray-400">{key === 'adults' ? 'Age 13+' : 'Age 2-12'}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setGuests(p => ({ ...p, [key]: Math.max(min, p[key] - 1) }))}
                            className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center dark:text-white">{guests[key]}</span>
                          <button
                            onClick={() => setGuests(p => ({ ...p, [key]: p[key] + 1 }))}
                            className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <div className="p-1">
                <button
                  onClick={handleSearch}
                  className="h-full w-full md:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-amber-500/30 active:scale-95 transition-all duration-300 min-w-[120px]"
                >
                  <Search size={16} strokeWidth={2.5} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className={`mt-10 flex flex-wrap items-center justify-center gap-6 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <stat.icon size={14} className="text-amber-400" />
              <span className="text-white font-bold text-sm">{stat.value}</span>
              <span className="text-white/60 text-xs">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Scroll</span>
        <div className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
