import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import { useNavigate } from "react-router-dom";
import "../../Styles/BuyPackage.css";
import toast from "react-hot-toast";
import Layout from "../../Componet/Layout/Layout";
import Spinner from "../../Componet/Spinner";
import logo from "../../Assets/sitelogo.png";

const BuyPackage = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [earnings, setEarnings] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getAllPackages = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/package/all-package"
      );
      setPackages(data.packages);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllPackages();
  }, []);

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

  return (
    <Layout title="Buy Membership - Y-Ads">
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
                  BUY PACKAGE
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
          <div className="containerr p-4">
            <p className="alert alert-danger" role="alert">
              You can buy one package at a time, If any user buy any package
              until they have already one active package then old one is
              deactive and new one is active
            </p>
            <h1
              style={{ fontSize: "40px" }}
              className="text-center text-light bg-dark py-4 mb-5 p-9"
            >
              Buy Package
            </h1>
            <div className="row justify-content-center">
              {packages.map((pkg) => (
                <div key={pkg._id} className="col-md-4 mb-4">
                  <div
                    className={`card rounded shadow text-center ${
                      !pkg.isActive ? "inactive-package" : ""
                    }`}
                  >
                    <div className="card-body">
                      <h5 className="card-title p-3 mb-3 bg-dark text-light">
                        {pkg.name}
                      </h5>

                      <div className="card-text p-3 mb-3">
                        {pkg.description.split(":").map((part, index) => (
                          <span key={index}>
                            {part.trim()}
                            <br />
                          </span>
                        ))}
                      </div>
                      <p className="card-text p-3 mb-3">
                        Total Ads: {pkg.numOfAds}{" "}
                      </p>

                      <p className="card-text p-3 mb-3">
                        Price: {pkg.price} Rs
                      </p>
                      <p className="card-text p-3 mb-3">
                        Duration: {pkg.duration} days
                      </p>
                      <p className="card-text p-3 mb-3">
                        Daily Earning: {pkg.earningRate} Rs
                      </p>
                      <p className="card-text p-3 mb-3">
                        Package Discount: {pkg.discount}
                      </p>
                      <p className="card-text p-3 mb-3">
                        Status:{" "}
                        {pkg.isActive ? (
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-danger">Inactive</span>
                        )}
                      </p>
                      {!pkg.isActive && (
                        <div className="coming-soon-overlay">Coming Soon</div>
                      )}
                      <button
                        className="btn"
                        style={{ width: "200px" }}
                        disabled={!pkg.isActive}
                        onClick={() =>
                          pkg.isActive &&
                          navigate(`/dashboard/user/payment-method/${pkg.slug}`)
                        }
                      >
                        {pkg.isActive ? "Buy Package" : "Package Inactive"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default BuyPackage;
