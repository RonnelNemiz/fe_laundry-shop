import React, { useState, useEffect, useReducer } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Box,
} from "@mui/material";
import AddServices from "../components/AddServices";
import Http from "../../../../services/Http";
import MUIDataTable from "mui-datatables";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddCategory from "../components/AddCategory";
import ItemTypes from "../components/ItemTypes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import EditService from "../components/EditService";
import EditCategories from "../components/EditCategories";
import ToastNotification from "../../../../components/ToastNotification";
import EditItemType from "../components/EditItemType";

const Services = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageUrls, setImageUrls] = useState({});
  const [servicesData, setServicesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [itemTypesData, setItemTypesData] = useState([]);
  const [value, setValue] = React.useState("1");
  const [loadingOnSubmit, setLoadingOnSubmit] = React.useState(false);
  const [openEditService, setOpenEditService] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEditItemType, setOpenEditItemType] = useState(false);
  const [openDeleteItem, setOpenDeleteItem] = useState(false);
  const [openDeleteService, setOpenDeleteService] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchServices();
    fetchItemCategories();
    fetchItemTypes();
  }, [ignored]);

  const fetchServices = () => {
    Http.get("/services")
      .then((res) => {
        setServicesData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const fetchItemCategories = () => {
    Http.get("/item-categories")
      .then((res) => {
        console.log(res.data);
        setCategoriesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEdit = (data) => {
    setSelectedItem(data);
    setOpenEdit(true);
  };
  const onEditItemType = (data) => {
    setSelectedItem(data);
    setOpenEditItemType(true);
  };

  const fetchItemTypes = () => {
    Http.get("/item-types")
      .then((res) => {
        setItemTypesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEditService = (data) => {
    setSelectedItem(data);
    setOpenEditService(true);
  };

  const handleUpdateService = (values) => {
    Http.get(`update/services/${values}`).then();
  };
  const handleDeleteService = () => {
    setIsLoading(true);
    Http.delete(`delete/services/${selectedItem.id}`)
      .then(
        forceUpdate(),
        ToastNotification("success", "Successfully Deleted!", tableoptions),
        setIsLoading(false),
        setOpenDeleteService(false)
      )
      .catch((err) => {
        setIsLoading(false);
        ToastNotification("error", err, tableoptions);
      });
  };

  const handleShow = (id) => {
    Http.get(`view/services/${id}`)
      .then((res) => {
        setSelectedItem(res.data);
        setImageUrls((prevImageUrls) => ({
          ...prevImageUrls,
          [id]: res.data.image_url,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdateCategories = (values) => {
    Http.get(`update/item-categories/${values}`).then();
  };

  const onDelete = (data) => {
    setSelectedItem(data);
    setOpenDelete(true);
  };

  const onDeleteItem = (data) => {
    setSelectedItem(data);
    setOpenDeleteItem(true);
  };

  const handleUpdateItemType = (values) => {
    Http.get(`update/item-type/${values}`).then();
  };
  const handleDeleteCategories = () => {
    setIsLoading(true);
    Http.delete(`delete/item-categories/${selectedItem.id}`)
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
  const handleDeleteItemType = () => {
    setIsLoading(true);
    Http.delete(`delete/item-type/${selectedItem.id}`)
      .then(
        forceUpdate(),
        ToastNotification("success", "Successfully Deleted!", tableoptions),
        setIsLoading(false),
        setOpenDeleteItem(false)
      )
      .catch((err) => {
        setIsLoading(false);
        ToastNotification("error", err, tableoptions);
      });
  };
  const onDeleteService = (data) => {
    setSelectedItem(data);
    setOpenDeleteService(true);
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

  const handleSelectItem = (name, item) => {
    setSelectedItem(item);

    if (name === "edit") {
      setOpenEdit(true);
    } else if (name === "delete") {
      setOpenConfirm(true);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "1": // Services tab
        fetchServices();
        break;
      case "2": // Categories tab
        fetchItemCategories();
        break;
      case "3": // Item Types tab
        fetchItemTypes();
        break;
      default:
        break;
    }
  };

  const servicesColumns = [
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const service = servicesData[tableMeta.rowIndex];
          return (
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  onEditService(service);
                }}
              >
                <EditIcon color="warning" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  onDeleteService(service);
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
      label: "Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "description",
      label: "Description",
    },
  ];
  const servicesOptions = {
    filterType: "checkbox",
    rowsPerPage: 10,
    customToolbarSelect: () => {
      return <AddServices forceUpdate={() => forceUpdate()} />;
    },
    customToolbar: () => {
      return (
        <>
          <AddServices forceUpdate={() => forceUpdate()} />
        </>
      );
    },
  };
  const categoriesColumns = [
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const categories = categoriesData[tableMeta.rowIndex];
          return (
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  onEdit(categories);
                }}
              >
                <EditIcon color="warning" />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  onDelete(categories);
                }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          );
        },
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "service_name",
      label: "Service",
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
  const categoriesOptions = {
    filterType: "checkbox",
    rowsPerPage: 10,
    customToolbarSelect: () => {
      return (
        <AddCategory
          forceUpdate={() => forceUpdate()}
          services={servicesData}
        />
      );
    },
    customToolbar: () => {
      return (
        <>
          <AddCategory forceUpdate={() => forceUpdate()} />
        </>
      );
    },
  };
  const itemTypesColumns = [
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const itemItem = itemTypesData[tableMeta.rowIndex];
          return (
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  onEditItemType(itemItem);
                }}
              >
                <EditIcon color="warning" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  onDeleteItem(itemItem);
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
      label: "Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "category_name",
      label: "Category",
    },
  ];
  const itemTypesOptions = {
    filterType: "checkbox",
    rowsPerPage: 10,
    customToolbarSelect: () => {
      return (
        <ItemTypes
          forceUpdate={() => forceUpdate()}
          categories={categoriesData}
        />
      );
    },
    customToolbar: () => {
      return (
        <>
          <ItemTypes
            forceUpdate={() => forceUpdate()}
            categories={categoriesData}
          />
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
          {/* <ConfirmationDialog
            open={openConfirm}
            onClose={() => setOpenConfirm(false)}
            message="You are about to delete this sevice, proceed?"
            onConfirm={() => handleDelete(selectedItem.id)}
            loading={loadingOnSubmit}
          /> */}
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="Services">
                <Tab label="Services" value="1" />
                <Tab label="Categories" value="2" />
                <Tab label="Item Types" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <TableContainer component={Paper}>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <ThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                      title={"Services"}
                      data={servicesData}
                      columns={servicesColumns}
                      options={servicesOptions}
                    />
                  </ThemeProvider>
                )}
              </TableContainer>
            </TabPanel>
            <EditService
              open={openEditService}
              forceUpdate={forceUpdate}
              onEditService={handleUpdateService}
              itemService={selectedItem}
              onCloseService={() => setOpenEditService(false)}
            />
            <ConfirmationDialog
              open={openDeleteService}
              onClose={() => setOpenDeleteService(false)}
              onConfirm={handleDeleteService}
              loading={isLoading}
              message=" Are you sure? If deleted you will not able to recover the data."
            />

            <EditItemType
              open={openEditItemType}
              itemType={selectedItem}
              onEditItemType={handleUpdateItemType}
              onClosed={() => setOpenEditItemType(false)}
              forceUpdate={forceUpdate}
            />
            <ConfirmationDialog
              open={openDeleteItem}
              onClose={() => setOpenDeleteItem(false)}
              onConfirm={handleDeleteItemType}
              loading={isLoading}
              message=" Are you sure? If deleted you will not able to recover the data."
            />
            <TabPanel value="2">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <ThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable
                    title={"Categories"}
                    data={categoriesData}
                    columns={categoriesColumns}
                    options={categoriesOptions}
                  />
                </ThemeProvider>
              )}
            </TabPanel>
            <EditCategories
              open={openEdit}
              category={selectedItem}
              onEdit={handleUpdateCategories}
              onClose={() => setOpenEdit(false)}
              forceUpdate={forceUpdate}
            />
            <ConfirmationDialog
              open={openDelete}
              onClose={() => setOpenDelete(false)}
              onConfirm={handleDeleteCategories}
              loading={isLoading}
              message=" Are you sure? If deleted you will not able to recover the data."
            />
            <TabPanel value="3">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <ThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable
                    title={"Categories"}
                    data={itemTypesData}
                    columns={itemTypesColumns}
                    options={itemTypesOptions}
                  />
                </ThemeProvider>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
};

export default Services;
