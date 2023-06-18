import React, { useState, useEffect, useReducer } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Typography, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Http from "../../../../services/Http";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  close: {
    textTransform: "unset",
  },
};

const paymentStatuses = [
  {
    value: "1",
    label: "Paid",
  },
  {
    value: "0",
    label: "Unpaid",
  },
];

const handlingStatuses = [
  {
    value: "0",
    label: "Pending",
  },
  {
    value: "1",
    label: "Rider is On Pickup",
  },
  {
    value: "2",
    label: "Ready for Pickup",
  },
  {
    value: "3",
    label: "Ready for Delivery",
  },
  {
    value: "4",
    label: "Rider is On Delivery",
  },
  {
    value: "5",
    label: "Completed",
  },
];

const makeStyles = (status) => {
  if (status === "completed") {
    return {
      color: "green",
      cursor: "pointer",
      fontSize: "0.875rem",
      width: "150px",
    };
  } else if (status === "ready to deliver") {
    return {
      background: "#f94d00",
      color: "#ff8c00",
      cursor: "pointer",
      fontSize: "0.875rem",
      width: "150px",
    };
  } else if (status === "ready to pickup") {
    return {
      background: "#ffada8f",
      color: "ff8c00",
      cursor: "pointer",
      fontSize: "0.875rem",
      width: "150px",
    };
  } else if (status === "ready for pickup") {
    return {
      background: "#ffada8f",
      color: "#f94d00",
      cursor: "pointer",
      fontSize: "0.875rem",
      width: "150px",
    };
  } else if (status === "in progress") {
    return {
      background: "#ffada8f",
      color: "orange",
      cursor: "pointer",
      fontSize: "0.875rem",
      width: "150px",
    };
  } else if (status === "pending") {
    return {
      background: "#ffada8f",
      color: "red",
      cursor: "pointer",
      fontSize: "0.875rem",
      width: "150px",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
      cursor: "pointer",
      fontSize: "0.875rem",
      width: "150px",
    };
  }
};

const handlingStyle = {
  color: "#0d6efd",
  fontWeight: 600,
};

export default function EditModal(props) {
  const { open, onClose, fetchingData, orderId } = props;
  const [orderDetail, setOrderDetail] = useState(false);
  const [orderItems, setOrderItems] = useState(false);
  const [orderCategories, setOrderCategories] = useState(false);

  useEffect(() => {
    if (open) {
      fetchOrderDetail();
    }
  }, [open]);

  const fetchOrderDetail = () => {
    Http.get("/order-details/" + orderId)
      .then((res) => {
        setOrderDetail(res.data);
        setOrderItems(res.data);
        setOrderCategories(res.data.categoryParent);
        console.log("Res: ", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Edit Order</DialogTitle>
      <DialogContent>
        {orderDetail && (
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
              variant="standard"
              value={orderDetail ? orderDetail.order.trans_number : ""}
            />
            <TextField
              id=""
              variant="standard"
              value={orderDetail ? orderDetail.order.first_name : ""}
            />
            <TextField
              id=""
              variant="standard"
              value={orderDetail ? orderDetail.order.last_name : ""}
            />
            <TextField
              id=""
              variant="standard"
              value={orderDetail ? orderDetail.order.purok : ""}
            />
            <TextField
              id=""
              variant="standard"
              value={orderDetail ? orderDetail.order.brgy : ""}
            />
            <TextField
              id=""
              variant="standard"
              value={orderDetail ? orderDetail.order.municipality : ""}
            />
            <TextField
              id=""
              variant="standard"
              value={orderDetail ? orderDetail.order.contact_number : ""}
            />
            <TextField
              id=""
              variant="standard"
              value={orderDetail ? orderDetail.order.land_mark : ""}
            />
            {orderItems &&
              orderItems.orderItems.map((option) => (
                <Box
                  key={option.id}
                  sx={{
                    "& > :not(style)": { m: 1, width: "95%" },
                  }}
                >
                  <TextField
                    id=""
                    variant="standard"
                    label={`Weight for ${
                      orderCategories.find((category) => {
                        return category.id === option.parent_id;
                      }).name
                    }`}
                    value={orderItems ? option.kilo : ""}
                    style={{ textAlign: "start" }}
                  />
                </Box>
              ))}
            <TextField
              id="outlined-select-currency"
              select
              label="Payment Status"
            >
              {paymentStatuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="outlined-select-currency"
              select
              label="Handling Status"
            >
              {handlingStatuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button size="small" color="primary" variant="contained" onClick="">
          Update
        </Button>
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
