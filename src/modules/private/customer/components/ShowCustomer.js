import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Slide,
  DialogActions,
  Button,
} from "@mui/material";
import Http from "../../../../services/Http";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  close: {
    textTransform: "unset",
  },
};

function ShowCustomer({ open, onClose, customer }) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>View Order</DialogTitle>
      <DialogContent>
        <Box>
          <Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Email</Typography>
              <Typography variant="subtitle1">{customer?.email}</Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Customer Name</Typography>
              <Typography variant="subtitle1">
                {customer?.profile[0].first_name}{" "}
                {customer?.profile[0].last_name}
              </Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Address</Typography>
              <Typography variant="subtitle1">
                {customer?.profile[0].purok} {customer?.profile[0].brgy}{" "}
                {customer?.profile[0].municipality}, Leyte
              </Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Landmark</Typography>
              <Typography variant="subtitle1">
                {customer?.profile[0].land_mark}
              </Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Contact No.</Typography>
              <Typography variant="subtitle1">
                {customer?.profile[0].contact_number}
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
}

export default ShowCustomer;
