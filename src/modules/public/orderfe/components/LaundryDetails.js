import React, { useEffect, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import { Button } from "react-bootstrap";
import BookingForm from "./BookingForm";
import Reevalidate from "ree-validate-18";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Http from "../../../../services/Http";
import { Form } from "react-bootstrap";

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

  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Http.get("/category-list").then((res) => {
      if (res.data) {
        setCategoryList(res.data.item_categories);
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

  const [expanded, setExpanded] = React.useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
      {/* <main className="payment-main mt-3">
        <section className="card">
          <div className="card-header bg-primary bg-gradient text-light">
            <h3 className="m-0">ORDER DETAILS</h3>
            {loading && <LinearProgress />}
          </div>
          <div className="card-body">
            {categoryList.map((category, index) => (
              <React.Fragment key={index}>
                <Accordion
                  expanded={expanded === `panel${index}`}
                  onChange={handleAccordionChange(`panel${index}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    className="my-0 d-flex justify-content-between"
                  >
                    <Typography
                      className="py-1 my-0 fw-bold"
                      sx={{ width: "50%" }}
                    >
                      {category.category_name}
                    </Typography>

                    <Form.Control
                      name={`itemType-${category.category_name}`}
                      onChange={handleChange}
                      id={`itemType${category.category_name}`}
                      style={{
                        lineHeight: "0",
                        padding: "0",
                        border: "0 solid transparent",
                        borderBottom: "1px solid #ccc",
                        borderRadius: "0",
                        outline: "0",
                        textAlign: "center",
                        width: "25%",
                      }}
                      type="number"
                      placeholder="Weight in Kilo?"
                      required
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    {category.item_types.map((item_type) => (
                      <div key={item_type.id}>
                        <article className="d-flex justify-content-between card my-1">
                          <div className="card-body d-flex justify-content-between align-items-center py-1">
                            <div className="d-flex align-items-center m-0">
                              <label htmlFor={`itemType${item_type.name}`}>
                                {item_type.name}
                              </label>
                            </div>
                            <Form.Control
                              name={`itemType-${item_type.name}`}
                              onChange={handleChange}
                              id={`itemType${item_type.name}`}
                              style={{
                                lineHeight: "0",
                                padding: "0",
                                border: "0 solid transparent",
                                borderBottom: "1px solid #ccc",
                                borderRadius: "0",
                                outline: "0",
                                textAlign: "center",
                                width: "25%",
                              }}
                              type="number"
                              placeholder="How many?"
                              required
                            />
                          </div>
                        </article>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </React.Fragment>
            ))}
          </div>
        </section>
      </main> */}

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
