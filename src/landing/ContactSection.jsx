import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Alert, Spinner } from "react-bootstrap";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    hasError: false,
    errorMessage: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({
      ...formStatus,
      isSubmitting: true
    });

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        hasError: false,
        errorMessage: ""
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: false,
          hasError: false,
          errorMessage: ""
        });
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="contact py-5 bg-light">
      <div className="container" data-aos="fade-up">
        <div className="section-title text-center mb-5">
          <h2 className="fw-bold">Contact Us</h2>
          <p className="text-muted">Get in touch with our team for any inquiries or support</p>
        </div>

        <Row className="g-4" data-aos="fade-up" data-aos-delay={100}>
          <Col lg={5}>
            <Card className="contact-info-card h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <h3 className="fs-4 fw-bold mb-4 text-primary">How Can We Help?</h3>

                <div className="contact-category mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-box bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                      <i className="bx bx-code-alt text-primary fs-4"></i>
                    </div>
                    <h4 className="fs-5 fw-bold mb-0">Technical Issues</h4>
                  </div>
                  <div className="ps-5">
                    <p className="mb-1"><strong>Phone:</strong> 08137073232, 08027947114, 08051664075, 08034077466</p>
                    <p className="mb-0"><strong>Email:</strong> icanezdconference@outlook.com</p>
                  </div>
                </div>

                <div className="contact-category mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-box bg-success bg-opacity-10 rounded-circle p-3 me-3">
                      <i className="bx bx-dollar-circle text-success fs-4"></i>
                    </div>
                    <h4 className="fs-5 fw-bold mb-0">Advert and Sponsorship</h4>
                  </div>
                  <div className="ps-5">
                    <p className="mb-1"><strong>Phone:</strong> 08063568402, 08065750091, 08033419008 <Button variant="link" className="p-0 align-baseline" data-bs-toggle="collapse" data-bs-target="#moreAdNumbers">more...</Button></p>
                    <div id="moreAdNumbers" className="collapse">
                      <p className="mb-1">08038813428, 08035734227, 08051664075, 08033016199, 08035749607, 08088610350, 08037062504, 07042984055, 07033169451</p>
                    </div>
                    <p className="mb-0"><strong>Email:</strong> icanezdconference@outlook.com, larryucy@gmail.com kingsleyoyekezie@yahoo.com, modozieemmanuel71@gmail.com</p>
                  </div>
                </div>

                <div className="contact-category">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-box bg-warning bg-opacity-10 rounded-circle p-3 me-3">
                      <i className="bx bx-credit-card text-warning fs-4"></i>
                    </div>
                    <h4 className="fs-5 fw-bold mb-0">Finance & Registration</h4>
                  </div>
                  <div className="ps-5">
                    <p className="mb-1"><strong>Phone:</strong> 08088610350, 08137073232, 08027947114, 08066575009, 08033419008</p>
                    <p className="mb-0"><strong>Email:</strong> icanezdconference@outlook.com</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h3 className="fs-4 fw-bold mb-4 text-primary">Send Us a Message</h3>

                {formStatus.isSubmitted && (
                  <Alert variant="success" className="d-flex align-items-center">
                    <i className="bx bx-check-circle me-2 fs-4"></i>
                    <div>Your message has been sent successfully! We'll get back to you soon.</div>
                  </Alert>
                )}

                {formStatus.hasError && (
                  <Alert variant="danger" className="d-flex align-items-center">
                    <i className="bx bx-error-circle me-2 fs-4"></i>
                    <div>{formStatus.errorMessage || "There was an error sending your message. Please try again."}</div>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Your Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What is this regarding?"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          placeholder="How can we help you?"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <div className="d-grid">
                        <Button
                          variant="primary"
                          type="submit"
                          size="lg"
                          disabled={formStatus.isSubmitting}
                          className="py-3"
                        >
                          {formStatus.isSubmitting ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                              />
                              Sending Message...
                            </>
                          ) : (
                            <>Send Message</>
                          )}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default ContactSection;