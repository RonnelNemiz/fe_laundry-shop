import React, { useState } from 'react';
import { TextField, Button, Modal, Box } from '@mui/material';
import FormFieldData from '../../../../components/FormFieldData';

const inputStyle = {
  mb: 2,
};

const UpdateProfile = ({ selectedItem, onEdit, forceUpdate, customerAccount, setCustomerAccount }) => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(selectedItem);
  // const [email, setEmail] = useState(customerAccount?.email || '');
  // const [password, setPassword] = useState(customerAccount?.password || '');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // const updatedProfile = {
    //   ...profile,
    //   // email: email,
    //   // password: password,
    // };

    onEdit(profile);
    setEditMode(false);
    forceUpdate();
    setCustomerAccount((prevAccount) => ({
      ...prevAccount,
      // email: email,
      // password: password,
      profile: [{ ...profile }],
    }));
  };

  const handleClose = () => {
    setEditMode(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleEdit}>
        Edit
      </Button>
      <Modal open={editMode} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflowX:'auto',
            height:'85vh',
          }}
        >
          <FormFieldData
          fullWidth
            name="first_name"
            label="First Name"
            value={profile.first_name}
            onChange={handleInputChange}
            sx={inputStyle}
          />
          <FormFieldData
          fullWidth
            name="last_name"
            label="Last Name"
            value={profile.last_name}
            onChange={handleInputChange}
            sx={inputStyle}
          />
          <FormFieldData
          fullWidth
            name="purok"
            label="Purok"
            value={profile.purok}
            onChange={handleInputChange}
            sx={inputStyle}
          />
          <FormFieldData
          fullWidth
            name="brgy"
            label="Barangay"
            value={profile.brgy}
            onChange={handleInputChange}
            sx={inputStyle}
          />
          <FormFieldData
          fullWidth
            name="municipality"
            label="Municipality"
            value={profile.municipality}
            onChange={handleInputChange}
            sx={inputStyle}
          />
          <FormFieldData
          fullWidth
            name="contact_number"
            label="Contact Number"
            value={profile.contact_number}
            onChange={handleInputChange}
            sx={inputStyle}
          />
          <FormFieldData
          fullWidth
            name="land_mark"
            label="Land Mark"
            value={profile.land_mark}
            onChange={handleInputChange}
            sx={inputStyle}
          />
          <FormFieldData
          fullWidth
            name="email"
            label="Email"
            value={profile.email}
            onChange={handleInputChange}
            sx={inputStyle}
            />

            <FormFieldData
            fullWidth
            name="password"
            label="Password"
            value={profile.password}
            onChange={handleInputChange}
            sx={inputStyle}
            />

          {/* Add input fields for other profile attributes */}
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateProfile;
