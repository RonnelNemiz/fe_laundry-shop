import React, { useState, useEffect } from "react";
import { Box, IconButton, LinearProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";
import MUIDataTable from "mui-datatables";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

export default function Reviews() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [reviews, setReviews] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleShowViewModal = () => {
    "View";
  };
  const handleShowEditModal = () => {
    "Edit";
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
              <IconButton
                aria-label="view"
                onClick={() => handleShowViewModal("")}
                color="primary"
              >
                <ViewIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => handleShowEditModal("")}
                color="warning"
              >
                <EditIcon />
              </IconButton>
            </Stack>
          );
        },
        filter: true,
        sort: true,
      },
    },
    {
      name: "trans_number",
      label: "Transaction No",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "first_name",
      label: "First Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "service",
      label: "Service",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "handling",
      label: "Handling",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "rating",
      label: "Rating",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    filterType: "checkbox",
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
        MuiPaper: {
          styleOverrides: {
            root: {
              margin: "15px 0",
            },
          },
        },
      },
    });

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <ThemeProvider theme={getMuiTheme()} className="my-2">
        <MUIDataTable
          title={"Reviews"}
          data={reviews}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </Box>
  );
}
