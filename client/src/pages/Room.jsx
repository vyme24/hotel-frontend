import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { useGetRoomAllQuery } from "../services/room";
import { useAuthCheck } from "../hooks/useAuthCheck";

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 right-3 -translate-y-1/2 z-20 w-10 h-10
               bg-white rounded-full shadow-md flex items-center justify-center
               text-xl text-red-600 cursor-pointer hover:bg-red-50"
  >
    ❯
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 left-3 -translate-y-1/2 z-20 w-10 h-10
               bg-white rounded-full shadow-md flex items-center justify-center
               text-xl text-red-600 cursor-pointer hover:bg-red-50"
  >
    ❮
  </div>
);

const Room = () => {
  const navigate = useNavigate();
  const { handleAuthorizedAction } = useAuthCheck();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
    appendDots: dots => (
      <div style={{ bottom: "-40px" }}>
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full transition-all duration-300 hover:bg-red-500 [.slick-active_&]:bg-red-600 [.slick-active_&]:w-6" />
    )
  };

  const { data, isFetching, isLoading, isError } = useGetRoomAllQuery();
  const rooms = useMemo(() => data?.data ?? [], [data])

  if (isLoading || isFetching)
    return (
      <div className="flex justify-center items-center py-20 min-h-[400px]">
        <div className="w-10 h-10 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-bold">Error loading featured rooms</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-sm text-gray-500 underline">Try again</button>
      </div>
    );

  return (
    <section className="bg-white dark:bg-gray-950 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-4">
          <span className="text-red-600 text-xs font-black uppercase tracking-[0.3em] block decoration-red-600/30 underline underline-offset-8">
            Exclusive Collection
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Our <span className="text-red-600">Premium</span> Rooms
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg font-light leading-relaxed">
            Handpicked selection of our most popular and luxurious accommodations designed for ultimate comfort.
          </p>
        </div>
        <Link to="/hotels" className="group">
          <button className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-8 py-4 rounded-2xl font-bold text-gray-900 dark:text-white hover:bg-black hover:text-white dark:hover:bg-red-600 transition-all duration-300 flex items-center gap-3">
            Explores All Stays
            <span className="group-hover:translate-x-1 transition-transform">❯</span>
          </button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pb-10">
        <Slider {...settings} className="room-slider">
          {rooms.map((room) => (
            <div key={room._id} className="px-4 py-5">
              <div className="group bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] transition-all duration-700 h-full flex flex-col border border-gray-50 dark:border-gray-700/50 hover:-translate-y-3">
                {/* Image Area */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={room.image || "/images/no-room.png"}
                    alt={room.name}
                    className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest border border-white/30">
                      {room.type || "King Room"}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <Link to={`/room/${room._id}`}>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-1 leading-tight">
                        {room.name}
                      </h3>
                    </Link>
                    {room.availableRooms <= 0 && (
                      <span className="bg-red-50 text-red-600 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border border-red-100">
                        Fully Reserved
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed font-light">
                    {room.description || "Indulge in the perfect blend of modern sophistication and timeless elegance."}
                  </p>

                  {/* Amenities */}
                  <div className="flex gap-2.5 mt-6 mb-8 flex-wrap">
                    {(room.amenities || ["Wifi", "Breakfast", "AC"]).slice(0, 3).map((a, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold uppercase tracking-wider bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-300 px-3.5 py-1.5 rounded-full border border-gray-100 dark:border-gray-600 group-hover:border-red-500/30 group-hover:text-red-500 transition-colors"
                      >
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-50 dark:border-gray-700/50">
                    <button
                      onClick={() => navigate(`/room/${room._id}`)}
                      className="w-full bg-black hover:bg-red-600 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 shadow-2xl active:scale-95 flex items-center justify-center gap-3 group/btn"
                    >
                      View
                      <span className="group-hover/btn:translate-x-1 transition-transform">❯</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Room;
