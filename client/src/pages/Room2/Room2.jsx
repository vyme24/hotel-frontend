import React, { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { useGetHotelAllQuery } from "../../services/hotel";
import { useAuthCheck } from "../../hooks/useAuthCheck";

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 right-3 -translate-y-1/2 z-20
               w-10 h-10 bg-white rounded-full shadow-md
               flex items-center justify-center text-xl
               text-red-600 cursor-pointer hover:bg-red-50"
  >
    ❯
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 left-3 -translate-y-1/2 z-20
               w-10 h-10 bg-white rounded-full shadow-md
               flex items-center justify-center text-xl
               text-red-600 cursor-pointer hover:bg-red-50"
  >
    ❮
  </div>
);

const Room2 = () => {
  const { handleAuthorizedAction } = useAuthCheck();
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
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

  const { data, isLoading, isFetching, isError } = useGetHotelAllQuery();

  const hotels = useMemo(() => data?.data ?? [], [data])

  if (isLoading || isFetching)
    return (
      <div className="flex justify-center items-center py-20 min-h-[400px]">
        <div className="w-10 h-10 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-bold">Failed to load property collection</p>
      </div>
    );

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-24 overflow-hidden border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
        <div className="space-y-4">
          <span className="text-red-600 text-xs font-black uppercase tracking-[0.3em] block">
            Exceptional Value
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Budget <span className="text-red-600">Friendly</span> Stays
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg font-light leading-relaxed">
            Premium comfort doesn't always have to come with a premium price tag. Discover our best value properties.
          </p>
        </div>
        <Link to="/hotels" className="group mx-auto md:mx-0">
          <button className="text-red-600 font-black uppercase text-xs tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
            See All Properties <span className="text-lg">❯</span>
          </button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pb-10">
        <Slider {...settings} className="room-slider">
          {hotels.slice(0, 8).map((hotel) => (
            <div key={hotel._id} className="px-4 py-5">
              <div className="group bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] transition-all duration-700 h-full flex flex-col border border-gray-50 dark:border-gray-700/50 hover:-translate-y-3">
                {/* Image Area */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={hotel.image || hotel.images?.[0] || "/images/no-hotel.png"}
                    alt={hotel.name}
                    className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    onError={(e) => { e.target.src = "/images/no-hotel.png"; }}
                  />
                  <div className="absolute top-5 right-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-black text-gray-900 dark:text-white">4.5</span>
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow">
                  <Link to={`/hotel/${hotel._id}`}>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-1 leading-tight mb-3">
                      {hotel.name}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed font-light mb-6">
                    {hotel.description || "Experience the perfect balance of luxury and affordability at our premium locations."}
                  </p>

                  <div className="flex gap-2.5 mt-auto mb-8 flex-wrap">
                    {(hotel.amenities || ["Wifi", "Parking", "AC"]).slice(0, 3).map((a, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700"
                      >
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gray-50 dark:border-gray-700/50">
                    <button
                      onClick={() => navigate(`/hotel/${hotel._id}`)}
                      className="w-full bg-black hover:bg-red-600 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 shadow-2xl active:scale-95 flex items-center justify-center gap-3 group/btn"
                    >
                      Explore Property
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

export default Room2;
