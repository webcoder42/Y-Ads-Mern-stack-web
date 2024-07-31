import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import "../../Styles/CreatePackage.css";
import AdminComponent from "../../Componet/Layout/AdminComponent";

const CreateContact = () => {
  const [auth] = useAuth();
  const [Descriptions, setDescriptions] = useState("");
  const [title, setTitle] = useState();
  const [titles, setTitles] = useState([]);
  const [Link, setLink] = useState();
  const [isCreating, setIsCreating] = useState(false); // To show loader

  // Handle Create Notification
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setIsCreating(true);

      // Create new notification
      const Contact = { title, Descriptions, Link };
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/contact/addcontact",
        Contact
      );

      if (data?.success) {
        toast.success(data?.message);
        getAllTitles(); // Refresh titles list
      } else {
        toast.error(data?.message || "Notification creation failed");
      }

      // Reset form fields
      setDescriptions("");
      setTitle();
      setLink(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setIsCreating(false);
    }
  };

  // Get all Notifications
  const getAllTitles = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/contact/get-Contact"
      );
      // Ensure data.notifications is an array of objects with a 'notification' string property
      if (Array.isArray(data.Contact)) {
        setTitles(data.Contact);
      } else {
        toast.error("Unexpected data format");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Handle Delete Notification
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:8080/api/v1/contact/delete-Contact",
        { data: { id } }
      );
      if (data?.success) {
        toast.success(data?.message);
        getAllTitles(); // Refresh titles list after deletion
      } else {
        toast.error(data?.message || "Contact deletion failed");
      }
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
          <h1>Make Notification</h1>
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
            <h1 className="text-center p-4 mb-4">Create Contact</h1>

            <div className="card w-75 p-3 bg-dark text-white mb-3 p-5 w-100">
              <div className="mb-3">
                <input
                  type="text"
                  value={title}
                  placeholder="Title message"
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={Descriptions}
                  placeholder="Descriptions Here.."
                  className="form-control"
                  onChange={(e) => setDescriptions(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={Link}
                  placeholder="Related Link"
                  className="form-control"
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  style={{ fontSize: "15px", width: "200px" }}
                  onClick={handleCreate}
                  disabled={isCreating} // Disable button while creating
                >
                  {isCreating ? "Creating..." : "CREATE Contact"}
                </button>
              </div>
            </div>
            <div className="col-md-9">
              <h1 className="text-center">Contacts</h1>
              <div className="row justify-content-center">
                <div className="package-list">
                  {titles.length === 0 ? (
                    <p className="text-center">No Contacts</p>
                  ) : (
                    titles.map((p) => (
                      <div key={p._id} className="card m-2 package-card">
                        <div className="card-body">
                          <h2>{p.title}:</h2>
                          <h5 className="card-title p-3 mb-3 bg-dark text-light">
                            {p.Descriptions}
                          </h5>
                          <h5 className="card-title p-3 mb-3 bg-dark text-light">
                            {p.Link}
                          </h5>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(p._id)}
                          >
                            DELETE
                          </button>
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
    </>
  );
};

export default CreateContact;
