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

const Services = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [serviceData, setServiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    setIsLoading(true);
    Http.get("/services", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        setServiceData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [ignored]);

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

  const columns = [
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
    {
      name: "image",
      label: "Image",
    },
  ];

  const [resizableColumns, setResizableColumns] = useState(false);
  const options = {
    filterType: "checkbox",
    rowsPerPage: 10,
    resizableColumns: resizableColumns,
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

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
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
                  <MUIDataTable
                    title={"Services List"}
                    data={serviceData}
                    columns={columns}
                    options={options}
                  />
                )}
              </TableContainer>
            </TabPanel>
            <TabPanel value="2">Categories</TabPanel>
            <TabPanel value="3">Item Types</TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
};

export default Services;
