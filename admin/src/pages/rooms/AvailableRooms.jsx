import { Link } from "react-router-dom";
import { useGetAllRoomsQuery } from "../../services/roomService";

const AvailableRooms = () => {
  const { data, isLoading, isError } = useGetAllRoomsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg">Loading rooms...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-2xl font-semibold">Failed to load rooms</div>
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

  const rooms =
    data?.data?.filter(
      (r) => r.status === "active" && (r.availableRooms || 0) > 0
    ) || [];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Available Rooms</h1>
        <p className="text-sm text-gray-600 mt-1">
          Total Available Room Types: {rooms.length}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hotel
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Max Guests
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500 font-medium">
                    No available rooms found at the moment.
                  </td>
                </tr>
              ) : (
                rooms.map((r, index) => (
                  <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={r.images && r.images.length > 0 ? r.images[0] : "/images/no-hotel.png"}
                        alt={r.roomTypeName}
                        className="w-20 h-12 object-cover rounded-lg border shadow-sm"
                        onError={(e) => { e.target.src = "/images/no-hotel.png"; }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {r.hotelId?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {r.roomTypeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {r.maxAdults}A + {r.maxChildren}C
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                        {r.availableRooms} Left
                      </span>
                    </td>
                    {/* Action Buttons */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          to={`/rooms/${r._id}`}
                          className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-md text-xs font-semibold hover:bg-green-600 hover:text-white transition-all duration-200"
                        >
                          View
                        </Link>
                        <Link
                          to={`/rooms/edit/${r._id}`}
                          className="inline-flex items-center px-3 py-1.5 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-md text-xs font-semibold hover:bg-yellow-500 hover:text-white transition-all duration-200"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/rooms/delete/${r._id}`}
                          className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs font-semibold hover:bg-red-600 hover:text-white transition-all duration-200"
                        >
                          Delete
                        </Link>
                      </div>
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

export default AvailableRooms;