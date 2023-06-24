import React, { useEffect, useState, useReducer } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  TableContainer,
} from "@mui/material";
import Http from "../../../../services/Http";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";
import AddCustomers from "../components/AddCustomers";
import ToastNotification from "../../../../components/ToastNotification";
import MUIDataTable from "mui-datatables";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import ShowCustomer from "../components/ShowCustomer";
import EditCustomers from "../components/EditCustomers";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isViewOpen, setViewOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // const [filters, setFilters] = useState({
  //   limit: 25,
  // });

  useEffect(() => {
    fetchingData();
  }, [ignored]); //eslint-disable-line

  const fetchingData = (params = {}) => {
    setLoading(true);
    Http.get("/all-customers").then((res) => {
      if (res.data.data) {
        setCustomerList(res.data.data);
      }
      setLoading(false);
    });
  };

  const handleOpenView = (data) => {
    setSelectedCustomer(data);
    setViewOpen(true);
  };

  const onDelete = (data) => {
    setSelectedCustomer(data);
    setOpenDelete(true);
  };

  const onEdit = (data) => {
    setSelectedCustomer(data);
    setOpenEdit(true);
  };

  const columns = [
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (item, tableMeta) => {
          const customer = customerList[tableMeta.rowIndex];

          return (
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="View"
                onClick={() => {
                  handleOpenView(customer);
                }}
              >
                <VisibilityIcon color="primary" />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  onEdit(customer);
                }}
              >
                <EditIcon color="warning" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  onDelete(customer);
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Stack>
          );
        },
        filter: true,
        sort: true,
      },
    },
    {
      name: "profile",
      label: "First Name",
      options: {
        customBodyRender: (item) => {
          return item[0] && item[0].first_name;
        },
        filter: true,
        sort: true,
      },
    },
    {
      name: "profile",
      label: "Last Name",
      options: {
        customBodyRender: (item) => {
          return item[0] && item[0].last_name;
        },
        filter: true,
        sort: true,
      },
    },
    {
      name: "profile",
      label: "Contact Number",
      options: {
        customBodyRender: (item) => {
          return item[0] && item[0].contact_number;
        },
        filter: true,
        sort: true,
      },
    },
    {
      name: "profile",
      label: "Address",
      options: {
        customBodyRender: (item) => {
          return item[0] && item[0].address;
        },
        filter: true,
        sort: true,
      },
    },
  ];

  const tableoptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    draggable: true,
    draggableDirection: "x" | "y",
    draggablePercent: 60,
    theme: "colored",
  };

  const handleUpdate = (values) => {
    Http.get(`update/customer/${values}`).then();
  };

  const handleDelete = () => {
    setLoadingOnSubmit(true);
    Http.delete(`/delete/user/${selectedCustomer.id}`)
      .then(
        forceUpdate(),
        ToastNotification("success", "Successfully Deleted!", tableoptions),
        setLoadingOnSubmit(false),
        setOpenDelete(false)
      )
      .catch((err) => {
        setLoadingOnSubmit(false);
        ToastNotification("error", err, tableoptions);
      });
  };
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [resizableColumns, setResizableColumns] = useState(false);
  const options = {
    filterType: "checkbox",
    rowsPerPage: 10,
    resizableColumns: resizableColumns,
    customToolbarSelect: () => {
      return <AddCustomers forceUpdate={() => forceUpdate()} />;
    },
    customToolbar: () => {
      return (
        <>
          <AddCustomers forceUpdate={() => forceUpdate()} />;
        </>
      );
    },
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
      <Box sx={{ width: "100%", typography: "body1" }}>
        <ToastNotificationContainer />
        {/* <AddCustomers forceUpdate={() => forceUpdate()} data={customerList} /> */}
        {loading ? (
          <CircularProgress />
        ) : (
          <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Customers"}
              data={customerList}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        )}

        <ShowCustomer
          open={isViewOpen}
          onClose={() => setViewOpen(false)}
          customer={selectedCustomer}
        />
        <EditCustomers
          open={openEdit}
          selectedItem={selectedCustomer}
          onEdit={handleUpdate}
          onClose={() => setOpenEdit(false)}
          forceUpdate={forceUpdate}
        />
        <ConfirmationDialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onConfirm={handleDelete}
          loading={loadingOnSubmit}
          message=" Are you sure? If deleted you will not able to recover the data."
        />
      </Box>
    </>
  );
}

export default Customers;
