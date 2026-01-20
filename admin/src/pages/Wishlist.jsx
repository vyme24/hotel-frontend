const Wishlist =()=>{
    return(
        <>
        <div className="dashboard-content-wrap">
  <div className="dashboard-bread dashboard--bread dashboard-bread-2">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="breadcrumb-content">
            <div className="section-heading">
              <h2 className="sec__title font-size-30 text-white">Bookmarks</h2>
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
              <li>Bookmarks</li>
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
              <div className="d-flex align-items-center justify-content-between">
                <h3 className="title">Bookmarks List</h3>
                <div className="select-contain select2-container-wrapper">
                  <select
                    className="select-contain-select select2-hidden-accessible"
                    data-select2-id="select2-data-1-zmv6"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <option value={1} data-select2-id="select2-data-3-cbsw">
                      Any Time
                    </option>
                    <option value={2}>Latest</option>
                    <option value={3}>Oldest</option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="select2-data-2-x6yv"
                    style={{ width: "91.7333px" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabIndex={0}
                        aria-disabled="false"
                        aria-labelledby="select2-3zvd-container"
                        aria-controls="select2-3zvd-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-3zvd-container"
                          role="textbox"
                          aria-readonly="true"
                          title="Any Time"
                        >
                          Any Time
                        </span>
                        <span
                          className="select2-selection__arrow"
                          role="presentation"
                        >
                          <b role="presentation" />
                        </span>
                      </span>
                    </span>
                    <span className="dropdown-wrapper" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
            <div className="form-content pb-2">
              <div className="card-item card-item-list">
                <div className="card-img">
                  <img src="/images/img1.jpg" alt="hotel-img" />
                </div>
                <div className="card-body">
                  <p className="card-meta pb-1">Hotel</p>
                  <h3 className="card-title">Hotel Malte – Astotel</h3>
                  <p className="card-meta pt-2 pb-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Assumenda atque blanditiis cum deserunt dolores fugit harum
                    iusto natus pariatur, perspiciatis quae quis repudiandae
                    saepe sed sunt! Animi eius fugit repudiandae.
                  </p>
                  <div className="btn-box">
                    <a
                      href="#"
                      className="theme-btn theme-btn-small theme-btn-transparent"
                    >
                      <i className="la la-eye me-1" />
                      View Item
                    </a>
                  </div>
                </div>
                <div className="action-btns">
                  <a
                    href="hotel-single.html"
                    className="theme-btn theme-btn-small bg-danger"
                  >
                    <i className="la la-times me-1" />
                    Cancel
                  </a>
                </div>
              </div>
              {/* end card-item */}
              <div className="card-item car-card card-item-list">
                <div className="card-img">
                  <img src="/images/car-img2.png" alt="car-img" />
                </div>
                <div className="card-body">
                  <p className="card-meta pb-1">Car</p>
                  <h3 className="card-title">
                    Volkswagen Jetta 2 Doors or Similar
                  </h3>
                  <p className="card-meta pt-2 pb-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Assumenda atque blanditiis cum deserunt dolores fugit harum
                    iusto natus pariatur, perspiciatis quae quis repudiandae
                    saepe sed sunt! Animi eius fugit repudiandae.
                  </p>
                  <div className="btn-box">
                    <a
                      href="#"
                      className="theme-btn theme-btn-small theme-btn-transparent"
                    >
                      <i className="la la-eye me-1" />
                      View Item
                    </a>
                  </div>
                </div>
                <div className="action-btns">
                  <a
                    href="car-single.html"
                    className="theme-btn theme-btn-small bg-danger"
                  >
                    <i className="la la-times me-1" />
                    Cancel
                  </a>
                </div>
              </div>
              {/* end card-item */}
              <div className="card-item cruise--card card-item-list">
                <div className="card-img">
                  <a href="cruise-details.html" className="d-block">
                    <img src="/images/cruise-img6.jpg" alt="cruise-img" />
                  </a>
                </div>
                <div className="card-body">
                  <p className="card-meta pb-1">Cruise</p>
                  <h3 className="card-title">
                    7 Nights Caribbean Southern Cruise
                  </h3>
                  <p className="card-meta pt-2 pb-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Assumenda atque blanditiis cum deserunt dolores fugit harum
                    iusto natus pariatur, perspiciatis quae quis repudiandae
                    saepe sed sunt! Animi eius fugit repudiandae.
                  </p>
                  <div className="btn-box">
                    <a
                      href="#"
                      className="theme-btn theme-btn-small theme-btn-transparent"
                    >
                      <i className="la la-eye me-1" />
                      View Item
                    </a>
                  </div>
                </div>
                <div className="action-btns">
                  <a
                    href="cruise-details.html"
                    className="theme-btn theme-btn-small bg-danger"
                  >
                    <i className="la la-times me-1" />
                    Cancel
                  </a>
                </div>
              </div>
              {/* end card-item */}
              <div className="card-item card-item-list">
                <div className="card-img">
                  <img src="/images/img9.jpg" alt="hotel-img" />
                </div>
                <div className="card-body">
                  <p className="card-meta pb-1">Tour</p>
                  <h3 className="card-title">
                    Northern California Summer 2019
                  </h3>
                  <p className="card-meta pt-2 pb-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Assumenda atque blanditiis cum deserunt dolores fugit harum
                    iusto natus pariatur, perspiciatis quae quis repudiandae
                    saepe sed sunt! Animi eius fugit repudiandae.
                  </p>
                  <div className="btn-box">
                    <a
                      href="#"
                      className="theme-btn theme-btn-small theme-btn-transparent"
                    >
                      <i className="la la-eye me-1" />
                      View Item
                    </a>
                  </div>
                </div>
                <div className="action-btns">
                  <a
                    href="tour-details.html"
                    className="theme-btn theme-btn-small bg-danger"
                  >
                    <i className="la la-times me-1" />
                    Cancel
                  </a>
                </div>
              </div>
              {/* end card-item */}
            </div>
          </div>
          {/* end form-box */}
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
      <div className="row">
        <div className="col-lg-12">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a
                  className="page-link page-link-nav"
                  href="#"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">
                    <i className="la la-angle-left" />
                  </span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link page-link-nav" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link page-link-nav" href="#">
                  2 <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link page-link-nav" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link page-link-nav"
                  href="#"
                  aria-label="Next"
                >
                  <span aria-hidden="true">
                    <i className="la la-angle-right" />
                  </span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
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
export default Wishlist;