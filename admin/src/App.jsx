import './App.css'
import AppLayout from './layouts/App';
import DashboardLayout from './layouts/Dashboard';
import Dashboard from './pages/Dashboard'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from './pages/Not-Found';
import Login from './pages/auth/Login';
import AddHotel from './pages/hotels/AddHotel';
import {Toaster} from "react-hot-toast"
import Users from './pages/Users';
import Profile from './pages/Profile';

// Bookings
import Bookings from './pages/bookings';
import NewBookings from './pages/bookings/NewBookings';
import ConfirmedBookings from './pages/bookings/ConfirmedBookings';
import CheckInToday from './pages/bookings/CheckInToday';
import CheckOutToday from './pages/bookings/CheckOutToday';
import CancelledBookings from './pages/bookings/CancelledBookings';
import RefundRequests from './pages/bookings/RefundRequests';
import BookingDetails from './pages/bookings/BookingDetails';

// Hotels
import Hotels from './pages/hotels';
import ActiveHotels from './pages/hotels/ActiveHotels';
import InactiveHotels from './pages/hotels/InactiveHotels';
import PendingHotels from './pages/hotels/PendingHotels';
import FeaturedHotels from './pages/hotels/FeaturedHotels';
import TrashHotels from './pages/hotels/TrashHotels';
import SingleHotel from './pages/hotels/SingleHotel';

// Rooms
import Rooms from './pages/rooms/Rooms';
import RoomTypes from './pages/rooms/RoomTypes';
import AvailableRooms from './pages/rooms/AvailableRooms';
import SoldOutRooms from './pages/rooms/SoldOutRooms';
import InactiveRooms from './pages/rooms/InactiveRooms';
import RoomInventory from './pages/rooms/RoomInventory';
import SingleRoom from './pages/rooms/SingleRoom';

// Guests
import Guests from './pages/guests';
import CurrentGuests from './pages/guests/CurrentGuests';
import GuestHistory from './pages/guests/GuestHistory';
import GuestDetails from './pages/guests/GuestDetails';

// Staff
import Staff from './pages/staff/Staff';
import RolesPermissions from './pages/staff/RolesPermissions';
import StaffAttendance from './pages/staff/StaffAttendance';

// Reviews
import Reviews from './pages/reviews/Reviews';
import PendingReviews from './pages/reviews/PendingReviews';
import ReportedReviews from './pages/reviews/ReportedReviews';

// Payments
import Payments from './pages/payments/AllPayments';
import SuccessfulPayments from './pages/payments/SuccessfulPayments';
import FailedPayments from './pages/payments/FailedPayments';
import PendingPayments from './pages/payments/PendingPayments';
import Invoice from './pages/payments/Invoice';
import Refunds from './pages/payments/Refunds';
import TaxesCharges from './pages/payments/TaxesCharges';

// Marketing
import Coupons from './pages/marketing/Coupons';
import Offers from './pages/marketing/Offers';
import FeaturedListings from './pages/marketing/FeaturedListings';

// Reports
import BookingReports from './pages/reports/BookingReports';
import RevenueReports from './pages/reports/RevenueReports';
import OccupancyReports from './pages/reports/OccupancyReports';
import CustomerReports from './pages/reports/CustomerReports';

// Settings
import GeneralSettings from './pages/settings/GeneralSettings';
import HotelSettings from './pages/settings/HotelSettings';
import PoliciesSettings from './pages/settings/PoliciesSettings';
import NotificationSettings from './pages/settings/NotificationSettings';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<AppLayout/>}>
            <Route path='login' element={<Login/>}/>
          </Route>

          <Route path='/' element={<DashboardLayout/>}>
  <Route index element={<Dashboard/>}/>
  <Route path="admin/dashboard" element={<Dashboard/>} />
  <Route path="/profile" element={<Profile/>} />

            {/* Booking Management */}
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/new" element={<NewBookings />} />
            <Route path="/bookings/confirmed" element={<ConfirmedBookings />} />
            <Route path="/bookings/check-in" element={<CheckInToday />} />
            <Route path="/bookings/check-out" element={<CheckOutToday />} />
            <Route path="/bookings/cancelled" element={<CancelledBookings />} />
            <Route path="/bookings/refunds" element={<RefundRequests />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />

            {/* Hotel Management */}
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/add" element={<AddHotel />} />
            <Route path="/hotels/active" element={<ActiveHotels />} />
            <Route path="/hotels/inactive" element={<InactiveHotels />} />
            <Route path="/hotels/pending" element={<PendingHotels />} />
            <Route path="/hotels/featured" element={<FeaturedHotels />} />
            <Route path="/hotels/trash" element={<TrashHotels />} />
            <Route path="/hotels/:id" element={<SingleHotel />} />

            {/* Room Management */}
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/types" element={<RoomTypes />} />
            <Route path="/rooms/available" element={<AvailableRooms />} />
            <Route path="/rooms/sold-out" element={<SoldOutRooms />} />
            <Route path="/rooms/inactive" element={<InactiveRooms />} />
            <Route path="/inventory" element={<RoomInventory />} />
            <Route path="/rooms/:id" element={<SingleRoom />} />

            {/* Guests */}
            <Route path="/guests" element={<Guests />} />
            <Route path="/guests/check-in" element={<CurrentGuests />} />
            <Route path="/guests/history" element={<GuestHistory />} />
            <Route path="/guests/:id" element={<GuestDetails />} />

            {/* Staff */}
            <Route path="/staff" element={<Staff />} />
            <Route path="/staff/roles" element={<RolesPermissions />} />
            <Route path="/staff/attendance" element={<StaffAttendance />} />

            {/* Reviews */}
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/reviews/pending" element={<PendingReviews />} />
            <Route path="/reviews/reported" element={<ReportedReviews />} />

            {/* Payments */}
            <Route path="/payments" element={<Payments />} />
            <Route path="/payments/success" element={<SuccessfulPayments />} />
            <Route path="/payments/failed" element={<FailedPayments />} />
            <Route path="/payments/pending" element={<PendingPayments />} />
            <Route path="/invoice/:id" element={<Invoice />} />
            <Route path="/refunds" element={<Refunds />} />
            <Route path="/taxes" element={<TaxesCharges />} />

            {/* Marketing */}
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/featured" element={<FeaturedListings />} />

            {/* Reports */}
            <Route path="/reports/bookings" element={<BookingReports />} />
            <Route path="/reports/revenue" element={<RevenueReports />} />
            <Route path="/reports/occupancy" element={<OccupancyReports />} />
            <Route path="/reports/customers" element={<CustomerReports />} />

            {/* Settings */}
            <Route path="/settings/general" element={<GeneralSettings />} />
            <Route path="/settings/hotel" element={<HotelSettings />} />
            <Route path="/settings/policies" element={<PoliciesSettings />} />
            <Route path="/settings/notifications" element={<NotificationSettings />} />

            {/* Users */}
            <Route path="/users" element={<Users />} />
          </Route>

          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" reverseOrder={false}/>
    </>
  )
}

export default App;
