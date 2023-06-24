import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import {
  Typography,
  Box,
  LinearProgress,
  IconButton,
  Divider,
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Http from "../../../../services/Http";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OrderCategories from "./OrderCategories";
import OrderPayments from "./OrderPayments";
import CloseIcon from "@mui/icons-material/Close";
import OrderStatus from "./OrderStatus";
import ToastNotification from "../../../../components/ToastNotification";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Form } from "react-bootstrap";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// const paymentStatuses = [
//   {
//     value: "1",
//     label: "Paid",
//   },
//   {
//     value: "0",
//     label: "Unpaid",
//   },
// ];

// const handlingStatuses = [
//   {
//     value: "0",
//     label: "Pending",
//   },
//   {
//     value: "1",
//     label: "Rider is On Pickup",
//   },
//   {
//     value: "2",
//     label: "Ready for Pickup",
//   },
//   {
//     value: "3",
//     label: "Ready for Delivery",
//   },
//   {
//     value: "4",
//     label: "Rider is On Delivery",
//   },
//   {
//     value: "5",
//     label: "Completed",
//   },
// ];

// const makeStyles = (status) => {
//   if (status === "completed") {
//     return {
//       color: "green",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//       width: "150px",
//     };
//   } else if (status === "ready to deliver") {
//     return {
//       background: "#f94d00",
//       color: "#ff8c00",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//       width: "150px",
//     };
//   } else if (status === "ready to pickup") {
//     return {
//       background: "#ffada8f",
//       color: "ff8c00",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//       width: "150px",
//     };
//   } else if (status === "ready for pickup") {
//     return {
//       background: "#ffada8f",
//       color: "#f94d00",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//       width: "150px",
//     };
//   } else if (status === "in progress") {
//     return {
//       background: "#ffada8f",
//       color: "orange",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//       width: "150px",
//     };
//   } else if (status === "pending") {
//     return {
//       background: "#ffada8f",
//       color: "red",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//       width: "150px",
//     };
//   } else {
//     return {
//       background: "#59bfff",
//       color: "white",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//       width: "150px",
//     };
//   }
// };

// const handlingStyle = {
//   color: "#0d6efd",
//   fontWeight: 600,
// };

