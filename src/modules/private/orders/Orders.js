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
  Tooltip,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddOrders from "./components/AddOrders";
import EditOrders from "./components/EditOrders";
import Delete from "./components/Delete";
import ViewOrders from "./components/ViewOrders";
import Http from "../../../services/Http";
import EditIcon from "@mui/icons-material/Edit";
import KiloModal from "./components/KiloModal";


const makeStyles=(status)=>{
  if(status ==='completed')
  {
    return{
      // background: 'rgb(145 254 159 / 47%)',
      color: 'green',
      cursor:'pointer'
    }
  }
  else if(status === 'in progress'){
    return{
      background: '#ffada8f',
      color: 'orange',
      cursor:'pointer'
    }
  }
  else if(status === 'pending'){
    return{
      background: '#ffada8f',
      color: 'red',
      cursor:'pointer'
    }
  }
  else {
    return{
      background: '#59bfff',
      color: 'white',
      cursor:'pointer'
    }
  }
  
}
const makeStyle=(payment_status)=>{
  if(payment_status ==='paid')
  {
    return{
      // background: 'rgb(145 254 159 / 47%)',
      color: 'green',
      cursor:'pointer'
    }
  }
  else if(payment_status === 'unpaid'){
    return{
      background: '#ffada8f',
      color: 'red',
      cursor:'pointer'
    }
  }
  else {
    return{
      background: '#59bfff',
      color: 'white',
      cursor:'pointer'
    }
  }
  
}


