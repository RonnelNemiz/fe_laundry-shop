import * as React from 'react';
import Http from '../../../../../services/Http';
import ToastNotification from '../../../../../components/ToastNotification';
import { handleErrorResponse } from '../../../../../utils/helpers';
import ToastNotificationContainer from '../../../../../components/ToastNotificationContainer';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import FormFieldData from '../../../../../components/FormFieldData';
import Reevalidate from 'ree-validate-18';


const validator = new Reevalidate.Validator({
    email: 'required|email',
    first_name: 'required',
    last_name: "required",
    purok: "required",
    brgy: "required",
    municipality: "required",
    contact_number: "required|numeric",
    role: "required",
    password: "required|max:8",
});

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

export default function EditUsers(props) {
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
            land_mark:"Leyte",
            role: "",
        },
        errors: validator.errors,
    });
    const handleRole = () => {
        Http.get("/roles").then((res) => {
            console.log(res.data.roles);
            setRoles(res.data.roles);
        });
    };

    React.useEffect(() => {
        handleRole();
        if (selectedItem.profile) {
            setData({
                values: {
                    email: selectedItem.email,
                    first_name: selectedItem.profile[0].first_name,
                    last_name: selectedItem.profile[0].last_name,
                    purok: selectedItem.profile[0].purok,
                    brgy: selectedItem.profile[0].brgy,
                    municipality: selectedItem.profile[0].municipality,
                    contact_number: selectedItem.profile[0].contact_number,
                    role: selectedItem.role,
                }

            });
        }
    }, [selectedItem]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData(prev => ({ ...prev, values: { ...prev.values, [name]: value }, }));

        const { errors } = validator;

        validator.validate(name, value).then(success => {
            if (!success) {
                setData(prev => ({
                    ...prev,
                    errors: errors
                }));
            }
        })
    };
    const handleUpdate = () => {
        validator.validateAll(data.values).then(success => {
            if (success) {
                Http.put(`update/user/${selectedItem.id}`, data.values).then((res) => {
                    forceUpdate();
                    onClose();
                    ToastNotification("success", "Successfully Saved Data", options);
                })
                    .catch((err) => {
                        ToastNotification("error", handleErrorResponse(err), options);
                    });
            }
            setData(prev => ({
                ...prev,
                errors: validator.errors
            }));
        })

    };

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
                        errors={data.errors}
                    />
                    <FormFieldData
                        fullWidth
                        label="First Name"
                        id="first_name"
                        value={data.values.first_name}
                        name="first_name"
                        onChange={handleChange}
                        errors={data.errors}
                    />
                    <FormFieldData
                        fullWidth
                        label="Last Name"
                        id="last_name"
                        value={data.values.last_name}
                        name="last_name"
                        onChange={handleChange}
                        errors={data.errors}
                    />
                    <FormFieldData
                        fullWidth
                        label="Purok"
                        id="purok"
                        value={data.values.purok}
                        name="purok"
                        onChange={handleChange}
                        errors={data.errors}
                    />
                    <FormFieldData
                        fullWidth
                        label="Barangay"
                        id="brgy"
                        value={data.values.brgy}
                        name="brgy"
                        onChange={handleChange}
                        errors={data.errors}

                    />
                    <FormFieldData
                        fullWidth
                        label="Municipality"
                        id="municipality"
                        value={data.values.municipality}
                        name="municipality"
                        onChange={handleChange}
                        errors={data.errors}
                    />
                    <FormFieldData
                        fullWidth
                        label="Contact Number"
                        id="contact_number"
                        value={data.values.contact_number}
                        name="contact_number"
                        onChange={handleChange}
                        errors={data.errors}
                        inputProps={{
                            maxLength: 11,
                        }}

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
                            errors={data.errors}
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
