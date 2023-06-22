import React from "react";
import Box from "@mui/material/Box";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import PersonalDetails from "./PersonalDetails";
import LaundryDetails from "./LaundryDetails";
import OrderSummary from "./OrderSummary";

const steps = ["Choose Categories", "Choose Payment", "Confirm"];

export default function HorizontalLinearStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  //garments state
  const [garments, setGarments] = React.useState(
    JSON.parse(localStorage.getItem("garment"))
  );
  const [handling, setHandling] = React.useState(
    JSON.parse(localStorage.getItem("handling"))
  );
  const [service, setService] = React.useState(
    JSON.parse(localStorage.getItem("service"))
  );

  // personal details state
  const [personalDetails, setPersonalDetails] = React.useState();
  const [paymentMethod, setPaymentMethod] = React.useState(
    JSON.parse(localStorage.getItem("paymentMethod"))
  );

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "80%", mt: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <div className="card " style={{ marginTop: "5%" }}>
            <React.Fragment>
              <div
                className="card-body"
                style={{ paddingTop: "10%", paddingBottom: "10%" }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "center",
                    paddingBottom: "5%",
                    fontFamily: "Dancing Script, cursive",
                  }}
                >
                  Thank you for your order.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box />
                  <Button onClick={handleReset} variant="contained">
                    New Booking
                  </Button>
                </Box>
              </div>
            </React.Fragment>
          </div>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <LaundryDetails
                steps={steps}
                handleBack={handleBack}
                handleNext={handleNext}
                activeStep={activeStep}
                garmentsContainer={garments}
                setGarmentsContainer={setGarments}
                handlingContainer={handling}
                setHandlingContainer={setHandling}
                serviceContainer={service}
                setServiceContainer={setService}
              />
            )}
            {activeStep === 1 && (
              <PersonalDetails
                steps={steps}
                handleBack={handleBack}
                handleNext={handleNext}
                activeStep={activeStep}
                paymentMethodContainer={paymentMethod}
                personal={personalDetails}
                setPersonalDetailsContainer={setPersonalDetails}
                setPaymentMethodContainer={setPaymentMethod}
              />
            )}
            {activeStep === 2 && (
              <OrderSummary
                steps={steps}
                handleBack={handleBack}
                handleNext={handleNext}
                activeStep={activeStep}
                garments={garments}
                handling={handling}
                service={service}
                personal={personalDetails}
                paymentMethod={paymentMethod}
              />
            )}
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}
