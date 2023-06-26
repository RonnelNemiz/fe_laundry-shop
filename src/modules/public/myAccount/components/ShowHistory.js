import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Box,
  Typography,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  close: {
    textTransform: "unset",
  },
};

const ShowHistory = ({ open, orderHistory, onClose }) => {
  const orderStatus = () => {
    let statusName = "";
    let color = "";

    switch (orderHistory?.status) {
      case 0:
        statusName = "Pending";
        color = "red";
        break;
      case 1:
        statusName = "Confirmed";
        color = "blue";
        break;
      case 2:
        statusName = "On Queue";
        color = "Orange";
        break;
      case 3:
        statusName = "Washing";
        color = "Yellow";
        break;
      case 4:
        statusName = "Ready for Payment";
        color = "pink";
        break;
      case 5:
        statusName = "Completed";
        color = "green";
        break;
      default:
        statusName = "Pending";
        color = "red";
        break;
    }

    return {
      statusName: statusName,
      color: color,
    };
  };

  console.log(orderStatus);

  const paymentStatus = () => {
    let statusName = "";
    let color = "";

    switch (orderHistory?.payment?.status) {
      case 0:
        statusName = "Unpaid";
        color = "red";
        break;
      case 1:
        statusName = "Paid";
        color = "green";
        break;
      default:
        statusName = "Unpaid";
        color = "red";
        break;
    }

    return {
      statusName: statusName,
      color: color,
    };
  };
  const paymentMethod = () => {
    let statusName = "";
    let color = "";

    switch (orderHistory?.payment?.payment_method_id) {
      case 1:
        statusName = "Gcash";
        break;
      default:
        statusName = "Cash";
        break;
    }

    return {
      statusName: statusName,
      color: color,
    };
  };

  const handlingStatus = () => {
    let statusName = "";
    let color = "";

    switch (orderHistory?.handling_status) {
      case 0:
        statusName = "Riding on Pickup";
        color = "blue";
        break;
      case 1:
        statusName = "Rider on Delivery";
        color = "orange";
        break;
      case 2:
        statusName = "Ready for Payment";
        color = "yellow";
        break;
      case 3:
        statusName = "Ready for Store Pickup";
        color = "pink";
        break;
      case 4:
        statusName = "Delivered";
        color = "green";
        break;
      case 5:
        statusName = "Picked Up";
        color = "green";
        break;
      default:
        statusName = "Riding on Pickup";
        color = "green";
        break;
    }

    return {
      statusName: statusName,
      color: color,
    };
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>History</DialogTitle>
      <DialogContent>
        <Box>
          <Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Date</Typography>
              <Typography variant="subtitle1">
                {orderHistory?.created_at}
              </Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Transaction#</Typography>
              <Typography variant="subtitle1">
                {orderHistory?.trans_number}
              </Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Service</Typography>
              <Typography variant="subtitle1">
                {orderHistory?.service.name}
              </Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Handling</Typography>
              <Typography variant="subtitle1">
                {orderHistory?.handling.name}
              </Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Status</Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: orderStatus().color }}
              >
                {orderStatus().statusName}
              </Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Handling Status</Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: handlingStatus().color }}
              >
                {handlingStatus().statusName}
              </Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Payment Method</Typography>
              <Typography variant="subtitle1">
                {paymentMethod().statusName}
              </Typography>
            </Box>
          </Box>
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
};

export default ShowHistory;
