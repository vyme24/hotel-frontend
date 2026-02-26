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
  Sparkles
} from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gray-900 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 rounded-full mb-8 border border-red-600/20">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
              LuxStay Journal
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter">
            The Art of <span className="text-red-600 italic">Travel</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Curated narratives on global hospitality, architectural gems, and the secrets of the world's most elite destinations.
          </p>

          <div className="max-w-xl mx-auto relative group">
            <input
              type="search"
              placeholder="Search the archives..."
              className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-red-600/50 focus:bg-white/10 transition-all duration-500 backdrop-blur-sm"
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600 transition-colors" />
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Featured <span className="text-red-600 italic">Stories</span></h2>
              <p className="mt-2 text-gray-400 font-light uppercase tracking-widest text-[10px]">Editor's choice for this month</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-red-600 transition-colors">
              View All Archives
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { author: "Evelyn Reed", date: "Oct 26, 2024", title: "Hidden Gem Hotels in Europe", desc: "Discover the architectural wonders hidden deep within the heart of the continent.", color: "from-red-600 to-red-900" },
              { author: "Julian Vane", date: "Oct 24, 2024", title: "The New Era of High-Tech Stays", desc: "How AI and biocitric controls are redefining the luxury guest experience.", color: "from-gray-800 to-black" },
              { author: "Marcus Thorne", date: "Oct 22, 2024", title: "Bali: Beyond the Tourist Trails", desc: "An executive's guide to finding true isolation in Indonesia's crown jewel.", color: "from-red-900 to-black" }
            ].map((post, i) => (
              <div key={i} className="group bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transform hover:-translate-y-2 transition-all duration-500">
                <div className={`h-64 bg-gradient-to-br ${post.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute bottom-6 left-6">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-white/80 uppercase tracking-widest">
                      <Bookmark size={12} className="text-red-500 fill-red-500" />
                      Long Read
                    </div>
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-50 dark:border-gray-800 pb-6">
                    <span className="flex items-center gap-2"><User size={12} className="text-red-600" /> {post.author}</span>
                    <span className="flex items-center gap-2"><Calendar size={12} className="text-red-600" /> {post.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight leading-tight group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light mb-8 leading-relaxed">
                    {post.desc}
                  </p>
                  <button className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-900 dark:text-white hover:text-red-600 transition-colors">
                    Engage Article
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-16">

          {/* Latest Articles */}
          <div className="lg:col-span-2 space-y-12">
            <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">The Latest <span className="text-red-600 italic">Dispatches</span></h2>

            {[
              { cat: "Business Travel", title: "Ultimate Guide for Executive Stays", desc: "Optimizing your travel workflow across the world's most connected luxury hubs.", color: "bg-red-50 text-red-600 border-red-100" },
              { cat: "Solo Travel", title: "The Solitude of Sanctuary", desc: "Finding peace and security in the world's most social hospitality environments.", color: "bg-gray-100 text-gray-901 border-gray-200" }
            ].map((article, i) => (
              <div key={i} className="group bg-white dark:bg-gray-950 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 transition-all hover:border-red-600/20">
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${article.color}`}>
                    {article.cat}
                  </span>
                  <div className="flex gap-4 text-gray-300">
                    <button className="hover:text-red-600 transition-colors"><Bookmark size={18} /></button>
                    <button className="hover:text-red-600 transition-colors"><Share2 size={18} /></button>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-red-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-light mb-8 max-w-xl leading-relaxed">
                  {article.desc}
                </p>
                <button className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-red-600">
                  Detailed Briefing
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-12">

            {/* Categories */}
            <div className="bg-white dark:bg-gray-950 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight italic">Categories</h3>
              <div className="space-y-4">
                {[
                  { label: "Travel Theory", count: 45 },
                  { label: "Booking Logic", count: 32 },
                  { label: "Tech Architecture", count: 19 }
                ].map((cat, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-pointer border-b border-gray-50 dark:border-gray-800 pb-4">
                    <span className="flex items-center text-sm font-bold text-gray-600 dark:text-gray-400 group-hover:text-red-600 transition-colors">
                      <Tag size={14} className="mr-3 text-red-600" /> {cat.label}
                    </span>
                    <span className="text-[10px] font-black text-gray-300 dark:text-gray-600">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="bg-white dark:bg-gray-950 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center mb-8">
                <TrendingUp className="text-red-600 mr-3" size={20} />
                <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight italic">Viral Dispatches</h3>
              </div>

              <div className="space-y-8">
                {[
                  { title: "Bali on a High Altitude", views: "25K" },
                  { title: "The Zero-Carbon Hotel", views: "18K" }
                ].map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                    <p className="text-sm font-black text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-red-600 transition-colors">{item.title}</p>
                    <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <Eye size={12} className="mr-2 text-red-600" /> {item.views} Intelligence
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Blog;
