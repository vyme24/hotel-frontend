const BreadCrumb = () => {
  return (
   <div className="dashboard-bread dashboard-bread-2 mb-3">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="breadcrumb-content">
            <div className="section-heading">
              <h2 className="sec__title font-size-30 text-white">Dashboard</h2>
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
              <li>Pages</li>
              <li>Dashboard</li>
            </ul>
          </div>
          {/* end breadcrumb-list */}
        </div>
        {/* end col-lg-6 */}
      </div>
   
    </div>
  </div>
  );
};

export default BreadCrumb;