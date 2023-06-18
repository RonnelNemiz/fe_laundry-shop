import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Typography, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

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
export default function PayModal(props) {
  const { open, onClose, fetchingData, orderId } = props;

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
      <DialogTitle>Pay Order</DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%" }} className="d-flex justify-content-between">
          <Typography variant="subtitle1">Items Breakdown</Typography>
          <Box className="d-flex justify-content-between flex-column">
            <Box className="d-flex">
              <Typography variant="subtitle1">Item 1</Typography>
              <Typography variant="subtitle1" className="ms-2">
                x 3
              </Typography>
            </Box>
            <Box className="d-flex">
              <Typography variant="subtitle1">Item 2</Typography>
              <Typography variant="subtitle1" className="ms-2">
                x 3
              </Typography>
            </Box>
            <Box className="d-flex">
              <Typography variant="subtitle1">Item 3</Typography>
              <Typography variant="subtitle1" className="ms-2">
                x 3
              </Typography>
            </Box>
            <Box className="d-flex">
              <Typography variant="subtitle1">Item 4</Typography>
              <Typography variant="subtitle1" className="ms-2">
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
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "95%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Payment Received"
            variant="standard"
          />
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handlePay}
        >
          Pay
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
