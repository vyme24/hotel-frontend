import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar-nav sidebar--nav">
      <div className="sidebar-nav-body">
        <div className="side-menu-close">
          <i className="la la-times" />
        </div>

        {/* Admin Profile */}
        <div className="author-content">
          <div className="d-flex align-items-center">
            <div className="author-img avatar-sm">
              <img src="/images/team9.jpg" alt="admin" />
            </div>
            <div className="author-bio">
              <h4 className="author__title">Hotel Admin Panel</h4>
              <span className="author__meta">Manage Hotels, Rooms & Bookings</span>
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="sidebar-menu-wrap">
          <ul className="sidebar-menu toggle-menu list-items">

            {/* Dashboard */}
            <li className="page-active">
              <Link to="/admin/dashboard">
                <i className="la la-dashboard me-2" />
                Dashboard
              </Link>
            </li>

            {/* Booking Management */}
            <li>
              <span className="side-menu-icon toggle-menu-icon">
                <i className="la la-angle-down" />
              </span>
              <Link to="#">
                <i className="la la-shopping-cart me-2 text-color" />
                Booking Management
              </Link>
              <ul className="toggle-drop-menu">
                <li><Link to="/bookings">All Bookings</Link></li>
                <li><Link to="/bookings/new">New Bookings</Link></li>
                <li><Link to="/bookings/confirmed">Confirmed</Link></li>
                <li><Link to="/bookings/check-in">Check-in Today</Link></li>
                <li><Link to="/bookings/check-out">Check-out Today</Link></li>
                <li><Link to="/bookings/cancelled">Cancelled</Link></li>
                <li><Link to="/bookings/refunds">Refund Requests</Link></li>
              </ul>
            </li>

            {/* Hotel Management */}
            <li>
              <span className="side-menu-icon toggle-menu-icon">
                <i className="la la-angle-down" />
              </span>
              <Link to="#">
                <i className="la la-hotel me-2 text-color-2" />
                Hotel Management
              </Link>
              <ul className="toggle-drop-menu">
                <li><Link to="/hotels">All Hotels</Link></li>
                <li><Link to="/hotels/active">Active Hotels</Link></li>
                <li><Link to="/hotels/inactive">Inactive Hotels</Link></li>
                <li><Link to="/hotels/pending">Pending Approval</Link></li>
                <li><Link to="/hotels/featured">Featured Hotels</Link></li>
                <li><Link to="/hotels/trash">Trash</Link></li>
              </ul>
            </li>

            {/* Room Management */}
            <li>
              <span className="side-menu-icon toggle-menu-icon">
                <i className="la la-angle-down" />
              </span>
              <Link to="#">
                <i className="la la-bed me-2 text-color-3" />
                Room Management
              </Link>
              <ul className="toggle-drop-menu">
                <li><Link to="/rooms">All Rooms</Link></li>
                <li><Link to="/rooms/types">Room Types</Link></li>
                <li><Link to="/rooms/available">Available Rooms</Link></li>
                <li><Link to="/rooms/sold-out">Sold Out</Link></li>
                <li><Link to="/rooms/inactive">Inactive Rooms</Link></li>
                <li><Link to="/inventory">Room Inventory</Link></li>
              </ul>
            </li>

            {/* Guests / Customers */}
            <li>
              <span className="side-menu-icon toggle-menu-icon">
                <i className="la la-angle-down" />
              </span>
              <Link to="#">
                <i className="la la-users me-2 text-color-4" />
                Guests / Customers
              </Link>
              <ul className="toggle-drop-menu">
                <li><Link to="/guests">All Guests</Link></li>
                <li><Link to="/guests/check-in">Currently Staying</Link></li>
                <li><Link to="/guests/history">Guest History</Link></li>
              </ul>
            </li>

            {/* Staff / Roles */}
            <li>
              <span className="side-menu-icon toggle-menu-icon">
                <i className="la la-angle-down" />
              </span>
              <Link to="#">
                <i className="la la-id-badge me-2 text-color-5" />
                Staff & Roles
              </Link>
              <ul className="toggle-drop-menu">
                <li><Link to="/staff">All Staff</Link></li>
                <li><Link to="/staff/roles">Roles & Permissions</Link></li>
                <li><Link to="/staff/attendance">Attendance</Link></li>
              </ul>
            </li>

            {/* Reviews */}
            <li>
              <span className="side-menu-icon toggle-menu-icon">
                <i className="la la-angle-down" />
              </span>
              <Link to="#">
                <i className="la la-star me-2 text-color-6" />
                Reviews & Ratings
              </Link>
              <ul className="toggle-drop-menu">
                <li><Link to="/reviews">All Reviews</Link></li>
                <li><Link to="/reviews/pending">Pending Approval</Link></li>
                <li><Link to="/reviews/reported">Reported Reviews</Link></li>
              </ul>
            </li>

            {/* Finance */}
            <li>
              <span className="side-menu-icon toggle-menu-icon">
                <i className="la la-angle-down" />
              </span>
              <Link to="#">
                <i className="la la-area-chart me-2 text-color-7" />
                Finance & Payments
              </Link>
              <ul className="toggle-drop-menu">
                <li><Link to="/payments">All Payments</Link></li>
                <li><Link to="/payments/success">Successful</Link></li>
                <li><Link to="/payments/failed">Failed</Link></li>
                <li><Link to="/payments/pending">Pending</Link></li>
                <li><Link to="/invoice">Invoices</Link></li>
                <li><Link to="/refunds">Refunds</Link></li>
                <li><Link to="/taxes">Taxes & Charges</Link></li>
              </ul>
            </li>

            {/* Marketing */}
            <li>
              <span className="side-menu-icon toggle-menu-icon">
                <i className="la la-angle-down" />
              </span>
              <Link to="#">
                <i className="la la-bullhorn me-2 text-color-8" />
                Marketing
              </Link>
              <ul className="toggle-drop-menu">
                <li><Link to="/coupons">Coupons</Link></li>
                <li><Link to="/offers">Offers & Deals</Link></li>
                <li><Link to="/featured">Featured Listings</Link></li>
              </ul>
            </li>

            {/* Reports */}
            <li>
              <span className="side-menu-icon toggle-menu-icon">
                <i className="la la-angle-down" />
              </span>
              <Link to="#">
                <i className="la la-bar-chart me-2 text-color-9" />
                Reports
              </Link>
              <ul className="toggle-drop-menu">
                <li><Link to="/reports/bookings">Booking Report</Link></li>
                <li><Link to="/reports/revenue">Revenue Report</Link></li>
                <li><Link to="/reports/occupancy">Occupancy Report</Link></li>
                <li><Link to="/reports/customers">Customer Report</Link></li>
              </ul>
            </li>

            {/* Settings */}
            <li>
              <span className="side-menu-icon toggle-menu-icon">
                <i className="la la-angle-down" />
              </span>
              <Link to="#">
                <i className="la la-cog me-2 text-color-10" />
                Settings
              </Link>
              <ul className="toggle-drop-menu">
                <li><Link to="/settings/general">General Settings</Link></li>
                <li><Link to="/settings/hotel">Hotel Settings</Link></li>
                <li><Link to="/settings/policies">Policies</Link></li>
                <li><Link to="/settings/notifications">Notifications</Link></li>
              </ul>
            </li>

            {/* Logout */}
            <li>
              <Link to="/logout">
                <i className="la la-power-off me-2 text-color-11" />
                Logout
              </Link>
            </li>

          </ul>
        </div>
        {/* end sidebar-menu-wrap */}
      </div>
    </div>
  );
}

export default Sidebar;