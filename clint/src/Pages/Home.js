import React, { useState, useEffect } from "react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import Layout from "../Componet/Layout/Layout";
import Spinner from "../Componet/Spinner";
import { useAuth } from "../Context/auth";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");

  // Fetch title and description from the API
  const getSiteData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/title/get-title"
      );
      if (data.titles.length > 0) {
        setSiteTitle(data.titles[0].siteTitle);
        setSiteDescription(data.titles[0].siteDeacription);
      }
    } catch (error) {
      console.error("Something went wrong while fetching site data", error);
    }
  };

  useEffect(() => {
    getSiteData();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a 2-second delay, replace with actual loading logic

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout title={"Home Page"}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="home-content" id="home">
            <h1 style={{ margin: 0, color: "#fff", fontWeight: "bold" }}>
              Welcome to,{" "}
              {siteTitle ? (
                <span style={{ color: "#00ffee" }}>{siteTitle}</span>
              ) : (
                "Y-Ads"
              )}
            </h1>
            <h3 className="text-animation">
              Earn By <span />
            </h3>
            <p>{siteDescription ? siteDescription : "loading"}</p>
            <div className="social-icon">
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaWhatsapp />
              </a>
            </div>
            {!auth.user ? (
              <div className="btn-group">
                <a className="btn" onClick={() => navigate("/login")}>
                  Get Register
                </a>
              </div>
            ) : (
              <div className="btn-group">
                <a
                  className="btn"
                  onClick={() =>
                    navigate(
                      `/dashboard/${auth.user.role === 1 ? "admin" : "user"}`
                    )
                  }
                >
                  Dashboard
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
