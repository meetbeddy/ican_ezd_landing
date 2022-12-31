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
                    Phone: 08034077466, 08038675221, 08035449082, 08064034543
                  </p>
                  <p>
                    Email: icanezdconference@gmail.com, ebialimndili@gmail.com
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="info-box">
                  <i className="bx bx-map" />
                  <h3>Advert and Sponsorship</h3>
                  <p>
                    Phone: 08057104419, 08039284914, 08063337008,08032247337,
                    08088610350, 08035582025
                  </p>
                  <p>
                    Email: icanezdconference@gmail.com, ebialimndili@gmail.com,
                    otijiifyy@yahoo.com
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="info-box">
                  <i className="bx bx-map" />
                  <h3>Finance & Registration</h3>
                  <p>
                    Phone: 08033892313, 08066584224, 08067466900, 07036442598
                  </p>
                  <p>Email: icanezdconference@gmail.com,sity55@yahoo.com</p>
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
