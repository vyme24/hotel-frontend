//  import { useGetAllCouponsQuery, useDeleteCouponMutation } from "../../services/couponService";
import { toast, Toaster } from "react-hot-toast";

const Offers = () => {
  //  const { data, isLoading, isError, refetch } = useGetAllCouponsQuery();
  //  const [deleteCoupon] = useDeleteCouponMutation();

  

  //  if (isLoading) {
  //    return (
  //      <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //        <div className="animate-pulse text-gray-500 text-lg font-medium">
  //          Loading active offers...
  //        </div>
  //      </div>
  //    );
  //  }

  //  if (isError) {
  //    return (
  //      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">
  //        Failed to load offers.
  //      </div>
  //    );
  //  }

 // return (
    <>
         {/* <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
       <Toaster position="top-right" />

      
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
           <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
             Active Offers & Coupons
           </h1>
           <p className="text-gray-500 mt-1 text-sm italic">
             Currently {offers.length} promotional deals are live.
           </p>
         </div>
         <button className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-100">
           + Create New Offer
         </button>
       </div>

    
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
         {offers.length === 0 ? (
           <div className="col-span-full bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
             <p className="text-gray-400 font-medium">
               No active offers available right now.
             </p>
           </div>
         ) : (
           offers.map((o) => (
             <div
               key={o._id}
               className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden 
                          hover:shadow-xl transition-all duration-300 group 
                          aspect-square flex flex-col justify-between"
             >
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-400"></div>

               <div className="p-6 flex-1 flex flex-col justify-between">
                 <div>
                   <div className="flex justify-between items-start">
                     <div className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-black tracking-widest uppercase border border-red-100 shadow-sm">
                       {o.code}
                     </div>
                     <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border border-green-200">
                       Live
                     </span>
                   </div>

                   <div className="mt-6">
                     <h3 className="text-4xl font-black text-gray-900 leading-tight">
                       {o.discountType === "percentage"
                         ? `${o.discountValue}%`
                         : `₹${o.discountValue}`}
                       <span className="text-sm font-bold text-gray-400 ml-1 uppercase tracking-tighter">
                         OFF
                       </span>
                     </h3>
                     <p className="text-gray-500 text-xs font-medium mt-2 uppercase tracking-wide">
                       On bookings above ₹{o.minBookingAmount || 0}
                     </p>
                   </div>
                 </div>

                 <div className="mt-6 flex flex-col space-y-1">
                   {o.maxDiscount && (
                     <div className="flex justify-between text-[11px]">
                       <span className="text-gray-400">Max Discount:</span>
                       <span className="font-bold text-gray-700">
                         ₹{o.maxDiscount}
                       </span>
                     </div>
                   )}
                   <div className="flex justify-between text-[11px]">
                     <span className="text-gray-400">Expires On:</span>
                     <span className="font-bold text-red-500 uppercase italic">
                       {o.validTo
                         ? new Date(o.validTo).toLocaleDateString("en-GB", {
                             day: "2-digit",
                             month: "short",
                             year: "numeric",
                           })
                         : "N/A"}
                     </span>
                   </div>
                 </div>
               </div>

               
               <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-between">
                 <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition">
                   Edit Details
                 </button>
                 <button
                   onClick={() => handleDelete(o._id)}
                   className="px-4 py-1.5 bg-red-50 text-red-700 border border-red-100 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all"
                 >
                   Delete
                 </button>
               </div>
             </div>
           ))
         )}
       </div>
     </div> */}
   

    </>
 // );
}

export default Offers;
