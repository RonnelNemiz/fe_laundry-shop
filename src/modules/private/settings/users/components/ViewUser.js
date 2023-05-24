import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import "../../../../../assets/css/admin.css";

const ViewUser = ({ viewUser, onClose, profileImage }) => {
  if (!viewUser) {
    return <div>...</div>;
  }

 
  return (
    <>
      <Dialog open={true} onClose={onClose}  >
      <DialogTitle sx={{color:"#1976d2", fontWeight:"500", textAlign:"center"}}>User Details</DialogTitle>
      <DialogContent>
      <p><b>Email:</b> {viewUser.email}</p>
      <p><b>First Name:</b> {viewUser.profile && viewUser.profile[0].first_name}</p>
      <p><b>Last Name:</b> {viewUser.profile && viewUser.profile[0].last_name}</p>
      <p><b>Purok:</b> {viewUser.profile && viewUser.profile[0].purok}</p>
      <p><b>Barangay:</b> {viewUser.profile && viewUser.profile[0].brgy}</p>
      <p><b>Municipality:</b> {viewUser.profile && viewUser.profile[0].municipality}</p>
      <p><b>Landmark:</b> {viewUser.profile && viewUser.profile[0].land_mark}</p>
      <p><b>Contact Number:</b> {viewUser.profile && viewUser.profile[0].contact_number}</p>
      <p><b>Image:</b> {viewUser.profile && viewUser.profile[0].image}</p>
     
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default ViewUser;
