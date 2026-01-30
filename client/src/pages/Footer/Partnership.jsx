import React from "react";
import {
  Handshake,
  Building,
  Users,
  Globe,
  Shield,
  TrendingUp,
  BarChart,
  DollarSign,
  Headphones,
  Award,
  Zap,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

const Partnership = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 rounded-full">
              <Handshake className="h-14 w-14" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Partnership Programs
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6">
            Grow your business with BookMyHotelRoom
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Building size={16} /> 50K+ Hotels
            </div>
            <div className="flex items-center gap-2">
              <Globe size={16} /> 150+ Countries
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} /> 5K+ Partners
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Types */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Partnership Opportunities
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <Building className="text-blue-600 mb-2" />
              <h3 className="font-bold">Hotel Partnership</h3>
              <p className="text-sm text-gray-600 mb-3">
                List your hotel and reach global customers.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• More bookings</li>
                <li>• Global reach</li>
                <li>• Marketing help</li>
                <li>• Live inventory</li>
              </ul>
              <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded">
                Learn More
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <Users className="text-blue-600 mb-2" />
              <h3 className="font-bold">Travel Agencies</h3>
              <p className="text-sm text-gray-600 mb-3">
                Earn commission with every booking.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Good commission</li>
                <li>• Support team</li>
                <li>• Training</li>
                <li>• Marketing tools</li>
              </ul>
              <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded">
                Learn More
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <Globe className="text-blue-600 mb-2" />
              <h3 className="font-bold">Corporate</h3>
              <p className="text-sm text-gray-600 mb-3">
                Travel solutions for companies.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Bulk discounts</li>
                <li>• Account manager</li>
                <li>• Reports</li>
                <li>• Easy integration</li>
              </ul>
              <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded">
                Learn More
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <Shield className="text-blue-600 mb-2" />
              <h3 className="font-bold">Tech Partners</h3>
              <p className="text-sm text-gray-600 mb-3">
                Integrate with our platform.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• API access</li>
                <li>• Tech support</li>
                <li>• Co-marketing</li>
                <li>• Revenue share</li>
              </ul>
              <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Partner Benefits
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <TrendingUp className="text-blue-600 mb-2" />
              <h3 className="font-bold">More Revenue</h3>
              <p className="text-sm text-gray-600">Reach more customers.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <BarChart className="text-blue-600 mb-2" />
              <h3 className="font-bold">Insights</h3>
              <p className="text-sm text-gray-600">Live reports and data.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <DollarSign className="text-blue-600 mb-2" />
              <h3 className="font-bold">Best Commission</h3>
              <p className="text-sm text-gray-600">High earning potential.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <Headphones className="text-blue-600 mb-2" />
              <h3 className="font-bold">24/7 Support</h3>
              <p className="text-sm text-gray-600">We are always with you.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <Award className="text-blue-600 mb-2" />
              <h3 className="font-bold">Brand Growth</h3>
              <p className="text-sm text-gray-600">More visibility.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <Zap className="text-blue-600 mb-2" />
              <h3 className="font-bold">Quick Setup</h3>
              <p className="text-sm text-gray-600">Fast onboarding.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Ready to Partner?
            </h2>
            <p className="text-gray-600 mb-6">
              Our team will contact you within 24 hours.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-blue-600" />
                partnerships@bookmyhotelroom.com
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-blue-600" />
                +1 (800) 123-4567
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-600" />
                Book a 30-min call
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">Get Started</h3>
            <form className="space-y-4">
              <input className="w-full p-3 border rounded" placeholder="First Name" />
              <input className="w-full p-3 border rounded" placeholder="Last Name" />
              <input className="w-full p-3 border rounded" placeholder="Company Name" />
              <input className="w-full p-3 border rounded" placeholder="Email" />
              <select className="w-full p-3 border rounded">
                <option>Select partnership type</option>
                <option>Hotel</option>
                <option>Agency</option>
                <option>Corporate</option>
                <option>Technology</option>
              </select>
              <textarea className="w-full p-3 border rounded" rows="4" placeholder="Message"></textarea>
              <button className="w-full py-3 bg-blue-600 text-white rounded flex items-center justify-center">
                Submit <ChevronRight className="ml-2" size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Partnership;
