import * as React from 'react';
import Http from '../../../../../services/Http';
import ToastNotification from '../../../../../components/ToastNotification';
import { handleErrorResponse } from '../../../../../utils/helpers';
import ToastNotificationContainer from '../../../../../components/ToastNotificationContainer';
import { Box, Button, Modal, Tooltip, Typography } from '@mui/material';
import FormFieldData from '../../../../../components/FormFieldData';
import Reevalidate from 'ree-validate-18';
import EditIcon from "@mui/icons-material/Edit";


const validator = new Reevalidate.Validator({
    service_name: 'required',
    description: "required",
    service_price: "required",
    image: "        ",
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
const inputStyle = {
    mb: 1,
  };

export default function EditServices(props) {
    const { selectedItem, loading, forceUpdate } = props;

    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [data, setData] = React.useState({
        values: {
            service_name: "",
            description: "",
            service_price:"",
            image: "",
        },
        errors: validator.errors,
    });
 

    React.useEffect(() => {
       
        if (selectedItem) {
            setData({
                values: {
                    service_name: selectedItem.service_name,
                    description: selectedItem.description,
                    service_price: selectedItem.service_price,
                    image: selectedItem.image,
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
                const formData = new FormData();
            formData.append('service_name', data.values.service_name);
            formData.append('description', data.values.description);
            formData.append('service_price', data.values.service_price);
            
            if (data.values.image instanceof File) {
                formData.append('image', data.values.image);
            }
                Http.put(`update/services/${selectedItem.id}`,{headers:{
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                  }}, data.values).then((res) => {
                    forceUpdate();
                    handleClose();
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
            <Tooltip title="Edit">
                <EditIcon 
                    onClick={handleOpen}
                    sx={{
                    m: 1,
                    fontsize: "30px",
                    cursor: "pointer",
                    color: "#0d6efd",
                    position: "relative",
                    left: "10px",
                    transition: ".5s",
                    "&:hover": {
                        color: "black",
                    },
                    }}
                />
            </Tooltip>
            <Modal
              
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit User
                    </Typography>
                     <FormFieldData
                        fullWidth
                        label="Service Name"
                        value={data.values.service_name}
                        name="service_name"
                        onChange={handleChange}
                        errors={data.errors}
                        sx={inputStyle}
                    />
                    <FormFieldData
                        fullWidth
                        label="Description"
                        value={data.values.description}
                        name="description"
                        onChange={handleChange}
                        // errors={data.errors}
                        sx={inputStyle}
                    />
                    <FormFieldData
                        fullWidth
                        label="Price"
                        value={data.values.service_price}
                        name="service_price"
                        onChange={handleChange}
                        errors={data.errors}
                        sx={inputStyle}
                    />
                    <FormFieldData
                        fullWidth
                        label="Image"
                        type="file"
                        // value={data.values.image}
                        name="image"
                        onChange={handleChange}
                        // errors={data.errors}
                        sx={inputStyle}
                    />
                    
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

