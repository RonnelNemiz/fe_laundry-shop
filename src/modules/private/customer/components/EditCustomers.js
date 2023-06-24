import * as React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import Reevalidate from "ree-validate-18";
import Http from "../../../../services/Http";
import ToastNotification from "../../../../components/ToastNotification";
import { handleErrorResponse } from "../../../../utils/helpers";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";
import FormFieldData from "../../../../components/FormFieldData";

const validator = new Reevalidate.Validator({
  email: "required|email",
  first_name: "required",
  last_name: "required",
  purok: "required",
  brgy: "required",
  municipality: "required",
  contact_number: "required|numeric",
  land_mark: "required",
  password: "required|max:8",
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
  overflowX: "auto",
  height: "80%",
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
  mb: 2,
};

export default function EditCustomers(props) {
  const { open, onClose, selectedItem, forceUpdate } = props;

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    values: {
      email: "",
      first_name: "",
      last_name: "",
      purok: "",
      brgy: "",
      municipality: "",
      contact_number: "",
      land_mark: "",
      role: "Customer",
    },
    errors: validator.errors,
  });

  React.useEffect(() => {
    if (selectedItem?.profile) {
      setData({
        values: {
          email: selectedItem?.email,
          first_name: selectedItem?.profile[0].first_name,
          last_name: selectedItem?.profile[0].last_name,
          purok: selectedItem?.profile[0].purok,
          brgy: selectedItem?.profile[0].brgy,
          municipality: selectedItem?.profile[0].municipality,
          contact_number: selectedItem?.profile[0].contact_number,
          land_mark: selectedItem?.profile[0].land_mark,
          role: selectedItem?.role,
        },
      });
    }
  }, [selectedItem]);

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
    setLoading(true);
    validator.validateAll(data.values).then((success) => {
      if (success) {
        Http.put(`update/customer/${selectedItem?.id}`, data.values)
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
        key={selectedItem?.id}
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // style={{ overflowX: "auto", height: "70%" }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ paddingBottom: "5%" }}
          >
            Edit Customer
          </Typography>
          <FormFieldData
            fullWidth
            label="Email"
            id="email"
            value={data.values.email}
            type="email"
            name="email"
            onChange={handleChange}
            errors={data.errors}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="First Name"
            id="first_name"
            value={data.values.first_name}
            name="first_name"
            onChange={handleChange}
            errors={data.errors}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Last Name"
            id="last_name"
            value={data.values.last_name}
            name="last_name"
            onChange={handleChange}
            errors={data.errors}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Purok"
            id="purok"
            value={data.values.purok}
            name="purok"
            onChange={handleChange}
            errors={data.errors}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Barangay"
            id="brgy"
            value={data.values.brgy}
            name="brgy"
            onChange={handleChange}
            errors={data.errors}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Municipality"
            id="municipality"
            value={data.values.municipality}
            name="municipality"
            onChange={handleChange}
            errors={data.errors}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Contact Number"
            id="contact_number"
            value={data.values.contact_number}
            name="contact_number"
            onChange={handleChange}
            errors={data.errors}
            inputProps={{
              maxLength: 11,
            }}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Landmark"
            id="land_mark"
            value={data.values.land_mark}
            name="land_mark"
            onChange={handleChange}
            errors={data.errors}
          />
          <Button
            loading={loading}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleUpdate(selectedItem?.id)}
            disabled={loading}
            sx={{ marginTop: "5%" }}
          >
            {loading ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </Box>
      </Modal>
    </>
  );
}
