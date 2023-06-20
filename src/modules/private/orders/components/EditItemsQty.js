import React, { useState, useEffect, useReducer } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Typography, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Http from "../../../../services/Http";
import OrderItems from "./addComponents/OrderItems";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  close: {
    textTransform: "unset",
  },
};

export default function EditItemsQty(props) {
  const { open, onClose, orderId } = props;

  useEffect(() => {
    //
  }, [open]);

  const [formValues, setFormValues] = useState({
    colorbdst_bedsheet: "",
    colorbdst_towel: "",
    colorbdst_curtain: "",
    colorbdst_blanket: "",
    colorbdst_pillowcase: "",

    colorgart_tshirt: "",
    colorgart_underwear: "",
    colorgart_shorts: "",
    colorgart_pants: "",
    colorgart_jacket: "",
    colorgart_blouse: "",
    colorgart_socks: "",
    colorgart_handkerchief: "",

    whitebdst_bedsheet: "",
    whitebdst_towel: "",
    whitebdst_curtain: "",
    whitebdst_blanket: "",
    whitebdst_pillowcase: "",

    whitegart_tshirt: "",
    whitegart_underwear: "",
    whitegart_shorts: "",
    whitegart_pants: "",
    whitegart_jacket: "",
    whitegart_blouse: "",
    whitegart_socks: "",
    whitegart_handkerchief: "",
  });

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Edit Order</DialogTitle>
      <DialogContent>
        <OrderItems />
      </DialogContent>

      <DialogActions>
        <Button size="small" color="primary" variant="contained" onClick="">
          Update
        </Button>
        <Button
          sx={styles.close}
          size="small"
          color="error"
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
