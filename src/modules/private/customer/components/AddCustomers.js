import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Http from "../../../../services/Http";
import ToastNotification from "../../../../components/ToastNotification";
import { handleErrorResponse } from "../../../../utils/helpers";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";
import FormFieldData from "../../../../components/FormFieldData";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styled from "@emotion/styled";

const CssInput = styled(FormControl)({
  "& .MuiInput-input": {
    color: "black",
  },
  "& .MuiSvgIcon-root": {
    color: "blue",
  },
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
  height: "90% !important",
  overflowX: "auto !important",
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

export default function AddCustomers(props) {
  const { forceUpdate } = props;
  const [formValues, setFormValues] = React.useState({
    image: null,
    email: "",
    first_name: "",
    last_name: "",
    purok: "",
    brgy: "",
    municipality: "",
    contact_number: "",
    land_mark: "",
    role_id: 4,
    password: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState("");

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const newData = { ...formValues };
    newData[e.target.name] = e.target.value;
    setFormValues(newData);
  };

  React.useEffect(() => {
    if (open) {
      setFormValues({
        image: null,
        email: "",
        first_name: "",
        last_name: "",
        purok: "",
        brgy: "",
        municipality: "",
        contact_number: "",
        land_mark: "",
        role_id: 4,
        password: "",
      });
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Http.post("/add/customer", formValues)
      .then((res) => {
        if (res.data.status === 200) {
          forceUpdate();
          handleClose();
          ToastNotification("success", "Successfully Saved Data!", options);
        } else {
          ToastNotification("error", res.data.message, options);
        }
      })
      .catch((err) => {
        ToastNotification("error", handleErrorResponse(err), options);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const newData = { ...formValues };
    newData.image = file;
    setFormValues(newData);

    // Generate image preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Customers
          </Typography>
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
          <FormFieldData
            fullWidth
            label="Landmark"
            id="land_mark"
            value={formValues.land_mark}
            name="land_mark"
            onChange={handleChange}
            sx={inputStyle}
          />
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
          <CssInput fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={formValues.password}
              name="password"
              onChange={handleChange}
              fullWidth
              sx={inputStyle}
            />
          </CssInput>
          <Typography>Image</Typography>
          <FormFieldData
            fullWidth
            label="Image"
            id="image"
            name="image"
            type="file"
            inputProps={{
              accept: "image/*",
              onChange: handleImageChange,
            }}
            sx={inputStyle}
          />

          {imagePreviewUrl && (
            <img
              src={imagePreviewUrl}
              alt="Preview"
              style={{ maxWidth: "50%", marginTop: 5 }}
            />
          )}
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
