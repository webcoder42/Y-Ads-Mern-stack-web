import React, { useState, useEffect } from "react";
import axios from "axios";

const Footer = () => {
  const [loading, setLoading] = useState(true);
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");

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
    <div className="bg-dark text-light text-center">
      <h1>{siteTitle ? siteTitle : "Y-Ads"}</h1>
      <p>{siteDescription ? siteDescription : "loading"}</p>
    </div>
  );
};

export default Footer;
