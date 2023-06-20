import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { Typography, Box, LinearProgress, IconButton } from "@mui/material";
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
        <DialogContent>
          <Box className="d-flex justify-content-between align-items-center">
            <Typography>Edit Order</Typography>
            <IconButton color="error" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChangeTab}>
                  <Tab label="Details" value="1" />
                  <Tab label="Items" value="2" />
                  <Tab label="Payment" value="3" />
                  <Tab label="Status" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {loading && <LinearProgress />}
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

                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={handleUpdateDetails}
                  style={{ padding: "5px 50px" }}
                  fullWidth
                >
                  Update
                </Button>
              </TabPanel>
              <TabPanel value="2" sx={{ padding: "15px 5px" }}>
                <OrderCategories open={value === "2"} order={order} />
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
