import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "../../Styles/UpdatePackage.css";

const UpdatePaymentAccount = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // Getting ID from the URL parameters

  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");

  // Get account details by ID
  const getAccount = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/account/get-account/${id}`
      );
      if (data?.success) {
        const accountData = data.paymentAccount;
        setAccountName(accountData.accountName);
        setAccountNumber(accountData.accountNumber);
        setAccountType(accountData.accountType);
      } else {
        alert("Failed to fetch account details");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getAccount();
  }, [id]);

  // Update account
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const accountData = {
        accountName,
        accountNumber,
        accountType,
      };

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/account/update-account/${id}`,
        accountData
      );

      if (data?.success) {
        alert(data?.message);
        navigate("/dashboard/admin/payment-account");
      } else {
        alert(data?.message || "Account update failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // Delete account
  const handleDelete = async () => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this account?"
      );
      if (!answer) return;

      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/account/delete-account/${id}`
      );
      if (data?.success) {
        alert("Account deleted successfully");
        navigate("/dashboard/admin/payment-account");
      } else {
        alert(data?.message || "Account deletion failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="container-fluid m-3 p-3 dashboard">
        <button
          className="btn"
          style={{ width: "200px" }}
          onClick={() => window.history.back()}
        >
          Go back
        </button>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <h1>Update Payment Account</h1>
            <form className="m-1 w-75" onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="accountName" className="form-label">
                  Account Name:
                </label>
                <input
                  type="text"
                  value={accountName}
                  placeholder="Write the account name"
                  className="form-control"
                  onChange={(e) => setAccountName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="accountNumber" className="form-label">
                  Account Number:
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  placeholder="Write the account number"
                  className="form-control"
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="accountType" className="form-label">
                  Account Type:
                </label>
                <select
                  value={accountType}
                  className="form-control"
                  onChange={(e) => setAccountType(e.target.value)}
                  required
                >
                  <option value="">Select Account Type</option>
                  <option value="EasyPaisa">EasyPaisa</option>
                  <option value="JazzCash">JazzCash</option>
                </select>
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" type="submit">
                  UPDATE ACCOUNT
                </button>
              </div>
            </form>
            <div className="mb-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                DELETE ACCOUNT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePaymentAccount;