const Orders = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showOrder, setShowOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isKiloModalOpen, setIsKiloModalOpen] = useState(false);
const [selectedOrderId, setSelectedOrderId] = useState("");
// const [kiloIndexes, setKiloIndexes] = useState({});



  useEffect(() => {
    setIsLoading(true);
    Http.get("/orders")
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [ignored]);

  // const handleUpdate = (values) => {
  //   Http.get(`update/orders/${values}`).then();
  // };

  const handleDelete = (values) => {
    Http.delete(`/delete/orders/${values}`).then(
      );
  };
  const handleShow = (data) => { 
   setShowOrder(data);
  };


  const handleUpdate = (orderId, currentStatus) => {
    let updatedStatus = '';

    if (currentStatus === 'pending') {
      updatedStatus = 'in progress';
    } else if (currentStatus === 'in progress') {
      updatedStatus = 'completed';
    } else {
      return;
    }
    Http.put(`/orders/${orderId}/status`, { status: updatedStatus })
    .then(() => {
      forceUpdate();
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleUpdatePayStatus = (orderId, currentPaymentStatus) => {
  let updatedPaymentStatus = '';

  if (currentPaymentStatus === 'unpaid') {
    updatedPaymentStatus = 'paid';
  } else {
    return;
  }
  Http.put(`/orders/${orderId}/paymentstatus`, { payment_status: updatedPaymentStatus })
  .then(() => {
    forceUpdate();
  })
  .catch((err) => {
    console.log(err);
  });
};
const handleUpdateOrder = (orderId) => {
  const order = orders.find((data) => data.id === orderId);
  setSelectedOrder(order);
};

const openModal = (orderId) => {
  setSelectedOrderId(orderId);
  setIsKiloModalOpen(true);
};

const closeModal = () => {
  setIsKiloModalOpen(false);
  setSelectedOrderId("");
};


const handleKiloSubmit = (orderId, kiloValue) => {
  Http.put(`/orders/${orderId}/kilo`, { kilo: kiloValue })
    .then(() => {
      const updatedOrders = orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            kilo: kiloValue,
          };
        }
        return order;
      });

      setOrders(updatedOrders);
      closeModal();
      forceUpdate();
    })
    .catch((error) => {
      console.log(error);
    });
};




  return (
    <>
    <AddOrders  forceUpdate={() => forceUpdate()} />
    <TableContainer component={Paper}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead sx={{
                        "& th": {
                            color: "white",
                            backgroundColor: "#0E4C91",
                        },
                    }}>
            <TableRow>
              <TableCell size="small">Actions</TableCell>
              {/* <TableCell size="small">Categories</TableCell> */}
              <TableCell size="small">Trans ID</TableCell>
              <TableCell size="small">First Name</TableCell>
              <TableCell size="small">Last Name</TableCell>
              <TableCell size="small">Handling</TableCell>
              <TableCell size="small">Handling Price</TableCell>
              <TableCell size="small">Kilo</TableCell>
              <TableCell size="small">Total</TableCell>
              <TableCell size="small">Order Status</TableCell>
              <TableCell size="small">Payment Status</TableCell>
              <TableCell size="small">Payment Method</TableCell>
              <TableCell size="small">Approved By</TableCell>
              <TableCell size="small">Date Ordered</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((data) =>        
            {
              console.log(data);
              return (
              <TableRow key={data.id}>
                 <TableCell size="small" sx={{display:"flex", alignItems:"center"}}>
                 <Tooltip title="View">
                <VisibilityIcon 
                   onClick={() => handleShow(data)}
                   style={{ cursor: "pointer", color:"gray" }}
                />
                   </Tooltip>
                  <Tooltip title="Edit">
                    <EditIcon 
                      onClick={() => handleUpdateOrder(data.id)}
                      sx={{
                        fontsize: "30px",
                        cursor: "pointer",
                        color: "#0d6efd",
                        position: "relative",
                        left: "10px",
                        transition: ".5s",
                        "&:hover": {
                          color: "black",
                        },
                      }}
                    />
                </Tooltip>
                
                <Delete 
                selectedItem={data}
                onDelete={handleDelete} 
                  forceUpdate={() => forceUpdate()} />

              </TableCell>
                          {/* <TableCell size="small">
              {data && data.categories.map((category) => (
                <span key={category.id}>
                  {category.name} {category.pivot.quantity}
                </span>
              ))}
                </TableCell> */}
                <TableCell size="small">{data.trans_number}</TableCell>
                <TableCell size="small">{data.user.profile?.first_name ?? "Admin"}</TableCell>
                <TableCell size="small">{data.user.profile?.last_name ?? "Admin"}</TableCell>
                <TableCell size="small">{data.handling_id === 1 && "Pickup & Delivery" || data.handling_id === 2 && "Pickup" || data.handling_id === 3 && "Delivery" || data.handling_id === 4 && "Walk-in"}</TableCell>
                <TableCell size="small">{data.handling_id === 1 && "40" || data.handling_id === 2 && "20" || data.handling_id === 3 && "20" || data.handling_id === 4 && "0"}</TableCell>
                 <TableCell size="small"  onClick={() => openModal(data.id)}>
                    {data && data.categories.map((category) => (
                      <span key={category.id}>
                      {category.pivot.kilo}
                      </span>
                    ))}
                </TableCell>
                <TableCell size="small">{data.total}</TableCell>
                <TableCell size="small" style={makeStyles(data.status)} onClick={() => handleUpdate(data.id, data.status)}>
              {data.status}
            </TableCell>
            <TableCell size="small" style={makeStyle(data.payment_status)} onClick={() =>  handleUpdatePayStatus(data.id, data.payment_status)}>
              {data.payment_status}
            </TableCell>
                {/* <TableCell size="small">{data.payment_status}</TableCell> */}
                <TableCell size="small">{data.payment_id === 1 && "GCASH" || data.payment_id === 2 && "COD" ||  data.payment_id === 3 && "CASH"}</TableCell>
                <TableCell size="small">{data.approved_by}</TableCell>
                <TableCell size="small">{data.created_at}</TableCell>
               
              </TableRow>
            )})}
          </TableBody>
        </Table>
      )}
    </TableContainer>
    <KiloModal
      isOpen={isKiloModalOpen}
      onClose={closeModal}
      onSubmit={(kiloValue) => handleKiloSubmit(selectedOrderId, kiloValue)}
  
    />

    {selectedOrder && (
      <EditOrders
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdate={forceUpdate}
      />
    )}

    {showOrder && (
     
        <ViewOrders sx={{maxWidth:"500px"}} showOrder={showOrder} onClose={() => setShowOrder(null)} />

      )}
    </>
  );
};

export default Orders;
