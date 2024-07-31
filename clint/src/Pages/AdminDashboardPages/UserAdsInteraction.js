import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import AdminComponent from "../../Componet/Layout/AdminComponent";
import "../../Styles/UserAdsInteraction.css";

const UserAdsInteraction = () => {
  const [userId, setUserId] = useState("");
  const [userAds, setUserAds] = useState([]);
  const [summary, setSummary] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (userId) {
      fetchUserAds(userId);
      fetchSummary(userId);
      fetchAnalytics(userId);
    }
  }, [userId]);

  const fetchUserAds = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/ads/user-ads-interactions/${userId}`
      );
      setUserAds(response.data.userAds);
    } catch (error) {
      console.error("Error fetching user ads:", error);
    }
  };

  const fetchSummary = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/ads/user-ads-interactions/summary/${userId}`
      );
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  const fetchAnalytics = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/ads/user-ads-analytics/${userId}`
      );
      setAnalytics(response.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/users/users/search?username=${searchTerm}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleUserSelect = (userId) => {
    setUserId(userId);
    setSearchResults([]);
    setSearchTerm("");
  };

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
          <h1>All Users Ads Checking</h1>
          <p>
            <span style={{ color: "#e0c10c", fontWeight: "bold" }}>
              👨 {auth?.user?.username}
            </span>
            !
          </p>
        </div>
      </div>
      <div className="dashboard_container">
        <div className="row">
          <div className="col-md-3">
            <AdminComponent />
          </div>
          <div className="col-md-8 p-3 mt-3">
            <h1>User Ads Interaction</h1>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            <ul className="search-results">
              {searchResults.map((user) => (
                <li key={user._id} onClick={() => handleUserSelect(user._id)}>
                  {user.username}
                </li>
              ))}
            </ul>
            {userId && (
              <>
                <div className="content">
                  <div className="summary">
                    <h2>Summary</h2>
                    <p>Total Views: {summary.totalViews}</p>
                    <p>Total Earnings: {summary.totalEarnings}</p>
                    <p>Completion Status: {summary.completionStatus}</p>
                  </div>

                  <div className="analytics">
                    <h2>Analytics</h2>
                    <p>Completion Rate: {analytics.completionRate}%</p>
                    <ul>
                      {analytics.earningTrend &&
                        analytics.earningTrend.map((item, index) => (
                          <li key={index}>
                            Date: {new Date(item.date).toLocaleDateString()},
                            Earnings: {item.earnings}
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="user-ads">
                    <h2>User Ads</h2>
                    <ul>
                      {userAds.map((ad) => (
                        <li key={ad._id}>
                          Ad: {ad.AdId.title} | Views: {ad.viewedSeconds}{" "}
                          seconds | Earnings: {ad.earnedAmount}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAdsInteraction;
