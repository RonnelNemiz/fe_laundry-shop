import { Box, Typography } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import Http from "../../../../../services/Http"
import PersonPayP from "./PersonPayP";
// import PersonToPayP from "./PersonToPayP";
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
    Http.post("/new/admin/orders", {
      body: {
        garments: garments,
        personal_details: personal,
        payment_method: paymentMethod,
        handling: handling,
        service: service,
      },
    },{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
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
      <Box className="card mt-2">
        <div className="card-header bg-primary bg-gradient-primary text-light">
          <h3>Order Details</h3>
        </div>
        <Box className="card-body">
          <div className="row">
            <div className="col-md-4 col-12">
              Name:
            </div>
            <div className="col-md-8 col-12">
              <strong>{personal.firstname} {personal.lastname}</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-12">
              Address:
            </div>
            <div className="col-md-8 col-12">
              <strong>{personal.purok} {personal.brgy} {personal.municipality}, Leyte</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-12">
              Landmark:
            </div>
            <div className="col-md-8 col-12">
              <strong>{personal.landmark}</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-12">
              Contact Number:
            </div>
            <div className="col-md-8 col-12">
              <strong>{personal.phone}</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-12">
              Email:
            </div>
            <div className="col-md-8 col-12">
              <strong>{personal.email}</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-12">
              Categories:
            </div>
            <div className="col-md-8 col-12">
              <Typography dangerouslySetInnerHTML={generateOrderSummary()} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-12">
             Service:
            </div>
            <div className="col-md-8 col-12">
              <strong>{service.service}</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-12">
             Handling:
            </div>
            <div className="col-md-8 col-12">
              <strong>{handling.handling}</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-12">
             Payment Method:
            </div>
            <div className="col-md-8 col-12">
              <strong>{paymentMethod.paymentMethod}</strong>
            </div>
          </div>
        </Box>
      </Box>
        
      <Box className="card mt-2">
        <div className="card-header bg-primary bg-gradient text-light">
          <h3>Ways to Pay</h3>
        </div>
        <div className="card-body">
          <PersonPayP />
        </div>
      </Box>
      <Box className="d-flex justify-content-between mt-2">
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          style={{padding:"5px 30px"}}
        >
          Back
        </Button>

        <Button
          onClick={
            activeStep === steps.length - 1 ? handleSubmit : handleNext
          }
          style={{padding:"5px 30px"}}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </>
  );
}

export default OrderSummaryP;
