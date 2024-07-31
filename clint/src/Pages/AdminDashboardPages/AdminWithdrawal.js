import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import AdminComponent from "../../Componet/Layout/AdminComponent";
import Spinner from "../../Componet/Spinner";

const AdminWithdrawal = () => {
  const [auth] = useAuth();
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleWithdrawals, setVisibleWithdrawals] = useState([]);
  const [referralCounts, setReferralCounts] = useState({});

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/userwithdrawal/get-user-withdrawals"
        );
        console.log(response.data); // Log the response data

        // Ensure response.data.withdrawals is defined
        if (response.data && response.data.withdrawals) {
          const sortedWithdrawals = response.data.withdrawals.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setWithdrawals(sortedWithdrawals);
          setVisibleWithdrawals(sortedWithdrawals); // Initialize visible withdrawals
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
  }, []);

  const handleChangeStatus = async (withdrawalId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/userwithdrawal/update-withdrawal-status/${withdrawalId}`,
        { status: newStatus }
      );
      console.log(response.data); // Log the response data

      // Update the status locally after successful update
      const updatedWithdrawals = withdrawals.map((tx) =>
        tx._id === withdrawalId ? { ...tx, status: newStatus } : tx
      );
      setWithdrawals(updatedWithdrawals);
      setVisibleWithdrawals(
        updatedWithdrawals.filter((tx) => tx.status !== "complete")
      );
    } catch (error) {
      console.error(error);
      setError("Error updating transaction status");
    }
  };

  const handleMarkAsComplete = (withdrawalId) => {
    // Update the status locally to "complete" and filter it out from visible withdrawals
    const updatedWithdrawals = withdrawals.map((tx) =>
      tx._id === withdrawalId ? { ...tx, status: "complete" } : tx
    );
    setWithdrawals(updatedWithdrawals);
    setVisibleWithdrawals(
      updatedWithdrawals.filter((tx) => tx.status !== "complete")
    );
  };

  useEffect(() => {
    const fetchUserReferrals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/total-referrals"
        );
        console.log(response.data); // Log the response data

        setReferralCounts(response.data);
      } catch (err) {
        setError("Failed to fetch referrals.");
      }
    };

    fetchUserReferrals();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
              <h1>All Transactions</h1>
              <p>
                <span style={{ color: "#e0c10c", fontWeight: "bold" }}>
                  👨{auth?.user?.username}
                </span>
                !
              </p>
            </div>
          </div>

          <div className="container-fluid m-3 p-3">
            <div className="row">
              <div className="col-md-3">
                <AdminComponent />
              </div>
              <div className="col-md-8">
                <div className="card w-75 p-3">
                  <div className="card w-75 p-3 bg-dark text-white mb-3 p-5 w-100">
                    <h1>All Withdrawals</h1>
                  </div>
                  {error ? (
                    <p>{error}</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-dark table-striped">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Email</th>

                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Account Number</th>
                            <th>Account Name</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visibleWithdrawals.length > 0 ? (
                            visibleWithdrawals.map((tx, index) => (
                              <tr key={tx._id}>
                                <td>{index + 1}</td>
                                <td>{tx.userId?.email ?? "N/A"}</td>

                                <td>{tx.amount} Rs</td>
                                <td>
                                  {tx.paymentMethod
                                    ? tx.paymentMethod.method
                                    : "N/A"}
                                </td>
                                <td>{tx.accountNumber}</td>
                                <td>{tx.accountName}</td>
                                <td>
                                  {new Date(tx.createdAt).toLocaleDateString()}
                                </td>
                                <td>
                                  <select
                                    value={tx.status}
                                    onChange={(e) =>
                                      handleChangeStatus(tx._id, e.target.value)
                                    }
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="processing">
                                      Processing
                                    </option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                  </select>
                                </td>
                                <td>
                                  <button
                                    onClick={() => handleMarkAsComplete(tx._id)}
                                  >
                                    Mark as Complete
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="11">No withdrawals found</td>
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
        </>
      )}
    </>
  );
};

export default AdminWithdrawal;
