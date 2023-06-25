import * as React from "react";
import Http from "../../../../services/Http";
import ToastNotification from "../../../../components/ToastNotification";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FormFieldData from "../../../../components/FormFieldData";
import ReeValidate from "ree-validate-18";

const validator = new ReeValidate.Validator({
  service_name: "required",
  service_price: "required",
  description: "required",
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

export default function AddServices(props) {
  const { forceUpdate } = props;

  const [loading, setLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    values: {
      service_name: "",
      service_price: "",
      description: "",
      image: "",
    },
    errors: validator.errors,
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));

    const { errors } = validator;

    validator.validate(name, value).then((success) => {
      if (!success) {
        setFormValues((prev) => ({
          ...prev,
          errors: errors,
        }));
      }
    });
  };

  const handleSubmit = () => {
    Http.post("/add/services", formValues.values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        if (res.data.status === 200) {
          ToastNotification("success", "Successfully Saved Data!", options);
          forceUpdate();
          handleClose();
        } else {
          ToastNotification("error", res.data.message, options);
        }
      })
      .catch((err) => {
        ToastNotification("error", err.message, options);
      });
  };

  const handleValidate = () => {
    validator.validateAll(formValues.values).then((success) => {
      if (success) {
        handleSubmit();
      } else {
        setFormValues((prev) => ({
          ...prev,
          errors: validator.errors,
        }));
      }
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 1 }}
          >
            Add Services
          </Typography>
          <FormFieldData
            fullWidth
            label="Service"
            id="service_name"
            value={formValues.values.service_name}
            name="service_name"
            onChange={handleChange}
            errors={formValues.errors}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Price"
            type="number"
            id="service_price"
            value={formValues.values.service_price}
            name="service_price"
            onChange={handleChange}
            errors={formValues.errors}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Description"
            id="description"
            value={formValues.values.description}
            name="description"
            onChange={handleChange}
            errors={formValues.errors}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Image"
            id="image"
            value={formValues.values.image}
            name="image"
            onChange={handleChange}
            errors={formValues.errors}
            sx={inputStyle}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleValidate}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
