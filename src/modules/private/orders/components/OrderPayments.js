import React, { useEffect, useState } from "react";
import Http from "../../../../services/Http";
import { Divider, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const styles = {
  //   input: {
  //     width: "5px",
  //   },
};

function OrderPayments({ order, orderDetails }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    Http.get("/category-list").then((res) => {
      if (res.data) {
        setCategoryList(res.data);
        console.log(res.data);
      }
    });
  }, []);

  const tableStyle = {
    textAlign: "right",
  };
  return (
    <div className="card">
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
            <tr>
              <th scope="row" style={tableStyle}>
                ₱100.00
              </th>
              <td>2 kilos</td>
              <td>White Beddings & Bath Accessories</td>
            </tr>
            <tr>
              <th scope="row" style={tableStyle}>
                ₱250.00
              </th>
              <td>5 kilos</td>
              <td>Colored Beddings & Bath Accessories</td>
            </tr>
            <tr>
              <th scope="row" style={tableStyle}>
                ₱300.00
              </th>
              <td>6 kilos</td>
              <td scope="row">White Garments</td>
            </tr>
          </tbody>
        </table>

        <Divider />
        <div className="card-body d-flex justify-content-end flex-column align-items-end">
          <div className="d-flex fw-bold"> (Paid) P 700.00</div>
          <div className="d-flex fw-bold">(Total) P 650.00</div>
          <div className="d-flex fw-bold">(Change) P 50.00</div>
          <TextField
            variant="standard"
            name="name"
            placeholder="Amount"
            className="mt-3 text-right"
            sx={{ textAlign: "right" }}
            type="number"
          />
        </div>
      </div>
      <div className="card-footer">
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
    </div>
  );
}

export default OrderPayments;
