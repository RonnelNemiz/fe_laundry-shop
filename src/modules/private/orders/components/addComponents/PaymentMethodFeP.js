import { FormHelperText } from "@mui/material";
import React from "react";
import Http from "../../../../../services/Http";

function PaymentMethodFeP(props) {
  const {
    error,
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
    Http.get("/show/payments",{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
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
    
        <main className="payment-main" style={{width: "90%"}}>
          <section className="schedule-section mt-4">
            <h1 className="service-h1-style">PAYMENT METHOD</h1>
            <div className="section-flex service-style">
              {payment &&
                payment.values.payment_method.map((paymentItem) => (
                  <label
                  style={{ paddingBottom: "5%" }}
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
     
   
  );
}

export default PaymentMethodFeP;
