import React from "react";

const ReferralDetails = ({ referrals }) => {
  return (
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
  );
};

export default ReferralDetails;
