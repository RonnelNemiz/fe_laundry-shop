import React from "react";
import { Link } from 'react-router-dom';
import laundrylogo from '../../assets/images/laundrylogo.png'
import './footer.css';


function Footer(){
    return (
        <section id="footer" className="section footer bg-dark text-white">
            <div className="container-footer">
                <div className="row">
                    <div className="col-md text-center">
                         <div className="logo-container">
                            <img src={laundrylogo} alt="logo" className="laundrylogo" />
                         </div>
                    </div>
                    <div className="container1 col-md text-center">
                        <h6>QUICK LINKS</h6>
                        <div className="underline mx-auto"></div>
                        <div><Link to="/">Home</Link></div>
                        <div><Link to="about">About</Link></div>
                        <div><Link to="/contact">Contact</Link></div>
                        <div><Link to="/order">Order</Link></div>
                        
                    </div>
                    <div className="container1 col-md text-center">
                        <h6>OPERATING HOURS</h6>
                        <div className="underline mx-auto"></div>
                        <div className="text-white mb-1">Monday to Sunday</div>
                        <div className="text-white mb-1">8AM to 12 midnight </div>
                        <div className="text-white mb-1">8AM to 12 midnight </div>
                    </div>
                    <div className="container1 col-md text-center">
                        <h6>CONTACT INFORMATION</h6>
                        <div className="underline mx-auto"></div>
                        <div className="text-white mb-1"><i className="fa-solid fa-location-dot"></i>ML Flores St. Central Poblacion</div>
                        <div className="text-white mb-1"><i className="fa-solid fa-phone-volume"></i>+639531093959</div>
                        <div className="text-white mb-1"><i className="fa-solid fa-envelope"></i>laundryshop123@gmail.com</div>
                        <div className="text-white mb-1"></div>
                    </div>
                    </div>
                </div>
        </section>

    
 

    );
}

export default Footer;
