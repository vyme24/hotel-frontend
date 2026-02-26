import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Send,
  Mail,
  Phone,
  Lock,
  Shield,
  CreditCard,
  MapPin,
  Award
} from "lucide-react";
import { PiPinterestLogoFill } from "react-icons/pi";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes("@") && email.includes(".")) {
      // Simulate successful subscription (frontend only)
      setSubscriptionStatus("success");
      setEmail("");
      setTimeout(() => setSubscriptionStatus(null), 3000);
    } else {
      setSubscriptionStatus("error");
      setTimeout(() => setSubscriptionStatus(null), 3000);
    }
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/luxstay",
      color: "hover:text-[#1877f2]"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/luxstay",
      color: "hover:text-[#e4405f]"
    },
    {
      name: "Telegram",
      icon: Send,
      url: "https://t.me/luxstay_concierge",
      color: "hover:text-[#0088cc]"
    },
    {
      name: "Pinterest",
      icon: PiPinterestLogoFill,
      url: "https://pinterest.com/luxstay",
      color: "hover:text-[#bd081c]"
    }
  ];

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Hotels", path: "/hotels" },
    { label: "Rooms", path: "/rooms" },
    { label: "Destinations", path: "/destinations" },
    { label: "Deals & Offers", path: "/offers" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "FAQs", path: "/support/faqs" },
    ...(isAuthenticated ? [{ label: "My Bookings", path: "/bookings" }] : [])
  ];

  const popularLocations = [
    { name: "Delhi", path: "/destinations/delhi" },
    { name: "Mumbai", path: "/destinations/mumbai" },
    { name: "Goa", path: "/destinations/goa" },
    { name: "Manali", path: "/destinations/manali" },
    { name: "Shimla", path: "/destinations/shimla" },
    { name: "Jaipur", path: "/destinations/jaipur" }
  ];

  const hotelTypes = [
    { name: "Luxury Hotels", path: "/hotels/luxury" },
    { name: "Boutique Hotels", path: "/hotels/boutique" },
    { name: "Budget Rooms", path: "/rooms/budget" },
    { name: "Family Stays", path: "/hotels/family" },
    { name: "Resorts", path: "/hotels/resorts" },
    { name: "Beachfront", path: "/destinations/beach" }
  ];

  const supportLinks = [
    { label: "Help Center", path: "/support" },
    { label: "Cancellation Policy", path: "/support/cancellation" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Refund Policy", path: "/support/refund" }
  ];

  const paymentMethods = [
    { name: "Visa", icon: "/icons/visa.svg" },
    { name: "Mastercard", icon: "/icons/mastercard.svg" },
    { name: "American Express", icon: "/icons/amex.svg" },
    { name: "PayPal", icon: "/icons/paypal.svg" },
    { name: "UPI", icon: "/icons/upi.svg" }
  ];

  return (
    <footer className="bg-white dark:bg-[#050505] border-t border-gray-100 dark:border-white/5 relative z-10 w-full overflow-hidden">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Brand Section - LG: col-span-3 */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-lg shadow-red-600/20">
                <span className="text-white font-bold text-xl">LS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
                  <span className="text-red-600">LUX</span>STAY
                </span>
                <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest -mt-1">
                  Luxury Stays
                </span>
              </div>
            </Link>

            <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">
              Premium Hotel & Room Bookings Worldwide
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">
              Experience luxury stays at the best prices with secure booking,
              24/7 support, and handpicked accommodations across the globe.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 px-3 py-1.5 rounded-xl">
                <Shield size={12} className="text-red-600" />
                <span>Secure Booking</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 px-3 py-1.5 rounded-xl">
                <Lock size={12} className="text-red-600" />
                <span>SSL Protected</span>
              </div>
            </div>
          </div>

          {/* Quick Links - LG: col-span-2 */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Locations - LG: col-span-2 */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6">
              Popular Cities
            </h3>
            <ul className="space-y-3">
              {popularLocations.map((location) => (
                <li key={location.path}>
                  <Link
                    to={location.path}
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all flex items-center gap-2 group"
                  >
                    <MapPin size={14} className="text-red-500 group-hover:scale-110 transition-transform" />
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hotel Types - LG: col-span-2 */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6">
              Hotel Types
            </h3>
            <ul className="space-y-3">
              {hotelTypes.map((type) => (
                <li key={type.path}>
                  <Link
                    to={type.path}
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    {type.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal - LG: col-span-3 */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:concierge@luxstay.com"
                className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <Mail size={16} />
                </div>
                concierge@luxstay.com
              </a>
              <a
                href="tel:+918894810531"
                className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <Phone size={16} />
                </div>
                +91 88948 10531
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter & Social Section */}
        <div className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Newsletter */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Subscribe to <span className="text-red-600">Exclusive Offers</span>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
                  Get special deals and early access to new luxury hotels
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium"
                    aria-label="Email for newsletter"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-2xl transition shadow-xl shadow-red-600/20 whitespace-nowrap active:scale-95"
                >
                  Join the Club
                </button>
              </form>

              {subscriptionStatus === "success" && (
                <p className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
                  <Shield size={16} />
                  You're in! Welcome to LuxStay.
                </p>
              )}

              {/* Payment Methods */}
              <div className="flex items-center gap-6 pt-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Shield size={14} className="text-red-500" />
                  Secure Protocol
                </span>
                <div className="flex items-center gap-3">
                  {[
                    { label: "VISA", color: "bg-blue-600/10 text-blue-600 border-blue-600/20" },
                    { label: "MC", color: "bg-orange-600/10 text-orange-600 border-orange-600/20" },
                    { label: "AMEX", color: "bg-cyan-600/10 text-cyan-600 border-cyan-600/20" },
                    { label: "UPI", color: "bg-green-600/10 text-green-600 border-green-600/20" },
                    { label: "PAYPAL", color: "bg-indigo-600/10 text-indigo-600 border-indigo-600/20" }
                  ].map((method) => (
                    <div
                      key={method.label}
                      className={`px-3 py-1.5 border rounded-lg text-[9px] font-black tracking-tighter ${method.color} shadow-sm group hover:scale-110 transition-all duration-300 cursor-default`}
                      title={method.label}
                    >
                      {method.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="lg:text-right space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                Connect With Us
              </h3>
              <div className="flex gap-4 lg:justify-end">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 border border-gray-100 dark:border-gray-700 ${social.color} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                    aria-label={`Visit our ${social.name} page`}
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>

              {/* Trust message */}
              <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2 lg:justify-end font-medium">
                <Lock size={14} className="text-green-500" />
                <span>Encrypted 256-bit SSL secure checkout</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              © {new Date().getFullYear()} LUXSTAY. Crafted for <span className="text-red-600">Excellence</span>.
            </p>
            <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              <Link to="/privacy" className="hover:text-red-600 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-red-600 transition-colors">
                Terms
              </Link>
              <Link to="/sitemap" className="hover:text-red-600 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}