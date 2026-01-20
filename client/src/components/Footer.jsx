const Footer = () => {
  return (
    <>
  {/* ================================
 START FOOTER AREA
================================= */}
  <section className="footer-area section-bg padding-top-40px padding-bottom-30px">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-8">
          <div className="term-box footer-item">
            <ul className="list-items list--items d-flex align-items-center">
              <li>
                <a href="#">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Help Center</a>
              </li>
            </ul>
          </div>
        </div>
        {/* end col-lg-8 */}
        <div className="col-lg-4">
          <div className="footer-social-box text-end">
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
        </div>
        {/* end col-lg-4 */}
      </div>
      {/* end row */}
    </div>
    <div className="section-block mt-4 mb-5" />
    <div className="container">
      <div className="row">
        <div className="col-lg-3 responsive-column">
          <div className="footer-item">
            <div className="footer-logo padding-bottom-30px">
              <a href="index.html" className="foot__logo">
                <img src="/images/logo.png" alt="logo" />
              </a>
            </div>
            {/* end logo */}
            <p className="footer__desc">
              Morbi convallis bibendum urna ut viverra. Maecenas consequat
            </p>
            <ul className="list-items pt-3">
              <li>
                3015 Grand Ave, Coconut Grove,
                <br />
                Cerrick Way, FL 12345
              </li>
              <li>+123-456-789</li>
              <li>
                <a href="#">trizen@yourwebsite.com</a>
              </li>
            </ul>
          </div>
          {/* end footer-item */}
        </div>
        {/* end col-lg-3 */}
        <div className="col-lg-3 responsive-column">
          <div className="footer-item">
            <h4
              className="title curve-shape pb-3 margin-bottom-20px"
              data-text="curvs"
            >
              Company
            </h4>
            <ul className="list-items list--items">
              <li>
                <a href="about.html">About us</a>
              </li>
              <li>
                <a href="services.html">Services</a>
              </li>
              <li>
                <a href="#">Jobs</a>
              </li>
              <li>
                <a href="blog-grid.html">News</a>
              </li>
              <li>
                <a href="contact.html">Support</a>
              </li>
            </ul>
          </div>
          {/* end footer-item */}
        </div>
        {/* end col-lg-3 */}
        <div className="col-lg-3 responsive-column">
          <div className="footer-item">
            <h4
              className="title curve-shape pb-3 margin-bottom-20px"
              data-text="curvs"
            >
              Other Links
            </h4>
            <ul className="list-items list--items">
              <li>
                <a href="#">USA Vacation Packages</a>
              </li>
              <li>
                <a href="#">USA Flights</a>
              </li>
              <li>
                <a href="#">USA Hotels</a>
              </li>
              <li>
                <a href="#">USA Car Hire</a>
              </li>
              <li>
                <a href="#">Create an Account</a>
              </li>
            </ul>
          </div>
          {/* end footer-item */}
        </div>
        {/* end col-lg-3 */}
        <div className="col-lg-3 responsive-column">
          <div className="footer-item">
            <h4
              className="title curve-shape pb-3 margin-bottom-20px"
              data-text="curvs"
            >
              Payment Methods
            </h4>
            <p className="footer__desc pb-3">
              Pay any way you choose, we support all payment options.
            </p>
            <img src="/images/payment-img.png" alt="" />
          </div>
          {/* end footer-item */}
        </div>
        {/* end col-lg-3 */}
      </div>
      {/* end row */}
      <div className="section-block" />
      <div className="row">
        <div className="col-lg-12">
          <div className="copy-right padding-top-30px text-center">
            <p className="copy__desc">
              © Copyright Trizen <span id="get-year" /> . Made with
              <span className="la la-heart" /> by
              <a href="https://themeforest.net/user/techydevs/portfolio">
                TechyDevs
              </a>
            </p>
          </div>
          {/* end copy-right */}
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
    </div>
    {/* end container */}
  </section>
  {/* end footer-area */}
  {/* ================================
 START FOOTER AREA
================================= */}
  {/* start back-to-top */}
  <div id="back-to-top">
    <i className="la la-angle-up" title="Go top" />
  </div>
  {/* end back-to-top */}
  {/* end modal-shared */}
  <div className="modal-popup">
    <div
      className="modal fade"
      id="signupPopupForm"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h5 className="modal-title title" id="exampleModalLongTitle">
                Sign Up
              </h5>
              <p className="font-size-14">
                Hello! Welcome Create a New Account
              </p>
            </div>
            <button
              type="button"
              className="btn-close close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" className="la la-close" />
            </button>
          </div>
          <div className="modal-body">
            <div className="contact-form-action">
              <form method="post">
                <div className="input-box">
                  <label className="label-text">Username</label>
                  <div className="form-group">
                    <span className="la la-user form-icon" />
                    <input
                      className="form-control"
                      type="text"
                      name="text"
                      placeholder="Type your username"
                    />
                  </div>
                </div>
                {/* end input-box */}
                <div className="input-box">
                  <label className="label-text">Email Address</label>
                  <div className="form-group">
                    <span className="la la-envelope form-icon" />
                    <input
                      className="form-control"
                      type="text"
                      name="text"
                      placeholder="Type your email"
                    />
                  </div>
                </div>
                {/* end input-box */}
                <div className="input-box">
                  <label className="label-text">Password</label>
                  <div className="form-group">
                    <span className="la la-lock form-icon" />
                    <input
                      className="form-control"
                      type="text"
                      name="text"
                      placeholder="Type password"
                    />
                  </div>
                </div>
                {/* end input-box */}
                <div className="input-box">
                  <label className="label-text">Repeat Password</label>
                  <div className="form-group">
                    <span className="la la-lock form-icon" />
                    <input
                      className="form-control"
                      type="text"
                      name="text"
                      placeholder="Type again password"
                    />
                  </div>
                </div>
                {/* end input-box */}
                <div className="btn-box pt-3 pb-4">
                  <button type="button" className="theme-btn w-100">
                    Register Account
                  </button>
                </div>
                <div className="action-box text-center">
                  <p className="font-size-14">Or Sign up Using</p>
                  <ul className="social-profile py-3">
                    <li>
                      <a href="#" className="bg-5 text-white">
                        <i className="lab la-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-6 text-white">
                        <i className="lab la-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-7 text-white">
                        <i className="lab la-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-5 text-white">
                        <i className="lab la-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
            {/* end contact-form-action */}
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* end modal-popup */}
  {/* end modal-shared */}
  <div className="modal-popup">
    <div
      className="modal fade"
      id="loginPopupForm"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h5 className="modal-title title" id="exampleModalLongTitle2">
                Login
              </h5>
              <p className="font-size-14">Hello! Welcome to your account</p>
            </div>
            <button
              type="button"
              className="btn-close close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" className="la la-close" />
            </button>
          </div>
          <div className="modal-body">
            <div className="contact-form-action">
              <form method="post">
                <div className="input-box">
                  <label className="label-text">Username</label>
                  <div className="form-group">
                    <span className="la la-user form-icon" />
                    <input
                      className="form-control"
                      type="text"
                      name="text"
                      placeholder="Type your username"
                    />
                  </div>
                </div>
                {/* end input-box */}
                <div className="input-box">
                  <label className="label-text">Password</label>
                  <div className="form-group mb-2">
                    <span className="la la-lock form-icon" />
                    <input
                      className="form-control"
                      type="text"
                      name="text"
                      placeholder="Type your password"
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="custom-checkbox mb-0">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberchb"
                      />
                      <label htmlFor="rememberchb">Remember me</label>
                    </div>
                    <p className="forgot-password">
                      <a href="recover.html">Forgot Password?</a>
                    </p>
                  </div>
                </div>
                {/* end input-box */}
                <div className="btn-box pt-3 pb-4">
                  <button type="button" className="theme-btn w-100">
                    Login Account
                  </button>
                </div>
                <div className="action-box text-center">
                  <p className="font-size-14">Or Login Using</p>
                  <ul className="social-profile py-3">
                    <li>
                      <a href="#" className="bg-5 text-white">
                        <i className="lab la-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-6 text-white">
                        <i className="lab la-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-7 text-white">
                        <i className="lab la-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-5 text-white">
                        <i className="lab la-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
            {/* end contact-form-action */}
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* end modal-popup */}
</>

  );
};

export default Footer;