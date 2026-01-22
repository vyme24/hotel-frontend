import { useParams, Link } from "react-router-dom";
import { useGetPaymentQuery } from "../../services/paymentService";

const Invoice = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPaymentQuery(id);

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading invoice...</div>;
  }

  if (isError || !data?.data) {
    return <div className="p-6 text-red-500">Invoice not found.</div>;
  }

  const payment = data.data;
  const booking = payment.bookingId;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>
          <Link
            to="/payments"
            className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Back
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Invoice ID</p>
            <p className="font-medium">{payment._id}</p>
          </div>
          <div>
            <p className="text-gray-500">Transaction</p>
            <p className="font-medium">{payment.transactionId}</p>
          </div>
          <div>
            <p className="text-gray-500">Guest</p>
            <p className="font-medium">{payment.userId?.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Hotel</p>
            <p className="font-medium">{booking?.hotelId?.name}</p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Room Price</span>
            <span>₹{booking?.price?.roomPrice || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span>₹{booking?.price?.taxes || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>- ₹{booking?.price?.discount || 0}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total</span>
            <span>₹{booking?.price?.totalAmount || payment.amount}</span>
          </div>
        </div>

        <div className="text-xs text-gray-400">
          Paid on{" "}
          {payment.paidAt
            ? new Date(payment.paidAt).toDateString()
            : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
