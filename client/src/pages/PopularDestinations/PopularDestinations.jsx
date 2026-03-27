import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Hotel } from 'lucide-react';

const PopularDestinations = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);


  const destinations = [
    {
      name: 'Goa',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      hotelCount: 245,
      path: '/hotels?location=goa',
    },
    {
      name: 'Manali',
      image: 'https://images.unsplash.com/photo-1626621341517-bfba3f99e822?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      hotelCount: 189,
      path: '/hotels?location=manali',
    },
    {
      name: 'Shimla',
      image: 'https://images.unsplash.com/photo-1589802829985-817e51171c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      hotelCount: 167,
      path: '/hotels?location=shimla',
    },
    {
      name: 'Jaipur',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      hotelCount: 312,
      path: '/hotels?location=jaipur',
    },
    {
      name: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      hotelCount: 567,
      path: '/hotels?location=mumbai',
    },
    {
      name: 'Delhi',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      hotelCount: 423,
      path: '/hotels?location=delhi',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-gray-950 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[100px] rounded-full -mr-48 -mt-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-red-600 text-xs font-black uppercase tracking-[0.34em] block decoration-red-600/30 underline underline-offset-8">
              World Discovery
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Popular <span className="text-red-600">Destinations</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg font-light leading-relaxed">
              Explore India's most coveted travel destinations, from serene beaches to majestic mountains.
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <div className="w-12 h-1.5 bg-red-600 rounded-full" />
            <div className="w-4 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {destinations.map((dest, index) => (
            <div
              key={dest.name}
              className={`
                group relative rounded-[2.5rem] overflow-hidden cursor-pointer
                transform transition-all duration-700 shadow-2xl shadow-black/5 hover:-translate-y-2 hover:shadow-xl
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
              `}
              style={{ transitionDelay: `${index * 150}ms`, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              onClick={() => navigate(dest.path)}
            >
              <div className="relative h-[450px]">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Multi-layer Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="absolute top-8 right-8">
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-white text-[10px] font-black uppercase tracking-widest translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    Explore Now
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-10 text-white transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-px bg-red-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">{dest.hotelCount}+ Properties</span>
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight leading-none">{dest.name}</h3>

                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group/btn">
                      <span>View Collection</span>
                      <ArrowRight className="w-4 h-4 transform transition-all group-hover/btn:translate-x-2 text-red-500" />
                    </button>
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
                      <MapPin size={16} className="text-red-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;