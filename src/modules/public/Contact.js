import React from 'react'
import Navbar from '../../layouts/public/Navbar';
import Footer from '../../layouts/public/Footer';
import './contact.css';
import '../../layouts/public/navbar.css';

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
                          <section class="content">
                      <div class="card">
                          <div class="card-body row">
                          <center><h2 className="text-dark">Contact Us</h2></center><br /><br /><br />
                          <div class="col-5 text-center d-flex align-items-center justify-content-center">
                              <div class="">
                              <h2>We're here to help!</h2>
                              <p class="lead mb-5"><b>You can chat with us<br/> by using the form on the right side of the screen.</b><br/>
                                  <b>Phone:+63 953-1093-959</b>
                              </p>
                              </div>
                          </div>
                          <div class="col-7">
                              <div class="form-group">
                              <label for="inputName">Name</label>
                              <input type="text" id="inputName" class="form-control" />
                              </div>
                              <div class="form-group">
                              <label for="inputEmail">E-Mail</label>
                              <input type="email" id="inputEmail" class="form-control" />
                              </div>
                              <div class="form-group">
                              <label for="inputSubject">Subject</label>
                              <input type="text" id="inputSubject" class="form-control" />
                              </div>
                              <div class="form-group">
                              <label for="inputMessage">Message</label>
                              <textarea id="inputMessage" class="form-control" rows="4"></textarea>
                              </div><br />
                              <div class="form-group">
                              {/* <input type="submit" class="btn btn-success" value="Send message" /><br /><br /><br /> */}
                                <button class="button-29" role="button">Send Message</button>
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
  