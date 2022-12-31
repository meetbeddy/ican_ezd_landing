import React from "react";

function AboutSection() {
  return (
    <section id="about" className="about section-bg">
      <div className="container" data-aos="fade-up">
        <div className="row no-gutters">
          <div className="content col-xl-6  d-flex align-items-stretch">
            <div className="content">
              <h3>About the Current Year ICAN EZD Conference</h3>
              <p>
                For the year 2022, the conference theme is “REVENUE BEYOND OIL:
                LEVERAGING NON-OIL EXPORT FOR NIGERIA'S ECONOMIC SURVIVAL”.
                There are also two captivating sub-themes slated for Day’s 1 & 2
                of the conference. The Conference host and Chairman of Eastern
                Zonal Districts – Mrs. Uzoamaka Deborah Egbuhuzor FCA together
                with her Executive and other planning Committee Members have
                attracted seasoned technocrats and captains of industries to
                anchor and moderate these taught provoking topics that will
                surely delight your experience. We have also concluded
                arrangements to host the conference on the best internet
                backbone that will ensure uninterrupted network services during
                the conference proceedings.
              </p>
              <a href="/about" className="about-btn">
                <span>Read More</span> <i className="bx bx-chevron-right" />
              </a>
            </div>
          </div>
          {/* <div className="col-xl-6 d-flex align-items-stretch">
            <div className="icon-boxes d-flex flex-column justify-content-center">
              <div className="row">
                <div
                  className="col-md-12 icon-box"
                  data-aos="fade-up"
                  data-aos-delay={100}
                >
                  <i className="bx bx-receipt" />
                  <h4>Plenaries</h4>
                  <p className="text-justify">
                    Through increased advocacy for a sustainable and
                    economically empowered Nation, we work with the Youth
                    Community (Young Professionals, Influencers,
                    Researchers/Scholars, and Policymakers) and focus on three
                    pillars:{" "}
                  </p>
                  <ul>
                    <li>Development-focused research, </li>
                    <li>Youth Empowerment (leadership and business), and </li>
                    <li>Civic Engagements</li>
                  </ul>
                </div>
              </div>
            </div>
           
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
