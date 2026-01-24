// import { useGetAllReviewsQuery, useUpdateReviewMutation } from "../../services/reviewService";
import { toast, Toaster } from "react-hot-toast";

const PendingReviews = () => {
  const { data, isLoading, isError, refetch } = useGetAllReviewsQuery();
  const [updateReview] = useUpdateReviewMutation();




  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg font-medium">Loading pending reviews...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">
        Failed to load reviews.
      </div>
    );
  }

  
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pending Reviews</h1>
        <p className="text-sm text-gray-600 mt-1">
          Review and approve guest feedback ({pending.length} pending)
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pending.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No pending reviews to show.
                  </td>
                </tr>
              ) : (
                pending.map((r, index) => (
                  <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{r.userId?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{r.hotelId?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-yellow-500 font-bold">{r.rating} ⭐</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={r.comment}>
                      {r.comment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleApprove(r._id)}
                          className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-md text-xs font-bold hover:bg-green-600 hover:text-white transition-all"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleFeedback(r._id)}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                        >
                          Feedback
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

export default PendingReviews;