import React, { useState } from "react";
import axios from "axios";
import "../../Styles/ForgetPassword.css";
import { ImSpinner2 } from "react-icons/im"; // Import a spinner icon

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/request-resetpassword-",
        { email }
      );
      if (response.data.success) {
        setNotification(
          "📧 Password reset email has been sent successfully! Please check your inbox."
        );
      } else {
        setNotification(response.data.message);
      }
    } catch (error) {
      setNotification("😥 Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setNotification(""), 5000); // Clear notification after 5 seconds
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
            <div className="form-group">
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

            <button type="submit" className="btn mt-4" disabled={loading}>
              {loading ? <ImSpinner2 className="spinner" /> : "Submit"}
            </button>
          </form>
          {notification && (
            <div className="notification-message">{notification}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
