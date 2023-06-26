import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Typography,
  Box,
  IconButton,
  DialogTitle,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";
import Http from "../../../../services/Http";
import ToastNotification from "../../../../components/ToastNotification";

const options = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  draggable: true,
  draggableDirection: 60,
  theme: "colored",
};

export default function AddConsumables(props) {
  const { open, onClose, order, orderItems, selectedConsumables } = props;

  const [loading, setLoading] = React.useState(false);
  const [consumables, setConsumables] = useState([]);
  const [formValues, setFormValues] = useState({
    consumables: [],
  });

  React.useEffect(() => {
    if (open) {
      fetchConsumables();
    }

    if (selectedConsumables) {
      setFormValues((prev) => ({
        ...prev,
        consumables: selectedConsumables,
      }));
    }
  }, [open, selectedConsumables]);

  const fetchConsumables = () => {
    Http.get("/consumables")
      .then((res) => {
        if (res.data) {
          setConsumables(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      consumables: value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    Http.post(`/add/order/consumables/${order.id}`, formValues)
      .then((res) => {
        if (res.data.status === 200) {
          ToastNotification("success", res.data.message, options);
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

  return (
    <div>
      <ToastNotificationContainer />
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="card-header">
          <Box className="d-flex justify-content-between align-items-center">
            <Typography>Edit Consumables</Typography>
            <IconButton color="error" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{ width: "100%", typography: "body1" }}
            className="card-body"
          >
            <main className="mt-3">
              <section className="card">
                <div className="card-header bg-primary bg-gradient text-light">
                  <h3 className="m-0">Consumables</h3>
                </div>

                <div className="card-body">
                  <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
                    {formValues?.consumables?.map((consumable, i) => (
                      <Box
                        key={i}
                        sx={{
                          m: 1,
                          p: 2,
                          backgroundColor: "#EEEEEE",
                          borderRadius: 2,
                          boxShadow: 3,
                        }}
                      >
                        <Typography>Consumable: {consumable?.name}</Typography>
                        <Typography>Price: {consumable?.price}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <FormControl fullWidth size="small">
                    <InputLabel id="consumables-label">
                      Select Consumables
                    </InputLabel>
                    <Select
                      labelId="consumables-label"
                      size="small"
                      multiple
                      id="consumables"
                      value={formValues?.consumables}
                      onChange={handleChange}
                      renderValue={(selected) =>
                        selected?.map((select) => select?.name).join(", ")
                      }
                    >
                      <MenuItem disabled value="">
                        <em>Select Data</em>
                      </MenuItem>
                      {consumables?.map((item) => (
                        <MenuItem
                          key={item.id}
                          value={item}
                          disabled={formValues?.consumables?.some(
                            (consumable) => consumable?.name === item?.name
                          )}
                        >
                          <Checkbox
                            checked={formValues?.consumables?.some(
                              (consumable) => consumable?.id === item?.id
                            )}
                          />
                          <ListItemText primary={item?.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="card-footer">
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={handleSubmit}
                    className="py-1 px-5"
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Update Consumables"
                    )}
                  </Button>
                </div>
              </section>
            </main>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
