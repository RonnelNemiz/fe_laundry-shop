import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../../layouts/public/Navbar";
// import Footer from "../../layouts/public/Footer";
import "./home.css";
import image4 from "../../assets/images/laundry.gif";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import delivery from "../../assets/images/delivery.gif";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div>
      <Navbar />
      <div>
        {/* First Section */}
        <div className="mainSection container">
          <div className="contentBox">
            <h1>You Leave It We Clean It! </h1>
            <p>
              Nobody will do a better job of your belongings than a professional
              laundry service. Your clothing is carefully washed, and stains are
              eliminated, using the best methods and washing procedures.
            </p>
            <div className="btnBox">
              <NavLink to="/about" className="viewMore">
                <button class="button-29">View More</button>
              </NavLink>
            </div>
          </div>
          <div className="imgContainer">
            <img src={image4} alt="images" width="600px" />
          </div>
        </div>
        <section className="section border-top">
          <div className="container-home">
            <div className="row">
              <div className="col-md-12-text-center">
                <h1 className="main-heading">What We Offer</h1>
                <div className="underline mx-auto"></div>
                <p className="service">Pick-Up & Delivery Service Available</p>
              </div>
              <div className="delivery">
                <img src={delivery} alt="images" width="450px" />
              </div>
            </div>
          </div>
        </section>

        {/* Second Section */}
        <section className="section border-top">
          <div className="container-home1">
            <div className="row">
              <div className="col-md-12-text-center">
                <h1 className="main-heading">Our Services</h1>
                <div className="underline mx-auto"></div>
              </div>
              <div className="card-container-ni-karen">
                <div className="img col-md-3 center">
                  <div className="card shadow">
                    <img
                      src={img1}
                      className="w-100 border-bottom"
                      alt="img1"
                    />
                    <div className="card-body">
                      <h4>Wash</h4>

                      <p>
                        Wash and dry laundry service saves you more time than
                        washing clothes at the laundromat yourself and is less
                        expensive.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="img col-md-3 center">
                  <div className="card shadow">
                    <img
                      src={img2}
                      className="w-100 border-bottom"
                      alt="img2"
                    />
                    <div className="card-body">
                      <h4>Dry</h4>

                      <p>
                        When you’re short on time, washing, drying, and folding
                        a few loads of laundry can be a great hassle. Come with
                        us.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="img col-md-3 center">
                  <div className="card shadow">
                    <img
                      src={img3}
                      className="w-100 border-bottom"
                      alt="img3"
                    />
                    <div className="card-body">
                      <h4>Fold</h4>

                      <p>
                        After we have washed and dry your clothes the last part
                        is folding and is ready to deliver to your lovely home.
                        We assure that it is safe and clean.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Third Section */}

        <section className="section border-top">
          <div className="container">
            <div className="row" id="service">
              <h1 className="title-underline text-center ">Why Choose Us</h1>

              <div className="col-sm-6 col-md-4">
                <div className="description">
                  <h4 className="title">Personalized Experience </h4>
                  <p>
                    You can always reach us for your laundry concerns. Call us
                    and we are happy to help.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="description">
                  <h4 className="title">Pricing </h4>
                  <p>
                    The quality and cost of our service determine the price.
                    Trust our pricing is reasonable and affordable.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="description">
                  <h4 className="title">Convenience </h4>
                  <p>
                    Simply book through our mobile app for pick up request. Our
                    friendly staff will contact you to confirm your request.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="description">
                  <h4 className="title">Quality</h4>
                  <p>
                    We take utmost care of your clothes, segregating the whites
                    and colored clothes, as well as the dark colored ones to
                    light.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="description">
                  <h4 className="title">Express Delivery</h4>
                  <p>
                    We offer a rush laundry service if required. We can deliver
                    within 8-24 hours.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="description">
                  <h4 className="title">Order Update</h4>
                  <p>
                    We immediately notify you once the laundry is done and ready
                    for delivery. Let us know your convenient time to accept the
                    laundry so we can schedule accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fourth Section */}
        <section className="section1 border-top">
          <div className="container-home2 container ps-5">
            <div className="row">
              <div className="col-md-12" padding-left="10%">
                <h1 className="main-heading1">Come & Try Our Services</h1>
                <div className="underline"></div>
              </div>
              <div className="sec-p col-md-4">
                <h5>We Offer the Best Quality of Clothes.</h5>
                <p>
                  With us we'll make sure that you will be satisfied with our
                  services and won't regret coming back.
                </p>
                <div className="btnBox">
                  <NavLink to="/services" className="viewMore">
                    <button class="button-29">View More</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
