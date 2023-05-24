import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import "../../../../assets/css/admin.css";

const ShowCustomer = ({ showCustomer, onClose }) => {
  if (!showCustomer) {
    return <div>...</div>;
  }

  return (
    <>
      <Dialog open={true} onClose={onClose}  >
      <DialogTitle sx={{color:"#1976d2", fontWeight:"500", textAlign:"center"}}>Customer Details</DialogTitle>
      <DialogContent>
      <p><b>Email:</b> {showCustomer.email}</p>
      <p><b>First Name:</b> {showCustomer.profile && showCustomer.profile[0].first_name}</p>
      <p><b>Last Name:</b> {showCustomer.profile && showCustomer.profile[0].last_name}</p>
      <p><b>Purok:</b> {showCustomer.profile && showCustomer.profile[0].purok}</p>
      <p><b>Barangay:</b> {showCustomer.profile && showCustomer.profile[0].brgy}</p>
      <p><b>Municipality:</b> {showCustomer.profile && showCustomer.profile[0].municipality}</p>
      <p><b>Landmark:</b> {showCustomer.profile && showCustomer.profile[0].land_mark}</p>
      <p><b>Contact Number:</b> {showCustomer.profile && showCustomer.profile[0].contact_number}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default ShowCustomer;
