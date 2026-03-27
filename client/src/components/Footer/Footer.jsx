import { Link } from "react-router-dom";
import { Hotel, Twitter, Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const handleNewsletter = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <div className="footer__logo-icon">L</div>
              <span className="footer__logo-text">Lux<span>Stay</span></span>
            </Link>
            <p className="footer__tagline">
              Discover extraordinary stays at the world's finest hotels. Your luxury journey begins with LuxStay.
            </p>
            <div className="footer__social">
              {[
                { icon: <Twitter size={16} />, href: "#" },
                { icon: <Instagram size={16} />, href: "#" },
                { icon: <Facebook size={16} />, href: "#" },
                { icon: <Linkedin size={16} />, href: "#" },
              ].map((s, i) => (
                <a key={i} href={s.href} className="footer__social-link">{s.icon}</a>
              ))}
            </div>
            <div className="footer__newsletter">
              <p>Subscribe for exclusive deals</p>
              <form className="footer__newsletter-form" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  className="footer__newsletter-input"
                  placeholder="Your email address"
                  required
                />
                <button type="submit" className="footer__newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Explore */}
          <div className="footer__col">
            <h4>Explore</h4>
            <ul className="footer__links">
              <li><Link to="/hotels">All Hotels</Link></li>
              <li><Link to="/offers">Special Offers</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/rooms">Room Types</Link></li>
              <li><Link to="/facilities">Facilities</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer__col">
            <h4>Support</h4>
            <ul className="footer__links">
              <li><Link to="/helpcenter">Help Center</Link></li>
              <li><Link to="/cancellationpolicy">Cancellation Policy</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer__col">
            <h4>Legal</h4>
            <ul className="footer__links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Use</Link></li>
              <li><Link to="/sitemap">Sitemap</Link></li>
              <li><Link to="/partnership">Partnership</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} <span>LuxStay</span>. All rights reserved. Crafted with ♥
          </p>
          <div className="footer__bottom-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}