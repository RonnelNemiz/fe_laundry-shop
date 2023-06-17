import { FormHelperText } from "@mui/material";
import React from "react";
import Http from "../../../../../services/Http";

function PaymentMethodFeP(props) {
  const { error, handleRadioChange, handleSelectPayment } = props;

  const [payment, setpayment] = React.useState({
    values: {
      payment_method: [],
    },
  });

  React.useEffect(() => {
    fetchpayments();
  }, []);

  const fetchpayments = () => {
    Http.get("/show/payments")
      .then((res) => {
        setpayment({
          values: {
            payment_method: res.data,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="mt-2">
      <section className="card">
        <div className="card-header bg-primary bg-gradient-primary text-light">
          <h3>PAYMENT METHODS</h3>
        </div>
        <div className="card-body d-flex flex-column">
          {payment &&
            payment.values.payment_method.map((paymentItem) => (
              <label
                key={paymentItem.id}
                htmlFor={paymentItem.payment_name}
                onClick={() => handleSelectPayment(paymentItem.payment_name)}
              >
                <article className="d-flex flex-column card-header">
                  <div className="d-flex">
                    <input
                      id={paymentItem.payment_name}
                      style={{ marginRight: "15px" }}
                      name="paymentMethod"
                      type="radio"
                      value={paymentItem.payment_name}
                      onChange={handleRadioChange}
                      required
                    />
                    <p className="m-0">{paymentItem.payment_name}</p>
                  </div>
                </article>
              </label>
            ))}
        </div>
        {error && (
          <FormHelperText error>
            {error.items[0] && error.items[0].msg}
          </FormHelperText>
        )}
      </section>
    </main>
  );
}

export default PaymentMethodFeP;
