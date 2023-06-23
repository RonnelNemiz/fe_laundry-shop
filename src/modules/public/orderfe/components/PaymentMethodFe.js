import { FormHelperText } from "@mui/material";
import React from "react";
import Http from "../../../../services/Http";

function PaymentMethodFe(props) {
  const {
    error,
    // formValues,
    // setFormValues,
    handleRadioChange,
    handleSelectPayment,
  } = props;

  const [payment, setpayment] = React.useState({
    values: {
      payment_method: [],
    },
  });

  React.useEffect(() => {
    fetchpayments();
    const defaultPayment = JSON.parse(localStorage.getItem("paymentMethod"));
    if (defaultPayment) {
      setpayment((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          ...defaultPayment.values,
        },
      }));
    }
  }, [setpayment]);

  const fetchpayments = () => {
    Http.get("payment-methods")
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
  // const defaultPayment = JSON.parse(localStorage.getItem("payment_method"));
  // console.log(defaultPayment);
  return (
    <main className="payment-main card mt-3">
      <section className="schedule-section">
        <div className="card-header bg-primary bg-gradient text-light">
          <h3>PAYMENT METHOD</h3>
        </div>
        <div className="card-body d-flex flex-column">
          {payment &&
            payment.values.payment_method.map((paymentItem) => (
              <label
                key={paymentItem.id}
                htmlFor={paymentItem.name}
                onClick={() =>
                  handleSelectPayment(paymentItem.name, paymentItem.id)
                }
              >
                <article>
                  <div className="radio d-flex align-items-center card-header">
                    <input
                      id={paymentItem.name}
                      name="paymentMethod"
                      type="radio"
                      value={paymentItem.name}
                      onChange={handleRadioChange}
                      style={{ marginRight: "15px" }}
                      required
                    />
                    <p className="m-0">Pay with {paymentItem.name}</p>
                  </div>
                </article>
              </label>
            ))}
        </div>
        {error && (
          <FormHelperText
            error
            className={
              error.items[0] ? "px-3 alert alert-danger py-2 mx-3 my-1" : ""
            }
          >
            {error.items[0] && error.items[0].msg}
          </FormHelperText>
        )}
      </section>
    </main>
  );
}

export default PaymentMethodFe;
