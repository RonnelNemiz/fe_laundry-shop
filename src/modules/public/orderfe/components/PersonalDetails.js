import React, { useState } from "react";
import "../order.css";
// import COD from "../../../../assets/images/codIcon.svg";
// import Gcash from "../../../../assets/images/gcashIcon.svg";
import { Box } from "@mui/material";
import { Button, Form } from "react-bootstrap";
import Reevalidate from "ree-validate-18";
import PaymentMethodFe from "./PaymentMethodFe";
import Http from "../../../../services/Http";

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
      first_name: "",
      last_name: "",
      purok: "",
      brgy: "",
      municipality: "",
      contact_number: "",
      land_mark: "",
      email: "",
    },
    errors: validator.errors,
  });

  const [paymentMethod, setPaymentMethod] = React.useState({
    values: {
      paymentMethod: "",
    },
  });

  React.useEffect(() => {
    console.log(personal);
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
    Http.get("customer",{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
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
        } else {
          console.warn(res.data.messages);
        }
      })
      .catch((err) => {
        console.warn(err.message);
      });
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

  const handleSelectPayment = (value) => {
    setPaymentMethod({
      values: {
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
      <main className="main-checkout">
        <section className="checkout-section">
          <h1>CHECKOUT</h1>
          <h5 className="personal" style={{ marginBottom: "1.5rem", color:" #0d6efd" }}>
            Personal Details:
          </h5>
          <div className="row">
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>First Name</label>
                <Form.Control
                  errors={personalDetails.errors}
                  type="text"
                  name="first_name"
                  className="form-control"
                  placeholder="Enter your first name"
                  value={personalDetails.values.first_name}
                  onChange={handleChange}
                ></Form.Control>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>Last Name</label>
                <Form.Control
                  errors={personalDetails.errors}
                  type="text"
                  name="last_name"
                  className="form-control"
                  placeholder="Enter your last name"
                  value={personalDetails.values.last_name}
                  onChange={handleChange}
                ></Form.Control>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>Purok</label>
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
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>Brgy</label>
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
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>Municipality</label>
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
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>Phone</label>
                <Form.Control
                  errors={personalDetails.errors}
                  name="contact_number"
                  className="form-control"
                  placeholder="Phone"
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
                <label>Landmark</label>
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
                <label>Email</label>
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
        </section>
      </main>
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
        className="button-back-next-public"
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Button onClick={handleNextStep} style={{ marginLeft: "90%" }}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}

export default PersonalDetails;
