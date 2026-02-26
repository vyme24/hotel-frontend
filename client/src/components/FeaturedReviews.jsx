import React, { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetReviewAllQuery } from "../services/review";
import { Star, Quote, Award } from "lucide-react";

const FeaturedReviews = () => {
    const { data: reviewsData, isLoading } = useGetReviewAllQuery();
    const reviews = useMemo(() => reviewsData?.data?.slice(0, 6) ?? [], [reviewsData]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        cssEase: "cubic-bezier(0.22, 1, 0.36, 1)",
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3 } },
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ]
    };

    if (isLoading || reviews.length === 0) return null;

    return (
        <section className="py-40 bg-white dark:bg-[#050505] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
                    <div className="space-y-8 max-w-xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 italic">
                            <Star size={14} className="text-red-600 animate-pulse" />
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Distinguished Sentiments</span>
                        </div>
                        <h2 className="text-4xl md:text-3xl font-black text-gray-900 dark:text-white leading-[0.85] tracking-tighter uppercase font-heading">
                            GLOBAL <br />
                            <span className="italic outline-text">ECHOES</span>
                        </h2>
                    </div>
                </div>

                <div className="reviews-slider container mx-auto">
                    <Slider {...settings}>
                        {reviews.map((review, index) => (
                            <div key={review._id} className="px-4 pb-20">
                                <div className="p-12 bg-gray-50 dark:bg-[#121212] rounded-[3.5rem] border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-1000 flex flex-col h-[400px] relative group hover:-translate-y-2">
                                    <div className="absolute top-10 right-10 text-red-600 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                                        <Quote size={24} />
                                    </div>

                                    <div className="flex gap-1 text-red-600 mb-8">
                                        {[...Array(5)].map((_, j) => (
                                            <Star key={j} size={12} fill={j < (review.rating || 5) ? "currentColor" : "none"} strokeWidth={1} />
                                        ))}
                                    </div>

                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-gray-600 dark:text-white/60 text-lg font-light leading-relaxed italic line-clamp-5">
                                            "{review.comment || "A testament to excellence that redefines the intersection of architectural discipline and hospitality grace."}"
                                        </p>
                                    </div>

                                    <div className="pt-10 border-t border-black/5 dark:border-white/5 flex items-center gap-6 mt-auto">
                                        <div className="w-16 h-16 bg-white dark:bg-black rounded-2xl flex items-center justify-center text-xl font-black uppercase text-red-600 shadow-xl">
                                            {review.userId?.name?.charAt(0) || "G"}
                                        </div>
                                        <div>
                                            <h4 className="text-base font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none mb-1">{review.userId?.name || "Premium Traveler"}</h4>
                                            <div className="flex items-center gap-2">
                                                <Award size={10} className="text-red-600" />
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">{review.hotelId?.name || "Global Member"}</span>
                                            </div>
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
                .outline-text {
                    -webkit-text-stroke: 1px currentColor;
                    color: transparent;
                }
                .dark .outline-text {
                    -webkit-text-stroke: 1px white;
                }
                .reviews-slider .slick-dots {
                    bottom: -60px;
                }
                .reviews-slider .slick-dots li button:before {
                    color: #dc2626;
                    opacity: 0.2;
                    font-size: 8px;
                }
                .reviews-slider .slick-dots li.slick-active button:before {
                    color: #dc2626;
                    opacity: 1;
                    font-size: 10px;
                }
            `}} />
        </section>
    );
};

export default FeaturedReviews;
