import * as React from 'react';
import { Box, Button, Modal, Tooltip, Typography } from '@mui/material';
import Reevalidate from 'ree-validate-18';
import EditIcon from "@mui/icons-material/Edit";
import Http from '../../../../services/Http';
import ToastNotification from '../../../../components/ToastNotification';
import { handleErrorResponse } from '../../../../utils/helpers';
import ToastNotificationContainer from '../../../../components/ToastNotificationContainer';
import FormFieldData from '../../../../components/FormFieldData';


const validator = new Reevalidate.Validator({
    first_name: 'required',
    last_name: "required",
   
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

export default function EditOrders(props) {
    const { selectedItem, loading, forceUpdate } = props;

    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [data, setData] = React.useState({
        values: {
            first_name: "",
            last_name: "",
            purok:"",
            brgy:"",
            municipality:"",
            email:"",
            contact_number:"",

            handling_id:"",
            status:"",
            payment_status:"",
            payment_id:"",
            kilo:"",
            
            parent_id:"",
            quantity:"",


        },
        errors: validator.errors,
    });
 

    React.useEffect(() => {
       
        if (selectedItem) {
            setData({
                values: {
                    first_name: selectedItem.first_name,
                    last_name: selectedItem.last_name,
                    purok: selectedItem.purok,
                    brgy: selectedItem.brgy,
                    municipality: selectedItem.municipality,
                    email: selectedItem.email,
                    contact_number: selectedItem.contact_number,
                    handling_id: selectedItem.handling_id,
                    status: selectedItem.status,
                    payment_status: selectedItem.payment_status,
                    payment_id: selectedItem.payment_id,
                    kilo: selectedItem.kilo,
                    parent_id: selectedItem.parent_id,
                    quantity: selectedItem.quantity,
                    
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
                Http.put(`update/orders/${selectedItem.id}`, data.values).then((res) => {
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
                        label="First Name"
                        // id="handling_name"
                        value={data.values.first_name}
                        name="first_name"
                        onChange={handleChange}
                        errors={data.errors}
                        sx={inputStyle}
                    />
                    <FormFieldData
                        fullWidth
                        label="Last Name"
                        // id="handling_price"
                        value={data.values.last_name}
                        name="last_name"
                        onChange={handleChange}
                        // inputProps={{
                        //     maxLength: 11,
                        // }}
                        errors={data.errors}
                        sx={inputStyle}
                    />
                     <FormFieldData
                        fullWidth
                        label="Purok"
                        value={data.values.purok}
                        name="purok"
                        onChange={handleChange}
                        errors={data.errors}
                        sx={inputStyle}
                    />
                     <FormFieldData
                        fullWidth
                        label="Brgy"
                        value={data.values.brgy}
                        name="brgy"
                        onChange={handleChange}
                        errors={data.errors}
                        sx={inputStyle}
                    />``
                    
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


