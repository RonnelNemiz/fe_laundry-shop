import React, { useEffect, useState } from "react";
import ColoredGarments from "./ColoredGarments";
import ColoredBedShTowel from "./ColoredBedShTowel";
import WhiteBedShTowel from "./WhiteBedShTowel";
import WhiteGarments from "./WhiteGarments";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import BookingForm from "./BookingForm";
import Reevalidate from "ree-validate-18";

const validator = new Reevalidate.Validator({
  handling: "required",
});

function LaundryDetails(props) {
  const {
    steps,
    handleBack,
    handleNext,
    activeStep,
    garmentsContainer,
    setGarmentsContainer,
    handlingContainer,
    setHandlingContainer,
  } = props;

  const [selectedPage, setSelectedPage] = useState(0);
  const [garments, setGarments] = useState({
    values: {
      colorbdst_bedsheet: "",
      colorbdst_towel: "",
      colorbdst_curtain: "",
      colorbdst_blanket: "",
      colorbdst_pillowcase: "",

      colorgart_tshirt: "",
      colorgart_underwear: "",
      colorgart_shorts: "",
      colorgart_pants: "",
      colorgart_jacket: "",
      colorgart_blouse: "",
      colorgart_socks: "",
      colorgart_handkerchief: "",

      whitebdst_bedsheet: "",
      whitebdst_towel: "",
      whitebdst_curtain: "",
      whitebdst_blanket: "",
      whitebdst_pillowcase: "",

      whitegart_tshirt: "",
      whitegart_underwear: "",
      whitegart_shorts: "",
      whitegart_pants: "",
      whitegart_jacket: "",
      whitegart_blouse: "",
      whitegart_socks: "",
      whitegart_handkerchief: "",
    },
  });

  const [formValues, setFormValues] = React.useState({
    values: {
      handling: "",
    },
    errors: validator.errors,
  });

  useEffect(() => {
    if (garmentsContainer) {
      setGarments((prev) => ({
        ...prev,
        values: {
          ...garmentsContainer,
        },
      }));
    }
    if (handlingContainer) {
      setFormValues((prev) => ({
        ...prev,
        values: {
          ...handlingContainer,
        },
      }));
    }
  }, []);

  const handleSelectHandling = (value, price) => {
    setFormValues({
      values: {
        handling: value,
        price: price,
      },
    });
  };

  const handleRadioChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormValues((prev) => ({
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
      }
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setGarments((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));
  };

  const handleNextStep = () => {
    validator.validateAll(formValues.values).then((success) => {
      if (success) {
        setGarmentsContainer(garments.values);
        setHandlingContainer(formValues.values);
        handleNext();
      } else {
        setFormValues((prev) => ({
          ...prev,
          errors: validator.errors,
        }));
      }
    });
  };

  const pages = [
    {
      title: "ColoredBedShTowel",
      content: (
        <ColoredBedShTowel garments={garments} handleChange={handleChange} />
      ),
    },
    {
      title: "ColoredGarTowel ",
      content: (
        <ColoredGarments garments={garments} handleChange={handleChange} />
      ),
    },
    {
      title: "WhiteBedShTowel",
      content: (
        <WhiteBedShTowel garments={garments} handleChange={handleChange} />
      ),
    },
    {
      title: "WhiteGarTowel",
      content: (
        <WhiteGarments garments={garments} handleChange={handleChange} />
      ),
    },
  ];
  const handleSelect = (event) => {
    setSelectedPage(Number(event.target.value));
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
        />
      </Box>
      <main className="payment-main">
        <section className="customize-section">
          <h1>ORDER DETAILS</h1>
          <p>Select categories:</p>

          <select
            onChange={handleSelect}
            className="col-md-4 btn btn-secondary dropdown-toggle"
          >
            {pages.map((page, index) => (
              <option key={index} value={index}>
                {page.title}
              </option>
            ))}
          </select>
          {pages[selectedPage].content}
        </section>
      </main>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        {/* <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

        <Button onClick={handleNextStep}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </div>
  );
}

export default LaundryDetails;
