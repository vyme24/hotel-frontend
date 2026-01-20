const Header = () => {
  return (
   <>
   <header className="header-area">
  <div className="header-top-bar padding-right-100px padding-left-100px">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="header-top-content">
            <div className="header-left">
              <ul className="list-items">
                <li>
                  <a href="#">
                    <i className="la la-phone me-1" />
                    (123) 123-456
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="la la-envelope me-1" />
                    trizen@example.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="header-top-content">
            <div className="header-right d-flex align-items-center justify-content-end">
              <div className="header-right-action">
                <div className="select-contain select--contain w-auto">
                  <select className="select-contain-select">
                    <option data-content='<span class="flag-icon flag-icon-id me-1"></span> Bahasa Indonesia'>
                      Bahasa Indonesia
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-de me-1"></span> Deutsch'>
                      Deutsch
                    </option>
                    <option
                      data-content='<span class="flag-icon flag-icon-us me-1"></span> English(US)'
                      selected=""
                    >
                      English US
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-gb-eng me-1"></span> English(UK)'>
                      English UK
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-ro me-1"></span> Romanian'>
                      Romanian
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-es me-1"></span> Español'>
                      Español
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-fr me-1"></span> Francais'>
                      Francais
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-it me-1"></span> Italiano'>
                      Italiano
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-pl me-1"></span> Polski'>
                      Polski
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-pt me-1"></span> Portuguese'>
                      Portuguese
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-tr me-1"></span> Turkish'>
                      Turkish
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-ru me-1"></span> Russian'>
                      Russian
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-jp me-1"></span> Japanese'>
                      Japanese
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-cn me-1"></span> Mandarin'>
                      Mandarin
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-tw me-1"></span> Mandarin Chinese'>
                      Mandarin Chinese
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-kr me-1"></span> Korean'>
                      Korean
                    </option>
                    <option data-content='<span class="flag-icon flag-icon-in me-1"></span> Hindi'>
                      Hindi
                    </option>
                  </select>
                </div>
              </div>
              <div className="header-right-action">
                <div className="select-contain select--contain w-auto">
                  <select className="select-contain-select">
                    <option value={1}>AED</option>
                    <option value={2}>AUD</option>
                    <option value={3}>BRL</option>
                    <option value={4}>CAD</option>
                    <option value={5}>CHF</option>
                    <option value={6}>CNY</option>
                    <option value={7}>EUR</option>
                    <option value={8}>GBP</option>
                    <option value={9}>HKD</option>
                    <option value={10}>IDR</option>
                    <option value={11}>INR</option>
                    <option value={12}>JPY</option>
                    <option value={13}>KRW</option>
                    <option value={14}>MYR</option>
                    <option value={15}>NZD</option>
                    <option value={16}>PHP</option>
                    <option value={17}>PLN</option>
                    <option value={18}>RUB</option>
                    <option value={19}>SAR</option>
                    <option value={20}>SGD</option>
                    <option value={21}>THB</option>
                    <option value={22}>TRY</option>
                    <option value={23}>TWD</option>
                    <option value={24} selected="">
                      USD
                    </option>
                    <option value={25}>VND</option>
                    <option value={26}>MXN</option>
                    <option value={27}>ARS</option>
                    <option value={28}>INR</option>
                  </select>
                </div>
              </div>
              <div className="header-right-action">
                <a
                  href="#"
                  className="theme-btn theme-btn-small theme-btn-transparent me-1"
                  data-bs-toggle="modal"
                  data-bs-target="#signupPopupForm"
                >
                  Sign Up
                </a>
                <a
                  href="#"
                  className="theme-btn theme-btn-small"
                  data-bs-toggle="modal"
                  data-bs-target="#loginPopupForm"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="header-menu-wrapper padding-right-100px padding-left-100px">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="menu-wrapper justify-content-between">
            <a href="#" className="down-button">
              <i className="la la-angle-down" />
            </a>
            <div className="logo">
              <a href="/">
                <img src="/images/logo.png" alt="logo" />
              </a>
              <div className="menu-toggler">
                <i className="la la-bars" />
                <i className="la la-times" />
              </div>
              {/* end menu-toggler */}
            </div>
            {/* end logo */}
            <div className="main-menu-content pe-0 ms-0">
              <nav>
                <ul>
                  <li>
                    <a href="/">
                      Home 
                    </a>
                  </li>
               
                  <li>
                    <a href="#">
                      Hotel <i className="la la-angle-down" />
                    </a>
                    <ul className="dropdown-menu-item">
                      <li>
                        <a href="hotel-grid.html">Hotel grid</a>
                      </li>
                      <li>
                        <a href="hotel-list.html">Hotel list</a>
                      </li>
                      <li>
                        <a href="hotel-sidebar.html">Hotel sidebar </a>
                      </li>
                      <li>
                        <a href="hotel-single.html">Hotel details</a>
                      </li>
                      <li>
                        <a href="hotel-booking.html">Hotel Booking</a>
                      </li>
                      <li>
                        <a href="hotel-search-result.html">
                          Hotel Search Result
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Rooms <i className="la la-plus" />
                        </a>
                        <ul className="sub-menu">
                          <li>
                            <a href="room-list.html">Room List</a>
                          </li>
                          <li>
                            <a href="room-grid.html">Room Grid</a>
                          </li>
                          <li>
                            <a href="room-search-result.html">Search Result</a>
                          </li>
                          <li>
                            <a href="room-search-result-list.html">
                              Search Result list
                            </a>
                          </li>
                          <li>
                            <a href="room-details.html">Room Details</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                 
                </ul>
              </nav>
            </div>
            {/* end main-menu-content */}
            <div className="nav-btn">
              <a href="become-local-expert.html" className="theme-btn">
                Become Local Expert
              </a>
            </div>
            {/* end nav-btn */}
          </div>
          {/* end menu-wrapper */}
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
    </div>
    {/* end container-fluid */}
  </div>
  {/* end header-menu-wrapper */}
</header>

   </>
  );
};

export default Header;