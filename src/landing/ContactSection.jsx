import React from "react";

function ContactSection() {
  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Contact</h2>
          {/* <p>
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex
            aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos
            quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
          </p> */}
        </div>
        <div className="row" data-aos="fade-up" data-aos-delay={100}>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-md-12">
                <div className="info-box">
                  <i className="bx bx-map" />
                  <h3>Technical Issues</h3>
                  <p>
                    Phone: 08137073232, 08027947114, 08051664075, 08034077466
                  </p>
                  <p>
                    Email: icanezdconference@outlook.com,
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="info-box">
                  <i className="bx bx-map" />
                  <h3>Advert and Sponsorship</h3>
                  <p>
                    Phone: 08063568402, 0806575009, 08033419008, 08038813428, 08035734227, 08051664075, 08033016199, 08035749607, 08088610350, 08037062504, 07042984055, 0703316945
                  </p>
                  <p>
                    Email: icanezdconference@outlook.com, larryucy@gmail.com kingsleyoyekezie@yahoo.com, modozieemmanuel71@gmail.com,
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="info-box">
                  <i className="bx bx-map" />
                  <h3>Finance & Registration</h3>
                  <p>
                    Phone: 08088610350, 08137073232, 08027947114, 08066575009, 08033419008
                  </p>
                  <p>Email: icanezdconference@outlook.com,</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <form
              action="forms/contact.php"
              method="post"
              role="form"
              className="php-email-form"
            >
              <div className="row">
                <div className="col form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="col form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="message"
                  rows={5}
                  placeholder="Message"
                  required
                  defaultValue={""}
                />
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message" />
                <div className="sent-message">
                  Your message has been sent. Thank you!
                </div>
              </div>
              <div className="text-center">
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
