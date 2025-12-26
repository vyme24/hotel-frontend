const Sidebar = () => {
  return (
   <div className="sidebar-nav sidebar--nav">
  <div className="sidebar-nav-body">
    <div className="side-menu-close">
      <i className="la la-times" />
    </div>
    {/* end menu-toggler */}
    <div className="author-content">
      <div className="d-flex align-items-center">
        <div className="author-img avatar-sm">
          <img src="images/team9.jpg" alt="testimonial image" />
        </div>
        <div className="author-bio">
          <h4 className="author__title">Royel travel agency</h4>
          <span className="author__meta">Welcome to Admin Panel</span>
        </div>
      </div>
    </div>
    <div className="sidebar-menu-wrap">
      <ul className="sidebar-menu toggle-menu list-items">
        <li className="page-active">
          <a href="/">
            <i className="la la-dashboard me-2" />
            Dashboard
          </a>
        </li>
        <li>
          <a href="/booking">
            <i className="la la-shopping-cart me-2 text-color" />
            Booking
          </a>
        </li>
        <li>
          <span className="side-menu-icon toggle-menu-icon">
            <i className="la la-angle-down" />
          </span>
          <a href="admin-dashboard-orders.html">
            <i className="la la-list me-2 text-color-2" />
            Orders
          </a>
          <ul className="toggle-drop-menu">
            <li>
              <a href="admin-dashboard-orders-details.html">Order Details</a>
            </li>
          </ul>
        </li>
        <li>
          <span className="side-menu-icon toggle-menu-icon">
            <i className="la la-angle-down" />
          </span>
          <a href="admin-dashboard-travellers.html">
            <i className="la la-users me-2 text-color-3" />
            Travellers
          </a>
          <ul className="toggle-drop-menu">
            <li>
              <a href="admin-dashboard-traveler-detail.html">
                Traveller Details
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="admin-dashboard-visa.html">
            <i className="la la-plane me-2 text-color-4" />
            Visa Application
          </a>
        </li>
        <li>
          <a href="admin-dashboard-reviews.html">
            <i className="la la-star me-2 text-color-5" />
            Reviews
          </a>
        </li>
        <li>
          <a href="admin-dashboard-wishlist.html">
            <i className="la la-heart me-2 text-color-6" />
            Wishlist
          </a>
        </li>
        <li>
          <a href="admin-dashboard-travel-agents.html">
            <i className="la la-text-width me-2 text-color-7" />
            Travel Agents
          </a>
        </li>
        <li>
          <span className="side-menu-icon toggle-menu-icon">
            <i className="la la-angle-down" />
          </span>
          <a href="#">
            <i className="la la-area-chart me-2 text-color-8" />
            Finance
          </a>
          <ul className="toggle-drop-menu">
            <li>
              <a href="admin-invoice.html">Invoice</a>
            </li>
            <li>
              <a href="admin-payments.html">Payments</a>
            </li>
            <li>
              <a href="admin-currency-list.html">Currency List</a>
            </li>
            <li>
              <a href="admin-dashboard-subscribers.html">Subscribers</a>
            </li>
          </ul>
        </li>
        <li>
          <span className="side-menu-icon toggle-menu-icon">
            <i className="la la-angle-down" />
          </span>
          <a href="#">
            <i className="la la-map-signs me-2 text-color-9" />
            Locations
          </a>
          <ul className="toggle-drop-menu">
            <li>
              <a href="admin-countries.html">Countries</a>
            </li>
            <li>
              <a href="admin-airlines.html">Airlines</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="admin-dashboard-settings.html">
            <i className="la la-cog me-2 text-color-10" />
            Settings
          </a>
        </li>
        <li>
          <a href="index.html">
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