import { Suspense, lazy, useEffect, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { PageLoader } from "./components/Loader/Loader";
import AppLayout from "./Layouts/App.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { useGetProfileQuery } from "./redux/apiSlice";
import { logout, setUser } from "./store/authSlice";
import { isTokenExpired } from "./utils/auth";
import { useGetRoomByIdQuery } from "./services/room";
import { addToCart, syncCartForUser } from "./store/cartSlice";
import { buildCartItemFromRoom } from "./utils/cart";
import { readSessionStorage, removeStoredValue, STORAGE_KEYS } from "./utils/storage";
import toast from "react-hot-toast";

const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Hotels = lazy(() => import("./pages/Hotels/Hotels.jsx"));
const HotelDetails = lazy(() => import("./pages/HotelDetails/HotelDetails.jsx"));
const AllRooms = lazy(() => import("./pages/AllRooms/AllRooms.jsx"));
const SingleRoom = lazy(() => import("./pages/SingleRoom/SingleRoom.jsx"));
const Search = lazy(() => import("./pages/Search/Search.jsx"));
const Booking = lazy(() => import("./pages/Booking/Booking.jsx"));
const Cart = lazy(() => import("./pages/Cart/Cart.jsx"));
const Payment = lazy(() => import("./pages/Payment/Payment.jsx"));
const Confirmation = lazy(() => import("./pages/Confirmation/Confirmation.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard.jsx"));
const Offers = lazy(() => import("./pages/Offers/Offers.jsx"));
const Notifications = lazy(() => import("./pages/Notifications/Notifications.jsx"));
const Profile = lazy(() => import("./pages/Profile/Profile.jsx"));
const Settings = lazy(() => import("./pages/Settings/Settings.jsx"));
const Wishlist = lazy(() => import("./pages/Wishlist/Wishlist.jsx"));
const Login = lazy(() => import("./pages/auth/Login/Login.jsx"));
const Register = lazy(() => import("./pages/auth/Register/Register.jsx"));
const Otp = lazy(() => import("./pages/auth/Otp/Otp.jsx"));
const ForgotPassword = lazy(() => import("./pages/auth/Forgot.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));
const ComingSoon = lazy(() => import("./pages/ComingSoon/ComingSoon.jsx"));
const Contact = lazy(() => import("./pages/Contact/Contact.jsx"));
const OAuthSuccess = lazy(() => import("./pages/auth/OAuthSuccess.jsx"));
const NewPassword = lazy(() => import("./pages/auth/NewPassword.jsx"));
const About = lazy(() => import("./pages/Footer/About.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/Footer/PrivacyandPolicy.jsx"));
const TermAndUse = lazy(() => import("./pages/Footer/TermandUse.jsx"));
const Careers = lazy(() => import("./pages/Footer/Careers.jsx"));
const Blog = lazy(() => import("./pages/Footer/Blog.jsx"));
const CancellationPolicy = lazy(() => import("./pages/Footer/CancellationPolicy.jsx"));
const HelpCenter = lazy(() => import("./pages/Footer/HelpCenter.jsx"));
const Partnership = lazy(() => import("./pages/Footer/Partnership.jsx"));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

function AuthSessionManager() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { data: profileResponse } = useGetProfileQuery(undefined, {
    skip: !token || !!user,
  });

  useEffect(() => {
    if (!token) return undefined;

    if (isTokenExpired(token)) {
      dispatch(logout());
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      if (isTokenExpired(token, 5000)) {
        dispatch(logout());
      }
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, [dispatch, token]);

  useEffect(() => {
    const profile = profileResponse?.data || profileResponse?.user || profileResponse;
    if (profile && typeof profile === "object" && profile._id) {
      dispatch(setUser(profile));
    }
  }, [dispatch, profileResponse]);

  return null;
}

function PendingCartResumeManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasHandledRef = useRef(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const pendingIntent = readSessionStorage(STORAGE_KEYS.pendingCartIntent, null);
  const roomId = isAuthenticated ? pendingIntent?.roomId : null;
  const { data: roomResponse } = useGetRoomByIdQuery(roomId, { skip: !roomId });

  useEffect(() => {
    if (!isAuthenticated) {
      hasHandledRef.current = false;
      return;
    }

    if (!pendingIntent?.roomId || hasHandledRef.current || !roomResponse?.data) {
      return;
    }

    hasHandledRef.current = true;
    const room = roomResponse.data;

    if (room?.availableRooms <= 0) {
      toast.error("This room is currently unavailable.");
      removeStoredValue(STORAGE_KEYS.pendingCartIntent, "session");
      return;
    }

    const cartItem = buildCartItemFromRoom(room, pendingIntent);
    const duplicate = cartItems.some((item) => item.cartKey === cartItem.cartKey);

    if (!duplicate) {
      dispatch(addToCart(cartItem));
      toast.success(`${pendingIntent.roomName || room.name || "Room"} added to your cart.`);
    } else {
      toast.success("This room is already in your cart.");
    }

    removeStoredValue(STORAGE_KEYS.pendingCartIntent, "session");

    if (pendingIntent.redirectToCart) {
      navigate("/cart", { replace: true });
    }
  }, [cartItems, dispatch, isAuthenticated, navigate, pendingIntent, roomResponse]);

  return null;
}

function CartSessionManager() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const ownerKey = isAuthenticated ? user?._id || user?.id || null : null;

  useEffect(() => {
    dispatch(syncCartForUser(ownerKey));
  }, [dispatch, ownerKey]);

  return null;
}

const ProtectedElement = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

function App() {
  return (
    <>
      <AuthSessionManager />
      <CartSessionManager />
      <PendingCartResumeManager />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="hotel/:id" element={<HotelDetails />} />
            <Route path="rooms" element={<AllRooms />} />
            <Route path="room/:id" element={<SingleRoom />} />
            <Route path="search" element={<Search />} />

            <Route path="booking/:id" element={<ProtectedElement><Booking /></ProtectedElement>} />
            <Route path="cart" element={<ProtectedElement><Cart /></ProtectedElement>} />
            <Route path="payment" element={<ProtectedElement><Payment /></ProtectedElement>} />
            <Route path="payment/:id" element={<ProtectedElement><Payment /></ProtectedElement>} />
            <Route path="confirmation/:id" element={<ProtectedElement><Confirmation /></ProtectedElement>} />
            <Route path="dashboard" element={<ProtectedElement><Dashboard /></ProtectedElement>} />
            <Route path="bookings" element={<ProtectedElement><Dashboard /></ProtectedElement>} />
            <Route path="profile" element={<ProtectedElement><Profile /></ProtectedElement>} />
            <Route path="settings" element={<ProtectedElement><Settings /></ProtectedElement>} />
            <Route path="wishlist" element={<ProtectedElement><Wishlist /></ProtectedElement>} />
            <Route path="offers" element={<Offers />} />
            <Route path="notifications" element={<ProtectedElement><Notifications /></ProtectedElement>} />

            <Route path="auth/login" element={<Login />} />
            <Route path="auth/register" element={<Register />} />
            <Route path="auth/otp" element={<Otp />} />
            <Route path="auth/forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<NewPassword />} />
            <Route path="oauth-success" element={<OAuthSuccess />} />

            <Route path="about" element={<About />} />
            <Route path="aboutus" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="contactus" element={<Contact />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="privacyanduse" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermAndUse />} />
            <Route path="termanduse" element={<TermAndUse />} />
            <Route path="careers" element={<Careers />} />
            <Route path="blog" element={<Blog />} />
            <Route path="partnership" element={<Partnership />} />
            <Route path="support" element={<HelpCenter />} />
            <Route path="support/faqs" element={<HelpCenter />} />
            <Route path="helpcenter" element={<HelpCenter />} />
            <Route path="help" element={<HelpCenter />} />
            <Route path="cancellationpolicy" element={<CancellationPolicy />} />
            <Route path="support/cancellation" element={<CancellationPolicy />} />
            <Route path="sitemap" element={<ComingSoon title="Sitemap" />} />
            <Route path="destinations" element={<ComingSoon title="Destinations" description="Explore our curated list of premium destinations." />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(15, 28, 68, 0.95)",
            color: "#fff",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "14px",
            padding: "14px 20px",
            fontSize: "0.875rem",
            fontWeight: "600",
            fontFamily: "'Inter', sans-serif",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          },
          success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />
    </>
  );
}

export default App;
