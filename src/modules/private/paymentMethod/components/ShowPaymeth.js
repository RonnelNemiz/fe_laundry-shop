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

const ShowPaymeth = ({ open, paymentmethod, onClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>View Payment Method</DialogTitle>
      <DialogContent>
        <Box>
          <Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Payment Method</Typography>
              <Typography variant="subtitle1">{paymentmethod?.name}</Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Logo</Typography>
              <Typography variant="subtitle1">{paymentmethod?.logo}</Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Recipient</Typography>
              <Typography variant="subtitle1">
                {paymentmethod?.recipient}
              </Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Number</Typography>
              <Typography variant="subtitle1">
                {paymentmethod?.number}
              </Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Instructions</Typography>
              <Typography variant="subtitle1">
                {paymentmethod?.special_instructions}
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

export default ShowPaymeth;
