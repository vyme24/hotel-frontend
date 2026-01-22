import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllHotelsQuery } from '../../services/hotelService';

const Hotels = () => {
  const { isLoading, isError, data, isSuccess } = useGetAllHotelsQuery();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    if (isSuccess && data) {
      setHotels(data.data);
    }
  }, [data, isSuccess]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      console.log("Delete hotel:", id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg">Loading hotels...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-2xl font-semibold">Failed to load hotels</div>
          <p className="text-gray-600">Please try again later or contact support.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Hotels</h1>
        <p className="text-sm text-gray-600">
          Showing 1 to {hotels.length} of {hotels.length} entries
        </p>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Property Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Star</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {hotels.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No hotels found
                  </td>
                </tr>
              ) : (
                hotels.map((hotel, index) => (
                  <tr key={hotel._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <img
                        src={
                          hotel.images && hotel.images.length > 0
                            ? hotel.images[0]
                            : "/images/no-hotel.png"
                        }
                        alt={hotel.name}
                        className="w-40 h-24 object-cover rounded-lg border shadow-sm"
                      />
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {hotel.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {hotel.brand || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {hotel.propertyType}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {hotel.starRating ? `${hotel.starRating} ⭐` : "-"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          hotel.status === "active"
                            ? "bg-green-100 text-green-800"
                            : hotel.status === "inactive"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {hotel.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 space-x-2">
                      <Link
                        to={`/hotels/${hotel._id}`}
                        className="px-3 py-2 rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        View
                      </Link>

                      <Link
                        to={`/hotels/edit/${hotel._id}`}
                        className="px-3 py-2 rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500"
                      >
                        Edit
                      </Link>

                       <Link
                          to={`/hotels/delete/${hotel._id}`}
                          className="px-3 py-2 rounded-md text-white  bg-red-500"
                        >
                          Delete
                        </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
