import React from "react";
import { Link } from "react-router-dom";

function Speakers({ speakers }) {
  return (
    <section id="speakers" className="team section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Key Note Speakers</h2>
        </div>
        <div className="row d-flex flex-wrap justify-content-center align-items-center">
          {speakers.map((speaker, i) => {
            return (
              <div
                className="col-lg-3 col-md-6 d-flex align-items-stretch"
                key={i}
              >
                <div className="member" data-aos="fade-up" data-aos-delay={200}>
                  <div className="member-img">
                    <img
                      src={speaker.imageURL}
                      className="img-fluid"
                      alt="sec"
                      style={{
                        height: "250px",
                        width: "100%",
                        objectFit: "fill",
                      }}
                    />

                  </div>
                  <div className="member-info">
                    <h4 className="text-uppercase">{speaker.name}</h4>
                    <span>{speaker.position}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-4 mb-5">
          <Link
            to="/all-speakers"
            className="btn btn-primary btn-lg"
            aria-label="View all conference speakers and discussants"
          >
            View All Speakers & Discussants
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Speakers;
