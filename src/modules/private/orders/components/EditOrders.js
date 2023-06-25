import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import FormFieldData from "../../../../components/FormFieldData";
import Http from "../../../../services/Http";

const EditOrders = (props) => {
  const { open, order, onClose } = props;
  const [editedOrder, setEditedOrder] = useState({
    email: "",
    first_name: "",
    last_name: "",
    purok: "",
    brgy: "",
    municipality: "",
    contact_number: "",
  });

  React.useEffect(() => {
    if (order) {
      console.log(order);
      setEditedOrder({
        email: order.user?.email,
        first_name: order.user?.profile.first_name,
        last_name: order.user?.profile.last_name,
        purok: order.user?.profile.purok,
        brgy: order.user?.profile.brgy,
        municipality: order.user?.profile.municipality,
        contact_number: order.user?.profile.contact_number,
      });
    }
  }, [order]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEditedOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    Http.post(
      `update/orders/${order.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
      editedOrder
    )
      .then((res) => {
        if (res.data) {
          onClose();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Order</DialogTitle>
      <DialogContent sx={{ overflowY: "auto", maxHeight: "800px" }}>
        <form onSubmit={handleFormSubmit}>
          <FormFieldData
            name="first_name"
            label="First Name"
            value={order && editedOrder && editedOrder.first_name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormFieldData
            name="last_name"
            label="Last Name"
            value={order && editedOrder && editedOrder.last_name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormFieldData
            name="purok"
            label="Purok"
            value={order && editedOrder && editedOrder.purok}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormFieldData
            name="brgy"
            label="Barangay"
            value={order && editedOrder && editedOrder.brgy}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormFieldData
            name="municipality"
            label="Municipality"
            value={order && editedOrder && editedOrder.municipality}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormFieldData
            name="contact_number"
            label="Contact Number"
            value={order && editedOrder && editedOrder.contact_number}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormFieldData
            name="email"
            label="Email"
            value={order && editedOrder && editedOrder.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleFormSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrders;
