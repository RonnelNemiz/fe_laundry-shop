import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ShowPayMeth = ({ selectedItem, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} >
      <DialogTitle sx={{color:"#1976d2", fontWeight:"500", textAlign:"center"}}>Payment Method Details</DialogTitle>
      <DialogContent>
        <p> <b>Payment Method:</b> {selectedItem.payment_name}</p>
     
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowPayMeth;
