import React, { useState, useEffect, useReducer } from "react";
import {
  TableContainer,
  Paper,
  CircularProgress,
  IconButton,
  Box,
  LinearProgress,
} from "@mui/material";
import Http from "../../../../services/Http";
import MUIDataTable from "mui-datatables";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ToastNotification from "../../../../components/ToastNotification";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddConsumable from "../../../private/consumables/components/AddConsumables";
import EditConsumable from "../../../private/consumables/components/EditConsumables";

const EditConsumables = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [consumables, setConsumables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
  const [selectedConsumable, setSelectedConsumable] = useState(null);
  const [selectedConsToDelete, setSelectedConsToDelete] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Http.get("/consumables", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        setConsumables(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [ignored]);

  const handleUpdate = (values) => {
    Http.get(`update/users/${values}`).then();
  };

  const tableOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    draggable: true,
    draggableDirection: "x" | "y",
    draggablePercent: 60,
    theme: "colored",
  };

  const handleDelete = () => {
    setLoadingOnSubmit(true);
    Http.delete(`consumable/${selectedConsToDelete}`)
      .then((res) => {
        forceUpdate();
        ToastNotification("success", res.data.message, tableOptions);
        setLoadingOnSubmit(false);
        setOpenDelete(false);
      })
      .catch((err) => {
        setLoadingOnSubmit(false);
        ToastNotification("error", err, tableOptions);
      });
  };

  const onEdit = (data) => {
    setSelectedConsumable(data.id);
    setOpenEdit(true);
  };

  const onDelete = (data) => {
    setSelectedConsToDelete(data.id);
    setOpenDelete(true);
  };

  const columns = [
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const consumable = consumables[tableMeta.rowIndex];
          return (
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  onEdit(consumable);
                }}
              >
                <EditIcon color="warning" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  onDelete(consumable);
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
      label: "name",
      options: {
        customBodyRender: (value) => value,
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        customBodyRender: (value) => `₱${value}`,
      },
    },
    {
      name: "cost",
      label: "Cost",
      options: {
        customBodyRender: (value) => `₱${value}`,
      },
    },
  ];

  // Placeholder data for 'consumablesData'
  const consumablesData = [];

  const [resizableColumns, setResizableColumns] = useState(false);
  const options = {
    filterType: "checkbox",
    rowsPerPage: 10,
    resizableColumns: resizableColumns,
    customToolbarSelect: () => {
      return <AddConsumable forceUpdate={() => forceUpdate()} />;
    },
    customToolbar: () => {
      return <AddConsumable forceUpdate={() => forceUpdate()} />;
    },
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            <LinearProgress />
          ) : (
            <ThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                title={"Consumables"}
                data={consumables}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
          )}
          <ConfirmationDialog
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onConfirm={handleDelete}
            loading={loadingOnSubmit}
            message="Are you sure? If deleted you will not be able to recover the data."
          />
          {selectedConsumable && (
            <EditConsumable
              selectedConsumable={selectedConsumable}
              onClose={() => setOpenEdit(false)}
              forceUpdate={forceUpdate}
            />
          )}
        </Box>
      </div>
    </>
  );
};

export default EditConsumables;
