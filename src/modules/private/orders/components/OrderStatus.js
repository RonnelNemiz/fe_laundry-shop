import React, { useEffect, useState } from "react";
import Http from "../../../../services/Http";
import {
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { InputLabel } from "@mui/material";

const styles = {
  //   input: {
  //     width: "5px",
  //   },
};

function OrderStatus() {
  const [categoryList, setCategoryList] = useState([]);

  const paymentStatus = ["Unpaid", "Paid"];
  const handlingStatus = [
    "Not Yet Ready",
    "For Pickup",
    "Rider on Pickup",
    "Ready for Pickup",
    "Rider on Delivery",
    "Ready for Delivery",
  ];
  const orderStatus = [
    "Pending",
    "In Progress",
    "Waiting for Payment",
    "Completed",
    "Cancelled",
  ];
  const handleChange = (event) => {};
  useEffect(() => {
    Http.get("/category-list").then((res) => {
      if (res.data) {
        setCategoryList(res.data);
        console.log(res.data);
      }
    });
  }, []);

  return (
    <div className="card">
      <div className="card-body d-flex">
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          className="flex-fill"
        >
          <InputLabel>Payment Status</InputLabel>
          <Select value={paymentStatus} onChange={handleChange} label="Status">
            {paymentStatus.map((item, index) => (
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
          <Select value={paymentStatus} onChange={handleChange} label="Status">
            {handlingStatus.map((item, index) => (
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
          <Select value={paymentStatus} onChange={handleChange} label="Status">
            {orderStatus.map((item, index) => (
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
        onClick=""
        style={{ padding: "5px 50px" }}
      >
        Pay
      </Button>
    </div>
  );
}

export default OrderStatus;
