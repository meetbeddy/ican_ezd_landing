import React from "react";

function Speakers({ speakers }) {
  return (
    <section id="speakers" className="team section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Key Note Speakers</h2>
        </div>
        {/* <div className="row d-flex flex-wrap justify-content-center align-items-center">
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
                    <div className="social">
                      <a href="twitter.com">
                        <i className="bi bi-twitter" />
                      </a>
                      <a href="facebook.com">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="instagram.com">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="linkedin.com">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>{speaker.name}</h4>
                    <span>{speaker.position}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    </section>
  );
}

export default Speakers;
