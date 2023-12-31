import React from "react";
import { NavLink } from "react-router-dom";
import "./services.css";
import img1 from "../../../assets/images/garments.jpg";
import img2 from "../../../assets/images/whitebedsheets.jpg";
import img3 from "../../../assets/images/colored.jpg";
import img4 from "../../../assets/images/coloredgarments.png";
import Review from "../review/Review";
import Navbar from "../../../layouts/public/Navbar";
import Footer from "../../../layouts/public/Footer";

const reviewCon = {
  padding: "5%",
  // display:"flex",
  // justifyContent:"center",
};
function Services() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="container-A" id="kalma">
          <div className="row">
            <div className="col-md-12 mb-4 text-center">
              <h2 className="heading">Home Pickup & Delivery Services</h2>
              <div className="underline mx-auto"></div>
            </div>
            <div className="col-md-4 text-center">
              <div className="iconbox-icon rounded-circle">
                <button
                  id="icon-btn"
                  type="button"
                  className="btn btn-primary rounded-circle"
                >
                  <i className="fa-solid fa-thumbs-up boxicon"></i>
                </button>
              </div>
              <h5>We are Trusted.</h5>
              <p className="service-parag">
                You don't have to worry about anything, we are always ready to
                give you the best quality of clothes you can wear. We will
                ensure that your laundry is safe with us.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <div className="iconbox-icon rounded-circle">
                <button
                  id="icon-btn"
                  type="button"
                  className="btn btn-primary rounded-circle"
                >
                  <i className="fa-solid fa-shirt boxicon"></i>
                </button>
              </div>
              <h5>Quality is our Priority.</h5>
              <p className="service-parag">
                For a healthier life experience, we will provide you with a good
                quality of your clothes. Because quality is our top most
                priority.
              </p>
            </div>
            <div className="run col-md-4 text-center">
              <div className="iconbox-icon rounded-circle">
                <button
                  id="icon-btn"
                  type="button"
                  className="btn btn-primary rounded-circle"
                >
                  <i className="fa-solid fa-truck boxicon"></i>
                </button>
              </div>
              <h5>You'll Surely Love it.</h5>
              <p className="service-parag">
                Tell us when to pick-up and we will be there everyday.We deliver
                door to door for the safety of your clothes.
              </p>
            </div>
          </div>
        </div>

        <section className="section-c bg-light border-top" id="secret">
          {/* <div className="container" id="price-container"> */}
          <div id="price-container">
            <h2 className="text-center title">Pricing</h2>
            <div className="underline mx-auto"></div>
            <p className="text-center description">
              Enjoy our very affordable price!
            </p>
            <div className="card-container" id="card-header">
              <div className="img col-md-3 service-item">
                <div className="card shadow">
                  <img
                    src={img1}
                    alt="Wash and Fold"
                    className="card-img-top service-image"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">Rate Per Load</h5>
                    <h6 className="text-center">PHP 300</h6>

                    <ul className="service-prices">
                      <li>Whites (Garments & towel): 7 kls. Max.</li>
                    </ul>
                    <NavLink to="/order" className="orderNow">
                      <button className="button-29" id="orderNow">
                        Order Now
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="img col-md-3 service-item">
                <div className="card shadow">
                  <img
                    src={img2}
                    alt="Dry Cleaning"
                    className="card-img-top service-image"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">Rate Per Load</h5>
                    <h6 className="text-center">PHP 250</h6>

                    <ul className="service-prices">
                      <li>Whites (Bedsheet & Towel) : 7 kls. Max.</li>
                    </ul>
                    <NavLink to="/order" className="orderNow">
                      <button className="button-29" id="orderNow">
                        Order Now
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="img col-md-3 service-item">
                <div className="card shadow">
                  <img
                    src={img3}
                    alt="Fold"
                    className="card-img-top service-image"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">Rate Per Load</h5>
                    <h6 className="text-center">PHP 200</h6>

                    <ul className="service-prices">
                      <li>Colored (Bedsheet & Towel): 7 kls. Max.</li>
                    </ul>
                    <NavLink to="/order" className="orderNow">
                      <button className="button-29" id="orderNow">
                        Order Now
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="img col-md-3 service-item">
                <div className="card shadow">
                  <img
                    src={img4}
                    alt="Fold"
                    className="card-img-top service-image"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">Rate Per Load </h5>
                    <h6 className="text-center">PHP 150</h6>

                    <ul className="service-prices">
                      <li>Colored (Tshirt, Pants, Underwear): 7 kls. Max.</li>
                    </ul>
                    <NavLink to="/order" className="orderNow">
                      <button className="button-29" id="orderNow">
                        Order Now
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
