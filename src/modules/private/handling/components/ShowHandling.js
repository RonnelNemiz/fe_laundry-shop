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

const ShowHandling = ({ open, handling, onClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>View Handling</DialogTitle>
      <DialogContent>
        <Box>
          <Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Handling Name</Typography>
              <Typography variant="subtitle1">{handling?.name}</Typography>
            </Box>
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between align-items-center"
            >
              <Typography variant="subtitle1">Handling Price</Typography>
              <Typography variant="subtitle1">{handling?.price}</Typography>
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

export default ShowHandling;
