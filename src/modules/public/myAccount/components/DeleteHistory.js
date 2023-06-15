import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Http from '../../../../services/Http';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material';
import ToastNotification from '../../../../components/ToastNotification';
import { handleErrorResponse } from '../../../../utils/helpers';

const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    draggable: true,
    draggableDirection: 60,
    theme: "colored",
  };

const DeleteHistory = ({ selectedItem, onDelete, forceUpdate }) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      }

  const handleDelete = () => {
    setLoading(true);
    Http.delete(`/delete/orders/${selectedItem.id}`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then(() => {
        onDelete(selectedItem.id);
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
    <Tooltip title="Delete">
            <Button onClick={handleClickOpen}>
    <DeleteIcon
      color="error"
      sx={{
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
    </Tooltip>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Delete History</DialogTitle>
    <DialogContent>
      <DialogContentText sx={{fontWeight:"500"}}>
        Are you sure you want to delete this history "{selectedItem.trans_number}"?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button color="error" onClick={() => handleDelete(selectedItem.id)} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Delete"}
      </Button>
    </DialogActions>
  </Dialog>
  </>
      
  );
};

export default DeleteHistory;
