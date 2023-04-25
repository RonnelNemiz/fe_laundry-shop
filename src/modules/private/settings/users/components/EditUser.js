import * as React from 'react';
import Http from '../../../../../services/Http';
import ToastNotification from '../../../../../components/ToastNotification';
import { handleErrorResponse } from '../../../../../utils/helpers';
import ToastNotificationContainer from '../../../../../components/ToastNotificationContainer';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import FormFieldData from '../../../../../components/FormFieldData';

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
const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    draggable: true,
    draggableDirection: 60,
    theme: "colored",
};

export default function EditUser(props) {
    const { open, onClose, selectedItem, loading, forceUpdate } = props;
    const [roles, setRoles] = React.useState([]);
    const [data, setData] = React.useState({
       values: {
            email: "",
            first_name: "",
            last_name: "",
            purok: "",
            brgy: "",
            municipality: "",
            contact_number: "",
            role: "",
            password: "",
        }
    });
    const handleRole = () => {
        Http.get("/roles").then((res) => {
            setRoles(res.data.roles);
        });
    };

    React.useEffect(() => {
        handleRole();
        if (selectedItem.user){
        setData({
            values:{
                email: selectedItem.user.email,
                first_name: selectedItem.first_name,
                last_name: selectedItem.last_name,
                purok: selectedItem.purok,
                brgy: selectedItem.brgy,
                municipality: selectedItem.municipality,
                contact_number: selectedItem.contact_number,
                role: selectedItem.user.role,
                password: selectedItem.user.password,
            }
            
        });
    }
    }, [selectedItem]);

    const handleChange = (e) => {
        const newData = e.target.name;
        const value = e.target.value;
        setData(prev => ({ ...prev, values: { ...prev.values, [newData]: value }, }));
    };
    const handleUpdate = () => {
        Http.put(`update/user/${selectedItem.user.id}`, data.values).then((res) => {
            forceUpdate();
            onClose();
            ToastNotification("success", "Successfully Saved Data", options);
        })
            .catch((err) => {
                ToastNotification("error", handleErrorResponse(err), options);
            });
    };
    console.log('Data: ',data.values);
    return (
        <>
            <ToastNotificationContainer />
            <Modal
                key={selectedItem.id}
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit User
                    </Typography>
                    <FormFieldData
                        fullWidth
                        label="Email"
                        id="email"
                        value={data.values.email}
                        type="email"
                        name="email"
                        onChange={handleChange}
                    />
                    <FormFieldData
                        fullWidth
                        label="First Name"
                        id="first_name"
                        value={data.values.first_name}
                        name="first_name"
                        onChange={handleChange}
                    />
                    <FormFieldData
                        fullWidth
                        label="Last Name"
                        id="last_name"
                        value={data.values.last_name}
                        name="last_name"
                        onChange={handleChange}
                    />
                    <FormFieldData
                        fullWidth
                        label="Purok"
                        id="purok"
                        value={data.values.purok}
                        name="purok"
                        onChange={handleChange}
                    />
                    <FormFieldData
                        fullWidth
                        label="Barangay"
                        id="brgy"
                        value={data.values.brgy}
                        name="brgy"
                        onChange={handleChange}
                  
                    />
                    <FormFieldData
                        fullWidth
                        label="Municipality"
                        id="municipality"
                        value={data.values.municipality}
                        name="municipality"
                        onChange={handleChange}
                    />
                    <FormFieldData
                        fullWidth
                        label="Contact Number"
                        id="contact_number"
                        value={data.values.contact_number}
                        name="contact_number"
                        onChange={handleChange}
                       
                    />
                    <FormControl
                        fullWidth
                        size="small"
                        variant="outlined"
                        margin="dense"
                     
                    >
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            name="role"
                            id="role"
                            label="Role"
                            value={data.values.role}
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
                        loading={loading}
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdate(selectedItem.id)}
                    >
                        Update
                    </Button>
                </Box>

            </Modal>
        </>
    );
}


