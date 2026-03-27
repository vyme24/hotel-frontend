import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Users, Calendar as CalendarIcon, ArrowRight, Tag, Star, RefreshCcw } from "lucide-react";
import { Calendar } from "react-date-range";
import { addDays, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useGetHotelsQuery, useGetOffersQuery, useGetReviewsQuery } from "../../redux/apiSlice";
import HotelCard from "../../components/HotelCard/HotelCard";
import { SkeletonGrid } from "../../components/Loader/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import { STORAGE_KEYS, readStorage } from "../../utils/storage";
import "./Home.css";

const POPULAR = ["Mumbai", "Goa", "Jaipur", "Shimla", "Kochi", "Bangalore", "Rishikesh"];

export default function Home() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);
  const [activeCalendar, setActiveCalendar] = useState(null);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 2));
  const calendarWrapRef = useRef(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const handler = (event) => {
      if (calendarWrapRef.current && !calendarWrapRef.current.contains(event.target)) {
        setActiveCalendar(null);
      }
    };

    document.addEventListener("mousedown", handler);
    setRecentlyViewed(readStorage(STORAGE_KEYS.recentlyViewed, []).slice(0, 4));

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const {
    data: hotelsRes,
    isLoading: hotelsLoading,
    isError: hotelsError,
    refetch: refetchHotels,
  } = useGetHotelsQuery({ limit: 8 });
  const { data: offers = [], isLoading: offersLoading } = useGetOffersQuery();
  const { data: reviews = [], isLoading: reviewsLoading } = useGetReviewsQuery("all");

  const hotels = hotelsRes?.hotels || [];
  const checkIn = format(checkInDate, "yyyy-MM-dd");
  const checkOut = format(checkOutDate, "yyyy-MM-dd");

  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    params.set("checkIn", checkIn);
    params.set("checkOut", checkOut);
    if (guests > 1) params.set("guests", guests);
    navigate(`/hotels?${params.toString()}`);
  };

  const nights = useMemo(
    () => Math.max(1, Math.round((checkOutDate - checkInDate) / 86400000)),
    [checkInDate, checkOutDate]
  );

  const featuredReviews = useMemo(() => {
    if (reviews.length > 0) return reviews.slice(0, 3);

    return [
      {
        _id: "1",
        rating: 5,
        comment: "Absolutely stunning experience. The room was spectacular and service was impeccable.",
        userId: { name: "Sarah M." },
        hotelId: { name: "The Grand Palace" },
      },
      {
        _id: "2",
        rating: 5,
        comment: "LuxStay made our honeymoon unforgettable. Every detail was handled beautifully.",
        userId: { name: "James K." },
        hotelId: { name: "Azure Ocean Resort" },
      },
      {
        _id: "3",
        rating: 4,
        comment: "Smooth booking, great communication, and exactly the stay we were hoping for.",
        userId: { name: "Priya R." },
        hotelId: { name: "Royal Heritage Haveli" },
      },
    ];
  }, [reviews]);

  const handleCheckInSelect = (date) => {
    setCheckInDate(date);
    if (date >= checkOutDate) {
      setCheckOutDate(addDays(date, 1));
    }
    setActiveCalendar(null);
  };

  const handleCheckOutSelect = (date) => {
    if (date <= checkInDate) {
      setCheckOutDate(addDays(checkInDate, 1));
    } else {
      setCheckOutDate(date);
    }
    setActiveCalendar(null);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <motion.div className="hero__eyebrow" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            India&apos;s premium hotel booking platform
          </motion.div>
          <motion.h1 className="hero__title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Find Your Perfect <span>Luxury Stay</span>
          </motion.h1>
          <motion.p className="hero__subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Discover world-class hotels, exclusive suites, and unforgettable experiences across India.
          </motion.p>

          <motion.form className="hero__search" onSubmit={handleSearch} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="hero__search-field hero__search-field--wide">
              <label><MapPin size={12} style={{ display: "inline", marginRight: 4 }} />Destination</label>
              <input
                className="hero__search-input"
                type="text"
                placeholder="City, hotel, or landmark"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                list="city-suggestions"
              />
              <datalist id="city-suggestions">
                {POPULAR.map((city) => <option key={city} value={city} />)}
              </datalist>
            </div>

            <div className="hero__search-dates" ref={calendarWrapRef}>
              <div className="hero__search-field">
                <label><CalendarIcon size={12} style={{ display: "inline", marginRight: 4 }} />Check In</label>
                <button type="button" className="hero__search-input hero__search-date-btn" onClick={() => setActiveCalendar((value) => value === "checkin" ? null : "checkin")}>
                  {format(checkInDate, "dd MMM yyyy")}
                </button>
                <AnimatePresence>
                  {activeCalendar === "checkin" && (
                    <motion.div className="hero__cal-popup hero__cal-popup--single" initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.18 }}>
                      <Calendar
                        date={checkInDate}
                        onChange={handleCheckInSelect}
                        minDate={new Date()}
                        color="#1E3A8A"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hero__search-field">
                <label><CalendarIcon size={12} style={{ display: "inline", marginRight: 4 }} />Check Out</label>
                <button type="button" className="hero__search-input hero__search-date-btn" onClick={() => setActiveCalendar((value) => value === "checkout" ? null : "checkout")}>
                  {format(checkOutDate, "dd MMM yyyy")}
                </button>
                <AnimatePresence>
                  {activeCalendar === "checkout" && (
                    <motion.div className="hero__cal-popup hero__cal-popup--single hero__cal-popup--right" initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.18 }}>
                      <Calendar
                        date={checkOutDate}
                        onChange={handleCheckOutSelect}
                        minDate={addDays(checkInDate, 1)}
                        color="#1E3A8A"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="hero__search-field" style={{ minWidth: 120, maxWidth: 150 }}>
              <label><Users size={12} style={{ display: "inline", marginRight: 4 }} />Guests</label>
              <select className="hero__search-input" value={guests} onChange={(event) => setGuests(Number(event.target.value))}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                  <option key={count} value={count}>{count} Guest{count > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>

            <Button className="hero__search-btn" type="submit">
              <Search size={18} /> Search
            </Button>
          </motion.form>

          <motion.div className="hero__search-summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {format(checkInDate, "dd MMM")} to {format(checkOutDate, "dd MMM yyyy")} · {nights} night{nights > 1 ? "s" : ""}
          </motion.div>

          <motion.div className="hero__popular" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <span className="hero__popular-label">Popular:</span>
            {POPULAR.map((city) => (
              <button key={city} className="hero__popular-chip" type="button" onClick={() => setLocation(city)}>
                <MapPin size={10} /> {city}
              </button>
            ))}
          </motion.div>

          <motion.div className="hero__stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            {[{ value: "500+", label: "Luxury Hotels" }, null, { value: "50K+", label: "Happy Guests" }, null, { value: "4.9", label: "Avg Rating" }, null, { value: "100+", label: "Destinations" }]
              .map((stat, index) => stat ? (
                <div key={index} className="hero__stat">
                  <div className="hero__stat-value">{stat.value}</div>
                  <div className="hero__stat-label">{stat.label}</div>
                </div>
              ) : <div key={index} className="hero__stat-divider" />)}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="section__container">
          <div className="section__head">
            <div>
              <span className="section__eyebrow">Hand-picked</span>
              <h2 className="section__title">Featured Hotels</h2>
            </div>
            <Link to="/hotels" className="section__link">View All <ArrowRight size={16} /></Link>
          </div>

          {hotelsError ? (
            <EmptyState
              icon="!"
              title="We could not load hotels right now"
              message="Please try again in a moment. If the issue continues, check that the backend is running."
              actionLabel="Retry"
              onAction={refetchHotels}
            />
          ) : hotelsLoading ? (
            <SkeletonGrid count={8} />
          ) : hotels.length === 0 ? (
            <EmptyState
              icon="⌂"
              title="No hotels found"
              message="New stays will appear here once hotel inventory is available."
              actionLabel="Browse all hotels"
              onAction={() => navigate("/hotels")}
            />
          ) : (
            <div className="hotel-grid">
              {hotels.map((hotel, index) => (
                <motion.div key={hotel._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
                  <HotelCard hotel={hotel} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {recentlyViewed.length > 0 && (
        <section className="section section--soft">
          <div className="section__container">
            <div className="section__head">
              <div>
                <span className="section__eyebrow">Continue Exploring</span>
                <h2 className="section__title">Recently Viewed</h2>
              </div>
            </div>
            <div className="hotel-grid">
              {recentlyViewed.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)}
            </div>
          </div>
        </section>
      )}

      <section className="section offers-strip">
        <div className="section__container">
          <div className="section__head">
            <div>
              <span className="section__eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>Exclusive</span>
              <h2 className="section__title" style={{ color: "white" }}>Special Offers</h2>
            </div>
            <Link to="/offers" className="section__link" style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.2)" }}>
              All Offers <ArrowRight size={16} />
            </Link>
          </div>

          {offersLoading ? (
            <SkeletonGrid count={3} />
          ) : offers.length === 0 ? (
            <EmptyState
              icon="%"
              title="No active offers right now"
              message="Check back later for seasonal promotions and exclusive member deals."
              actionLabel="Explore hotels"
              onAction={() => navigate("/hotels")}
            />
          ) : (
            <div className="offers-grid">
              {offers.slice(0, 3).map((offer, index) => (
                <motion.div
                  key={offer._id}
                  className="offer-card"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate("/offers")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="offer-card__icon">%</div>
                  <div>
                    <div className="offer-card__title">{offer.title}</div>
                    <div className="offer-card__desc">{offer.description?.slice(0, 80)}...</div>
                    <div className="offer-card__code"><Tag size={10} style={{ display: "inline" }} /> {offer.code}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ background: "white" }}>
        <div className="section__container">
          <div className="section__head">
            <div>
              <span className="section__eyebrow">Guest love</span>
              <h2 className="section__title">Reviews & Ratings</h2>
            </div>
            {reviewsLoading ? null : (
              <Button variant="ghost" size="sm" onClick={() => navigate("/hotels")}>
                <RefreshCcw size={14} /> Explore stays
              </Button>
            )}
          </div>
          <div className="reviews-grid">
            {featuredReviews.map((review, index) => (
              <motion.div key={review._id} className="review-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <div className="review-item__stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={13} fill={star <= review.rating ? "#fbbf24" : "none"} color={star <= review.rating ? "#fbbf24" : "#e2e8f0"} />
                  ))}
                </div>
                <p className="review-item__text">&quot;{review.comment}&quot;</p>
                <div className="review-item__author">
                  <div className="review-item__avatar">{(review.userId?.name || review.user?.name || "G")[0]?.toUpperCase()}</div>
                  <div>
                    <div className="review-item__name">{review.userId?.name || review.user?.name || "Guest"}</div>
                    {review.hotelId?.name && <div className="review-item__hotel">{review.hotelId.name}</div>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
