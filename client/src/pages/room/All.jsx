const RoomAll = () => {
  return (
    <>
  {/* ================================
    START BREADCRUMB AREA
================================= */}
  <section className="breadcrumb-area bread-bg-10">
    <div className="breadcrumb-wrap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb-content text-center">
              <div className="section-heading">
                <h2 className="sec__title text-white">Room List</h2>
              </div>
              <span className="arrow-blink">
                <i className="la la-arrow-down" />
              </span>
            </div>
            {/* end breadcrumb-content */}
          </div>
          {/* end col-lg-12 */}
        </div>
        {/* end row */}
      </div>
      {/* end container */}
    </div>
    {/* end breadcrumb-wrap */}
    <div className="bread-svg-box">
      <svg
        className="bread-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <polygon points="100 0 50 10 0 0 0 10 100 10" />
      </svg>
    </div>
    {/* end bread-svg */}
  </section>
  {/* end breadcrumb-area */}
  {/* ================================
    END BREADCRUMB AREA
================================= */}
  {/* ================================
    START CARD AREA
================================= */}
  <section className="card-area section--padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="filter-wrap margin-bottom-40px">
            <div className="filter-top d-flex align-items-center justify-content-between">
              <div className="section-tab section-tab-3">
                <ul className="nav nav-tabs" id="myTab4" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="all-tab"
                      data-bs-toggle="tab"
                      href="#all"
                      role="tab"
                      aria-controls="all"
                      aria-selected="false"
                    >
                      All
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="dorm-beds-tab"
                      data-bs-toggle="tab"
                      href="#dorm-beds"
                      role="tab"
                      aria-controls="dorm-beds"
                      aria-selected="false"
                    >
                      Dorm Beds
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="private-room-tab"
                      data-bs-toggle="tab"
                      href="#private-room"
                      role="tab"
                      aria-controls="private-room"
                      aria-selected="false"
                    >
                      Private Room
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="suites-tab"
                      data-bs-toggle="tab"
                      href="#suites"
                      role="tab"
                      aria-controls="suites"
                      aria-selected="false"
                    >
                      Suites
                    </a>
                  </li>
                </ul>
              </div>
              {/* end section-tab */}
              <div className="layout-view d-flex align-items-center">
                <a
                  href="room-grid.html"
                  data-bs-toggle="tooltip"
                  data-placement="top"
                  title="Grid View"
                >
                  <i className="la la-th-large" />
                </a>
                <a
                  href="room-list.html"
                  data-bs-toggle="tooltip"
                  data-placement="top"
                  title="List View"
                  className="active"
                >
                  <i className="la la-th-list" />
                </a>
              </div>
            </div>
          </div>
          {/* end filter-wrap */}
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
      <div className="tab-content" id="may-tabContent4">
        <div
          className="tab-pane fade show active"
          id="all"
          role="tabpanel"
          aria-labelledby="all-tab"
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img5.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img29.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img30.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$88.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Premium Lake View Room</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$45.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Standard 2 Bed Male Dorm</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$145.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Deluxe King Bed Private</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$145.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Premium Lake View Suite</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$145.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Superior Room</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
          </div>
          {/* end row */}
        </div>
        <div
          className="tab-pane fade"
          id="dorm-beds"
          role="tabpanel"
          aria-labelledby="dorm-beds-tab"
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$145.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Premium Lake View Suite</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$145.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Superior Room</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img5.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img29.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img30.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$88.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Premium Lake View Room</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$45.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Standard 2 Bed Male Dorm</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$145.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Deluxe King Bed Private</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
          </div>
          {/* end row */}
        </div>
        <div
          className="tab-pane fade"
          id="private-room"
          role="tabpanel"
          aria-labelledby="private-room-tab"
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img5.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img29.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img30.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$88.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Premium Lake View Room</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$45.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Standard 2 Bed Male Dorm</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$145.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Deluxe King Bed Private</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$145.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Premium Lake View Suite</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$145.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Superior Room</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
          </div>
          {/* end row */}
        </div>
        <div
          className="tab-pane fade"
          id="suites"
          role="tabpanel"
          aria-labelledby="suites-tab"
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$45.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Standard 2 Bed Male Dorm</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$145.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Deluxe King Bed Private</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img5.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img29.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img30.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$88.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Premium Lake View Room</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$145.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Premium Lake View Suite</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
            <div className="col-lg-12">
              <div className="card-item card-item-list room-card">
                <div className="card-img-carousel carousel-action carousel--action">
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img31.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img32.jpg" alt="hotel-img" />
                    </a>
                  </div>
                  <div className="card-img">
                    <a href="room-details.html" className="d-block">
                      <img src="/images/img33.jpg" alt="hotel-img" />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-price pb-2">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$145.00</span>
                    </p>
                  </div>
                  <h3 className="card-title font-size-26">
                    <a href="room-details.html">Superior Room</a>
                  </h3>
                  <p className="card-text pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam asperiores commodi deleniti hic inventore laboriosam
                    laborum molestias, non odit quaerat! Aperiam culpa facilis
                    fuga impedit.
                  </p>
                  <div className="card-attributes pt-3 pb-4">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <i className="la la-bed" />
                        <span>2 Beds</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-building" />
                        <span>
                          24 ft<sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="la la-bathtub" />
                        <span>2 Bathrooms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-btn">
                    <a
                      href="room-details.html"
                      className="theme-btn theme-btn-transparent"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end col-lg-12 */}
          </div>
          {/* end row */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="btn-box mt-4 text-center">
            <button type="button" className="theme-btn">
              <i className="la la-refresh me-1" />
              Load More
            </button>
            <p className="font-size-13 pt-2">Showing 1 - 5 of 124 Rooms</p>
          </div>
          {/* end btn-box */}
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
    </div>
    {/* end container */}
  </section>
  {/* end card-area */}
  {/* ================================
    END CARD AREA
================================= */}
  {/* ================================
    START CHECK AVAILABILITY AREA
================================= */}
  <section className="check-availability-area section-bg section-padding">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-12">
          <div className="check-availability-content">
            <div className="section-heading text-center">
              <h2 className="sec__title">Book Your Stay</h2>
            </div>
            {/* end section-heading */}
            <div className="contact-form-action padding-top-40px">
              <form action="#">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="input-box">
                      <label className="label-text">Check-in</label>
                      <div className="form-group">
                        <span className="la la-calendar form-icon" />
                        <input
                          className="date-range form-control"
                          type="text"
                          name="daterange-single"
                        />
                      </div>
                    </div>
                  </div>
                  {/* end col-lg-3 */}
                  <div className="col-lg-3">
                    <div className="input-box">
                      <label className="label-text">Check-out</label>
                      <div className="form-group">
                        <span className="la la-calendar form-icon" />
                        <input
                          className="date-range form-control"
                          type="text"
                          name="daterange-single"
                        />
                      </div>
                    </div>
                  </div>
                  {/* end col-lg-3 */}
                  <div className="col-lg-3">
                    <div className="input-box">
                      <label className="label-text">Rooms</label>
                      <div className="form-group">
                        <div className="select-contain w-auto">
                          <select className="select-contain-select">
                            <option value={0}>Select Rooms</option>
                            <option value={1} selected="">
                              1 Room
                            </option>
                            <option value={2}>2 Rooms</option>
                            <option value={3}>3 Rooms</option>
                            <option value={4}>4 Rooms</option>
                            <option value={5}>5 Rooms</option>
                            <option value={6}>6 Rooms</option>
                            <option value={7}>7 Rooms</option>
                            <option value={8}>8 Rooms</option>
                            <option value={9}>9 Rooms</option>
                            <option value={10}>10 Rooms</option>
                            <option value={11}>11 Rooms</option>
                            <option value={12}>12 Rooms</option>
                            <option value={13}>13 Rooms</option>
                            <option value={14}>14 Rooms</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end col-lg-3 */}
                  <div className="col-lg-3">
                    <div className="input-box">
                      <label className="label-text">Guests</label>
                      <div className="form-group">
                        <div className="dropdown dropdown-contain">
                          <a
                            className="dropdown-toggle dropdown-btn"
                            href="#"
                            data-bs-toggle="dropdown"
                          >
                            <span>
                              Total Guests
                              <span className="qtyTotal guestTotal">0</span>
                            </span>
                          </a>
                          <div className="dropdown-menu dropdown-menu-wrap">
                            <div className="dropdown-item">
                              <div className="qty-box d-flex align-items-center justify-content-between">
                                <label>Adults</label>
                                <div className="qtyBtn d-flex align-items-center">
                                  <input
                                    type="text"
                                    name="qtyInput"
                                    defaultValue={0}
                                  />
                                </div>
                              </div>
                            </div>
                            {/* end dropdown-item */}
                            <div className="dropdown-item">
                              <div className="qty-box d-flex align-items-center justify-content-between">
                                <label>
                                  Children <span>2-12 years old</span>
                                </label>
                                <div className="qtyBtn d-flex align-items-center">
                                  <input
                                    type="text"
                                    name="qtyInput"
                                    defaultValue={0}
                                  />
                                </div>
                              </div>
                            </div>
                            {/* end dropdown-item */}
                            <div className="dropdown-item">
                              <div className="qty-box d-flex align-items-center justify-content-between">
                                <label>
                                  Infants <span>0-2 years old</span>
                                </label>
                                <div className="qtyBtn d-flex align-items-center">
                                  <input
                                    type="text"
                                    name="qtyInput"
                                    defaultValue={0}
                                  />
                                </div>
                              </div>
                              {/* end qty-box */}
                            </div>
                            {/* end dropdown-item */}
                          </div>
                        </div>
                        {/* end dropdown */}
                      </div>
                    </div>
                  </div>
                  {/* end col-lg-3 */}
                  <div className="col-lg-12">
                    <div className="btn-box text-center pt-2">
                      <a href="#" className="theme-btn">
                        Check Availability
                      </a>
                    </div>
                  </div>
                  {/* end col-lg-3 */}
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
    </div>
    {/* end container */}
  </section>
  {/* end check-availability-area */}
  {/* ================================
    END CHECK AVAILABILITY AREA
================================= */}
</>

  );
};
export default RoomAll;