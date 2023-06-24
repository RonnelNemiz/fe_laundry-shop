import * as React from "react";
import Http from "../../../../services/Http";
import ToastNotification from "../../../../components/ToastNotification";
import { handleErrorResponse } from "../../../../utils/helpers";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";
import { Box, Button, Modal, Tooltip, Typography } from "@mui/material";
import FormFieldData from "../../../../components/FormFieldData";
import Reevalidate from "ree-validate-18";

const validator = new Reevalidate.Validator({
  name: "required|max:50",
  number: "required|max:11|numeric",
  special_instructions: "required",
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

export default function EditPayMeth(props) {
  const { open, onClose, paymentMethod, forceUpdate } = props;

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    values: {
      name: "",
      logo: "",
      recipient: "",
      number: "",
      special_instructions: "",
    },
    errors: validator.errors,
  });

  React.useEffect(() => {
    if (paymentMethod) {
      setData({
        values: {
          name: paymentMethod.name,
          logo: paymentMethod.logo,
          recipient: paymentMethod.recipient,
          number: paymentMethod.number,
          special_instructions: paymentMethod.special_instructions,
        },
      });
    }
  }, [paymentMethod]);

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
        Http.put(`update/payment-methods/${paymentMethod.id}`, data.values)
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
        key={paymentMethod?.id}
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Payment Method
          </Typography>
          <FormFieldData
            fullWidth
            label="Payment Method"
            value={data.values.name}
            name="name"
            onChange={handleChange}
            errors={data.errors}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Logo"
            value={data.values.logo}
            name="logo"
            onChange={handleChange}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Recipient"
            value={data.values.recipient}
            name="recipient"
            onChange={handleChange}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            label="Number"
            value={data.values.number}
            name="number"
            onChange={handleChange}
            errors={data.errors}
            inputProps={{
              maxLength: 11,
            }}
            sx={inputStyle}
          />
          <FormFieldData
            fullWidth
            multiline
            row={4}
            label="Instructions"
            value={data.values.special_instructions}
            name="special_instructions"
            onChange={handleChange}
            errors={data.errors}
            sx={inputStyle}
          />

          <Button
            loading={loading}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleUpdate(paymentMethod.id)}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </>
  );
}
