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
import AddServices from "./../components/AddServices";
import EditServices from "./../components/EditServices";
import DeleteServices from "../components/DeleteServices";
import Http from "../../../../../services/Http";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShowHandling from "../../handling/components/ShowHandling";
import MUIDataTable from "mui-datatables";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddCategory from "../components/AddCategory";
import ItemTypes from "../components/ItemTypes";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Services = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageUrls, setImageUrls] = useState({});
  const [servicesData, setServicesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [itemTypesData, setItemTypesData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchServices();
    fetchItemCategories();
    fetchItemTypes();
  }, [ignored]);

  const fetchServices = () => {
    Http.get("/services", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
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
        setCategoriesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const handleUpdate = (values) => {
    Http.get(`update/services/${values}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then();
  };
  const handleDelete = (id) => {
    Http.delete(`delete/services/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then();
  };
  const handleShow = (id) => {
    Http.get(`view/services/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
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

  const [value, setValue] = React.useState("1");

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
          // const order = orders[tableMeta.rowIndex];
          return (
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="edit" color="primary">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="edit" color="error">
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
          <AddServices forceUpdate={() => forceUpdate()} />;
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
          // const order = orders[tableMeta.rowIndex];
          return (
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="edit" color="primary">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="edit" color="error">
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
  ];
  const categoriesOptions = {
    filterType: "checkbox",
    rowsPerPage: 10,
    customToolbarSelect: () => {
      return <AddCategory forceUpdate={() => forceUpdate()} />;
    },
    customToolbar: () => {
      return (
        <>
          <AddCategory forceUpdate={() => forceUpdate()} />;
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
          // const order = orders[tableMeta.rowIndex];
          return (
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="edit" color="primary">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="edit" color="error">
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
      name: "category_name",
      label: "Category",
    },
  ];
  const itemTypesOptions = {
    filterType: "checkbox",
    rowsPerPage: 10,
    customToolbarSelect: () => {
      return <ItemTypes forceUpdate={() => forceUpdate()} />;
    },
    customToolbar: () => {
      return (
        <>
          <ItemTypes forceUpdate={() => forceUpdate()} />;
        </>
      );
    },
  };

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              backgroundColor: "#fff",
            },
          },
        },
        MuiPaper: {
          elevation: {
            styleOverrides: {
              root: {
                boxShadow: "none",
              },
            },
          },
        },
      },
    });
  return (
    <>
      <div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="Tabs">
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
                      title={"Services List"}
                      data={servicesData}
                      columns={servicesColumns}
                      options={servicesOptions}
                    />
                  </ThemeProvider>
                )}
              </TableContainer>
            </TabPanel>
            <TabPanel value="2">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <ThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable
                    title={"Categories List"}
                    data={categoriesData}
                    columns={categoriesColumns}
                    options={categoriesOptions}
                  />
                </ThemeProvider>
              )}
            </TabPanel>
            <TabPanel value="3">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <ThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable
                    title={"Categories List"}
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
