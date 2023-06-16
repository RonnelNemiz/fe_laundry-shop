import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Gcash from "../../../../../assets/images/gcashIcon.svg";
import COD from "../../../../../assets/images/COD.png"
import COP from "../../../../../assets/images/COP.png"
import "../../order.css";

const steps = [
  {
    label: "GCASH",
    description: `Name: Anabella P. Flores`,
    additionalDescription: `Mobile Number: 09773640422`,
  },
  {
    label: "COD",
    description: `Please prepare the exact amount upon delivery.`,
  },
  {
    label: "COP",
    description: `Please pay directly to our shop.`,
  },
];

export default function PersonPayP() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              // optional={
              //   index === 2 ? (
              //     <Typography variant="caption">Last step</Typography>
              //   ) : null
              // }
            >
              {index === 0 && (
                <img src={Gcash} alt="GCash" className="GcashStyle" />
              )}
              {index === 1 && (
                <img src={COD} alt="GCash" className="GcashStyle" />
              )}
              {index === 2 && (
                <img src={COP} alt="GCash" className="GcashStyle" />
              )}
              {step.label}
            </StepLabel>

            <StepContent>
              <Typography>{step.description}</Typography>
              {index === 0 && (
                <Typography>{step.additionalDescription}</Typography>
              )}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                    
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
                
              </Box>
            </StepContent>
          </Step>
        ))}
        
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography> Thank you.</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
