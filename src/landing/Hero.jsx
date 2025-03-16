import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function Hero({ data }) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleVideoOpen = () => setShowVideoModal(true);
  const handleVideoClose = () => setShowVideoModal(false);

  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container" data-aos="zoom-out" data-aos-delay={100}>
        <div className="row">
          <div className="col-xl-12">
            <h1>{data?.year}</h1>
            <h2>{data?.theme}</h2>
            <div className="p-4 rounded" style={{
              background: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            }}>
              <p className="text-danger fs-3 font-weight-bold mb-0">
                {data?.dateNTime}
              </p>
            </div>
            <div className="mt-4 d-flex gap-3">
              <a href="/register" className="btn-get-started scrollto">
                Get Started
              </a>
              <button
                className="btn-watch-video"
                onClick={handleVideoOpen}
              >
                <i className="bi bi-play-circle"></i>
                <span>Watch Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Modal
        show={showVideoModal}
        onHide={handleVideoClose}
        size="lg"
        centered
        className="video-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{data?.theme || "Conference Video"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="ratio ratio-16x9">
            <video
              controls
              autoPlay
              className="w-100"
            >
              <source
                src="https://res.cloudinary.com/lmcs/video/upload/v1742119049/luuskdwdoufkmtqxo2ef.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default Hero;