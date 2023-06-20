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

function OrderPayments() {
  const [categoryList, setCategoryList] = useState([]);

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
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <p className="m-0 flex-fill">Parent Category Three</p>
          <p className="m-0 flex-fill">Category Name</p>
          <p className="m-0 flex-fill">P50/kilo</p>
          <p className="m-0 flex-fill">2 kilos</p>
          <p className="m-0 flex-fill" style={{ textAlign: "right" }}>
            P100.00
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="m-0 flex-fill">Parent Category Four</p>
          <p className="m-0 flex-fill">Category Name</p>
          <p className="m-0 flex-fill">P50/kilo</p>
          <p className="m-0 flex-fill">2 kilos</p>
          <p className="m-0 flex-fill" style={{ textAlign: "right" }}>
            P100.00
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="m-0 flex-fill">Parent Category One</p>
          <p className="m-0 flex-fill">Category Name</p>
          <p className="m-0 flex-fill">P50/kilo</p>
          <p className="m-0 flex-fill">2 kilos</p>
          <p className="m-0 flex-fill" style={{ textAlign: "right" }}>
            P100.00
          </p>
        </div>
      </div>
      <Divider />
      <div className="card-body d-flex justify-content-end flex-column align-items-end">
        <div className="d-flex fw-bold"> (Paid) P 300.00</div>
        <div className="d-flex fw-bold">(Total) P 300.00</div>
        <div className="d-flex fw-bold">(Change) P 0.00</div>
        <TextField
          variant="standard"
          name="name"
          placeholder="Amount"
          className="mt-3 text-right"
          sx={{ textAlign: "right" }}
          type="number"
        />
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

export default OrderPayments;
