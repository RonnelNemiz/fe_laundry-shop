import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Typography,
  Box,
  IconButton,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Form } from "react-bootstrap";
import Http from "../../../../services/Http";
import ToastNotification from "../../../../components/ToastNotification";

const options = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  draggable: true,
  draggableDirection: 60,
  theme: "colored",
};

export default function AddConsumables(props) {
  const { open, onClose, order, orderItems, consumables } = props;

  const [loading, setLoading] = React.useState(false);
  const [expanded, setExpanded] = useState(false);
  const [formValues, setFormValues] = useState([]);

  React.useEffect(() => {}, []);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Define the handleChange function
  const handleChange = (e, parentKey, childIndex) => {
    const { name, value } = e.target;

    setFormValues((prev) => {
      const updatedFormValues = { ...prev };

      if (childIndex !== null) {
        // Update child category quantity
        updatedFormValues[parentKey].children[childIndex].quantity = value;
      } else {
        // Update parent category kilo
        updatedFormValues[parentKey].kilo = value;
      }

      return updatedFormValues;
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    Http.post(`/update/categories/${order.id}`, formValues)
      .then((res) => {
        if (res.data.status === 200) {
          ToastNotification("success", res.data.message, options);
          onClose();
        } else {
          ToastNotification("error", res.data.message, options);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        ToastNotification("error", err.message, options);
      });
  };

  return (
    <div>
      <ToastNotificationContainer />
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="card-header">
          <Box className="d-flex justify-content-between align-items-center">
            <Typography>Edit Consumables</Typography>
            <IconButton color="error" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{ width: "100%", typography: "body1" }}
            className="card-body"
          >
            <main className="mt-3">
              <section className="card">
                <div className="card-header bg-primary bg-gradient text-light">
                  <h3 className="m-0">Consumables</h3>
                </div>

                <div className="card-body d-flex">
                  {consumables &&
                    consumables?.map((serviceItem) => (
                      <label
                        key={serviceItem.id}
                        htmlFor={serviceItem.service_name}
                        // onClick={() =>
                        //   handleSelectService(serviceItem.name, serviceItem.id)
                        // }
                        style={{ width: "50%" }}
                      >
                        <div className="card-header d-flex">
                          <div className="radio d-flex">
                            <input
                              id={serviceItem.id}
                              name={`service-${serviceItem.id}`}
                              type="radio"
                              style={{ marginRight: "15px" }}
                              value={serviceItem.id}
                              // checked={
                              //   servformValues.values.service ===
                              //   serviceItem.name
                              // }
                              // onChange={handleRadioChange}
                              required
                            />
                            <p className="m-0">{serviceItem.name}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                </div>
                <div className="card-footer">
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={handleSubmit}
                    className="py-1 px-5"
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Update Order Details"
                    )}
                  </Button>
                </div>
              </section>
            </main>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
