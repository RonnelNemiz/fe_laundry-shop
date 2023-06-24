import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ShowHandling = ({ selectedItem, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} >
      <DialogTitle sx={{color:"#1976d2", fontWeight:"500", textAlign:"center"}}>Handling Details</DialogTitle>
      <DialogContent>
        <p> <b>Handling Name:</b> {selectedItem.handling_name}</p>
        <p> <b>Handling Price:</b> {selectedItem.handling_price}</p>
     
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowHandling;
