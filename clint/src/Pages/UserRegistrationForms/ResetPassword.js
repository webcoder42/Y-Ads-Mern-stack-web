import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../Styles/ForgetPassword.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/users/request-password-reset/${token}`,
        {
          email,
          password,
        }
      );
      alert(response.data.message);
      if (response.data.success) {
        navigate("/login"); // Redirect to login page after successful reset
      }
    } catch (error) {
      alert("Error resetting password. Please try again later.");
      console.error("Error resetting password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-front">
      <div className="center-wrap">
        <div className="section text-center">
          <h4 className="mb-4 pb-3" style={{ fontSize: "20px" }}>
            Reset Password
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-2">
              <input
                type="email"
                name="logemail"
                className={`form-style ${errors.email ? "is-invalid" : ""}`}
                placeholder="Your Email"
                id="logemail"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="input-icon uil uil-at" />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group mt-2">
              <input
                type="password"
                name="logpass"
                className={`form-style ${errors.password ? "is-invalid" : ""}`}
                placeholder="New Password"
                id="logpass"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="input-icon uil uil-lock-alt" />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group mt-2">
              <input
                type="password"
                name="logpass"
                className={`form-style ${errors.password ? "is-invalid" : ""}`}
                placeholder="Confirm New Password"
                id="logpass"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i className="input-icon uil uil-lock-alt" />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <button type="submit" className="btn mt-4">
              {loading ? "Update..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
