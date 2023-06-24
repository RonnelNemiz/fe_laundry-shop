import React, { useState, useEffect, useReducer } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Typography, Box, Divider, IconButton } from "@mui/material";
import Http from "../../../../services/Http";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import { Form } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  close: {
    textTransform: "unset",
  },
};

export default function ViewModal(props) {
  const { open, onClose, fetchingData, order } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState();

  const orderId = (order && order.id) || "";

  const [expanded, setExpanded] = React.useState(false);
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    setIsLoading(true);
    Http.get("/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);
  // console.log("Order Id:", orderId);
  const handlePay = () => {
    // 1. validate payment if needed
    // 2. handle http call to submit payment
    //     1. upon success call fetch() to update orders on the list invoke onClose() to close the modal
    //     2. if failed, show error message and don't close the modal
  };

  const tableStyle = {
    textAlign: "right",
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      maxWidth="md"
    >
      <DialogTitle className="card-header">
        <Box className="d-flex justify-content-between align-items-center">
          <Typography>View Order</Typography>
          <IconButton color="error" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <main className="mt-3">
          <section className="card">
            <div className="card-header bg-primary bg-gradient text-light">
              <h3 className="m-0">CUSTOMER PROFILE</h3>
              {/* {loading && <LinearProgress />} */}
            </div>
            <div className="card-body">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "95%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id=""
                  label="Transaction #"
                  variant="standard"
                  value="LAUNDRY-023"
                  onChange={""}
                  name="trans_number"
                  disabled
                />
                <Box className={"d-flex"}>
                  <TextField
                    id=""
                    label="First Name"
                    variant="standard"
                    value="Adrian"
                    onChange={""}
                    name="first_name"
                    className="flex-fill"
                  />
                  <TextField
                    id=""
                    label="Last Name"
                    variant="standard"
                    value="Elizaga"
                    onChange={""}
                    name="last_name"
                    className="flex-fill"
                  />
                </Box>
                <Box className={"d-flex"}>
                  <TextField
                    className="flex-fill"
                    id=""
                    label="Purok"
                    variant="standard"
                    value="Purok Uno"
                    onChange={""}
                    name="purok"
                  />
                  <TextField
                    className="flex-fill"
                    id=""
                    label="Barangay"
                    variant="standard"
                    value="Brgy. Doos"
                    onChange={""}
                    name="brgy"
                  />
                  <TextField
                    className="flex-fill"
                    id=""
                    label="Municipality"
                    variant="standard"
                    value="Tres Town"
                    onChange={""}
                    name="municipality"
                  />
                  <TextField
                    className="flex-fill"
                    id=""
                    label="Landmark"
                    variant="standard"
                    value="Landbank"
                    onChange={""}
                    name="land_mark"
                  />
                </Box>
                <TextField
                  className="flex-fill"
                  id=""
                  label="Contact #"
                  variant="standard"
                  value="09123456789"
                  onChange={""}
                  name="contact_number"
                />
              </Box>
            </div>
            <div className="card-footer">
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={""}
                className="py-1 px-5"
                // fullWidth
              >
                Update Profile
              </Button>
            </div>
          </section>
        </main>
        <Divider className="mt-3" />
        <main className="mt-3">
          <section className="card">
            <div className="card-header bg-primary bg-gradient text-light">
              <h3 className="m-0">ORDER DETAILS</h3>
              {/* {loading && <LinearProgress />} */}
            </div>
            <div className="card-body">
              <React.Fragment>
                <Accordion
                  expanded={expanded === 1}
                  onChange={handleAccordionChange(1)}
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
                      Category Name Here
                    </Typography>

                    <Form.Control
                      name={"itemType"}
                      onChange={""}
                      id={"itemType"}
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
                      <article className="d-flex justify-content-between card my-1">
                        <div className="card-body d-flex justify-content-between align-items-center py-1">
                          <div className="d-flex align-items-center m-0">
                            <label htmlFor={"itemType"}>
                              Item Type Name here...
                            </label>
                          </div>
                          <Form.Control
                            name={"itemType"}
                            onChange={""}
                            id={"itemType"}
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
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === 2}
                  onChange={handleAccordionChange(2)}
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
                      Category Name Here
                    </Typography>

                    <Form.Control
                      name={"itemType"}
                      onChange={""}
                      id={"itemType"}
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
                      <article className="d-flex justify-content-between card my-1">
                        <div className="card-body d-flex justify-content-between align-items-center py-1">
                          <div className="d-flex align-items-center m-0">
                            <label htmlFor={"itemType"}>
                              Item Type Name here...
                            </label>
                          </div>
                          <Form.Control
                            name={"itemType"}
                            onChange={""}
                            id={"itemType"}
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
                      <article className="d-flex justify-content-between card my-1">
                        <div className="card-body d-flex justify-content-between align-items-center py-1">
                          <div className="d-flex align-items-center m-0">
                            <label htmlFor={"itemType"}>
                              Item Type Name here...
                            </label>
                          </div>
                          <Form.Control
                            name={"itemType"}
                            onChange={""}
                            id={"itemType"}
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
                      <article className="d-flex justify-content-between card my-1">
                        <div className="card-body d-flex justify-content-between align-items-center py-1">
                          <div className="d-flex align-items-center m-0">
                            <label htmlFor={"itemType"}>
                              Item Type Name here...
                            </label>
                          </div>
                          <Form.Control
                            name={"itemType"}
                            onChange={""}
                            id={"itemType"}
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
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === 3}
                  onChange={handleAccordionChange(3)}
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
                      Category Name Here
                    </Typography>

                    <Form.Control
                      name={"itemType"}
                      onChange={""}
                      id={"itemType"}
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
                      <article className="d-flex justify-content-between card my-1">
                        <div className="card-body d-flex justify-content-between align-items-center py-1">
                          <div className="d-flex align-items-center m-0">
                            <label htmlFor={"itemType"}>
                              Item Type Name here...
                            </label>
                          </div>
                          <Form.Control
                            name={"itemType"}
                            onChange={""}
                            id={"itemType"}
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
                      <article className="d-flex justify-content-between card my-1">
                        <div className="card-body d-flex justify-content-between align-items-center py-1">
                          <div className="d-flex align-items-center m-0">
                            <label htmlFor={"itemType"}>
                              Item Type Name here...
                            </label>
                          </div>
                          <Form.Control
                            name={"itemType"}
                            onChange={""}
                            id={"itemType"}
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
                      <article className="d-flex justify-content-between card my-1">
                        <div className="card-body d-flex justify-content-between align-items-center py-1">
                          <div className="d-flex align-items-center m-0">
                            <label htmlFor={"itemType"}>
                              Item Type Name here...
                            </label>
                          </div>
                          <Form.Control
                            name={"itemType"}
                            onChange={""}
                            id={"itemType"}
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
                      <article className="d-flex justify-content-between card my-1">
                        <div className="card-body d-flex justify-content-between align-items-center py-1">
                          <div className="d-flex align-items-center m-0">
                            <label htmlFor={"itemType"}>
                              Item Type Name here...
                            </label>
                          </div>
                          <Form.Control
                            name={"itemType"}
                            onChange={""}
                            id={"itemType"}
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
                      <article className="d-flex justify-content-between card my-1">
                        <div className="card-body d-flex justify-content-between align-items-center py-1">
                          <div className="d-flex align-items-center m-0">
                            <label htmlFor={"itemType"}>
                              Item Type Name here...
                            </label>
                          </div>
                          <Form.Control
                            name={"itemType"}
                            onChange={""}
                            id={"itemType"}
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
                  </AccordionDetails>
                </Accordion>
              </React.Fragment>
            </div>
            <div className="card-footer">
              <Button
                size="small"
                color="success"
                variant="contained"
                onClick={""}
                className="py-1 px-5 mr-3"
                style={{ marginRight: "15px" }}
                // fullWidth
              >
                Add More Items
              </Button>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={""}
                className="py-1 px-5"
                // fullWidth
              >
                Update Order Details
              </Button>
            </div>
          </section>
        </main>

        <Divider className="mt-3" />
        <main className="mt-3">
          <section className="card">
            <div className="card-header bg-primary bg-gradient text-light">
              <h3 className="m-0">CONSUMABLES</h3>
              {/* {loading && <LinearProgress />} */}
            </div>
            <div className="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Amount</th>
                    <th scope="col">Item</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" style={tableStyle}>
                      ₱50.00
                    </th>
                    <td>Extra: Fabric Conditioner</td>
                  </tr>
                  <tr>
                    <th scope="row" style={tableStyle}>
                      ₱20.00
                    </th>
                    <td>Extra: Detergent</td>
                  </tr>
                  <tr>
                    <th scope="row" style={tableStyle}>
                      ₱0.00
                    </th>
                    <td scope="row">Consumable: Detergent</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card-footer">
              <Button
                size="small"
                color="success"
                variant="contained"
                onClick={""}
                className="py-1 px-5 mr-3"
                style={{ marginRight: "15px" }}
                // fullWidth
              >
                Add More Items
              </Button>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={""}
                className="py-1 px-5"
                // fullWidth
              >
                Update Consumables
              </Button>
            </div>
          </section>
        </main>
      </DialogContent>
    </Dialog>
  );
}
