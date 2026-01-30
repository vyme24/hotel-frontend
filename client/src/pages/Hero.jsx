import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from 'axios';

const Header = () => {
    const [user, setUser ] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            getUser(token)
        }
    },[])

    const getUser = async (token) => {
        try {
            const res = await axios.get("https://api.bookmyhotelroom.online/auth/getUser", {
                headers: {
                    'Authorization': token 
                }
            });
            
            if (res.data.data) {
                setUser(res.data.data);
            }
            
        } catch (error) {
            console.error("Failed to fetch user:", error);
            localStorage.removeItem("token");
        }
    }

    const logout = () => {
        const confirm = window.confirm("Are you Sure?")
        if(confirm){
            localStorage.removeItem("token");
            window.location.reload();
        }
    }

    const [destination, setDestination] = useState("Chandigarh");
    const [dates, setDates] = useState("Wed, 26 Nov - Thu, 27 Nov"); 
    const [guests, setGuests] = useState("1 Room, 1 Guest");

    return (
        <nav className="navbar navbar-expand-lg bg-white  header-oyo-style">
            <div className="container-fluid d-flex align-items-center px-4">
                
                <Link className="navbar-brand fs-2 fw-bolder me-4" to="/">
                    <span className="text-danger">Lux</span><span className="text-dark">Stay</span>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#searchAndAuthNav" aria-controls="searchAndAuthNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse flex-grow-1" id="searchAndAuthNav">
                    
                    <div className="d-none d-lg-flex flex-grow-1 justify-content-center">
                        <div className="search-bar-oyo border rounded-2 shadow-sm d-flex align-items-stretch">
                            
                            <div className="search-field-oyo d-flex align-items-center">
                                <i className="bi bi-geo-alt-fill text-muted me-2 fs-5"></i>
                                <input type="text" className="border-0 shadow-none bg-transparent" placeholder="Location" value={destination} onChange={(e) => setDestination(e.target.value)} />
                                
                                <button className="btn btn-light rounded-pill fw-semibold text-dark near-me-btn me-2">
                                    <i className="bi bi-crosshair me-1"></i> Near me
                                </button>
                            </div>

                            <div className="d-flex align-items-stretch">
                                <div className="search-field-date p-3 d-flex align-items-center border-start">
                                    <input type="text" className="border-0 shadow-none bg-transparent" placeholder="Check-in - Check-out" value={dates} readOnly />
                                </div>
                                
                                <div className="search-field-guest p-3 d-flex align-items-center border-start">
                                    <input type="text" className="border-0 shadow-none bg-transparent" placeholder="Guests" value={guests} readOnly />
                                </div>
                                
                                <button className="btn btn-success rounded-end-2 rounded-start-0 fw-bold px-4 h-100 search-btn-oyo">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex align-items-center ms-auto ps-3">
                        
                        {!user ? (
                            <div className="d-flex align-items-center gap-3">
                                <Link to="/Login" className="text-decoration-none text-dark fw-bold login-link-oyo">
                                    Sign In
                                </Link>
                                <Link to="/Signup" className="text-decoration-none text-dark fw-bold login-link-oyo">
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div className="dropdown">
                                <a className="d-flex align-items-center text-decoration-none text-dark dropdown-toggle fw-bold login-link-oyo" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-circle fs-4 me-2 text-primary"></i>
                                    {user.email.split('@')[0]}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                                    <li><Link className="dropdown-item" to="/profile"><i className="bi bi-person-fill me-2"></i> My Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/bookings"><i className="bi bi-journal-bookmark-fill me-2"></i> Bookings</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item text-danger" onClick={logout}><i className="bi bi-box-arrow-right me-2"></i> Logout</button></li>
                                </ul>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </nav>
    );
};


export default Header;