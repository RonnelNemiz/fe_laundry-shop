import { Box, FormHelperText } from "@mui/material";
import React from "react";
import Http from "../../../../services/Http";

function BookingForm(props) {
  const { error, errorServ, formValues, setFormValues, servformValues, setServFormValues, handleRadioChange, handleSelectHandling, handleSelectService } = props;

  const [handling, setHandling] = React.useState([]);
  const [services, setServices] = React.useState([]);

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
      }));
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
 
  React.useEffect(() => {
    fetchServices();
    const savedservices = JSON.parse(localStorage.getItem('service'));
    if (savedservices) {
      setServFormValues((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          ...savedservices.values 
        }
      }));
    }
  }, [setServFormValues]);
  
  const fetchServices = () => {
    Http.get("/show/services")
      .then((res) => {
      setServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  console.log('services:', services);
  console.log('handling:', handling);
  
  return (
    <Box>
      <form>
        <main className="payment-main">
          <section className="schedule-section mt-5">
            <h1>Services</h1>
            <div className="section-flex">
              {services &&
                services.map((serviceItem) => (
                  <label
                    key={serviceItem.id}
                    htmlFor={serviceItem.service_name}
                    onClick={() =>
                      handleSelectService(serviceItem.service_name, serviceItem.service_price)
                    }
                  >
                    <article className="shipping-radio-flex">
                      <div>
                        <h2>{serviceItem.service_name}</h2>
                      </div>
                      <div className="radio">
                        <h6>
                          <b>Add</b>
                        </h6>
                        <span>
                        ₱{serviceItem.service_price.toFixed(2)}
                        </span>
                        <input
                          id={serviceItem.service_name}
                          name="service"
                          type="radio"
                          value={serviceItem.service_name}
                          checked={servformValues.values.service === serviceItem.service_name}
                          onChange={handleRadioChange}
                          required
                        />
                      </div>
                    </article>
                  </label>
                ))}
            </div>

            {errorServ && <FormHelperText error>{errorServ.items[0] && errorServ.items[0].msg}</FormHelperText>}
          </section>
          
          <section className="schedule-section mt-5">
            <h1>Handling</h1>
            <div className="section-flex">
              {handling &&
                handling.map((handlingItem) => (
                  <label
                    key={handlingItem.id}
                    htmlFor={handlingItem.handling_name}
                    onClick={() =>
                      handleSelectHandling(handlingItem.handling_name, handlingItem.handling_price)
                    }
                  >
                    <article className="shipping-radio-flex">
                      <div>
                        <h2>{handlingItem.handling_name}</h2>
                      </div>
                      <div className="radio">
                        <h6>
                          <b>Add</b>
                        </h6>
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
