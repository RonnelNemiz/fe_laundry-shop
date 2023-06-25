import React, { useState, useEffect, useReducer } from "react";
import Gcash from "../../../../assets/images/gcashIcon.svg";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import Http from "../../../../services/Http";
const boxStyle = {
  display: "flex",
};
const semiTitle = {
  marginRight: 2,
  width: "25%",
};

export default function PersonToPay() {
  const [expanded, setExpanded] = React.useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setIsLoading(true);
    Http.get("/payment-methods", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        console.log("Payment Methods: ", res.data);
        setPaymentMethods(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [ignored]);

  const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;

  return (
    <div>
      {paymentMethods.map((paymentMethod, index) => {
        return (
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            key={index}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Pay with {paymentMethod.name}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                <img
                  src={`${baseURL}${paymentMethod.logo}`}
                  alt={paymentMethod.name}
                />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={boxStyle}>
                <Typography sx={semiTitle}>
                  <b>Name:</b>
                  <br />
                  <b>Phone Number:</b>
                </Typography>
                <Typography>
                  {paymentMethod.recipient}
                  <br />
                  {paymentMethod.number}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
