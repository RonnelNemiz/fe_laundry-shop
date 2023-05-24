import { Box, FormHelperText } from "@mui/material";
import React from "react";
import Http from "../../../../services/Http";

function BookingForm(props) {
  const { error, formValues, setFormValues, handleRadioChange, handleSelectHandling } = props;

  const [handling, setHandling] = React.useState([]);

  React.useEffect(() => {
    fetchHandlings();
    const savedhandling = JSON.parse(localStorage.getItem('handling'));
    if (savedhandling) {
      setFormValues((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          ...savedhandling.values 
        }
      }))
    }
  }, [setFormValues]);

  const fetchHandlings = () => {
    Http.get("/show/handlings")
      .then((res) => {
        setHandling(res.data);
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
            <h1>Handling</h1>
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
              {handling && handling.map((handlingItem) => (
                <label key={handlingItem.id} htmlFor={handlingItem.handling_name} onClick={() => handleSelectHandling(handlingItem.handling_name, handlingItem.handling_price)}>
                  <article className="shipping-radio-flex">
                    <div>
                      <h2>{handlingItem.handling_name}</h2>
                    </div>
                    <div className="radio">
                      <h6><b>Add</b></h6>
                      <span>₱{handlingItem.handling_price.toFixed(2)}</span>
                      <input
                        id={handlingItem.handling_name}
                        name="handling"
                        type="radio"
                        value={handlingItem.handling_name}
                        checked={formValues.values.handling === handlingItem.handling_name}
                        onChange={handleRadioChange}
                        required
                      />
                    </div>
                  </article>
                </label>
              ))}
            </div>
            {error && <FormHelperText error>{error.items[0] && error.items[0].msg}</FormHelperText>}
          </section>
        </main>
      </form>
    </Box>
  );
}

export default BookingForm;
