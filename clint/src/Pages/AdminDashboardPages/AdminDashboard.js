import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import "../../Styles/AdminDashboard.css";
import AdminComponent from "../../Componet/Layout/AdminComponent";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);
  const [pendingTransactions, setPendingTransactions] = useState(0);
  const [activeTransactions, setActiveTransactions] = useState(0);
  const [pendingWithdrawals, setPendingWithdrawals] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch all transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/purchase/get-all-tarnsaction"
        );
        console.log("API Response:", response.data); // Debugging log
        if (response.data && response.data.transactions) {
          const transactions = response.data.transactions;
          console.log("Transactions:", transactions); // Debugging log
          const pending = transactions.filter(
            (tx) => tx.packageStatus === "pending"
          );
          const active = transactions.filter(
            (tx) => tx.packageStatus === "Active"
          );
          console.log("Pending Transactions:", pending.length); // Debugging log
          console.log("Active Transactions:", active.length); // Debugging log
          setPendingTransactions(pending.length);
          setActiveTransactions(active.length);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Fetch all pending withdrawals
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/userwithdrawal/get-user-withdrawals"
        );
        console.log("API Response:", response.data); // Debugging log
        if (response.data && response.data.withdrawals) {
          const withdrawals = response.data.withdrawals;
          const pending = withdrawals.filter((wd) => wd.status === "pending");
          console.log("Pending Withdrawals:", pending.length); // Debugging log
          setPendingWithdrawals(pending.length);
        }
      } catch (error) {
        console.error("Error fetching withdrawals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawals();
  }, []);

  useEffect(() => {
    const fetchTotalUsersCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/total-users"
        );
        setTotalUsers(response.data.userCount);
      } catch (error) {
        console.error("Error fetching total users count:", error);
      }
    };

    fetchTotalUsersCount();
  }, []);

  return (
    <>
      <div className="dashboard-container bg-light p-4">
        <div className="header d-flex align-items-center">
          <img
            src="images/spinnerlogo.jpeg"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            alt="Loading..."
          />
          <div className="right-content ml-3">
            <h1>Admin Dashboard</h1>
            <p>
              Welcome back,{" "}
              <span style={{ color: "#e0c10c", fontWeight: "bold" }}>
                {auth?.user?.username}
              </span>
              !
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminComponent />
          </div>
          <div className="col-md-9">
            <div className="mb-5 p-3 mt-3">
              <h4 style={{ color: "yellow" }}>
                Admin Username: {auth?.user?.username}
              </h4>
              <h4 style={{ color: "yellow" }}>
                Admin Email: {auth?.user?.email}
              </h4>
            </div>
            <div className="row">
              <NavLink
                className="col-md-6"
                style={{
                  width: "300px ",
                  height: "170px",
                  textDecoration: "none",
                }}
                to={"/dashboard/admin/all-users"}
              >
                <div className="card text-white bg-primary mb-3">
                  <div
                    className="card-header"
                    style={{
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    All Users
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {loading ? "Loading..." : totalUsers}
                    </h5>
                  </div>
                </div>
              </NavLink>
              <NavLink
                className="col-md-6"
                style={{
                  width: "300px ",
                  height: "170px",
                  textDecoration: "none",
                }}
                to={"/dashboard/admin/all-transaction"}
              >
                <div className="card text-white bg-primary mb-3">
                  <div
                    className="card-header"
                    style={{
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    Pending Transactions
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {loading ? "Loading..." : pendingTransactions}
                    </h5>
                  </div>
                </div>
              </NavLink>
              <NavLink
                className="col-md-6"
                style={{
                  width: "300px ",
                  height: "170px",
                  textDecoration: "none",
                }}
                to={"/dashboard/admin/all-transaction"}
              >
                <div className="card text-white bg-success mb-3">
                  <div
                    className="card-header"
                    style={{
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    Active Transactions
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {loading ? "Loading..." : activeTransactions}
                    </h5>
                  </div>
                </div>
              </NavLink>
              <NavLink
                className="col-md-6  mt-5"
                style={{
                  width: "300px ",
                  height: "170px",
                  textDecoration: "none",
                }}
                to={"/dashboard/admin/withdrawal"}
              >
                <div className="card text-white bg-primary mb-3">
                  <div
                    className="card-header"
                    style={{ fontSize: "20px", textAlign: "center" }}
                  >
                    Pending Withdrawals
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {loading ? "Loading..." : pendingWithdrawals}
                    </h5>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
