import React, { useState } from "react";
import {  Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "react-bootstrap";

const ChangeModal = ({ isOpen, onClose, onSubmit }) => {
  const [changeValue, setChangeValue] = useState("");

  const handleSubmit = () => {
    onSubmit(changeValue);
  };
  const handleInputChange = (e) => {
    setChangeValue(e.target.value);
  };
  return (


  <Dialog open={isOpen} onClose={onClose}>
  <DialogTitle>Enter Change</DialogTitle>
  <DialogContent>
    <input type="number"  label="Change" value={changeValue} onChange={handleInputChange} />
  </DialogContent>
  <DialogActions>
    <Button onClick={onClose}>Cancel</Button>
    <Button onClick={handleSubmit}>Save</Button>
  </DialogActions>
</Dialog>
);
};

export default ChangeModal;
