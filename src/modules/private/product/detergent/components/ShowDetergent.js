import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ShowDetergent = ({ selectedItem, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} >
      <DialogTitle sx={{color:"#1976d2", fontWeight:"500", textAlign:"center"}}>Fabcons Details</DialogTitle>
      <DialogContent>
        <p> <b>Detergent:</b> {selectedItem.detergent_name}</p>
        <p> <b>Price:</b> {selectedItem.detergent_price}</p>
        <p> <b>Scoop:</b> {selectedItem.detergent_scoop}</p>
        <p> <b>Image:</b> {selectedItem.image}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowDetergent;
