import { Link } from "react-router-dom";
import { useGetAllHotelsQuery } from "../../services/hotelService";

const FeaturedListings = () => {
  const { data, isLoading, isError } = useGetAllHotelsQuery();

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading featured listings...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load listings.</div>;
  }


  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Featured Listings
        </h1>

        <Link
          to="/hotels"
          className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
        >
          All Hotels
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No featured listings found.
          </div>
        )}

        {featured.map((h) => (
          <div
            key={h._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <div className="h-40 bg-gray-100 rounded-md mb-3 flex items-center justify-center text-gray-400">
              Image
            </div>

            <h3 className="text-lg font-semibold text-gray-800">{h.name}</h3>
            <p className="text-sm text-gray-500">{h.brand || "—"}</p>

            <div className="flex items-center justify-between mt-2 text-sm">
              <span className="text-gray-600">{h.propertyType}</span>
              <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                Featured
              </span>
            </div>

            <div className="mt-3">
              <Link
                to={`/hotels/${h._id}`}
                className="inline-block text-sm text-blue-600 hover:underline"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedListings;
