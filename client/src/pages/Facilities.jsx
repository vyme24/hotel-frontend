import React, { useState } from "react";
import {
  Wifi,
  Waves,
  Sparkles,
  Car,
  Coffee,
  SquareParking,
  Dumbbell,
  ConciergeBell,
  ChevronDown,
  Check,
  Wind,
  Tv,
  Refrigerator,
  Bath,
  CupSoda,
  AlarmClock,
  Dog,
  Flower2,
  Fan,
  Cloud,
  VenetianMask
} from 'lucide-react';

// Hotel Amenities Data
const amenitiesData = [
  {
    category: "Connectivity & Entertainment",
    icon: Wifi,
    items: [
      { name: "Free High-Speed Wi-Fi", included: true },
      { name: "Smart TV with Streaming", included: true },
      { name: "Premium Cable Channels", included: true },
      { name: "Bluetooth Speaker", included: true },
    ],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    category: "Pool & Wellness",
    icon: Waves,
    items: [
      { name: "Infinity Swimming Pool", included: true },
      { name: "Jacuzzi / Hot Tub", included: true },
      { name: "Steam Room & Sauna", included: true },
      { name: "Yoga Deck", included: true },
    ],
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-500/10",
    iconColor: "text-cyan-600",
  },
  {
    category: "Spa & Relaxation",
    icon: Sparkles,
    items: [
      { name: "Ayurvedic Spa Treatments", included: true },
      { name: "Massage Services", included: true },
      { name: "Beauty Salon", included: true },
      { name: "Meditation Room", included: true },
    ],
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-500/10",
    iconColor: "text-purple-600",
  },
  {
    category: "Transportation",
    icon: Car,
    items: [
      { name: "Airport Pickup & Drop", included: true },
      { name: "City Tours", included: false },
      { name: "Car Rental Service", included: true },
      { name: "Valet Parking", included: true },
    ],
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    category: "Dining",
    icon: Coffee,
    items: [
      { name: "Complimentary Breakfast", included: true },
      { name: "24/7 Room Service", included: true },
      { name: "Multi-Cuisine Restaurant", included: true },
      { name: "In-room Mini Bar", included: true },
    ],
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    category: "Parking & Security",
    icon: SquareParking,
    items: [
      { name: "Free Secure Parking", included: true },
      { name: "24/7 CCTV Surveillance", included: true },
      { name: "Security Safe Deposit", included: true },
      { name: "Electric Vehicle Charging", included: false },
    ],
    color: "from-slate-500 to-gray-500",
    bgColor: "bg-slate-50 dark:bg-slate-500/10",
    iconColor: "text-slate-600",
  },
  {
    category: "Fitness",
    icon: Dumbbell,
    items: [
      { name: "Modern Gym Equipment", included: true },
      { name: "Personal Trainer", included: false },
      { name: "CrossFit Area", included: true },
      { name: "Yoga & Pilates Studio", included: true },
    ],
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-50 dark:bg-red-500/10",
    iconColor: "text-red-600",
  },
  {
    category: "Concierge Services",
    icon: ConciergeBell,
    items: [
      { name: "24/7 Front Desk", included: true },
      { name: "Luggage Storage", included: true },
      { name: "Tour Assistance", included: true },
      { name: "Laundry Service", included: true },
    ],
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-500/10",
    iconColor: "text-indigo-600",
  },
];

// Additional amenities for the "All Amenities" section
const allAmenities = [
  { name: "Air Conditioning", icon: Wind },
  { name: "LED TV", icon: Tv },
  { name: "Mini Refrigerator", icon: Refrigerator },
  { name: "Luxury Toiletries", icon: Bath },
  { name: "Tea/Coffee Maker", icon: CupSoda },
  { name: "Wake-up Service", icon: AlarmClock },
  { name: "Pet Friendly", icon: Dog },
  { name: "Garden Views", icon: Flower2 },
  { name: "Ceiling Fan", icon: Fan },
  { name: "Room Heater", icon: Cloud },
  { name: "Daily Housekeeping", icon: VenetianMask },
  { name: "Ironing Board", icon: Wind },
];

