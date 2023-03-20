import React from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from '../../layouts/public/Navbar';
import Footer from '../../layouts/public/Footer';
import './home.css';
import '../../layouts/public/navbar.css';
import image4 from '../../assets/images/image4.png'
import img1 from '../../assets/images/img1.jpg'
import img2 from '../../assets/images/img1.jpg'
import img3 from '../../assets/images/img1.jpg'



function Home() {
  return (
    <div>
      <Navbar/>
      <div>
          <div className="mainSection">
              <div className="contentBox">
                <h1>You leave it we clean it! </h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <div className="btnBox">
                    <div className="btn btn-outline-info">
                      <NavLink to="/about" className="viewMore">
                        View More <i className="fa-solid fa-arrow-right"></i>
                      </NavLink>
                    </div>
                </div>
              </div>
              <div className="imgContainer">
                  <img src={image4} alt="images"/>
              </div>
          </div>
          <section className="section">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12-text-center">
                      <h1 className="main-heading">What We Offer</h1>
                      <div className="underline mx-auto"></div>
                      <p className="service">
                        Pick-Up & Delivery Service Available 
                      </p>
                      
                    </div>
                  </div>
                </div>
          </section>

          {/* Services */}
          <section className="section border-top">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12-text-center">
                      <h1 className="main-heading">Our Services</h1>
                      <div className="underline mx-auto"></div>
                      </div>
                     <div className="col-md-4">
                        <div className="card shadow">
                          <img src={img1} className="w-100 border-bottom" alt="img1"/>
                          <div className="card-body">
                            <h6>Service 1</h6>
                            <div className="underline"></div>
                            <p>
                              Lorem kajdjaidja aidjaidai aidjiajdiad aijaid.
                            </p>
                          </div>
                        </div>
                     </div>
                     <div className="col-md-4">
                        <div className="card shadow">
                          <img src={img2} className="w-100 border-bottom" alt="img2"/>
                          <div className="card-body">
                            <h6>Service 1</h6>
                            <div className="underline"></div>
                            <p>
                              Lorem kajdjaidja aidjaidai aidjiajdiad aijaid.
                            </p>
                            
                          </div>
                        </div>
                     </div>
                     <div className="col-md-4">
                        <div className="card shadow">
                          <img src={img3} className="w-100 border-bottom" alt="img3"/>
                          <div className="card-body">
                            <h6>Service 1</h6>
                            <div className="underline"></div>
                            <p>
                              Lorem kajdjaidja aidjaidai aidjiajdiad aijaid.
                            </p>
                           
                          </div>
                        </div>
                     </div>
                    </div>
                  </div>
          </section>
          <section className="section bg-light border-top">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="main-heading1">Come & Try Our Services</h1>
                      <div className="underline"></div>
                      </div>
                     <div className="col-md-4">
                        <h5 className="main">We Offer the Best Quality of Clothes.</h5>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div className="btn-Box">
                    <div className="btn btn-outline-info">
                      <NavLink to="/services" className="clickHere">
                        Click Here <i className="fa-solid fa-arrow-right"></i>
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
  )
}

export default Home;
