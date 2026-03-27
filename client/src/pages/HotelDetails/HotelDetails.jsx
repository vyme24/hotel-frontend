import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, ChevronRight, Calendar, Users, Wifi, Waves, Dumbbell, Coffee, AirVent, Tv, Car } from "lucide-react";
import { useGetHotelQuery, useGetRoomsQuery, useGetReviewsQuery } from "../../redux/apiSlice";
import { PageLoader, ErrorState } from "../../components/Loader/Loader";
import RoomCard from "../../components/RoomCard/RoomCard";
import EmptyState from "../../components/ui/EmptyState";
import { formatPrice, getPriceValue } from "../../utils/price";
import { pushRecentItem, STORAGE_KEYS } from "../../utils/storage";
import "./HotelDetails.css";

const AMENITY_ICONS = {
  wifi: <Wifi size={15} />,
  pool: <Waves size={15} />,
  gym: <Dumbbell size={15} />,
  restaurant: <Coffee size={15} />,
  ac: <AirVent size={15} />,
  tv: <Tv size={15} />,
  parking: <Car size={15} />,
};

function amenityIcon(amenity) {
  const key = amenity?.toLowerCase().split(" ")[0];
  return AMENITY_ICONS[key] || "•";
}

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);

  const { data: hotel, isLoading, isError, refetch } = useGetHotelQuery(id);
  const { data: rooms = [] } = useGetRoomsQuery(id);
  const { data: reviews = [] } = useGetReviewsQuery(id);

  useEffect(() => {
    if (!hotel?._id) return;

    pushRecentItem(
      STORAGE_KEYS.recentlyViewed,
      {
        _id: hotel._id,
        name: hotel.name,
        images: hotel.images,
        location: hotel.location,
        address: hotel.address,
        basePrice: getPriceValue(hotel),
        averageRating: hotel.averageRating,
        totalReviews: hotel.totalReviews,
        starRating: hotel.starRating,
      },
      4
    );
  }, [hotel]);

  const displayRooms = useMemo(() => (rooms.length > 0 ? rooms : hotel?.rooms || []), [hotel?.rooms, rooms]);
  const displayReviews = useMemo(() => (reviews.length > 0 ? reviews : hotel?.reviews || []), [hotel?.reviews, reviews]);
  const price = getPriceValue(hotel);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const diff = (new Date(checkOut) - new Date(checkIn)) / 86400000;
    return Math.max(1, diff);
  }, [checkIn, checkOut]);

  if (isLoading) return <PageLoader />;
  if (isError || !hotel) {
    return <ErrorState message="Hotel details could not be loaded right now." onRetry={refetch} />;
  }

  const images = hotel?.images?.length ? hotel.images : [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  ];

  return (
    <div className="hotel-details">
      <div className="hotel-details__gallery">
        <div className="hotel-details__gallery-main" key={imgIdx}>
          <img
            src={images[imgIdx] || images[0]}
            alt={hotel.name}
            loading="lazy"
            onError={(event) => {
              event.target.src = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80";
            }}
          />
        </div>
        {images[1] && (
          <div className="hotel-details__gallery-thumb" onClick={() => setImgIdx(1)} style={{ cursor: "pointer" }}>
            <img src={images[1]} alt="" loading="lazy" />
          </div>
        )}
        {images[2] && (
          <div className="hotel-details__gallery-more" onClick={() => setImgIdx(2)} style={{ cursor: "pointer" }}>
            <img src={images[2]} alt="" loading="lazy" />
            {images.length > 3 && <div className="hotel-details__gallery-more-overlay">+{images.length - 3} more</div>}
          </div>
        )}
      </div>

      <div className="hotel-details__container">
        <div className="hotel-details__main">
          <nav className="hotel-details__breadcrumb">
            <Link to="/">Home</Link><ChevronRight size={14} />
            <Link to="/hotels">Hotels</Link><ChevronRight size={14} />
            <span>{hotel.name}</span>
          </nav>

          <h1 className="hotel-details__name">{hotel.name}</h1>

          <div className="hotel-details__meta">
            {hotel.averageRating > 0 && (
              <div className="hotel-details__rating-badge">
                <Star size={14} fill="#15803d" color="#15803d" />
                {Number(hotel.averageRating).toFixed(1)} / 5
                {hotel.totalReviews > 0 && <span style={{ fontSize: "0.75rem", color: "#64748b" }}>({hotel.totalReviews} reviews)</span>}
              </div>
            )}
            {hotel.starRating && (
              <div style={{ display: "flex", gap: 2 }}>
                {Array(hotel.starRating).fill(0).map((_, index) => <Star key={index} size={14} fill="#fbbf24" color="#fbbf24" />)}
              </div>
            )}
            <div className="hotel-details__location">
              <MapPin size={15} />
              {hotel.address?.city || hotel.location?.city}
              {hotel.address?.state ? `, ${hotel.address.state}` : ""}
            </div>
          </div>

          <div className="hotel-details__section-title">About</div>
          <p className="hotel-details__desc">{hotel.description || "Experience luxury and comfort at its finest."}</p>

          {hotel.amenities?.length > 0 && (
            <>
              <div className="hotel-details__section-title">Amenities</div>
              <div className="hotel-details__amenities">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="hotel-details__amenity">{amenityIcon(amenity)} {amenity}</div>
                ))}
              </div>
            </>
          )}

          <div className="hotel-details__section-title">Available Rooms</div>
          <div className="hotel-details__rooms">
            {displayRooms.length > 0 ? (
              displayRooms.map((room) => (
                <motion.div key={room._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                  <RoomCard room={room} hotelId={id} checkIn={checkIn} checkOut={checkOut} />
                </motion.div>
              ))
            ) : (
              <EmptyState
                icon="🛏"
                title="No rooms available yet"
                message="This hotel page is live, but room inventory has not been published yet."
                actionLabel="Browse other hotels"
                onAction={() => navigate("/hotels")}
              />
            )}
          </div>

          {displayReviews.length > 0 && (
            <>
              <div className="hotel-details__section-title">Guest Reviews</div>
              <div className="hotel-details__reviews">
                {displayReviews.slice(0, 5).map((review, index) => (
                  <div key={review._id || index} style={{ background: "#f8fafc", borderRadius: 12, padding: "1rem 1.25rem", border: "1px solid rgba(30,58,138,0.07)" }}>
                    <div style={{ display: "flex", gap: 3, marginBottom: "0.5rem" }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={13} fill={star <= review.rating ? "#fbbf24" : "none"} color={star <= review.rating ? "#fbbf24" : "#e2e8f0"} />
                      ))}
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.7, margin: "0 0 0.5rem" }}>&quot;{review.comment}&quot;</p>
                    <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>by {review.userId?.name || review.user?.name || "Guest"}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="hotel-details__sidebar">
          <div className="hotel-details__book-card">
            <div className="hotel-details__book-card-price">
              {formatPrice(price)} <span>/ night</span>
            </div>
            {nights > 1 && (
              <div style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "0.75rem" }}>
                {formatPrice(price * nights)} total for {nights} nights
              </div>
            )}
            <div className="hotel-details__date-inputs">
              <div className="hotel-details__date-field">
                <label><Calendar size={12} style={{ display: "inline" }} /> Check In</label>
                <input className="hotel-details__date-input" type="date" value={checkIn} min={new Date().toISOString().split("T")[0]} onChange={(event) => setCheckIn(event.target.value)} />
              </div>
              <div className="hotel-details__date-field">
                <label><Calendar size={12} style={{ display: "inline" }} /> Check Out</label>
                <input className="hotel-details__date-input" type="date" value={checkOut} min={checkIn || new Date().toISOString().split("T")[0]} onChange={(event) => setCheckOut(event.target.value)} />
              </div>
            </div>
            <div className="hotel-details__date-field" style={{ marginTop: "0.75rem" }}>
              <label><Users size={12} style={{ display: "inline" }} /> Guests</label>
              <input className="hotel-details__date-input" type="number" min={1} max={10} value={guests} onChange={(event) => setGuests(Number(event.target.value))} />
            </div>
            <button
              className="hotel-details__book-btn"
              onClick={() => {
                if (!displayRooms.length) return;
                const room = displayRooms[0];
                navigate(`/booking/${room._id}?hotel=${id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&price=${getPriceValue(room)}&roomName=${encodeURIComponent(room.roomTypeName || room.name || "Room")}`);
              }}
            >
              {displayRooms.length > 0 ? "Reserve Now" : "View Availability"}
            </button>
            <div style={{ marginTop: "1rem", fontSize: "0.78rem", color: "#64748b", textAlign: "center" }}>
              Free cancellation · Best price guarantee
            </div>
          </div>

          <div style={{ marginTop: "1rem", background: "white", borderRadius: 14, padding: "1.25rem", border: "1px solid rgba(30,58,138,0.08)", fontSize: "0.82rem" }}>
            {displayRooms.length > 0 && (
              <div style={{ color: "#15803d", fontWeight: 600, marginBottom: "0.5rem" }}>
                {displayRooms.length} room type{displayRooms.length > 1 ? "s" : ""} available
              </div>
            )}
            <div style={{ color: "#64748b" }}>Location: {hotel.address?.city || hotel.location?.city}, {hotel.address?.state || "India"}</div>
            {hotel.contact?.phone && <div style={{ color: "#64748b", marginTop: "0.25rem" }}>Phone: {hotel.contact.phone}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
