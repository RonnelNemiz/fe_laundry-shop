import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import "../../../../assets/css/admin.css";
import { useReactToPrint } from "react-to-print";



const ViewOrders = ({ showOrder, onClose }) => {
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  
  if (!showOrder) {
    return <div>...</div>;
  }



  return (
    <>
 
      <Dialog open={true} onClose={onClose}  > 
     
              <DialogTitle
                sx={{ color: "#1976d2", fontWeight: "500", textAlign: "center" }}
              >
                User Details
              </DialogTitle>
              <DialogContent sx={{ overflowY: "auto", maxHeight: "500px" }}>
              <div ref={componentRef} style={{paddingLeft: "50px", paddingTop: "20px"}}>
                {/* <p><b>:</b> {viewOrder.email}</p> */}
                <p>
                  <b>Transaction Number:</b> {showOrder.trans_number}
                </p>
                <p>
                  <b>First Name:</b>{" "}
                  {showOrder.user.profile?.first_name ?? "ADMIN"}
                </p>
                <p>
                  <b>Last Name:</b>{" "}
                    {showOrder.user.profile?.last_name ?? "ADMIN"}
                </p>
                <p>
                  <b>Purok:</b>{" "}
                    {showOrder.user.profile?.purok}
                </p>
                <p>
                  <b>Brgy:</b>{" "}
                    {showOrder.user.profile?.brgy}
                </p>
                <p>
                  <b>Municipality:</b>{" "}
                    {showOrder.user.profile?.municipality}
                </p>
                <p>
                  <b>Landmark:</b>{" "}
                    {showOrder.user.profile?.land_mark}
                </p>
                <p>
                  <b>Contact Number:</b>{" "}
                    {showOrder.user.profile?.contact_number}
                </p>
                <p>
                  <b>Email:</b>{" "}
                    {showOrder.user.email}
                </p>
                <p>
                  <b>Order Status:</b> {showOrder.status}
                </p>
                <p>
                  <b>Payment Status:</b> {showOrder.payment_status}
                </p>
                <p>
                <b>Kilo:</b> 
                {showOrder && showOrder.categories.map((category) => (
                      <span key={category.id}>
                      {category.pivot.kilo}
                      </span>
                    ))}
                  {/* <b>Kilo:</b> {showOrder.pivot.kilo} */}
                </p>
                <p>
                  <b>Total:</b> {showOrder.total}
                </p>
                <p>
                  <b>Approved By:</b> {showOrder.approved_by}
                </p>
                <p>
                  <b>Handling:</b>{" "}
                  {showOrder.handling_id === 1 && "Pickup & Delivery P40" || showOrder.handling_id === 2 && "Pickup P20" || showOrder.handling_id === 3 && "Delivery P20" || showOrder.handling_id === 4 && "Walk-in P0"}
                  
                </p>
                <p>
                  <b>Payment:</b>{" "}
                  {showOrder.payment_id === 1 && "GCASH" || showOrder.payment_id === 2 && "COD" ||  showOrder.payment_id === 3 && "SAGPA"}
                </p>
                <p>
                  <b>Categories:</b>{" "}
                  <Typography sx={{fontSize:".7em", fontStyle:"italic", color:"blue"}}>
                   <b>Note:</b><div>1: Colored Bedsheet Towel(P200, 5kls.max)</div>
                                <div>7: Colored Garment Towel(P150, 7kls.max)</div>
                                <div>17: White Bedsheet Towel(P250, 6kls.max)</div>
                                <div>7: White Garment Towel(P300, 5kls.max)</div>
                  </Typography>
                  <Typography component="ul">
                    {showOrder &&
                      showOrder.categories &&
                      showOrder?.categories?.map((category, i) => (
                        <Typography key={i} component="li">
                         <span>{category.parent_id} </span> 
                         {category.name} (Quantity: {category.pivot.quantity})
                        </Typography>
                      ))}
                  </Typography>
                </p>
                </div>
              </DialogContent>
         
            <DialogActions>
            <Button onClick={handlePrint}>Print</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
         
      </Dialog>
 
    </>
  );
};

export default ViewOrders;
