import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import "../../Styles/CreatePackage.css";
import AdminComponent from "../../Componet/Layout/AdminComponent";

const CreateSiteTitle = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDeacription, setSiteDeacription] = useState("");
  const [titles, setTitles] = useState([]);

  // Package create
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!siteTitle) {
      alert("Please fill all the fields");
      return;
    }

    try {
      // Create new title
      const titleData = {
        siteTitle,
      };

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/title/create-title",
        titleData
      );
      if (data?.success) {
        alert(data?.message);
        navigate("");
      } else {
        alert(data?.message || "Title creation failed");
      }

      // Reset form fields
      setSiteTitle("");
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };
  // Get all Titles
  const getAllTitles = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/title/get-title"
      );
      setTitles(data.titles);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllTitles();
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
          <h1>Make Site Title</h1>
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
            <h1 className="text-center p-4 mb-4">Create Title</h1>

            <div className="card w-75 p-3 bg-dark text-white mb-3 p-5 w-100">
              <div className="mb-3">
                <input
                  type="text"
                  value={siteTitle}
                  placeholder="Site Title name"
                  className="form-control"
                  onChange={(e) => setSiteTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={siteDeacription}
                    placeholder="Site Description"
                    className="form-control"
                    onChange={(e) => setSiteDeacription(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 ">
                <button
                  className="btn btn-primary"
                  style={{ fontSize: "15px", width: "200px" }}
                  onClick={handleCreate}
                >
                  CREATE Title
                </button>
              </div>
            </div>
            <div className="col-md--9 ">
              <h1 className="text-center ">Titles</h1>
              <div className="row justify-content-center">
                <div className="package-list">
                  {titles.length === 0 ? (
                    <p className="text-center">No title found</p>
                  ) : (
                    titles.map((p) => (
                      <Link
                        key={p._id}
                        to={`/dashboard/admin/update-title/${p.slug}`}
                        className="package-link"
                      >
                        <div className="card m-2 package-card">
                          <div className="card-body">
                            <h2>Title Name:</h2>
                            <h5 className="card-title p-3 mb-3 bg-dark text-light">
                              {p.siteTitle}
                            </h5>
                            <h2>Title Description:</h2>
                            <h5 className="card-title p-3 mb-3 bg-dark text-light">
                              {p.siteDeacription}
                            </h5>
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

export default CreateSiteTitle;
