import React, { useState } from "react";
import {  Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "react-bootstrap";

const RefNumModal = ({ isOpen, onClose, onSubmit }) => {
  const [refValue, setRefValue] = useState("");

  const handleSubmit = () => {
    onSubmit(refValue);
  };
  const handleInputChange = (e) => {
    setRefValue(e.target.value);
  };
  return (


  <Dialog open={isOpen} onClose={onClose}>
  <DialogTitle>Enter Reference No.</DialogTitle>
  <DialogContent>
    <input type="number"  label="Reference#" value={refValue} onChange={handleInputChange} />
  </DialogContent>
  <DialogActions>
    <Button onClick={onClose}>Cancel</Button>
    <Button onClick={handleSubmit}>Save</Button>
  </DialogActions>
</Dialog>
);
};

export default RefNumModal;
