import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import "../../../../assets/css/admin.css";

const ViewOrders = ({ showOrder, onClose }) => {
  if (!showOrder) {
    return <div>...</div>;
  }

  return (
    <>
      <Dialog open={true} onClose={onClose} >
        <DialogTitle
          sx={{ color: "#1976d2", fontWeight: "500", textAlign: "center" }}
        >
          User Details
        </DialogTitle>
        <DialogContent sx={{ overflowY: "auto", maxHeight: "500px" }}>
          {/* <p><b>:</b> {viewOrder.email}</p> */}
          <p>
            <b>Transaction Number:</b> {showOrder.trans_number}
          </p>
          <p>
            <b>First Name:</b>{" "}
            {showOrder.user.profile?.first_name ?? "ADMIN"}
              {/* {showOrder.profile && showOrder.profile[0].last_name} */}
          </p>
          <p>
            <b>Last Name:</b>{" "}
            {/* {showOrder.profile &&
              showOrder.profile[0] &&
              showOrder.profile[0].last_name} */}
              {showOrder.user.profile?.last_name ?? "ADMIN"}
          </p>
          <p>
            <b>Purok:</b>{" "}
              {showOrder.user.profile?.purok}
          </p>
          <p>
            <b>Brgy:</b>{" "}
              {showOrder.user.profile?.brgy}
          </p>
          <p>
            <b>Municipality:</b>{" "}
              {showOrder.user.profile?.municipality}
          </p>
          <p>
            <b>Landmark:</b>{" "}
              {showOrder.user.profile?.land_mark}
          </p>
          <p>
            <b>Contact Number:</b>{" "}
              {showOrder.user.profile?.contact_number}
          </p>
          <p>
            <b>Email:</b>{" "}
              {showOrder.user.email}
          </p>
          <p>
            <b>Order Status:</b> {showOrder.status}
          </p>
          <p>
            <b>Payment Status:</b> {showOrder.payment_status}
          </p>
          <p>
            <b>Total:</b> {showOrder.total}
          </p>
          <p>
            <b>Approved By:</b> {showOrder.approved_by}
          </p>
          <p>
            <b>Handling:</b>{" "}
            {showOrder.handling_id === 1 && "Pickup & Delivery" || showOrder.handling_id === 2 && "Pickup" || showOrder.handling_id === 3 && "Delivery" || showOrder.handling_id === 4 && "Walk-in"}
          </p>
          <p>
            <b>Payment:</b>{" "}
            {showOrder.payment_id === 1 && "GCASH" || showOrder.payment_id === 2 && "COD" ||  showOrder.payment_id === 3 && "SAGPA"}
          </p>
          <p>
            <b>Categories:</b>{" "}
            <Typography component="ul">
              {showOrder &&
                showOrder.categories &&
                showOrder?.categories?.map((category, i) => (
                  <Typography key={i} component="li">
                    {category.name} (Quantity: {category.pivot.quantity})
                  </Typography>
                ))}
            </Typography>
          </p>

              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </>
  );
};

export default ViewOrders;
