import * as React from "react";
import Http from "../../../../services/Http";
import ToastNotification from "../../../../components/ToastNotification";
import { handleErrorResponse } from "../../../../utils/helpers";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";
import { Box, Button, Modal, Tooltip, Typography } from "@mui/material";
import FormFieldData from "../../../../components/FormFieldData";
import Reevalidate from "ree-validate-18";

const validator = new Reevalidate.Validator({
  name: "required",
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

export default function EditHandling(props) {
  const { open, onCloseService, itemService, forceUpdate } = props;

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    values: {
      name: "",
      description: "",
    },
    errors: validator.errors,
  });

  React.useEffect(() => {
    if (itemService) {
      setData({
        values: {
          name: itemService.name,
          description: itemService.description,
        },
      });
    }
  }, [itemService]);

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
        Http.put(`update/services/${itemService.id}`, data.values)
          .then((res) => {
            forceUpdate();
            onCloseService();
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
        key={itemService?.id}
        open={open}
        onClose={onCloseService}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit User
          </Typography>
          <FormFieldData
            fullWidth
            label="Service"
            value={data.values.name}
            name="name"
            onChange={handleChange}
            errors={data.errors}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Description"
            value={data.values.description}
            name="description"
            onChange={handleChange}
            inputProps={{
              maxLength: 11,
            }}
            errors={data.errors}
            sx={inputStyle}
          />

          <Button
            loading={loading}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleUpdate(itemService.id)}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </>
  );
}
