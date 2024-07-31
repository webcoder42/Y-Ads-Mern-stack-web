import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../Styles/CreatePackage.css";
import AdminComponent from "../../Componet/Layout/AdminComponent";
import EditAdModal from "./EditAdModal";

const CreateAds = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [duration, setDuration] = useState("");
  const [earningRate, setEarningRate] = useState("");
  const [ads, setAds] = useState([]);
  const [editAd, setEditAd] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Package create
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !description || !videoLink || !duration || !earningRate) {
      alert("Please fill all the fields");
      return;
    }

    try {
      // Create new ad
      const adData = {
        title,
        description,
        videoLink,
        duration,
        earningRate,
      };

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/advertisement/create-advertisement",
        adData
      );
      if (data?.success) {
        alert(data?.message);
        getAllAds(); // Refresh ads after creation
        navigate("");
      } else {
        alert(data?.message || "Ads creation Successfully");
      }

      // Reset form fields
      setTitle("");
      setDescription("");
      setVideoLink("");
      setDuration("");
      setEarningRate("");
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  // Get all ads
  const getAllAds = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/advertisement/get-all-ads"
      );
      setAds(data.ads);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Delete ad
  const handleDelete = async (adId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/advertisement/delete/${adId}`
      );
      if (data.success) {
        alert(data.message);
        getAllAds(); // Refresh ads after deletion
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  // Open edit modal
  const handleEdit = (ad) => {
    setEditAd(ad);
    setShowEditModal(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  // Lifecycle method
  useEffect(() => {
    getAllAds();
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
          <h1>Make Ads </h1>
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
          <div className="col-md-8">
            <h1 className="text-center p-4 mb-4">Create Ads</h1>

            <div className="card w-75 p-3 bg-dark text-white mb-3 p-5 w-100">
              <div className="mb-3">
                <input
                  type="text"
                  value={title}
                  placeholder="Ads Title name"
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Ads Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={videoLink}
                  placeholder="Video Link"
                  className="form-control"
                  onChange={(e) => setVideoLink(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={duration}
                  placeholder="Duration"
                  className="form-control"
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={earningRate}
                  placeholder="Earning Rate"
                  className="form-control"
                  onChange={(e) => setEarningRate(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  style={{ fontSize: "15px", width: "200px" }}
                  onClick={handleCreate}
                >
                  CREATE Ads
                </button>
              </div>
            </div>

            <div className="col-md--9 ">
              <h1 className="text-center ">Ads</h1>
              <div className="row justify-content-center">
                <div className="package-list">
                  {ads.length === 0 ? (
                    <p className="text-center">No ads found</p>
                  ) : (
                    ads.map((ad) => (
                      <div key={ad._id} className="card m-2 package-card">
                        <div className="card-body">
                          <h2>Title:</h2>
                          <h5 className="card-title p-3 mb-3 bg-dark text-light">
                            {ad.title}
                          </h5>
                          <h2>Description:</h2>
                          <h5 className="card-title p-3 mb-3 bg-dark text-light">
                            {ad.description}
                          </h5>

                          <h2>Video Url:</h2>
                          <h5 className="card-title p-3 mb-3 bg-dark text-light">
                            {ad.videoLink} seconds
                          </h5>
                          <h2>Duration:</h2>
                          <h5 className="card-title p-3 mb-3 bg-dark text-light">
                            {ad.duration} seconds
                          </h5>
                          <h2>Earning Rate:</h2>
                          <h5 className="card-title p-3 mb-3 bg-dark text-light">
                            {ad.earningRate}
                          </h5>
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn btn-warning"
                              onClick={() => handleEdit(ad)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(ad._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editAd && (
        <EditAdModal
          show={showEditModal}
          onClose={closeEditModal}
          ad={editAd}
          onSave={(updatedAd) => {
            setAds((prevAds) =>
              prevAds.map((ad) =>
                ad._id === editAd._id ? { ...ad, ...updatedAd } : ad
              )
            );
          }}
        />
      )}
    </>
  );
};

export default CreateAds;
