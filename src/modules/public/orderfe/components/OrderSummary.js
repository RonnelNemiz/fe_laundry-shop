import { Box, Typography } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import Http from "../../../../services/Http";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";


function OrderSummary(props) {
  const {
    steps,
    handleBack,
    handleNext,
    activeStep,
    garments,
    handling,
    service,
    paymentMethod,
    personal,
  } = props;

  const history = useHistory();
  console.log(personal)
  const handleSubmit = () => {
    Http.post("/new/orders", {
      body: {
        garments: garments,
        personal_details: personal,
        payment_method: paymentMethod,
        handling: handling,
        service: service,
      },
    })
      .then((res) => {
        if (res.data.status === 200) {
          swal("success", "Yehey!!!", "success");
          history.push("/");
        }
      })
      .catch((err) => {
        swal("error", err.message, "error");
      });
  };

  return (
    <div>
       <Box>
        <Typography>Service</Typography>
        <Typography>{service.service}</Typography>
      </Box>
      <Box>
        <Typography>Handling</Typography>
        <Typography>{handling.handling}</Typography>
      </Box>
      <Box>
        <Typography>Payment Method</Typography>
        <Typography>{paymentMethod.handling}</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>

        <Button
          onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </div>
  );
}

export default OrderSummary;
