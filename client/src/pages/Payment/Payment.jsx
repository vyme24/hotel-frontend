import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";
import { useGetBookingByIdQuery } from "../../redux/apiSlice";
import { PageLoader, ErrorState } from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeCartItems } from "../../store/cartSlice";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import { formatPrice } from "../../utils/price";
import { readSessionStorage, removeStoredValue, STORAGE_KEYS } from "../../utils/storage";
import { useCreateOrderMutation, useVerifyPaymentMutation } from "../../services/payment";
import "./Payment.css";

export default function Payment() {
  const { id: bookingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [launchAttempted, setLaunchAttempted] = useState(false);
  const launchedRef = useRef(false);

  const { data: booking, isLoading, isError } = useGetBookingByIdQuery(bookingId, { skip: !bookingId });
  const [createOrder, { isLoading: creatingOrder }] = useCreateOrderMutation();
  const [verifyPayment, { isLoading: verifyingPayment }] = useVerifyPaymentMutation();

  const cartCheckout = useMemo(() => {
    if (bookingId) return null;
    return readSessionStorage(STORAGE_KEYS.cartCheckout, null);
  }, [bookingId]);

  const cartBookings = cartCheckout?.bookings || [];
  const checkoutCartKeys = cartCheckout?.cartKeys || [];
  const isCartCheckout = !bookingId;
  const paying = creatingOrder || verifyingPayment;

  useEffect(() => {
    if (isCartCheckout && location.state?.source === "cart" && cartBookings.length === 0) {
      toast.error("Your checkout session expired. Please review your cart again.");
      navigate("/cart", { replace: true });
    }
  }, [cartBookings.length, isCartCheckout, location.state, navigate]);

  if (!isCartCheckout && isLoading) return <PageLoader />;
  if (!isCartCheckout && (isError || !booking)) {
    return <ErrorState message="Booking not found. Please restart the booking process." />;
  }
  if (isCartCheckout && cartBookings.length === 0) {
    return <PageLoader />;
  }

  const hotel = isCartCheckout ? null : booking.hotelId;
  const room = isCartCheckout ? null : booking.roomId;
  const total = isCartCheckout
    ? cartBookings.reduce((sum, item) => sum + (item.price?.totalAmount || 0), 0)
    : booking.price?.totalAmount || 0;
  const taxes = isCartCheckout
    ? cartBookings.reduce((sum, item) => sum + (item.price?.taxes || 0), 0)
    : booking.price?.taxes || 0;

  const loadRazorpay = async () => {
    if (window.Razorpay) return true;

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePay = async () => {
    if (isSubmitting || paying) return;

    try {
      setIsSubmitting(true);
      setLaunchAttempted(true);
      const targetBookings = isCartCheckout ? cartBookings : [booking];
      const targetBookingIds = targetBookings.map((item) => item._id);
      const razorpayReady = await loadRazorpay();

      if (!razorpayReady) {
        throw new Error("Unable to load Razorpay checkout. Please try again.");
      }

      const orderPayload = isCartCheckout
        ? { bookingIds: targetBookingIds }
        : { bookingId: bookingId || targetBookingIds[0] };
      const orderResponse = await createOrder(orderPayload).unwrap();

      if (!orderResponse?.status) {
        throw new Error(orderResponse?.message || "Unable to start payment");
      }

      if (orderResponse?.data?.alreadyPaid) {
        toast.success("This booking is already paid.");
        navigate("/bookings", { replace: true });
        return;
      }

      const orderData = orderResponse.data;
      const razorpay = new window.Razorpay({
        key: orderData.razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        order_id: orderData.orderId,
        name: "LuxStay",
        description: isCartCheckout ? "Cart payment" : "Booking payment",
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: {
          color: "#f97316",
        },
        handler: async (response) => {
          try {
            const verifyPayload = {
              bookingIds: targetBookingIds,
              bookingId: targetBookingIds[0],
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              method: "razorpay",
            };

            const verifyResponse = await verifyPayment(verifyPayload).unwrap();
            if (!verifyResponse?.status) {
              throw new Error(verifyResponse?.message || "Payment verification failed");
            }

            toast.success("Payment successful!");

            if (isCartCheckout) {
              if (checkoutCartKeys.length > 0) {
                dispatch(removeCartItems(checkoutCartKeys));
              } else {
                dispatch(clearCart());
              }
              removeStoredValue(STORAGE_KEYS.cartCheckout, "session");
              navigate("/bookings", { replace: true });
              return;
            }

            navigate(`/confirmation/${bookingId}`, { replace: true });
          } catch (error) {
            toast.error(error?.data?.message || error?.message || "Payment verification failed.");
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            toast.error("Payment was cancelled.");
          },
        },
      });

      razorpay.open();
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Payment failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (launchedRef.current) return;
    if (!isCartCheckout && !booking) return;
    if (isCartCheckout && cartBookings.length === 0) return;

    launchedRef.current = true;
    handlePay();
  }, [booking, cartBookings.length, isCartCheckout]);

  return (
    <div className="payment-page">
      <div className="payment-page__container">
        <div className="payment-page__header">
          <button
            type="button"
            className="payment-back-btn"
            onClick={() => navigate(isCartCheckout ? "/cart" : `/booking/${bookingId}`)}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="payment-page__title">{isCartCheckout ? "Opening Cart Payment" : "Opening Secure Payment"}</h1>
          <p className="payment-page__sub"><Lock size={14} style={{ display: "inline" }} /> 256-bit SSL encrypted. Razorpay checkout opens automatically.</p>
        </div>

        <div className="payment-grid">
          <div className="payment-launch-card">
            <motion.div className="payment-launch-card__inner" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="payment-launch-card__eyebrow">Direct Razorpay Checkout</div>
              <h2 className="payment-launch-card__title">Custom payment form removed</h2>
              <p className="payment-launch-card__text">
                Ab proceed to pay ke baad direct Razorpay open hota hai. Card, UPI, net banking aur baki methods Razorpay popup ke andar milenge.
              </p>
              <Button className="payment-pay-btn" onClick={handlePay} loading={paying || isSubmitting} disabled={paying || isSubmitting}>
                {paying || isSubmitting ? "Opening Razorpay..." : `Pay ${formatPrice(total)} in Razorpay`}
              </Button>
              {launchAttempted && !paying && (
                <p className="payment-launch-card__hint">Agar popup block ho gaya ho to button dobara click karein.</p>
              )}
            </motion.div>
          </div>

          <div className="payment-summary">
            <h3 className="payment-summary__title">Order Summary</h3>
            {isCartCheckout ? (
              <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1.25rem" }}>
                {cartBookings.map((item) => (
                  <div
                    key={item._id}
                    style={{ paddingBottom: "0.75rem", borderBottom: "1px solid rgba(30,58,138,0.07)" }}
                  >
                    <div style={{ fontWeight: 700, color: "#0F172A" }}>
                      {item.hotelId?.name || "Hotel Booking"}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      {item.roomId?.roomTypeName || "Full property stay"} | {item.nights || 1} night{(item.nights || 1) > 1 ? "s" : ""}
                    </div>
                  </div>
                ))}
              </div>
            ) : hotel && (
              <div style={{ marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(30,58,138,0.07)" }}>
                <div style={{ fontWeight: 700, color: "#0F172A" }}>{hotel.name}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{hotel.address?.city}, {hotel.address?.state}</div>
              </div>
            )}

            {[
              ...(isCartCheckout
                ? cartBookings.map((item, index) => ({
                    label: `${item.hotelId?.name || "Stay"} ${index + 1}`,
                    value: formatPrice(item.price?.totalAmount || 0),
                  }))
                : [{ label: room?.roomTypeName || "Room", value: formatPrice(booking.price?.totalAmount || 0) }]),
              { label: "Taxes & Fees (18%)", value: formatPrice(taxes) },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid rgba(30,58,138,0.06)", fontSize: "0.875rem" }}>
                <span style={{ color: "#64748b" }}>{row.label}</span>
                <span style={{ fontWeight: 600 }}>{row.value}</span>
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0 0.5rem", fontWeight: 800, fontSize: "1.1rem" }}>
              <span style={{ color: "#0F172A" }}>Total</span>
              <span style={{ color: "#1E3A8A" }}>{formatPrice(total)}</span>
            </div>
            <div style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.15)", borderRadius: 10, fontSize: "0.78rem", color: "#15803d", textAlign: "center" }}>
              Free cancellation until 24 hrs before check-in
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
