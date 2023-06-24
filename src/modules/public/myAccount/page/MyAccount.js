import React, { useReducer, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Http from "../../../../services/Http";
import ShowHistory from "../components/ShowHistory";
import UpdateProfile from "../components/UpdateProfile";
import CommentModal from "../components/CreateModal";
import Navbar from "./../../../../layouts/public/Navbar";
import MUIDataTable from "mui-datatables";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton, LinearProgress } from "@mui/material";
import ViewIcon from "@mui/icons-material/Visibility";

const styleLink = {
  color: "red",
  paddingRight: "5px",
};

const styleBox1 = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingTop: "15px",
  paddingLeft: "20px",
};
const accountStyle = {
  padding: "10px 50px",
};

const profileBoxStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  fontSize: "20px",
  padding: "0 50px",
};

const tableContainerStyle = {
  marginTop: "10px",
  padding: "10px",
};
const orderStyle = {
  padding: "50px",
};

function MyAccount() {
  const [customerAccount, setCustomerAccount] = useState(null);
  const [customerHistory, setCustomerHistory] = useState([]);
  const [showOrder, setShowOrder] = useState(null);
  const [showCommendModal, setShowCommendModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [isLoading, setIsLoading] = useState();

  React.useEffect(() => {
    handleFetchCustomer();
  }, []);

  const handleFetchCustomer = () => {
    Http.get("customer", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        if (res.data.status === 200) {
          setCustomerAccount(res.data.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    handleFetchCustomerHistory();
  }, [ignored]);

  const handleFetchCustomerHistory = () => {
    setIsLoading(true);
    Http.get("history")
      .then((res) => {
        if (res.data.status === 200) {
          setCustomerHistory(res.data.orders);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (values) => {
    Http.delete(`/delete/orders/${values}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then();
  };

  const handleUpdate = (params) => {
    Http.put(
      `edit/profile/${params.user_id}`,
      params
      // {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      //   },
      // },
    )
      .then((res) => {
        console.log(res.data);
        setCustomerAccount(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShow = (orders) => {
    setShowOrder(orders);
  };

  const handleShowInsertComment = (order) => {
    setSelectedOrder(order);
    setShowCommendModal(true);
  };

  const columns = [
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: () => {
          return (
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="view" onClick={""} color="primary">
                <ViewIcon />
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
      name: "service.name",
      label: "Service",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const orderIndex = tableMeta.rowIndex;
          const order = customerHistory[orderIndex];
          return order.service.name;
        },
      },
    },
    {
      name: "handling.name",
      label: "Handling",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const orderIndex = tableMeta.rowIndex;
          const order = customerHistory[orderIndex];
          return order.handling.name;
        },
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
    selectableRows: "none",
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
    <Box>
      <Navbar />
      <Box sx={accountStyle}>
        <h2>Hi {customerAccount?.profile[0].first_name}!</h2>
        <Typography>
          {customerAccount?.profile[0].first_name}{" "}
          {customerAccount?.profile[0].last_name}
        </Typography>
      </Box>

      <Box sx={profileBoxStyle}>
        {customerAccount?.profile.map((profile) => (
          <p key={profile.user_id}>
            <span style={{ textAlign: "center" }}>
              Email: {customerAccount?.email}
            </span>
            <br />
            <span style={{ textAlign: "center" }}>
              Password: **************
            </span>

            <UpdateProfile
              selectedItem={profile}
              onEdit={handleUpdate}
              forceUpdate={forceUpdate}
              customerAccount={customerAccount}
            />
          </p>
        ))}
      </Box>

      <Box sx={orderStyle}>
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"Your Order History"}
            data={customerHistory}
            columns={columns}
            options={options}
          />
          {isLoading && <LinearProgress />}
        </ThemeProvider>
        {isLoading && <LinearProgress />}
        {showOrder && (
          <ShowHistory
            sx={{ maxWidth: "500px" }}
            showOrder={showOrder}
            onClose={() => setShowOrder(null)}
          />
        )}
      </Box>

      <CommentModal
        order={selectedOrder}
        open={showCommendModal}
        onClose={() => setShowCommendModal(false)}
      />
    </Box>
  );
}

export default MyAccount;
