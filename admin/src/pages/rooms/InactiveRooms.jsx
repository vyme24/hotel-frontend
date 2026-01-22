import { Link } from "react-router-dom";
import { useGetAllRoomsQuery } from "../../services/roomService";
// Maan lijiye aapke paas status update karne ke liye ye service hai
// import { useUpdateRoomStatusMutation } from "../../services/roomService"; 

const InactiveRooms = () => {
  const { data, isLoading, isError } = useGetAllRoomsQuery();
  // const [updateStatus] = useUpdateRoomStatusMutation();

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    if (window.confirm(`Are you sure you want to make this room ${newStatus}?`)) {
      console.log(`Changing status of ${id} to ${newStatus}`);
      // Yahan aapka API call aayega:
      // await updateStatus({ id, status: newStatus });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg">Loading inactive rooms...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-2xl font-semibold">Failed to load rooms</div>
          <button onClick={() => window.location.reload()} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const rooms = data?.data?.filter((r) => r.status === "inactive") || [];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inactive Rooms</h1>
          <p className="text-sm text-gray-600 mt-1">Total Inactive Room Types: {rooms.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Hotel</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Room Type</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">Manage Status</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">No inactive rooms found.</td>
                </tr>
              ) : (
                rooms.map((r, index) => (
                  <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4">
                      <img
                        src={r.images?.[0] || "/images/no-hotel.png"}
                        className="w-20 h-12 object-cover rounded-lg border"
                        alt="room"
                        onError={(e) => { e.target.src = "/images/no-hotel.png"; }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{r.hotelId?.name || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{r.roomTypeName}</td>
                    
                    {/* Status Toggle Button */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(r._id, r.status)}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                          r.status === "active" ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span className="sr-only">Toggle Status</span>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                            r.status === "active" ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                        <span className={`absolute text-[10px] font-bold uppercase ${r.status === "active" ? "left-1.5 text-white" : "right-1.5 text-gray-600"}`}>
                          {r.status === "active" ? "ON" : "OFF"}
                        </span>
                      </button>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <Link
                        to={`/rooms/${r._id}`}
                        className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-semibold hover:bg-blue-600 hover:text-white transition"
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

export default InactiveRooms;