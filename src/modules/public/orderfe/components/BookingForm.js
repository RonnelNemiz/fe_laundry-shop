import React, { useState } from "react";

function BookingForm() {
  const [service, setService] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Implement booking submission logic
  };
  const handleServiceChange = (event) => {
    setService(event.target.value);
  };
  const handleReset = () => {
    setService("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <main class="payment-main">
        <section className="schedule-section mt-5">
          <h1>SELECT SERVICES</h1>
          {/* <div className="schedule-input-container mt-4"> */}
          {/* <label for="dateInput">Date:</label>
            <input
              type="date"
              value="2023-01-11"
              required
              id="dateControl"
              name="dateInput"
            />

            <label for="timeInput">Time:</label>
            <input
              type="time"
              min="09:00"
              max="18:00"
              required
              id="timeControl"
              name="timeInput"
            /> */}
          <div className="section-flex">
            <label htmlFor="oneday">
              <article className="shipping-radio-flex">
                <div>
                  <h2>Pickup & Delivery</h2>
                </div>
                <div className="radio">
                  <span>₱100.00</span>
                  <input
                    id="oneday"
                    name="shipping"
                    type="radio"
                    defaultValue={100}
                  />
                </div>
              </article>
            </label>
            <label htmlFor="oneday">
              <article className="shipping-radio-flex">
                <div>
                  <h2>Pickup</h2>
                </div>
                <div className="radio">
                  <input id="oneday" name="shipping" type="radio" />
                </div>
              </article>
            </label>
            <label htmlFor="oneday">
              <article className="shipping-radio-flex">
                <div>
                  <h2>Deliver</h2>
                </div>
                <div className="radio">
                  <input id="oneday" name="shipping" type="radio" />
                </div>
              </article>
            </label>
            <label htmlFor="oneday">
              <article className="shipping-radio-flex">
                <div>
                  <h2>Walk-In</h2>
                </div>
                <div className="radio">
                  <input id="oneday" name="shipping" type="radio" />
                </div>
              </article>
            </label>
          </div>
        </section>
      </main>
    </form>
  );
}

export default BookingForm;
