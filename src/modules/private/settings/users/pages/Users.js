import React, { useEffect, useState, useReducer } from "react";
import "../../../assets/table.css";
import { Paper } from "@mui/material";
import ToastNotification from "../../../../../components/ToastNotification";
import ToastNotificationContainer from "../../../../../components/ToastNotificationContainer";
import DataTable from "../components/DataTable";
import Http from "../../../../../services/Http";
import AddUser from "../components/AddUser";

function Users() {
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState({
    data: [],
    meta: {},
  });

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [filters, setFilters] = useState({
    limit: 10,
  });

  useEffect(() => {
    fetchingData();
  }, [ignored]); //eslint-disable-line

  const fetchingData = (params = {}) => {
    setLoading(true);
    Http.get("/users", {
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
      label: "Contact Number", 
      customBodyRender: (item) => {
        return item[0] && item[0].contact_number;
      }
    },
    {
      name: "role",
      label: "Role",
    },
  
    {
      name: "profile",
      label: "Image",
      type: "image",
      customBodyRender: (item) => {
        return (
          <img
            src={item.image}
            alt="User"
            style={{ width: 50, height: 50 }}
          />
        );
      },
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
    fetchingData({ limit: value });
    handleFilterChange("limit", value);
  };

  const handleUpdate = (values) => {
    Http.get(`update/user/${values}`).then(
    );
  };

  const handleDelete = (values) => {
    Http.delete(`/delete/user/${values}`)
      .then(
        forceUpdate(),
        ToastNotification("success", "Successfully Deleted!", options)
      )
      .catch((err) => {
        ToastNotification("error", err, options);
      });
  };

  const handleShow = (id) => {
    Http.get(`show/users/${id}`)
      .then();   
  };
  

  return (
    <Paper sx={{ width: "100%" }}>
      <ToastNotificationContainer />
      <AddUser  forceUpdate={() => forceUpdate()} data={userList.data}/>
      <DataTable
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
        onRowClick={handleShow}
      />
      
    </Paper>
  );
}

export default Users;
