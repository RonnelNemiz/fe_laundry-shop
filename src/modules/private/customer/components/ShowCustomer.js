import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import Http from "../../../../services/Http";

function ShowCustomer({ open, onClose, customer }) {
  const [loading, setLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    if (customer) {
      setLoading(true);
      Http.get(`/show/users/${customer.id}`)
        .then((res) => {
          setCustomerDetails(res.data);
          setLoading(false);
        })
        .catch((error) => {
          // Handle error
          setLoading(false);
        });
    }
  }, [customer]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!customerDetails) {
    return <div>No customer details available</div>;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Customer Details</DialogTitle>
      <DialogContent>
        <Typography>Email: {customerDetails.email}</Typography>
        <Typography>
          First Name: {customerDetails.profile[0]?.first_name}
        </Typography>
        <Typography>
          Last Name: {customerDetails.profile[0]?.last_name}
        </Typography>
        <Typography>
          Contact Number: {customerDetails.profile[0]?.contact_number}
        </Typography>
        <img src={customerDetails.profile[0]?.image_url} alt="Customer Image" />
      </DialogContent>
    </Dialog>
  );
}

export default ShowCustomer;
