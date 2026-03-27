import React, { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetReviewAllQuery } from "../../services/review";
import { Star, Quote } from "lucide-react";

const FeaturedReviews = () => {
    const { data: reviewsData, isLoading } = useGetReviewAllQuery();
    const reviews = useMemo(() => reviewsData?.data?.slice(0, 8) ?? [], [reviewsData]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "cubic-bezier(0.22, 1, 0.36, 1)",
        arrows: false,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3 } },
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ]
    };

    if (isLoading || reviews.length === 0) return null;

    const avatarColors = [
        "bg-amber-500", "bg-purple-500", "bg-blue-500", "bg-rose-500",
        "bg-green-500", "bg-orange-500", "bg-teal-500", "bg-indigo-500"
    ];

    return (
        <section className="py-24 bg-gray-950 dark:bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-px w-8 bg-amber-500" />
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.35em]">Testimonials</span>
                        <div className="h-px w-8 bg-amber-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        What Our <span className="text-amber-500">Guests Say</span>
                    </h2>
                    <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                        Real experiences from real travelers who chose LuxStay for their perfect escape
                    </p>
                </div>

                {/* Reviews Slider */}
                <div className="reviews-slider-premium">
                    <Slider {...settings}>
                        {reviews.map((review, index) => (
                            <div key={review._id} className="px-3 pb-16">
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/8 hover:border-amber-500/30 transition-all duration-500 h-full flex flex-col">

                                    {/* Quote Icon */}
                                    <div className="mb-6">
                                        <Quote size={32} className="text-amber-500/50" />
                                    </div>

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, j) => (
                                            <Star
                                                key={j}
                                                size={14}
                                                className={j < (review.rating || 5) ? "text-amber-400 fill-amber-400" : "text-gray-600"}
                                            />
                                        ))}
                                    </div>

                                    {/* Review Text */}
                                    <p className="text-gray-300 text-sm leading-relaxed italic flex-grow mb-8 line-clamp-4">
                                        "{review.comment || "An absolutely incredible experience. The attention to detail and the level of service exceeded all our expectations. Will definitely be returning!"}"
                                    </p>

                                    {/* Reviewer */}
                                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                                        <div className={`w-12 h-12 ${avatarColors[index % avatarColors.length]} rounded-2xl flex items-center justify-center text-lg font-black text-white shadow-lg`}>
                                            {review.userId?.name?.charAt(0) || "G"}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{review.userId?.name || "Happy Traveler"}</h4>
                                            <p className="text-amber-400/70 text-[10px] font-medium">{review.hotelId?.name || "LuxStay Guest"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .reviews-slider-premium .slick-dots {
          bottom: -10px;
        }
        .reviews-slider-premium .slick-dots li button:before {
          color: #f59e0b;
          opacity: 0.3;
          font-size: 8px;
        }
        .reviews-slider-premium .slick-dots li.slick-active button:before {
          color: #f59e0b;
          opacity: 1;
          font-size: 10px;
        }
      `}} />
        </section>
    );
};

export default FeaturedReviews;
