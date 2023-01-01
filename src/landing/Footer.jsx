import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <h3>
                ICAN Eastern Zonal District<span>.</span>
              </h3>
              <p>
                5 COREN Drive Independence Layout Enugu,
                <br />
                Enugu Nigeria <br />
                <br />
                {/* <strong>Phone:</strong> +234 808 510 2016
                <br />
                <strong>Email:</strong> info@eneconomics.com
                <br /> */}
              </p>
            </div>
            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right" /> <a href="#">Home</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{" "}
                  <a href="#about">About us</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{" "}
                  <Link to="executives">Executives</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{" "}
                  <Link href="/past-chairmen">Past Chairmen</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{" "}
                  <Link to="/presidency">Presidency</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Download our mobile app</h4>
              <a href="https://play.google.com/store/apps/details?id=com.engelsimmanuel.icanszd&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1&pli=1">
                <img
                  src="assets/images/en_badge_web_generic.png"
                  alt=""
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-md-flex py-4">
        <div className="me-md-auto text-center text-md-start">
          <div className="copyright">
            © Copyright{" "}
            <strong>
              <span>ICAN EZD</span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits">
            Designed by <a href="mailto:meetbeddy@gmail.com">Meetbeddy</a>
          </div>
        </div>
        {/* <div className="social-links text-center text-md-end pt-3 pt-md-0">
          <a
            href="https://twitter.com/Eneconomics_GS?t=_HIvM5gM4FhC519UxfILwA&s=08"
            className="twitter"
          >
            <i className="bx bxl-twitter" />
          </a>
          <a href="https://www.facebook.com/eneconomics/" className="facebook">
            <i className="bx bxl-facebook" />
          </a>
          <a
            href="https://www.instagram.com/eneconomics/"
            className="instagram"
          >
            <i className="bx bxl-instagram" />
          </a>
          <a
            href="https://www.linkedin.com/company/eneconomics/"
            className="linkedin"
          >
            <i className="bx bxl-linkedin" />
          </a>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
