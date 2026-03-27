import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Star, User, Hotel, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetUserBookingsQuery, useCreateReviewMutation } from "../../redux/apiSlice";
import { PageLoader, ErrorState } from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import "./Dashboard.css";

function StatusBadge({ status }) {
  const s = (status || "pending").toLowerCase();
  const colors = { confirmed: "#15803d", cancelled: "#ef4444", pending: "#d97706", checked_in: "#1E3A8A", checked_out: "#64748b" };
  return (
    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 700, background: `${colors[s] || "#64748b"}18`, color: colors[s] || "#64748b", textTransform: "capitalize", letterSpacing: "0.02em" }}>
      {s === "confirmed" ? "âœ“ " : ""}{s.replace("_", " ")}
    </span>
  );
}

function ReviewModal({ booking, onClose, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return toast.error("Please write a comment");
    setLoading(true);
    await onSubmit({ hotelId: booking.hotelId?._id, bookingId: booking._id, rating, comment }).finally(() => setLoading(false));
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ background: "white", borderRadius: 20, padding: "2rem", width: "100%", maxWidth: 480 }}>
        <h3 style={{ fontWeight: 800, color: "#0F172A", marginBottom: "1rem" }}>Write a Review</h3>
        <div style={{ fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>{booking.hotelId?.name}</div>
        <div style={{ display: "flex", gap: 6, marginBottom: "1rem" }}>
          {[1,2,3,4,5].map(s => (
            <button key={s} onClick={() => setRating(s)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.4rem" }}>
              {s <= rating ? "â­" : "â˜†"}
            </button>
          ))}
        </div>
        <textarea placeholder="Share your experienceâ€¦" value={comment} onChange={(e) => setComment(e.target.value)}
          rows={4} style={{ width: "100%", boxSizing: "border-box", padding: "0.75rem 1rem", border: "1px solid rgba(30,58,138,0.15)", borderRadius: 12, resize: "vertical", fontSize: "0.875rem", color: "#0F172A", fontFamily: "inherit", outline: "none" }} />
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "0.6rem 1.25rem", borderRadius: 10, border: "1px solid rgba(30,58,138,0.15)", background: "white", cursor: "pointer", color: "#64748b" }}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} style={{ padding: "0.6rem 1.25rem", borderRadius: 10, background: "#1E3A8A", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>
            {loading ? "Submittingâ€¦" : "Submit Review"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useSelector(s => s.auth);
  const [tab, setTab] = useState("bookings");
  const [reviewBooking, setReviewBooking] = useState(null);

  const { data: bookings = [], isLoading, isError, refetch } = useGetUserBookingsQuery();
  const [createReview] = useCreateReviewMutation();

  const submitReview = async (data) => {
    try {
      await createReview(data).unwrap();
      toast.success("Review submitted! Thank you ðŸŒŸ");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  const tabs = [
    { id: "bookings", label: "My Bookings", icon: <BookOpen size={15} /> },
    { id: "profile", label: "Profile", icon: <User size={15} /> },
  ];

  return (
    <div className="dashboard-page">
      {reviewBooking && <ReviewModal booking={reviewBooking} onClose={() => setReviewBooking(null)} onSubmit={submitReview} />}
      <div className="dashboard-page__container">
        {/* Header */}
        <div className="dashboard-page__header">
          <div className="dashboard-avatar-large">{user?.name?.[0]?.toUpperCase() || "U"}</div>
          <div>
            <div className="dashboard-page__name">Welcome back, {user?.name?.split(" ")[0] || "Guest"}!</div>
            <div className="dashboard-page__email">{user?.email || user?.phone || "No contact info"}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          {tabs.map(t => (
            <button key={t.id} className={`dashboard-tab${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {tab === "bookings" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {isLoading ? <PageLoader /> : isError ? (
              <ErrorState message="Failed to load bookings" onRetry={refetch} />
            ) : bookings.length === 0 ? (
              <div className="dashboard-empty">
                <div className="dashboard-empty__icon">ðŸ¨</div>
                <div className="dashboard-empty__title">No bookings yet</div>
                <div className="dashboard-empty__text">Start exploring and book your first luxury stay!</div>
                <Link to="/hotels" className="dashboard-action-btn"><Hotel size={16} /> Explore Hotels</Link>
              </div>
            ) : (
              <div className="booking-list">
                {bookings.map((b, i) => {
                  const hotel = b.hotelId || {};
                  const room = b.roomId || {};
                  const img = hotel.images?.[0] || hotel.coverImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80";
                  return (
                    <motion.div key={b._id} className="booking-item" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                      <img className="booking-item__img" src={img} alt={hotel.name}
                        onError={e => { e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80"; }} />
                      <div className="booking-item__body">
                        <div className="booking-item__hotel">{hotel.name || "Hotel"}</div>
                        <div className="booking-item__room">{room.roomTypeName || "Room"} Â· {b.guests?.adults || 1} Guest</div>
                        <div className="booking-item__dates">
                          {b.checkInDate ? new Date(b.checkInDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "â€”"}
                          {" â†’ "}
                          {b.checkOutDate ? new Date(b.checkOutDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "â€”"}
                        </div>
                        <div className="booking-item__price">â‚¹{(b.price?.totalAmount || 0).toLocaleString("en-IN")}</div>
                      </div>
                      <div className="booking-item__status">
                        <StatusBadge status={b.bookingStatus} />
                        {b.bookingStatus === "confirmed" && (
                          <button onClick={() => setReviewBooking(b)}
                            style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: 4, fontSize: "0.72rem", color: "#1E3A8A", background: "rgba(30,58,138,0.07)", border: "none", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}>
                            <Plus size={11} /> Review
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* Profile Tab */}
        {tab === "profile" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ background: "white", borderRadius: 20, padding: "2rem", border: "1px solid rgba(30,58,138,0.08)", boxShadow: "0 4px 20px rgba(30,58,138,0.06)" }}>
              <h3 style={{ fontWeight: 800, color: "#0F172A", marginBottom: "1.5rem" }}>Profile Information</h3>
              {[{ label: "Full Name", value: user?.name }, { label: "Email", value: user?.email }, { label: "Phone", value: user?.phone }, { label: "Account Type", value: user?.role || "User" }]
                .map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 0", borderBottom: "1px solid rgba(30,58,138,0.07)", fontSize: "0.875rem" }}>
                    <span style={{ color: "#64748b", fontWeight: 500 }}>{row.label}</span>
                    <span style={{ color: "#0F172A", fontWeight: 600 }}>{row.value || "â€”"}</span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

