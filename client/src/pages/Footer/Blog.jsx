import React from "react";
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  Search,
  TrendingUp,
  Tag,
  Eye,
  Bookmark,
  Share2,
} from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            BookMyHotelRoom Blog
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6">
            Travel tips, hotel guides and booking secrets
          </p>

          <div className="max-w-xl mx-auto relative">
            <input
              type="search"
              placeholder="Search articles..."
              className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
            />
            <Search className="absolute right-4 top-3.5 text-gray-300" />
          </div>
        </div>
      </div>

      {/* Featured */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <div className="p-5">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <User size={14} className="mr-1" /> Sarah Johnson
                  <Calendar size={14} className="ml-4 mr-1" /> Oct 26, 2024
                </div>
                <h3 className="font-bold mb-2">
                  Hidden Gem Hotels in Europe
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Discover beautiful hotels away from the crowd.
                </p>
                <button className="text-blue-600 flex items-center text-sm">
                  Read More <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-green-500 to-teal-600"></div>
              <div className="p-5">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <User size={14} className="mr-1" /> Michael Chen
                  <Calendar size={14} className="ml-4 mr-1" /> Oct 24, 2024
                </div>
                <h3 className="font-bold mb-2">
                  Luxury Hotels at Budget Price
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Book 5-star hotels without overspending.
                </p>
                <button className="text-blue-600 flex items-center text-sm">
                  Read More <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-orange-500 to-pink-600"></div>
              <div className="p-5">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <User size={14} className="mr-1" /> Alex Rodriguez
                  <Calendar size={14} className="ml-4 mr-1" /> Oct 22, 2024
                </div>
                <h3 className="font-bold mb-2">
                  Future of Hotel Booking
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  How AI is changing hotel booking.
                </p>
                <button className="text-blue-600 flex items-center text-sm">
                  Read More <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Latest Articles</h2>

            <div className="bg-white p-5 rounded-xl shadow">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                Business Travel
              </span>
              <h3 className="font-bold mt-3 mb-2">
                Ultimate Guide for Business Hotels
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Everything you need for business stays.
              </p>
              <div className="flex justify-between items-center">
                <button className="text-blue-600 text-sm flex items-center">
                  Read Article <ArrowRight size={14} className="ml-1" />
                </button>
                <div className="flex gap-3 text-gray-400">
                  <Bookmark size={16} />
                  <Share2 size={16} />
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                Solo Travel
              </span>
              <h3 className="font-bold mt-3 mb-2">
                Best Hotels for Solo Travelers
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Safe and social hotel options.
              </p>
              <button className="text-blue-600 text-sm flex items-center">
                Read Article <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">

            {/* Categories */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-bold mb-3">Categories</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="flex items-center"><Tag size={14} className="mr-2" /> Travel Tips</span>
                  <span className="text-gray-500">45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center"><Tag size={14} className="mr-2" /> Booking Hacks</span>
                  <span className="text-gray-500">32</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center"><Tag size={14} className="mr-2" /> Technology</span>
                  <span className="text-gray-500">19</span>
                </div>
              </div>
            </div>

            {/* Trending */}
            <div className="bg-white p-5 rounded-xl shadow">
              <div className="flex items-center mb-3">
                <TrendingUp className="text-orange-500 mr-2" size={18} />
                <h3 className="font-bold">Trending</h3>
              </div>

              <div className="text-sm space-y-3">
                <div>
                  <p className="font-medium">Bali on Budget</p>
                  <div className="flex items-center text-gray-500">
                    <Eye size={14} className="mr-1" /> 25K views
                  </div>
                </div>
                <div>
                  <p className="font-medium">Green Hotels</p>
                  <div className="flex items-center text-gray-500">
                    <Eye size={14} className="mr-1" /> 18K views
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
