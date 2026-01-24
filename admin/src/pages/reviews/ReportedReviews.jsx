import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const ReportedReviews = () => {
  const { data, isLoading, isError, refetch } = useGetAllReviewsQuery();
  const [deleteReview] = useDeleteReviewMutation();


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg font-medium">Loading reported reviews...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">
        Failed to load reported reviews.
      </div>
    );
  }


  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reported Reviews</h1>
          <p className="text-sm text-gray-600 mt-1">
            Review and take action on reviews flagged by users ({reported.length} reported)
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Hotel</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Comment</th>
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reported.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No reported reviews found.
                  </td>
                </tr>
              ) : (
                reported.map((r, index) => (
                  <tr key={r._id} className="hover:bg-red-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900">{r.userId?.name || "Guest User"}</div>
                      <div className="text-xs text-gray-500">{r.userId?.email || "No email"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                      {r.hotelId?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-yellow-500 font-bold">{r.rating} ⭐</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={r.comment}>
                      {r.comment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          to={`/reviews/${r._id}`}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(r._id)}
                          className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs font-bold hover:bg-red-600 hover:text-white transition-all"
                        >
                          Delete
                        </button>
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

export default ReportedReviews;