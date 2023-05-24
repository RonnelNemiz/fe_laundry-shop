import React, { useState } from "react";
import "../order.css";
// import COD from "../../../../assets/images/codIcon.svg";
// import Gcash from "../../../../assets/images/gcashIcon.svg";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import Reevalidate from "ree-validate-18";
import PaymentMethodFe from "./PaymentMethodFe";
import FormFieldData from "../../../../components/FormFieldData";

const validator = new Reevalidate.Validator({
  firstname: "required",
  lastname: "required",
  purok: "required",
  brgy: "required",
  municipality: "required",
  phone: "required|numeric|regex:^09[0-9]{9}$",
  landmark: "required",
});

function PersonalDetails(props) {
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
    },
    errors: validator.errors,
  });

  const [paymentMethod, setPaymentMethod] = React.useState({
    values: {
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

  //   const handleSelectPaymentMethod = (type) => {
  //     setPaymentMethod(type);
  //   };

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

  //   const handleNextStep = () => {
  //     localStorage.setItem('personalData', JSON.stringify(personalDetails));
  //     // localStorage.setItem('paymentMethod', paymentMethod);
  //     localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
  //     handleNext()
  //   }

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

    // const { errors } = validator;

    // validator.validate(name, value).then((success) => {
    //   if (!success) {
    //     setPaymentMethod((prev) => ({
    //       ...prev,
    //       errors: errors,
    //     }));
    //   }
    // });
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
          <h5>Personal Details:</h5>
          <div className="row">
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>First Name</label>
                <FormFieldData
                  errors={personalDetails.errors}
                  type="text"
                  name="firstname"
                  className="form-control"
                  placeholder="Enter your first name"
                  value={personalDetails.values.firstname}
                  onChange={handleChange}
                ></FormFieldData>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>Last Name</label>
                <FormFieldData
                  errors={personalDetails.errors}
                  type="text"
                  name="lastname"
                  className="form-control"
                  placeholder="Enter your last name"
                  value={personalDetails.values.lastname}
                  onChange={handleChange}
                ></FormFieldData>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>Purok</label>
                <FormFieldData
                  errors={personalDetails.errors}
                  type="text"
                  name="purok"
                  className="form-control"
                  placeholder="e.g, Proper"
                  value={personalDetails.values.purok}
                  onChange={handleChange}
                ></FormFieldData>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>Brgy</label>
                <FormFieldData
                  errors={personalDetails.errors}
                  type="text"
                  name="brgy"
                  className="form-control"
                  placeholder="e.g, Sta. Margarita"
                  value={personalDetails.values.brgy}
                  onChange={handleChange}
                ></FormFieldData>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>Municipality</label>
                <FormFieldData
                  errors={personalDetails.errors}
                  type="text"
                  name="municipality"
                  className="form-control"
                  placeholder="e.g, Hilongos"
                  value={personalDetails.values.municipality}
                  onChange={handleChange}
                ></FormFieldData>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>Phone</label>
                <FormFieldData
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
                ></FormFieldData>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>Landmark</label>
                <FormFieldData
                  errors={personalDetails.errors}
                  type="text"
                  name="landmark"
                  className="form-control"
                  placeholder="Landmark"
                  value={personalDetails.values.landmark}
                  onChange={handleChange}
                ></FormFieldData>
              </div>
            </div>
          </div>

          <Box>
            <PaymentMethodFe
              error={paymentMethod.errors}
              setFormValues={setPaymentMethod}
              formValues={paymentMethod.values}
              handleRadioChange={handleRadioChange}
              handleSelectPayment={handleSelectPayment}
            />
          </Box>
        </section>
      </main>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Button onClick={handleNextStep}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}

export default PersonalDetails;
