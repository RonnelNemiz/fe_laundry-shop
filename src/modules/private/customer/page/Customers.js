import React, { useEffect, useState, useReducer } from "react";
import { IconButton, Paper, Stack } from "@mui/material";
import Http from "../../../../services/Http";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";
import AddCustomers from "../components/AddCustomers";
import ToastNotification from "../../../../components/ToastNotification";
import DataTableCustomers from "../components/DataTableCustomers";
import MUIDataTable from "mui-datatables";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import ShowCustomer from "../components/ShowCustomer";
import DeleteCustomers from "./../components/DeleteCustomers";
import EditCustomers from "../components/EditCustomers";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isViewOpen, setViewOpen] = useState(false);

  // const [filters, setFilters] = useState({
  //   limit: 25,
  // });

  useEffect(() => {
    fetchingData();
  }, [ignored]); //eslint-disable-line

  const fetchingData = (params = {}) => {
    setLoading(true);
    Http.get("/all-customers").then((res) => {
      if (res.data.data) {
        console.log(res.data.data);
        setCustomerList({
          data: res.data.data,
          meta: res.data.meta,
        });
      }
      setLoading(false);
    });
  };

  const columns = [
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (item, tableMeta) => {
          const customer = customerList[tableMeta.rowIndex];

          return (
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="View"
                onClick={() => {
                  setSelectedCustomer(customer);
                  setViewOpen(true);
                }}
              >
                <VisibilityIcon />
              </IconButton>

              <EditCustomers
                selectedItem={customerList}
                onEdit={handleUpdate}
                forceUpdate={() => forceUpdate()}
              />
              <DeleteCustomers
                selectedItem={customerList}
                onDelete={handleDelete}
                forceUpdate={() => forceUpdate()}
              />
            </Stack>
          );
        },
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
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
      name: "profile.0.image",
      label: "Image",
      type: "image",
      // customBodyRender: (item) => {
      //   return item[0] && item[0].image;
      // }
    },
  ];

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
    Http.get(`update/user/${values}`).then();
  };

  const handleDelete = (values) => {
    Http.delete(`/delete/user/${values}`)
      .then(
        forceUpdate(),
        ToastNotification("success", "Successfully Deleted!", tableoptions)
      )
      .catch((err) => {
        ToastNotification("error", err, tableoptions);
      });
  };

  const options = {
    filterType: "checkbox",
  };
  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <ToastNotificationContainer />
        <AddCustomers
          forceUpdate={() => forceUpdate()}
          data={customerList.data}
        />

        <MUIDataTable
          title={"Employee List"}
          data={customerList.data}
          columns={columns}
          options={options}
        />
        {isViewOpen && <ShowCustomer customer={selectedCustomer} />}
      </Paper>
    </>
  );
}

export default Customers;
