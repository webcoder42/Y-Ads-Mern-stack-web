import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/auth";

const AdminComponent = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    alert("Logout Successfully");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="list-group">
            <NavLink
              to="/dashboard/admin"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                backgroundColor: "black",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              Admin Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/admin/site-title"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                backgroundColor: "black",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              Site Title
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-ads"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                backgroundColor: "black",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              Create Ads
            </NavLink>
            <NavLink
              to="/dashboard/admin/userads"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                backgroundColor: "black",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              User Ads
            </NavLink>
            <NavLink
              to="/dashboard/admin/all-package"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                backgroundColor: "black",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              All Package
            </NavLink>
            <NavLink
              to="/dashboard/admin/all-transaction"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                backgroundColor: "black",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              All Transaction
            </NavLink>
            <NavLink
              to="/dashboard/admin/all-users"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                padding: "10px",
                marginTop: "10px",
                backgroundColor: "black",
              }}
            >
              All Users
            </NavLink>
            <NavLink
              to="/dashboard/admin/withdrawal-account"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                backgroundColor: "black",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              Withdrawal Account
            </NavLink>
            <NavLink
              to="/dashboard/admin/withdrawal"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                backgroundColor: "black",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              Withdrawal
            </NavLink>
            <NavLink
              to="/dashboard/admin/payment-account"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                backgroundColor: "black",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              Manage Payment Account
            </NavLink>
            <NavLink
              to="/dashboard/admin/refferal-management"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                backgroundColor: "black",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              Referral Management
            </NavLink>

            <NavLink
              to="/dashboard/admin/create-package"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                backgroundColor: "black",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              Package Management
            </NavLink>
            <NavLink
              to="/dashboard/admin/notification"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                backgroundColor: "black",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              Notification Management
            </NavLink>
            <NavLink
              to="/dashboard/admin/contact"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                backgroundColor: "black",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              Contact Management
            </NavLink>
            <NavLink
              to="/dashboard/admin/subscribe"
              className="list-group-item list-group-item-action mb-2"
              activeClassName="active"
              style={{
                fontSize: "15px",
                width: "150px",
                backgroundColor: "black",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              Subscriber Link Management
            </NavLink>

            <NavLink
              to="/login"
              onClick={handleLogout}
              className="list-group-item list-group-item-action btn btn-danger mt-3"
              style={{
                fontSize: "15px",
                width: "150px",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              Logout
            </NavLink>
          </div>
        </div>
        <div className="col-md-8">
          {/* Content for each admin route will be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;
