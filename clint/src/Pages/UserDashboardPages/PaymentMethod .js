import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../Componet/Layout/Layout";
import Spinner from "../../Componet/Spinner";
import { useAuth } from "../../Context/auth";

const PaymentMethod = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [packageDetail, setPackageDetail] = useState(null);
  const [paymentAccounts, setPaymentAccounts] = useState([]);
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [sendernumber, setSenderNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchPackageDetail = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/package/single-package/${slug}`
        );
        setPackageDetail(data.getPackage);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching the package details");
      }
    };

    const fetchPaymentAccounts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/account/get-all"
        );
        setPaymentAccounts(data.paymentAccounts);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching the payment accounts");
      }
    };

    fetchPackageDetail();
    fetchPaymentAccounts();
    setLoading(false);
  }, [slug]);

  const handlePayment = async () => {
    if (!selectedAccountType || !transactionId || !sendernumber) {
      toast.error("Please fill all the required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/purchase/purchasepackage",
        {
          userId: auth.user._id,
          slug: slug,
          transactionId,
          accountType: selectedAccountType,
          sendernumber,
        }
      );

      if (data.success) {
        alert("Payment processed successfully");
      } else {
        alert("Payment processing Successfully");
        navigate("/dashboard/user/membership");
      }
    } catch (error) {
      console.error(error);
      alert(
        "Something went wrong while processing the payment  TRX Id Already exists"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Payment Method - Y-Ads">
      {loading ? (
        <Spinner />
      ) : (
        <div className=" p-4">
          <h1 className="text-center text-light bg-dark py-4 mb-5 p-9">
            Payment Method
          </h1>
          {packageDetail && (
            <div className="card rounded shadow text-center mb-4">
              <div className="card">
                <p className="card-text p-3 mb-3">{packageDetail.name}</p>
                <p className="card-text p-3 mb-3">
                  Price: {packageDetail.price} Rs
                </p>
              </div>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="accountType" className="form-label">
              Select Payment Method:
            </label>
            <select
              id="accountType"
              className="form-control mb-3"
              style={{ fontSize: "20px" }}
              value={selectedAccountType}
              onChange={(e) => setSelectedAccountType(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              {paymentAccounts.map((account) => (
                <option key={account._id} value={account.accountType}>
                  {account.accountType}
                </option>
              ))}
            </select>
          </div>
          {selectedAccountType && (
            <>
              <div className="alert alert-warning" role="alert">
                NOTE: Please send {packageDetail.price} Rs on the company
                number.
              </div>
              <div className="form-group">
                <label htmlFor="accountName" className="form-label bg-dark">
                  Account Holder Name:
                </label>
                <input
                  type="text"
                  id="accountName"
                  className="form-control mb-3 text-dark"
                  style={{ fontSize: "20px" }}
                  value={
                    paymentAccounts.find(
                      (account) => account.accountType === selectedAccountType
                    )?.accountName || ""
                  }
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="accountNumber" className="form-label ">
                  Account Number:
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  className="form-control mb-3 text-dark"
                  style={{ fontSize: "20px" }}
                  value={
                    paymentAccounts.find(
                      (account) => account.accountType === selectedAccountType
                    )?.accountNumber || ""
                  }
                  disabled
                />
              </div>
              <div className="alert alert-danger" role="alert">
                NOTE: You are not allowed to enter the same trx id again so
                please enter the correct detail one time. In any incorrect
                detail provided then company is not responsible for this. So
                enter the correct detail and same trx id is not acceptable until
                they already exist.
              </div>
              <div className="form-group">
                <label htmlFor="senderNumber" className="form-label">
                  Sender Number:
                </label>
                <input
                  type="text"
                  id="senderNumber"
                  className="form-control mb-3 "
                  style={{ fontSize: "20px" }}
                  value={sendernumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="transactionId" className="form-label">
                  Transaction ID:
                </label>
                <input
                  type="text"
                  id="transactionId"
                  className="form-control mb-3"
                  style={{ fontSize: "20px" }}
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </div>
              <button
                className="btn"
                style={{ width: "200px", height: "50px" }}
                onClick={handlePayment}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Submit Payment"}
              </button>
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default PaymentMethod;
