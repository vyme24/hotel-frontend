import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Users, Copy, Home, LayoutDashboard } from "lucide-react";
import { useGetBookingByIdQuery } from "../../redux/apiSlice";
import { PageLoader, ErrorState } from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import "./Confirmation.css";

export default function Confirmation() {
  const { id } = useParams();
  const { data: booking, isLoading, isError } = useGetBookingByIdQuery(id, { skip: !id });

  if (isLoading) return <PageLoader />;
  if (isError || !booking) return <ErrorState message="Could not load booking details." />;

  const hotel = booking.hotelId;
  const room = booking.roomId;

  const fmt = (d) => d ? new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" }) : "â€”";

  const copy = () => {
    navigator.clipboard?.writeText(booking.bookingId || id);
    toast.success("Booking ID copied!");
  };

  return (
    <div className="confirmation-page">
      <div className="confirmation-page__container">
        <motion.div className="confirmation-card" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          {/* Success Icon */}
          <motion.div className="confirmation-icon" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
            <CheckCircle size={48} color="#15803d" />
          </motion.div>

          <h1 className="confirmation-title">Booking Confirmed!</h1>
          <p className="confirmation-sub">Your reservation is successfully placed. Pack your bags!</p>

          {/* Booking ID */}
          <div className="confirmation-booking-id" onClick={copy} title="Click to copy">
            <span>Booking ID: <strong>{booking.bookingId || id}</strong></span>
            <Copy size={14} />
          </div>

          {/* Details Grid */}
          <div className="confirmation-details">
            {hotel && (
              <div className="confirmation-detail-row">
                <span className="confirmation-detail-label">ðŸ¨ Hotel</span>
                <span className="confirmation-detail-value">{hotel.name}</span>
              </div>
            )}
            {hotel?.address?.city && (
              <div className="confirmation-detail-row">
                <span className="confirmation-detail-label">ðŸ“ Location</span>
                <span className="confirmation-detail-value">{hotel.address.city}, {hotel.address.state || "India"}</span>
              </div>
            )}
            {room && (
              <div className="confirmation-detail-row">
                <span className="confirmation-detail-label">ðŸ›ï¸ Room</span>
                <span className="confirmation-detail-value">{room.roomTypeName}</span>
              </div>
            )}
            <div className="confirmation-detail-row">
              <span className="confirmation-detail-label"><Calendar size={13} style={{ display: "inline" }} /> Check-in</span>
              <span className="confirmation-detail-value">{fmt(booking.checkInDate)}</span>
            </div>
            <div className="confirmation-detail-row">
              <span className="confirmation-detail-label"><Calendar size={13} style={{ display: "inline" }} /> Check-out</span>
              <span className="confirmation-detail-value">{fmt(booking.checkOutDate)}</span>
            </div>
            <div className="confirmation-detail-row">
              <span className="confirmation-detail-label"><Users size={13} style={{ display: "inline" }} /> Guests</span>
              <span className="confirmation-detail-value">{booking.guests?.adults || 1} Adult{booking.guests?.adults > 1 ? "s" : ""}</span>
            </div>
            <div className="confirmation-detail-row">
              <span className="confirmation-detail-label">ðŸŒ™ Nights</span>
              <span className="confirmation-detail-value">{booking.nights || 1} night{booking.nights > 1 ? "s" : ""}</span>
            </div>
            <div className="confirmation-detail-row" style={{ borderTop: "2px solid rgba(30,58,138,0.1)", paddingTop: "0.75rem", marginTop: "0.25rem" }}>
              <span className="confirmation-detail-label" style={{ fontWeight: 700 }}>ðŸ’° Total Paid</span>
              <span className="confirmation-detail-value" style={{ fontWeight: 800, color: "#1E3A8A", fontSize: "1.05rem" }}>
                â‚¹{(booking.price?.totalAmount || 0).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="confirmation-detail-row">
              <span className="confirmation-detail-label">Status</span>
              <span className="confirmation-detail-value" style={{ color: booking.bookingStatus === "confirmed" ? "#15803d" : "#f59e0b", fontWeight: 700, textTransform: "capitalize" }}>
                {booking.bookingStatus === "confirmed" ? "âœ“ Confirmed" : booking.bookingStatus}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="confirmation-actions">
            <Link to="/dashboard" className="confirmation-btn confirmation-btn--primary">
              <LayoutDashboard size={16} /> My Bookings
            </Link>
            <Link to="/hotels" className="confirmation-btn confirmation-btn--secondary">
              <Home size={16} /> Explore More
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

