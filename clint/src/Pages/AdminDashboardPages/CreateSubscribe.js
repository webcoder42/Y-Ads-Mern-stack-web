import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import "../../Styles/CreatePackage.css";

import AdminComponent from "./../../Componet/Layout/AdminComponent";

const CreateSubscribe = () => {
  const [auth] = useAuth();
  const [contacts, setContacts] = useState([]);
  const [link, setLink] = useState(""); // Initialize with an empty string
  const [isCreating, setIsCreating] = useState(false); // To show loader

  // Handle Create Contact
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setIsCreating(true);

      // Create new contact
      const Contact = { subscribechannallink: link }; // Ensure correct field name
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/subscribe/create-link",
        Contact
      );

      if (data?.success) {
        toast.success(data?.message);
        fetchSubscriberLinks(); // Refresh contacts list
      } else {
        toast.error(data?.message || "Contact creation failed");
      }

      // Reset form fields
      setLink(""); // Reset to empty string
    } catch (error) {
      console.error("Error creating contact:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsCreating(false);
    }
  };

  // Fetch all Contacts
  const fetchSubscriberLinks = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/subscribe/get-link"
      );

      // Ensure data.links is an array of objects with a 'subscribechannallink' property
      if (Array.isArray(data.links)) {
        setContacts(data.links);
      } else {
        toast.error("Unexpected data format");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Something went wrong");
    }
  };

  // Handle Delete Contact
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:8080/api/v1/subscribe/delete-link",
        { data: { id } } // Ensure this matches the backend expected format
      );
      if (data?.success) {
        toast.success(data?.message);
        fetchSubscriberLinks(); // Refresh contacts list after deletion
      } else {
        toast.error(data?.message || "Contact deletion failed");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Something went wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    fetchSubscriberLinks();
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
                  value={link}
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
              <h1 className="text-center">Links</h1>
              <div className="row justify-content-center">
                <div className="package-list">
                  {contacts.length === 0 ? (
                    <p className="text-center">No Contacts</p>
                  ) : (
                    contacts.map((p) => (
                      <div key={p._id} className="card m-2 package-card">
                        <div className="card-body">
                          <h5 className="card-title p-3 mb-3 bg-dark text-light">
                            {p.subscribechannallink}
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

export default CreateSubscribe;
