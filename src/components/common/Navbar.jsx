import { Link, matchPath } from "react-router-dom";
import "./Navbar.css";
import React, { useEffect, useState, useRef } from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { TfiShoppingCart } from "react-icons/tfi";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiconnector";
import { catagories } from "../../services/api";
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const location = useLocation();
  const catalogRef = useRef(null);

  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileCatalog, setShowMobileCatalog] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const result = await apiConnector("GET", catagories.CATAGORIES_API);
        setSubLinks(result.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (catalogRef.current && !catalogRef.current.contains(e.target)) {
        setIsCatalogOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className={`entireNav ${location.pathname !== "/" ? "bg-other-page" : "bg-home"}`}>
      <div className="navbar">
        <div className="nav-left">
          <Link to="/">
            <img src={logo} alt="Logo" width={180} height={32} />
          </Link>
        </div>

        <nav className="nav-middle">
          <ul className="nav-ul">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className="catalogDiv"
                    ref={catalogRef}
                    onMouseEnter={() => setIsCatalogOpen(true)}
                    onMouseLeave={() => setIsCatalogOpen(false)}
                    onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                  >
                    <p>{link.title}</p>
                    <IoIosArrowDown />
                    {isCatalogOpen && (
                      <div className="rectangle">
                        <div className="trangle"></div>
                        {loading ? (
                          <p>Loading...</p>
                        ) : subLinks.length ? (
                          subLinks.map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              key={i}
                              onClick={() => setIsCatalogOpen(false)}
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))
                        ) : (
                          <p>No Courses Found</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p className={`nav-title ${matchRoute(link.path) ? "activeBg" : ""}`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-right">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="nav-right-carticon">
              <TfiShoppingCart fill="white" />
              {totalItems > 0 && <span className="nav-right-item">{totalItems}</span>}
            </Link>
          )}
          {!token ? (
            <>
              <Link to="/login"><button className="navbtn">Log in</button></Link>
              <Link to="/signup"><button className="navbtn">Sign up</button></Link>
            </>
          ) : (
            <ProfileDropdown />
          )}

          <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav-menu">
          <ul>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div className="mobile-catalog-toggle" onClick={() => setShowMobileCatalog(prev => !prev)}>
                      {link.title} <IoIosArrowDown />
                    </div>
                    {showMobileCatalog && (
                      <ul className="mobile-submenu">
                        {loading ? (
                          <li>Loading...</li>
                        ) : subLinks.length ? (
                          subLinks.map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              key={i}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setShowMobileCatalog(false);
                              }}
                            >
                              <li>{subLink.name}</li>
                            </Link>
                          ))
                        ) : (
                          <li>No Courses Found</li>
                        )}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link to={link.path} onClick={() => setMobileMenuOpen(false)}>
                    <li>{link.title}</li>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
