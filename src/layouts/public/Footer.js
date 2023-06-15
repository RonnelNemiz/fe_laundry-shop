import React from "react";
import { Link } from "react-router-dom";
import laundrylogo from "../../assets/images/labanderas.png";
import "./footer.css";

function Footer() {
  return (
    <section id="footer-niSija" className="section footer bg-dark text-white">
      <div className="container-footer conConFooterthis">
        <div className="row" id="footer-row">
          <div className="col-md text-center logo-wrapperCon">
            <div className="logo-container img-logoContainer">
              <img src={laundrylogo} alt="logo" className="laundrylogo" />
            </div>
          </div>
          <div className="container1 col-md text-center">
            <h6 className="quicklink">QUICK LINKS</h6>
            <div className="underline mx-auto"></div>
            <div>
              <Link to="/" className="haco">Home</Link>
            </div>
            <div>
              <Link to="about" className="haco">About</Link>
            </div>
            <div>
              <Link to="/contact" className="haco">Contact</Link>
            </div>
            <div>
              <Link to="/order" className="haco">Order</Link>
            </div>
          </div>
          <div className="container1 col-md text-center">
            <h6 className="operatinghours">OPERATING HOURS</h6>
            <div className="underline mx-auto"></div>
            <div className="text-white mb-1" id="haco">Monday to Sunday</div>
            <div className="text-white mb-1" id="haco">8AM to 12 midnight </div>
            <div className="text-white mb-1" id="haco">8AM to 12 midnight </div>
          </div>
          <div className="container1 col-md text-center">
            <h6 className="contactinformation">CONTACT INFORMATION</h6>
            <div className="underline mx-auto"></div>
            <div className="text-white mb-1" id="haco">
              <i className="fa-solid fa-location-dot" ></i>ML Flores St. Central
              Poblacion
            </div>
            <div className="text-white mb-1" id="haco">
              <i className="fa-solid fa-phone-volume"></i>+639531093959
            </div>
            <div className="text-white mb-1" id="haco">
              <i className="fa-solid fa-envelope"></i>laundryshop123@gmail.com
            </div>
            <div className="text-white mb-1"></div>
          </div>
          <p className="copyRightStyle" id="haco">© 2023 Laundry Shop Management System. All Rights Reserved.</p>
        </div>
      
      </div>
    
    </section>
  );
}

export default Footer;
