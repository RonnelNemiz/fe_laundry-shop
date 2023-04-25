import * as React from "react";
import { Http } from './../../../../../services/Http';
import ToastNotification from './../../../../../components/ToastNotification';
import ToastNotificationContainer from './../../../../../components/ToastNotificationContainer';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material";
import { handleErrorResponse } from "../../../../../utils/helpers";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FormFieldData from "../../../../../components/FormFieldData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderColor: "none",
  borderRadius: "10px 10px",
};
const inputStyle = {
  mb: 1,
};
const options = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  draggable: true,
  draggableDirection: 60,
  theme: "colored",
};

export default function AddUser() {
  const [formValues, setFormValues] = React.useState({
    email: "",
    first_name: "",
    last_name: "",
    purok: "",
    brgy: "",
    municipality: "",
    contact_number: "",
    role: "",
    password: "password123",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [roles, setRoles] = React.useState([]);


  React.useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    Http.get('roles').then(res => {
      setRoles(res.data.roles)
    }).catch(err => {
      console.log(err)
    });
  }

  const handleChange = (e) => {
    const newData = { ...formValues };
    newData[e.target.name] = e.target.value;
    setFormValues(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Http.post("/add/users", formValues).then((res) => {
      if (res.data.status === 200) {
        handleClose();
        ToastNotification("success", "Successfully Saved Data!", options);
      }else{
        ToastNotification('error', res.data.message, options);
      }
    })
      .catch((err) => {
        ToastNotification("error", handleErrorResponse(err), options);
      });
  };


  return (
    <div>
      <ToastNotificationContainer />
      <PersonAddIcon
        onClick={handleOpen}
        sx={{
          m: 1,
          fontsize: "30px",
          cursor: "pointer",
          color: "gray",
          position: "relative",
          left: "10px",
          transition: ".5s",
          "&:hover": {
            color: "black",
          },
        }}
      />
      <Modal open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add User
          </Typography>
          <FormFieldData
            fullWidth
            label="Email"
            id="email"
            value={formValues.email}
            type="email"
            name="email"
            onChange={handleChange}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="First Name"
            id="first_name"
            value={formValues.first_name}
            name="first_name"
            onChange={handleChange}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Last Name"
            id="last_name"
            value={formValues.last_name}
            name="last_name"
            onChange={handleChange}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Purok"
            id="purok"
            value={formValues.purok}
            name="purok"
            onChange={handleChange}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Barangay"
            id="brgy"
            value={formValues.brgy}
            name="brgy"
            onChange={handleChange}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Municipality"
            id="municipality"
            value={formValues.municipality}
            name="municipality"
            onChange={handleChange}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Contact Number"
            id="contact_number"
            value={formValues.contact_number}
            name="contact_number"
            onChange={handleChange}
            sx={inputStyle}
          />
          <FormControl
            fullWidth
            size="small"
            variant="outlined"
            margin="dense"
            sx={inputStyle}
          >
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              id="role"
              label="Role"
              value={formValues.role}
              onChange={handleChange}
            >
              {roles.map((role) => {
                return (
                  <MenuItem key={role.id} value={role.name} id="role">
                    {role.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}


