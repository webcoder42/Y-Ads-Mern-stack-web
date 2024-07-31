import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import Layout from "../../Componet/Layout/Layout";
import logo from "../../Assets/sitelogo.png";

const TotalTeam = () => {
  const [auth] = useAuth();
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [earnings, setEarnings] = useState(null);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [copyTooltipText, setCopyTooltipText] = useState("Copy");
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    const fetchUserReferrals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/total-referrals"
        );
        setTotalReferrals(response.data.totalReferrals);
        setReferrals(response.data.referralDetails);

        // Calculate active and inactive users
        const activeCount = response.data.referralDetails.filter(
          (referral) => referral.packageStatus === "Active"
        ).length;
        const inactiveCount =
          response.data.referralDetails.length - activeCount;

        setActiveUsers(activeCount);
        setInactiveUsers(inactiveCount);
      } catch (err) {
        setError("Failed to fetch referrals.");
      }
    };
    fetchUserReferrals();
  }, []);

  useEffect(() => {
    const fetchUserEarnings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/earnings"
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

  useEffect(() => {
    const fetchReferralCode = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/get-refferalcode"
        );
        setReferralCode(response.data.referralCode);
      } catch (err) {
        setError("Failed to fetch referral code.");
      }
    };
    fetchReferralCode();
  }, []);
  useEffect(() => {
    const fetchReferralLink = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/get-refferallink"
        );
        setReferralLink(response.data.referralLink);
      } catch (err) {
        setError("Failed to fetch referral code.");
      }
    };
    fetchReferralLink();
  }, []);

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopyTooltipText("Copied!");
      setTimeout(() => {
        setCopyTooltipText("Copy");
      }, 2000);
    });
  };
  const handleCopyreferralLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopyTooltipText("Copied!");
      setTimeout(() => {
        setCopyTooltipText("Copy");
      }, 2000);
    });
  };

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
            <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>YOUR TEAMS</h1>
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

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card p-4">
              <div className="bg-white p-3 rounded shadow-sm">
                <label
                  className="d-block text-center mb-2"
                  style={{ fontSize: "20px" }}
                >
                  <strong>Total Team</strong>
                </label>
                <p
                  className="text-center mb-0"
                  style={{ fontSize: "30px", color: "black" }}
                >
                  <strong>{totalReferrals}</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card p-4">
              <div className="bg-white p-3 rounded shadow-sm">
                <label
                  className="d-block text-center mb-2"
                  style={{ fontSize: "20px" }}
                >
                  <strong>Active Members</strong>
                </label>
                <p
                  className="text-center mb-0"
                  style={{ fontSize: "30px", color: "black" }}
                >
                  <strong>{activeUsers}</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card p-4">
              <div className="bg-white p-3 rounded shadow-sm">
                <label
                  className="d-block text-center mb-2"
                  style={{ fontSize: "20px" }}
                >
                  <strong>Inactive Members</strong>
                </label>
                <p
                  className="text-center mb-0"
                  style={{ fontSize: "30px", color: "black" }}
                >
                  <strong>{inactiveUsers}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="p-1 mt-5 card "
        style={{
          backgroundColor: "black",
          width: "320px",
          height: "250px",
          marginLeft: "36px",
        }}
      >
        <div className="referral-code-container mt-5 mb-5">
          <h3
            className="mb-5"
            style={{
              color: "white",
              textAlign: "center",
              fontSize: "25px",
            }}
          >
            Invite Friend Earn Money
          </h3>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              style={{ height: "50px", fontSize: "20px" }}
              value={referralLink}
              readOnly
            />

            <button
              className="btn "
              style={{ marginLeft: "10px", height: "50px" }}
              type="button"
              onClick={handleCopyreferralLink}
            >
              {copyTooltipText}
            </button>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              style={{ height: "50px", fontSize: "20px" }}
              value={referralCode}
              readOnly
            />

            <button
              className="btn "
              style={{ marginLeft: "10px", height: "50px" }}
              type="button"
              onClick={handleCopyReferralCode}
            >
              {copyTooltipText}
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10 mb-3">
            <div className="card p-4 shadow-sm">
              <h3>Total Referrals</h3>
              {referrals.length > 0 ? (
                <table className="table table-striped mt-3">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Package Name</th>
                      <th>Package Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((referral, index) => (
                      <tr key={index}>
                        <td>{referral.username}</td>
                        <td>{referral.email}</td>
                        <td>
                          {referral.packageName
                            ? referral.packageName
                            : "No membership bought"}
                        </td>
                        <td
                          style={{
                            color:
                              referral.packageStatus === "Active"
                                ? "green"
                                : "red",
                          }}
                        >
                          {referral.packageStatus
                            ? referral.packageStatus
                            : "No membership bought"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center mt-3">No referrals available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TotalTeam;
