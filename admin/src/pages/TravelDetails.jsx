const TravelDetails =()=>{
    return (
        <>
        <div className="dashboard-content-wrap">
  <div className="dashboard-bread dashboard--bread dashboard-bread-2">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="breadcrumb-content">
            <div className="section-heading">
              <h2 className="sec__title font-size-30 text-white">
                Traveller Details
              </h2>
            </div>
          </div>
          {/* end breadcrumb-content */}
        </div>
        {/* end col-lg-6 */}
        <div className="col-lg-6">
          <div className="breadcrumb-list text-end">
            <ul className="list-items">
              <li>
                <a href="index.html" className="text-white">
                  Home
                </a>
              </li>
              <li>Dashboard</li>
              <li>Traveller Details</li>
            </ul>
          </div>
          {/* end breadcrumb-list */}
        </div>
        {/* end col-lg-6 */}
      </div>
      {/* end row */}
    </div>
  </div>
  {/* end dashboard-bread */}
  <div className="dashboard-main-content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="form-box traveler-form border-0">
            <div className="form-title-wrap">
              <h3 className="title">Traveller Details</h3>
            </div>
            <div className="form-content">
              <div className="row">
                <div className="col-lg-3">
                  <div className="card-item profile-card">
                    <div className="card-img">
                      <img src="/images/team7.jpg" alt="user-image" />
                    </div>
                    <div className="card-body">
                      <ul className="list-items list-items-2 list-items-3">
                        <li>
                          <span>Name:</span>Alex Smith
                        </li>
                        <li>
                          <span>Email:</span>alexsmith@gmail.com
                        </li>
                        <li>
                          <span>Phone:</span>+ 00 222 44 5678
                        </li>
                        <li>
                          <span>Country:</span>Australia
                        </li>
                        <li>
                          <span>City:</span>Sydney
                        </li>
                        <li>
                          <span>Address:</span>Collins Street West, Victoria
                          8007,Australia.
                        </li>
                        <li>
                          <span>Status:</span>
                          <i
                            className="la la-check-circle text-color font-size-18"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="Active"
                            data-bs-original-title="Active"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* end col-lg-3 */}
                <div className="col-lg-9">
                  <div className="section-tab section-tab-3 traveler-tab">
                    <ul className="nav nav-tabs ms-0" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link active"
                          id="traveler-detail-tab"
                          data-bs-toggle="tab"
                          href="#traveler-detail"
                          role="tab"
                          aria-controls="traveler-detail"
                          aria-selected="true"
                        >
                          Traveler's Details
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          id="booking-tab"
                          data-bs-toggle="tab"
                          href="#booking"
                          role="tab"
                          aria-controls="booking"
                          aria-selected="false"
                          tabIndex={-1}
                        >
                          Bookings
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          id="invoice-tab"
                          data-bs-toggle="tab"
                          href="#invoice"
                          role="tab"
                          aria-controls="invoice"
                          aria-selected="false"
                          tabIndex={-1}
                        >
                          Invoices
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          id="payment-tab"
                          data-bs-toggle="tab"
                          href="#payment"
                          role="tab"
                          aria-controls="payment"
                          aria-selected="false"
                          tabIndex={-1}
                        >
                          Payments
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content pt-4" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="traveler-detail"
                      role="tabpanel"
                      aria-labelledby="traveler-detail-tab"
                    >
                      <div className="profile-item mb-4">
                        <h3 className="title">Passport Details</h3>
                        <div className="row pt-3">
                          <div className="col-lg-6">
                            <ul className="list-items list-items-2 list-items-3">
                              <li>
                                <span>Surname:</span>Alex
                              </li>
                              <li>
                                <span>Given Name:</span>Smith
                              </li>
                              <li>
                                <span>Sex:</span>M
                              </li>
                              <li>
                                <span>Date of Birth:</span>Jun 03 1986
                              </li>
                              <li>
                                <span>Date of Issue:</span>Jun 11 2004
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-6">
                            <ul className="list-items list-items-2 list-items-3">
                              <li>
                                <span>Date of Expiry:</span>Dec 31 2020
                              </li>
                              <li>
                                <span>Passport Number:</span>928321921
                              </li>
                              <li>
                                <span>Issuing Post Name:</span>London
                              </li>
                              <li>
                                <span>Nationality:</span>England
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* end profile-item */}
                      <div className="profile-item">
                        <div className="row">
                          <div className="col-lg-6">
                            <h3 className="title">Emergency Contact Details</h3>
                            <ul className="list-items list-items-2 list-items-3 pt-3">
                              <li>
                                <span>Emergency Contact:</span>Adi Purdila
                              </li>
                              <li>
                                <span>Address:</span>New York, United States
                              </li>
                              <li>
                                <span>Email:</span>aidpurdial@gmail.com
                              </li>
                              <li>
                                <span>Phone Number:</span>+ 00 222 44 5678
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-6">
                            <h3 className="title">Insurance Details</h3>
                            <ul className="list-items list-items-2 list-items-3 pt-3">
                              <li>
                                <span>Insurance Company:</span>Pioneer Insurance
                                Company Limited
                              </li>
                              <li>
                                <span>Insurance Policy No:</span>12901321098
                              </li>
                              <li>
                                <span>Company Email:</span>
                                pioneerinsurance@gmail.com
                              </li>
                              <li>
                                <span>Company Phone:</span>+ 00 222 44 5678
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* end profile-item */}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="booking"
                      role="tabpanel"
                      aria-labelledby="booking-tab"
                    >
                      <div className="profile-item">
                        <div className="table-form table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Title</th>
                                <th scope="col">Location</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Expire Date</th>
                                <th scope="col">Price</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">Flight</th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      London to New York City
                                    </h3>
                                  </div>
                                </td>
                                <td>New York City</td>
                                <td>30/6/2020</td>
                                <td>2/6/2020</td>
                                <td>$350</td>
                                <td>
                                  <span className="badge text-bg-info py-1 px-2">
                                    Pending
                                  </span>
                                </td>
                                <td>
                                  <div className="table-content">
                                    <button className="theme-btn theme-btn-small">
                                      Cancel
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Car</th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      Mercedes-Benz A 200 CDI
                                    </h3>
                                  </div>
                                </td>
                                <td>Greater London, United Kingdom</td>
                                <td>30/6/2020</td>
                                <td>2/6/2020</td>
                                <td>$350</td>
                                <td>
                                  <span className="badge text-bg-success py-1 px-2">
                                    Completed
                                  </span>
                                </td>
                                <td>
                                  <div className="table-content">
                                    <button className="theme-btn theme-btn-small">
                                      Cancel
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Tour</th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      InterContinental New York Barclay
                                    </h3>
                                  </div>
                                </td>
                                <td>Istanbul , Turkey</td>
                                <td>30/6/2020</td>
                                <td>2/6/2020</td>
                                <td>$350</td>
                                <td>
                                  <span className="badge text-bg-warning py-1 px-2">
                                    Delayed
                                  </span>
                                </td>
                                <td>
                                  <div className="table-content">
                                    <button className="theme-btn theme-btn-small">
                                      Cancel
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Cruise</th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      5 Nights Bermuda Cruise
                                    </h3>
                                  </div>
                                </td>
                                <td>Miami, Florida</td>
                                <td>30/6/2020</td>
                                <td>2/6/2020</td>
                                <td>$350</td>
                                <td>
                                  <span className="badge text-bg-info py-1 px-2">
                                    On schedule
                                  </span>
                                </td>
                                <td>
                                  <div className="table-content">
                                    <button className="theme-btn theme-btn-small">
                                      Cancel
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Hotel</th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      Melia White House Hotel
                                    </h3>
                                  </div>
                                </td>
                                <td>Boston, Massachusetts</td>
                                <td>30/6/2020</td>
                                <td>2/6/2020</td>
                                <td>$350</td>
                                <td>
                                  <span className="badge text-bg-success py-1 px-2">
                                    Completed
                                  </span>
                                </td>
                                <td>
                                  <div className="table-content">
                                    <button className="theme-btn theme-btn-small">
                                      Cancel
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Tour</th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      Hut on Blue Water Beach Tour
                                    </h3>
                                  </div>
                                </td>
                                <td>124 Nevada, Las Vegas</td>
                                <td>30/6/2020</td>
                                <td>2/6/2020</td>
                                <td>$350</td>
                                <td>
                                  <span className="badge text-bg-success py-1 px-2">
                                    Completed
                                  </span>
                                </td>
                                <td>
                                  <div className="table-content">
                                    <button className="theme-btn theme-btn-small">
                                      Cancel
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Flight</th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">Rome to Australia</h3>
                                  </div>
                                </td>
                                <td>New York City</td>
                                <td>30/6/2020</td>
                                <td>2/6/2020</td>
                                <td>$350</td>
                                <td>
                                  <span className="badge text-bg-success py-1 px-2">
                                    Completed
                                  </span>
                                </td>
                                <td>
                                  <div className="table-content">
                                    <button className="theme-btn theme-btn-small">
                                      Cancel
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* end profile-item */}
                    </div>
                    {/* end tab-pane */}
                    <div
                      className="tab-pane fade"
                      id="invoice"
                      role="tabpanel"
                      aria-labelledby="invoice-tab"
                    >
                      <div className="profile-item">
                        <div className="table-form table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Invoice</th>
                                <th scope="col">Title</th>
                                <th scope="col">Location</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Expire Date</th>
                                <th scope="col">Price</th>
                                <th scope="col">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51372
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      London to New York City
                                    </h3>
                                  </div>
                                </td>
                                <td>New York City</td>
                                <td>30/6/2020</td>
                                <td>2/6/2020</td>
                                <td>$350</td>
                                <td>
                                  <span className="badge text-bg-info py-1 px-2">
                                    Pending
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51373
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      Mercedes-Benz A 200 CDI
                                    </h3>
                                  </div>
                                </td>
                                <td>Greater London, United Kingdom</td>
                                <td>30/6/2020</td>
                                <td>2/6/2020</td>
                                <td>$350</td>
                                <td>
                                  <span className="badge text-bg-success py-1 px-2">
                                    Completed
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51396
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      InterContinental New York Barclay
                                    </h3>
                                  </div>
                                </td>
                                <td>Istanbul , Turkey</td>
                                <td>30/6/2020</td>
                                <td>2/6/2020</td>
                                <td>$350</td>
                                <td>
                                  <span className="badge text-bg-warning py-1 px-2">
                                    Delayed
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51397
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      5 Nights Bermuda Cruise
                                    </h3>
                                  </div>
                                </td>
                                <td>Miami, Florida</td>
                                <td>30/6/2020</td>
                                <td>2/6/2020</td>
                                <td>$350</td>
                                <td>
                                  <span className="badge text-bg-info py-1 px-2">
                                    On schedule
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51398
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      Melia White House Hotel
                                    </h3>
                                  </div>
                                </td>
                                <td>Boston, Massachusetts</td>
                                <td>30/6/2020</td>
                                <td>2/6/2020</td>
                                <td>$350</td>
                                <td>
                                  <span className="badge text-bg-success py-1 px-2">
                                    Completed
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51399
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      Hut on Blue Water Beach Tour
                                    </h3>
                                  </div>
                                </td>
                                <td>124 Nevada, Las Vegas</td>
                                <td>30/6/2020</td>
                                <td>2/6/2020</td>
                                <td>$350</td>
                                <td>
                                  <span className="badge text-bg-success py-1 px-2">
                                    Completed
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51400
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">Rome to Australia</h3>
                                  </div>
                                </td>
                                <td>New York City</td>
                                <td>30/6/2020</td>
                                <td>2/6/2020</td>
                                <td>$350</td>
                                <td>
                                  <span className="badge text-bg-success py-1 px-2">
                                    Completed
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* end profile-item */}
                    </div>
                    {/* end tab-pane */}
                    <div
                      className="tab-pane fade"
                      id="payment"
                      role="tabpanel"
                      aria-labelledby="payment-tab"
                    >
                      <div className="profile-item">
                        <div className="table-form table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Invoice</th>
                                <th scope="col">Title</th>
                                <th scope="col">Price</th>
                                <th scope="col">Payment Method</th>
                                <th scope="col">Payment Date</th>
                                <th scope="col">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51372
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      London to New York City
                                    </h3>
                                  </div>
                                </td>
                                <td>$350</td>
                                <td>PayPal</td>
                                <td>30/5/2020</td>
                                <td>
                                  <span className="badge text-bg-warning text-white py-1 px-2">
                                    Pending
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51372
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      London to New York City
                                    </h3>
                                  </div>
                                </td>
                                <td>$350</td>
                                <td>Credit Card</td>
                                <td>30/5/2020</td>
                                <td>
                                  <span className="badge text-bg-success py-1 px-2">
                                    Completed
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51372
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      London to New York City
                                    </h3>
                                  </div>
                                </td>
                                <td>$350</td>
                                <td>Payoneer</td>
                                <td>30/5/2020</td>
                                <td>
                                  <span className="badge text-bg-success py-1 px-2">
                                    Completed
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51372
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      London to New York City
                                    </h3>
                                  </div>
                                </td>
                                <td>$350</td>
                                <td>Skrill</td>
                                <td>30/5/2020</td>
                                <td>
                                  <span className="badge text-bg-success py-1 px-2">
                                    Completed
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51372
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      London to New York City
                                    </h3>
                                  </div>
                                </td>
                                <td>$350</td>
                                <td>PayPal</td>
                                <td>30/5/2020</td>
                                <td>
                                  <span className="badge text-bg-info py-1 px-2">
                                    On hold
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51372
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      London to New York City
                                    </h3>
                                  </div>
                                </td>
                                <td>$350</td>
                                <td>PayPal</td>
                                <td>30/5/2020</td>
                                <td>
                                  <span className="badge text-bg-warning text-white py-1 px-2">
                                    Pending
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51372
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      London to New York City
                                    </h3>
                                  </div>
                                </td>
                                <td>$350</td>
                                <td>PayPal</td>
                                <td>30/5/2020</td>
                                <td>
                                  <span className="badge text-bg-success py-1 px-2">
                                    Completed
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="#" className="color-text">
                                    51372
                                  </a>
                                </th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">
                                      London to New York City
                                    </h3>
                                  </div>
                                </td>
                                <td>$350</td>
                                <td>PayPal</td>
                                <td>30/5/2020</td>
                                <td>
                                  <span className="badge text-bg-success py-1 px-2">
                                    Completed
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* end profile-item */}
                    </div>
                    {/* end tab-pane */}
                  </div>
                </div>
                {/* end col-lg-9 */}
              </div>
              {/* end row */}
            </div>
          </div>
          {/* end form-box */}
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
      <div className="border-top mt-4" />
      <div className="row align-items-center">
        <div className="col-lg-7">
          <div className="copy-right padding-top-30px">
            <p className="copy__desc">
              © Copyright Trizen <span id="get-year">2025</span> . Made with{" "}
              <span className="la la-heart" /> by
              <a href="https://themeforest.net/user/techydevs/portfolio">
                TechyDevs
              </a>
            </p>
          </div>
          {/* end copy-right */}
        </div>
        {/* end col-lg-7 */}
        <div className="col-lg-5">
          <div className="copy-right-content text-end padding-top-30px">
            <ul className="social-profile">
              <li>
                <a href="#">
                  <i className="lab la-facebook-f" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="lab la-twitter" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="lab la-instagram" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="lab la-linkedin-in" />
                </a>
              </li>
            </ul>
          </div>
          {/* end copy-right-content */}
        </div>
        {/* end col-lg-5 */}
      </div>
      {/* end row */}
    </div>
    {/* end container-fluid */}
  </div>
  {/* end dashboard-main-content */}
</div>

        </>
    )
}
export default TravelDetails