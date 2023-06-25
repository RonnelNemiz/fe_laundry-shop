import React from "react";
import Gcash from "../../../../assets/images/gcashIcon.svg";
import COD from "../../../../assets/images/COD.png";
import COP from "../../../../assets/images/COP.png";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
const boxStyle = {
  display: "flex",
};
const semiTitle = {
  marginRight: 2,
  width: "25%",
};

export default function PersonToPay() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Pay with GCash
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            <img src={Gcash} />
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
              Anabella Flores
              <br />
              09773640422
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header">
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            className="d-flex align-items-center">
            Pay via COD (Cash on Delivery)
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            <img src={COD} style={{ width: "20%" }} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <b>Please prepare an exact amount upon delivery.</b>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          className="d-flex align-items-center">
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            className="d-flex align-items-center">
            Pay via COP (Cash on Pick-up)
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            <img src={COP} style={{ width: "20%" }} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <b>Please pay directly to our store.</b>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
