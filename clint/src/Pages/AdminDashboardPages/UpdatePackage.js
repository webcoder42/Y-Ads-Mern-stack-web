import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import "../../Styles/UpdatePackage.css";

const UpdatePackage = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const param = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [earningRate, setEarningRate] = useState("");
  const [numOfAds, setNumOfAds] = useState("");
  const [discount, setDiscount] = useState("");
  const [commissionRate, setCommissionRate] = useState("");

  const [isActive, setIsActive] = useState(true);
  const [id, setId] = useState("");

  // Get Single Package
  const getSinglePackage = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/package/single-package/${param.slug}`
      );
      setName(data.getPackage.name);
      setId(data.getPackage._id);
      setDescription(data.getPackage.description);
      setPrice(data.getPackage.price);
      setDuration(data.getPackage.duration);
      setEarningRate(data.getPackage.earningRate);
      setIsActive(data.getPackage.isActive);
      setNumOfAds(data.getPackage.numOfAds);
      setDiscount(data.getPackage.discount);
      setCommissionRate(data.getPackage.commissionRate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePackage();
  }, [param.slug]);

  // Update Package
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const packageData = {
        name,
        description,
        price,
        duration,
        earningRate,
        numOfAds,
        discount,
        commissionRate,
        isActive,
      };

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/package/update-package/${id}`,
        packageData
      );
      if (data?.success) {
        alert(data?.message);
        navigate("/dashboard/admin/all-package");
      } else {
        toast.error(data?.message || "Package update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Delete Package
  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this package?"
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/package/delete-package/${id}`
      );
      alert("Package deleted successfully");
      navigate("/dashboard/admin/all-package");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="dashboard-container">
        {/* Your dashboard header content */}
        <button
          className="btn"
          style={{ width: "200px" }}
          onClick={() => window.history.back()}
        >
          {" "}
          Go back
        </button>
      </div>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <h1>Update Package</h1>
            <form className="m-1 w-75" onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Package Name:
                </label>
                <input
                  type="text"
                  value={name}
                  placeholder="Write a package name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <textarea
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price:
                </label>
                <input
                  type="number"
                  value={price}
                  placeholder="Write a price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="duration" className="form-label">
                  Duration (days):
                </label>
                <input
                  type="number"
                  value={duration}
                  placeholder="Write a duration"
                  className="form-control"
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="earningRate" className="form-label">
                  Earning Rate:
                </label>
                <input
                  type="number"
                  value={earningRate}
                  placeholder="Write an earning rate"
                  className="form-control"
                  onChange={(e) => setEarningRate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="numOfAds" className="form-label">
                  Number of Ads:
                </label>
                <input
                  type="number"
                  value={numOfAds}
                  placeholder="Write the number of ads"
                  className="form-control"
                  onChange={(e) => setNumOfAds(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="discount" className="form-label">
                  Discount:
                </label>
                <input
                  type="number"
                  value={discount}
                  placeholder="Write any discount"
                  className="form-control"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="discount" className="form-label">
                  Commision:
                </label>
                <input
                  type="number"
                  value={commissionRate}
                  placeholder="Reffer Commision"
                  className="form-control"
                  onChange={(e) => setCommissionRate(e.target.value)}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  checked={isActive}
                  className="form-check-input"
                  id="activeCheckbox"
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="activeCheckbox">
                  Active
                </label>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" type="submit">
                  UPDATE PACKAGE
                </button>
                <button
                  className="btn btn-danger ms-3"
                  type="button"
                  onClick={handleDelete}
                >
                  DELETE PACKAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePackage;
