import React, { useEffect, useState, useReducer } from 'react';
import { Paper } from '@mui/material';
import Http from '../../../../services/Http';
import ToastNotificationContainer from '../../../../components/ToastNotificationContainer';
import AddCustomers from '../components/AddCustomers';
import ToastNotification from '../../../../components/ToastNotification';
import DataTableCustomers from '../components/DataTableCustomers';


function Customers() {
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState({
    data: [],
    meta: {},
  });
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [filters, setFilters] = useState({
    limit: 25,
  });

  useEffect(() => {
    fetchingData();
  }, [ignored]); //eslint-disable-line

  const fetchingData = (params = {}) => {
    setLoading(true);
    Http.get("/users",{
      params: {
        ...filters,
        ...params,
      },
    }).then((res) => {
      if (res.data.data) {
        setUserList({
          data: res.data.data,
          meta: res.data.meta,
        });
      }
      setLoading(false);
    });
  };

  const columns = [
    {
      name: "image",
      label: "Image", 
    },
    {
      name: "user",
      label: "Email", 
      customBodyRender: (item) => {
        return item.email;
      }
    },
    {
      name: "first_name",
      label: "First Name", 
    },
    {
      name: "last_name",
      label: "Last Name", 
    },
    {
      name: "purok",
      label: "Purok", 
    },
    {
      name: "brgy",
      label: "Barangay", 
    },
    {
      name: "municipality",
      label: "Municipality", 
    },
    {
      name: "contact_number",
      label: "Contact Number", 
    },
   
    {
        name: "land_mark",
        label: "Landmark", 
    },
   
  ];
  
  const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    draggable: true,
    draggableDirection: "x" | "y",
    draggablePercent: 60,
    theme: "colored",
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePage = (newPage) => {
    fetchingData({ page: newPage + 1 });
  };

  const handleRowChange = (value) => {
    fetchingData({ limit: value});
    handleFilterChange("limit", value);
  };

  const handleUpdate = (values) => {
    Http.get(`update/customers/${values}`).then();
  };

  const handleDelete = (values) => {
    Http.delete(`delete/customers/${values}`).then(
      forceUpdate(),
      ToastNotification("success", "Successfully Deleted!", options)
    )
    .catch((err) => {
      ToastNotification("error", err, options);
    });
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <ToastNotificationContainer />
      <AddCustomers data={userList.data}/>
      <DataTableCustomers
        withPagination
        forceUpdate={() => forceUpdate()}
        onEdit={handleUpdate}
        onDelete={handleDelete}
        loading={loading}
        data={userList.data}
        columns={columns}
        rowsPerPage={filters.limit}
        count={userList.meta.total || 0}
        page={userList.meta.curent_page - 1 || 0}
        onChangePage={handleChangePage}
        onRowsChangePage={handleRowChange}
      />
    </Paper>
  );
}

export default Customers;

