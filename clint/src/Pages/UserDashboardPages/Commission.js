import React, { useEffect, useState } from "react";
import axios from "axios";

const Commission = ({ userId }) => {
  const [commissionData, setCommissionData] = useState(null);

  useEffect(() => {
    const fetchCommissionData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/commision/commission/user/${userId}`
        );
        setCommissionData(data);
      } catch (error) {
        console.error("Error fetching commission data:", error);
      }
    };

    fetchCommissionData();
  }, [userId]);

  if (!commissionData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Commission Details</h2>
      <p>Amount: {commissionData.amount}</p>
      <p>Status: {commissionData.status}</p>
      {/* Add more commission details here if needed */}
    </div>
  );
};

export default Commission;
