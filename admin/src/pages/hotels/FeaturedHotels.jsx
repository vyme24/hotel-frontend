import { Link } from "react-router-dom";
import { useGetAllHotelsQuery } from "../../services/hotelService";

const FeaturedHotels = () => {
  const { data, isLoading, isError } = useGetAllHotelsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg">
          Loading featured hotels...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-2xl font-semibold">
            Failed to load hotels
          </div>
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

  const featured = data?.data?.filter((h) => h.isFeatured === true) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Featured Hotels</h1>
        <p className="text-sm text-gray-600">
          Total Featured Hotels: {featured.length}
        </p>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  No
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Brand
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Property Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Star
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {featured.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No featured hotels found
                  </td>
                </tr>
              ) : (
                featured.map((h, index) => (
                  <tr key={h._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <img
                        src={
                          h.images && h.images.length > 0
                            ? h.images[0]
                            : "/images/no-hotel.png"
                        }
                        alt={h.name}
                        className="w-40 h-24 object-cover rounded-lg border shadow-sm"
                      />
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {h.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {h.brand || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {h.propertyType}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {h.starRating ? `${h.starRating} ⭐` : "-"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        to={`/hotels/${h._id}`}
                        className="px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        View
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

export default FeaturedHotels;
