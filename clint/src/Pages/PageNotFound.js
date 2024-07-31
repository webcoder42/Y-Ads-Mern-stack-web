import React from "react";
import { Link } from "react-router-dom";
import "../Styles/PageNotFound.css";

const PageNotFound = () => {
  return (
    <>
      <div className="pnf-container">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops! Page Not Found</h2>
        <Link className="pnf-btn">Go Back</Link>
      </div>
    </>
  );
};

export default PageNotFound;
