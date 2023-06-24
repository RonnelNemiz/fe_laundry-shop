import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import Http from "../../../../services/Http";
import DeleteIcon from "@mui/icons-material/Delete";
import ToastNotification from "../../../../components/ToastNotification";
import { handleErrorResponse } from "../../../../utils/helpers";

const options = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  draggable: true,
  draggableDirection: 60,
  theme: "colored",
};

export default function DeleteHandling(props) {
  const { selectedItem, onDelete, forceUpdate } = props;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    setLoading(true);
    Http.delete(`/delete/handlings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        onDelete();
        forceUpdate();
        ToastNotification("success", "Successfully Deleted Data", options);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        ToastNotification("error", handleErrorResponse(err), options);
      });
  };

  return (
    <>
      <Button onClick={handleClickOpen}>
        <DeleteIcon
          color="error"
          sx={{
            m: 1,
            fontsize: "30px",
            cursor: "pointer",
            position: "relative",
            left: "10px",
            transition: ".5s",
            "&:hover": {
              color: "black",
            },
          }}
        />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Handling</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: "500" }}>
            Are you sure you want to delete the handling "
            {selectedItem.handling_name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="error"
            onClick={() => handleDelete(selectedItem.id)}
            disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
