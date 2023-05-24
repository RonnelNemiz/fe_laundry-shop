import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
// import BookingForm from "./BookingForm";
import PersonalDetails from "./PersonalDetails";
import LaundryDetails from "./LaundryDetails";
import OrderSummary from "./OrderSummary";

const steps = ["Choose Categories", "Choose Payment", "Confirm"];

export default function HorizontalLinearStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  //garments state
  const [garments, setGarments] = React.useState();
  const [handling, setHandling] = React.useState();

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

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            // labelProps.optional = (
            //   <Typography variant="caption">Optional</Typography>
            // );
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
          {/* <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography> */}
          <Typography variant="h5">Thank you for your order.</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>New Booking</Button>
          </Box>
        </React.Fragment>
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
            />
          )}
          {activeStep === 1 && (
            <PersonalDetails
              steps={steps}
              handleBack={handleBack}
              handleNext={handleNext}
              activeStep={activeStep}
              personalDetailsContainer={personalDetails}
              paymentMethodContainer={paymentMethod}
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
              personalDetails={personalDetails}
              paymentMethod={paymentMethod}
            />
          )}

          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {}

          {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}>
              Back
            </Button>
            {/* <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} 

          <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box> */}
        </React.Fragment>
      )}
    </Box>
  );
}
