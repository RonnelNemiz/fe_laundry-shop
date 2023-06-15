import React from "react";
import Box from "@mui/material/Box";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import PersonalDetailsP from "./PersonalDetailsP";
import LaundryDetailsP from "./LaundryDetailsP";
import OrderSummaryP from "./OrderSummaryP";

const steps = ["Choose Categories", "Choose Payment", "Confirm"];

export default function HorizontalLinearStepperP(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  //garments state
  const [garments, setGarments] = React.useState();
  const [handling, setHandling] = React.useState();
  const [service, setService] = React.useState();

  // personal details state
  const [personalDetails, setPersonalDetails] = React.useState();
  const [paymentMethod, setPaymentMethod] = React.useState();

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
    <Box sx={{display:"flex", justifyContent:"center",}}>
    <Box sx={{ width: "80%", mt:4 }}>
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
        <React.Fragment>
          <Typography variant="h5">Thank you for your order.</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>New Booking</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <LaundryDetailsP
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
            <PersonalDetailsP
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
            <OrderSummaryP
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
