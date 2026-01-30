import React from "react";
import {
  Hotel,
  Globe,
  Shield,
  Heart,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Star,
  Clock,
  CheckCircle,
  TrendingUp,
  ThumbsUp,
} from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

      {/* Hero */}
      <div className="bg-red-600 text-white py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 rounded-full">
              <Hotel className="h-14 w-14" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About BookMyHotelRoom
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6">
            Making hotel booking easy, safe, and affordable for everyone.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 px-5 py-2 rounded-full">
            <Star className="h-4 w-4 text-yellow-300" />
            <span>4.8/5 Rating</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">500K+</div>
            <div className="text-gray-600 text-sm">Happy Customers</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Hotel className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">50K+</div>
            <div className="text-gray-600 text-sm">Hotels</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Globe className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">150+</div>
            <div className="text-gray-600 text-sm">Countries</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-gray-600 text-sm">Support</div>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="mb-3">
              BookMyHotelRoom started in 2015 with one goal – make booking easy.
            </p>
            <p className="mb-3">
              From 100 hotels, we grew to 50,000+ hotels in 150+ countries.
            </p>
            <p>
              We grow with trust, technology, and customer happiness.
            </p>

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Best Price</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Instant Confirmation</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-xl font-bold mb-4">Milestones</h3>
            <p><b className="text-blue-600">2015</b> – Started with 100 hotels</p>
            <p><b className="text-blue-600">2017</b> – Reached 10,000 hotels</p>
            <p><b className="text-blue-600">2019</b> – Launched mobile app</p>
            <p><b className="text-blue-600">2021</b> – 5M bookings</p>
            <p><b className="text-blue-600">2023</b> – 150+ countries</p>
            <p><b className="text-blue-600">2024</b> – Best Booking Platform</p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <Shield className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-bold mb-1">Trust & Security</h3>
              <p className="text-sm text-gray-600">We keep your data and payments safe.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <Heart className="h-6 w-6 text-red-600 mb-2" />
              <h3 className="font-bold mb-1">Customer First</h3>
              <p className="text-sm text-gray-600">Your comfort is our priority.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <Globe className="h-6 w-6 text-green-600 mb-2" />
              <h3 className="font-bold mb-1">Global Access</h3>
              <p className="text-sm text-gray-600">Book hotels worldwide.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <Award className="h-6 w-6 text-purple-600 mb-2" />
              <h3 className="font-bold mb-1">Best Price</h3>
              <p className="text-sm text-gray-600">We offer the best deals.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-3">Ready to book your stay?</h2>
        <p className="text-gray-600 mb-6">
          Join millions who trust BookMyHotelRoom.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/search" className="px-6 py-3 bg-blue-600 text-white rounded">
            Search Hotels
          </a>
          <a href="/contact" className="px-6 py-3 border border-blue-600 text-blue-600 rounded">
            Contact Us
          </a>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
