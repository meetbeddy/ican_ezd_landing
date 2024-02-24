import React from "react";

function TravelInformation() {
  return (
    <section id="services" className="services section-bg ">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>travel Information</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="icon-box" data-aos="fade-up" data-aos-delay={100}>
              <i className="bi bi-geo-alt" />
              <h4>
                <a href="#">Event Venue</a>
              </h4>
              <p>

              </p>
            </div>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay={300}>
              <i className="bi bi-airplane" />
              <h4>
                <a href="#">Transport</a>
              </h4>
              <p>
                Attendees who would not be staying around the conference venue
                are advised to include a little extra budget for their daily
                transport.
              </p>
            </div>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay={200}>
              <i className="bi bi-building" />
              <h4>
                <a href="#hotels">Hotel</a>
              </h4>
              <p>
                The conference is organized on a non-residential basis.
                Affordable accommodations are however available within and
                around the Conference venue.


              </p>
              <a href="#hotels">See Hotel Arrangements</a>
            </div>
          </div>

          <div className="col-md-6 mt-4 mt-md-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay={400}>
              <i className="bi bi-binoculars" />
              <h4>
                <a href="#">Have Fun</a>
              </h4>
              <p>Have fun while you wait for the event to commence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TravelInformation;
