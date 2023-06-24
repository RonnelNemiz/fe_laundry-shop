import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import React from "react";
// import "../../../../../assets/css/admin.css";
// import "../../../../assets/css/admin.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  close: {
    textTransform: "unset",
  },
};

const ViewUser = ({ open, onClose, user, profileImage }) => {
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{ color: "#1976d2", fontWeight: "500", textAlign: "center" }}
        >
          User Details
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box>
              <Box
                sx={{ width: "100%" }}
                className="d-flex justify-content-between align-items-center"
              >
                <Typography variant="subtitle1">Email</Typography>
                <Typography variant="subtitle1">{user?.email}</Typography>
              </Box>
              <Box
                sx={{ width: "100%" }}
                className="d-flex justify-content-between align-items-center"
              >
                <Typography variant="subtitle1">user Name</Typography>
                <Typography variant="subtitle1">
                  {user?.profile[0].first_name} {user?.profile[0].last_name}
                </Typography>
              </Box>
              <Box
                sx={{ width: "100%" }}
                className="d-flex justify-content-between align-items-center"
              >
                <Typography variant="subtitle1">Address</Typography>
                <Typography variant="subtitle1">
                  {user?.profile[0].purok} {user?.profile[0].brgy}{" "}
                  {user?.profile[0].municipality}, Leyte
                </Typography>
              </Box>
              <Box
                sx={{ width: "100%" }}
                className="d-flex justify-content-between align-items-center"
              >
                <Typography variant="subtitle1">Landmark</Typography>
                <Typography variant="subtitle1">
                  {user?.profile[0].land_mark}
                </Typography>
              </Box>
              <Box
                sx={{ width: "100%" }}
                className="d-flex justify-content-between align-items-center"
              >
                <Typography variant="subtitle1">Contact No.</Typography>
                <Typography variant="subtitle1">
                  {user?.profile[0].contact_number}
                </Typography>
              </Box>
              <Box
                sx={{ width: "100%" }}
                className="d-flex justify-content-between align-items-center"
              >
                <Typography variant="subtitle1">Role</Typography>
                <Typography variant="subtitle1">
                  {(user?.role_id === 1 && "Admin") ||
                    (user?.role_id === 2 && "Staff") ||
                    (user?.role_id === 3 && "Delivery Boy")}
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
    </>
  );
};

export default ViewUser;
