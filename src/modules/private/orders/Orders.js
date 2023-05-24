import React, { useEffect, useState, useReducer } from "react";
import "./../assets/table.css";
import { Paper } from "@mui/material";
import DataTableOrders from "./components/DataTableOrders";
import AddOrders from "./components/AddOrders";
import ToastNotificationContainer from "../../../components/ToastNotificationContainer";
import Http from "../../../services/Http";
import ToastNotification from "../../../components/ToastNotification";
// import { CssBaseline } from '@mui/material/CssBaseline';

function Orders() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState({
    data: [],
    meta: {},
  });
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [filters, setFilters] = React.useState({
    values: {
      limit: 10,
    },
  });

  useEffect(() => {
    fetchingData();
  }, [ignored]); //eslint-disable-line

  const fetchingData = (params = {}) => {
    setLoading(true);
    Http.get("orders", {
      ...filters,
      ...params,
    }).then((res) => {
      if (res.data.data) {
        console.log(res.data.data);
        setOrders({
          data: res.data.data,
          meta: res.data.meta,
        });
      }
      setLoading(false);
    });
  };

  const columns = [
    {
      name: "trans_number",
      label: "Trans ID",
    },
    {
      name: "profile",
      label: "First Name",
      customBodyRender: (item) => {
        return item && item[0] && item[0].first_name;
      },
    },
    {
      name: "profile",
      label: "Last Name",
      customBodyRender: (item) => {
        return item && item[0] && item[0].last_name;
      },
    },
    {
      name: "handling",
      label: "Handling",
      customBodyRender: (item) => {
        return item && item.handling_name;
      },
    },
    // {
    //   name: "categories",
    //   label: "Type",
    //   customBodyRender: (item) => {
    //     return item.map((category, i) => category.id).join(", ");
    //   },
    // },
    {
      name: "kilo",
      label: "Kilo",
    },
    {
      name: "total",
      label: "Total",
    },
    {
      name: "status",
      label: "Order Status",
    },
    {
      name: "payment_status",
      label: "Payment Status",
    },
    {
      name: "approved_by",
      label: "Approved By",
    },
    {
      name: "created_at",
      label: "Date Ordered",
    },
  ];

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePage = (newPage) => {
    fetchingData({ page: newPage + 1 });
  };

  const handleRowChange = (value) => {
    fetchingData({ limit: value });
    handleFilterChange("limit", value);
  };

  const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    draggable: true,
    draggableDirection: "x" | "y",
    draggablePercent: 60,
    theme: "colored",
  };

  const handleUpdate = (values) => {
    Http.get(`update/service/${values}`).then();
  };

  const handleDelete = (values) => {
    Http.delete(`/delete/service/${values}`).then(
      forceUpdate(),
      ToastNotification("success", "Successfully Deleted!", options)
    )
    .catch((err) => {
      ToastNotification("error", err, options);
    });
  };
  const handleShow = (id) => {
    Http.get(`show/orders/${id}`)
      .then();   
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <ToastNotificationContainer />
      <AddOrders forceUpdate={() => forceUpdate()} data={orders.data} />
      <DataTableOrders
        withPagination
        forceUpdate={() => forceUpdate()}
        onEdit={handleUpdate}
        onDelete={handleDelete}
        loading={loading}
        data={orders.data}
        columns={columns}
        count={orders.meta.total || 0}
        rowsPerPage={filters.limit}
        page={orders.meta.curent_page - 1 || 0}
        onChangePage={handleChangePage}
        onRowsChangePage={handleRowChange}
        onRowClick={handleShow}
      />
    </Paper>
  );
}

export default Orders;
