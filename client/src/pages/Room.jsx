import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useGetHotelAllQuery } from "../services/hotel";

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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const { data, isFetching, isLoading, isError } = useGetHotelAllQuery();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    if (data?.data) setHotels(data.data);
  }, [data]);

  if (isLoading || isFetching)
    return <p className="text-center py-16 text-gray-500">Loading rooms...</p>;

  if (isError)
    return <p className="text-center py-16 text-red-500">Error loading rooms</p>;

  return (
    <section className="bg-gray-50 py-14">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Our Rooms
      </h2>

      <div className="max-w-7xl mx-auto px-4 relative">
        <Slider {...settings}>
          {hotels.map((room) => (
            <div key={room._id} className="px-3">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <img
                  src={room.image}
                  alt={room.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <Link to={`/hotel/${room._id}`}>
                    <h3 className="text-lg font-semibold text-red-600 hover:underline">
                      {room.name}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {room.description || "Luxury stay experience"}
                  </p>

                  <div className="flex gap-2 mt-3 flex-wrap">
                    {room.amenities?.slice(0, 3).map((a, i) => (
                      <span
                        key={i}
                        className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full"
                      >
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <p className="text-xl font-bold text-gray-800">
                      ₹{room.price}
                      <span className="text-sm text-gray-500"> / night</span>
                    </p>

                   <Link to={`/hotel/${room._id}`}>
  <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700">
    Book Now
  </button>
</Link>

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
    