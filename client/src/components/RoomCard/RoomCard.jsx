import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Wifi, Coffee, AirVent, Tv, Users, Maximize, BedDouble } from "lucide-react";
import "./RoomCard.css";
import { formatPrice, getPriceValue } from "../../utils/price";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import { addToCart } from "../../store/cartSlice";
import { buildCartItemFromRoom, buildPendingCartIntent } from "../../utils/cart";
import { STORAGE_KEYS, writeSessionStorage } from "../../utils/storage";

const BASE_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

const AMENITY_ICONS = {
  wifi: <Wifi size={12} />,
  "wi-fi": <Wifi size={12} />,
  breakfast: <Coffee size={12} />,
  "air conditioning": <AirVent size={12} />,
  ac: <AirVent size={12} />,
  tv: <Tv size={12} />,
};

function getAmenityIcon(amenity) {
  const key = amenity.toLowerCase();
  return AMENITY_ICONS[key] || null;
}

export default function RoomCard({ room, hotelId, checkIn, checkOut }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const { isAuthenticated, handleAuthorizedAction } = useAuthCheck();
  const isAvailable = room?.available !== false;

  const imgSrc =
    room?.images?.[0]?.startsWith("http")
      ? room.images[0]
      : room?.images?.[0]
        ? `${BASE_URL}/${room.images[0]}`
        : "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80";

  const price = getPriceValue(room);
  const amenities = room?.amenities || [];

  const handleBookNow = () => {
    if (!isAvailable) return;

    if (!isAuthenticated) {
      writeSessionStorage(
        STORAGE_KEYS.pendingCartIntent,
        buildPendingCartIntent(room, { checkIn, checkOut })
      );
    }

    handleAuthorizedAction(() => {
      const cartItem = buildCartItemFromRoom(room, { checkIn, checkOut });
      const duplicate = cartItems.some((item) => item.cartKey === cartItem.cartKey);
      if (duplicate) {
        toast.success("Room is already in your cart.");
        navigate("/cart");
        return;
      }
      dispatch(addToCart(cartItem));
      toast.success("Room added to your cart.");
      navigate("/cart");
    });
  };

  return (
    <div className="room-card">
      <div className="room-card__img-wrap">
        <img
          className="room-card__img"
          src={imgSrc}
          alt={room?.name || room?.type}
          loading="lazy"
          onError={(event) => {
            event.target.src = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80";
          }}
        />
        <div className={`room-card__availability ${isAvailable ? "available" : "unavailable"}`}>
          {isAvailable ? "Available" : "Booked"}
        </div>
      </div>

      <div className="room-card__body">
        <div className="room-card__type">{room?.type || "Standard"}</div>
        <div className="room-card__name">{room?.name || "Deluxe Room"}</div>
        {room?.description && <div className="room-card__desc">{room.description}</div>}

        <div className="room-card__specs">
          {room?.maxGuests && (
            <div className="room-card__spec">
              <Users size={14} />
              {room.maxGuests} Guests
            </div>
          )}
          {room?.size && (
            <div className="room-card__spec">
              <Maximize size={14} />
              {room.size} m2
            </div>
          )}
          {room?.bedType && (
            <div className="room-card__spec">
              <BedDouble size={14} />
              {room.bedType}
            </div>
          )}
        </div>

        {amenities.length > 0 && (
          <div className="room-card__amenities">
            {amenities.slice(0, 5).map((amenity, index) => (
              <span key={index} className="room-card__amenity">
                {getAmenityIcon(amenity)} {amenity}
              </span>
            ))}
            {amenities.length > 5 && (
              <span className="room-card__amenity">+{amenities.length - 5} more</span>
            )}
          </div>
        )}

        <div className="room-card__footer">
          <div className="room-card__price-block">
            <span className="room-card__price-label">Per Night</span>
            <div className="room-card__price">
              {formatPrice(price)} <span>/ night</span>
            </div>
          </div>
          <div className="room-card__actions">
            <Link
              to={`/room/${room?._id}`}
              className="room-card__view-btn"
            >
              View
            </Link>
            <button
              type="button"
              className="room-card__book-btn"
              onClick={handleBookNow}
              disabled={!isAvailable}
            >
              {isAvailable ? "Book Now" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
