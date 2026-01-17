const TrableAgent =()=>{
    return(
        <>
        <div className="dashboard-content-wrap">
  <div className="dashboard-bread dashboard--bread dashboard-bread-2">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="breadcrumb-content">
            <div className="section-heading">
              <h2 className="sec__title font-size-30 text-white">
                Travel Agents
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
              <li>Travel Agents</li>
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
              <h3 className="title">Travel Agent Lists</h3>
              <p className="font-size-14">Showing 1 to 8 of 20 entries</p>
            </div>
            <div className="form-content">
              <div className="table-form table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Agency Name</th>
                      <th scope="col">Website</th>
                      <th scope="col">Email</th>
                      <th scope="col">Country</th>
                      <th scope="col">City</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>
                        <div className="table-content">
                          <h3 className="title">Ocean Travel Agency</h3>
                        </div>
                      </td>
                      <td>
                        <a href="#" className="color-text">
                          www.oceantravelagency.com
                        </a>
                      </td>
                      <td>oceantravelagency@gmail.com</td>
                      <td>Italy</td>
                      <td>Rome</td>
                      <td>
                        <span className="badge text-bg-success py-1 px-2">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="table-content">
                          <a
                            href="#"
                            className="theme-btn theme-btn-small me-2"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="View"
                            data-bs-original-title="View"
                          >
                            <i className="la la-eye" />
                          </a>
                          <a
                            href="#"
                            className="theme-btn theme-btn-small"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="Edit"
                            data-bs-original-title="Edit"
                          >
                            <i className="la la-edit" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>
                        <div className="table-content">
                          <h3 className="title">Taimor Travel Agency</h3>
                        </div>
                      </td>
                      <td>
                        <a href="#" className="color-text">
                          www.oceantravelagency.com
                        </a>
                      </td>
                      <td>oceantravelagency@gmail.com</td>
                      <td>Italy</td>
                      <td>Rome</td>
                      <td>
                        <span className="badge text-bg-danger py-1 px-2">
                          Inactive
                        </span>
                      </td>
                      <td>
                        <div className="table-content">
                          <a
                            href="#"
                            className="theme-btn theme-btn-small me-2"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="View"
                            data-bs-original-title="View"
                          >
                            <i className="la la-eye" />
                          </a>
                          <a
                            href="#"
                            className="theme-btn theme-btn-small"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="Edit"
                            data-bs-original-title="Edit"
                          >
                            <i className="la la-edit" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>
                        <div className="table-content">
                          <h3 className="title">Ocean Travel Agency</h3>
                        </div>
                      </td>
                      <td>
                        <a href="#" className="color-text">
                          www.oceantravelagency.com
                        </a>
                      </td>
                      <td>oceantravelagency@gmail.com</td>
                      <td>Italy</td>
                      <td>Rome</td>
                      <td>
                        <span className="badge text-bg-success py-1 px-2">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="table-content">
                          <a
                            href="#"
                            className="theme-btn theme-btn-small me-2"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="View"
                            data-bs-original-title="View"
                          >
                            <i className="la la-eye" />
                          </a>
                          <a
                            href="#"
                            className="theme-btn theme-btn-small"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="Edit"
                            data-bs-original-title="Edit"
                          >
                            <i className="la la-edit" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>
                        <div className="table-content">
                          <h3 className="title">Al Monsur Travel Agency</h3>
                        </div>
                      </td>
                      <td>
                        <a href="#" className="color-text">
                          www.oceantravelagency.com
                        </a>
                      </td>
                      <td>oceantravelagency@gmail.com</td>
                      <td>Italy</td>
                      <td>Rome</td>
                      <td>
                        <span className="badge text-bg-success py-1 px-2">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="table-content">
                          <a
                            href="#"
                            className="theme-btn theme-btn-small me-2"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="View"
                            data-bs-original-title="View"
                          >
                            <i className="la la-eye" />
                          </a>
                          <a
                            href="#"
                            className="theme-btn theme-btn-small"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="Edit"
                            data-bs-original-title="Edit"
                          >
                            <i className="la la-edit" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>
                        <div className="table-content">
                          <h3 className="title">Digital Travel Agency</h3>
                        </div>
                      </td>
                      <td>
                        <a href="#" className="color-text">
                          www.oceantravelagency.com
                        </a>
                      </td>
                      <td>oceantravelagency@gmail.com</td>
                      <td>Italy</td>
                      <td>Rome</td>
                      <td>
                        <span className="badge text-bg-success py-1 px-2">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="table-content">
                          <a
                            href="#"
                            className="theme-btn theme-btn-small me-2"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="View"
                            data-bs-original-title="View"
                          >
                            <i className="la la-eye" />
                          </a>
                          <a
                            href="#"
                            className="theme-btn theme-btn-small"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="Edit"
                            data-bs-original-title="Edit"
                          >
                            <i className="la la-edit" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>
                        <div className="table-content">
                          <h3 className="title">Kamran Travel Agency</h3>
                        </div>
                      </td>
                      <td>
                        <a href="#" className="color-text">
                          www.oceantravelagency.com
                        </a>
                      </td>
                      <td>oceantravelagency@gmail.com</td>
                      <td>Italy</td>
                      <td>Rome</td>
                      <td>
                        <span className="badge text-bg-success py-1 px-2">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="table-content">
                          <a
                            href="#"
                            className="theme-btn theme-btn-small me-2"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="View"
                            data-bs-original-title="View"
                          >
                            <i className="la la-eye" />
                          </a>
                          <a
                            href="#"
                            className="theme-btn theme-btn-small"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="Edit"
                            data-bs-original-title="Edit"
                          >
                            <i className="la la-edit" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">7</th>
                      <td>
                        <div className="table-content">
                          <h3 className="title">Tielab Travel Agency</h3>
                        </div>
                      </td>
                      <td>
                        <a href="#" className="color-text">
                          www.oceantravelagency.com
                        </a>
                      </td>
                      <td>oceantravelagency@gmail.com</td>
                      <td>Italy</td>
                      <td>Rome</td>
                      <td>
                        <span className="badge text-bg-success py-1 px-2">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="table-content">
                          <a
                            href="#"
                            className="theme-btn theme-btn-small me-2"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="View"
                            data-bs-original-title="View"
                          >
                            <i className="la la-eye" />
                          </a>
                          <a
                            href="#"
                            className="theme-btn theme-btn-small"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="Edit"
                            data-bs-original-title="Edit"
                          >
                            <i className="la la-edit" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">8</th>
                      <td>
                        <div className="table-content">
                          <h3 className="title">Lequid Travel Agency</h3>
                        </div>
                      </td>
                      <td>
                        <a href="#" className="color-text">
                          www.oceantravelagency.com
                        </a>
                      </td>
                      <td>oceantravelagency@gmail.com</td>
                      <td>Italy</td>
                      <td>Rome</td>
                      <td>
                        <span className="badge text-bg-success py-1 px-2">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="table-content">
                          <a
                            href="#"
                            className="theme-btn theme-btn-small me-2"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="View"
                            data-bs-original-title="View"
                          >
                            <i className="la la-eye" />
                          </a>
                          <a
                            href="#"
                            className="theme-btn theme-btn-small"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                            aria-label="Edit"
                            data-bs-original-title="Edit"
                          >
                            <i className="la la-edit" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
export default TrableAgent