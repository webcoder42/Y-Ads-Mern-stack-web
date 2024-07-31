import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import AdminComponent from "../../Componet/Layout/AdminComponent";
import Spinner from "../../Componet/Spinner";

const AllTransaction = () => {
  const [auth] = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/purchase/get-all-tarnsaction"
        );
        console.log(response.data); // Log the response data
        setTransactions(response.data.transactions);
      } catch (error) {
        setError("Error fetching transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleChangeStatus = async (transactionId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/purchase/update-status/${transactionId}`,
        { packageStatus: newStatus }
      );
      console.log(response.data); // Log the response data
      // Update the status locally after successful update
      const updatedTransactions = transactions.map((tx) =>
        tx._id === transactionId ? { ...tx, packageStatus: newStatus } : tx
      );
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error(error);
      setError("Error updating transaction status");
    }
  };

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
              <h1> All Transactions</h1>
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
                    <h1>All Transactions</h1>
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
                            <th>Package</th>
                            <th>Price</th>
                            <th>Transaction ID</th>
                            <th>Sender Number</th>
                            <th>Purchase Date</th>
                            <th>Expiry Date</th>
                            <th>Status</th>
                            <th>Referral By</th>{" "}
                            {/* Add the new column header */}
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((tx, index) => (
                            <tr key={tx._id}>
                              <td>{index + 1}</td>
                              <td>{tx.userId ? tx.userId.email : "N/A"}</td>
                              <td>{tx.packagesId.name}</td>
                              <td>{tx.packagesId.price} Rs</td>
                              <td>{tx.transactionId}</td>
                              <td>{tx.sendernumber}</td>
                              <td>{tx.purchaseDate}</td>
                              <td>{tx.expiryDate}</td>
                              <td>
                                <select
                                  value={tx.packageStatus}
                                  onChange={(e) =>
                                    handleChangeStatus(tx._id, e.target.value)
                                  }
                                >
                                  <option value="pending">Pending</option>
                                  <option value="processing">Processing</option>
                                  <option value="Active">Active</option>
                                  <option value="cancel">cancel</option>
                                  <option value="Expired">Expired</option>
                                </select>
                              </td>
                            </tr>
                          ))}
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

export default AllTransaction;
