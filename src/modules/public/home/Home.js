import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
import image4 from "../../../assets/images/laundry.gif";
import img1 from "../../../assets/images/laundry-services.jpg";
import img22 from "../../../assets/images/img22.jpeg";
import img3 from "../../../assets/images/drycleaning.jpeg";
import delivery from "../../../assets/images/delivery.png";
import Footer from "../../../layouts/public/Footer";
import Navbar from "../../../layouts/public/Navbar";
import aiza from "../../../assets/images/aiza.jpg";
import karen from "../../../assets/images/karen.jpg";
import flores from "../../../assets/images/flores.jpg";
import nemiz from "../../../assets/images/nemiz.jpg";
import { Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const nameStyle = {
  fontWeight: 700,
};
const column1Sec4 = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

function Home() {
  const description3 =
    "After we have washed and dried your clothes, the last part is folding and getting them ready to deliver to your lovely home. We assure that they are safe and clean.";

  const description2 =
    " When you’re short on time, washing, drying, and folding a few loads of laundry can be a great hassle. Come with us.";

  const description1 =
    " Wash and dry laundry service saves you more time than washing clothes at the laundromat yourself and is less expensive.";

  const [showMore1, setShowMore1] = useState(description1.length <= 100);
  const [showMore2, setShowMore2] = useState(description2.length <= 100);
  const [showMore3, setShowMore3] = useState(description3.length <= 100);

  const toggleShowMore1 = () => {
    setShowMore1(!showMore1);
  };

  const toggleShowMore2 = () => {
    setShowMore2(!showMore2);
  };

  const toggleShowMore3 = () => {
    setShowMore3(!showMore3);
  };

  return (
    <div>
      <Navbar />
      <div className="mainContainer-container1">
        {/* First Section */}
        <div className="mainSection container">
          <div className="contentBox contentBox-v">
            <h1 id="first-title">You Leave It We Clean It! </h1>
            <p id="firstParah">
              Nobody will do a better job of your belongings than a professional
              laundry service. Your clothing is carefully washed, and stains are
              eliminated, using the best methods and washing procedures.
            </p>
            <div className="btnBox">
              <NavLink to="/about" className="viewMore">
                <button className="button-29" id="viewmore-btn">
                  View More
                </button>
              </NavLink>
            </div>
          </div>
          <div className="imgContainer">
            <img
              src={image4}
              alt="images"
              width="600px"
              className="firstImage"
            />
          </div>
        </div>

        {/* Second Section */}
        <section className="section2 border-top">
          <div className="container-home1">
            <div className="row">
              <div className="heading col-md-12-text-center secondTitle-box">
                <h1 className="main-heading">Our Services</h1>
                <div className="underline mx-auto"></div>
              </div>
              <div className="cardBox-ni-karen">
                <div className="card-container-ni-karen">
                  <div className="img col-md-3 center forPaddingBot">
                    <div className="card shadow">
                      <img
                        src={img1}
                        className="w-100 border-bottom"
                        alt="img1"
                      />
                      <div className="card-body">
                        <h4>Wash Dry & Fold</h4>
                        <p className="description-section2">
                          {showMore1
                            ? description1
                            : description1.slice(0, 100)}
                        </p>
                        {description1.length > 100 && (
                          <button
                            className="toggleButtonSeeMore"
                            onClick={toggleShowMore1}>
                            {showMore1 ? "See less" : "See more..."}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="img col-md-3 center forPaddingBot">
                    <div className="card shadow">
                      <img
                        src={img22}
                        className="w-100 border-bottom"
                        alt="img2"
                      />
                      <div className="card-body">
                        <h4>Ironing</h4>
                        <p className="description-section2">
                          {showMore2
                            ? description2
                            : description2.slice(0, 100)}
                        </p>
                        {description2.length > 100 && (
                          <button
                            className="toggleButtonSeeMore"
                            onClick={toggleShowMore2}>
                            {showMore2 ? "See less" : "See more..."}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="img col-md-3 center forPaddingBot">
                    <div className="card shadow">
                      <img
                        src={img3}
                        className="w-100 border-bottom"
                        alt="img3"
                      />
                      <div className="card-body">
                        <h4>Dry Cleaning</h4>
                        <p className="description-section2">
                          {showMore3
                            ? description3
                            : description3.slice(0, 100)}
                        </p>
                        {description3.length > 100 && (
                          <button
                            className="toggleButtonSeeMore"
                            onClick={toggleShowMore3}>
                            {showMore3 ? "See less" : "See more..."}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3rd */}
        <section className="section1 border-top" id="lami">
          <div className="container-home">
            <div className="row firstRow-sec1">
              <div className="col-md-12-text-center">
                <h1 className="main-heading">Our Handling</h1>
                <div className="underline mx-auto"></div>
                <p className="service">Pick-Up & Delivery Service Available</p>
              </div>
              <div className="delivery">
                <img
                  src={delivery}
                  alt="images"
                  style={{ width: "60%", paddingTop: "20px" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Third Section */}

        <section className="section3 border-top">
          <div className="container container-sec3">
            <div className="row our-serviceSec3" id="service">
              <h1 className="title-underline text-center ">Why Choose Us</h1>

              <div className="col-sm-6 col-md-4">
                <div className="description">
                  <div className="iconbox-icon rounded-circle">
                    <button
                      id="icon-btn"
                      type="button"
                      className="btn btn-primary rounded-circle">
                      <FontAwesomeIcon icon="fa-brands fa-edge" />
                    </button>
                  </div>
                  <h4 className="title">Personalized Experience </h4>
                  <p>
                    You can always reach us for your laundry concerns. Call us
                    and we are happy to help.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="description">
                  <div className="iconbox-icon rounded-circle">
                    <button
                      id="icon-btn"
                      type="button"
                      className="btn btn-primary rounded-circle">
                      <FontAwesomeIcon icon="fa-solid fa-hand-holding-dollar" />
                    </button>
                  </div>
                  <h4 className="title">Pricing</h4>

                  <p>
                    The quality and cost of our service determine the price.
                    Trust our pricing is reasonable and affordable.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="description">
                  <div className="iconbox-icon rounded-circle">
                    <button
                      id="icon-btn"
                      type="button"
                      className="btn btn-primary rounded-circle">
                      <FontAwesomeIcon icon="fa-solid fa-mobile" />
                    </button>
                  </div>
                  <h4 className="title">Convenience </h4>
                  <p>
                    Simply book through our mobile app for pick up request. Our
                    friendly staff will contact you to confirm your request.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="description">
                  <div className="iconbox-icon rounded-circle">
                    <button
                      id="icon-btn"
                      type="button"
                      className="btn btn-primary rounded-circle">
                      <FontAwesomeIcon icon="fa-solid fa-check" />
                    </button>
                  </div>
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
                  <div className="iconbox-icon rounded-circle">
                    <button
                      id="icon-btn"
                      type="button"
                      className="btn btn-primary rounded-circle">
                      <FontAwesomeIcon icon="fa-solid fa-truck" />
                    </button>
                  </div>
                  <h4 className="title">Express Delivery</h4>
                  <p>
                    We offer a rush laundry service if required. We can deliver
                    within 8-24 hours.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="description">
                  <div className="iconbox-icon rounded-circle">
                    <button
                      id="icon-btn"
                      type="button"
                      className="btn btn-primary rounded-circle">
                      <FontAwesomeIcon icon="fa-solid fa-comment-sms" />
                    </button>
                  </div>
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
        <section className="section4 border-top">
          <div className="container-home2 container " id="container-nemiz">
            <div className="row row-section4">
              <div className="col-md-12 col1-section4" style={column1Sec4}>
                <h1 className="main-heading1">Come & Try Our Services</h1>
                <div className="underline"></div>
              </div>
              <div
                className="sec-p col-md-4 secondBox-sec4"
                style={{ textAlign: "center" }}>
                <h5>We Offer the Best Quality of Clothes.</h5>
                <p>
                  With us we'll make sure that you will be satisfied with our
                  services and won't regret coming back.
                </p>
                <div className="btnBox">
                  <NavLink to="/services" className="viewMore">
                    <button className="button-29" id="btn-viewmore">
                      View More
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* stat */}

        <div className="testimonials border-top">
          <div className="inner" id="ehsulod">
            <h1>Customer Reviews</h1>
            <div className="border"></div>
            {/* <div id="testimonial-carousel" className="rowls row"> */}
            <Carousel>
              <Carousel.Item interval={1500}>
                <div className="col carousel-colCol">
                  <div className="testimonial">
                    <img src={aiza} alt="images" />
                    <div className="name" style={nameStyle}>
                      Maria Aiza Butar
                    </div>
                    <div className="stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>

                    <p className="carousel-parah">
                      "I recently started using a laundry service, and it has
                      been a game-changer. They pick up my laundry from my
                      doorstep and deliver it back to me clean and neatly
                      folded.It has saved me so much time and effort, and I
                      highly recommend their convenient and professional
                      service."{" "}
                    </p>
                  </div>
                </div>
              </Carousel.Item>

              <Carousel.Item interval={1500}>
                <div className="col carousel-colCol">
                  <div className="testimonial">
                    <img src={karen} alt="images" />
                    <div className="name" style={nameStyle}>
                      Karen Mae Lina
                    </div>
                    <div className="stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>

                    <p className="carousel-parah">
                      "I had a positive experience at a full-service laundry.
                      The staff was friendly and efficient, and they took care
                      of my laundry from start to finish. They sorted, washed,
                      dried, and neatly folded my clothes. The turnaround time
                      was quick, and my clothes looked great."
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <div className="col carousel-colCol">
                  <div className="testimonial">
                    <img src={flores} alt="images" />
                    <div className="name" style={nameStyle}>
                      Anabella Flores
                    </div>
                    <div className="stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>

                    <p className="carousel-parah">
                      The facility was clean and well-maintained, with plenty of
                      washers and dryers available. The staff was friendly and
                      helpful, and the machines worked efficiently. It made my
                      laundry day a breeze, and I'll definitely be going back!"
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <div className="col carousel-colCol">
                  <div className="testimonial">
                    <img src={nemiz} alt="images" />
                    <div className="name" style={nameStyle}>
                      Ronnel Nemiz
                    </div>
                    <div className="stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>

                    <p className="carousel-parah">
                      "I had a fantastic laundry experience at a nearby
                      laundromat. The facility was clean, the machines were in
                      great condition, and the staff was friendly. I was able to
                      complete my laundry quickly and efficiently, and I left
                      with fresh, clean clothes. Highly recommended!"
                    </p>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

        {/* end */}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
