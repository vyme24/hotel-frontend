import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarType, setCalendarType] = useState("");
  const [showLocationHints, setShowLocationHints] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const calendarRef = useRef(null);
  const locationRef = useRef(null);

  const locationHints = [
    "Mumbai, Maharashtra",
    "Delhi, India",
    "Goa, India",
    "Jaipur, Rajasthan",
    "Bangalore, Karnataka",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setShowLocationHints(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openCalendar = (type) => {
    setCalendarType(type);
    setShowCalendar(true);
    setShowLocationHints(false);
  };

  const selectDate = (date) => {
    calendarType === "checkIn" ? setCheckIn(date) : setCheckOut(date);
    setShowCalendar(false);
  };

  const changeMonth = (dir) => {
    if (dir === "prev") {
      currentMonth === 0
        ? (setCurrentMonth(11), setCurrentYear((y) => y - 1))
        : setCurrentMonth((m) => m - 1);
    } else {
      currentMonth === 11
        ? (setCurrentMonth(0), setCurrentYear((y) => y + 1))
        : setCurrentMonth((m) => m + 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    return (
     <div
  ref={calendarRef}
  className="
    w-[340px]
    rounded-xl
    bg-white
    shadow-2xl
    border-2 border-red-700
    overflow-hidden
  "
>
  {/* Brand Header */}
  <div className="flex items-center justify-between px-4 py-3 bg-red-700 text-white">
    <button
      onClick={() => changeMonth('prev')}
      className="p-1.5 rounded-full hover:bg-white/20 transition"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>

    <div className="text-center leading-tight">
      <p className="text-sm font-semibold">
        {new Date(currentYear, currentMonth).toLocaleString("default", {
          month: "long",
        })}
      </p>
      <p className="text-xs text-red-100">{currentYear}</p>
    </div>

    <button
      onClick={() => changeMonth('next')}
      className="p-1.5 rounded-full hover:bg-white/20 transition"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>

  {/* Weekdays */}
  <div className="grid grid-cols-7 px-4 py-2 text-center bg-red-50 border-b border-red-200">
    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
      <div
        key={day}
        className="text-[11px] font-semibold text-red-700 tracking-wide"
      >
        {day}
      </div>
    ))}
  </div>

  {/* Dates */}
  <div className="grid grid-cols-7 gap-y-1 px-4 py-3 text-center">
    {Array(firstDay).fill(null).map((_, i) => (
      <div key={`empty-${i}`} />
    ))}

    {Array(daysInMonth).fill(null).map((_, i) => {
      const dateValue = `${currentYear}-${String(
        currentMonth + 1
      ).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;

      return (
        <button
          key={dateValue}
          onClick={() => selectDate(dateValue)}
          className="
            mx-auto h-9 w-9 rounded-lg
            text-sm font-semibold
            text-gray-800
            hover:bg-red-700 hover:text-white
            transition
          "
        >
          {i + 1}
        </button>
      );
    })}
  </div>

  {/* Footer */}
  <div className="px-4 py-2 bg-red-50 border-t border-red-200 text-center">
    <p className="text-xs font-medium text-red-700">
      Select your {calendarType === "checkIn" ? "check-in" : "check-out"} date
    </p>
  </div>
</div>

    );
  };

  const handleSearch = () => {
    console.log({ location, checkIn, checkOut, guests });
  };

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center">
      {/* 🎥 Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/homevideo.mp4" type="video/mp4" />
        </video>

{/* Subtle brand-tinted overlay */}
<div className="absolute inset-0 bg-gradient-to-b from-red-900/40 via-black/40 to-black/60"></div>

      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-4">
        {/* Heading */}
        <div className="text-center text-white mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Luxury Stays. Smart Prices.
          </h1>
          <p className="text-lg text-red-100">
            Book premium hotels, resorts & villas across India
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            {/* Location */}
            <div ref={locationRef} className="relative md:col-span-2">
              <div className="flex items-center gap-2">
                <MapPin className="text-red-600" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setShowLocationHints(true)}
                  placeholder="City or hotel"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>

              {showLocationHints && (
                <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-20 p-3">
                  <p className="text-sm font-semibold mb-2">Popular locations</p>
                  {locationHints.map((hint) => (
                    <div
                      key={hint}
                      onClick={() => {
                        setLocation(hint);
                        setShowLocationHints(false);
                      }}
                      className="py-1 text-sm hover:text-red-600 cursor-pointer"
                    >
                      {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Check-in */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <Calendar className="text-red-600" />
                <input
                  readOnly
                  value={checkIn}
                  onClick={() => openCalendar("checkIn")}
                  placeholder="Check-in"
                  className="w-full p-3 border rounded-lg cursor-pointer"
                />
              </div>
              {showCalendar && calendarType === "checkIn" && (
                <div className="absolute top-full mt-2 z-20">
                  {renderCalendar()}
                </div>
              )}
            </div>

            {/* Check-out */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <Calendar className="text-red-600" />
                <input
                  readOnly
                  value={checkOut}
                  onClick={() => openCalendar("checkOut")}
                  placeholder="Check-out"
                  className="w-full p-3 border rounded-lg cursor-pointer"
                />
              </div>
              {showCalendar && calendarType === "checkOut" && (
                <div className="absolute top-full mt-2 z-20">
                  {renderCalendar()}
                </div>
              )}
            </div>

            {/* Guests */}
            <div className="flex items-center gap-2">
              <Users className="text-red-600" />
              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            {/* Search */}
            <button
              onClick={handleSearch}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg py-3 flex items-center justify-center gap-2"
            >
              <Search /> Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
