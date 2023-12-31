import React, { useEffect, useState } from "react";
import ColoredGarmentsP from "./ColoredGarmentsP";
import ColoredBedShTowelP from "./ColoredBedShTowelP";
import WhiteBedShTowelP from "./WhiteBedShTowelP";
import WhiteGarmentsP from "./WhiteGarmentsP";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
// import BookingFormP from "./BookingFormP";
import Reevalidate from "ree-validate-18";

const validator = new Reevalidate.Validator({
  handling: "required",
  service: "required",
});

function LaundryDetailsP(props) {
  const {
    steps,
    handleBack,
    handleNext,
    activeStep,
    garmentsContainer,
    setGarmentsContainer,
    handlingContainer,
    setHandlingContainer,
    serviceContainer,
    setServiceContainer,
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
      id: "",
      handling: "",
      // service: "",
    },
    errors: validator.errors,
  });

  const [servformValues, setServFormValues] = React.useState({
    values: {
      service: "",
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
    if (serviceContainer) {
      setServFormValues((prev) => ({
        ...prev,
        values: {
          ...serviceContainer,
        },
      }));
    }
  }, []);

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

    setGarments((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));
  };

  const handleNextStep = () => {
    validator
      .validateAll(formValues.values, servformValues.values)
      .then((success) => {
        if (success) {
          setGarmentsContainer(garments.values);
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

  const pages = [
    {
      title: "ColoredBedShTowel",
      content: (
        <ColoredBedShTowelP garments={garments} handleChange={handleChange} />
      ),
    },
    {
      title: "ColoredGarments ",
      content: (
        <ColoredGarmentsP garments={garments} handleChange={handleChange} />
      ),
    },
    {
      title: "WhiteBedShTowel",
      content: (
        <WhiteBedShTowelP garments={garments} handleChange={handleChange} />
      ),
    },
    {
      title: "WhiteGarments",
      content: (
        <WhiteGarmentsP garments={garments} handleChange={handleChange} />
      ),
    },
  ];
  const handleSelect = (event) => {
    setSelectedPage(Number(event.target.value));
  };

  return (
    <div>
      <main className="mt-2">
        <section className="card">
          <div className="card-body">
            <p>Select categories:</p>

            <select
              onChange={handleSelect}
              className="col-md-6 btn btn-secondary dropdown-toggle"
            >
              {pages.map((page, index) => (
                <option key={index} value={index} style={{ textAlign: "left" }}>
                  {page.title}
                </option>
              ))}
            </select>
            {pages[selectedPage].content}
          </div>
        </section>
      </main>
    </div>
  );
}

export default LaundryDetailsP;
