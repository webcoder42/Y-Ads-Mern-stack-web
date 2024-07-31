import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import Layout from "./../../Componet/Layout/Layout";
import logo from "../../Assets/sitelogo.png";
import toast from "react-hot-toast";
import { FaYoutube } from "react-icons/fa";
import moment from "moment";

import "../../index.css";
const UserDashboard = () => {
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [earnings, setEarnings] = useState(null);
  const [membershipDetails, setMembershipDetails] = useState(null);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copyTooltipText, setCopyTooltipText] = useState("Copy");
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [referrals, setReferrals] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [heading, setHeading] = useState();
  const [notification, setNotification] = useState("");
  const [titles, setTitles] = useState([]);
  const [links, setlinks] = useState();
  const [contacts, setContacts] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalAdsViewed, setTotalAdsViewed] = useState(0);
  const [remainingAds, setRemainingAds] = useState(0);
  const [nextAvailableTime, setNextAvailableTime] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  const [message, setMessage] = useState("");

  const [link, setLink] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchMembershipDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/purchase/membership"
        );
        setMembershipDetails(response.data);
      } catch (err) {
        setError("Failed to fetch membership details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipDetails();
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
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/userwithdrawal/get-all-single-withdrawal",
          {}
        );
        console.log(response.data); // Log the response data

        // Ensure response.data.withdrawals is defined
        if (response.data && response.data.withdrawals) {
          // Sort the withdrawals by createdAt date in descending order
          const sortedWithdrawals = response.data.withdrawals.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setWithdrawals(sortedWithdrawals);
        } else {
          setError("No withdrawals found");
        }
      } catch (error) {
        setError("Error fetching withdrawals");
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawals();
  }, [auth.token]);
  // Get all Notifications

  // Get all Notifications
  const getAllTitles = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/notifiication/get-notify"
      );
      // Ensure data.notifications is an array of objects with a 'notification' string property
      if (Array.isArray(data.announcements)) {
        setTitles(data.announcements);
      } else {
        toast.error("Unexpected data format");
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

  // Fetch all Contacts
  const fetchsubscriberlink = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/subscribe/get-link"
      );

      // Ensure data.links is an array of objects with a 'link' string property
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

  // Lifecycle method
  useEffect(() => {
    fetchsubscriberlink();
  }, []);

  const fetchUserStats = async () => {
    try {
      const earningsResponse = await axios.get(
        "http://localhost:8080/api/v1/ads/user-ads-earnings"
      );
      setTotalEarnings(earningsResponse.data.totalEarnings);

      const statsResponse = await axios.get(
        "http://localhost:8080/api/v1/ads/user-total-ads-viewed"
      );
      const { totalAdsViewed, remainingAdsToday } = statsResponse.data;
      setTotalAdsViewed(totalAdsViewed);
      setRemainingAds(remainingAdsToday);

      // Calculate next available time
      const now = moment();
      const nextAdTime = now.add(24, "hours").startOf("day").toDate();
      setNextAvailableTime(nextAdTime);

      if (remainingAdsToday <= 0) {
        setMessage(
          "You have viewed all ads for today. Please come back tomorrow."
        );
        setShowTimer(false);
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };
  useEffect(() => {
    fetchUserStats();
  }, []);

  return (
    <Layout title={"User-Dashboard Y-Ads"}>
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
            <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>DASHBOARD</h1>
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
      <div className="col-md-3"></div>
      <div className="col-md-9">
        <div className="row justify-content-center">
          <div className="package-list">
            {titles.length === 0 ? (
              <p
                style={{ marginLeft: "90px", width: "500px", height: "100px" }}
                className="alert alert-secondary"
                role="alert"
              >
                No Notifications
              </p>
            ) : (
              titles.map((p) => (
                <div key={p._id}>
                  <p
                    style={{ marginLeft: "90px" }}
                    className="alert alert-danger"
                    role="alert"
                  >
                    <strong>
                      <h1>{p.heading}...</h1>{" "}
                    </strong>
                    {p.notification}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="col-md-9">
        <div className="row justify-content-center">
          <div className="contact-list">
            {contacts.length === 0 ? (
              <p className="text-center">No Links Available</p>
            ) : (
              contacts.map((p) => (
                <div key={p._id} className="col-md-4 mb-3">
                  <div className="contact-card">
                    <div className="d-flex align-items-center">
                      <FaYoutube size={24} className="mr-2 text-danger" />
                      <a
                        href={p.subscribechannallink}
                        className="link-secondary"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "15px" }}
                      >
                        Subscribe over Channel
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div>
        {membershipDetails ? (
          <>
            <div className="d-flex flex-wrap justify-content-around">
              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Package</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    <strong>{membershipDetails.packageName}</strong>
                  </p>
                </div>
              </div>

              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Status</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    <strong>{membershipDetails.packageStatus}</strong>
                  </p>
                </div>
              </div>

              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Avaliable Earnings</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    <strong>{earnings ? earnings.earnings : "0"} Rs</strong>
                  </p>
                </div>
              </div>
              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Total Earnings</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    <strong>
                      {earnings ? earnings.totalEarnings : "o"} Rs
                    </strong>
                  </p>
                </div>
              </div>
              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Refferals Commission</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    <strong>
                      {earnings ? earnings.CommissionAmount : "o"} Rs
                    </strong>
                  </p>
                </div>
              </div>
              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Ads Watch Earnings</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    <strong>{totalEarnings} Rs</strong>
                  </p>
                </div>
              </div>
              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Total Ads Watch</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    <strong>{totalAdsViewed} </strong>
                  </p>
                </div>
              </div>
              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Remaining Ads Today</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    <strong>{remainingAds}</strong>
                  </p>
                </div>
              </div>

              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Total Team</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    <strong>{totalReferrals}</strong>
                  </p>
                </div>
              </div>
              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Active Members</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    <strong>{activeUsers}</strong>
                  </p>
                </div>
              </div>
              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Inactive Members</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    <strong>{inactiveUsers}</strong>
                  </p>
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
              <div
                className="referral-code-container mt-5 mb-5"
                style={{ overflow: "scroll" }}
              >
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
                <h1 style={{ color: "white" }}>RefferalLink</h1>
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
                <h1 style={{ color: "white" }}>RefferalCode</h1>
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
                      <div className="text-center mt-3">
                        No referrals available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="container my-5">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                  <div className="cards shadow-sm">
                    <div className="card-header bg-primary text-white text-center py-3">
                      <h2>All Withdrawals</h2>
                    </div>
                    <div className="card-body">
                      {error ? (
                        <p className="text-danger">{error}</p>
                      ) : (
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover">
                            <thead className="thead-dark">
                              <tr>
                                <th>#</th>
                                <th>Account Name</th>
                                <th>Account Number</th>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                <th>Applied Date</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {withdrawals.length > 0 ? (
                                withdrawals.map((tx, index) => (
                                  <tr key={tx._id}>
                                    <td>{index + 1}</td>
                                    <td>{tx.accountName}</td>
                                    <td>{tx.accountNumber}</td>
                                    <td>{tx.amount} Rs</td>
                                    <td>
                                      {tx.paymentMethod
                                        ? tx.paymentMethod.method
                                        : "N/A"}
                                    </td>
                                    <td>
                                      {new Date(
                                        tx.createdAt
                                      ).toLocaleDateString()}
                                    </td>
                                    <td>
                                      <span
                                        className={`badge ${
                                          tx.status === "approved"
                                            ? "bg-success"
                                            : tx.status === "rejected"
                                            ? "bg-danger"
                                            : tx.status === "processing"
                                            ? "bg-warning"
                                            : "bg-secondary"
                                        }`}
                                      >
                                        {tx.status.charAt(0).toUpperCase() +
                                          tx.status.slice(1)}
                                      </span>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="7" className="text-center">
                                    No withdrawals found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex flex-wrap justify-content-around">
              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Package</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    No Membership Purchase
                  </p>
                </div>
              </div>

              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Status</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}></p>
                </div>
              </div>
              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Avaliable Earnings</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>0 Rs</p>
                </div>
              </div>
              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>TotalEarnings</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>0 Rs</p>
                </div>
              </div>
              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Total Team</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    <strong>{totalReferrals}</strong>
                  </p>
                </div>
              </div>
              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Active Members</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    <strong>{activeUsers}</strong>
                  </p>
                </div>
              </div>
              <div className="card mt-5 p-3" style={{ width: "300px" }}>
                <div className="bg-white">
                  <label style={{ fontSize: "20px", textAlign: "center" }}>
                    <strong>Inactive Members</strong>
                  </label>
                  <p style={{ fontSize: "30px", color: "black" }}>
                    <strong>{inactiveUsers}</strong>
                  </p>
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
                      <div className="text-center mt-3">
                        No referrals available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="container my-5">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                  <div className="cards shadow-sm">
                    <div className="card-header bg-primary text-white text-center py-3">
                      <h2>All Withdrawals</h2>
                    </div>
                    <div className="card-body">
                      <div
                        className="table-responsive text-dark"
                        style={{ fontSize: "30px" }}
                      >
                        no withdrawal
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default UserDashboard;
