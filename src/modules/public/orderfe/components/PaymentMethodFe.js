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
                    htmlFor={paymentItem.payment_name}
                    onClick={() =>
                      handleSelectPayment(paymentItem.payment_name)
                    }
                  >
                    <article>
                      <div className="radio d-flex align-items-center card-header">
                        <input
                          id={paymentItem.payment_name}
                          name="paymentMethod"
                          type="radio"
                          value={paymentItem.payment_name}
                          onChange={handleRadioChange}
                          style={{ marginRight:"15px"}}
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

export default PaymentMethodFe;