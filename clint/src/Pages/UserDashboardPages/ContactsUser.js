import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../Assets/sitelogo.png";
import toast from "react-hot-toast";
import Layout from "./../../Componet/Layout/Layout";
import { useAuth } from "../../Context/auth";

import { FaWhatsapp } from "react-icons/fa";
import "../../App.css";

const ContactsUser = () => {
  const [auth] = useAuth();

  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [earnings, setEarnings] = useState(null);

  const getAllTitles = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/contact/get-Contact"
      );
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

  useEffect(() => {
    getAllTitles();
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
    <Layout>
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
            <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>CONTACT</h1>
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
      <div>
        <h1
          className="mt-5 mb-5 p-5"
          style={{ fontSize: "40px", textAlign: "center" }}
        >
          Contacts Us
        </h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            {titles.length === 0 ? (
              <p className="text-center">No Contacts</p>
            ) : (
              titles.map((p) => (
                <div
                  key={p._id}
                  className="contact-card mb-4"
                  style={{ width: "400px" }}
                >
                  <div className="contact-header d-flex align-items-center">
                    <FaWhatsapp size={40} className="me-3" />
                    <h3 className="mb-0">{p.title}</h3>
                  </div>
                  <p className="contact-description">{p.Descriptions}</p>
                  {p.Link && (
                    <a
                      href={p.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      {p.title}
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactsUser;
