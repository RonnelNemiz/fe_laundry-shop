import * as React from "react";
import Http from "../../../../services/Http";
import ToastNotification from "../../../../components/ToastNotification";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FormFieldData from "../../../../components/FormFieldData";
import SelectDropdown from "../../../../components/SelectDropdown";
import ReeValidate from "ree-validate-18";

const validator = new ReeValidate.Validator({
  name: "required",
  service_id: "required",
  price: "required",
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

export default function AddCategory(props) {
  const { forceUpdate } = props;

  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    values: {
      name: "",
      service_id: "",
      price: "",
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

  const handleSubmit = () => {
    setLoading(true);
    Http.post("/add/item-categories", formValues.values)
      .then((res) => {
        if (res.data.status === 200) {
          ToastNotification("success", "Successfully Saved Data!", options);
          forceUpdate();
          handleClose();
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

  React.useEffect(() => {
    handleServicestoselect();
  }, []);

  const handleServicestoselect = () => {
    Http.get("/show/servicestoselect")
      .then((res) => {
        //   console.log(res.data.services);
        setServices(res.data.services);
      })
      .catch((err) => {
        console.log(err);
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
            Add Category
          </Typography>
          <Box component="form">
            <FormFieldData
              required
              fullWidth
              label="Category"
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
              label="Price"
              id="price"
              value={formValues.values.price}
              name="price"
              onChange={handleChange}
              errors={formValues.errors}
              sx={inputStyle}
            />
            <FormControl
              fullWidth
              size="small"
              variant="outlined"
              margin="dense"
            >
              <InputLabel id="service-label">Service</InputLabel>
              <Select
                labelId="service-label"
                name="service_id"
                id="service_id"
                label="Service"
                value={formValues.values.service_id}
                onChange={handleChange}
                errors={formValues.errors}
              >
                {services?.map((service) => {
                  return (
                    <MenuItem key={service.id} value={service.id} id="service">
                      {service.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
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
