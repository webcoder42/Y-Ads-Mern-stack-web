import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import "../../Styles/CreatePackage.css";
import AdminComponent from "../../Componet/Layout/AdminComponent";

const WithdrawalAccount = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [method, setMethod] = useState("");
  const [photo, setPhoto] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [titles, setTitles] = useState([]);

  // Function to handle form submission
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!method || !photo) {
      alert("Please fill all the fields");
      return;
    }

    try {
      // Create a FormData object to send the file data
      const formData = new FormData();
      formData.append("method", method);
      formData.append("photo", photo);
      formData.append("minAmount", minAmount);

      // API call to create a new withdrawal account
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/withdrawal/create-account",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle response
      if (data?.success) {
        alert(data?.message);
        navigate(""); // Navigate to home page or desired route
      } else {
        alert(data?.message || "Withdrawal account creation failed");
      }

      // Reset form fields
      setMethod("");
      setPhoto("");
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhoto(file);
  };

  // Function to fetch all withdrawal accounts
  const getAllAccounts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/withdrawal/get-withdrawal-account"
      );
      setTitles(data.withdrawalAccounts);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch withdrawal accounts");
    }
  };

  // Lifecycle method to fetch data when component mounts
  useEffect(() => {
    getAllAccounts();
  }, []);

  return (
    <>
      <div className="dashboard-container bg-light">
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
        <div className="right-content">
          <h1>Manage Withdrawal Accounts</h1>
          <p>
            <span style={{ color: "#e0c10c", fontWeight: "bold" }}>
              👨 {auth?.user?.username}
            </span>
            !
          </p>
        </div>
      </div>

      <div className="">
        <div className="row">
          <div className="col-md-3">
            <AdminComponent />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-9">Create Withdrawal Account</h1>

            <div className="card bg-dark text-white mb-3 p-5">
              <div className="mb-3 mt-5 ">
                <input
                  style={{ fontSize: "15px", width: "870px" }}
                  type="text"
                  value={method}
                  placeholder="Enter Method Name"
                  className="form-control"
                  onChange={(e) => setMethod(e.target.value)}
                />
              </div>
              <div className="mb-3 mt-5 ">
                <input
                  style={{ fontSize: "15px", width: "870px" }}
                  type="text"
                  value={minAmount}
                  placeholder="Enter minimum Amount  Name"
                  className="form-control"
                  onChange={(e) => setMinAmount(e.target.value)}
                />
              </div>

              <div className="mb-3 mt-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div className="mb-3">
                <button
                  className="btn btn-primary mt-5"
                  style={{ width: "200px", height: "70px", fontSize: "15px" }}
                  onClick={handleCreate}
                >
                  Create Withdrawal Account
                </button>
              </div>
            </div>

            <div>
              <h1 className="text-center mb-4">Withdrawal Accounts</h1>
              <div className="row justify-content-center">
                {titles.length === 0 ? (
                  <p className="text-center">No withdrawal accounts found</p>
                ) : (
                  titles.map((account) => (
                    <div key={account._id} className="col-md-4 mb-4">
                      <div className="card bg-dark text-white p-3">
                        <p style={{ color: "white" }} className="card-text">
                          {account.method}
                        </p>

                        <p style={{ color: "Green" }} className="card-text">
                          {account.minAmount} Rs{" "}
                        </p>
                        <Link
                          to={`/dashboard/admin/update-withdrawal-account/${account._id}`}
                        >
                          <img
                            src={`http://localhost:8080/api/v1/withdrawal/account-photo/${account._id}`}
                            alt="Withdrawal Account"
                            style={{
                              width: "330px",
                              height: "105px",
                            }}
                          />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawalAccount;
