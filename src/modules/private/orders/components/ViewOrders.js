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

const pStyle = {
  marginBottom:"5px"
};

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
      <Dialog open={true} onClose={onClose}>
        <DialogTitle
          sx={{ color: "#1976d2", fontWeight: "500", textAlign: "center" }}
        >
          Customer Details
        </DialogTitle>
        <DialogContent sx={{ overflowY: "auto", maxHeight: "500px" }}>
          <div
            ref={componentRef}
            style={{ paddingLeft: "50px", paddingTop: "20px" }}
          >
            {/* <p><b>:</b> {viewOrder.email}</p> */}
            <p style={pStyle}>
             <b>Transaction Number:</b> {showOrder.trans_number}
            </p>
            <p style={pStyle}>
              <b>Name:</b> {showOrder.user.profile?.first_name ?? "ADMIN"} {showOrder.user.profile?.last_name ?? "ADMIN"}
            </p>
            <p style={pStyle}>
              <b>Address:</b> {showOrder.user.profile?.purok} {showOrder.user.profile?.brgy} {showOrder.user.profile?.municipality}, Leyte
            </p>
            <p style={pStyle}>
              <b>Landmark:</b> {showOrder.user.profile?.land_mark}
            </p>
            <p style={pStyle}>
              <b>Contact Number:</b> {showOrder.user.profile?.contact_number}
            </p>
            <p style={pStyle}>
              <b>Email:</b> {showOrder.user.email}
            </p>
            <p style={pStyle}>
              <b>Order Status:</b> {showOrder.status}
            </p>
            <p style={pStyle}>
              <b>Payment Status:</b> {showOrder.payment_status}
            </p>
            <p style={pStyle}>
              <b>Kilo:</b>
              {showOrder &&
                showOrder.categories
                  .reduce((uniqueParentIds, category) => {
                    const isDuplicateParentId = uniqueParentIds.includes(
                      category.parent_id
                    );
                    if (!isDuplicateParentId) {
                      uniqueParentIds.push(category.parent_id);
                    }
                    return uniqueParentIds;
                  }, [])
                  .map((parentId) => {
                    const category = showOrder.categories.find(
                      (c) => c.parent_id === parentId
                    );
                    return (
                      <span key={category.id} style={{ marginLeft: "20px" }}>
                        <b style={{ color: "#1976d2" }}>
                          {category.parent_id}:
                        </b> {category.pivot.kilo}, 
                      </span>
                    );
                  })}
            </p>

            <p style={pStyle}>
              <b>Approved By:</b> {showOrder.approved_by}
            </p>
            <p style={pStyle}>
            <b>Service:</b>{" "}
              {(showOrder.handling_id === 1 && "Wash Dry & Fold P20") ||
                (showOrder.handling_id === 2 && "Ironing P50") }
            </p>
            <p style={pStyle}>
              <b>Handling:</b>{" "}
              {(showOrder.handling_id === 1 && "Pickup & Delivery P40") ||
                (showOrder.handling_id === 2 && "Pickup P20") ||
                (showOrder.handling_id === 3 && "Delivery P20") ||
                (showOrder.handling_id === 4 && "Walk-in P0")}
            </p>
            <p style={pStyle}>
              <b>Payment:</b>{" "}
              {(showOrder.payment_id === 1 && "GCASH") ||
                (showOrder.payment_id === 2 && "COD") ||
                (showOrder.payment_id === 3 && "SAGPA")}
            </p>
            <p style={pStyle}>
              <b>Categories:</b>{" "}
              <Typography
                sx={{ fontSize: ".7em", fontStyle: "italic", color: "blue" }}
              >
                <b>Note:</b>
                <div>1: Colored Bedsheet Towel(P200, 5kls.max)</div>
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
