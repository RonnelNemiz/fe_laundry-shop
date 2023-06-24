import React, { useState, useEffect, useReducer } from "react";
import { CircularProgress, IconButton, Box } from "@mui/material";

import MUIDataTable from "mui-datatables";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShowHandling from "./../components/ShowHandling";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditHandling from "./../components/EditHandling";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import ToastNotification from "../../../../components/ToastNotification";
import AddHandling from "./../components/AddHandling";
import Http from "../../../../services/Http";

const Handlings = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [handlingData, setHandlingData] = useState([]);
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
    Http.get("/handlings").then((res) => {
      if (res.data) {
        // console.log(res.data.data);
        setHandlingData(res.data);
      }
      setIsLoading(false);
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

  const handleUpdate = (values) => {
    Http.get(`update/handling/${values}`).then();
  };
  const handleDelete = () => {
    setIsLoading(true);
    Http.delete(`delete/handlings/${selectedItem.id}`)
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
          const handling = handlingData[tableMeta.rowIndex];
          return (
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="View"
                onClick={() => {
                  handleOpenView(handling);
                }}
              >
                <VisibilityIcon color="primary" />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  onEdit(handling);
                }}
              >
                <EditIcon color="warning" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  onDelete(handling);
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
      label: "HANDLING NAME",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "price",
      label: "HANDLING PRICE",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const [resizableColumns, setResizableColumns] = useState(false);
  const options = {
    filterType: "checkbox",
    rowsPerPage: 10,
    resizableColumns: resizableColumns,
    customToolbarSelect: () => {
      return <AddHandling forceUpdate={() => forceUpdate()} />;
    },
    customToolbar: () => {
      return (
        <>
          <AddHandling forceUpdate={() => forceUpdate()} />
        </>
      );
    },
  };
  // const [value, setValue] = React.useState("1");
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

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
                title={"Handlings"}
                data={handlingData}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
          )}
          <ShowHandling
            open={isViewOpen}
            onClose={() => setViewOpen(false)}
            handling={selectedItem}
          />
          <EditHandling
            open={openEdit}
            handling={selectedItem}
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

export default Handlings;
