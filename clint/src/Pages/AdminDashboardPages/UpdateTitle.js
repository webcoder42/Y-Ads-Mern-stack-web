import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../Styles/UpdatePackage.css";

const UpdateTitle = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDeacription, setSiteDescription] = useState("");
  const [id, setId] = useState("");

  const getTitle = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/title/title/${slug}`
      );
      const titleData = data.title;
      setSiteTitle(titleData.siteTitle);
      setSiteDescription(titleData.siteDeacription);
      setId(titleData._id);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch title details");
    }
  };

  useEffect(() => {
    getTitle();
  }, [slug]);

  // Update title
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const titleData = {
        siteTitle,
        siteDeacription,
      };

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/title/update-title/${id}`,
        titleData
      );

      if (data?.success) {
        alert(data?.message);
        navigate("/dashboard/admin/site-title");
      } else {
        alert(data?.message || "Title update failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // Delete title
  const handleDelete = async () => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this title?"
      );
      if (!answer) return;

      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/title/delete-title/${id}`
      );
      if (data.success) {
        alert("Title deleted successfully");
        navigate("/dashboard/admin/site-title");
      } else {
        alert(data.message || "Title deletion failed");
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
          {" "}
          Go back
        </button>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <h1>Update Title</h1>
            <form className="m-1 w-75" onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Title Name:
                </label>
                <input
                  type="text"
                  value={siteTitle}
                  placeholder="Write a Title name"
                  className="form-control"
                  onChange={(e) => setSiteTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <textarea
                  value={siteDeacription}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setSiteDescription(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" type="submit">
                  UPDATE TITLE
                </button>
              </div>
            </form>
            <div className="mb-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                DELETE TITLE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTitle;
