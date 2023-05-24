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

const ViewOrders = ({ viewOrder, onClose }) => {
  if (!viewOrder) {
    return <div>...</div>;
  }

  return (
    <>
      <Dialog open={true} onClose={onClose}>
        <DialogTitle
          sx={{ color: "#1976d2", fontWeight: "500", textAlign: "center" }}
        >
          User Details
        </DialogTitle>
        <DialogContent>
          {/* <p><b>:</b> {viewOrder.email}</p> */}
          <p>
            <b>Transaction Number:</b> {viewOrder.trans_number}
          </p>
          <p>
            <b>Last Name:</b>{" "}
            {viewOrder.profile &&
              viewOrder.profile[0] &&
              viewOrder.profile[0].first_name}
          </p>
          <p>
            <b>Last Name:</b>{" "}
            {viewOrder.profile &&
              viewOrder.profile[0] &&
              viewOrder.profile[0].last_name}
          </p>
          <p>
            <b>Order Status:</b> {viewOrder.status}
          </p>
          <p>
            <b>Payment Status:</b> {viewOrder.payment_status}
          </p>
          <p>
            <b>Total:</b> {viewOrder.total}
          </p>
          <p>
            <b>Approved By:</b> {viewOrder.approved_by}
          </p>
          <p>
            <b>Handling:</b>{" "}
            {viewOrder.handling && viewOrder.handling.handling_name}
          </p>
          <p>
            <b>Payment:</b>{" "}
            {viewOrder.payment && viewOrder.payment.payment_name}
          </p>
          <p>
            <b>Categories:</b>{" "}
            <Typography component="ul">
              {viewOrder &&
                viewOrder.categories.map((category, i) => (
                  <Typography key={i} component="li">
                    {category.name}
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
