import React, { useState, useEffect, useReducer } from "react";
import { IconButton, LinearProgress } from "@mui/material";
import Http from "../../../services/Http";
import EditIcon from "@mui/icons-material/Edit";
import PayIcon from "@mui/icons-material/Payments";
import ViewIcon from "@mui/icons-material/Visibility";
import "../assets/table.css";
import MUIDataTable from "mui-datatables";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ViewModal from "./components/ViewModal";
import EditModal from "./components/EditModal";
import PayModal from "./components/PayModal";
import Chip from "@mui/material/Chip";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = () => {
    setIsLoading(true);
    Http.get("/orders")
      .then((res) => {
        if (res.data.data) {
          setOrders(res.data.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  };
  // console.log("Orders: ", orders);
  const handleShowViewModal = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleShowEditModal = (order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  const handleShowPayModal = (order) => {
    setSelectedOrder(order);
    setShowPayModal(true);
  };

  const columns = [
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const order = orders[tableMeta.rowIndex];
          return (
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="view"
                onClick={() => handleShowViewModal(order)}
                color="primary"
              >
                <ViewIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => handleShowEditModal(order)}
                color="warning"
              >
                <EditIcon />
              </IconButton>
            </Stack>
          );
        },
        filter: true,
        sort: true,
      },
    },
    {
      name: "trans_number",
      label: "Transaction No",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "first_name",
      label: "First Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "service",
      label: "Service",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "handling",
      label: "Handling",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Order Status",
      options: {
        customBodyRender: (value) => {
          let color = "";

          switch (value) {
            case "1":
              color = "error";
              break;
            case "2":
              color = "primary";
              break;
            case "3":
              color = "secondary";
              break;
            case "4":
              color = "warning";
              break;
            default:
              color = "primary";
              break;
          }

          return (
            <Stack direction="row" spacing={1}>
              <Chip
                label={value}
                color={color}
                size="small"
                variant="outlined"
              />
            </Stack>
          );
        },
        filter: true,
        sort: false,
      },
    },
    {
      name: "payment_status",
      label: "Payment Status",
      options: {
        customBodyRender: (value) => {
          let color = "";

          switch (value) {
            case "1":
              color = "error";
              break;
            default:
              color = "primary";
              break;
          }

          return (
            <Stack direction="row" spacing={1}>
              <Chip
                label={value}
                color={color}
                size="small"
                variant="outlined"
              />
            </Stack>
          );
        },
        filter: true,
        sort: false,
      },
    },
    {
      name: "handling_status",
      label: "Handling Status",
      options: {
        customBodyRender: (value) => {
          let statusName = "";
          let color = "";

          switch (value) {
            case "1":
              statusName = "Ready for Pickup";
              color = "primary";
              break;
            case "2":
              statusName = "Ready for Delivery";
              color = "primary";
              break;
            case "3":
              statusName = "Rider on Pickup";
              color = "primary";
              break;
            case "4":
              statusName = "Rider on Delivery";
              color = "primary";
              break;
            default:
              statusName = "Not yet ready";
              color = "error";
              break;
          }

          return (
            <Stack direction="row" spacing={1}>
              <Chip
                label={statusName}
                color={color}
                size="small"
                variant="outlined"
              />
            </Stack>
          );
        },
        filter: true,
        sort: false,
      },
    },
    {
      name: "created_at",
      label: "Order Date",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    filterType: "checkbox",
  };

  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiTableCell: {
          styleOverrides: {
            root: {
              padding: 5,
            },
            head: {
              fontWeight: "bold",
              backgroundColor: "#0d6efd",
            },
          },
        },
        MuiTableHead: {
          styleOverrides: {
            root: {
              backgroundColor: "#0d6efd",
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            data: {
              fontWeight: "bold",
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              padding: 0,
            },
          },
        },
        MUIDataTableToolbar: {
          styleOverrides: {
            actions: {
              marginTop: "15px",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              margin: "0 5px",
            },
          },
        },
      },
    });

  return (
    <>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Orders"}
          data={orders}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
      {isLoading && <LinearProgress />}

      <ViewModal
        fetchingData={fetchingData}
        open={showViewModal}
        onClose={() => setShowViewModal(false)}
        order={selectedOrder}
      />
      <EditModal
        fetchingData={fetchingData}
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        order={selectedOrder}
      />
      <PayModal
        fetchingData={fetchingData}
        open={showPayModal}
        onClose={() => setShowPayModal(false)}
        order={selectedOrder}
      />
    </>
  );
};

export default Orders;
