import React from "react";
import "./contact.css";
import "../../../layouts/public/navbar.css";
import Navbar from "../../../layouts/public/Navbar";
import Footer from "../../../layouts/public/Footer";

function Contact() {
  return (
    <div>
      <Navbar />

      <div className="custom-container">
        <div className="row">
          <div className="col-md-12">
            <div className="card custom-card" style={{ border: "none" }}>
              <div
                className="row"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {/* <div className="col-md-7" id="custom-card-body">
                  <h2>Get in Touch</h2>
                  <div className="mb-3">
                    <label htmlFor="nameInput" className="custom-form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nameInput"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="emailInput" className="custom-form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="numberInput" className="custom-form-label">
                      Contact Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="numberInput"
                      placeholder="Enter your number"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="messageInput" className="custom-form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="messageInput"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="custom-primary-btn">
                    <button className="btn customs-btn-primary">Send</button>
                  </div>
                </div> */}
                <div className="col-md-5">
                  <h2>Contact Us</h2>
                  <div className="mt-5">
                    <div className="d-flex">
                      <span className="custom-fa-icon">
                        <i className="fa-solid fa-location-dot"></i>
                      </span>
                      <p>
                        Address: ML Flores Street, Central Poblacion, Hilongos,
                        Leyte
                      </p>
                    </div>
                    <div className="d-flex">
                      <span className="custom-fa-icon">
                        <i className="fa-solid fa-phone"></i>
                      </span>
                      <p>Phone: +639531093959</p>
                    </div>
                    <div className="d-flex">
                      <span className="custom-fa-icon">
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                      <p>Email: treslabanderas@gmail.com</p>
                    </div>
                    <div className="d-flex">
                      <span className="custom-fa-icon">
                        <i className="fa-brands fa-edge"></i>
                      </span>
                      <p>Website: treslabanderas.technopreneurship.store</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
