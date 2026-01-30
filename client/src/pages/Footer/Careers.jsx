import React from "react";
import {
  Briefcase,
  Users,
  Target,
  Award,
  Clock,
  DollarSign,
  Heart,
  MapPin,
  ChevronRight,
  Mail,
  GraduationCap,
  Zap,
  Phone,
} from "lucide-react";

const Careers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 rounded-full">
              <Briefcase className="h-14 w-14" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Careers at BookMyHotelRoom
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6">
            Join us to build the future of hotel booking.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users size={16} /> 200+ Team Members
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} /> Remote Friendly
            </div>
            <div className="flex items-center gap-2">
              <Target size={16} /> Fast Growing
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Why Join Us?</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <DollarSign className="text-blue-600 mb-2" />
              <h3 className="font-bold">Good Salary</h3>
              <p className="text-sm text-gray-600">Competitive pay with bonuses.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <Clock className="text-blue-600 mb-2" />
              <h3 className="font-bold">Flexible Hours</h3>
              <p className="text-sm text-gray-600">Work-life balance matters.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <Heart className="text-blue-600 mb-2" />
              <h3 className="font-bold">Health Care</h3>
              <p className="text-sm text-gray-600">Medical and wellness benefits.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <GraduationCap className="text-blue-600 mb-2" />
              <h3 className="font-bold">Learning</h3>
              <p className="text-sm text-gray-600">Budget for courses and growth.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <Award className="text-blue-600 mb-2" />
              <h3 className="font-bold">Rewards</h3>
              <p className="text-sm text-gray-600">Performance-based rewards.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <Zap className="text-blue-600 mb-2" />
              <h3 className="font-bold">Modern Tech</h3>
              <p className="text-sm text-gray-600">Work with latest tools.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Open Positions</h2>

          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h3 className="font-bold text-lg">Senior Full Stack Developer</h3>
            <p className="text-sm text-gray-600">Engineering • Remote • Full-time • 5+ years</p>
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded flex items-center justify-center">
              Apply Now <ChevronRight className="ml-2" size={16} />
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h3 className="font-bold text-lg">UX/UI Designer</h3>
            <p className="text-sm text-gray-600">Design • Delhi • Full-time • 3+ years</p>
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded flex items-center justify-center">
              Apply Now <ChevronRight className="ml-2" size={16} />
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg">Customer Success Manager</h3>
            <p className="text-sm text-gray-600">Operations • Remote • Full-time • 4+ years</p>
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded flex items-center justify-center">
              Apply Now <ChevronRight className="ml-2" size={16} />
            </button>
          </div>

          <div className="text-center mt-8">
            <a
              href="mailto:careers@bookmyhotelroom.com"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold"
            >
              <Mail size={16} /> Send General Application
            </a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-3">Ready to Join Us?</h2>
        <p className="text-gray-600 mb-6">
          Build your career with a fast-growing travel company.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/careers/apply" className="px-6 py-3 bg-blue-600 text-white rounded">
            View Openings
          </a>
          <a href="mailto:talent@bookmyhotelroom.com" className="px-6 py-3 border border-blue-600 text-blue-600 rounded">
            Contact HR
          </a>
        </div>
      </div>

    </div>
  );
};

export default Careers;
