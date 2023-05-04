import React, { useEffect, useState, useReducer } from 'react';
import { Paper } from '@mui/material';
import Http from '../../../../services/Http';
import ToastNotificationContainer from '../../../../components/ToastNotificationContainer';
import AddCustomers from '../components/AddCustomers';
import ToastNotification from '../../../../components/ToastNotification';
import DataTableCustomers from '../components/DataTableCustomers';


function Customers() {
  const [loading, setLoading] = useState(false);
  const [customerList, setCustomerList] = useState({
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
    Http.get("/all-customers",{
      params: {
        ...filters,
        ...params,
      },

    }).then((res) => {
      if (res.data.data) {
        console.log(res.data.data)
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
      name: "profile",
      label: "Image", 
      customBodyRender: (item) => {
        return item[0] && item[0].image;
      }
    },
    {
      name: "email",
      label: "Email", 
    },
    {
      name: "profile",
      label: "First Name", 
      customBodyRender: (item) => {
        return item[0] && item[0].first_name;
      }
    },
    {
      name: "profile",
      label: "Last Name", 
      customBodyRender: (item) => {
        return item[0] && item[0].last_name;
      }
    },
    {
      name: "profile",
      label: "Purok", 
      customBodyRender: (item) => {
        return item[0] && item[0].purok;
      }
    },
    {
      name: "profile",
      label: "Barangay", 
      customBodyRender: (item) => {
        return item[0] && item[0].brgy;
      }
    },
    {
      name: "profile",
      label: "Municipality", 
      customBodyRender: (item) => {
        return item[0] && item[0].municipality;
      }
    },
   
    {
        name: "profile",
        label: "Landmark", 
        customBodyRender: (item) => {
          return item[0] && item[0].land_mark;
        }
    },
    {
      name: "profile",
      label: "Contact Number", 
      customBodyRender: (item) => {
        return item[0] && item[0].contact_number;
      }
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
    Http.get(`update/user/${values}`).then();
  };

  const handleDelete = (values) => {
    Http.delete(`/delete/user/${values}`).then(
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
      <AddCustomers forceUpdate={() => forceUpdate()} data={customerList.data}/>
      <DataTableCustomers
        withPagination
        forceUpdate={() => forceUpdate()}
        onEdit={handleUpdate}
        onDelete={handleDelete}
        loading={loading}
        data={customerList.data}
        columns={columns}
        rowsPerPage={filters.limit}
        count={customerList.meta.total || 0}
        page={customerList.meta.curent_page - 1 || 0}
        onChangePage={handleChangePage}
        onRowsChangePage={handleRowChange}
      />
    </Paper>
  );
}

export default Customers;

