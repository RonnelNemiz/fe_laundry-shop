import * as React from "react";
import Http from "../../../../services/Http";
import ToastNotification from "../../../../components/ToastNotification";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import FormFieldData from "../../../../components/FormFieldData";
import ReeValidate from "ree-validate-18";

const validator = new ReeValidate.Validator({
  name: "required",
  description: "required",
  price: "required",
  image: "required",
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

export default function EditService(props) {
  const { forceUpdate, item, open, onClose } = props;

  const [loading, setLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    values: {
      name: "",
      description: "",
      price: "",
      image: "",
    },
    errors: validator.errors,
  });

  React.useEffect(() => {
    if (item) {
      setFormValues((prev) => ({
        ...prev,
        values: {
          ...item,
        },
      }));
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));

    const { errors } = props;

    validator.validate(name, value).then((success) => {
      if (!success) {
        setFormValues((prev) => ({
          ...prev,
          errors: errors,
        }));
      }
    });
  };

  const handleUpdate = () => {
    setLoading(true);
    Http.post(`/update/categories,${item.id}`, formValues.values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        if (res.data.status === 200) {
          ToastNotification("success", "Successfully Saved Data!", options);
          forceUpdate();
          onClose();
        } else {
          ToastNotification("error", res.data.message, options);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        ToastNotification("error", err.message, options);
      });
  };

  const handleValidate = () => {
    validator.validateAll(formValues.values).then((success) => {
      if (success) {
        handleUpdate();
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
      <Modal
        open={open}
        onClose={onClose}
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
            Update Service
          </Typography>
          <Box component="form">
            <FormFieldData
              required
              fullWidth
              label="Service Name"
              id="name"
              value={formValues.values.name}
              name="name"
              onChange={handleChange}
              errors={formValues.errors}
              sx={inputStyle}
            />
            <FormFieldData
              required
              fullWidth
              label="Service Description"
              id="name"
              value={formValues.values.description}
              name="description"
              onChange={handleChange}
              errors={formValues.errors}
              sx={inputStyle}
              multiline
              rows={6}
            />
            <FormFieldData
              required
              fullWidth
              label="Image"
              id="name"
              value={formValues.values.image}
              name="image"
              onChange={handleChange}
              errors={formValues.errors}
              sx={inputStyle}
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleValidate}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
