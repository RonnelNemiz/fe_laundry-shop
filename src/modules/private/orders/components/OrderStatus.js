import React, { useEffect, useState } from "react";
import Http from "../../../../services/Http";
import {
  CircularProgress,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { InputLabel } from "@mui/material";
import ToastNotification from "../../../../components/ToastNotification";

const options = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  draggable: true,
  draggableDirection: 60,
  theme: "colored",
};

const paymentStatus = ["Unpaid", "Paid"];
const handlingStatus = [
  "Rider on Pickup",
  "Rider on Delivery",
  "Ready for Store Pickup",
  "Delivered",
  "Picked Up",
];
const orderStatus = [
  "Pending",
  "Confirmed",
  "On Queue",
  "Washing",
  "Ready for Payment",
  "Completed",
  "Canceled",
];

function OrderStatus({ order, onClose }) {
  const [loadingOnSubmit, setLoadingOnSubmit] = React.useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [status, setStatus] = React.useState({
    name: "",
    value: "",
  });

  useEffect(() => {
    Http.get("/category-list").then((res) => {
      if (res.data) {
        setCategoryList(res.data);
      }
    });
  }, []);

  const handleChange = (value, name) => {
    setStatus((prev) => ({
      ...prev,
      name: name,
      value: value,
    }));
  };

  const handleSubmit = () => {
    setLoadingOnSubmit(true);
    Http.post(`/update/status/${order.id}`, status)
      .then((res) => {
        if (res.data.status === 200) {
          ToastNotification("success", res.data.message, options);
          onClose();
        } else {
          ToastNotification("error", res.data.message, options);
        }
        setLoadingOnSubmit(false);
      })
      .catch((err) => {
        setLoadingOnSubmit(false);
        ToastNotification("error", err.message, options);
      });
  };

  console.log(status);

  return (
    <div className="card">
      <div className="card-body d-flex">
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          className="flex-fill"
        >
          <InputLabel>Payment Status</InputLabel>
          <Select
            value={status.value}
            onChange={(e) => handleChange(e.target.value, "payment")}
            label="Status"
          >
            {paymentStatus?.map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          className="flex-fill"
        >
          <InputLabel>Handling Status</InputLabel>
          <Select
            value={status.value}
            onChange={(e) => handleChange(e.target.value, "handling")}
            label="Status"
          >
            {handlingStatus?.map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          className="flex-fill"
        >
          <InputLabel>Order Status</InputLabel>
          <Select
            value={status.value}
            onChange={(e) => handleChange(e.target.value, "order")}
            label="Status"
          >
            {orderStatus?.map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Button
        size="small"
        color="primary"
        variant="contained"
        style={{ padding: "5px 50px" }}
        onClick={handleSubmit}
        disabled={loadingOnSubmit}
      >
        {loadingOnSubmit ? <CircularProgress size={24} /> : "Submit"}
      </Button>
    </div>
  );
}

export default OrderStatus;
