import React, { useState } from "react";
import {  Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "react-bootstrap";

const AmountModal = ({ isOpen, onClose, onSubmit }) => {
  const [amountValue, setAmountValue] = useState("");

  const handleSubmit = () => {
    onSubmit(amountValue);
  };
  const handleInputChange = (e) => {
    setAmountValue(e.target.value);
  };
  return (


  <Dialog open={isOpen} onClose={onClose}>
  <DialogTitle>Enter Amount</DialogTitle>
  <DialogContent>
    <input type="number"  label="Amount" value={amountValue} onChange={handleInputChange} />
  </DialogContent>
  <DialogActions>
    <Button onClick={onClose}>Cancel</Button>
    <Button onClick={handleSubmit}>Save</Button>
  </DialogActions>
</Dialog>
);
};

export default AmountModal;
