import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Tag } from "lucide-react";
import { useGetOffersQuery, useApplyCouponMutation } from "../../redux/apiSlice";
import { PageLoader, ErrorState } from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import "./Offers.css";

export default function Offers() {
  const [copiedId, setCopiedId] = useState(null);
  const [inputCode, setInputCode] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);

  const { data: offers = [], isLoading, isError, refetch } = useGetOffersQuery();
  const [applyCoupon, { isLoading: verifying }] = useApplyCouponMutation();

  const handleCopy = (code, id) => {
    navigator.clipboard?.writeText(code);
    setCopiedId(id);
    toast.success(`Copied: ${code}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleVerify = async () => {
    if (!inputCode.trim()) return;
    setVerifyResult(null);
    try {
      const res = await applyCoupon({ code: inputCode.trim().toUpperCase(), amount: 10000 }).unwrap();
      if (res.status) {
        setVerifyResult({ success: true, message: res.message, data: res.data });
        toast.success(res.message);
      }
    } catch (err) {
      setVerifyResult({ success: false, message: err?.data?.message || "Invalid or expired coupon" });
      toast.error(err?.data?.message || "Invalid or expired coupon");
    }
  };

  if (isLoading) return <PageLoader />;
  if (isError) return <ErrorState message="Failed to load offers. Is the backend running?" onRetry={refetch} />;

  return (
    <div className="offers-page">
      <div className="offers-page__header">
        <h1 className="offers-page__header-title">Special Offers & Deals</h1>
        <p className="offers-page__header-sub">Exclusive discounts â€” only for LuxStay members</p>
      </div>

      <div className="offers-page__container">
        {/* Verify Coupon */}
        <div className="offers-coupon-banner">
          <div className="offers-coupon-banner__icon">ðŸŽŸï¸</div>
          <div className="offers-coupon-banner__text">
            <div className="offers-coupon-banner__title">Already have a coupon?</div>
            <div className="offers-coupon-banner__desc">Verify it here before checkout</div>
          </div>
          <div className="offers-coupon-form">
            <input className="offers-coupon-input" type="text" placeholder="ENTER CODE" value={inputCode}
              onChange={(e) => { setInputCode(e.target.value.toUpperCase()); setVerifyResult(null); }}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()} />
            <button className="offers-coupon-apply-btn" onClick={handleVerify} disabled={verifying}>
              {verifying ? "Checkingâ€¦" : "Verify"}
            </button>
          </div>
          {verifyResult && (
            <div style={{ width: "100%", marginTop: "0.75rem", padding: "0.75rem 1rem", borderRadius: 12,
              background: verifyResult.success ? "rgba(21,128,61,0.08)" : "rgba(239,68,68,0.08)",
              color: verifyResult.success ? "#15803d" : "#ef4444", fontWeight: 600, fontSize: "0.85rem" }}>
              {verifyResult.success ? "âœ“" : "âœ—"} {verifyResult.message}
              {verifyResult.success && verifyResult.data && (
                <span style={{ marginLeft: "0.5rem", fontWeight: 500, color: "#475569" }}>
                  Â· Save â‚¹{verifyResult.data.discountAmount?.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Offers Grid */}
        <div className="offers-section-title">ðŸŽ Available Coupons</div>
        {offers.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            No active offers. Run the seed script to add offers.
          </div>
        ) : (
          <div className="offers-cards-grid">
            {offers.map((offer, i) => (
              <motion.div key={offer._id} className="offer-detail-card"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div className="offer-detail-card__tag">
                  {offer.discountType === "PERCENT" ? `${offer.discountValue}% OFF` : `â‚¹${offer.discountValue} OFF`}
                </div>
                <div className="offer-detail-card__title">ðŸ·ï¸ {offer.title}</div>
                <div className="offer-detail-card__desc">{offer.description}</div>
                <div className="offer-detail-card__discount">
                  {offer.discountType === "PERCENT" ? `${offer.discountValue}%` : `â‚¹${offer.discountValue}`}
                  <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "#64748b" }}> off</span>
                </div>
                {offer.minBookingAmount > 0 && (
                  <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.75rem" }}>
                    Min. booking: â‚¹{offer.minBookingAmount.toLocaleString("en-IN")}
                    {offer.maxDiscount && ` Â· Max discount: â‚¹${offer.maxDiscount.toLocaleString("en-IN")}`}
                  </div>
                )}
                <div className="offer-detail-card__code-row">
                  <div className="offer-detail-card__code"><Tag size={11} style={{ display: "inline" }} /> {offer.code}</div>
                  <button className="offer-detail-card__copy-btn" onClick={() => handleCopy(offer.code, offer._id)}>
                    {copiedId === offer._id ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                  </button>
                </div>
                {offer.validTill && (
                  <div className="offer-detail-card__expiry">
                    Expires {new Date(offer.validTill).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                )}
                <div className="offer-detail-card__bg-number">
                  {offer.discountType === "PERCENT" ? `${offer.discountValue}%` : "â‚¹"}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

