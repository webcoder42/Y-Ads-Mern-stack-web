import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Layout from "./../../Componet/Layout/Layout";
import { useAuth } from "../../Context/auth";
import logo from "../../Assets/sitelogo.png";

import "../../Styles/Membership.css";

const Membership = () => {
  const [auth] = useAuth();
  const [membershipDetails, setMembershipDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [earnings, setEarnings] = useState(null);
  const [remainingTime, setRemainingTime] = useState({});
  const timerRef = useRef(null);
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
    const fetchMembershipDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/purchase/membership"
        );
        setMembershipDetails(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipDetails();
  }, []);

  useEffect(() => {
    if (membershipDetails && membershipDetails.packageStatus === "Active") {
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const expiryDate = new Date(membershipDetails.expiryDate).getTime();
        const distance = expiryDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setRemainingTime({ days, hours, minutes, seconds });

        if (distance < 0) {
          clearInterval(intervalId);
          setRemainingTime({});
        }
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }, [membershipDetails]);

  useEffect(() => {
    const timer = timerRef.current;
    let isDragging = false;

    const onMouseMove = (e) => {
      if (!isDragging) return;
      timer.style.left = `${e.clientX - timer.offsetWidth / 2}px`;
      timer.style.top = `${e.clientY - timer.offsetHeight / 2}px`;
    };

    const onMouseDown = () => {
      isDragging = true;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    if (timer) {
      timer.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      if (timer) {
        timer.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      }
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
            <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>MEMBERSHIP</h1>
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
      <h1 className="mt-5 p-5 text-center bg-dark">Membership Details</h1>
      {membershipDetails ? (
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
                <strong>Purchase Date</strong>
              </label>
              <p
                className="mt-3 p-3"
                style={{ fontSize: "15px", color: "black" }}
              >
                <strong>
                  {new Date(
                    membershipDetails.purchaseDate
                  ).toLocaleDateString()}
                </strong>
              </p>
            </div>
          </div>

          <div className="card mt-5 p-3" style={{ width: "300px" }}>
            <div className="bg-white">
              <label style={{ fontSize: "20px", textAlign: "center" }}>
                <strong>Expiry Date</strong>
              </label>
              <p
                className="mt-3 p-3"
                style={{ fontSize: "15px", color: "black" }}
              >
                <strong>
                  {new Date(membershipDetails.expiryDate).toLocaleDateString()}
                </strong>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p>No membership purchased.</p>
        </>
      )}

      <div ref={timerRef} className="timer-container">
        <p>Remaining Time</p>
        <div className="timer">
          {remainingTime.days !== undefined ? (
            <>
              {remainingTime.days}d {remainingTime.hours}h{" "}
              {remainingTime.minutes}m {remainingTime.seconds}s
            </>
          ) : (
            "00d 00h 00m 00s"
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Membership;
