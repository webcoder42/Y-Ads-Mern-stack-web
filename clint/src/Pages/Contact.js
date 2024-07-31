import React, { useState, useEffect } from "react";
import Layout from "../Componet/Layout/Layout";
import "../Styles/Contact.css";
import Spinner from "../Componet/Spinner";

const Contact = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a 2-second delay, replace with actual loading logic

    return () => clearTimeout(timer);
  }, []);
  return (
    <Layout title={"Contact Us  Y -Ads"}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="heading">Contact Us</h2>
          <form action="#">
            <div className="input-box">
              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email Address" />
            </div>
            <div className="input-box">
              <input type="number" placeholder="Mobile Number" />
              <input type="text" placeholder="Email Subject" />
            </div>
            <textarea
              className="messageTextarea"
              placeholder="Your Message"
            ></textarea>

            <button type="submit" className="btn">
              Send Message
            </button>
          </form>
        </>
      )}
    </Layout>
  );
};

export default Contact;
