import React from "react";
// Removed import '../css/Information.css'
import { MapPin, Clock, Phone, Mail, User, Utensils, Zap, Hotel, Thermometer } from 'lucide-react'; // Using Lucide icons for modern look

const Information = () => {
    // Accessing saved user information for personalization
    const managerName = "Arvind Singh"; // Using saved name
    const managerPhone = "8894810531"; // Using saved phone
    const managerEmail = "arvind889481@gmail.com"; // Using saved email
    
    // Formatting the phone number for display
    const formattedPhone = `+91 ${managerPhone.substring(0, 5)} ${managerPhone.substring(5)}`;
    const callLink = `tel:+91${managerPhone}`;

    return (
        <section className="py-12 sm:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Title */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 relative inline-block">
                        HOTEL INFORMATION
                        <span className="absolute left-0 right-0 bottom-[-10px] h-1 bg-red-600 rounded-full"></span>
                    </h2>
                </div>

                <div className="flex justify-center">
                    <div className="w-full lg:w-11/12">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* Left Side: Time & Dining */}
                            <div className="col-span-1">
                                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 h-full space-y-4">
                                    
                                    <div>
                                        <p className="text-xs font-semibold uppercase text-gray-500 mb-1">CHECK IN - CHECK OUT</p>
                                        <p className="text-lg font-medium text-gray-800">
                                            <Clock className="inline w-5 h-5 mr-2 text-red-600" /> Check-in: 2:00 PM
                                        </p>
                                        <p className="text-base text-gray-500 ml-7">
                                            Check-out: 12:00 Noon
                                        </p>
                                    </div>

                                    <hr className="my-4 border-gray-200" />

                                    <div>
                                        <p className="text-xs font-semibold uppercase text-gray-500 mb-1">DINING</p>
                                        <p className="text-lg font-medium text-gray-800">
                                            <Utensils className="inline w-5 h-5 mr-2 text-red-600" /> Multi-Cuisine Restaurant & Bar
                                        </p>
                                    </div>

                                    <hr className="my-4 border-gray-200" />

                                    <div>
                                        <p className="text-xs font-semibold uppercase text-gray-500 mb-1">CURRENT TEMPERATURE (Mumbai)</p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            <Thermometer className="inline w-7 h-7 mr-2 text-red-600" /> 28°C
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Middle: Facilities & GSTIN */}
                            <div className="col-span-1">
                                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 h-full space-y-4">
                                    
                                    <div>
                                        <p className="text-xs font-semibold uppercase text-gray-500 mb-1">ROOMS & CAPACITY</p>
                                        <p className="text-lg font-medium text-gray-800">
                                            <Hotel className="inline w-5 h-5 mr-2 text-red-600" /> 50+ Luxury Rooms & Suites
                                        </p>
                                    </div>

                                    <hr className="my-4 border-gray-200" />

                                    <div>
                                        <p className="text-xs font-semibold uppercase text-gray-500 mb-1">WELLNESS</p>
                                        <p className="text-lg font-medium text-gray-800">
                                            <Zap className="inline w-5 h-5 mr-2 text-red-600" /> Gym, Spa & Swimming Pool
                                        </p>
                                    </div>

                                    <hr className="my-4 border-gray-200" />

                                    <div>
                                        <p className="text-xs font-semibold uppercase text-gray-500 mb-1">HOTEL GSTIN</p>
                                        <p className="text-lg font-bold text-gray-900 tracking-wider">
                                            27AAXXX1234X1ZX
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Contact Details (Personalized) */}
                            <div className="col-span-1">
                                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 h-full space-y-4">
                                    
                                    <p className="text-xs font-semibold uppercase text-gray-500 mb-1">CONTACT US</p>
                                    
                                    <div className="border-b pb-4">
                                        <p className="text-lg font-medium text-gray-800">
                                            <MapPin className="inline w-5 h-5 mr-2 text-red-600" /> LuxStay Hotel
                                        </p>
                                        <p className="text-base text-gray-500 ml-7">
                                            Andheri East, Mumbai - 400059
                                        </p>
                                    </div>

                                    <div className="space-y-3 pt-3">
                                        <p className="text-lg font-medium text-gray-800">
                                            <User className="inline w-5 h-5 mr-2 text-red-600" /> {managerName} (Manager)
                                        </p>

                                        <p className="text-lg font-medium text-gray-800">
                                            <Mail className="inline w-5 h-5 mr-2 text-red-600" /> {managerEmail}
                                        </p>

                                        <p className="text-lg font-medium text-gray-800">
                                            <Phone className="inline w-5 h-5 mr-2 text-red-600" /> {formattedPhone}
                                        </p>
                                    </div>
                                    
                                    <div className="pt-4">
                                        <a href={callLink} className="inline-flex justify-center items-center w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200">
                                            CALL NOW
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Information;