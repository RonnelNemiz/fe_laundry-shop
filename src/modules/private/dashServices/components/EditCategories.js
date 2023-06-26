import * as React from "react";
import Http from "../../../../services/Http";
import ToastNotification from "../../../../components/ToastNotification";
import { handleErrorResponse } from "../../../../utils/helpers";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import FormFieldData from "../../../../components/FormFieldData";
import Reevalidate from "ree-validate-18";

const validator = new Reevalidate.Validator({
  name: "required",
  price: "required|numeric",
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

export default function EditCategories(props) {
  const { open, onClose, category, forceUpdate } = props;

  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    values: {
      name: "",
      service_id: "",
      price: "",
    },
    errors: validator.errors,
  });

  const handleServicestoselect = () => {
    Http.get("/show/servicestoselect").then((res) => {
      //   console.log(res.data.services);
      setServices(res.data.services);
    });
  };

  React.useEffect(() => {
    handleServicestoselect();
    if (category) {
      setData({
        values: {
          name: category.name,
          service_id: category?.service_id,
          price: category.price,
        },
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({ ...prev, values: { ...prev.values, [name]: value } }));

    const { errors } = validator;

    validator.validate(name, value).then((success) => {
      if (!success) {
        setData((prev) => ({
          ...prev,
          errors: errors,
        }));
      }
    });
  };
  const handleUpdate = () => {
    validator.validateAll(data.values).then((success) => {
      if (success) {
        Http.put(`update/item-categories/${category.id}`, data.values)
          .then((res) => {
            forceUpdate();
            onClose();
            ToastNotification("success", "Successfully Saved Data", options);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            ToastNotification("error", handleErrorResponse(err), options);
          });
      }
      setData((prev) => ({
        ...prev,
        errors: validator.errors,
      }));
    });
  };

  return (
    <>
      <ToastNotificationContainer />
      <Modal
        key={category?.id}
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit User
          </Typography>
          <FormFieldData
            fullWidth
            label="Name"
            value={data.values.name}
            name="name"
            onChange={handleChange}
            errors={data.errors}
            sx={inputStyle}
          />

          <FormFieldData
            fullWidth
            label="Price"
            // id="price"
            value={data.values.price}
            name="price"
            onChange={handleChange}
            inputProps={{
              maxLength: 11,
            }}
            errors={data.errors}
            sx={inputStyle}
          />
          <FormControl fullWidth size="small" variant="outlined" margin="dense">
            <InputLabel id="service-label">Service</InputLabel>
            <Select
              labelId="service-label"
              name="service_id"
              id="service_id"
              label="Service"
              value={data.values.service_id}
              onChange={handleChange}
              errors={data.errors}
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

          <Button
            loading={loading}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleUpdate(category.id)}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </>
  );
}
