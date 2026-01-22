import { Link } from "react-router-dom";
// import { useGetAllPaymentsQuery, useDeletePaymentMutation } from "../../services/paymentService";
import { toast, Toaster } from "react-hot-toast";

const statusColor = (status) => {
  switch (status) {
    case "success":
      return "bg-green-100 text-green-700 border-green-200";
    case "failed":
      return "bg-red-100 text-red-700 border-red-200";
    case "refunded":
      return "bg-purple-100 text-purple-700 border-purple-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const AllPayments = () => {
  const { data, isLoading, isError, refetch } = useGetAllPaymentsQuery();
  const [deletePayment] = useDeletePaymentMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment record?")) {
      try {
        await deletePayment(id).unwrap();
        toast.success("Payment record deleted");
        refetch();
      } catch (err) {
        toast.error("Failed to delete record");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg font-medium">Loading payments...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-2xl font-semibold">Failed to load payments</div>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const payments = data?.data || [];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Payments</h1>
          <p className="text-sm text-gray-600 mt-1">
            Total Transactions: {payments.length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Method</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500 font-medium">
                    No payment transactions found.
                  </td>
                </tr>
              ) : (
                payments.map((p, index) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-600">
                      {p.transactionId || p._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{p.userId?.name}</div>
                      <div className="text-xs text-gray-500">{p.userId?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">₹{p.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 capitalize">
                      {p.paymentMethod} <span className="text-[10px] text-gray-400">({p.paymentGateway})</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {p.paidAt ? new Date(p.paidAt).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusColor(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          to={`/payments/invoice/${p._id}`}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-bold hover:bg-blue-600 hover:text-white transition-all duration-200"
                        >
                          Invoice
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs font-bold hover:bg-red-600 hover:text-white transition-all duration-200"
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

export default AllPayments;