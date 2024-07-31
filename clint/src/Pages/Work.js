import React, { useState, useEffect } from "react";
import Layout from "../Componet/Layout/Layout";
import "../Styles/Work.css";
import Spinner from "../Componet/Spinner";

const Work = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a 2-second delay, replace with actual loading logic

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout title={"Working Process  Y -Ads"}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="heading">Work</h2>
          <div className="services-container">
            <div className="services-box">
              <div className="service-info">
                <h4>Watching Ads</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus porro excepturi earum, enim necessitatibus
                  doloribus maiores accusamus dolorum beatae cum maxime ea
                  tempora labore ex ratione cupiditate architecto reprehenderit
                  asperiores.
                </p>
              </div>
            </div>
            <div className="services-box">
              <div className="service-info">
                <h4>Networking</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus porro excepturi earum, enim necessitatibus
                  doloribus maiores accusamus dolorum beatae cum maxime ea
                  tempora labore ex ratione cupiditate architecto reprehenderit
                  asperiores.
                </p>
              </div>
            </div>
            <div className="services-box">
              <div className="service-info">
                <h4>Referrals</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus porro excepturi earum, enim necessitatibus
                  doloribus maiores accusamus dolorum beatae cum maxime ea
                  tempora labore ex ratione cupiditate architecto reprehenderit
                  asperiores.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Work;
