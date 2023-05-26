import React, { useState } from "react";
import {  Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "react-bootstrap";

const KiloModal = ({ isOpen, onClose, onSubmit }) => {
  const [kiloValue, setKiloValue] = useState("");

  const handleSubmit = () => {
    onSubmit(kiloValue);
  };
  const handleInputChange = (e) => {
    setKiloValue(e.target.value);
  };
  return (


  <Dialog open={isOpen} onClose={onClose}>
  <DialogTitle>Edit Kilo</DialogTitle>
  <DialogContent>
    <input type="number"  label="Kilo" value={kiloValue} onChange={handleInputChange} />
  </DialogContent>
  <DialogActions>
    <Button onClick={onClose}>Cancel</Button>
    <Button onClick={handleSubmit}>Save</Button>
  </DialogActions>
</Dialog>
);
};

export default KiloModal;
