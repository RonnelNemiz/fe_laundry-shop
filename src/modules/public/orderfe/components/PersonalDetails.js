import React, { useState } from "react";
import "../order.css";
import COD from "../../../../assets/images/codIcon.svg";
import Gcash from "../../../../assets/images/gcashIcon.svg";

function PersonalDetails() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [purok, setPurok] = useState("");
  const [brgy, setBrgy] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [phone, setPhone] = useState("");
  const [landmark, setLandmark] = useState("");
  return (
    <main class="main-checkout">
      <section class="checkout-section">
        <h1>CHECKOUT</h1>
        <h5>Personal Details:</h5>
        <div className="row">
          <div className="col-md-5">
            <div className="form-group mb-3">
              <label>First Name</label>
              <input
                type="text"
                name="firstname"
                className="form-control"
                placeholder="Enter your first name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}></input>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group mb-3">
              <label>Last Name</label>
              <input
                type="text"
                name="lastname"
                className="form-control"
                placeholder="Enter your last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}></input>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group mb-3">
              <label>Purok</label>
              <input
                type="text"
                name="purok"
                className="form-control"
                placeholder="e.g, Proper"
                value={purok}
                onChange={(e) => setPurok(e.target.value)}></input>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group mb-3">
              <label>Brgy</label>
              <input
                type="text"
                name="brgy"
                className="form-control"
                placeholder="e.g, Sta. Margarita"
                value={brgy}
                onChange={(e) => setBrgy(e.target.value)}></input>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group mb-3">
              <label>Municipality</label>
              <input
                type="text"
                name="municipality"
                className="form-control"
                placeholder="e.g, Hilongos"
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}></input>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group mb-3">
              <label>Phone</label>
              <input
                type="number"
                name="phone"
                className="form-control"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}></input>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group mb-3">
              <label>Landmark</label>
              <input
                type="text"
                name="landmark"
                className="form-control"
                placeholder="Landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}></input>
            </div>
          </div>
        </div>

        <section className="section-flex py-5">
          <h2 className="section-flex-title">PAYMENT METHOD</h2>
          <section>
            <section className="section-flex margin-bottom-1rem ">
              <label className="payment-radio-flex">
                <img src={COD} alt="" />
                <div className="radio">
                  <span>COD</span>
                  <input id="cod" name="payment" type="radio" />
                </div>
              </label>
              <label htmlFor="gcash">
                <article className="payment-radio-flex">
                  <img src={Gcash} alt="" />
                  <div className="radio">
                    <span>GCASH</span>
                    <input id="gcash" name="payment" type="radio" />
                  </div>
                </article>
              </label>
              <label htmlFor="debitcard"></label>
            </section>
          </section>
        </section>
      </section>
      <section className="order-summary-section">
        <h1>ORDER SUMMARY</h1>
        <section className="garment-selected-container" />
        <input
          className="discountCodeInput margin-bottom-1rem"
          type="text"
          placeholder="Discount Code"
        />
        <div className="order-total-container margin-bottom-1rem">
          <p>Subtotal:</p>
          <span className="subTotal">0.00</span>
        </div>
        <div className="order-total-container margin-bottom-1rem">
          <p>Delivery cost:</p>
          <span className="deliveryCost">0.00</span>
        </div>
        <div className="order-total-container margin-bottom-1rem">
          <p>Total:</p>
          <span className="grandTotal">0.00</span>
        </div>
        <button className="checkoutButton" type="submit">
          CHECKOUT
        </button>
      </section>
    </main>
  );
}

export default PersonalDetails;
