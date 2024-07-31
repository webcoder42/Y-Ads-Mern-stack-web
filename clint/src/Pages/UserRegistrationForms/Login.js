import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import axios from "axios";

import "../../Styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [auth, setAuth] = useAuth();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false); // New state for registration success
  const [accountStatus, setAccountStatus] = useState(""); // New state for account status
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("referralCode");
    if (code) {
      setReferralCode(code);
    }
  }, [location.search]);

  useEffect(() => {
    if (registerSuccess) {
      // Navigate to login page after successful registration
      navigate("/login");
    }
  }, [registerSuccess, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrors({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/v1/users/login", {
        email,
        password,
      });
      setLoading(false);
      if (res.data.success) {
        if (
          res.data.user.status === "banned" ||
          res.data.user.status === "suspended"
        ) {
          setAccountStatus(res.data.user.status);
          setErrors({ login: `Your account is ${res.data.user.status}.` });
        } else {
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate(`/dashboard/${res.data.user.role === 1 ? "admin" : "user"}`);
        }
      } else {
        setErrors({ login: res.data.error });
      }
    } catch (error) {
      setLoading(false);
      setErrors({ login: "Something went wrong! User Not Found" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setErrors({
        username: !username ? "Username is required" : "",
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/register",
        {
          username,
          email,
          password,
          referralCode,
        }
      );
      setLoading(false);
      if (res.data.success) {
        setRegisterSuccess(true);
        alert("Register successfully!  please login"); // Set registration success state
      } else {
        setErrors({ register: res.data.error });
      }
    } catch (error) {
      setLoading(false);
      setErrors({ register: "Something went wrong" });
    }
  };

  return (
    <div className="login-container">
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3" style={{ fontSize: "20px" }}>
                  <span>Log In </span>
                  <span>Sign Up</span>
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
                            Log In
                          </h4>
                          <form onSubmit={handleLogin}>
                            <div className="form-group">
                              <input
                                type="email"
                                name="logemail"
                                className={`form-style ${
                                  errors.email ? "is-invalid" : ""
                                }`}
                                placeholder="Your Email"
                                id="logemail"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <i className="input-icon uil uil-at" />
                              {errors.email && (
                                <div className="invalid-feedback">
                                  {errors.email}
                                </div>
                              )}
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                className={`form-style ${
                                  errors.password ? "is-invalid" : ""
                                }`}
                                placeholder="Your Password"
                                id="logpass"
                                autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <i className="input-icon uil uil-lock-alt" />
                              {errors.password && (
                                <div className="invalid-feedback">
                                  {errors.password}
                                </div>
                              )}
                            </div>
                            {errors.login && (
                              <div className="error-message">
                                {errors.login}
                              </div>
                            )}
                            {accountStatus && (
                              <div
                                className="error-message"
                                style={{ color: "red" }}
                              >
                                Your account is {accountStatus}.
                              </div>
                            )}
                            <button
                              type="submit"
                              className="btn mt-4"
                              disabled={loading || accountStatus}
                            >
                              {loading ? "Loading..." : "Submit"}
                            </button>
                            <p className="mb-0 mt-4 text-center">
                              <Link to="/reset-password" className="link">
                                Forgot your password?
                              </Link>
                            </p>
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
                            Sign Up
                          </h4>
                          <form onSubmit={handleSubmit}>
                            <div className="form-group">
                              <input
                                type="text"
                                name="logname"
                                className={`form-style ${
                                  errors.username ? "is-invalid" : ""
                                }`}
                                placeholder="Your Username"
                                id="logusername"
                                autoComplete="off"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                              <i className="input-icon uil uil-user" />
                              {errors.username && (
                                <div className="invalid-feedback">
                                  {errors.username}
                                </div>
                              )}
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="email"
                                name="logemail"
                                className={`form-style ${
                                  errors.email ? "is-invalid" : ""
                                }`}
                                placeholder="Your Email"
                                id="logemail"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <i className="input-icon uil uil-at" />
                              {errors.email && (
                                <div className="invalid-feedback">
                                  {errors.email}
                                </div>
                              )}
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                className={`form-style ${
                                  errors.password ? "is-invalid" : ""
                                }`}
                                placeholder="Your Password"
                                id="logpass"
                                autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <i className="input-icon uil uil-lock-alt" />
                              {errors.password && (
                                <div className="invalid-feedback">
                                  {errors.password}
                                </div>
                              )}
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="text"
                                name="referralCode"
                                className="form-style"
                                placeholder="Referral Code"
                                id="referralCode"
                                autoComplete="off"
                                value={referralCode}
                                onChange={(e) =>
                                  setReferralCode(e.target.value)
                                }
                              />
                              <i className="input-icon uil uil-user-plus" />
                            </div>
                            {errors.register && (
                              <div className="error-message">
                                {errors.register}
                              </div>
                            )}
                            <button
                              type="submit"
                              className="btn mt-4"
                              disabled={loading}
                            >
                              {loading ? "Loading..." : "Submit"}
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
