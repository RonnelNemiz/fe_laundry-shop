import React, { useState, useEffect, useReducer } from "react";
import {
  TableContainer,
  Paper,
  CircularProgress,
  IconButton,
  Box,
} from "@mui/material";
import AddUsers from "./../components/AddUser";
import Http from "../../../../services/Http";
import MUIDataTable from "mui-datatables";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewUser from "../components/ViewUser";
import EditUsers from "../components/EditUsers";
import ToastNotification from "../../../../components/ToastNotification";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Users = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewOpen, setViewOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Http.get("/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        setUsersData(res.data.data);
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

  const tableoptions = {
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
    Http.delete(`/delete/user/${selectedUser.id}`)
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
  const handleOpenView = (data) => {
    setSelectedUser(data);
    setViewOpen(true);
  };

  const onEdit = (data) => {
    setSelectedUser(data);
    setOpenEdit(true);
  };
  const onDelete = (data) => {
    setSelectedUser(data);
    setOpenDelete(true);
  };

  const columns = [
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const user = usersData[tableMeta.rowIndex];
          return (
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="View"
                onClick={() => {
                  handleOpenView(user);
                }}
              >
                <VisibilityIcon color="primary" />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  onEdit(user);
                }}
              >
                <EditIcon color="warning" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  onDelete(user);
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
      name: "role",
      label: "Role",
    },
    {
      name: "profile.0.image",
      label: "Image",
      type: "image",
      // customBodyRender: (item) => {
      //   return item[0] && item[0].image;
      // }
    },
  ];

  const [resizableColumns, setResizableColumns] = useState(false);
  const options = {
    filterType: "checkbox",
    rowsPerPage: 10,
    resizableColumns: resizableColumns,
    customToolbarSelect: () => {
      return <AddUsers forceUpdate={() => forceUpdate()} />;
    },
    customToolbar: () => {
      return (
        <>
          <AddUsers forceUpdate={() => forceUpdate()} />;
        </>
      );
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
            <CircularProgress />
          ) : (
            <ThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                title={"Users"}
                data={usersData}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
          )}
          <ViewUser
            open={isViewOpen}
            onClose={() => setViewOpen(false)}
            user={selectedUser}
          />
          <EditUsers
            open={openEdit}
            selectedItem={selectedUser}
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
      </div>
    </>
  );
};

export default Users;
