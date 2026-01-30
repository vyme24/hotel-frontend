import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/Footer/About.jsx";
import Contact from "./pages/Contact";

import NotFound from "./pages/NotFound";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgetPassword";

import Addhotel from "./pages/auth/Addhotel";
import NewPassword from "./pages/auth/NewPassword";
import Facilities from "./pages/Facilities.jsx";
import SingleHotel from "./pages/Singlehotel.jsx";
import Checkout from "./pages/Checkout.jsx";

import PrivacyandPolicy from "./pages/Footer/PrivacyandPolicy.jsx";
import Contactus from "./pages/Footer/ContactUs.jsx";
import Aboutus from "./pages/Footer/About.jsx";
import Termanduse from "./pages/Footer/TermandUse.jsx";
import Careers from "./pages/Footer/Careers.jsx";
import Blog from "./pages/Footer/Blog.jsx";
import Booking from "./pages/Footer/Bookings.jsx";
import Cancellationpolicy from "./pages/Footer/CancellationPolicy.jsx";
import Helpcenter from "./pages/Footer/HelpCenter.jsx";
import Partnership from "./pages/Footer/Partnership.jsx";




function App() {
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addhotel" element={<Addhotel />} />
        <Route path="/hotel/:id" element={<SingleHotel />} />
        <Route path="/facilities" element={<Facilities />} />
         <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<NewPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout/:id" element={<Checkout />} />



{/*footer */}
        <Route path="/privacyanduse" element={<PrivacyandPolicy />} />
        <Route path="/termanduse" element={<Termanduse />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/helpcenter" element={<Helpcenter />} />
        <Route path="/bookings" element={<Booking/>} />
        <Route path="/cancellationpolicy" element={<Cancellationpolicy />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
