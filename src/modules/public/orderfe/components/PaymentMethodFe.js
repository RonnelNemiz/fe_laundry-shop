import { Box, FormHelperText } from "@mui/material";
import React from "react";
import Http from "../../../../services/Http";

function PaymentMethodFe(props) {
  const {
    error,
    formValues,
    setFormValues,
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
    <Box>
      <form>
        <main className="payment-main">
          <section className="schedule-section mt-5">
            <h1>Payment Method</h1>

            <div className="section-flex">
              {payment &&
                payment.values.payment_method.map((paymentItem) => (
                  <label
                    key={paymentItem.id}
                    htmlFor={paymentItem.payment_name}
                    onClick={() =>
                      handleSelectPayment(paymentItem.payment_name)
                    }
                  >
                    <article className="shipping-radio-flex">
                      <div>
                        <h2>{paymentItem.payment_name}</h2>
                      </div>
                      <div className="radio">
                        {/* <h6><b>Add</b></h6>
                      <span>₱{paymentItem.payment_price.toFixed(2)}</span> */}
                        <input
                          id={paymentItem.payment_name}
                          name="paymentMethod"
                          type="radio"
                          value={paymentItem.payment_name}
                          onChange={handleRadioChange}
                          required
                        />
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
      </form>
    </Box>
  );
}

export default PaymentMethodFe;
