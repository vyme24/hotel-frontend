import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Users,
  Tag,
  AlertCircle,
  CheckCircle2,
  Hotel,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  CreditCard,
} from "lucide-react";
import { Calendar } from "react-date-range";
import { addDays, format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useApplyCouponMutation, useGetHotelQuery, useGetRoomQuery } from "../../redux/apiSlice";
import { addToCart } from "../../store/cartSlice";
import { buildCartItemFromRoom } from "../../utils/cart";
import { formatPrice, getPriceValue } from "../../utils/price";
import "./Booking.css";

function InlineError({ message }) {
  if (!message) return null;

  return (
    <span className="booking-inline-error">
      <AlertCircle size={12} /> {message}
    </span>
  );
}

function SummaryRow({ label, value, strong = false, accent = false }) {
  return (
    <div className={`booking-summary-row${strong ? " strong" : ""}`}>
      <span>{label}</span>
      <span className={accent ? "accent" : ""}>{value}</span>
    </div>
  );
}

export default function Booking() {
  const { id: roomId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const calendarWrapRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  const hotelId = searchParams.get("hotel");
  const qCheckIn = searchParams.get("checkIn");
  const qCheckOut = searchParams.get("checkOut");
  const qGuests = searchParams.get("guests") || "1";

  const { data: room } = useGetRoomQuery(roomId, { skip: !roomId });
  const { data: hotel } = useGetHotelQuery(hotelId, { skip: !hotelId });
  const [applyCoupon, { isLoading: applying }] = useApplyCouponMutation();

  const initialCheckIn = qCheckIn ? new Date(qCheckIn) : addDays(new Date(), 1);
  const initialCheckOut = qCheckOut ? new Date(qCheckOut) : addDays(initialCheckIn, 1);

  const [activeCalendar, setActiveCalendar] = useState(null);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState({ code: "", discount: 0, applied: false });
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    checkIn: format(initialCheckIn, "yyyy-MM-dd"),
    checkOut: format(initialCheckOut, "yyyy-MM-dd"),
    guests: Number(qGuests) || 1,
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    specialRequests: "",
  });

  useEffect(() => {
    const handler = (event) => {
      if (calendarWrapRef.current && !calendarWrapRef.current.contains(event.target)) {
        setActiveCalendar(null);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const roomDetails = room || null;
  const hotelDetails = hotel || null;
  const roomName = roomDetails?.name || roomDetails?.roomTypeName || "Premium Room";
  const propertyName = hotelDetails?.name || roomDetails?.hotelId?.name || "Selected Hotel";
  const propertyLocation = hotelDetails?.address?.city
    ? `${hotelDetails.address.city}, ${hotelDetails.address.state}`
    : roomDetails?.hotelId?.address?.city
      ? `${roomDetails.hotelId.address.city}, ${roomDetails.hotelId.address.state}`
      : "Prime destination";

  const imageUrl = roomDetails?.images?.[0]
    || hotelDetails?.images?.[0]
    || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80";

  const basePrice = getPriceValue(roomDetails || hotelDetails || {});
  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 1;
    const diff = (new Date(form.checkOut) - new Date(form.checkIn)) / 86400000;
    return Math.max(1, diff);
  }, [form.checkIn, form.checkOut]);

  const subtotal = basePrice * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = Math.max(0, subtotal + taxes - coupon.discount);

  const validate = () => {
    const nextErrors = {};

    if (!form.checkIn) nextErrors.checkIn = "Please choose a check-in date";
    if (!form.checkOut) nextErrors.checkOut = "Please choose a check-out date";
    if (form.checkIn && form.checkOut && new Date(form.checkOut) <= new Date(form.checkIn)) {
      nextErrors.checkOut = "Check-out must be after check-in";
    }
    if (!form.name.trim()) nextErrors.name = "Guest name is required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\D/g, "").slice(-10))) {
      nextErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const handleCheckInSelect = (date) => {
    const nextCheckIn = format(date, "yyyy-MM-dd");
    const currentCheckOut = new Date(form.checkOut);

    updateForm("checkIn", nextCheckIn);
    if (date >= currentCheckOut) {
      updateForm("checkOut", format(addDays(date, 1), "yyyy-MM-dd"));
    }
    setActiveCalendar(null);
  };

  const handleCheckOutSelect = (date) => {
    const checkInDate = new Date(form.checkIn);
    updateForm(
      "checkOut",
      format(date <= checkInDate ? addDays(checkInDate, 1) : date, "yyyy-MM-dd")
    );
    setActiveCalendar(null);
  };

  const handleApplyCoupon = async () => {
    if (!couponInput.trim() || subtotal <= 0) return;

    try {
      const response = await applyCoupon({
        code: couponInput.trim().toUpperCase(),
        amount: subtotal,
      }).unwrap();

      if (response?.status) {
        setCoupon({
          code: couponInput.trim().toUpperCase(),
          discount: response.data?.discountAmount || 0,
          applied: true,
        });
        toast.success(response.message || "Offer applied successfully!");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Invalid or expired coupon");
    }
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    if (!validate()) return;
    if (!roomDetails) {
      toast.error("Room details are still loading. Please try again.");
      return;
    }
    if (roomDetails.availableRooms <= 0) {
      toast.error("This room is currently unavailable.");
      return;
    }

    const cartItem = {
      ...buildCartItemFromRoom(roomDetails, {
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        duration: nights,
      }),
      guests: {
        adults: form.guests,
        children: 0,
      },
      guestInfo: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      },
      specialRequests: form.specialRequests.trim(),
      appliedCoupon: coupon.applied ? coupon.code : null,
      price: {
        roomPrice: basePrice,
        taxes,
        discount: coupon.discount,
        totalAmount: total,
      },
    };

    const duplicate = cartItems.some((item) => item.cartKey === cartItem.cartKey);
    if (duplicate) {
      toast.success("This stay is already in your cart. Please complete payment from the cart.");
      navigate("/cart");
      return;
    }

    dispatch(addToCart(cartItem));
    toast.success("Stay added to cart. Please go to cart and complete your payment.");
    navigate("/cart");
  };

  return (
    <div className="booking-page">
      <div className="booking-page__container">
        <div className="booking-hero">
          <div className="booking-hero__copy">
            <span className="booking-badge">
              <Sparkles size={14} /> Secure booking flow
            </span>
            <h1 className="booking-page__title">Complete Your Booking</h1>
            <p className="booking-page__sub">
              Select your stay dates, enter guest details, and add this room to your cart.
              Payment will be completed from the cart for a smoother checkout.
            </p>
          </div>
          <div className="booking-hero__mini-card">
            <div className="booking-hero__mini-icon">
              <CreditCard size={20} />
            </div>
            <div>
              <div className="booking-hero__mini-title">Cart-first checkout</div>
              <div className="booking-hero__mini-text">Add now, review later, then pay securely from cart.</div>
            </div>
          </div>
        </div>

        <form className="booking-layout" onSubmit={handleAddToCart}>
          <div className="booking-main">
            <section className="booking-card">
              <div className="booking-card__head">
                <h2><CalendarDays size={18} /> Stay Details</h2>
                <p>Choose your arrival and departure dates.</p>
              </div>

              <div className="booking-date-grid" ref={calendarWrapRef}>
                <div className="booking-field">
                  <label>From</label>
                  <button
                    type="button"
                    className={`booking-date-button${errors.checkIn ? " is-error" : ""}`}
                    onClick={() => setActiveCalendar((value) => value === "checkIn" ? null : "checkIn")}
                  >
                    <CalendarDays size={16} />
                    <span>{format(new Date(form.checkIn), "dd MMM yyyy")}</span>
                  </button>
                  <InlineError message={errors.checkIn} />
                  <AnimatePresence>
                    {activeCalendar === "checkIn" && (
                      <motion.div
                        className="booking-calendar-popup"
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      >
                        <Calendar
                          date={new Date(form.checkIn)}
                          minDate={addDays(new Date(), 0)}
                          onChange={handleCheckInSelect}
                          color="#1E3A8A"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="booking-field">
                  <label>To</label>
                  <button
                    type="button"
                    className={`booking-date-button${errors.checkOut ? " is-error" : ""}`}
                    onClick={() => setActiveCalendar((value) => value === "checkOut" ? null : "checkOut")}
                  >
                    <CalendarDays size={16} />
                    <span>{format(new Date(form.checkOut), "dd MMM yyyy")}</span>
                  </button>
                  <InlineError message={errors.checkOut} />
                  <AnimatePresence>
                    {activeCalendar === "checkOut" && (
                      <motion.div
                        className="booking-calendar-popup booking-calendar-popup--right"
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      >
                        <Calendar
                          date={new Date(form.checkOut)}
                          minDate={addDays(new Date(form.checkIn), 1)}
                          onChange={handleCheckOutSelect}
                          color="#1E3A8A"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="booking-field booking-field--compact">
                <label><Users size={14} /> Guests</label>
                <select
                  className="booking-input"
                  value={form.guests}
                  onChange={(event) => updateForm("guests", Number(event.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map((count) => (
                    <option key={count} value={count}>
                      {count} Guest{count > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <section className="booking-card">
              <div className="booking-card__head">
                <h2><Users size={18} /> Guest Information</h2>
                <p>We will use this information for the stay and check-in.</p>
              </div>

              <div className="booking-form-grid">
                <div className="booking-field booking-field--full">
                  <label>Full Name</label>
                  <input
                    className={`booking-input${errors.name ? " is-error" : ""}`}
                    type="text"
                    placeholder="Enter guest full name"
                    value={form.name}
                    onChange={(event) => updateForm("name", event.target.value)}
                  />
                  <InlineError message={errors.name} />
                </div>

                <div className="booking-field">
                  <label>Email</label>
                  <input
                    className={`booking-input${errors.email ? " is-error" : ""}`}
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(event) => updateForm("email", event.target.value)}
                  />
                  <InlineError message={errors.email} />
                </div>

                <div className="booking-field">
                  <label>Phone</label>
                  <input
                    className={`booking-input${errors.phone ? " is-error" : ""}`}
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={(event) => updateForm("phone", event.target.value)}
                  />
                  <InlineError message={errors.phone} />
                </div>

                <div className="booking-field booking-field--full">
                  <label>Special Requests</label>
                  <textarea
                    className="booking-input booking-textarea"
                    rows={4}
                    placeholder="Early check-in, extra pillows, high floor, dietary preferences..."
                    value={form.specialRequests}
                    onChange={(event) => updateForm("specialRequests", event.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className="booking-card">
              <div className="booking-card__head">
                <h2><Tag size={18} /> Apply Coupon</h2>
                <p>Add an offer code before sending this stay to the cart.</p>
              </div>

              {coupon.applied ? (
                <div className="booking-coupon-success">
                  <div className="booking-coupon-success__icon">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <div className="booking-coupon-success__title">{coupon.code} applied</div>
                    <div className="booking-coupon-success__text">
                      You saved {formatPrice(coupon.discount)} on this stay.
                    </div>
                  </div>
                  <button
                    type="button"
                    className="booking-link-btn"
                    onClick={() => setCoupon({ code: "", discount: 0, applied: false })}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="booking-coupon-row">
                  <input
                    className="booking-input"
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(event) => setCouponInput(event.target.value.toUpperCase())}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleApplyCoupon();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="booking-apply-btn"
                    onClick={handleApplyCoupon}
                    disabled={applying}
                  >
                    {applying ? "Applying..." : "Apply"}
                  </button>
                </div>
              )}
            </section>
          </div>

          <aside className="booking-sidebar">
            <section className="booking-summary-card">
              <div className="booking-summary-media">
                <img src={imageUrl} alt={roomName} />
                <div className="booking-summary-media__badge">
                  <ShieldCheck size={13} /> Verified stay
                </div>
              </div>

              <div className="booking-summary-head">
                <span className="booking-summary-kicker">
                  <Hotel size={13} /> Selected room
                </span>
                <h3>{roomName}</h3>
                <p>{propertyName}</p>
                <div className="booking-summary-location">
                  <MapPin size={13} /> {propertyLocation}
                </div>
              </div>

              <div className="booking-summary-panel">
                <SummaryRow label={`Room rate x ${nights} night${nights > 1 ? "s" : ""}`} value={formatPrice(subtotal)} />
                <SummaryRow label="Taxes & fees" value={formatPrice(taxes)} />
                {coupon.applied && (
                  <SummaryRow label={`Coupon (${coupon.code})`} value={`- ${formatPrice(coupon.discount)}`} />
                )}
                <SummaryRow label="Total amount" value={formatPrice(total)} strong accent />
              </div>

              <div className="booking-summary-meta">
                <div className="booking-summary-meta__item">
                  <span>Check-in</span>
                  <strong>{format(new Date(form.checkIn), "dd MMM yyyy")}</strong>
                </div>
                <div className="booking-summary-meta__item">
                  <span>Check-out</span>
                  <strong>{format(new Date(form.checkOut), "dd MMM yyyy")}</strong>
                </div>
                <div className="booking-summary-meta__item">
                  <span>Guests</span>
                  <strong>{form.guests}</strong>
                </div>
              </div>

              <button className="booking-submit-btn" type="submit">
                Add To Cart <ArrowRight size={18} />
              </button>

              <div className="booking-summary-note">
                <CreditCard size={14} />
                After adding this stay, go to the cart to review details, delete items, view rooms, or complete payment.
              </div>
            </section>
          </aside>
        </form>
      </div>
    </div>
  );
}
