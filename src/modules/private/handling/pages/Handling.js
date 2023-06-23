import React, { useState, useEffect, useReducer } from "react";
import {
  TableContainer,
  Paper,
  CircularProgress,
  IconButton,
  Box,
} from "@mui/material";

import MUIDataTable from "mui-datatables";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddHandling from "../components/AddHandling";
import Http from "../../../../services/Http";

const Handlings = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [handlingData, setHandlingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    Http.get("/handling", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        setHandlingData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [ignored]);

  const handleUpdate = (values) => {
    Http.get(`update/handling/${values}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then();
  };
  const handleDelete = (id) => {
    Http.delete(`delete/handling/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then();
  };
  const handleShow = (id) => {
    Http.get(`view/handling/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
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
      name: "handling price",
      label: "Handling Price",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "handling name",
      label: "Handling Name",
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
          <AddHandling forceUpdate={() => forceUpdate()} />;
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
                aria-label="lab API tabs example">
                <Tab label="Handling" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <TableContainer component={Paper}>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <MUIDataTable
                    title={"Handling List"}
                    data={handlingData}
                    columns={columns}
                    options={options}
                  />
                )}
              </TableContainer>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
};

export default Handlings;
