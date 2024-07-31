import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import AdminComponent from "../../Componet/Layout/AdminComponent";

const CreatePaymentAccount = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accounts, setAccounts] = useState([]);

  // Create payment account
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!accountName || !accountNumber || !accountType) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const accountData = {
        accountName,
        accountNumber,
        accountType,
      };

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/account/payment-account",
        accountData
      );
      if (data?.success) {
        alert(data?.message);
        getAllAccounts(); // Refresh the account list
      } else {
        alert(data?.message || "Failed to create payment account");
      }

      // Reset form fields
      setAccountName("");
      setAccountNumber("");
      setAccountType("");
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  // Get all accounts
  const getAllAccounts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/account/get-all"
      );
      console.log("API response data:", data); // Debug log entire response
      if (data?.paymentAccounts) {
        console.log("Accounts from API:", data.paymentAccounts);
        setAccounts(data.paymentAccounts);
      } else {
        console.log("No accounts found in API response");
        setAccounts([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllAccounts();
  }, []);

  return (
    <>
      <div className="dashboard-container bg-light">
        <img
          src="/images/spinnerlogo.jpeg"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          alt="Loading..."
        />
        <div className="right-content">
          <h1>Create Payment Account</h1>
          <p>
            <span style={{ color: "#e0c10c", fontWeight: "bold" }}>
              👨 {auth?.user?.username}
            </span>
            !
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <AdminComponent />
          </div>

          {/* Main content */}
          <div className="col-md-9">
            <h1 className="text-center p-4 mb-4">Create Payment Account</h1>

            <div className="card p-5 mb-4">
              <form onSubmit={handleCreate}>
                <div className="mb-3">
                  <input
                    type="text"
                    value={accountName}
                    placeholder="Account Name"
                    className="form-control"
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={accountNumber}
                    placeholder="Account Number"
                    className="form-control"
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <select
                    value={accountType}
                    className="form-control"
                    onChange={(e) => setAccountType(e.target.value)}
                  >
                    <option value="">Select Account Type</option>
                    <option value="EasyPaisa">EasyPaisa</option>
                    <option value="JazzCash">JazzCash</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Create Account
                </button>
              </form>
            </div>
            <div className="col-md-9 ">
              <h1 className="text-center text-light bg-dark py-4 mb-5">
                All Account List
              </h1>
              <div className="row justify-content-center">
                <div className="package-list">
                  {accounts.length === 0 ? (
                    <p className="text-center">No account found</p>
                  ) : (
                    accounts.map((account) => (
                      <Link
                        key={account._id}
                        to={`/dashboard/admin/update-account/${account._id}`}
                        className="package-link"
                      >
                        <div className="card m-2 package-card p-3 mb-5 ">
                          <div className="card-body">
                            <h5 className="card-text p-1 mb-3">
                              Account Holder Name: {account.accountName}
                            </h5>
                            <p className="card-text p-1 mb-3">
                              Account Number: {account.accountNumber}
                            </p>
                            <p className="card-text p-1 mb-3">
                              Account Type: {account.accountType}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePaymentAccount;
