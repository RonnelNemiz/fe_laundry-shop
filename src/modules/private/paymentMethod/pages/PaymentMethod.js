import React, { useState, useEffect, useReducer } from "react";
import { CircularProgress, IconButton, Box } from "@mui/material";

import MUIDataTable from "mui-datatables";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPayMeth from "./../components/AddPayMeth";
import Http from "../../../../services/Http";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShowPayMeth from "./../components/ShowPaymeth";
import EditPayMeth from "./../components/EditPayMeth";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import ToastNotification from "../../../../components/ToastNotification";

const PaymentMethod = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [paymentData, setPaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewOpen, setViewOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    fetchingData();
  }, [ignored]);

  const fetchingData = (params = {}) => {
    setIsLoading(true);
    Http.get("/payment-methods").then((res) => {
      if (res.data) {
        setPaymentData(res.data);
      }
      setIsLoading(false);
    });
  };

  const handleUpdate = (values) => {
    Http.get(`update/payment-methods/${values}`).then();
  };
  const handleDelete = (id) => {
    Http.delete(`delete/payment-methods/${selectedItem.id}`)
      .then(
        forceUpdate(),
        ToastNotification("success", "Successfully Deleted!", tableoptions),
        setIsLoading(false),
        setOpenDelete(false)
      )
      .catch((err) => {
        setIsLoading(false);
        ToastNotification("error", err, tableoptions);
      });
  };

  const tableoptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    draggable: true,
    draggableDirection: "x" | "y",
    draggablePercent: 60,
    theme: "colored",
  };
  const handleOpenView = (data) => {
    setSelectedItem(data);
    setViewOpen(true);
  };

  const onEdit = (data) => {
    setSelectedItem(data);
    setOpenEdit(true);
  };
  const onDelete = (data) => {
    setSelectedItem(data);
    setOpenDelete(true);
  };

  const columns = [
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const paymentmethod = paymentData[tableMeta.rowIndex];
          return (
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="View"
                onClick={() => {
                  handleOpenView(paymentmethod);
                }}
              >
                <VisibilityIcon color="primary" />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  onEdit(paymentmethod);
                }}
              >
                <EditIcon color="warning" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  onDelete(paymentmethod);
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Stack>
          );
        },
      },
    },

    {
      name: "name",
      label: "PAYMENT METHOD",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "logo",
      label: "LOGO",
    },
    {
      name: "recipient",
      label: "RECIPIENT",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "number",
      label: "NUMBER",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "special_instructions",
      label: "INSTRUCTIONS",
    },
  ];

  const [resizableColumns, setResizableColumns] = useState(false);
  const options = {
    filterType: "checkbox",
    rowsPerPage: 10,
    resizableColumns: resizableColumns,
    customToolbarSelect: () => {
      return <AddPayMeth forceUpdate={() => forceUpdate()} />;
    },
    customToolbar: () => {
      return (
        <>
          <AddPayMeth forceUpdate={() => forceUpdate()} />
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
      <div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <ThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                title={"Payment Methods"}
                data={paymentData}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
          )}

          <ShowPayMeth
            open={isViewOpen}
            onClose={() => setViewOpen(false)}
            paymentmethod={selectedItem}
          />
          <EditPayMeth
            open={openEdit}
            paymentMethod={selectedItem}
            onEdit={handleUpdate}
            onClose={() => setOpenEdit(false)}
            forceUpdate={forceUpdate}
          />
          <ConfirmationDialog
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onConfirm={handleDelete}
            loading={isLoading}
            message=" Are you sure? If deleted you will not able to recover the data."
          />
        </Box>
      </div>
    </>
  );
};

export default PaymentMethod;
