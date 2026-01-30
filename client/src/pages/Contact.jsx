import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Headset, MessageCircle, ChevronDown, User, Layers } from 'lucide-react';

const Contact = () => {
    // --- Reusable Tailwind Colors and Classes ---
    const primaryColor = 'text-red-600';
    const primaryBg = 'bg-red-600';
    const secondaryBg = 'bg-gray-800';
    const accentColor = 'text-yellow-400';
    const accentBg = 'bg-yellow-400';

    // --- Header Component (Tailwind Version) ---
    const Header = () => (
        <nav className={`fixed top-0 left-0 w-full z-30 ${secondaryBg} text-white shadow-md`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className={`w-9 h-9 ${accentBg} text-gray-900 rounded-full flex items-center justify-center font-bold text-lg`}>L</span>
                        <span className="font-bold text-xl">LuxStay</span>
                    </Link>

                    {/* Desktop Navigation (Simplified for brevity) */}
                    <div className="hidden md:flex space-x-4">
                        <Link to="/" className="px-3 py-2 text-sm font-medium hover:text-red-400 transition">Home</Link>
                        <Link to="/rooms" className="px-3 py-2 text-sm font-medium hover:text-red-400 transition">Rooms</Link>
                        <Link to="/about" className="px-3 py-2 text-sm font-medium hover:text-red-400 transition">About</Link>
                        <Link to="/contact" className={`px-3 py-2 text-sm font-medium ${primaryColor} transition`}>Contact</Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex space-x-2">
                        <Link to="/login" className="px-4 py-2 border border-white text-white text-sm font-medium rounded-full hover:bg-white hover:text-gray-900 transition">Login</Link>
                        <Link to="/signup" className={`px-4 py-2 ${accentBg} text-gray-900 text-sm font-medium rounded-full hover:bg-yellow-500 transition`}>Sign Up</Link>
                    </div>
                    
                    {/* Mobile Toggler Placeholder */}
                    <button className="md:hidden p-2 rounded-md hover:bg-gray-700">
                        <Layers className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );

    // --- Accordion Item Component (Tailwind-compatible) ---
    const FaqItem = ({ id, question, answer }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="mb-4 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <button
                    className="flex justify-between items-center w-full p-5 text-left text-lg font-semibold text-gray-800 hover:bg-gray-50 transition"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {question}
                    <ChevronDown className={`w-5 h-5 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100 p-5 pt-0' : 'max-h-0 opacity-0'}`}
                >
                    <div className="text-gray-600 border-t pt-4">
                        {answer}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Header />

            <main className="pt-16">
                {/* Contact Hero Section */}
                <section className="bg-gray-100 py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
                            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                Have a question? Need help with booking? We're here 24/7 to assist you.
                            </p>
                            <div className="flex justify-center gap-6 sm:gap-10 flex-wrap">
                                <a href="tel:+919876543210" className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition">
                                    <Phone className={`w-6 h-6 ${primaryColor}`} />
                                    <span className="font-semibold">+91 98765 43210</span>
                                </a>
                                <a href="mailto:support@luxstay.in" className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition">
                                    <Mail className={`w-6 h-6 ${primaryColor}`} />
                                    <span className="font-semibold">support@luxstay.in</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Form + Info */}
                <section className="py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            
                            {/* Contact Form (lg:col-span-7) */}
                            <div className="lg:col-span-7">
                                <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 border border-gray-100">
                                    <h3 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                                    <form>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            
                                            {/* First Name */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                                                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" placeholder="John" required />
                                            </div>
                                            {/* Last Name */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                                                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" placeholder="Doe" required />
                                            </div>
                                            {/* Email */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                                <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" placeholder="john@example.com" required />
                                            </div>
                                            {/* Phone */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                                                <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" placeholder="+91 98765 43210" />
                                            </div>
                                            {/* Subject */}
                                            <div className="col-span-full">
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                                                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-red-500 focus:border-red-500">
                                                    <option>Booking Inquiry</option>
                                                    <option>Support Request</option>
                                                    <option>Partnership</option>
                                                    <option>Feedback</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            {/* Message */}
                                            <div className="col-span-full">
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                                                <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" rows={5} placeholder="How can we help you today?" required defaultValue={""} />
                                            </div>
                                            
                                            {/* Submit Button */}
                                            <div className="col-span-full mt-2">
                                                <button
                                                    type="submit"
                                                    className={`px-8 py-3 ${primaryBg} text-white text-base font-semibold rounded-full shadow-lg hover:bg-red-700 transition duration-300`}
                                                >
                                                    Send Message
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Contact Info & Map (lg:col-span-5) */}
                            <div className="lg:col-span-5">
                                <div className="h-full flex flex-col space-y-6">
                                    
                                    {/* Office Info */}
                                    <div className="bg-white rounded-xl shadow-lg p-6 flex-grow border border-gray-100">
                                        <h4 className="text-xl font-bold text-gray-900 mb-4">Our Office</h4>
                                        <div className="flex space-x-3 mb-4">
                                            <MapPin className={`w-5 h-5 flex-shrink-0 mt-1 ${primaryColor}`} />
                                            <div>
                                                <p className="mb-0 font-medium text-gray-900">LuxStay Headquarters</p>
                                                <p className="text-sm text-gray-600 mb-0">
                                                    12th Floor, Tech Tower
                                                    <br />
                                                    Andheri East, Mumbai 400072
                                                    <br />
                                                    Maharashtra, India
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-3">
                                            <Clock className={`w-5 h-5 flex-shrink-0 mt-1 ${primaryColor}`} />
                                            <div>
                                                <p className="mb-0 font-medium text-gray-900">Support Hours</p>
                                                <p className="text-sm text-gray-600 mb-0">
                                                    24 hours a day, 7 days a week
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Quick Contact Cards */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className={`rounded-xl ${primaryBg} text-white p-5 text-center shadow-lg h-full hover:shadow-xl transition duration-300`}>
                                            <Headset className="w-8 h-8 mx-auto mb-2" />
                                            <h6 className="mb-1 font-semibold">Call Us</h6>
                                            <small>+91 98765 43210</small>
                                        </div>
                                        <div className="rounded-xl bg-green-500 text-white p-5 text-center shadow-lg h-full hover:shadow-xl transition duration-300">
                                            <MessageCircle className="w-8 h-8 mx-auto mb-2" />
                                            <h6 className="mb-1 font-semibold">Live Chat</h6>
                                            <small>Available 24/7</small>
                                        </div>
                                    </div>
                                    
                                    {/* Map */}
                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex-grow min-h-[200px]">
                                        <iframe
                                            title="LuxStay Location Map"
                                            src="https://maps.google.com/maps?q=Andheri+East,+Mumbai,+India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                            width="100%"
                                            height="100%"
                                            className="min-h-[250px]"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-12 sm:py-20 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
                            <p className="text-lg text-gray-600 mt-2">Find quick answers to common queries</p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="space-y-4">
                                <FaqItem
                                    id="faq1"
                                    question="How do I modify or cancel my booking?"
                                    answer="You can modify or cancel your booking directly from your account dashboard. Most hotels allow free cancellation up to 24 hours before check-in."
                                />
                                <FaqItem
                                    id="faq2"
                                    question="Is my payment information secure?"
                                    answer="Yes! We use 256-bit SSL encryption and never store your card details. Payments are processed through trusted gateways like Razorpay and Paytm."
                                />
                                <FaqItem
                                    id="faq3"
                                    question="Do you have 24/7 customer support?"
                                    answer="Absolutely! Our support team is available round the clock via phone, email, and live chat to help with any booking-related issues."
                                />
                                <FaqItem
                                    id="faq4"
                                    question="Can I book for someone else?"
                                    answer="Yes! Just enter the guest's name during booking. You'll receive confirmation, and they can check in with valid ID."
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className={`${secondaryBg} text-white py-12`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                        
                        {/* Brand Info */}
                        <div className="col-span-2 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <span className={`w-10 h-10 ${accentBg} text-gray-900 rounded-full flex items-center justify-center font-bold text-xl`}>L</span>
                                <h5 className="mb-0 font-bold text-xl">LuxStay</h5>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Book luxury hotels with confidence. Best prices, verified reviews, and 24/7 support across India.
                            </p>
                        </div>

                        {/* Company */}
                        <div>
                            <h6 className={`font-semibold ${accentColor} mb-3`}>Company</h6>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="text-gray-400 hover:text-white text-sm transition">About Us</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-white text-sm transition">Careers</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-white text-sm transition">Press</Link></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h6 className={`font-semibold ${accentColor} mb-3`}>Support</h6>
                            <ul className="space-y-2">
                                <li><Link to="#" className="text-gray-400 hover:text-white text-sm transition">Help Center</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-white text-sm transition">Safety</Link></li>
                                <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm transition">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h6 className={`font-semibold ${accentColor} mb-3`}>Legal</h6>
                            <ul className="space-y-2">
                                <li><Link to="#" className="text-gray-400 hover:text-white text-sm transition">Privacy</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-white text-sm transition">Terms</Link></li>
                            </ul>
                        </div>

                        {/* Follow */}
                        <div>
                            <h6 className={`font-semibold ${accentColor} mb-3`}>Follow</h6>
                            <div className="flex space-x-3">
                                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.988H7.48V12h2.958V9.75c0-3.35 1.95-5.163 4.966-5.163 1.414 0 2.64.104 2.997.15v2.76h-1.921c-1.5 0-1.792.716-1.792 1.763V12h3.082l-.482 3.88h-2.594v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
                                </a>
                                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2A4.5 4.5 0 004 7.6v8.8c0 2.47 2.03 4.5 4.5 4.5h7.8c2.47 0 4.5-2.03 4.5-4.5V7.6A4.5 4.5 0 0016.2 4H7.6zm9.2 1.1a1 1 0 110 2 1 1 0 010-2zM12 9a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4z"/></svg>
                                </a>
                                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.68.88-.53 1.55-1.37 1.87-2.37-.83.5-1.75.85-2.73 1.04C18.2 4.87 17.15 4 15.96 4c-2.36 0-4.27 1.91-4.27 4.27 0 .33.04.66.12.98-3.55-.18-6.7-1.87-8.81-4.45-.37.63-.58 1.36-.58 2.14 0 1.48.75 2.78 1.88 3.55-.69-.02-1.34-.21-1.92-.53v.05c0 2.06 1.47 3.77 3.42 4.17-.36.1-.74.15-1.13.15-.27 0-.53-.03-.79-.07.54 1.7 2.11 2.92 3.97 2.95-1.46 1.14-3.3 1.83-5.29 1.83-.34 0-.68-.02-1.02-.06C3.61 20.35 5.76 21 8 21c7.25 0 11.23-6 11.23-11.23v-.57c.77-.56 1.45-1.25 1.99-2.04z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <hr className="my-8 border-gray-700" />
                    <div className="text-center">
                        <p className="text-sm text-gray-500 mb-0">
                            © 2025 LuxStay. All rights reserved. | Made with{" "}
                            <span className="text-red-500">Love</span> in India
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Contact;