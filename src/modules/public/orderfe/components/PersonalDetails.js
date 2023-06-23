import React, { useState } from "react";
// import COD from "../../../../assets/images/codIcon.svg";
// import Gcash from "../../../../assets/images/gcashIcon.svg";
import { Box, LinearProgress } from "@mui/material";
import { Button, Form } from "react-bootstrap";
import Reevalidate from "ree-validate-18";
import PaymentMethodFe from "./PaymentMethodFe";
import Http from "../../../../services/Http";
import { isAuth } from "../../../../utils/helpers";

const validator = new Reevalidate.Validator({
  first_name: "required",
  last_name: "required",
  purok: "required",
  brgy: "required",
  municipality: "required",
  contact_number: "required|numeric|regex:^09[0-9]{9}$",
  land_mark: "required",
  email: "required",
});

function PersonalDetails(props) {
  const {
    steps,
    handleBack,
    handleNext,
    activeStep,
    paymentMethodContainer,
    setPaymentMethodContainer,
    setPersonalDetailsContainer,
    personal,
  } = props;

  const [personalDetails, setPersonnalDetails] = useState({
    values: {
      first_name: "......",
      last_name: "......",
      purok: "......",
      brgy: "......",
      municipality: "......",
      contact_number: "09000000000",
      land_mark: "......",
      email: "......",
    },
    errors: validator.errors,
  });

  const [paymentMethod, setPaymentMethod] = React.useState({
    values: {
      id: "",
      paymentMethod: "",
    },
  });

  const [isLoading, setIsLoading] = useState();
  React.useEffect(() => {
    if (personal) {
      setPersonnalDetails((prev) => ({
        ...prev,
        values: {
          ...personal,
        },
      }));
    }
    if (paymentMethodContainer) {
      setPaymentMethod((prev) => ({
        ...prev,
        values: {
          ...paymentMethodContainer,
        },
      }));
    }
  }, [personal, paymentMethodContainer]);

  React.useEffect(() => {
    if (!personal) {
      handleFetchUser();
    }
  }, []);

  const handleFetchUser = () => {
    setIsLoading(true);
    if (isAuth()) {
      Http.get("customer", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
        .then((res) => {
          if (res.data.status === 200) {
            const user = res.data.user;
            setPersonnalDetails((prev) => ({
              ...prev,
              values: {
                ...user.profile[0],
                email: user.email,
              },
            }));
            setIsLoading(false);
          } else {
            console.warn(res.data.messages);
          }
        })
        .catch((err) => {
          console.warn(err.message);
        });
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPersonnalDetails((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));

    const { errors } = validator;

    validator.validate(name, value).then((success) => {
      if (!success) {
        setPersonnalDetails((prev) => ({
          ...prev,
          errors: errors,
        }));
      }
    });
  };

  const handleSelectPayment = (value, id) => {
    setPaymentMethod({
      values: {
        id: id,
        paymentMethod: value,
      },
    });
  };

  const handleRadioChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setPaymentMethod((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));
  };
  const [errorMessage, setErrorMessage] = useState("");
  const handleNextStep = () => {
    validator.validateAll(personalDetails.values).then((success) => {
      if (success) {
        setPersonalDetailsContainer(personalDetails.values);
        setPaymentMethodContainer(paymentMethod.values);
        handleNext();
      } else {
        setPersonnalDetails((prev) => ({
          ...prev,
          errors: validator.errors,
        }));
        setErrorMessage(validator.errors.items[0].msg);
      }
    });
  };

  return (
    <Box>
      {isAuth() && (
        <main className="main-checkout mt-4">
          <section className="card">
            <div className="card-header bg-primary bg-gradient text-light">
              <h3>CHECKOUT</h3>
            </div>
            <div className="card-body">
              {isLoading && <LinearProgress />}
              <div className="row">
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <Form.Control
                      errors={personalDetails.errors}
                      type="text"
                      name="first_name"
                      className="form-control"
                      placeholder="Enter your First Name"
                      value={personalDetails.values.first_name}
                      onChange={handleChange}
                    ></Form.Control>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <Form.Control
                      errors={personalDetails.errors}
                      type="text"
                      name="last_name"
                      className="form-control"
                      placeholder="Enter your Last Name"
                      value={personalDetails.values.last_name}
                      onChange={handleChange}
                    ></Form.Control>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <Form.Control
                      errors={personalDetails.errors}
                      type="text"
                      name="purok"
                      className="form-control"
                      placeholder="Purok (e.g, Proper)"
                      value={personalDetails.values.purok}
                      onChange={handleChange}
                    ></Form.Control>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <Form.Control
                      errors={personalDetails.errors}
                      type="text"
                      name="brgy"
                      className="form-control"
                      placeholder="Barangay (e.g, Sta. Margarita)"
                      value={personalDetails.values.brgy}
                      onChange={handleChange}
                    ></Form.Control>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <Form.Control
                      errors={personalDetails.errors}
                      type="text"
                      name="municipality"
                      className="form-control"
                      placeholder="Municipality (e.g, Hilongos)"
                      value={personalDetails.values.municipality}
                      onChange={handleChange}
                    ></Form.Control>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <Form.Control
                      errors={personalDetails.errors}
                      name="contact_number"
                      className="form-control"
                      placeholder="Phone Number"
                      value={personalDetails.values.contact_number}
                      onChange={handleChange}
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        maxLength: 11,
                      }}
                      required
                    ></Form.Control>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <Form.Control
                      errors={personalDetails.errors}
                      type="text"
                      name="landmark"
                      className="form-control"
                      placeholder="Landmark"
                      value={personalDetails.values.land_mark}
                      onChange={handleChange}
                    ></Form.Control>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <Form.Control
                      errors={personalDetails.errors}
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={personalDetails.values.email}
                      onChange={handleChange}
                    ></Form.Control>
                  </div>
                </div>
              </div>
            </div>
            {errorMessage && (
              <div className="px-3 alert alert-danger my-1 mx-3 py-1">
                {errorMessage}
              </div>
            )}
          </section>
        </main>
      )}

      <Box>
        <PaymentMethodFe
          error={paymentMethod.errors}
          setFormValues={setPaymentMethod}
          formValues={paymentMethod.values}
          handleRadioChange={handleRadioChange}
          handleSelectPayment={handleSelectPayment}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 2,
          justifyContent: "space-evenly",
        }}
        className="d-flex justify-content-between"
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          style={{ padding: "5px 50px" }}
        >
          Back
        </Button>

        <Button onClick={handleNextStep} style={{ padding: "5px 50px" }}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}

export default PersonalDetails;
