import React from "react";

function Hero({ data }) {
  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container" data-aos="zoom-out" data-aos-delay={100}>
        <div className="row">
          <div className="col-xl-12">
            <h1>{data?.year}</h1>
            <h2>{data?.theme}</h2>
            <p className="text-danger fs-4 font-weight-bold">
              {data?.dateNTime}
            </p>
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
