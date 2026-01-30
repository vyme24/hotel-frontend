import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        
          <div>
            <h2 className="text-2xl font-extrabold mb-4">
              <span className="text-red-600">Lux</span>
              <span className="text-white">Stay</span>
            </h2>
            <p className="text-sm mb-4 leading-relaxed">
              Your one-stop solution for luxurious and budget-friendly hotel bookings across India.
            </p>
            <p className="text-sm">📍 Chandigarh, India</p>
            <p className="text-sm">✉ support@luxstay.in</p>
            <p className="text-sm">📞 +91 88948 10531</p>
          </div>

        
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-2">
          
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/aboutus" className="hover:text-red-500 transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-red-500 transition">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-red-500 transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/partnership" className="hover:text-red-500 transition">
                    Partnership
                  </Link>
                </li>
              </ul>
            </div>

         
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/contactus" className="hover:text-red-500 transition">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/helpcenter" className="hover:text-red-500 transition">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/bookings" className="hover:text-red-500 transition">
                    Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/cancellationpolicy" className="hover:text-red-500 transition">
                    Cancellation Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

         
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href="#"
                aria-label="Facebook"
                className="flex items-center gap-2 h-9 px-3 w-full rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Facebook size={16} />
                Facebook
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex items-center gap-2 h-9 px-3 w-full rounded-full bg-sky-500 text-white text-sm hover:bg-sky-600 transition focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <Twitter size={16} />
                Twitter
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex items-center gap-2 h-9 px-3 w-full rounded-full bg-pink-600 text-white text-sm hover:bg-pink-700 transition focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <Instagram size={16} />
                Instagram
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex items-center gap-2 h-9 px-3 w-full rounded-full bg-blue-800 text-white text-sm hover:bg-blue-900 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>

           
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3 text-sm">Stay Updated</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>    
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>
            © 2025 <span className="text-red-500 font-semibold">LuxStay</span>. All Rights Reserved.
          </p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <Link to="/privacyanduse" className="hover:text-red-500 transition">
              Privacy Policy
            </Link>
            <Link to="/termanduse" className="hover:text-red-500 transition">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>  </footer>
  );
};export default Footer;