import React, { useState } from "react";
// Lucide Icons (Tailwind ecosystem standard) replacing Bootstrap Icons
import { Building2, Home, Soup, Dribbble, Plus, Minus, Check } from 'lucide-react'; 

// 1. DUMMY DATA FOR FACILITIES
const facilityData = [
  {
    title: "ACADEMIC BLOCKS & LABS",
    icon: Building2, // Lucide Icon Component
    features: ["State-of-the-art Classrooms", "Advanced Research Labs", "High-speed Wi-Fi Campus", "Dedicated Computer Centers"],
  },
  {
    title: "HOSTEL & ACCOMMODATION",
    icon: Home, // Lucide Icon Component
    features: ["Separate Boys and Girls Hostels", "24/7 Security and Warden", "Nutritious Mess Facilities", "Recreational Common Rooms"],
  },
  {
    title: "CAFETERIA & DINING",
    icon: Soup, // Lucide Icon Component
    features: ["Multi-cuisine Options Available", "Hygienic and Clean Environment", "Spacious Seating Area", "Snacks and Beverages Counter"],
  },
  {
    title: "SPORTS & FITNESS",
    icon: Dribbble, // Lucide Icon Component
    features: ["Outdoor Fields and Courts", "Indoor Games Area", "Modern Gymnasium", "Trained Sports Coaches"],
  },
];


const Facilities = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCard = (index) => {
    // Allows closing the currently open card or opening a new one
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderCards = (startIndex, endIndex) => {
    return facilityData.slice(startIndex, endIndex).map((facility, index) => {
      // Calculate the true index from the original array (0, 1, 2, 3)
      const trueIndex = startIndex + index;
      const isActive = activeIndex === trueIndex;
      const IconComponent = facility.icon;
      const ToggleIcon = isActive ? Minus : Plus;

      return (
        <div
          key={trueIndex}
          className={`
            bg-white rounded-xl shadow-lg transition-all duration-300 cursor-pointer mb-6 border-2 
            ${isActive ? "border-red-600 shadow-2xl scale-[1.01]" : "border-gray-200 hover:shadow-xl"}
          `}
          onClick={() => toggleCard(trueIndex)}
        >
          {/* Card Header */}
          <div className="flex justify-between items-center p-6 sm:p-8">
            <div className="flex items-center space-x-4">
              {/* Icon */}
              <div className={`
                w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full transition-colors duration-300
                ${isActive ? "bg-red-600 text-white" : "bg-red-100 text-red-600"}
              `}>
                <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              
              {/* Title */}
              <h3 className={`
                text-lg sm:text-xl font-extrabold transition-colors duration-300
                ${isActive ? "text-red-700" : "text-gray-900"}
              `}>{facility.title}</h3>
            </div>
            
            {/* Toggle Icon (Plus/Minus) */}
            <ToggleIcon className={`w-6 h-6 text-gray-500 transition-transform duration-330 ${isActive ? 'rotate-0 text-red-600' : 'rotate-0'}`} />
          </div>

          {/* Card Body - Content (Accordion effect using Tailwind) */}
          <div 
            className={`
              transition-all duration-300 ease-in-out overflow-hidden
              ${isActive ? 'max-h-96 opacity-100 p-6 pt-0 sm:p-8 sm:pt-0' : 'max-h-0 opacity-0'}
            `}
          >
            <div className={`pt-4 border-t ${isActive ? 'border-red-100' : 'border-gray-100'}`}>
                <ul className="space-y-3">
                {facility.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-700 text-base">
                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        {feature}
                    </li>
                ))}
                </ul>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 flex items-center justify-center space-x-4">
            <span className="h-0.5 w-8 bg-red-600 hidden sm:inline-block"></span>
            <span className="tracking-widest">CAMPUS FACILITIES</span>
            <span className="h-0.5 w-8 bg-red-600 hidden sm:inline-block"></span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 justify-center">

          {/* Left Column - Cards 0 and 1 */}
          <div>
            {renderCards(0, 2)}
          </div>

          {/* Right Column - Cards 2 and 3 */}
          <div>
            {renderCards(2, 4)}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Facilities;