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

export default function AddFabcon(props) {
  const { forceUpdate,  } = props;
  const [formValues, setFormValues] = React.useState({
    fabcon_name: "",
    fabcon_price: "",
    fabcon_scoop: "",
    image: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  

  const handleChange = (e) => {
    const newData = { ...formValues };
    newData[e.target.name] = e.target.value;
    setFormValues(newData);
  };

  React.useEffect(() => {
    if (open) {
      setFormValues({
        fabcon_name: "",
        fabcon_price: "",
        fabcon_scoop: "",
        image: "",
      });
     
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedImage);
  
    for (const key in formValues) {
      formData.append(key, formValues[key]);
      formData.append('image', selectedImage);

    }
    Http.post("/add/fabcons",{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }},  formData).then((res) => {
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
            Add Fabcon
          </Typography>
          <FormFieldData
            fullWidth
            label="Fabcon"
            id="fabcon_name"
            value={formValues.fabcon_name}
            name="fabcon_name"
            onChange={handleChange}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Price"
            type="number"
            id="fabcon_price"
            value={formValues.fabcon_price}
            name="fabcon_price"
            onChange={handleChange}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Cups"
            id="fabcon_scoop"
            value={formValues.fabcon_scoop}
            name="fabcon_scoop"
            onChange={handleChange}
            sx={inputStyle}
          />
          {/* <FormFieldData
            fullWidth
            label="Image"
            id="image"
            value={formValues.image}
            name="image"
            type="file"
            // onChange={handleChange}
            onChange={handleImageSelect}
            sx={inputStyle}
          /> */}
                  <label htmlFor="image">
              Image:
              <input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                onChange={handleImageSelect}
              />
            </label>
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


