import React from 'react'
import './contact.css';
import '../../../layouts/public/navbar.css';
import Navbar from '../../../layouts/public/Navbar';
import Footer from '../../../layouts/public/Footer';

function Contact() {
    return (
      <div>
          <Navbar/>
            
          <section className="sections text-white">
                           <div className="maincontainer">
                              <div className="row">
                                  <div className="col-md text-center">
                                      <h2>We make laundry easy, literally</h2>
                                      <p>
                                          From our intuitive customer journey to our unmatched technology,
                                          our platform is designed to provide a fun and easy laundry experience.
                                      </p>
                                  </div>
                           </div>
                      </div>
              </section>
                          <section className="content">
                      <div className="card">
                          <div className="card-body row">
                          <center><h2 className="text-dark">Contact Us</h2></center><br /><br /><br />
                          <div className="col-5 text-center d-flex align-items-center justify-content-center">
                              <div className="">
                              <h2>We're here to help!</h2>
                              <p className="lead mb-5"><b>You can chat with us<br/> by using the form on the right side of the screen.</b><br/>
                                  <b>Phone:+63 953-1093-959</b>
                              </p>
                              </div>
                          </div>
                          <div className="col-7">
                              <div className="form-group">
                              <label for="inputName">Name</label>
                              <input type="text" id="inputName" className="form-control" />
                              </div>
                              <div className="form-group">
                              <label for="inputEmail">E-Mail</label>
                              <input type="email" id="inputEmail" className="form-control" />
                              </div>
                              <div className="form-group">
                              <label for="inputSubject">Subject</label>
                              <input type="text" id="inputSubject" className="form-control" />
                              </div>
                              <div className="form-group">
                              <label for="inputMessage">Message</label>
                              <textarea id="inputMessage" className="form-control" rows="4"></textarea>
                              </div><br />
                              <div className="form-group">
                              {/* <input type="submit" className="btn btn-success" value="Send message" /><br /><br /><br /> */}
                                <button className="button-29" >Send Message</button>
                            </div>
                          </div>
                          </div>
                      </div>
                      </section>
                      <Footer/>
        
      </div>
    )
  }
  
  export default Contact
  