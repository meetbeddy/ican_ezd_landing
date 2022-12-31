import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";

function PageWrapper(props) {
  return (
    <div>
      <Header />
      <main id="main">
        <section className="inner-page">
          <div className="container" data-aos="fade-up">
            {props.children}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default PageWrapper;
