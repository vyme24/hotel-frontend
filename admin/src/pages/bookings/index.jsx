const Bookings = () => {
  return (
    <div className="container-fluid">
  <div className="row">
    <div className="col-lg-12">
      <div className="form-box">
        <div className="form-title-wrap">
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="title">Booking Results</h3>
            <div className="select-contain select2-container-wrapper">
              <select className="select-contain-select">
                <option value={1}>Any Status</option>
                <option value={2}>Approved</option>
                <option value={3}>Pending</option>
                <option value={4}>Cancelled</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-content pb-2">
          <div className="card-item card-item-list card-item--list">
            <div className="card-img">
              <img src="/images/img1.jpg" alt="hotel-img" />
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <h3 className="card-title">Hotel Malte – Astotel</h3>
                <span className="badge text-bg-warning text-white ms-2">
                  Pending
                </span>
              </div>
              <ul className="list-items list-items-2 pt-2 pb-3">
                <li>
                  <span>Start date:</span>12 December 2019
                </li>
                <li>
                  <span>End date:</span>12 Jun 2020
                </li>
                <li>
                  <span>Booking details:</span> 3 People
                </li>
                <li>
                  <span>Client:</span> David Martin
                </li>
              </ul>
              <div className="btn-box">
                <a
                  href="#"
                  className="theme-btn theme-btn-small theme-btn-transparent"
                  data-bs-toggle="modal"
                  data-bs-target="#modalPopup"
                >
                  <i className="la la-envelope me-1" />
                  Send Message
                </a>
              </div>
            </div>
            <div className="action-btns">
              <a href="#" className="theme-btn theme-btn-small me-2">
                <i className="la la-check-circle me-1" />
                Approve
              </a>
              <a href="#" className="theme-btn theme-btn-small">
                <i className="la la-times me-1" />
                Cancel
              </a>
            </div>
          </div>
          {/* end card-item */}
          <div className="card-item flight-card card-item-list card-item--list">
            <div className="card-img">
              <img src="/images/img15.jpg" alt="destination-img" />
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <h3 className="card-title">London to Paris</h3>
                <span className="badge text-bg-success ms-2">Approved</span>
              </div>
              <ul className="list-items list-items-2 pt-2 pb-3">
                <li>
                  <span>Start date:</span>12 December 2019
                </li>
                <li>
                  <span>End date:</span>12 Jun 2020
                </li>
                <li>
                  <span>Booking details:</span> 2 People
                </li>
                <li>
                  <span>Client:</span> Mark Wing
                </li>
              </ul>
              <div className="btn-box">
                <a
                  href="#"
                  className="theme-btn theme-btn-small theme-btn-transparent"
                  data-bs-toggle="modal"
                  data-bs-target="#modalPopup"
                >
                  <i className="la la-envelope me-1" />
                  Send Message
                </a>
              </div>
            </div>
            <div className="action-btns">
              <a href="#" className="theme-btn theme-btn-small me-2">
                <i className="la la-check-circle me-1" />
                Approve
              </a>
              <a href="#" className="theme-btn theme-btn-small">
                <i className="la la-times me-1" />
                Cancel
              </a>
            </div>
          </div>
          <div className="card-item car-card card-item-list card-item--list">
            <div className="card-img">
              <img src="/images/car-img2.png" alt="car-img" />
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <h3 className="card-title">
                  Volkswagen Jetta 2 Doors or Similar
                </h3>
                <span className="badge text-bg-warning text-white ms-2">
                  Pending
                </span>
              </div>
              <ul className="list-items list-items-2 pt-2 pb-3">
                <li>
                  <span>Start date:</span>12 December 2019
                </li>
                <li>
                  <span>End date:</span>12 Jun 2020
                </li>
                <li>
                  <span>Booking details:</span> 4 People
                </li>
                <li>
                  <span>Client:</span> John Smith
                </li>
              </ul>
              <div className="btn-box">
                <a
                  href="#"
                  className="theme-btn theme-btn-small theme-btn-transparent"
                  data-bs-toggle="modal"
                  data-bs-target="#modalPopup"
                >
                  <i className="la la-envelope me-1" />
                  Send Message
                </a>
              </div>
            </div>
            <div className="action-btns">
              <a href="#" className="theme-btn theme-btn-small me-2">
                <i className="la la-check-circle me-1" />
                Approve
              </a>
              <a href="#" className="theme-btn theme-btn-small">
                <i className="la la-times me-1" />
                Cancel
              </a>
            </div>
          </div>
          <div className="card-item cruise--card card-item-list card-item--list">
            <div className="card-img">
              <a href="cruise-details.html" className="d-block">
                <img src="/images/cruise-img6.jpg" alt="cruise-img" />
              </a>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <h3 className="card-title">
                  7 Nights Caribbean Southern Cruise
                </h3>
                <span className="badge text-bg-danger ms-2">Canceled</span>
              </div>
              <ul className="list-items list-items-2 pt-2 pb-3">
                <li>
                  <span>Start date:</span>12 December 2019
                </li>
                <li>
                  <span>End date:</span>12 Jun 2020
                </li>
                <li>
                  <span>Booking details:</span> 4 People
                </li>
                <li>
                  <span>Client:</span> John Doe
                </li>
              </ul>
              <div className="btn-box">
                <a
                  href="#"
                  className="theme-btn theme-btn-small theme-btn-transparent"
                  data-bs-toggle="modal"
                  data-bs-target="#modalPopup"
                >
                  <i className="la la-envelope me-1" />
                  Send Message
                </a>
              </div>
            </div>
            <div className="action-btns">
              <a href="#" className="theme-btn theme-btn-small me-2">
                <i className="la la-check-circle me-1" />
                Approve
              </a>
              <a href="#" className="theme-btn theme-btn-small">
                <i className="la la-times me-1" />
                Cancel
              </a>
            </div>
          </div>
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
            <a className="page-link page-link-nav" href="#" aria-label="Next">
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
          © Copyright Trizen <span id="get-year" /> . Made with{" "}
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

  );
}
export default Bookings;