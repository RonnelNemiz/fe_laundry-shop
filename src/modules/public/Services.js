import React from "react";
import Navbar from "../../layouts/public/Navbar";
import Footer from "../../layouts/public/Footer";
import img2 from '../../assets/images/img2.jpg'
import img3 from '../../assets/images/img3.jpg'
import Slider from "./Slider";





function Services() {
  return (
    <div>
      <Navbar />
      <Slider />
      <div>

        <section className="section bg-light border-top">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mb-4 text-center">
                <h2 className="heading">Home Pickup & Delivery Services</h2>
                <div className="underline mx-auto"></div>
              </div>
              <div className="col-md-4 text-center">
                <div className="iconbox-icon rounded-circle">
                  <button type="button" className="btn btn-primary rounded-circle">
                    <i className="fa-solid fa-thumbs-up boxicon"></i>
                  </button>
                </div>
                <h5>We are Trusted.</h5>
                <p>You don't have to worry about anything, we are always ready to give you the best quality of clothes you can wear. We will ensure that your laundry is safe with us.</p>
              </div>
              <div className="col-md-4 text-center">

                <div className="iconbox-icon rounded-circle">
                  <button type="button" className="btn btn-primary rounded-circle">
                    <i className="fa-solid fa-shirt boxicon"></i>
                  </button>
                </div>
                <h5>Quality is our Priority.</h5>
                <p>For a healthier life experience, we will provide you with a good quality of you clothes. Because quality is our top most priority. </p>
              </div>
              <div className="col-md-4 text-center">

                <div className="iconbox-icon rounded-circle">
                  <button type="button" className="btn btn-primary rounded-circle">
                    <i className="fa-solid fa-truck boxicon"></i>
                  </button>
                </div>
                <h5>You'll Surely Love it.</h5>
                <p>Tell us when to pick-up and we will be there everyday.We deliver door to door for the safety of your clothes. </p>
              </div>
            </div>
          </div>
        </section>

        <div className="container laundry-service">
          <h1 className="text-center title">Laundry Services</h1>
          <p className="text-center description">
            Choose from our selection of laundry services and book online today!
          </p>
          <div className="row">
            <div className="col-md-4 service-item">
              <div className="card">
                {/* <img
                  src={img1}
                  alt="Wash and Fold"
                  className="card-img-top service-image"
                /> */}
                <div className="card-body"> 
                  <h5 className="card-title">Rate Per Load (Php 190)</h5>
                  <p className="card-text">
                    Get your clothes washed, dried, and folded with our wash and
                    fold service.
                  </p>
                  <ul className="service-prices">
                    <li>Colored Garments (Tshirt, Pants, Underwear) 5 kls. Max.</li>
                    <li>Medium bag: $30</li>
                    <li>Large bag: $40</li>
                  </ul>
                  <button className="btn btn-primary">Book Now</button>
                </div>
              </div>
            </div>
            <div className="col-md-4 service-item">
              <div className="card">
                <img
                  src={img2}
                  alt="Dry Cleaning"
                  className="card-img-top service-image"
                />
                <div className="card-body">
                  <h5 className="card-title">Dry</h5>
                  <p className="card-text">
                    We offer high-quality dry cleaning services for all types of
                    garments.
                  </p>
                  <ul className="service-prices">
                    <li>Shirt: $5</li>
                    <li>Pants: $7</li>
                    <li>Dress: $12</li>
                  </ul>
                  <button className="btn btn-primary">Book Now</button>
                </div>
              </div>
            </div>
            <div className="col-md-4 service-item">
              <div className="card">
                <img
                  src={img3}
                  alt="Fold"
                  className="card-img-top service-image"
                />
                <div className="card-body">
                  <h5 className="card-title">Fold</h5>
                  <p className="card-text">
                    Need a garment altered or repaired? Our experienced tailors
                    have got you covered.
                  </p>
                  <ul className="service-prices">
                    <li>Hemming: $10</li>
                    <li>Tapering: $15</li>
                    <li>Repair: $20+</li>
                  </ul>
                  <button className="btn btn-primary">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        














      </div>
      <Footer />
    </div>



  )
}


export default Services;

