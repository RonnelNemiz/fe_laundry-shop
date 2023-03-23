import React, { useState } from "react";
import Navbar from "../../../layouts/public/Navbar";
import "./order.css";
import ColoredBedShTowel from "../orderfe/components/ColoredBedShTowel";
import ColoredGarTowel from "../orderfe/components/ColoredGarTowel";
import WhiteBedShTowel from "../orderfe/components/WhiteBedShTowel";
import WhiteGarTowel from "../orderfe/components/WhiteGarTowel";

function Order() {
  const [selectedPage, setSelectedPage] = useState(0);

  const pages = [
    {
      title: "ColoredBedShTowel",
      content: <ColoredBedShTowel />,
    },
    {
      title: "ColoredGarTowel ",
      content: <ColoredGarTowel />,
    },
    {
      title: "WhiteBedShTowel",
      content: <WhiteBedShTowel />,
    },
    {
      title: "WhiteGarTowel",
      content: <WhiteGarTowel />,
    },
  ];

  const handleSelect = (event) => {
    setSelectedPage(Number(event.target.value));
  };

  return (
    <div>
      <Navbar />
      <div id="order-container">
        <div className="container">
          <div className="title">
            <h2>Product Order Form</h2>
          </div>
          <div className="d-flex">
            <div className="form-container">
              {" "}
              <form action method>
                <label>
                  <span className="fname">
                    First Name <span className="required">*</span>
                  </span>
                  <input type="text" name="fname" required />
                </label>
                <label>
                  <span className="lname">
                    Last Name <span className="required">*</span>
                  </span>
                  <input type="text" name="lname" required />
                </label>
                <label>
                  <span>Contact Number</span>
                  <input type="number" name="cn" required />
                </label>
                <label>
                  <span>
                    Purok<span className="required">*</span>
                  </span>
                  <input type="text" name="purok" required />
                </label>
                <label>
                  <span>
                    Brgy<span className="required">*</span>
                  </span>
                  <input type="text" name="brgy" required />
                </label>

                <label>
                  <span>
                    Municipality <span className="required">*</span>
                  </span>
                  <input type="email" name="municipality" required />
                </label>
              </form>
            </div>
            <div className="row align-items-start">
              <div className="col">
                <div>
                  <h2>Quantity</h2>
                  <br />
                  <p>Select categories:</p>
                  <br />
                  <select onChange={handleSelect} className="select">
                    {pages.map((page, index) => (
                      <option key={index} value={index}>
                        {page.title}
                      </option>
                    ))}
                  </select>
                  {pages[selectedPage].content}
                </div>
              </div>
            </div>
          </div>
          <div className="Yorder">
            <table>
              <tbody>
                <tr>
                  <th colSpan={2}>Your order</th>
                </tr>
                <tr>
                  <td>Product Name x 2(Qty)</td>
                  <td>$88.00</td>
                </tr>
                <tr>
                  <td>Subtotal</td>
                  <td>$88.00</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>Free shipping</td>
                </tr>
              </tbody>
            </table>
            <br />
            <div>
              <input
                type="radio"
                name="dbt"
                defaultValue="dbt"
                defaultChecked
              />{" "}
              Direct Bank Transfer
            </div>
            <p>
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference. Your order will not be shipped
              until the funds have cleared in our account.
            </p>
            <div>
              <input type="radio" name="dbt" defaultValue="cd" /> Cash on
              Delivery
            </div>
            <div>
              <input type="radio" name="dbt" defaultValue="cd" /> Paypal{" "}
              <span>
                <img
                  src="https://www.logolynx.com/images/logolynx/c3/c36093ca9fb6c250f74d319550acac4d.jpeg"
                  alt=""
                  width={50}
                />
              </span>
            </div>
            <button type="button">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
