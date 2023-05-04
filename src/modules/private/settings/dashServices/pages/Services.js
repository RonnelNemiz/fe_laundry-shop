import React, { useEffect, useState, useReducer } from 'react';
import "../../../assets/table.css";
import { Paper } from '@mui/material';
import  ToastNotificationContainer from "../../../../../components/ToastNotificationContainer";
import Http from '../../../../../services/Http';
import AddServices from '../components/AddServices';
import DataTableServices from '../components/DataTableServices';
import ToastNotification from '../../../../../components/ToastNotification';
// import Delete from '../../../orders/components/Delete';

function Services() {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState({
    data: [],
    meta: {},
  });
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    fetchingData();
  }, [ignored]); //eslint-disable-line

  const fetchingData = (params = {}) => {
    console.log();
    setLoading(true);
    Http.get("/services").then((res) => {
      if (res.data.data) {
        setServices({
          data: res.data.data,
          meta: res.data.meta,
        });
      }
      setLoading(false);
    });
  };

  const columns = [
    
    {
      name: "name",
      label: "Service Name", 
    },
    {
      name: "description",
      label: "Description", 
    },
    {
      name: "price",
      label: "Price", 
      customBodyRender: (item) => {
        return item[0] && item[0].price_value;
      }
    },
    // {
    //   name: "price_value",
    //   label: "Price ", 
    // },
   
    {
      name: "image",
      label: "Image", 
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

  const handleUpdate = (values) => {
    Http.get(`update/service/${values}`).then();
  };

  const handleDelete = (values) => {
    Http.delete(`/delete/service/${values}`).then(
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
      <AddServices forceUpdate={() => forceUpdate()} data={services.data}/>
      <DataTableServices
        forceUpdate={() => forceUpdate()}
        onEdit={handleUpdate}
        onDelete={handleDelete}
        loading={loading}
        data={services.data}
        columns={columns}
        count={services.meta.total || 0}
       
      />
    </Paper>
  );
}

export default Services;
