import React, { useState, useEffect, useReducer } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Typography,
  Box,
  Divider,
  IconButton,
  LinearProgress,
} from "@mui/material";
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

  const orderId = (order && order.id) || "";

  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
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

  useEffect(() => {
    if (open) {
      fetchOrderDetail();
    }
  }, [open]);

  const fetchOrderDetail = () => {
    setLoading(true);
    Http.get(`/order-details/${orderId}`)
      .then((res) => {
        if (res.data) {
          setOrderDetails(res.data);
          setFormValues((prev) => ({
            ...prev,
            trans_number: res.data?.order?.trans_number,
            ...res.data?.profile,
          }));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
              {loading && <LinearProgress />}
            </div>
            {!loading && (
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
                    label="Transaction #"
                    variant="standard"
                    value={formValues?.trans_number}
                    name="trans_number"
                    disabled
                  />
                  <Box className={"d-flex"}>
                    <TextField
                      label="First Name"
                      variant="standard"
                      value={formValues?.first_name}
                      name="first_name"
                      className="flex-fill"
                      disabled
                    />
                    <TextField
                      label="Last Name"
                      variant="standard"
                      value={formValues?.last_name}
                      name="last_name"
                      className="flex-fill"
                      disabled
                    />
                  </Box>
                  <Box className={"d-flex"}>
                    <TextField
                      className="flex-fill"
                      disabled
                      label="Purok"
                      variant="standard"
                      value={formValues?.purok}
                      name="purok"
                    />
                    <TextField
                      className="flex-fill"
                      disabled
                      label="Barangay"
                      variant="standard"
                      value={formValues?.brgy}
                      name="brgy"
                    />
                    <TextField
                      className="flex-fill"
                      disabled
                      label="Municipality"
                      variant="standard"
                      value={formValues?.municipality}
                      name="municipality"
                    />
                    <TextField
                      className="flex-fill"
                      disabled
                      label="Landmark"
                      variant="standard"
                      value={formValues?.land_mark}
                      name="land_mark"
                    />
                  </Box>
                  <TextField
                    className="flex-fill"
                    disabled
                    label="Contact #"
                    variant="standard"
                    value={formValues?.contact_number}
                    name="contact_number"
                  />
                </Box>
              </div>
            )}
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
              {orderDetails?.orderItems?.length <= 0 && (
                <Typography>No Items</Typography>
              )}

              {orderDetails?.orderItems?.length > 0 &&
                orderDetails?.orderItems.map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography>{item.name}</Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.items_breakdown,
                        }}
                      />
                    </Box>
                  </Box>
                ))}
            </div>
          </section>
        </main>

        <Divider className="mt-3" />
        <main className="mt-3">
          <section className="card">
            <div className="card-header bg-primary bg-gradient text-light">
              <h3 className="m-0">CONSUMABLES</h3>
              {loading && <LinearProgress />}
            </div>
            {!loading && orderDetails?.consumables?.length <= 0 && (
              <Box sx={{ p: 2 }}>
                <Typography>No items</Typography>
              </Box>
            )}
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Amount</th>
                    <th scope="col">Item</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.consumables?.map((consumable, i) => (
                    <tr key={i}>
                      <th scope="row" style={tableStyle}>
                        ₱{consumable.price}
                      </th>
                      <td>{consumable.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </DialogContent>
    </Dialog>
  );
}
