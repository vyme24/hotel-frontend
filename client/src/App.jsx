import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import About from "./pages/Footer/About.jsx";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Addhotel from "./pages/auth/Addhotel";
import NewPassword from "./pages/auth/NewPassword";
import Facilities from "./pages/Facilities.jsx";
import SingleHotel from "./pages/SingleHotel.jsx";
import Checkout from "./pages/Checkout.jsx";
import Cart from "./pages/Cart";
import ProtectedRoute from "./routes/ProtectedRoute";

import PrivacyPolicy from "./pages/Footer/PrivacyandPolicy.jsx";
import TermAndUse from "./pages/Footer/TermandUse.jsx";
import Careers from "./pages/Footer/Careers.jsx";
import Blog from "./pages/Footer/Blog.jsx";
import Booking from "./pages/Footer/Bookings.jsx";
import CancellationPolicy from "./pages/Footer/CancellationPolicy.jsx";
import HelpCenter from "./pages/Footer/HelpCenter.jsx";
import Partnership from "./pages/Footer/Partnership.jsx";
import AppLayout from "./Layouts/App.jsx";
import SingleRoom from "./pages/SingleRoom.jsx";
import AllHotels from "./pages/AllHotels.jsx";
import AllRooms from "./pages/AllRooms.jsx";
import Search from "./pages/Search.jsx";
import OAuthSuccess from "./pages/auth/OAuthSuccess";

import Profile from "./pages/Profile.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Offers from "./pages/Offers.jsx";
import Destinations from "./pages/Destinations.jsx";
import Sitemap from "./pages/Sitemap.jsx";
import ComingSoon from "./pages/ComingSoon.jsx";

import MyBookings from "./pages/MyBookings.jsx";
import Notifications from "./pages/Notifications.jsx";
import Payment from "./pages/Payment.jsx";
import Settings from "./pages/Settings.jsx";
import { ThemeProvider } from "./hooks/ThemeContext.jsx";

// Mock Payment Success Page for now
const PaymentSuccess = () => (
  <ComingSoon
    title="Reservation Confirmed"
    description="Your luxury sanctuary has been secured. You will receive a confirmation email shortly with your concierge details."
  />
);

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/addhotel" element={<Addhotel />} />
          <Route path="/hotel/:id" element={<SingleHotel />} />
          <Route path="/hotels" element={<AllHotels />} />
          <Route path="/hotels/:category" element={<ComingSoon title="Collection" description="Our specialized collections are being curated by world-class travel experts." />} />

          <Route path="/search" element={<Search />} />
          <Route path="/room/:id" element={<SingleRoom />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:category" element={<ComingSoon title="Room Category" description="We are currently preparing these exclusive room types for our guests." />} />

          <Route path="/facilities" element={<Facilities />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:city" element={<Destinations />} />
          <Route path="/offers" element={<Offers />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/payment/:id" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/wishlist" element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } />

          <Route path="/reset-password/:token" element={<NewPassword />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          ...

          {/* Footer & Support Routes */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/privacyanduse" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermAndUse />} />
          <Route path="/termanduse" element={<TermAndUse />} />

          <Route path="/contactus" element={<Contact />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/partnership" element={<Partnership />} />


          <Route path="/support" element={<HelpCenter />} />
          <Route path="/support/faqs" element={<HelpCenter />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
          <Route path="/help" element={<HelpCenter />} />

          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />

          <Route path="/bookings" element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          } />

          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />

          <Route path="/support/cancellation" element={<CancellationPolicy />} />
          <Route path="/cancellationpolicy" element={<CancellationPolicy />} />

          <Route path="/support/refund" element={<ComingSoon title="Refund Policy" description="Our refund processing systems are being updated for maximum security." />} />

          <Route path="/sitemap" element={<Sitemap />} />

          <Route path="/oauth-success" element={<OAuthSuccess />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            padding: '16px 24px',
            fontSize: '11px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          },
          success: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App;
