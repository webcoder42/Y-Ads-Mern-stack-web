import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/auth";
import { Link } from "react-router-dom";
import "../../Styles/AllPackage.css";
import AdminComponent from "../../Componet/Layout/AdminComponent";

const AllPackage = () => {
  const [packages, setPackages] = useState([]);
  const [auth] = useAuth();

  // Get all Packages
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

  // Lifecycle method
  useEffect(() => {
    getAllPackages();
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
          <h1>All Packages</h1>
          <p>
            <span style={{ color: "#e0c10c", fontWeight: "bold" }}>
              👨 {auth?.user?.username}
            </span>
            !
          </p>
        </div>
      </div>
      <div className="dashboard_container ">
        <div className="row">
          <div className="col-md-3">
            <AdminComponent />
          </div>
          <div className="col-md-8 ">
            <h1 className="text-center text-light bg-dark py-4 mb-5 p-9">
              All Package List
            </h1>
            <div className="row justify-content-center">
              <div className="package-list">
                {packages.length === 0 ? (
                  <p className="text-center">No packages found</p>
                ) : (
                  packages.map((p) => (
                    <Link
                      key={p._id}
                      to={`/dashboard/admin/update-package/${p.slug}`}
                      className="package-link"
                    >
                      <div className="card m-2 package-card">
                        <div className="card-body">
                          <h5 className="card-title p-3 mb-3 bg-dark text-light">
                            Package Name: {p.name}
                          </h5>
                          <p className="card-text p-3 mb-3">
                            Package Description: {p.description}
                          </p>
                          <p className="card-text p-3 mb-3">
                            Package Price: {p.price} Rs
                          </p>
                          <p className="card-text p-3 mb-3">
                            Time Duration: {p.duration} days
                          </p>
                          <p className="card-text p-3 mb-3">
                            Earning Rate: {p.earningRate}
                          </p>
                          <p className="card-text p-3 mb-3">
                            Total Ads: {p.numOfAds}
                          </p>
                          <p className="card-text p-3 mb-3">
                            Package Discount: {p.discount}
                          </p>
                          <p className="card-text p-3 mb-3">
                            Package Commision: {p.commissionRate}
                          </p>
                          <p className="card-text p-3 mb-3">
                            Status:{" "}
                            {p.isActive ? (
                              <span className="badge bg-success">Active</span>
                            ) : (
                              <span className="badge bg-danger">Inactive</span>
                            )}
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
    </>
  );
};

export default AllPackage;
