import React, { useEffect, useState } from "react";
import Http from "../../../../services/Http";
import { Box, LinearProgress, TextField } from "@mui/material";
import Button from "@mui/material/Button";

const styles = {
  input: {
    margin: "0 5px",
  },
};

function OrderCategories(props) {
  const { open, order } = props;

  const orderId = (order && order.id) || "";

  const [categoryList, setCategoryList] = useState([]);
  const [orderCategories, setOrderCategories] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Http.get("/category-list").then((res) => {
      if (res.data) {
        setCategoryList(res.data);
        setLoading(false);
      }
    });

    if (open) {
      if (order && order.categories) {
        const orderCatData = {};
        order.categories.forEach((orderCat) => {
          orderCatData[orderCat.name] = {
            id: orderCat.id,
            name: orderCat.name,
            quantity: (orderCat.pivot && orderCat.pivot.quantity) || 0,
            kilo: (orderCat.pivot && orderCat.pivot.kilo) || 0,
          };
        });

        setOrderCategories(orderCatData);
      }
    }
  }, [open]);
  // useEffect(() => {

  // }, []);

  const handleItemSubmit = () => {
    setLoading(true);
    // Http.post("/order/update-profile", formValues).then((res) => {
    //   //
    // });

    Http.put(`/orders/update-order-items/${orderId}`, orderCategories).then(
      (res) => {
        setLoading(false);
      }
    );
  };

  const getValue = (name, key) => {
    return (orderCategories[name] && orderCategories[name][key]) || "";
  };

  const handleCatChange = (value, cat, key) => {
    const name = cat.name;

    if (orderCategories[name]) {
      setOrderCategories((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          [key]: value,
        },
      }));
    } else {
      setOrderCategories((prev) => ({
        ...prev,
        [name]: {
          id: cat.id,
          name: cat.name,
          [key]: value,
        },
      }));
    }
  };

  return (
    <div>
      {categoryList.map((item, index) => (
        <div className="card mb-3" key={index}>
          {loading && <LinearProgress />}
          <div className="card-header bg-primary bg-gradient-primary text-light d-flex align-items-center mt-2 justify-content-between px-3">
            <p className="m-0">{item.name}</p>
            <div style={{ width: "25%", margin: 0 }}>
              <TextField
                className="flex-fill text-light"
                variant="standard"
                placeholder="How heavy?"
                label="How many?"
                sx={styles.input}
                name={item.id}
                onChange={(e) =>
                  handleCatChange(e.target.value, item.name, "kilo")
                }
                value={getValue(item.name, "kilo")}
              />
            </div>
          </div>
          {item.sub_categories &&
            item.sub_categories.map((sub_item, sub_index) => (
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "95%" },
                }}
                noValidate
                autoComplete="off"
                key={sub_index}
              >
                <div className="card-body" key={sub_index}>
                  <div className="d-flex">
                    <div
                      style={{ width: "75%" }}
                      className="align-items-center d-flex"
                    >
                      <p className="m-0">{sub_item.name}</p>
                    </div>
                    <TextField
                      name={sub_item.id}
                      className="flex-fill"
                      variant="standard"
                      placeholder="How many?"
                      label="How many?"
                      sx={styles.input}
                      onChange={(e) =>
                        handleCatChange(e.target.value, sub_item, "quantity")
                      }
                      value={getValue(sub_item.name, "quantity")}
                    />
                  </div>
                </div>
              </Box>
            ))}
        </div>
      ))}
      <Button
        size="small"
        color="primary"
        variant="contained"
        onClick={handleItemSubmit}
        style={{ padding: "5px 50px" }}
        fullWidth
      >
        Update
      </Button>
    </div>
  );
}

export default OrderCategories;
