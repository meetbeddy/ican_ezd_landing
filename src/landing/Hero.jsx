import React from "react";

function Hero({ data }) {
  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container" data-aos="zoom-out" data-aos-delay={100}>
        <div className="row">
          <div className="col-xl-12">
            <h1>{data?.year}</h1>
            <h2>{data?.theme}</h2>
            <div className="p-4 rounded" style={{
              background: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            }}>
              <p className="text-danger fs-3 font-weight-bold mb-0">
                {data?.dateNTime}
              </p>
            </div>
            <a href="/register" className="btn-get-started scrollto">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;