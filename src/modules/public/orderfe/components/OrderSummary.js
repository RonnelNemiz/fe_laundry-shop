import React from "react";

function OrderSummary() {
  return (
    <div>
      <main class="main-checkout">
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
    </div>
  );
}

export default OrderSummary;
