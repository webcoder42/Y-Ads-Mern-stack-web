import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EditAdModal = ({ show, onClose, ad, onSave }) => {
  const [title, setTitle] = useState(ad.title);
  const [description, setDescription] = useState(ad.description);
  const [videoLink, setVideoLink] = useState(ad.videoLink);
  const [duration, setDuration] = useState(ad.duration);
  const [earningRate, setEarningRate] = useState(ad.earningRate);

  useEffect(() => {
    if (show) {
      setTitle(ad.title);
      setDescription(ad.description);
      setVideoLink(ad.videoLink);
      setDuration(ad.duration);
      setEarningRate(ad.earningRate);
    }
  }, [show, ad]);

  const handleSave = async () => {
    try {
      const updatedAd = {
        title,
        description,
        videoLink,
        duration,
        earningRate,
      };
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/advertisement/update/${ad._id}`,
        updatedAd
      );
      if (data.success) {
        alert(data.message);
        onSave(updatedAd);
        onClose();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      className={`modal ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Ad</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="text-dark">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Video Link</label>
              <input
                type="text"
                className="form-control"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Duration</label>
              <input
                type="text"
                className="form-control"
                value={duration}
                
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Earning Rate</label>
              <input
                type="text"
                className="form-control"
                value={earningRate}
                onChange={(e) => setEarningRate(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdModal;
