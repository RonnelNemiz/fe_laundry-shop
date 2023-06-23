import React, { useState } from "react";
// import COD from "../../../../assets/images/codIcon.svg";
// import Gcash from "../../../../assets/images/gcashIcon.svg";
import { Box } from "@mui/material";
import { Button, Form } from "react-bootstrap";
import Reevalidate from "ree-validate-18";
import PaymentMethodFeP from "./PaymentMethodFeP";

const validator = new Reevalidate.Validator({
  firstname: "required",
  lastname: "required",
  purok: "required",
  brgy: "required",
  municipality: "required",
  phone: "required|numeric|regex:^09[0-9]{9}$",
  landmark: "required",
  email: "required",
});

function PersonalDetailsP(props) {
  const {
    steps,
    handleBack,
    handleNext,
    activeStep,
    paymentMethodContainer,
    personalDetailsContainer,
    setPaymentMethodContainer,
    setPersonalDetailsContainer,
  } = props;

  const [personalDetails, setPersonnalDetails] = useState({
    values: {
      firstname: "",
      lastname: "",
      purok: "",
      brgy: "",
      municipality: "",
      phone: "",
      landmark: "",
      email: "",
    },
    errors: validator.errors,
  });

  const [paymentMethod, setPaymentMethod] = React.useState({
    values: {
      id: "",
      paymentMethod: "",
    },
  });

  React.useEffect(() => {
    if (personalDetailsContainer) {
      setPersonnalDetails((prev) => ({
        ...prev,
        values: {
          ...personalDetailsContainer,
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
  }, []);

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
      }
    });
  };

  return (
    <Box>
      <main className="mt-3">
        <section className="card">
          <div className="card-header bg-primary bg-gradient-primary text-light">
            <h3>CHECKOUT</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <Form.Control
                    errors={personalDetails.errors}
                    type="text"
                    name="firstname"
                    className="form-control"
                    placeholder="Enter your first name"
                    value={personalDetails.values.firstname}
                    onChange={handleChange}
                  ></Form.Control>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <Form.Control
                    errors={personalDetails.errors}
                    type="text"
                    name="lastname"
                    className="form-control"
                    placeholder="Enter your last name"
                    value={personalDetails.values.lastname}
                    onChange={handleChange}
                  ></Form.Control>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <Form.Control
                    errors={personalDetails.errors}
                    type="text"
                    name="purok"
                    className="form-control"
                    placeholder="e.g, Proper"
                    value={personalDetails.values.purok}
                    onChange={handleChange}
                  ></Form.Control>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <Form.Control
                    errors={personalDetails.errors}
                    type="text"
                    name="brgy"
                    className="form-control"
                    placeholder="e.g, Sta. Margarita"
                    value={personalDetails.values.brgy}
                    onChange={handleChange}
                  ></Form.Control>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <Form.Control
                    errors={personalDetails.errors}
                    type="text"
                    name="municipality"
                    className="form-control"
                    placeholder="e.g, Hilongos"
                    value={personalDetails.values.municipality}
                    onChange={handleChange}
                  ></Form.Control>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <Form.Control
                    errors={personalDetails.errors}
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    value={personalDetails.values.phone}
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
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <Form.Control
                    errors={personalDetails.errors}
                    type="text"
                    name="landmark"
                    className="form-control"
                    placeholder="Landmark"
                    value={personalDetails.values.landmark}
                    onChange={handleChange}
                  ></Form.Control>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <Form.Control
                    errors={personalDetails.errors}
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={personalDetails.values.email}
                    onChange={handleChange}
                  ></Form.Control>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Box>
        <PaymentMethodFeP
          error={paymentMethod.errors}
          setFormValues={setPaymentMethod}
          formValues={paymentMethod.values}
          handleRadioChange={handleRadioChange}
          handleSelectPayment={handleSelectPayment}
        />
      </Box>

      <Box className="d-flex justify-content-between mt-2">
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          style={{ padding: "5px 30px" }}
        >
          Back
        </Button>
        <Button onClick={handleNextStep} style={{ padding: "5px 30px" }}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}

export default PersonalDetailsP;
