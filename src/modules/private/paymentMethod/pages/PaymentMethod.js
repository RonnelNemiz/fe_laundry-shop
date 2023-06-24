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
import AddPayMeth from "./../components/AddPayMeth";
import Http from "../../../../services/Http";

const PaymentMethod = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [paymentData, setPaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    Http.get("/payments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        setPaymentData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [ignored]);

  const handleUpdate = (values) => {
    Http.get(`update/payments/${values}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then();
  };
  const handleDelete = (id) => {
    Http.delete(`delete/payments/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then();
  };
  const handleShow = (id) => {
    Http.get(`view/payments/${id}`, {
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
      name: "payment method",
      label: "Payment Method",
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
      return <AddPayMeth forceUpdate={() => forceUpdate()} />;
    },
    customToolbar: () => {
      return (
        <>
          <AddPayMeth forceUpdate={() => forceUpdate()} />;
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
                <Tab label="Payment Method" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <TableContainer component={Paper}>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <MUIDataTable
                    title={"Payment Method List"}
                    data={paymentData}
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

export default PaymentMethod;
