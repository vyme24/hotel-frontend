import React, { useState } from "react";
import axios from "axios";

const Addhotel = () => {
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState(0);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [availability, setAvailability] = useState("true"); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !location || rooms < 1 || price < 100) {
      alert("Please fill all required fields correctly.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Assuming token is needed for authorization

      const res = await axios.post(`/api/hotels/addHotel`, {
          name,
        rooms,
        location,
        price,
        availability: availability === "true", // Convert string back to boolean for API
      },
      {
        headers: {
          Authorization: token,
        },
      }
      );

      alert(res.data.message || "Hotel added successfully!");
      
    } catch (err) {
      console.error(err);
      
      const errorMessage = err.response 
        ? (err.response.data.message || `Error: Status ${err.response.status}`)
        : "An error occurred. Check your network connection.";
          
      alert(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-start justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 sm:p-10 mt-10 rounded-xl shadow-2xl border border-gray-100">

        <div className="text-center"> 
          <h4 className="text-3xl font-extrabold text-gray-900">
            Add New Hotel Details
          </h4>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          
          <div className="rounded-md shadow-sm space-y-4">
            
            <div>
              <label htmlFor="hotel-name" className="block text-sm font-medium text-gray-700">Hotel Name</label>
              <input
                id="hotel-name"
                type="text"
                placeholder="e.g., The Grand Hotel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm mt-1"
              />
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="rooms" className="block text-sm font-medium text-gray-700">Number of Rooms</label>
                <input
                  id="rooms"
                  type="number"
                  placeholder="Minimum 1"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  required
                  min={1}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm mt-1"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (per night)</label>
                <input
                  id="price"
                  type="number"
                  placeholder="Minimum 100"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                  min={100}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm mt-1"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                id="location"
                type="text"
                placeholder="e.g., New Delhi"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm mt-1"
              />
            </div>
            
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
              <select
                id="availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm mt-1 bg-white"
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition duration-150"
          > 
            {loading ? "Adding..." : "Submit Hotel"}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Addhotel;