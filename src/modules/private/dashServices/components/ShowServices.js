import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ShowServices = ({ selectedItem, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} >
      <DialogTitle sx={{color:"#1976d2", fontWeight:"500", textAlign:"center"}}>Services Details</DialogTitle>
      <DialogContent>
        <p> <b>Services Name:</b> {selectedItem.service_name}</p>
        <p> <b>Description:</b> {selectedItem.description}</p>
        <p> <b>Image:</b> {selectedItem.image}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowServices;
