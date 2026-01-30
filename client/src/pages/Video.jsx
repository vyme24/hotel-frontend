import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, Calendar, Users, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const Video = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLocationHints, setShowLocationHints] = useState(false);
  const [calendarType, setCalendarType] = useState("");
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
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationHints(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    console.log({ location, checkIn, checkOut, guests });
  };

  const openCalendar = (type) => {
    setCalendarType(type);
    setShowCalendar(true);
    setShowLocationHints(false);
  };

  const selectDate = (date) => {
    if (calendarType === "checkIn") setCheckIn(date);
    else setCheckOut(date);
    setShowCalendar(false);
  };

  const changeMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    return (
      <div ref={calendarRef} className="w-[300px] md:w-[400px] max-w-[90vw] bg-white rounded-lg shadow-lg p-4 border">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => changeMonth("prev")} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="font-semibold">
            {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
          </h3>
          <button onClick={() => changeMonth("next")} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
          {Array(firstDay).fill(null).map((_, i) => <div key={i} />)}
          {Array(daysInMonth).fill(null).map((_, i) => (
            <div
              key={i}
              onClick={() => selectDate(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`)}
              className="py-2 text-center rounded-lg hover:bg-red-50 cursor-pointer font-medium"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-[500px] h-[80vh] w-full flex items-center justify-center">
      <div className="absolute inset-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/videos/homevideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4">
        <div className="text-center mb-8 text-white">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
            Your Perfect Stay Awaits
          </h1>
          <p className="text-lg">
            Discover luxury hotels at unbeatable prices
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-3 flex-1 relative" ref={locationRef}>
              <MapPin className="text-red-600 w-5 h-5" />
              <div className="flex-1">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setShowLocationHints(true)}
                  placeholder="Enter city or hotel"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              {showLocationHints && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-lg shadow-lg p-4 border z-10">
                  <h4 className="font-semibold mb-2">Popular Locations</h4>
                  {locationHints.map((hint, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setLocation(hint);
                        setShowLocationHints(false);
                      }}
                      className="py-2 text-sm text-gray-700 hover:text-red-600 cursor-pointer"
                    >
                      {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 flex-1 relative">
              <Calendar className="text-red-600 w-5 h-5" />
              <div className="flex-1">
                <input
                  type="text"
                  value={checkIn}
                  onClick={() => openCalendar("checkIn")}
                  readOnly
                  placeholder="Check-in date"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer"
                />
              </div>
              {showCalendar && calendarType === "checkIn" && (
                <div className="absolute top-full mt-2 left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                  {renderCalendar()}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 flex-1 relative">
              <Calendar className="text-red-600 w-5 h-5" />
              <div className="flex-1">
                <input
                  type="text"
                  value={checkOut}
                  onClick={() => openCalendar("checkOut")}
                  readOnly
                  placeholder="Check-out date"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer"
                />
              </div>
              {showCalendar && calendarType === "checkOut" && (
                <div className="absolute top-full mt-2 left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                  {renderCalendar()}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 flex-1">
              <Users className="text-red-600 w-5 h-5" />
              <div className="flex-1">
                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors font-semibold flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;