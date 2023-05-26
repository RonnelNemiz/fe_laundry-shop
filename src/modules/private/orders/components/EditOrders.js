import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FormFieldData from "../../../../components/FormFieldData";
import Http from "../../../../services/Http";
import { FormControl } from "react-bootstrap";

const EditOrders = ({ order, onClose, onUpdate }) => {
  const [editedOrder, setEditedOrder] = useState(order);
//   const [handlingOptions, setHandlingOptions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      user: {
        profile: {
          ...prevOrder.user.profile,
          [name]: value,
        },
      },
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    Http.put(`/orders/${editedOrder.id}`, editedOrder)
      .then(() => {
        onUpdate();
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
//   const handleHandling = () => {
//     Http.get("/show/handlings").then((res) => {
//       setHandling(res.data.handling);
//     });
//   };
// React.useEffect(() => {
//     const handleHandling = () => {
//       Http.get("/show/handlings")
//         .then((res) => {
//           setHandlingOptions(res.data.handling);
//         })
//         .catch((err) => {
//           console.log(err);
//           // Handle the error appropriately
//         });
//     };
  
//     handleHandling();
//   }, []);
  

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Order</DialogTitle>
      <DialogContent  sx={{ overflowY: "auto", maxHeight: "800px" }}>
        <form onSubmit={handleFormSubmit}>
        
          <FormFieldData
            name="first_name"
            label="First Name"
            value={editedOrder.user.profile?.first_name }
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
           <FormFieldData
            name="last_name"
            label="Last Name"
            value={editedOrder.user.profile?.last_name }
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
           <FormFieldData
            name="purok"
            label="Purok"
            value={editedOrder.user.profile?.purok}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
           <FormFieldData
            name="brgy"
            label="Barangay"
            value={editedOrder.user.profile?.brgy}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
           <FormFieldData
            name="municipality"
            label="Municipality"
            value={editedOrder.user.profile?.municipality}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
           <FormFieldData
            name="contact_number"
            label="Contact Number"
            value={editedOrder.user.profile?.contact_number }
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
           <FormFieldData
            name="email"
            label="Email"
            value={editedOrder.user.email }
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
         {/* <FormControl fullWidth size="small" variant="outlined" margin="dense">
            <InputLabel id="handling-label">Handling</InputLabel>
            <Select
                labelId="handling-label"
                name="handling_id"
                id="handling_id"
                label="Handling"
                value={editedOrder.handling_id}
                onChange={handleInputChange}
            >
                {handlingOptions.map((handling) => (
                <MenuItem key={handling.id} value={handling.id}>
                    {handling.handling_name}
                </MenuItem>
                ))}
            </Select>
            </FormControl> */}

      
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
