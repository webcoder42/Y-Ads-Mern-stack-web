import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import AdminConponent from "../../Componet/Layout/AdminComponent";
import Spinner from "../../Componet/Spinner";

const AllUser = () => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a 2-second delay, replace with actual loading logic

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/all-user"
        );
        console.log(response.data); // Log the response data
        if (response.data) {
          setUsers(response.data);
        } else {
          setError("Failed to fetch users");
        }
      } catch (error) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
              <h1>All Users</h1>
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
                <AdminConponent />
              </div>
              <div className="col-md-8">
                <div className="card w-75 p-3">
                  <div className="card w-75 p-3 bg-dark text-white mb-3 p-5 w-100">
                    <h1>All Users</h1>
                  </div>
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-dark table-striped">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>AvaliableEarning</th>
                            <th>TotalEarning</th>

                            <th>Totel Refferals</th>

                            <th>Referred By</th>
                            <th>Account Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, index) => (
                            <tr key={user._id}>
                              <td>{index + 1}</td>
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                              <td>{user.earnings} Rs</td>
                              <td>{user.TotalEarnings} Rs</td>

                              <td>{user.totelreffered}</td>
                              <td>{user.referredBy}</td>
                              <td>
                                <select value={user.accountStatus}>
                                  <option value="active">Active</option>
                                  <option value="suspended">Suspended</option>
                                  <option value="banned">Banned</option>
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

export default AllUser;
