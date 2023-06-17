import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

function DeleteReviewModal({ open, onClose, onDelete }) {
  const handleDelete = () => {
    onDelete();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Review</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this review?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteReviewModal;
