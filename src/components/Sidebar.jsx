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
          <a href="/admin/dashboard">
            <i className="la la-dashboard me-2" />
            Dashboard
          </a>
        </li>

        {/* Booking Management */}
        <li>
          <span className="side-menu-icon toggle-menu-icon">
            <i className="la la-angle-down" />
          </span>
          <a href="#">
            <i className="la la-shopping-cart me-2 text-color" />
            Booking Management
          </a>
          <ul className="toggle-drop-menu">
            <li><a href="/bookings">All Bookings</a></li>
            <li><a href="/bookings/new">New Bookings</a></li>
            <li><a href="/bookings/confirmed">Confirmed</a></li>
            <li><a href="/bookings/check-in">Check-in Today</a></li>
            <li><a href="/bookings/check-out">Check-out Today</a></li>
            <li><a href="/bookings/cancelled">Cancelled</a></li>
            <li><a href="/bookings/refunds">Refund Requests</a></li>
          </ul>
        </li>

        {/* Hotel Management */}
        <li>
          <span className="side-menu-icon toggle-menu-icon">
            <i className="la la-angle-down" />
          </span>
          <a href="#">
            <i className="la la-hotel me-2 text-color-2" />
            Hotel Management
          </a>
          <ul className="toggle-drop-menu">
            <li><a href="/hotels">All Hotels</a></li>
            <li><a href="/hotels/active">Active Hotels</a></li>
            <li><a href="/hotels/inactive">Inactive Hotels</a></li>
            <li><a href="/hotels/pending">Pending Approval</a></li>
            <li><a href="/hotels/featured">Featured Hotels</a></li>
            <li><a href="/hotels/trash">Trash</a></li>
          </ul>
        </li>

        {/* Room Management */}
        <li>
          <span className="side-menu-icon toggle-menu-icon">
            <i className="la la-angle-down" />
          </span>
          <a href="#">
            <i className="la la-bed me-2 text-color-3" />
            Room Management
          </a>
          <ul className="toggle-drop-menu">
            <li><a href="/rooms">All Rooms</a></li>
            <li><a href="/rooms/types">Room Types</a></li>
            <li><a href="/rooms/available">Available Rooms</a></li>
            <li><a href="/rooms/sold-out">Sold Out</a></li>
            <li><a href="/rooms/inactive">Inactive Rooms</a></li>
            <li><a href="/inventory">Room Inventory</a></li>
          </ul>
        </li>

        {/* Guests / Customers */}
        <li>
          <span className="side-menu-icon toggle-menu-icon">
            <i className="la la-angle-down" />
          </span>
          <a href="#">
            <i className="la la-users me-2 text-color-4" />
            Guests / Customers
          </a>
          <ul className="toggle-drop-menu">
            <li><a href="/guests">All Guests</a></li>
            <li><a href="/guests/check-in">Currently Staying</a></li>
            <li><a href="/guests/history">Guest History</a></li>
          </ul>
        </li>

        {/* Staff / Roles */}
        <li>
          <span className="side-menu-icon toggle-menu-icon">
            <i className="la la-angle-down" />
          </span>
          <a href="#">
            <i className="la la-id-badge me-2 text-color-5" />
            Staff & Roles
          </a>
          <ul className="toggle-drop-menu">
            <li><a href="/staff">All Staff</a></li>
            <li><a href="/staff/roles">Roles & Permissions</a></li>
            <li><a href="/staff/attendance">Attendance</a></li>
          </ul>
        </li>

        {/* Reviews */}
        <li>
          <span className="side-menu-icon toggle-menu-icon">
            <i className="la la-angle-down" />
          </span>
          <a href="#">
            <i className="la la-star me-2 text-color-6" />
            Reviews & Ratings
          </a>
          <ul className="toggle-drop-menu">
            <li><a href="/reviews">All Reviews</a></li>
            <li><a href="/reviews/pending">Pending Approval</a></li>
            <li><a href="/reviews/reported">Reported Reviews</a></li>
          </ul>
        </li>

        {/* Finance */}
        <li>
          <span className="side-menu-icon toggle-menu-icon">
            <i className="la la-angle-down" />
          </span>
          <a href="#">
            <i className="la la-area-chart me-2 text-color-7" />
            Finance & Payments
          </a>
          <ul className="toggle-drop-menu">
            <li><a href="/payments">All Payments</a></li>
            <li><a href="/payments/success">Successful</a></li>
            <li><a href="/payments/failed">Failed</a></li>
            <li><a href="/payments/pending">Pending</a></li>
            <li><a href="/invoice">Invoices</a></li>
            <li><a href="/refunds">Refunds</a></li>
            <li><a href="/taxes">Taxes & Charges</a></li>
          </ul>
        </li>

        {/* Marketing */}
        <li>
          <span className="side-menu-icon toggle-menu-icon">
            <i className="la la-angle-down" />
          </span>
          <a href="#">
            <i className="la la-bullhorn me-2 text-color-8" />
            Marketing
          </a>
          <ul className="toggle-drop-menu">
            <li><a href="/coupons">Coupons</a></li>
            <li><a href="/offers">Offers & Deals</a></li>
            <li><a href="/featured">Featured Listings</a></li>
          </ul>
        </li>

        {/* Reports */}
        <li>
          <span className="side-menu-icon toggle-menu-icon">
            <i className="la la-angle-down" />
          </span>
          <a href="#">
            <i className="la la-bar-chart me-2 text-color-9" />
            Reports
          </a>
          <ul className="toggle-drop-menu">
            <li><a href="/reports/bookings">Booking Report</a></li>
            <li><a href="/reports/revenue">Revenue Report</a></li>
            <li><a href="/reports/occupancy">Occupancy Report</a></li>
            <li><a href="/reports/customers">Customer Report</a></li>
          </ul>
        </li>

        {/* Settings */}
        <li>
          <span className="side-menu-icon toggle-menu-icon">
            <i className="la la-angle-down" />
          </span>
          <a href="#">
            <i className="la la-cog me-2 text-color-10" />
            Settings
          </a>
          <ul className="toggle-drop-menu">
            <li><a href="/settings/general">General Settings</a></li>
            <li><a href="/settings/hotel">Hotel Settings</a></li>
            <li><a href="/settings/policies">Policies</a></li>
            <li><a href="/settings/notifications">Notifications</a></li>
          </ul>
        </li>

        {/* Logout */}
        <li>
          <a href="/logout">
            <i className="la la-power-off me-2 text-color-11" />
            Logout
          </a>
        </li>

      </ul>
    </div>
    {/* end sidebar-menu-wrap */}
  </div>
</div>


  );
}

export default Sidebar;