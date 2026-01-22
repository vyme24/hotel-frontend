import { useParams, Link } from "react-router-dom";
import { useGetRoomQuery } from "../../services/roomService";

const SingleRoom = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetRoomQuery(id);

  if (isLoading) return <div className="p-6">Loading room...</div>;
  if (isError || !data?.data) return <div className="p-6 text-red-500">Room not found.</div>;

  const r = data.data;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{r.roomTypeName}</h1>
        <Link to="/rooms" className="text-sm text-blue-600">Back</Link>
      </div>

      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <p><b>Hotel:</b> {r.hotelId?.name}</p>
        <p><b>Beds:</b> {r.bedType}</p>
        <p><b>Max Guests:</b> {r.maxAdults}+{r.maxChildren}</p>
        <p><b>Total Rooms:</b> {r.totalRooms}</p>
        <p><b>Available:</b> {r.availableRooms}</p>
        <p><b>Status:</b> {r.status}</p>
      </div>
    </div>
  );
};

export default SingleRoom;
