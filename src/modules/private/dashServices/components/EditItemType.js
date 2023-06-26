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
  Typography,
} from "@mui/material";
import FormFieldData from "../../../../components/FormFieldData";
import Reevalidate from "ree-validate-18";
import ItemTypes from "./ItemTypes";

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

export default function EditItemType(props) {
  const { open, onClosed, itemType, forceUpdate } = props;
  const [categories, setCategories] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    values: {
      name: "",
      category_id: "",
    },
    errors: validator.errors,
  });

  const handleCategorytoselect = () => {
    Http.get("/show/categorytoselect").then((res) => {
      setCategories(res.data.category);
    });
  };

  React.useEffect(() => {
    handleCategorytoselect();
    if (itemType) {
      setData({
        values: {
          name: itemType.name,
          category_id: itemType.category_id,
        },
      });
    }
  }, [itemType]);

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
        Http.put(`update/item-type/${itemType.id}`, data.values)
          .then((res) => {
            forceUpdate();
            onClosed();
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
        key={itemType?.id}
        open={open}
        onClose={onClosed}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit ItemTypes
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
          <FormControl fullWidth size="small" variant="outlined" margin="dense">
            <InputLabel id="category-label">Categories</InputLabel>
            <Select
              labelId="category-label"
              name="category_id"
              id="category_id"
              label="Category"
              value={data.values.category_id}
              onChange={handleChange}
              errors={data.errors}
            >
              {categories?.map((categoryItem) => {
                return (
                  <MenuItem
                    key={categoryItem.id}
                    value={categoryItem.id}
                    id="categoryItem"
                  >
                    {categoryItem.name}
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
            onClick={() => handleUpdate(itemType.id)}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </>
  );
}
