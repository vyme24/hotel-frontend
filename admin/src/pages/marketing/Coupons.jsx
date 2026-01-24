import { Link } from "react-router-dom";
import { useGetAllCouponsQuery } from "../../services/couponService";

const statusColor = (status) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700";
    case "expired":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const Coupons = () => {
  const { data, isLoading, isError } = useGetAllCouponsQuery();

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading coupons...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load coupons.</div>;
  }


  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Coupons</h1>

        <Link
          to="/marketing/add-coupon"
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm"
        >
          + Add Coupon
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Value</th>
              <th className="px-4 py-3 text-left">Min Amount</th>
              <th className="px-4 py-3 text-left">Valid Till</th>
              <th className="px-4 py-3 text-left">Usage</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {coupons.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  No coupons found.
                </td>
              </tr>
            )}

            {coupons.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{c.code}</td>
                <td className="px-4 py-3 capitalize">{c.discountType}</td>
                <td className="px-4 py-3">
                  {c.discountType === "percentage"
                    ? `${c.discountValue}%`
                    : `₹${c.discountValue}`}
                </td>
                <td className="px-4 py-3">₹{c.minBookingAmount || 0}</td>
                <td className="px-4 py-3">
                  {c.validTo ? new Date(c.validTo).toDateString() : "-"}
                </td>
                <td className="px-4 py-3">
                  {c.usedCount || 0}/{c.usageLimit || "∞"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(
                      c.status
                    )}`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coupons;
