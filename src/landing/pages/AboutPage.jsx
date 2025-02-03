import React from "react";
import PageWrapper from "./PageWrapper";
import { Link } from "react-router-dom";
import data from "../../data";

function AboutPage() {
  return (
    <PageWrapper pageTitle="About Us">
      <section className="breadcrumbs">
        <div className="container">
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>about</li>
          </ol>
          <h3>{data.landingPage.about.theme}</h3>
        </div>
      </section>
      <div className="row">
        <div className="col-sm-12 col-md-8">
          {data.landingPage.about.details.map((data, i) => (
            <React.Fragment key={i}>
              <p className=" text-justify">{data.detail}</p>
              <br />
            </React.Fragment>
          ))}
        </div>
        <div className="col-md-4">
          <img src="assets/ican-ezd-flyer-25.jpg" className="w-100" alt="" />{" "}
        </div>
      </div>
    </PageWrapper>
  );
}

export default AboutPage;
