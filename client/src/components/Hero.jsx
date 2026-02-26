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
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetHotelAllQuery } from "../services/hotel";

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

  const { data: hotelsData } = useGetHotelAllQuery();
  const hotels = hotelsData?.data || [];

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calendarRef = useRef(null);
  const guestSelectorRef = useRef(null);
  const searchDropdownRef = useRef(null);

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
    // Only route to the main listing page on search based on searchType
    if (searchType === "hotels") {
      navigate("/hotels");
    } else {
      navigate("/rooms");
    }
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center bg-black z-40 pt-24 md:pt-0 pb-10">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover scale-[1.05]">
          <source src="/videos/homevideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        <div className="mb-12">
          <h1 className="text-xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4 leading-tight italic">
            LuxStay <span className="text-red-600 non-italic">Sanctuaries</span>
          </h1>
          <p className="text-white/60 text-xs md:text-sm font-black tracking-[0.4em] uppercase italic">
            Legendary comfort. Architectural clarity. Elite hospitality.
          </p>
        </div>

        {/* Compact Modern Search Bar with Integrated Tabs */}
        <div className="max-w-5xl mx-auto bg-white/95 dark:bg-[#0c0c0c] backdrop-blur-3xl rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] p-2 border border-white/20 dark:border-white/5">
          {/* Tabs Inside Search Bar */}
          <div className="flex gap-1.5 p-1 mb-1.5 bg-gray-50/50 dark:bg-white/5 rounded-full w-fit mx-auto md:ml-4">
            <button
              onClick={() => setSearchType("hotels")}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${searchType === 'hotels' ? 'bg-white dark:bg-black text-red-600 shadow-sm border border-gray-100 dark:border-white/5' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <HotelIcon size={12} strokeWidth={2.5} /> Search Hotels
            </button>
            <button
              onClick={() => setSearchType("rooms")}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${searchType === 'rooms' ? 'bg-white dark:bg-black text-red-600 shadow-sm border border-gray-100 dark:border-white/5' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <HomeIcon size={12} strokeWidth={2.5} /> Search Rooms
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center px-4 pb-3 gap-2 md:gap-0">
            {/* Destination */}
            <div className="flex-1 relative md:border-r border-gray-100 dark:border-white/5 py-3 px-6 text-left hover:bg-white dark:hover:bg-white/[0.03] transition-all first:rounded-l-[2rem] group/field" ref={searchDropdownRef}>
              <label className="block text-[7px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5 group-hover/field:text-red-600 transition-colors">Destination</label>
              <div className="flex items-center gap-2.5 bg-gray-50 dark:bg-white/[0.03] p-2.5 rounded-xl border border-gray-200 dark:border-white/10 shadow-inner group-hover/field:border-red-600/30 group-hover/field:shadow-md transition-all">
                <MapPin size={14} className="text-red-600 shrink-0" />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="bg-transparent text-[10px] font-black outline-none dark:text-white w-full placeholder:text-gray-400 tracking-tighter italic"
                />
              </div>

              {/* Auto-Suggest Dropdown */}
              {showDropdown && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-[#0c0c0c] rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden z-[10000] animate-fadeIn max-h-60 overflow-y-auto">
                  {filteredHotels.length > 0 ? (
                    filteredHotels.map((hotel) => (
                      <div
                        key={hotel._id}
                        onClick={() => {
                          setSearchQuery(hotel.name);
                          setShowDropdown(false);
                        }}
                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer border-b border-gray-50 dark:border-white/5 last:border-0 flex items-center gap-3 transition-colors"
                      >
                        <HotelIcon size={14} className="text-red-600" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-gray-900 dark:text-white tracking-widest leading-none">{hotel.name}</p>
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">{hotel.address?.city}, {hotel.address?.country}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 italic">No exact matches found</div>
                  )}
                </div>
              )}
            </div>

            {/* Check-In */}
            <div className="md:w-36 relative md:border-r border-gray-100 dark:border-white/5 py-3 px-6 text-left hover:bg-white dark:hover:bg-white/[0.03] transition-all group/field">
              <label className="block text-[7px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5 group-hover/field:text-red-600 transition-colors">Check-in</label>
              <button
                onClick={() => { setShowCalendar(!showCalendar || calendarType !== "checkIn"); setCalendarType("checkIn"); }}
                className="flex items-center gap-2.5 w-full bg-gray-50 dark:bg-white/[0.03] p-2.5 rounded-xl border border-gray-200 dark:border-white/10 shadow-inner group-hover/field:border-red-600/30 group-hover/field:shadow-md transition-all text-[10px] font-black dark:text-white hover:text-red-600 uppercase italic"
              >
                <CalendarIcon size={14} className="text-red-600 shrink-0" />
                <span className="truncate">{checkIn ? new Date(checkIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : "Pick Date"}</span>
              </button>

              {showCalendar && calendarType === "checkIn" && (
                <div ref={calendarRef} className="absolute top-full left-0 mt-6 w-72 bg-white dark:bg-[#0c0c0c] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/5 p-4 z-[10000] animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}><ChevronLeft size={16} /></button>
                    <span className="text-[10px] font-black uppercase tracking-wider">{currentMonth.toLocaleString("default", { month: "short", year: "numeric" })}</span>
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}><ChevronRight size={16} /></button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-[9px] font-black text-center mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map(d => <div key={d} className="text-gray-300">{d}</div>)}
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
                          className={`h-8 flex items-center justify-center text-[10px] font-bold rounded-lg transition-all ${isSelected ? "bg-red-600 text-white" : disabled ? "text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50" : "hover:bg-gray-100 dark:hover:bg-white/5"}`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Check-Out */}
            <div className="md:w-36 relative md:border-r border-gray-100 dark:border-white/5 py-3 px-6 text-left hover:bg-white dark:hover:bg-white/[0.03] transition-all group/field">
              <label className="block text-[7px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5 group-hover/field:text-red-600 transition-colors">Check-out</label>
              <button
                onClick={() => { setShowCalendar(!showCalendar || calendarType !== "checkOut"); setCalendarType("checkOut"); }}
                className="flex items-center gap-2.5 w-full bg-gray-50 dark:bg-white/[0.03] p-2.5 rounded-xl border border-gray-200 dark:border-white/10 shadow-inner group-hover/field:border-red-600/30 group-hover/field:shadow-md transition-all text-[10px] font-black dark:text-white hover:text-red-600 uppercase italic"
              >
                <CalendarIcon size={14} className="text-red-600 shrink-0" />
                <span className="truncate">{checkOut ? new Date(checkOut).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : "Pick Date"}</span>
              </button>

              {showCalendar && calendarType === "checkOut" && (
                <div ref={calendarRef} className="absolute top-full left-0 mt-6 w-72 bg-white dark:bg-[#0c0c0c] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/5 p-4 z-[10000] animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}><ChevronLeft size={16} /></button>
                    <span className="text-[10px] font-black uppercase tracking-wider">{currentMonth.toLocaleString("default", { month: "short", year: "numeric" })}</span>
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}><ChevronRight size={16} /></button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-[9px] font-black text-center mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map(d => <div key={d} className="text-gray-300">{d}</div>)}
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
                          className={`h-8 flex items-center justify-center text-[10px] font-bold rounded-lg transition-all ${isSelected ? "bg-red-600 text-white" : disabled ? "text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50" : "hover:bg-gray-100 dark:hover:bg-white/5"}`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Guests */}
            <div className="md:w-32 relative py-3 px-6 text-left hover:bg-white dark:hover:bg-white/[0.03] transition-all group/field" ref={guestSelectorRef}>
              <label className="block text-[7px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5 group-hover/field:text-red-600 transition-colors">Guests</label>
              <button
                onClick={() => setIsGuestSelectorOpen(!isGuestSelectorOpen)}
                className="flex items-center gap-2.5 w-full bg-gray-50 dark:bg-white/[0.03] p-2.5 rounded-xl border border-gray-200 dark:border-white/10 shadow-inner group-hover/field:border-red-600/30 group-hover/field:shadow-md transition-all text-[10px] font-black dark:text-white hover:text-red-600 uppercase italic"
              >
                <Users size={14} className="text-red-600 shrink-0" />
                <span className="truncate">{guests.adults + guests.children} Elite</span>
              </button>

              {isGuestSelectorOpen && (
                <div className="absolute top-full right-0 mt-4 w-56 bg-white dark:bg-[#0c0c0c] rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5 p-5 z-[10000] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Adults</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setGuests(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))} className="w-8 h-8 rounded-lg border border-gray-100 dark:border-white/10 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Minus size={12} /></button>
                      <span className="text-xs font-black">{guests.adults}</span>
                      <button onClick={() => setGuests(p => ({ ...p, adults: p.adults + 1 }))} className="w-8 h-8 rounded-lg border border-gray-100 dark:border-white/10 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Plus size={12} /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Children</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setGuests(p => ({ ...p, children: Math.max(0, p.children - 1) }))} className="w-8 h-8 rounded-lg border border-gray-100 dark:border-white/10 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Minus size={12} /></button>
                      <span className="text-xs font-black">{guests.children}</span>
                      <button onClick={() => setGuests(p => ({ ...p, children: p.children + 1 }))} className="w-8 h-8 rounded-lg border border-gray-100 dark:border-white/10 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Plus size={12} /></button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="md:w-16 p-1 mt-2 md:mt-0">
              <button
                onClick={handleSearch}
                className="w-full md:w-14 md:aspect-square py-4 md:py-0 bg-red-600 hover:bg-black dark:hover:bg-white text-white dark:hover:text-black rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-95"
              >
                <div className="flex items-center gap-2">
                  <Search size={18} strokeWidth={3} className="shrink-0" />
                  <span className="md:hidden text-[11px] font-black uppercase tracking-widest">Search</span>
                </div>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;