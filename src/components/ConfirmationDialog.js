import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import FormDialog from "../modules/private/users/components/FormDialog";

function ConfirmationDialog(props) {
  const {
    open,
    onClose,
    message,
    onConfirm,
    title = "Confirm",
    loading,
  } = props;
  return (
    <FormDialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText color="red">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          variant="contained"
          color="primary"
          onClick={onConfirm}>
          {loading ? <CircularProgress size={24} /> : "Yes"}
        </Button>
        <Button
          disabled={loading}
          variant="contained"
          color="error"
          onClick={onClose}>
          No
        </Button>
      </DialogActions>
    </FormDialog>
  );
}

export default ConfirmationDialog;
