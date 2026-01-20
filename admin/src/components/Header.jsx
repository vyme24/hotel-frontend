const Header = () => {
  return (
   <>
   <header className="header-area">
 
  <div className="header-menu-wrapper">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="menu-wrapper justify-content-center">
            <a href="#" className="down-button">
              <i className="la la-angle-down" />
            </a>
            <div className="logo">
              <a href="/">
                <img src="/images/logo.png" alt="logo" />
              </a>
              <div className="menu-toggler">
                <i className="la la-bars" />
                <i className="la la-times" />
              </div>
              {/* end menu-toggler */}
            </div>
          
          </div>
          {/* end menu-wrapper */}
        </div>
        {/* end col-lg-12 */}
      </div>
      {/* end row */}
    </div>
    {/* end container-fluid */}
  </div>
  {/* end header-menu-wrapper */}
</header>

   </>
  );
};

export default Header;