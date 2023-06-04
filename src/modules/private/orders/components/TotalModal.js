import React, { useState } from "react";
import {  Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "react-bootstrap";

const TotalModal = ({ isOpen, onClose, onSubmit }) => {
  const [totalValue, setTotalValue] = useState("");

  const handleSubmit = () => {
    onSubmit(totalValue);
  };
  const handleInputChange = (e) => {
    setTotalValue(e.target.value);
  };
  return (


  <Dialog open={isOpen} onClose={onClose}>
  <DialogTitle>Enter Total</DialogTitle>
  <DialogContent>
    <input type="number"  label="Kilo" value={totalValue} onChange={handleInputChange} />
  </DialogContent>
  <DialogActions>
    <Button onClick={onClose}>Cancel</Button>
    <Button onClick={handleSubmit}>Save</Button>
  </DialogActions>
</Dialog>
);
};

export default TotalModal;
