import React, { useEffect, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import { Button } from "react-bootstrap";
import BookingForm from "./BookingForm";
import Reevalidate from "ree-validate-18";
import Http from "../../../../services/Http";

const validator = new Reevalidate.Validator({
  handling: "required",
  service: "required",
});

function LaundryDetails(props) {
  const {
    steps,
    handleBack,
    handleNext,
    activeStep,
    setHandlingContainer,
    setServiceContainer,
  } = props;

  const [formValues, setFormValues] = React.useState({
    values: {
      id: "",
      handling: "",
    },
    errors: validator.errors,
  });

  const [servformValues, setServFormValues] = React.useState({
    values: {
      // service: "",
    },
    errors: validator.errors,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Http.get("/category-list").then((res) => {
      if (res.data) {
        // setCategoryList(res.data.item_categories);
        setLoading(false);
      }
    });
  }, []);

  const handleSelectHandling = (value, id) => {
    setFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: id,
        handling: value,
      },
    }));
  };

  const handleRadioChange = (event) => {
    const name = event.target.name; //service-1
    const value = event.target.value; // 1

    setFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));

    setServFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));

    const { errors } = validator;

    validator.validate(name, value).then((success) => {
      if (!success) {
        setFormValues((prev) => ({
          ...prev,
          errors: errors,
        }));
        setServFormValues((prev) => ({
          ...prev,
          errors: errors,
        }));
      }
    });
  };

  const handleSelectService = (value, id) => {
    setServFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: id,
        service: value,
      },
    }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
  };

  const handleNextStep = () => {
    validator
      .validateAll(formValues.values, servformValues.values)
      .then((success) => {
        if (success) {
          setHandlingContainer(formValues.values);
          setServiceContainer(servformValues.values);
          handleNext();
        } else {
          setFormValues((prev) => ({
            ...prev,
            errors: validator.errors,
          }));
          setServFormValues((prev) => ({
            ...prev,
            errors: validator.errors, // or set the specific error for servformValues
          }));
        }
      });
  };

  return (
    <div>
      <Box>
        <BookingForm
          error={formValues.errors}
          setFormValues={setFormValues}
          formValues={formValues}
          handleRadioChange={handleRadioChange}
          handleSelectHandling={handleSelectHandling}
          handleSelectService={handleSelectService}
          errorServ={servformValues.errors}
          setServFormValues={setServFormValues}
          servformValues={servformValues}
        />
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
          style={{ padding: "5px 50px" }}
        >
          Back
        </Button>

        <Button onClick={handleNextStep} style={{ padding: "5px 50px" }}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </div>
  );
}

export default LaundryDetails;