export default function EditModal(props) {
  const { open, onClose, order } = props;
  // const [categoryList, setCategoryList] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const orderId = (order && order.id) || "";

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    trans_number: "",
    first_name: "",
    last_name: "",
    purok: "",
    brgy: "",
    municipality: "",
    contact_number: "",
    land_mark: "",
  });

  const [value, setValue] = React.useState("1");

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  };

  const categoryList = {
    item_categories: [
      {
        category_name: "Colored Beddings & Bathroom Accessories",
        item_types: [
          {
            id: 1,
            name: "bedsheet",
            category_id: 1,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 2,
            name: "towel",
            category_id: 1,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 3,
            name: "curtain",
            category_id: 1,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 4,
            name: "pillowcase",
            category_id: 1,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 5,
            name: "blanket",
            category_id: 1,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
        ],
      },
      {
        category_name: "White Beddings & Bathroom Accessories",
        item_types: [
          {
            id: 6,
            name: "tshirt",
            category_id: 2,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 7,
            name: "shorts",
            category_id: 2,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 8,
            name: "trousers",
            category_id: 2,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 9,
            name: "jacket",
            category_id: 2,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 10,
            name: "underwear",
            category_id: 2,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 11,
            name: "blouse",
            category_id: 2,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 12,
            name: "socks",
            category_id: 2,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 13,
            name: "handkerchief",
            category_id: 2,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 14,
            name: "pants",
            category_id: 2,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
        ],
      },
      {
        category_name: "Colored Garments",
        item_types: [
          {
            id: 15,
            name: "bedsheet",
            category_id: 3,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 16,
            name: "towel",
            category_id: 3,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 17,
            name: "curtain",
            category_id: 3,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 18,
            name: "pillowcase",
            category_id: 3,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 19,
            name: "blanket",
            category_id: 3,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
        ],
      },
      {
        category_name: "White Garments",
        item_types: [
          {
            id: 20,
            name: "tshirt",
            category_id: 4,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 21,
            name: "shorts",
            category_id: 4,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 22,
            name: "trousers",
            category_id: 4,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 23,
            name: "jacket",
            category_id: 4,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 24,
            name: "underwear",
            category_id: 4,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 25,
            name: "blouse",
            category_id: 4,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 26,
            name: "socks",
            category_id: 4,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 27,
            name: "handkerchief",
            category_id: 4,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
          {
            id: 28,
            name: "pants",
            category_id: 4,
            created_at: "2023-06-24T06:37:42.000000Z",
            updated_at: "2023-06-24T06:37:42.000000Z",
          },
        ],
      },
    ],
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (open) {
      fetchOrderDetail();
    }
  }, [open]);

  const fetchOrderDetail = () => {
    setLoading(true);
    Http.get("/order-details/" + orderId)
      .then((res) => {
        if (res.data) {
          const ordersData = res.data.order;

          const newValues = {};

          for (const key in formValues) {
            if (ordersData[key]) {
              newValues[key] = ordersData[key];
            }
          }

          setFormValues((prev) => ({
            ...prev,
            ...newValues,
          }));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateDetails = () => {
    setLoading(true);
    Http.put(`/orders/update-details/${orderId}`, formValues).then((res) => {
      setLoading(false);
      ToastNotification("success", "Order detail updated!", toastOptions);
    });
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const tableStyle = {
    textAlign: "right",
  };

  return (
    <div>
      <ToastNotificationContainer />
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="card-header">
          <Box className="d-flex justify-content-between align-items-center">
            <Typography>Edit Order</Typography>
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
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChangeTab}>
                  <Tab label="Details" value="1" />
                  <Tab label="Payment" value="3" />
                  <Tab label="Status" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {/* {loading && <LinearProgress />} */}
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
                          value={formValues.trans_number || ""}
                          onChange={handleChange}
                          name="trans_number"
                          disabled
                        />
                        <Box className={"d-flex"}>
                          <TextField
                            id=""
                            label="First Name"
                            variant="standard"
                            value={formValues.first_name || ""}
                            onChange={handleChange}
                            name="first_name"
                            className="flex-fill"
                          />
                          <TextField
                            id=""
                            label="Last Name"
                            variant="standard"
                            value={formValues.last_name || ""}
                            onChange={handleChange}
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
                            value={formValues.purok || ""}
                            onChange={handleChange}
                            name="purok"
                          />
                          <TextField
                            className="flex-fill"
                            id=""
                            label="Barangay"
                            variant="standard"
                            value={formValues.brgy || ""}
                            onChange={handleChange}
                            name="brgy"
                          />
                          <TextField
                            className="flex-fill"
                            id=""
                            label="Municipality"
                            variant="standard"
                            value={formValues.municipality || ""}
                            onChange={handleChange}
                            name="municipality"
                          />
                          <TextField
                            className="flex-fill"
                            id=""
                            label="Landmark"
                            variant="standard"
                            value={formValues.land_mark || ""}
                            onChange={handleChange}
                            name="land_mark"
                          />
                        </Box>
                        <TextField
                          className="flex-fill"
                          id=""
                          label="Contact #"
                          variant="standard"
                          value={formValues.contact_number || ""}
                          onChange={handleChange}
                          name="contact_number"
                        />
                      </Box>
                    </div>
                    <div className="card-footer">
                      <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={handleUpdateDetails}
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
                              onChange={handleChange}
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
                                    onChange={handleChange}
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
                              onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                              onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                        onClick={handleUpdateDetails}
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
                        onClick={handleUpdateDetails}
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
                        onClick={handleUpdateDetails}
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
                        onClick={handleUpdateDetails}
                        className="py-1 px-5"
                        // fullWidth
                      >
                        Update Consumables
                      </Button>
                    </div>
                  </section>
                </main>
              </TabPanel>
              <TabPanel value="3" sx={{ padding: "15px 5px" }}>
                <OrderPayments order={order} />
              </TabPanel>
              <TabPanel value="4" sx={{ padding: "15px 5px" }}>
                <OrderStatus order={order} />
              </TabPanel>
            </TabContext>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
