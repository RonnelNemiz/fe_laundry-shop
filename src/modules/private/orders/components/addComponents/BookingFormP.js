import { Box, FormHelperText } from "@mui/material";
import React from "react";
import Http from "../../../../../services/Http";

function BookingFormP(props) {
  const {
    error,
    errorServ,
    formValues,
    setFormValues,
    servformValues,
    setServFormValues,
    handleRadioChange,
    handleSelectHandling,
    handleSelectService,
  } = props;

  const [handling, setHandling] = React.useState([]);
  const [services, setServices] = React.useState([]);

  React.useEffect(() => {
    fetchHandlings();
    const savedhandling = JSON.parse(localStorage.getItem("handling"));
    if (savedhandling) {
      setFormValues((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          ...savedhandling.values,
        },
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
    const savedservices = JSON.parse(localStorage.getItem("service"));
    if (savedservices) {
      setServFormValues((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          ...savedservices.values,
        },
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

  return (
    <Box>
      <form>
        <main className="payment-main mt-3">
          <section className="card">
            <div className="card-header bg-primary bg-gradient-primary text-light">
              <h3>SERVICES</h3>
            </div>
            <div className="card-body d-flex flex-column">
              {services &&
                services.map((serviceItem) => (
                  <label
                    key={serviceItem.id}
                    htmlFor={serviceItem.service_name}
                    onClick={() =>
                      handleSelectService(
                        serviceItem.service_name,
                        serviceItem.service_price
                      )
                    }
                  >
                    <article className="d-flex justify-content-between card-header">
                      <p className="m-0">{serviceItem.service_name}</p>
                      <div className="radio">
                        <input
                          id={serviceItem.service_name}
                          name="service"
                          type="radio"
                          value={serviceItem.service_name}
                          style={{ marginRight: "15px" }}
                          checked={
                            servformValues.values.service ===
                            serviceItem.service_name
                          }
                          onChange={handleRadioChange}
                          required
                        />
                        <span>₱{serviceItem.service_price.toFixed(2)}</span>
                      </div>
                    </article>
                  </label>
                ))}
            </div>

            {errorServ && (
              <FormHelperText error>
                {errorServ.items[0] && errorServ.items[0].msg}
              </FormHelperText>
            )}
          </section>

          <section className="card mt-3">
            <div className="card-header bg-primary bg-gradient-primary text-light">
              <h3>HANDLING</h3>
            </div>
            <div className="card-body d-flex flex-column">
              {handling &&
                handling.map((handlingItem) => (
                  <label
                    key={handlingItem.id}
                    htmlFor={handlingItem.name}
                    onClick={() =>
                      handleSelectHandling(handlingItem.name, handlingItem.id)
                    }
                  >
                    <article className="d-flex justify-content-between card-header">
                      <p className="m-0">{handlingItem.name}</p>
                      <div className="radio">
                        <input
                          id={handlingItem.name}
                          name="handling"
                          type="radio"
                          value={handlingItem.name}
                          style={{ marginRight: "15px" }}
                          checked={
                            formValues.values.handling === handlingItem.name
                          }
                          onChange={handleRadioChange}
                          required
                        />
                        <span>₱{handlingItem.price.toFixed(2)}</span>
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

export default BookingFormP;
