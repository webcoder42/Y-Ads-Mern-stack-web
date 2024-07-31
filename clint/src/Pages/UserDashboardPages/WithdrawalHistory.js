import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import logo from "../../Assets/sitelogo.png";

import axios from "axios";
import Spinner from "../../Componet/Spinner";
import Layout from "../../Componet/Layout/Layout";
import "../../Styles/WithdrawalHistory.css";

const WithdrawalHistory = () => {
  const [auth] = useAuth();
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [earnings, setEarnings] = useState(null);
  useEffect(() => {
    const fetchUserEarnings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/earnings",
          {}
        );
        setEarnings(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEarnings();
  }, []);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/userwithdrawal/get-all-single-withdrawal",
          {}
        );
        console.log(response.data); // Log the response data

        // Ensure response.data.withdrawals is defined
        if (response.data && response.data.withdrawals) {
          // Sort the withdrawals by createdAt date in descending order
          const sortedWithdrawals = response.data.withdrawals.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setWithdrawals(sortedWithdrawals);
        } else {
          setError("No withdrawals found");
        }
      } catch (error) {
        setError("Error fetching withdrawals");
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawals();
  }, [auth.token]);

  return (
    <Layout>
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
                  WITHDRAWAL HISTORY
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

          <div className="container my-5">
            <div className="row justify-content-center">
              <div className="col-12 col-md-10">
                <div className="cards shadow-sm">
                  <div className="card-header bg-primary text-white text-center py-3">
                    <h2>All Withdrawals</h2>
                  </div>
                  <div className="card-body">
                    {error ? (
                      <p className="text-danger">{error}</p>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                          <thead className="thead-dark">
                            <tr>
                              <th>#</th>
                              <th>Account Name</th>
                              <th>Account Number</th>
                              <th>Amount</th>
                              <th>Payment Method</th>
                              <th>Applied Date</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {withdrawals.length > 0 ? (
                              withdrawals.map((tx, index) => (
                                <tr key={tx._id}>
                                  <td>{index + 1}</td>
                                  <td>{tx.accountName}</td>
                                  <td>{tx.accountNumber}</td>
                                  <td>{tx.amount} Rs</td>
                                  <td>
                                    {tx.paymentMethod
                                      ? tx.paymentMethod.method
                                      : "N/A"}
                                  </td>
                                  <td>
                                    {new Date(
                                      tx.createdAt
                                    ).toLocaleDateString()}
                                  </td>
                                  <td>
                                    <span
                                      className={`badge ${
                                        tx.status === "approved"
                                          ? "bg-success"
                                          : tx.status === "rejected"
                                          ? "bg-danger"
                                          : tx.status === "processing"
                                          ? "bg-warning"
                                          : "bg-secondary"
                                      }`}
                                    >
                                      {tx.status.charAt(0).toUpperCase() +
                                        tx.status.slice(1)}
                                    </span>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="7" className="text-center">
                                  No withdrawals found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
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

export default WithdrawalHistory;
