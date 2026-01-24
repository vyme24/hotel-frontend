import { Link } from "react-router-dom";
import { useGetAllBookingsQuery } from "../../services/bookingService";

const Guests = () => {
  const { data, isLoading, isError } = useGetAllBookingsQuery();

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading guests...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load guests.</div>;
  }

  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Guests</h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Guest</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Hotel</th>
              <th className="px-4 py-3 text-left">Room</th>
              <th className="px-4 py-3 text-left">Check-In</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {uniqueGuests.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No current guests.
                </td>
              </tr>
            )}

            {uniqueGuests.map((b) => (
              <tr key={b._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{b.userId?.name}</td>
                <td className="px-4 py-3">{b.userId?.email}</td>
                <td className="px-4 py-3">{b.hotelId?.name}</td>
                <td className="px-4 py-3">{b.roomId?.roomTypeName}</td>
                <td className="px-4 py-3">
                  {new Date(b.checkInDate).toDateString()}
                </td>
                <td className="px-4 py-3 space-x-3">
                  <Link
                    to={`/guests/${b._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/guests/history/${b.userId?._id}`}
                    className="text-purple-600 hover:underline"
                  >
                    History
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Guests;
