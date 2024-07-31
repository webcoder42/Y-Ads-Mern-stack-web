import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import "../../Styles/Header.css";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [siteTitle, setSiteTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [packageMembershipDropdownOpen, setPackageMembershipDropdownOpen] =
    useState(false);
  const [Ads, setAds] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    alert("Logout Successfully");
  };

  const getTitle = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/title/get-title"
      );
      setSiteTitle(data.titles[0]?.siteTitle || "Y-Ads");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getTitle();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleAdsDropdown = () => {
    setAds(!Ads);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const togglePackageMembershipDropdown = () => {
    setPackageMembershipDropdownOpen(!packageMembershipDropdownOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="brand">
          <NavLink to="/" className="navbar-brand">
            <div className="site-title">
              <h1>
                <span className="title-part-1">{siteTitle.split("-")[0]}</span>
                <span className="title-part-2">{siteTitle.split("-")[1]}</span>
              </h1>
            </div>
          </NavLink>

          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <nav className={`nav ${isOpen ? "open" : ""}`}>
          <ul>
            {!auth.user ? (
              <>
                <li>
                  <NavLink to="/" activeClassName="active">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/work" activeClassName="active">
                    Work
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" activeClassName="active">
                    Contact Us
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {auth.user.role === 1 ? (
                  <li>
                    <NavLink to="/dashboard/admin" activeClassName="active">
                      Admin Dashboard
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink to="/dashboard/user" activeClassName="active">
                      User Dashboard
                    </NavLink>
                  </li>
                )}
                <li
                  className={`dropdown ${
                    packageMembershipDropdownOpen ? "open" : ""
                  }`}
                >
                  <span
                    className="dropdown-toggle"
                    onClick={togglePackageMembershipDropdown}
                  >
                    Deposite
                  </span>
                  {packageMembershipDropdownOpen && (
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to="/dashboard/user/buy-package"
                          activeClassName="active"
                        >
                          Buy Package
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/user/membership"
                          activeClassName="active"
                        >
                          Membership
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
                <li className={`dropdown ${dropdownOpen ? "open" : ""}`}>
                  <span className="dropdown-toggle" onClick={toggleDropdown}>
                    Cash Out
                  </span>
                  {dropdownOpen && (
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to="/dashboard/user/withdrawal"
                          activeClassName="active"
                        >
                          Withdrawal
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/user/withdrawalhistory"
                          activeClassName="active"
                        >
                          Withdrawal History
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
                <li className={`dropdown ${Ads ? "open" : ""}`}>
                  <span className="dropdown-toggle" onClick={toggleAdsDropdown}>
                    Watching Ads
                  </span>
                  {Ads && (
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to="/dashboard/user/ads"
                          activeClassName="active"
                        >
                          Short Earn
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/user/longearn"
                          activeClassName="active"
                        >
                          Long Earn
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <NavLink
                    to="/dashboard/user/totel-team"
                    activeClassName="active"
                  >
                    Teams
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/user/contact-user"
                    activeClassName="active"
                  >
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/user/profile"
                    activeClassName="active"
                  >
                    👨🏻 {auth.user.username}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {!auth.user ? (
            <NavLink to="/login">
              <button className="btn login-btn" style={{ marginLeft: "20px" }}>
                Login
              </button>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="btn logout-btn "
              style={{ marginLeft: "20px" }}
              onClick={handleLogout}
              type="Loyout"
            >
              {loading ? "Logout..." : "Logout"}
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
