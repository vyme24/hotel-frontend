import { useState } from "react";
// import { useGetAllReviewsQuery, useDeleteReviewMutation } from "../../services/reviewService";
import { toast, Toaster } from "react-hot-toast";

const Reviews = () => {
  const { data, isLoading, isError, refetch } = useGetAllReviewsQuery();
  const [deleteReview] = useDeleteReviewMutation();
  const [selectedRating, setSelectedRating] = useState("All");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg font-medium">Loading reviews...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-2xl font-semibold">Failed to load reviews</div>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const allReviews = data?.data || [];

  // Delete function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(id).unwrap();
        toast.success("Review deleted successfully");
        refetch();
      } catch (err) {
        toast.error("Failed to delete review");
      }
    }
  };

  // Filter logic
  const filteredReviews = selectedRating === "All" 
    ? allReviews 
    : allReviews.filter(r => r.rating === parseInt(selectedRating));

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Guest Reviews</h1>
          <p className="text-sm text-gray-600 mt-1">Manage all hotel ratings and feedback</p>
        </div>

        {/* Rating Filter Buttons */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-200">
          {["All", 5, 4, 3, 2, 1].map((rate) => (
            <button
              key={rate}
              onClick={() => setSelectedRating(rate)}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                selectedRating === rate 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {rate === "All" ? "All" : `${rate} ⭐`}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Hotel</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Comment</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No {selectedRating !== "All" ? `${selectedRating} star` : ""} reviews found.
                  </td>
                </tr>
              ) : (
                filteredReviews.map((r, index) => (
                  <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">{r.userId?.name || "Anonymous"}</div>
                      <div className="text-xs text-gray-500">{r.userId?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{r.hotelId?.name}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-yellow-500 font-bold">
                        {r.rating} <span className="text-xs">⭐</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 max-w-xs truncate" title={r.comment}>
                        {r.comment}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        r.isApproved 
                        ? "bg-green-100 text-green-700 border-green-200" 
                        : "bg-yellow-100 text-yellow-700 border-yellow-200"
                      }`}>
                        {r.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs font-bold hover:bg-red-600 hover:text-white transition-all duration-200"
                      >
                        Delete
                      </button>
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

export default Reviews;