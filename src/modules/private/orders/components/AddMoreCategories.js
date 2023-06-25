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

export default function AddMoreCategories(props) {
  const { open, onClose, order, orderItems, categories } = props;

  const [loading, setLoading] = React.useState(false);
  const [expanded, setExpanded] = useState(false);
  const [formValues, setFormValues] = useState([]);

  React.useEffect(() => {
    if (categories) {
      const updatedFormValues = {};

      categories?.forEach((category) => {
        const children = category.children[0]?.name.map((child) => ({
          name: child,
          quantity: "",
        }));

        updatedFormValues[category.name] = {
          name: category.name,
          kilo: "",
          children: children,
        };
      });

      setFormValues(updatedFormValues);
    }
  }, [categories]);

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
            <Typography>Edit Order Details</Typography>
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
                  <h3 className="m-0">ORDER DETAILS</h3>
                </div>
                <div className="card-body">
                  {Object.keys(formValues)?.map((parentKey) => {
                    const parentCategory = formValues[parentKey];
                    return (
                      <Accordion
                        key={parentKey}
                        expanded={expanded === parentKey}
                        onChange={handleAccordionChange(parentKey)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={"panel-content"}
                          className="my-0 d-flex justify-content-between"
                        >
                          <Typography
                            className="py-1 my-0 fw-bold"
                            sx={{ width: "50%" }}
                          >
                            {parentCategory.name}
                          </Typography>
                          <Form.Control
                            name="kilo"
                            onChange={(e) => handleChange(e, parentKey, null)}
                            id="kilo"
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
                          <div>
                            {parentCategory.children?.map(
                              (childCategory, childIndex) => (
                                <article
                                  key={childIndex}
                                  className="d-flex justify-content-between card my-1"
                                >
                                  <div className="card-body d-flex justify-content-between align-items-center py-1">
                                    <div className="d-flex align-items-center m-0">
                                      <label htmlFor="quantity">
                                        {childCategory.name}
                                      </label>
                                    </div>
                                    <Form.Control
                                      name="quantity"
                                      onChange={(e) =>
                                        handleChange(e, parentKey, childIndex)
                                      }
                                      id={"kilo"}
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
                              )
                            )}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
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
