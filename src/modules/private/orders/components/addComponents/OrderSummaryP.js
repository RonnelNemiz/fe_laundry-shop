import { Box, Typography } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import Http from "../../../../../services/Http"
import PersonPayP from "./PersonPayP";
// import PersonToPayP from "./PersonToPayP";

const boxStyle = {
  display: "flex",
};
const semiTitle = {
  marginRight: 2,
};

function OrderSummaryP(props) {
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

//   console.log(personal);
  const history = useHistory();
  console.log(garments);
  const handleSubmit = () => {
    Http.post("/new/admin/orders",{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }}, {
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
          swal("success", "Successfully Added!", "success");
          history.push("/dashboard");
        }
      })
      .catch((err) => {
        swal("error", err.message, "error");
      });
  };
  // Helper function to generate the order summary
  const generateOrderSummary = () => {
    const garmentKeys = Object.keys(garments);
    const categories = {};

    garmentKeys.forEach((key) => {
      const [category, garment] = key.split("_"); // Extract category and garment from the key
      if (garments[key] !== "") {
        if (!categories.hasOwnProperty(category)) {
          categories[category] = {};
        }
        categories[category][garment] = garments[key];
      }
    });

    const summary = Object.entries(categories)
      .map(([category, garments]) => {
        const garmentSummary = Object.entries(garments)
          .map(([garment, quantity]) => `${garment}: ${quantity}`)
          .join(", ");
        const categoryLine = `<span style="color: #0d6efd;"><b>${category}:</b></span>`; // Make the category name bold and blue
        return `${categoryLine}<br/>${garmentSummary}`; // Line break after each category
      })
      .join("<br/>"); // Double line break between categories

    return { __html: summary };
  };

  return (
    <>
      <Box className="payment-main">
        <h3 style={{ textAlign: "center", marginTop: "20px" }}>
          <b>Order Summary</b>
        </h3>
        <Box>
          <Box sx={boxStyle}>
            <Typography sx={semiTitle}>
              <b>Name:</b>
            </Typography>
            <Typography>
              {personal.firstname} {personal.lastname}
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={semiTitle}>
              <b>Address:</b>
            </Typography>
            <Typography>
              {personal.purok} {personal.brgy} {personal.municipality}, Leyte
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={semiTitle}>
              <b>Landmark:</b>
            </Typography>
            <Typography>{personal.landmark}</Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={semiTitle}>
              <b>Contact Number:</b>
            </Typography>
            <Typography>{personal.phone}</Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={semiTitle}>
              <b>Email:</b>
            </Typography>
            <Typography>{personal.email}</Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={semiTitle}>
              <b>Categories:</b>
            </Typography>
            <Typography dangerouslySetInnerHTML={generateOrderSummary()} />
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={semiTitle}>
              <b>Service:</b>
            </Typography>
            <Typography>{service.service}</Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={semiTitle}>
              <b>Handling:</b>
            </Typography>
            <Typography>{handling.handling}</Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={semiTitle}>
              <b>Payment Method:</b>
            </Typography>
            <Typography>{paymentMethod.paymentMethod}</Typography>
          </Box>
        </Box>
        <Box style={{ paddingTop: "5%" }}>
          <Box>
            <Typography>
              <h5 style={{ textAlign: "center" }}>
                <br />
                <br />
                <b>Steps on how to pay:</b>
              </h5>
            </Typography>
            <PersonPayP />
          </Box> 
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "40px",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>

          <Button
            onClick={
              activeStep === steps.length - 1 ? handleSubmit : handleNext
            }
            // style={{ marginLeft: "90%" }}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default OrderSummaryP;