const Setting =()=>{
    return(
        <>
        <div className="dashboard-content-wrap">
  <div className="dashboard-bread dashboard--bread dashboard-bread-2">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="breadcrumb-content">
            <div className="section-heading">
              <h2 className="sec__title font-size-30 text-white">Settings</h2>
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
              <li>Settings</li>
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
        <div className="col-lg-6">
          <div className="form-box">
            <div className="form-title-wrap">
              <h3 className="title">Profile Setting</h3>
            </div>
            <div className="form-content">
              <div className="user-profile-action d-flex align-items-center pb-4">
                <div className="user-pro-img">
                  <img src="/images/team1.jpg" alt="user-image" />
                </div>
                <div className="upload-btn-box">
                  <div className="file-upload-wrap file-upload-wrap-2">
                    <div className="MultiFile-wrap" id="MultiFile1">
                      <input
                        type="file"
                        name="files[]"
                        className="multi file-upload-input with-preview MultiFile-applied"
                        maxLength={1}
                        id="MultiFile1"
                        defaultValue=""
                      />
                      <div className="MultiFile-list" id="MultiFile1_list" />
                    </div>
                    <span className="file-upload-text">
                      <i className="la la-upload me-2" />
                      Upload Image
                    </span>
                  </div>
                </div>
              </div>
              <div className="contact-form-action">
                <form action="#" className="MultiFile-intercepted">
                  <div className="row">
                    <div className="col-lg-6 responsive-column">
                      <div className="input-box">
                        <label className="label-text">Website Title</label>
                        <div className="form-group">
                          <span className="la la-user form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            defaultValue="Royel travel agency"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-6 responsive-column">
                      <div className="input-box">
                        <label className="label-text">Email Address</label>
                        <div className="form-group">
                          <span className="la la-envelope form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            defaultValue="royeltravelagency@gmail.com"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-6 responsive-column">
                      <div className="input-box">
                        <label className="label-text">Phone</label>
                        <div className="form-group">
                          <span className="la la-phone form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            defaultValue="+ 00 222 44 5678"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-6 responsive-column">
                      <div className="input-box">
                        <label className="label-text">Address</label>
                        <div className="form-group">
                          <span className="la la-map form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            defaultValue="124/6 Street view, USA"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-12">
                      <div className="btn-box">
                        <button className="theme-btn" type="button">
                          Save Changes
                        </button>
                      </div>
                    </div>
                    {/* end col-lg-12 */}
                  </div>
                  {/* end row */}
                </form>
              </div>
            </div>
          </div>
          {/* end form-box */}
        </div>
        {/* end col-lg-6 */}
        <div className="col-lg-6">
          <div className="form-box">
            <div className="form-title-wrap">
              <h3 className="title">Change Email</h3>
            </div>
            <div className="form-content">
              <div className="contact-form-action">
                <form action="#" className="MultiFile-intercepted">
                  <div className="row">
                    <div className="col-lg-12 responsive-column">
                      <div className="input-box">
                        <label className="label-text">Current Email</label>
                        <div className="form-group">
                          <span className="la la-envelope form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Current email"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-12 */}
                    <div className="col-lg-12 responsive-column">
                      <div className="input-box">
                        <label className="label-text">New Email</label>
                        <div className="form-group">
                          <span className="la la-envelope form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="New email"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-12 */}
                    <div className="col-lg-12 responsive-column">
                      <div className="input-box">
                        <label className="label-text">New Email Again</label>
                        <div className="form-group">
                          <span className="la la-envelope form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="New email again"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-12 */}
                    <div className="col-lg-12">
                      <div className="btn-box">
                        <button className="theme-btn" type="button">
                          Change Email
                        </button>
                      </div>
                    </div>
                    {/* end col-lg-12 */}
                  </div>
                  {/* end row */}
                </form>
              </div>
            </div>
          </div>
          {/* end form-box */}
        </div>
        {/* end col-lg-6 */}
        <div className="col-lg-6">
          <div className="form-box">
            <div className="form-title-wrap">
              <h3 className="title">Change Password</h3>
            </div>
            <div className="form-content">
              <div className="contact-form-action">
                <form action="#" className="MultiFile-intercepted">
                  <div className="row">
                    <div className="col-lg-6 responsive-column">
                      <div className="input-box">
                        <label className="label-text">Current Password</label>
                        <div className="form-group">
                          <span className="la la-lock form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Current password"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-6 responsive-column">
                      <div className="input-box">
                        <label className="label-text">New Password</label>
                        <div className="form-group">
                          <span className="la la-lock form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="New password"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-6 responsive-column">
                      <div className="input-box">
                        <label className="label-text">New Password Again</label>
                        <div className="form-group">
                          <span className="la la-lock form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="New password again"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-12">
                      <div className="btn-box">
                        <button className="theme-btn" type="button">
                          Change Password
                        </button>
                      </div>
                    </div>
                    {/* end col-lg-12 */}
                  </div>
                  {/* end row */}
                </form>
              </div>
            </div>
          </div>
          {/* end form-box */}
        </div>
        {/* end col-lg-6 */}
        <div className="col-lg-6">
          <div className="form-box">
            <div className="form-title-wrap">
              <h3 className="title">Payment Account Settings</h3>
            </div>
            <div className="form-content">
              <div className="contact-form-action">
                <form method="post" className="MultiFile-intercepted">
                  <div className="row">
                    <div className="col-lg-4 col-sm-4">
                      <div className="input-box">
                        <label className="label-text">Name on Card</label>
                        <div className="form-group">
                          <span className="la la-pencil form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            name="text"
                            defaultValue="Amex"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-4 */}
                    <div className="col-lg-4 col-sm-4">
                      <div className="input-box">
                        <label className="label-text">Card Number</label>
                        <div className="form-group">
                          <span className="la la-pencil form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            name="text"
                            defaultValue={3275476222500}
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-4 */}
                    <div className="col-lg-4 col-sm-4">
                      <div className="input-box">
                        <label className="label-text">Expiry Month</label>
                        <div className="form-group">
                          <span className="la la-pencil form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            name="text"
                            defaultValue="MM"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-4 */}
                    <div className="col-lg-6 col-sm-6">
                      <div className="input-box">
                        <label className="label-text">Expiry Year</label>
                        <div className="form-group">
                          <span className="la la-pencil form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            name="text"
                            defaultValue="YY"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-6 col-sm-6">
                      <div className="input-box">
                        <label className="label-text">CVV</label>
                        <div className="form-group">
                          <span className="la la-pencil form-icon" />
                          <input
                            className="form-control"
                            type="text"
                            name="text"
                            defaultValue="CVV"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-12">
                      <div className="btn-box">
                        <button className="theme-btn" type="submit">
                          Save Changes
                        </button>
                      </div>
                    </div>
                    {/* end col-lg-12 */}
                  </div>
                  {/* end row */}
                </form>
              </div>
            </div>
          </div>
          {/* end form-box */}
        </div>
        {/* end col-lg-6 */}
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
export default Setting;