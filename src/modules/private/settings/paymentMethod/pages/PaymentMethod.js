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
import Http from "../../../../../services/Http";
import EditPayMeth from "../components/EditPayMeth";
import DeletePayMeth from "../components/DeletePayMeth";
import AddPayMeth from "../components/AddPayMeth";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShowPayMeth from "../components/ShowPaymeth";


const PaymentMethod = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [paymentData, setPaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    Http.get("/payments")
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
    Http.get(`update/payments/${values}`).then(
    );
  };
  const handleDelete = (id) => {
    Http.delete(`delete/payments/${id}`)
      .then(

      );
  };
const handleShow = (id) => {
  Http.get(`view/payments/${id}`)
    .then((res) => {
      setSelectedItem(res.data);
    })
      .catch((err) => {
        console.log(err);
      });
};


  return (
    <>
    <AddPayMeth forceUpdate={() => forceUpdate()} />
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
              <TableCell size="small">Payment Method</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentData.map((payment) => (
              <TableRow key={payment.id}>
                 <TableCell size="small" sx={{display:"flex", alignItems:"center"}}>
                 <VisibilityIcon 
                  onClick={() => handleShow(payment.id)}
                  style={{cursor:"pointer", color:"gray"}}
                 />
                  <EditPayMeth
                      selectedItem={payment}
                      onEdit={handleUpdate}
                      forceUpdate={() => forceUpdate()}
                    />
                  <DeletePayMeth
                  selectedItem={payment}
                  onDelete={handleDelete} 
                    forceUpdate={() => forceUpdate()} />

                  </TableCell>
                  <TableCell size="small">{payment.payment_name}</TableCell>               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
    {selectedItem && (
      <ShowPayMeth sx={{maxWidth:"500px"}} selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />
    )}
    </>
  );
};

export default PaymentMethod;
