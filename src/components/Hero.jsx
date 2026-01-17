const Hero = () => {
  return (
   <section className="hero-wrapper hero-wrapper2">
  <div className="hero-box pb-0">
    <div id="fullscreen-slide-contain">
      <ul className="slides-container">
        <li>
          <img src="/images/hero-bg2.jpg" alt="" />
        </li>
       
      
      </ul>
    </div>
    {/* End background slider */}
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="hero-content pb-5">
            <div className="section-heading">
              <p className="sec__desc pb-2">Hotel stays, Dream getaways</p>
              <h2 className="sec__title">
                Find the Perfect Place to Stay <br />
                for Your Next Trip
              </h2>
            </div>
          </div>
          {/* end hero-content */}
          <div className="search-fields-container">
            <div className="contact-form-action">
              <form action="#" className="row">
                <div className="col-lg-3 pe-0">
                  <div className="input-box">
                    <label className="label-text">
                      Destination / Hotel name
                    </label>
                    <div className="form-group">
                      <span className="la la-map-marker form-icon" />
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter City or property"
                      />
                    </div>
                  </div>
                </div>
                {/* end col-lg-3 */}
                <div className="col-lg-3 pe-0">
                  <div className="input-box">
                    <label className="label-text">Check in - Check out</label>
                    <div className="form-group">
                      <span className="la la-calendar form-icon" />
                      <input
                        className="date-range form-control"
                        type="text"
                        name="daterange"
                      />
                    </div>
                  </div>
                </div>
                {/* end col-lg-3 */}
                <div className="col-lg-3 pe-0">
                  <div className="input-box">
                    <label className="label-text">Room Type</label>
                    <div className="form-group select2-container-wrapper">
                      <div className="select-contain select-contain-shadow w-auto">
                        <select className="select-contain-select">
                          <option value={0}>Select Type</option>
                          <option value={1}>Single</option>
                          <option value={2}>Double</option>
                          <option value={3}>Triple</option>
                          <option value={4}>Quad</option>
                          <option value={5}>Queen</option>
                          <option value={6}>King</option>
                          <option value={7}>Twin</option>
                          <option value={8}>Double-double</option>
                          <option value={9}>Studio</option>
                          <option value={10}>Suite</option>
                          <option value={11}>Mini Suite</option>
                          <option value={12}>President Suite</option>
                          <option value={13}>President Suite</option>
                          <option value={14}>Apartments</option>
                          <option value={15}>Connecting rooms</option>
                          <option value={16}>Murphy Room</option>
                          <option value={17}>Accessible Room</option>
                          <option value={18}>Cabana</option>
                          <option value={19}>Adjoining rooms</option>
                          <option value={20}>Adjacent rooms</option>
                          <option value={21}>Villa</option>
                          <option value={22}>Executive Floor</option>
                          <option value={23}>Smoking room</option>
                          <option value={24}>Non-Smoking Room</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end col-lg-3 */}
                <div className="col-lg-3">
                  <div className="input-box">
                    <label className="label-text">Guests and Rooms</label>
                    <div className="form-group">
                      <div className="dropdown dropdown-contain gty-container">
                        <a
                          className="dropdown-toggle dropdown-btn"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          data-bs-auto-close="outside"
                        >
                          <span
                            className="adult"
                            data-text="Adult"
                            data-text-multi="Adults"
                          >
                            0 Adult
                          </span>
                          -
                          <span
                            className="children"
                            data-text="Child"
                            data-text-multi="Children"
                          >
                            0 Child
                          </span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-wrap">
                          <div className="dropdown-item">
                            <div className="qty-box d-flex align-items-center justify-content-between">
                              <label>Rooms</label>
                              <div className="qtyBtn d-flex align-items-center">
                                <div className="qtyDec">
                                  <i className="la la-minus" />
                                </div>
                                <input
                                  type="text"
                                  name="room_number"
                                  defaultValue={0}
                                  className="qty-input"
                                />
                                <div className="qtyInc">
                                  <i className="la la-plus" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="dropdown-item">
                            <div className="qty-box d-flex align-items-center justify-content-between">
                              <label>Adults</label>
                              <div className="qtyBtn d-flex align-items-center">
                                <div className="qtyDec">
                                  <i className="la la-minus" />
                                </div>
                                <input
                                  type="text"
                                  name="adult_number"
                                  defaultValue={0}
                                />
                                <div className="qtyInc">
                                  <i className="la la-plus" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="dropdown-item">
                            <div className="qty-box d-flex align-items-center justify-content-between">
                              <label>Children</label>
                              <div className="qtyBtn d-flex align-items-center">
                                <div className="qtyDec">
                                  <i className="la la-minus" />
                                </div>
                                <input
                                  type="text"
                                  name="child_number"
                                  defaultValue={0}
                                />
                                <div className="qtyInc">
                                  <i className="la la-plus" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* .end dropdown-contain */}
                    </div>
                  </div>
                </div>
                {/* end col-lg-3 */}
              </form>
              <div className="btn-box pt-2">
                <a href="room-search-result.html" className="theme-btn">
                  Search Now
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
    </div>
    {/* end container */}
  </div>
</section>

  );
};

export default Hero;