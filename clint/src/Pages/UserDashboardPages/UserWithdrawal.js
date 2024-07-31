import React, { useState, useEffect } from "react";
import Layout from "./../../Componet/Layout/Layout";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../Assets/sitelogo.png";

import "../../Styles/Withdrawal.css";

const UserWithdrawal = () => {
  const [auth] = useAuth();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [titles, setTitles] = useState([]);
  const [amount, setAmount] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [singleAccount, setSingleAccount] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEarnings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/earnings",
          {}
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

  const fetchWithdrawalAccounts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/withdrawal/get-withdrawal-account"
      );
      setTitles(data.withdrawalAccounts);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching the payment accounts");
    }
  };

  const fetchAccountDetail = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/withdrawal/get-single-account/${id}`
      );
      setSingleAccount(data.singleAccount);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching the package details");
    }
  };

  useEffect(() => {
    fetchWithdrawalAccounts();
  }, []);

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    fetchAccountDetail(methodId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!amount.trim()) {
      errors.amount = "Amount is required";
    } else if (parseFloat(amount) < 120) {
      errors.amount = "Minimum amount is 120";
    } else if (parseFloat(amount) > parseFloat(auth.user.availableEarnings)) {
      errors.amount = "Insufficient available funds";
    }
    if (!accountName.trim()) {
      errors.accountName = "Account Name is required";
    }
    if (!accountNumber.trim()) {
      errors.accountNumber = "Account Number is required";
    }
    if (!selectedMethod) {
      errors.selectedMethod = "Please select a payment method";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        amount,
        paymentMethod: selectedMethod,
        accountNumber,
        accountName,
      };

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/userwithdrawal/create-withdrawal",
        formData
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard/user/withdrawalhistory");
      } else {
        toast.error(data.message || "Failed to submit form");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while processing the payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
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
              MAKE WITHDRAWAL REQUEST
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
      <div className="withdrawal-container">
        <h1 className="text-center mb-4">SELECT PAYMENT METHOD</h1>
        <div className="row justify-content-center">
          {titles.length === 0 ? (
            <p className="text-center"></p>
          ) : (
            <div className="col-md-8">
              <div className="d-flex flex-wrap justify-content-center">
                {titles.map((account) => (
                  <div
                    key={account._id}
                    className={`card bg-dark text-white m-2 p-3 ${
                      selectedMethod === account._id ? "border-primary" : ""
                    }`}
                    style={{ width: "200px", cursor: "pointer" }}
                    onClick={() => handleMethodSelect(account._id)}
                  >
                    <img
                      src={`http://localhost:8080/api/v1/withdrawal/account-photo/${account._id}`}
                      alt="Withdrawal Account"
                      className="card-img-top"
                      style={{ height: "100px", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>

              {selectedMethod && (
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="form-group">
                    <label>Amount</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.amount ? "border-danger" : ""
                      }`}
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        setErrors({ ...errors, amount: null });
                      }}
                    />
                    {errors.amount && (
                      <div className="text-danger">{errors.amount}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Account Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.accountName ? "border-danger" : ""
                      }`}
                      placeholder="Account Name"
                      value={accountName}
                      onChange={(e) => {
                        setAccountName(e.target.value);
                        setErrors({ ...errors, accountName: null });
                      }}
                    />
                    {errors.accountName && (
                      <div className="text-danger">{errors.accountName}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Account Number</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.accountNumber ? "border-danger" : ""
                      }`}
                      placeholder="Account Number"
                      value={accountNumber}
                      onChange={(e) => {
                        setAccountNumber(e.target.value);
                        setErrors({ ...errors, accountNumber: null });
                      }}
                    />
                    {errors.accountNumber && (
                      <div className="text-danger">{errors.accountNumber}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {singleAccount && (
          <div className="mt-4">
            <h3>Selected Account Details</h3>
            <p>Account Name: {singleAccount.accountName}</p>
            <p>Account Number: {singleAccount.accountNumber}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserWithdrawal;
