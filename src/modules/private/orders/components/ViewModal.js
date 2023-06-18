import React, { useState, useEffect, useReducer } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Typography, Box } from "@mui/material";
import Http from "../../../../services/Http";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  close: {
    textTransform: "unset",
  },
};

export default function ViewModal(props) {
  const { open, onClose, fetchingData, orderId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState();

  useEffect(() => {
    setIsLoading(true);
    Http.get("/orders/").then((res) => {
      setOrders(res.data);
    });
  });
  // console.log("Order Id:", orderId);
  const handlePay = () => {
    // 1. validate payment if needed
    // 2. handle http call to submit payment
    //     1. upon success call fetch() to update orders on the list invoke onClose() to close the modal
    //     2. if failed, show error message and don't close the modal
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>View Order</DialogTitle>
      <DialogContent>
        <Box
          sx={{ width: "100%" }}
          className="d-flex justify-content-between align-items-center"
        >
          <Typography variant="subtitle1">Transaction Number</Typography>
          <Typography variant="subtitle1">LAUNDRY-0123</Typography>
        </Box>
        <Box
          sx={{ width: "100%" }}
          className="d-flex justify-content-between align-items-center"
        >
          <Typography variant="subtitle1">Customer Name</Typography>
          <Typography variant="subtitle1">Oning d' Explorer</Typography>
        </Box>
        <Box
          sx={{ width: "100%" }}
          className="d-flex justify-content-between align-items-center"
        >
          <Typography variant="subtitle1">Address</Typography>
          <Typography variant="subtitle1">
            Di Makita Stree, Hanap-hanapin City
          </Typography>
        </Box>
        <Box
          sx={{ width: "100%" }}
          className="d-flex justify-content-between align-items-center"
        >
          <Typography variant="subtitle1">Service</Typography>
          <Typography variant="subtitle1">Pagwapa sa Bolbol</Typography>
        </Box>
        <Box sx={{ width: "100%" }} className="d-flex justify-content-between">
          <Typography variant="subtitle1">Items Breakdown</Typography>
          <Box className="d-flex justify-content-between flex-column">
            <Box className="d-flex">
              <Typography variant="subtitle1">Item 1</Typography>
              <Typography variant="subtitle1" className="ms-2">
                {" "}
                x 3
              </Typography>
            </Box>
            <Box className="d-flex">
              <Typography variant="subtitle1">Item 2</Typography>
              <Typography variant="subtitle1" className="ms-2">
                {" "}
                x 3
              </Typography>
            </Box>
            <Box className="d-flex">
              <Typography variant="subtitle1">Item 3</Typography>
              <Typography variant="subtitle1" className="ms-2">
                {" "}
                x 3
              </Typography>
            </Box>
            <Box className="d-flex">
              <Typography variant="subtitle1">Item 4</Typography>
              <Typography variant="subtitle1" className="ms-2">
                {" "}
                x 3
              </Typography>
            </Box>
            <Box className="d-flex border-top">
              <Typography variant="subtitle1" className="fw-bold me-2">
                Total
              </Typography>
              <Typography variant="subtitle1"> P950.00</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ width: "100%" }}
          className="d-flex justify-content-between align-items-center"
        >
          <Typography variant="subtitle1">Payment Status</Typography>
          <Typography variant="subtitle1" className="text-danger">
            Unpaid
          </Typography>
        </Box>
        <Box
          sx={{ width: "100%" }}
          className="d-flex justify-content-between align-items-center"
        >
          <Typography variant="subtitle1">Delivery Status</Typography>
          <Typography variant="subtitle1" className="text-primary">
            Pending
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          sx={styles.close}
          size="small"
          color="error"
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
