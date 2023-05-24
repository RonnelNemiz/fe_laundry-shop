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
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddOrders from "./components/AddOrders";
import EditOrders from "./components/EditOrders";
import Delete from "./components/Delete";
import ViewOrders from "./components/ViewOrders";
import Http from "../../../services/Http";


const Orders = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showOrder, setShowOrder] = useState(null);

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

  const handleUpdate = (values) => {
    Http.get(`update/orders/${values}`).then();
  };

  const handleDelete = (values) => {
    Http.delete(`/delete/orders/${values}`).then(
      );
  };
  const handleShow = (data) => { 
   setShowOrder(data);
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
              return (
              <TableRow key={data.id}>
                 <TableCell size="small" sx={{display:"flex", alignItems:"center"}}>
                
                <VisibilityIcon 
                   onClick={() => handleShow(data)}
                   style={{ cursor: "pointer", color:"gray" }}
                />
                <EditOrders
                    selectedItem={data}
                    onEdit={handleUpdate}
                    forceUpdate={() => forceUpdate()}
                  />
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
                <TableCell size="small">{data.kilo}</TableCell>
                <TableCell size="small">{data.total}</TableCell>
                <TableCell size="small">{data.status}</TableCell>
                <TableCell size="small">{data.payment_status}</TableCell>
                <TableCell size="small">{data.payment_id === 1 && "GCASH" || data.payment_id === 2 && "COD" ||  data.payment_id === 3 && "SAGPA"}</TableCell>
                <TableCell size="small">{data.approved_by}</TableCell>
                <TableCell size="small">{data.created_at}</TableCell>
               
              </TableRow>
            )})}
          </TableBody>
        </Table>
      )}
    </TableContainer>
    {showOrder && (
        <ViewOrders sx={{maxWidth:"500px"}} showOrder={showOrder} onClose={() => setShowOrder(null)} />
      )}
    </>
  );
};

export default Orders;
