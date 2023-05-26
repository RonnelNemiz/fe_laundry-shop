import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
// import FormFieldData from "../../../../components/FormFieldData";
import Http from "../../../../services/Http";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

// const groupedData = (data) => {
//   if (data) {
//     return Object.entries(data.values)
//       .reduce((acc, [key, value]) => {
//         const [group, item] = key.split("_");
//         if (!acc[group]) {
//           acc[group] = {};
//         }
//         acc[group][item] = value;
//         return acc;
//       }, {});
//   }
// };

function OrderSummary(props) {
  const {
    steps,
    handleBack,
    handleNext,
    activeStep,
    garments,
    handling,
    paymentMethod,
    // personalDetails,
    personal,
  } = props;

  const history = useHistory();
  // const formData = new FormData();
  // formData.append('garments', JSON.stringify(garments.values));
  // formData.append('personalDetails', JSON.stringify(personalDetails.values));
  // formData.append('paymentMethod', JSON.stringify(paymentMethod.values));
  // formData.append('handling', JSON.stringify(handling.values));

  console.log(personal)
  const handleSubmit = () => {
    Http.post("/new/orders", {
      body: {
        garments: garments,
        personal_details: personal,
        payment_method: paymentMethod,
        handling: handling,
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
