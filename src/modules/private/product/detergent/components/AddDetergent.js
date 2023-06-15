import * as React from "react";
import { Http } from './../../../../../services/Http';
import ToastNotification from './../../../../../components/ToastNotification';
import ToastNotificationContainer from './../../../../../components/ToastNotificationContainer';
import { Box, Button, Modal, Typography } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
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

export default function AddDetergent(props) {
  const { forceUpdate,  } = props;
  const [formValues, setFormValues] = React.useState({
    detergent_name: "",
    detergent_price: "",
    detergent_scoop: "",
    image: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const newData = { ...formValues };
    newData[e.target.name] = e.target.value;
    setFormValues(newData);
  };

  React.useEffect(() => {
    if (open) {
      setFormValues({
        detergent_name: "",
        detergent_price: "",
        detergent_scoop: "",
        image: "",
      });
     
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Http.post("/add/detergents",{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }}, formValues).then((res) => {
      if (res.data.status === 200) {
        forceUpdate();
        handleClose();
        ToastNotification("success", "Successfully Saved Data!", options);
      }else{
        ToastNotification('error', res.data.message, options);
      }
    })
      .catch((err) => {
        ToastNotification("error", err.message, options);
      });
  };


  return (
    <div>
      <ToastNotificationContainer />
      <AddBoxIcon         
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
            Add Detergent
          </Typography>
          <FormFieldData
            fullWidth
            label="Detergent"
            id="detergent_name"
            value={formValues.detergent_name}
            name="detergent_name"
            onChange={handleChange}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Price"
            type="number"
            id="detergent_price"
            value={formValues.detergent_price}
            name="detergent_price"
            onChange={handleChange}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Scoop"
            id="detergent_scoop"
            value={formValues.detergent_scoop}
            name="detergent_scoop"
            onChange={handleChange}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Image"
            id="image"
            value={formValues.image}
            name="image"
            onChange={handleChange}
            sx={inputStyle}
          />
         
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


