import { Box, FormHelperText } from "@mui/material";
import React from "react";
import Http from "../../../../services/Http";

function BookingForm(props) {
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
        <main className="payment-main">
          <section className="card mt-3">
            <div className="card-header bg-primary bg-gradient text-light">
              <h3 className="service-h1-style m-0">SERVICES</h3>
            </div>
            <div className="card-body d-flex">
              {services &&
                services.map((serviceItem) => (
                  <label
                    key={serviceItem.id}
                    htmlFor={serviceItem.service_name}
                    onClick={() =>
                      handleSelectService(serviceItem.name, serviceItem.id)
                    }
                    style={{ width: "50%" }}
                  >
                    <div className="card-header d-flex">
                      <div className="radio d-flex">
                        <input
                          id={serviceItem.id}
                          name={`service-${serviceItem.id}`}
                          type="radio"
                          style={{ marginRight: "15px" }}
                          value={serviceItem.id}
                          checked={
                            servformValues.values.service === serviceItem.name
                          }
                          onChange={handleRadioChange}
                          required
                        />
                        <p className="m-0">{serviceItem.name}</p>
                      </div>
                    </div>
                  </label>
                ))}
            </div>

            {errorServ && (
              <FormHelperText
                error
                className={
                  error.items[0] ? "px-3 alert alert-danger py-2 mx-3 my-1" : ""
                }
              >
                {errorServ.items[0] && errorServ.items[0].msg}
              </FormHelperText>
            )}
          </section>

          <section className="card mt-3">
            <div className="card-header bg-primary bg-gradient text-light">
              <h3 className="service-h1-style m-0">HANDLING</h3>
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
                    <article className="card-header d-flex justify-content-between">
                      <p className="m-0">{handlingItem.name}</p>
                      <div className="radio">
                        <input
                          id={handlingItem.name}
                          name="handling"
                          type="radio"
                          style={{ marginRight: "15px" }}
                          value={handlingItem.name}
                          checked={
                            formValues.values.handling === handlingItem.name
                          }
                          onChange={handleRadioChange}
                          required
                        />
                        <span>
                          ₱{parseFloat(handlingItem.price).toFixed(2)}
                        </span>
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
      </form>
    </Box>
  );
}

export default BookingForm;
