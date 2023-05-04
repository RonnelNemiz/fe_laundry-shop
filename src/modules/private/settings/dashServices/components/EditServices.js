import * as React from 'react';
import Http from '../../../../../services/Http';
import ToastNotification from '../../../../../components/ToastNotification';
import { handleErrorResponse } from '../../../../../utils/helpers';
import ToastNotificationContainer from '../../../../../components/ToastNotificationContainer';
import { Box, Button, Modal, Typography } from '@mui/material';
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

export default function EditServices(props) {
    const { open, onClose, selectedItem, loading, forceUpdate } = props;
    const [data, setData] = React.useState({
       values: {
            name: "",
            description: "",
            price_value: "",
            image: "",
        }
    });
   

    React.useEffect(() => {
        if (selectedItem.price){
        setData({
            values:{
                name: selectedItem.name,
                description: selectedItem.description,
                price_value: selectedItem.price[0].price_value,
                image: selectedItem.image,
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
        Http.put(`update/service/${selectedItem.id}`, data.values).then((res) => {
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
                        Edit Services
                    </Typography>
                    <FormFieldData
                        fullWidth
                        label="Service Name"
                        id="name"
                        value={data.values.name}
                        name="name"
                        onChange={handleChange}
                    />
                    <FormFieldData
                        fullWidth
                        label="Description"
                        id="description"
                        value={data.values.description}
                        name="description"
                        onChange={handleChange}
                    />
                     <FormFieldData
                        fullWidth
                        label="Price"
                        id="price_value"
                        type="number"
                        value={data.values.price_value}
                        name="price_value"
                        onChange={handleChange}
                    />
                    <FormFieldData
                        fullWidth
                        label="Image"
                        id="image"
                        value={data.values.image}
                        name="image"
                        onChange={handleChange}
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


