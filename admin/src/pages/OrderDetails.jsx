const OrderDetails = ()=>{
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
                Order Details
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
              <li>Order Details</li>
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
          <div className="form-box">
            <div className="form-title-wrap">
              <h3 className="title">Order Detail Lists</h3>
            </div>
            <div className="form-content">
              <ul className="list-items list-items-2 list-items-flush">
                <li>
                  <span>Order ID#</span>11541689164
                </li>
                <li>
                  <span>Package Ordered:</span>Hotel Malte – Astotel
                </li>
                <li>
                  <span>Package Duration:</span> 12 Jun 2020
                </li>
                <li>
                  <span>Customer Name:</span> David Martin
                </li>
                <li>
                  <span>Customer Email:</span> davidmarting@gmail.com
                </li>
                <li>
                  <span>Customer Phone:</span> + 00 222 44 5678
                </li>
                <li>
                  <span>Customer Address:</span> PO Box CT16122 Collins Street
                  West, Victoria 8007,Australia.
                </li>
                <li>
                  <span>Customer City:</span> Sydney
                </li>
                <li>
                  <span>Customer Postal Code:</span> 3030
                </li>
                <li>
                  <span>Total Adults:</span> 2
                </li>
                <li>
                  <span>Total Child:</span> 2
                </li>
                <li>
                  <span>Total Cost:</span> $140
                </li>
                <li>
                  <span>Booking Date:</span>2020-11-08 14:59:27
                </li>
                <li>
                  <span>Payment Method:</span> Stripe
                </li>
                <li>
                  <span>Stripe Charge ID:</span>ch_1DUEyfLYzRkN5IL2UwTGTf3B
                </li>
                <li>
                  <span>Stripe Transaction ID:</span>
                  txn_1DUEyfLYzRkN5IL2CC99RSbu
                </li>
              </ul>
              <div className="btn-box mt-4">
                <a
                  href="#"
                  className="theme-btn theme-btn-small"
                  data-bs-toggle="modal"
                  data-bs-target="#modalPopup"
                >
                  <i className="la la-envelope me-1" />
                  Contact Customer
                </a>
              </div>
            </div>
          </div>
          {/* end form-box */}
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
      <div className="border-top mt-5" />
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
export default OrderDetails