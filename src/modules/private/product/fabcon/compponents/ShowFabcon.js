import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ShowFabcon = ({ selectedItem, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} >
      <DialogTitle sx={{color:"#1976d2", fontWeight:"500", textAlign:"center"}}>Fabcons Details</DialogTitle>
      <DialogContent>
        <p> <b>Fabcon Name:</b> {selectedItem.fabcon_name}</p>
        <p> <b>Price:</b> {selectedItem.fabcon_price}</p>
        <p> <b>Cups:</b> {selectedItem.fabcon_scoop}</p>
        <p> <b>Image:</b> {selectedItem.image}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowFabcon;
