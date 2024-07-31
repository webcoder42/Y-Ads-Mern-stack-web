import React, { useState, useEffect } from "react";

import axios from "axios";
import { useAuth } from "../../Context/auth";
import logo from "../../Assets/sitelogo.png";
import Spinner from "./../../Componet/Spinner";
import Layout from "./../../Componet/Layout/Layout";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [earnings, setEarnings] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const switchers = document.querySelectorAll(".switcher");
    switchers.forEach((item) => {
      item.addEventListener("click", function () {
        switchers.forEach((item) =>
          item.parentElement.classList.remove("is-active")
        );
        this.parentElement.classList.add("is-active");
      });
    });

    // Clean up event listeners
    return () => {
      switchers.forEach((item) => item.removeEventListener("click", () => {}));
    };
  }, []);

  const getSiteData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/title/get-title"
      );
      if (data.titles.length > 0) {
        setSiteTitle(data.titles[0].siteTitle);
        setSiteDescription(data.titles[0].siteDescription);
      }
    } catch (error) {
      console.error("Something went wrong while fetching site data", error);
    }
  };

  useEffect(() => {
    getSiteData();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a 2-second delay, replace with actual loading logic

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (auth?.user) {
      const { username, email } = auth.user;
      setUsername(username);
      setEmail(email);
    }
    setLoading(false); // Simulating loading completion
  }, [auth?.user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/v1/users/update-profile",
        { username, email }
      );
      if (data?.error) {
        alert(data.error);
      } else {
        setAuth({ ...auth, user: data.updatedUser });
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, user: data.updatedUser })
        );
        alert("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    setPasswordLoading(true);
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/v1/users/change-password",
        { currentPassword: password, newPassword }
      );
      if (data?.error) {
        alert(data.error);
      } else {
        alert("Password Changed Successfully");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setPasswordLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserEarnings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/earnings"
        );
        setEarnings(response.data);
      } catch (err) {
        setError("Failed to fetch earnings.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserEarnings();
  }, []);

  return (
    <Layout title={"User_Profile  Y -Ads"}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div
            className="dashboard-container bg-light text-center py-4 p-5 position-relative"
            style={{
              height: "auto",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center h-100 flex-wrap">
              <div>
                <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>
                  PROFILE
                </h1>
              </div>
              <div className="d-flex align-items-center details-container">
                <img
                  src={logo}
                  alt="Dashboard Logo"
                  className="dashboard-logo"
                  style={{
                    borderRadius: "10px",
                    width: "100px",
                    height: "100px",
                    marginLeft: "20px",
                  }}
                />
                <div
                  className="mt-5 mb-5 p-5"
                  style={{
                    background: "white",
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    marginRight: "30px",
                  }}
                >
                  <p className="text-muted mb-1">
                    <span className="fw-bold" style={{ fontSize: "30px" }}>
                      👨 {auth?.user?.username}
                    </span>
                  </p>
                  <p className="text-muted mb-1">
                    <span className="fw-bold">Earnings:</span>{" "}
                    {loading ? (
                      <span>Loading...</span>
                    ) : (
                      <span>{earnings ? earnings.earnings : "0"} Rs</span>
                    )}
                  </p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold">Total Earnings:</span>{" "}
                    {loading ? (
                      <span>Loading...</span>
                    ) : (
                      <span>{earnings ? earnings.totalEarnings : "0"} Rs</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="login-container">
            <div className="section">
              <div className="container">
                <div className="row full-height justify-content-center">
                  <div className="col-12 text-center align-self-center py-5">
                    <div className="section pb-5 pt-5 pt-sm-2 text-center">
                      <h6 className="mb-0 pb-3" style={{ fontSize: "20px" }}>
                        <span> Profile </span>
                        <span> Password</span>
                      </h6>
                      <input
                        className="checkbox"
                        type="checkbox"
                        id="reg-log"
                        name="reg-log"
                      />
                      <label htmlFor="reg-log" />
                      <div className="card-3d-wrap mx-auto">
                        <div className="card-3d-wrapper">
                          <div className="card-front">
                            <div className="center-wrap">
                              <div className="section text-center">
                                <h4
                                  className="mb-4 pb-3"
                                  style={{ fontSize: "20px" }}
                                >
                                  User Profile
                                </h4>
                                <form onSubmit={handleUpdateProfile}>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      name="username"
                                      className={`form-style ${
                                        errors.username ? "is-invalid" : ""
                                      }`}
                                      placeholder="Your Username"
                                      id="username"
                                      autoComplete="off"
                                      value={username}
                                      onChange={(e) =>
                                        setUsername(e.target.value)
                                      }
                                    />
                                    <i className="input-icon uil uil-at" />
                                  </div>
                                  <div className="form-group">
                                    <input
                                      type="email"
                                      name="email"
                                      className={`form-style ${
                                        errors.email ? "is-invalid" : ""
                                      }`}
                                      placeholder="Your Email"
                                      id="email"
                                      autoComplete="off"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <i className="input-icon uil uil-lock-alt" />
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn mt-4"
                                    disabled={profileLoading}
                                  >
                                    {profileLoading
                                      ? "Updating Profile..."
                                      : "Update Profile"}
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="card-back">
                            <div className="center-wrap">
                              <div className="section text-center">
                                <h4
                                  className="mb-4 pb-3"
                                  style={{ fontSize: "20px" }}
                                >
                                  Change Password
                                </h4>
                                <form onSubmit={handleChangePassword}>
                                  <div className="form-group">
                                    <input
                                      type="password"
                                      name="password"
                                      className={`form-style ${
                                        errors.password ? "is-invalid" : ""
                                      }`}
                                      placeholder="Current Password"
                                      id="currentPassword"
                                      autoComplete="off"
                                      value={password}
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                    />
                                    <i className="input-icon uil uil-at" />
                                  </div>
                                  <div className="form-group mt-2">
                                    <input
                                      type="password"
                                      name="newPassword"
                                      className={`form-style ${
                                        errors.newPassword ? "is-invalid" : ""
                                      }`}
                                      placeholder="New Password"
                                      id="newPassword"
                                      autoComplete="off"
                                      value={newPassword}
                                      onChange={(e) =>
                                        setNewPassword(e.target.value)
                                      }
                                    />
                                    <i className="input-icon uil uil-lock-alt" />
                                  </div>
                                  <div className="form-group mt-2">
                                    <input
                                      type="password"
                                      name="confirmPassword"
                                      className={`form-style ${
                                        errors.confirmPassword
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      placeholder="Confirm Password"
                                      id="confirmPassword"
                                      autoComplete="off"
                                      value={confirmPassword}
                                      onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                      }
                                    />
                                    <i className="input-icon uil uil-lock-alt" />
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn mt-4"
                                    disabled={passwordLoading}
                                  >
                                    {passwordLoading
                                      ? "Changing Password..."
                                      : "Change Password"}
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5">
                        <span style={{ fontSize: "30px" }}>{siteTitle}</span>
                        <br />
                        <p style={{ fontSize: "15px", fontWeight: "normal" }}>
                          {siteDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Profile;
