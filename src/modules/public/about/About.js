import React from 'react'
import Footer from '../../../layouts/public/Footer';
import './about.css';
import '../../../layouts/public/navbar.css';
import imageA from '../../../assets/images/imageA.jpeg';
import Navbar from '../../../layouts/public/Navbar';

function About() {
	return (
	  <div>
		 <Navbar/>
		 <div>
		 <section className="Mainsection px-0 px-md-5 mx-5">
				  <div className="maincontainer">
					<div className="row">
					  <div className="col-md-12-text-center">
						<h1 className="main-heading">Who We Are</h1>
						<div className="underline mx-auto"> </div>
						<h3 className="text-center">We are your trusted laundry service company</h3>
						<di className="text">
						<p className="p-text">
						From our intuitive customer journey to our unmatched technology,
						 our platform is designed to provide a fun and easy laundry experience.
  
						 The Laundry Project provides full-service for your laundry needs. 
						 We are committed to providing quality laundry and dry-cleaning services by using safe and gentle laundry detergents and dry-cleaning products. 
						 Our team is dedicated to handling your clothes with care. 
						 We pick up and drop off your clothes right at your place of work or your home.
						</p>
						</di>
					   
					  </div>
					</div>
				  </div>
			</section>
  
			<section className="sectionA px-0 px-md-5 mx-5">
				  <div className="maincontainer">
					<div className="row">
					  <div className="col-md-12-text-center">
						<h1 className="main-heading">Our Laundry History</h1>
						<div className="underline mx-auto"> </div>
						<p className="p-text">
						From our intuitive customer journey to our unmatched technology,
						 our platform is designed to provide a fun and easy laundry experience.
						 Inspired by a bold ambition to challenge the status quo. Through technology and innovation, 
						  we aim to pioneer customer centricity and excitement in a traditional industry.
						</p>
					   
					  </div>
					</div>
				  </div>
			</section>
  
			<section className="sectionA px-0 px-md-5 mx-5">
			  <div className="maincontainer">
				  <div className="row" id="nemz">
					  <div className="col-md text-center" id="tiger">
						  <h6>STRATEGY</h6>
						  <div className="underline mx-auto"></div>
						  <p>
						  Increase your social presence and following
						  </p>
						  <p>
							Improve your exterior look.
						  </p>
						  <p>
						  Sponsor a team or organization
						  </p>
						  <p>
						  Paid Advertising on Social Media.
						  </p>
					  </div>
					  <div className="col-md text-center">
						  <h6>CUSTOMER</h6>
						  <div className="underline mx-auto"></div>
						  <p>
							  Host a special event.
						  </p>
						  <p>
							  Join a community business group.
						  </p>
						  <p>
							  Partner with other local businesses. Improve your exterior look.
						  </p>
						  <p>
							  Improve your exterior look.
						  </p>
					  </div>
					  </div>
				  </div>
		  </section>
  
		  <section className="px-0 px-md-5 mx-5">
			  <div className="maincontainer">
				  <div className="row">
					  <div className="col-md text-center">
						  <h3>We make laundry easy, literally</h3>
						  <div className="underline mx-auto"></div>
						  <p>
						  From our intuitive customer journey to our unmatched technology,
						   our platform is designed to provide a fun and easy laundry experience.
						  </p>
					  </div>
					  <div className="col-md text-center img-fluid">
						  <img src={imageA} alt="images" className='laundry-img'/>
					  </div>
					  </div>
				  </div>
		  </section>
	   </div>
			<Footer/>
			
	  </div>
	)
  }
  
  export default About
