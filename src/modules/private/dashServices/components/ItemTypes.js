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
import SelectDropdown from "../../../../components/SelectDropdown";

const validator = new ReeValidate.Validator({
  type: "required",
  category: "required",
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

export default function ItemTypes(props) {
  const { forceUpdate, categories } = props;

  const [loading, setLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    values: {
      type: "",
      category: "",
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
    setLoading(true);
    Http.post("/add/itemTypes", formValues.values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        if (res.data.status === 200) {
          forceUpdate();
          handleClose();
          ToastNotification("success", "Successfully Saved Data!", options);
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
            Add Category Type
          </Typography>
          <Box component="form">
            <FormFieldData
              required
              fullWidth
              label="Category Type"
              value={formValues.values.type}
              name="type"
              onChange={handleChange}
              errors={formValues.errors}
              sx={inputStyle}
            />
            <SelectDropdown
              sx={{ mb: 1 }}
              fullWidth
              label="Category"
              name="category"
              categories={categories && categories}
              value={formValues.values.category}
              onChange={handleChange}
              errors={formValues.errors}
              required
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleValidate}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : " Submit"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