const Facilities = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const toggleCategory = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-50 dark:bg-red-900/10 rounded-full border border-red-100 dark:border-red-900/30">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">
              World Class Amenities
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Curated <span className="text-red-600 italic">Excellence</span>
          </h2>

          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Every feature is meticulously curated to provide an unparalleled experience of luxury, comfort, and sophisticated living.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenitiesData.map((amenity, index) => {
            const Icon = amenity.icon;
            const isExpanded = expandedCategory === index;

            return (
              <div
                key={index}
                className={`
                  group bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] overflow-hidden
                  transition-all duration-700 hover:bg-white dark:hover:bg-gray-900 
                  border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-red-600/5
                  ${isExpanded ? 'ring-2 ring-red-600/50 shadow-2xl' : 'shadow-sm'}
                `}
              >
                {/* Header */}
                <div
                  className="p-10 cursor-pointer"
                  onClick={() => toggleCategory(index)}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className={`
                      w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-xl shadow-black/5 flex items-center justify-center
                      group-hover:scale-110 group-hover:rotate-6 transition-all duration-500
                    `}>
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>

                    <div className={`
                        w-8 h-8 rounded-full border border-gray-100 dark:border-gray-700 flex items-center justify-center transition-all duration-500
                        ${isExpanded ? 'bg-red-600 border-red-600 rotate-180' : ''}
                    `}>
                      <ChevronDown className={`w-4 h-4 transition-colors ${isExpanded ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">
                    {amenity.category}
                  </h3>

                  {/* Preview Items */}
                  <div className="space-y-2">
                    {amenity.items.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-600 rounded-full" />
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                          {item.name}
                        </p>
                      </div>
                    ))}
                    {amenity.items.length > 2 && (
                      <p className="text-[10px] text-red-600 font-black uppercase tracking-[0.2em] mt-2">
                        + {amenity.items.length - 2} Luxury Features
                      </p>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                <div className={`
                  transition-all duration-700 ease-[0.22, 1, 0.36, 1] overflow-hidden
                  ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <div className="p-10 pt-0 border-t border-gray-100 dark:border-gray-800">
                    <ul className="space-y-4 pt-6">
                      {amenity.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-4 group/item">
                          <div className={`
                            w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                            ${item.included
                              ? 'bg-green-50 dark:bg-green-500/10 text-green-600'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-300'
                            }
                          `}>
                            <Check className="w-4 h-4" />
                          </div>
                          <span className={`
                            text-sm font-medium tracking-tight transition-colors
                            ${item.included
                              ? 'text-gray-700 dark:text-gray-200'
                              : 'text-gray-400 dark:text-gray-500 line-through'
                            }
                            group-hover/item:text-red-600
                          `}>
                            {item.name}
                          </span>
                          {!item.included && (
                            <span className="text-[9px] font-black uppercase bg-red-50 text-red-600 px-2 py-0.5 rounded-full ml-auto tracking-widest">Paid</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Gradient Accent */}
                <div className={`h-1.5 w-full bg-red-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700`} />
              </div>
            );
          })}
        </div>

        {/* All Amenities Section */}
        <div className="mt-24 relative">
          <div className="absolute inset-0 bg-red-600 rounded-[3rem] blur-3xl opacity-5" />
          <div className="relative bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl p-10 md:p-20 border border-gray-100 dark:border-gray-800">

            {/* Header */}
            <div className="text-center mb-16 space-y-4">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em] block">The Complete Index</span>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                Refined Infrastructure
              </h3>
              <p className="text-gray-400 font-light max-w-sm mx-auto italic">
                "No detail is too small when it comes to your comfort."
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(showAllAmenities ? allAmenities : allAmenities.slice(0, 8)).map((amenity, index) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/10 border border-transparent hover:border-red-100 dark:hover:border-red-900/30 transition-all duration-500 group/all"
                  >
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-gray-400 group-hover/all:text-red-600 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200 tracking-tight">
                      {amenity.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Show More Button */}
            {allAmenities.length > 8 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-500"
                >
                  <span>{showAllAmenities ? 'Condense Index' : `View All ${allAmenities.length} Features`}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${showAllAmenities ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Standard Luxury inclusions apply • Specialized services upon request
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;