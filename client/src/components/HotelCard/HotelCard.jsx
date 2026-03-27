import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Heart } from "lucide-react";
import "./HotelCard.css";
import { formatPrice, getPriceValue } from "../../utils/price";
import { STORAGE_KEYS, readStorage, toggleStoredId } from "../../utils/storage";

const BASE_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

function StarRating({ rating = 0 }) {
  return (
    <div className="hotel-card__stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          fill={s <= rating ? "#fbbf24" : "none"}
          className={`hotel-card__star${s > rating ? " empty" : ""}`}
        />
      ))}
    </div>
  );
}

function HotelCardComponent({ hotel, skeleton = false }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!hotel?._id) return;
    const wishlist = readStorage(STORAGE_KEYS.wishlist, []);
    setLiked(wishlist.includes(hotel._id));
  }, [hotel?._id]);

  if (skeleton) {
    return (
      <div className="hotel-card hotel-card--skeleton">
        <div className="hotel-card__img-wrap" />
        <div className="hotel-card__body">
          <div className="skeleton-line skeleton-line--sm" />
          <div className="skeleton-line skeleton-line--lg" />
          <div className="skeleton-line skeleton-line--md" />
        </div>
        <div className="hotel-card__footer">
          <div className="skeleton-line skeleton-line--md" />
        </div>
      </div>
    );
  }

  const imgSrc =
    hotel?.images?.[0]?.startsWith("http")
      ? hotel.images[0]
      : hotel?.images?.[0]
        ? `${BASE_URL}/${hotel.images[0]}`
        : "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80";

  const price = getPriceValue(hotel);
  const rating = hotel?.rating || hotel?.averageRating || 0;
  const reviewCount = hotel?.reviewCount || hotel?.totalReviews || 0;
  const stars = hotel?.starRating || hotel?.stars || 4;
  const location = hotel?.location?.city || hotel?.address?.city || hotel?.city || "Unknown Location";

  const handleWishlistToggle = (event) => {
    event.preventDefault();
    const next = toggleStoredId(STORAGE_KEYS.wishlist, hotel?._id);
    setLiked(next.includes(hotel?._id));
  };

  return (
    <div className="hotel-card">
      <div className="hotel-card__img-wrap">
        <img
          className="hotel-card__img"
          src={imgSrc}
          alt={hotel?.name}
          loading="lazy"
          onError={(event) => {
            event.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80";
          }}
        />
        {stars >= 5 && <div className="hotel-card__badge">Luxury</div>}
        {stars >= 4 && stars < 5 && <div className="hotel-card__badge">Premium</div>}
        <button
          className={`hotel-card__wishlist${liked ? " active" : ""}`}
          onClick={handleWishlistToggle}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} fill={liked ? "#ef4444" : "none"} />
        </button>
      </div>

      <div className="hotel-card__body">
        <div className="hotel-card__location">
          <MapPin size={12} />
          {location}
          {hotel?.location?.country ? `, ${hotel.location.country}` : ""}
        </div>
        <div className="hotel-card__name">{hotel?.name}</div>
        <StarRating rating={stars} />
        <div className="hotel-card__meta">
          {rating > 0 && (
            <div className="hotel-card__rating">
              <Star size={11} fill="#15803d" color="#15803d" />
              <span className="hotel-card__rating-score">{Number(rating).toFixed(1)}</span>
              <span className="hotel-card__rating-label">
                {rating >= 4.5 ? "Excellent" : rating >= 4 ? "Very Good" : "Good"}
              </span>
            </div>
          )}
          {reviewCount > 0 && <span className="hotel-card__review-count">{reviewCount} reviews</span>}
        </div>
      </div>

      <div className="hotel-card__footer">
        <div className="hotel-card__price">
          <span className="hotel-card__price-label">Per Night</span>
          <div className="hotel-card__price-value">
            {formatPrice(price)} <span>/ night</span>
          </div>
        </div>
        <Link to={`/hotel/${hotel?._id}`} className="hotel-card__book-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

const HotelCard = memo(HotelCardComponent);

export default HotelCard;
