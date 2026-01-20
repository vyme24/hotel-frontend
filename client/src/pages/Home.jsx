import Hero from "../components/Hero";

const Home = () => {
  return (
    <>
    <Hero/>
    <>
  {/* ================================
    START INFO AREA
================================= */}
  <section className="info-area info-bg info-area2 padding-top-80px padding-bottom-45px">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 responsive-column">
          <div className="icon-box icon-layout-2 d-flex">
            <div className="info-icon flex-shrink-0 bg-rgb text-color-2">
              <i className="las la-radiation" />
            </div>
            {/* end info-icon*/}
            <div className="info-content">
              <h4 className="info__title">Unique Atmosphere</h4>
              <p className="info__desc">Varius quam quisque id diam vel quam</p>
            </div>
            {/* end info-content */}
          </div>
          {/* end icon-box */}
        </div>
        {/* end col-lg-3 */}
        <div className="col-lg-3 responsive-column">
          <div className="icon-box icon-layout-2 d-flex">
            <div className="info-icon flex-shrink-0 bg-rgb-2 text-color-3">
              <i className="la la-tree" />
            </div>
            {/* end info-icon*/}
            <div className="info-content">
              <h4 className="info__title">Environment</h4>
              <p className="info__desc">Varius quam quisque id diam vel quam</p>
            </div>
            {/* end info-content */}
          </div>
          {/* end icon-box */}
        </div>
        {/* end col-lg-3 */}
        <div className="col-lg-3 responsive-column">
          <div className="icon-box icon-layout-2 d-flex">
            <div className="info-icon flex-shrink-0 bg-rgb-3 text-color-4">
              <i className="las la-map-marked-alt" />
            </div>
            {/* end info-icon*/}
            <div className="info-content">
              <h4 className="info__title">Great Location</h4>
              <p className="info__desc">Varius quam quisque id diam vel quam</p>
            </div>
            {/* end info-content */}
          </div>
          {/* end icon-box */}
        </div>
        {/* end col-lg-3 */}
        <div className="col-lg-3 responsive-column">
          <div className="icon-box icon-layout-2 d-flex">
            <div className="info-icon flex-shrink-0 bg-rgb-4 text-color-5">
              <i className="las la-bed" />
            </div>
            {/* end info-icon*/}
            <div className="info-content">
              <h4 className="info__title">Homey Comfort</h4>
              <p className="info__desc">Varius quam quisque id diam vel quam</p>
            </div>
            {/* end info-content */}
          </div>
          {/* end icon-box */}
        </div>
        {/* end col-lg-3 */}
      </div>
      {/* end row */}
    </div>
    {/* end container */}
  </section>
  {/* end info-area */}
  {/* ================================
    END INFO AREA
================================= */}
  {/* ================================
    START ABOUT AREA
================================= */}
  <section className="about-area section--padding overflow-hidden">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="about-content pe-5">
            <div className="section-heading">
              <h4 className="font-size-16 pb-2">Our Story</h4>
              <h2 className="sec__title">Atmosphere and Design</h2>
              <p className="sec__desc pt-4 pb-2">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters
              </p>
              <p className="sec__desc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                accusamus amet consectetur ipsa officia. Doloremque error porro
                sit soluta totam! A iste nobis vel voluptatem!
              </p>
            </div>
            {/* end section-heading */}
            <div className="btn-box pt-4">
              <a href="about.html" className="theme-btn">
                Read More <i className="la la-arrow-right ms-1" />
              </a>
            </div>
          </div>
        </div>
        {/* end col-lg-6 */}
        <div className="col-lg-6">
          <div className="image-box about-img-box">
            <img
              src="/images/img5.jpg"
              alt="about-img"
              className="img__item img__item-1"
            />
            <img
              src="/images/tripadvisor.png"
              alt="about-img"
              className="img__item img__item-2"
            />
          </div>
        </div>
        {/* end col-lg-6 */}
      </div>
      {/* end row */}
    </div>
    {/* end container */}
  </section>
  {/* ================================
    END ABOUT AREA
================================= */}
  <div className="section-block" />
  {/* ================================
    START ROOM TYPE AREA
================================= */}
  <section className="room-type-area section--padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-heading text-center">
            <h2 className="sec__title">Find a Room Type</h2>
          </div>
          {/* end section-heading */}
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
      <div className="row padding-top-50px">
        <div className="col-lg-6">
          <div className="room-type-content">
            <div className="image-box">
              <a href="room-list.html" className="d-block">
                <img
                  src="/images/img27.jpg"
                  alt="room type img"
                  className="img__item"
                />
                <div className="room-type-link">
                  Dorm Beds <i className="la la-arrow-right ms-2" />
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* end col-lg-6 */}
        <div className="col-lg-6">
          <div className="room-type-content">
            <div className="image-box">
              <a href="room-list.html" className="d-block">
                <img
                  src="/images/img28.jpg"
                  alt="room type img"
                  className="img__item"
                />
                <div className="room-type-link">
                  Private Room <i className="la la-arrow-right ms-2" />
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* end col-lg-6 */}
      </div>
      {/* end row */}
    </div>
    {/* end container */}
  </section>
  {/* ================================
    END ROOM TYPE AREA
================================= */}
  {/* ================================
    START HOTEL AREA
================================= */}
  <section className="hotel-area section-bg padding-top-100px padding-bottom-200px overflow-hidden">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-heading text-center">
            <h2 className="sec__title line-height-55">
              Popular Hotel Destinations <br />
              You Might Like
            </h2>
          </div>
          {/* end section-heading */}
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
      <div className="row padding-top-50px">
        <div className="col-lg-12">
          <div className="hotel-card-wrap">
            <div className="hotel-card-carousel-2 carousel-action">
              <div className="card-item">
                <div className="card-img">
                  <a href="hotel-single.html" className="d-block">
                    <img src="/images/img1.jpg" alt="hotel-img" />
                  </a>
                  <span className="badge">Bestseller</span>
                  <span className="badge badge-ribbon">30% off</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">
                    <a href="hotel-single.html">
                      The Millennium Hilton New York
                    </a>
                  </h3>
                  <p className="card-meta">124 E Huron St, New york</p>
                  <div className="card-rating">
                    <span className="badge text-white">4.4/5</span>
                    <span className="review__text">Average</span>
                    <span className="rating__text">(30 Reviews)</span>
                  </div>
                  <div className="card-price d-flex align-items-center justify-content-between">
                    <p>
                      <span className="price__num">$90.00</span>
                      <span className="price__num before-price color-text-3">
                        $120.00
                      </span>
                      <span className="price__text">Per night</span>
                    </p>
                    <a href="hotel-single.html" className="btn-text">
                      See details
                      <i className="la la-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
              <div className="card-item">
                <div className="card-img">
                  <a href="hotel-single.html" className="d-block">
                    <img src="/images/img2.jpg" alt="hotel-img" />
                  </a>
                </div>
                <div className="card-body">
                  <h3 className="card-title">
                    <a href="hotel-single.html">
                      Best Western Grant Park Hotel
                    </a>
                  </h3>
                  <p className="card-meta">124 E Huron St, Chicago</p>
                  <div className="card-rating">
                    <span className="badge text-white">4.4/5</span>
                    <span className="review__text">Average</span>
                    <span className="rating__text">(30 Reviews)</span>
                  </div>
                  <div className="card-price d-flex align-items-center justify-content-between">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$58.00</span>
                      <span className="price__text">Per night</span>
                    </p>
                    <a href="hotel-single.html" className="btn-text">
                      See details
                      <i className="la la-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
              <div className="card-item">
                <div className="card-img">
                  <a href="hotel-single.html" className="d-block">
                    <img src="/images/img3.jpg" alt="hotel-img" />
                  </a>
                  <span className="badge">Featured</span>
                  <span className="badge badge-ribbon">20% off</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">
                    <a href="hotel-single.html">
                      Hyatt Regency Maui Resort &amp; Spa
                    </a>
                  </h3>
                  <p className="card-meta">200 Nohea Kai Dr, Lahaina, HI</p>
                  <div className="card-rating">
                    <span className="badge text-white">4.4/5</span>
                    <span className="review__text">Average</span>
                    <span className="rating__text">(30 Reviews)</span>
                  </div>
                  <div className="card-price d-flex align-items-center justify-content-between">
                    <p>
                      <span className="price__num">$80.00</span>
                      <span className="price__num before-price color-text-3">
                        $100.00
                      </span>
                      <span className="price__text">Per night</span>
                    </p>
                    <a href="hotel-single.html" className="btn-text">
                      See details
                      <i className="la la-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
              <div className="card-item">
                <div className="card-img">
                  <a href="hotel-single.html" className="d-block">
                    <img src="/images/img4.jpg" alt="hotel-img" />
                  </a>
                  <span className="badge">Popular</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">
                    <a href="hotel-single.html">
                      Four Seasons Resort Maui at Wailea
                    </a>
                  </h3>
                  <p className="card-meta">
                    3900 Wailea Alanui Drive, Kihei, HI
                  </p>
                  <div className="card-rating">
                    <span className="badge text-white">4.4/5</span>
                    <span className="review__text">Average</span>
                    <span className="rating__text">(30 Reviews)</span>
                  </div>
                  <div className="card-price d-flex align-items-center justify-content-between">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$88.00</span>
                      <span className="price__text">Per night</span>
                    </p>
                    <a href="hotel-single.html" className="btn-text">
                      See details
                      <i className="la la-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
              <div className="card-item">
                <div className="card-img">
                  <a href="hotel-single.html" className="d-block">
                    <img src="/images/img5.jpg" alt="hotel-img" />
                  </a>
                </div>
                <div className="card-body">
                  <h3 className="card-title">
                    <a href="hotel-single.html">Ibis Styles London Heathrow</a>
                  </h3>
                  <p className="card-meta">
                    272 Bath Road, Harlington, England
                  </p>
                  <div className="card-rating">
                    <span className="badge text-white">4.4/5</span>
                    <span className="review__text">Average</span>
                    <span className="rating__text">(30 Reviews)</span>
                  </div>
                  <div className="card-price d-flex align-items-center justify-content-between">
                    <p>
                      <span className="price__from">From</span>
                      <span className="price__num">$88.00</span>
                      <span className="price__text">Per night</span>
                    </p>
                    <a href="hotel-single.html" className="btn-text">
                      See details
                      <i className="la la-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
              <div className="card-item">
                <div className="card-img">
                  <a href="hotel-single.html" className="d-block">
                    <img src="/images/img6.jpg" alt="hotel-img" />
                  </a>
                  <span className="badge badge-ribbon">10% off</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">
                    <a href="hotel-single.html">
                      Hotel Europe Saint Severin Paris
                    </a>
                  </h3>
                  <p className="card-meta">
                    38-40 Rue Saint Séverin, Paris, Paris
                  </p>
                  <div className="card-rating">
                    <span className="badge text-white">4.4/5</span>
                    <span className="review__text">Average</span>
                    <span className="rating__text">(30 Reviews)</span>
                  </div>
                  <div className="card-price d-flex align-items-center justify-content-between">
                    <p>
                      <span className="price__num">$70.00</span>
                      <span className="price__num before-price color-text-3">
                        $80.00
                      </span>
                      <span className="price__text">Per night</span>
                    </p>
                    <a href="hotel-single.html" className="btn-text">
                      See details
                      <i className="la la-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
              {/* end card-item */}
            </div>
            {/* end hotel-card-carousel */}
          </div>
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
    </div>
    {/* end container-fluid */}
  </section>
  {/* end hotel-area */}
  {/* ================================
    END HOTEL AREA
================================= */}
  {/* ================================
    START DISCOUNT AREA
================================= */}
  <section className="discount-area">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="discount-box">
            <div className="discount-img">
              <img src="/images/discount-hotel-img.jpg" alt="discount img" />
            </div>
            {/* end discount-img */}
            <div className="discount-content">
              <div className="section-heading">
                <p className="sec__desc text-white">Hot deal, save 50%</p>
                <h2 className="sec__title mb-0 line-height-50 text-white">
                  Discount 50% for the <br />
                  First Booking
                </h2>
              </div>
              {/* end section-heading */}
              <div className="btn-box pt-4">
                <a href="#" className="theme-btn border-0">
                  Learn More <i className="la la-arrow-right ms-1" />
                </a>
              </div>
            </div>
            {/* end discount-content */}
            <div className="company-logo">
              <img src="/images/logo2.png" alt="" />
              <p className="text-white font-size-14 text-end">*Terms applied</p>
            </div>
            {/* end company-logo */}
          </div>
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
    </div>
    {/* end container */}
  </section>
  {/* end discount-area */}
  {/* ================================
    END DISCOUNT AREA
================================= */}
  {/* ================================
 START TESTIMONIAL AREA
================================= */}
  <section className="testimonial-area section-padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-heading text-center mb-0">
            <h2 className="sec__title line-height-50">
              What Our Customers <br />
              are Saying Us?
            </h2>
          </div>
          {/* end section-heading */}
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row  */}
      <div className="row padding-top-50px">
        <div className="col-lg-12">
          <div className="testimonial-carousel carousel-action">
            <div className="testimonial-card">
              <div className="testi-desc-box">
                <p className="testi__desc">
                  Excepteur sint occaecat cupidatat non proident sunt in culpa
                  officia deserunt mollit anim laborum sint occaecat cupidatat
                  non proident. Occaecat cupidatat non proident des.
                </p>
              </div>
              <div className="author-content d-flex align-items-center">
                <div className="author-img">
                  <img src="/images/team8.jpg" alt="testimonial image" />
                </div>
                <div className="author-bio">
                  <h4 className="author__title">Leroy Bell</h4>
                  <span className="author__meta">United States</span>
                  <span className="ratings d-flex align-items-center">
                    <i className="la la-star" />
                    <i className="la la-star" />
                    <i className="la la-star" />
                    <i className="la la-star" />
                    <i className="la la-star" />
                  </span>
                </div>
              </div>
            </div>
            {/* end testimonial-card */}
            <div className="testimonial-card">
              <div className="testi-desc-box">
                <p className="testi__desc">
                  Excepteur sint occaecat cupidatat non proident sunt in culpa
                  officia deserunt mollit anim laborum sint occaecat cupidatat
                  non proident. Occaecat cupidatat non proident des.
                </p>
              </div>
              <div className="author-content d-flex align-items-center">
                <div className="author-img">
                  <img src="/images/team9.jpg" alt="testimonial image" />
                </div>
                <div className="author-bio">
                  <h4 className="author__title">Richard Pam</h4>
                  <span className="author__meta">Canada</span>
                  <span className="ratings d-flex align-items-center">
                    <i className="la la-star" />
                    <i className="la la-star" />
                    <i className="la la-star" />
                    <i className="la la-star" />
                    <i className="la la-star" />
                  </span>
                </div>
              </div>
            </div>
            {/* end testimonial-card */}
            <div className="testimonial-card">
              <div className="testi-desc-box">
                <p className="testi__desc">
                  Excepteur sint occaecat cupidatat non proident sunt in culpa
                  officia deserunt mollit anim laborum sint occaecat cupidatat
                  non proident. Occaecat cupidatat non proident des.
                </p>
              </div>
              <div className="author-content d-flex align-items-center">
                <div className="author-img">
                  <img src="/images/team10.jpg" alt="testimonial image" />
                </div>
                <div className="author-bio">
                  <h4 className="author__title">Luke Jacobs</h4>
                  <span className="author__meta">Australia</span>
                  <span className="ratings d-flex align-items-center">
                    <i className="la la-star" />
                    <i className="la la-star" />
                    <i className="la la-star" />
                    <i className="la la-star" />
                    <i className="la la-star" />
                  </span>
                </div>
              </div>
            </div>
            {/* end testimonial-card */}
            <div className="testimonial-card">
              <div className="testi-desc-box">
                <p className="testi__desc">
                  Excepteur sint occaecat cupidatat non proident sunt in culpa
                  officia deserunt mollit anim laborum sint occaecat cupidatat
                  non proident. Occaecat cupidatat non proident des.
                </p>
              </div>
              <div className="author-content d-flex align-items-center">
                <div className="author-img">
                  <img src="/images/team8.jpg" alt="testimonial image" />
                </div>
                <div className="author-bio">
                  <h4 className="author__title">Chulbul Panday</h4>
                  <span className="author__meta">Italy</span>
                  <span className="ratings d-flex align-items-center">
                    <i className="la la-star" />
                    <i className="la la-star" />
                    <i className="la la-star" />
                    <i className="la la-star" />
                    <i className="la la-star" />
                  </span>
                </div>
              </div>
            </div>
            {/* end testimonial-card */}
          </div>
          {/* end testimonial-carousel */}
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
    </div>
    {/* end container */}
  </section>
  {/* end testimonial-area */}
  {/* ================================
 START TESTIMONIAL AREA
================================= */}
  <div className="section-block" />
  {/* ================================
 START BLOG AREA
================================= */}
  <section className="blog-area section--padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-heading text-center">
            <h2 className="sec__title">Recent Articles</h2>
          </div>
          {/* end section-heading */}
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
      <div className="row padding-top-50px">
        <div className="col-lg-4 responsive-column">
          <div className="card-item blog-card">
            <div className="card-img">
              <img src="/images/img5.jpg" alt="blog-img" />
              <div className="post-format icon-element">
                <i className="la la-photo" />
              </div>
              <div className="card-body">
                <div className="post-categories">
                  <a href="#" className="badge">
                    Travel
                  </a>
                  <a href="#" className="badge">
                    lifestyle
                  </a>
                </div>
                <h3 className="card-title line-height-26">
                  <a href="blog-single.html">
                    Best Scandinavian Accommodation – Treat Yourself
                  </a>
                </h3>
                <p className="card-meta">
                  <span className="post__date"> 1 January, 2020</span>
                  <span className="post-dot" />
                  <span className="post__time">5 Mins read</span>
                </p>
              </div>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <div className="author-content d-flex align-items-center">
                <div className="author-img">
                  <img src="/images/small-team1.jpg" alt="testimonial image" />
                </div>
                <div className="author-bio">
                  <a href="#" className="author__title">
                    Leroy Bell
                  </a>
                </div>
              </div>
              <div className="post-share">
                <ul>
                  <li>
                    <i className="la la-share icon-element" />
                    <ul className="post-share-dropdown d-flex align-items-center">
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
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* end card-item */}
        </div>
        {/* end col-lg-4 */}
        <div className="col-lg-4 responsive-column">
          <div className="card-item blog-card">
            <div className="card-img">
              <img src="/images/img6.jpg" alt="blog-img" />
              <div className="post-format icon-element">
                <i className="la la-play" />
              </div>
              <div className="card-body">
                <div className="post-categories">
                  <a href="#" className="badge">
                    Video
                  </a>
                </div>
                <h3 className="card-title line-height-26">
                  <a href="blog-single.html">
                    Amazing Places to Stay in Norway
                  </a>
                </h3>
                <p className="card-meta">
                  <span className="post__date"> 1 February, 2020</span>
                  <span className="post-dot" />
                  <span className="post__time">4 Mins read</span>
                </p>
              </div>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <div className="author-content d-flex align-items-center">
                <div className="author-img">
                  <img src="/images/small-team2.jpg" alt="testimonial image" />
                </div>
                <div className="author-bio">
                  <a href="#" className="author__title">
                    Phillip Hunt
                  </a>
                </div>
              </div>
              <div className="post-share">
                <ul>
                  <li>
                    <i className="la la-share icon-element" />
                    <ul className="post-share-dropdown d-flex align-items-center">
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
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* end card-item */}
        </div>
        {/* end col-lg-4 */}
        <div className="col-lg-4 responsive-column">
          <div className="card-item blog-card">
            <div className="card-img">
              <img src="/images/img7.jpg" alt="blog-img" />
              <div className="post-format icon-element">
                <i className="la la-music" />
              </div>
              <div className="card-body">
                <div className="post-categories">
                  <a href="#" className="badge">
                    audio
                  </a>
                </div>
                <h3 className="card-title line-height-26">
                  <a href="blog-single.html">
                    Feel Like Home on Your Business Trip
                  </a>
                </h3>
                <p className="card-meta">
                  <span className="post__date"> 1 March, 2020</span>
                  <span className="post-dot" />
                  <span className="post__time">3 Mins read</span>
                </p>
              </div>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <div className="author-content d-flex align-items-center">
                <div className="author-img">
                  <img src="/images/small-team3.jpg" alt="testimonial image" />
                </div>
                <div className="author-bio">
                  <a href="#" className="author__title">
                    Luke Jacobs
                  </a>
                </div>
              </div>
              <div className="post-share">
                <ul>
                  <li>
                    <i className="la la-share icon-element" />
                    <ul className="post-share-dropdown d-flex align-items-center">
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
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* end card-item */}
        </div>
        {/* end col-lg-4 */}
      </div>
      {/* end row */}
    </div>
    {/* end container */}
  </section>
  {/* end blog-area */}
  {/* ================================
 START BLOG AREA
================================= */}
  {/* ================================
    START CTA AREA
================================= */}
  <section className="cta-area subscriber-area section-bg-2 padding-top-60px padding-bottom-60px">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-7">
          <div className="section-heading">
            <p className="sec__desc text-white-50 pb-1">Newsletter Sign up</p>
            <h2 className="sec__title font-size-30 text-white">
              Subscribe to Get Special Offers
            </h2>
          </div>
          {/* end section-heading */}
        </div>
        {/* end col-lg-7 */}
        <div className="col-lg-5">
          <div className="subscriber-box">
            <div className="contact-form-action">
              <form action="#">
                <div className="input-box">
                  <label className="label-text text-white">
                    Enter email address
                  </label>
                  <div className="form-group mb-0">
                    <span className="la la-envelope form-icon" />
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Email address"
                    />
                    <button
                      className="theme-btn theme-btn-small submit-btn"
                      type="submit"
                    >
                      Subscribe
                    </button>
                    <span className="font-size-14 pt-1 text-white-50">
                      <i className="la la-lock me-1" />
                      Don't worry your information is safe with us.
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* end section-heading */}
        </div>
        {/* end col-lg-5 */}
      </div>
      {/* end row */}
    </div>
    {/* end container */}
  </section>
  {/* end cta-area */}
  {/* ================================
    END CTA AREA
================================= */}
</>

    </>
  )
}

export default Home;