import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import Http from "../../../../services/Http";
import swal from "sweetalert";
import PersonToPay from "./PersonToPay";
import { isAuth } from "../../../../utils/helpers";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const boxStyle = {
  display: "flex",
};
const semiTitle = {
  marginRight: 2,
  width: "25%",
};

function OrderSummary(props) {
  const history = useHistory();
  const {
    steps,
    handleBack,
    handleNext,
    activeStep,
    handling,
    service,
    paymentMethod,
    personal,
  } = props;

  const handleSubmit = () => {
    if (isAuth()) {
      Http.post(
        "/new/orders",
        {
          body: {
            personal_details: personal,
            payment_method: paymentMethod,
            handling: handling,
            service: service,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            ContentType: "application/json",
          },
        }
      )
        .then((res) => {
          console.log("New Order Response: ", res);

          if (res.data.status === 200) {
            const notify = () => toast("Thank You for your order!");
            notify();
            swal("success", "Thank You for your order!!!", "success");
            localStorage.removeItem("handling");
            localStorage.removeItem("service");
            localStorage.removeItem("personal_details");
            localStorage.removeItem("payment_method");
          } else {
            toast("Error: There is a problem with your order! Try again.");
          }
        })
        .catch((err) => {
          swal("error", err.message, "error");
        });
    } else {
      localStorage.setItem("personal_details", JSON.stringify(personal));
      localStorage.setItem("payment_method", JSON.stringify(paymentMethod));
      localStorage.setItem("handling", JSON.stringify(handling));
      localStorage.setItem("service", JSON.stringify(service));
      history.push("/login");
    }
  };
  // Helper function to generate the order summary
  // const generateOrderSummary = () => {
  //   if (!garments) {
  //     return { __html: "" };
  //   }
  //   const garmentKeys = Object.keys(garments);
  //   const categories = {};

  //   garmentKeys.forEach((key) => {
  //     const [category, garment] = key.split("_"); // Extract category and garment from the key
  //     if (garments[key] !== "") {
  //       if (!categories.hasOwnProperty(category)) {
  //         categories[category] = {};
  //       }
  //       categories[category][garment] = garments[key];
  //     }
  //   });

  //   const summary = Object.entries(categories)
  //     .map(([category, garments]) => {
  //       const garmentSummary = Object.entries(garments)
  //         .map(([garment, quantity]) => `${garment}: ${quantity}`)
  //         .join(", ");
  //       const categoryLine = `<span style="color: #0d6efd;"><b>${category}:</b></span>`; // Make the category name bold and blue
  //       return `${categoryLine}<br/>${garmentSummary}`; // Line break after each category
  //     })
  //     .join("<br/>"); // Double line break between categories

  //   return { __html: summary };
  // };

  return (
    <>
      <Box className="payment-main card mt-4">
        <div className="card-header bg-primary bg-gradient text-light">
          <h3 className="m-0">Order Summary</h3>
        </div>
        <div className="card-body">
          <Box>
            <Box sx={boxStyle}>
              <Typography sx={semiTitle}>
                <b>Name:</b>
              </Typography>
              <Typography>
                {personal.first_name} {personal.last_name}
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
              <Typography>{personal.land_mark}</Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={semiTitle}>
                <b>Contact Number:</b>
              </Typography>
              <Typography>{personal.contact_number}</Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={semiTitle}>
                <b>Email:</b>
              </Typography>
              <Typography>{personal.email}</Typography>
            </Box>
            <Divider />
            <Box sx={boxStyle} className={"mt-3"}>
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
        </div>
      </Box>
      <Box className="card mt-4">
        <div className="card-header bg-primary bg-gradient text-light">
          <h3 className="m-0">Ways to Pay</h3>
        </div>
        <div className="card-body">
          <PersonToPay />
        </div>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 2,
          justifyContent: "space-evenly",
        }}
        className="d-flex justify-content-between"
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
          style={{ padding: "5px 50px" }}
        >
          Back
        </Button>

        <Button
          onClick={() => {
            handleNext();
            if (activeStep === steps.length - 1) {
              handleSubmit();
            }
          }}
          style={{ padding: "5px 50px" }}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </>
  );
}

export default OrderSummary;
