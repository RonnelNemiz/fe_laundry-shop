import React, { useEffect, useState } from "react";
import Http from "../../../../services/Http";
import { Box, CircularProgress, Divider, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToastNotification from "../../../../components/ToastNotification";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";

const options = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  draggable: true,
  draggableDirection: 60,
  theme: "colored",
};

const styles = {
  //   input: {
  //     width: "5px",
  //   },
};

function OrderPayments({ order, orderDetails, onClose }) {
  const [loading, setLoading] = React.useState(false);
  const [pay, setPay] = React.useState();

  const tableStyle = {
    textAlign: "right",
  };

  const totalSum = orderDetails?.orderItems?.reduce(
    (sum, orderDetail) => sum + Number(orderDetail.total),
    0
  );

  const change = pay - totalSum;

  const handlePay = (change) => {
    setLoading(true);
    Http.post(`order/pay/${order.id}`, { change, pay })
      .then((res) => {
        if (res.data.status === 200) {
          onClose();
          ToastNotification("success", res.data.message, options);
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
    <div className="card">
      <ToastNotificationContainer />
      {order.payment_status === 1 && (
        <Box sx={{ p: 2 }}>
          <Typography>Already Paid</Typography>
        </Box>
      )}
      {order.payment_status !== 1 && (
        <React.Fragment>
          <div className="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Amount</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Item</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails?.orderItems?.map((order, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row" style={tableStyle}>
                        {order.price}
                      </th>
                      <td>{order.weight}</td>
                      <td>{order.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Divider />
            <div className="card-body d-flex justify-content-end flex-column align-items-end">
              <div className="d-flex fw-bold"> (Paid) ₱{pay ? pay : 0}</div>
              <div className="d-flex fw-bold">(Total) ₱{totalSum}</div>
              <div className="d-flex fw-bold">
                (Change) ₱{change ? change : 0}
              </div>
              <TextField
                variant="standard"
                name="name"
                placeholder="Amount"
                className="mt-3 text-right"
                sx={{ textAlign: "right" }}
                type="number"
                value={pay}
                onChange={(e) => setPay(e.target.value)}
              />
            </div>
          </div>
          <div className="card-footer">
            <Button
              size="small"
              color="primary"
              variant="contained"
              style={{ padding: "5px 50px" }}
              onClick={() => handlePay(change)}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Pay"}
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default OrderPayments;
