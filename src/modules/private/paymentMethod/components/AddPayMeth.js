import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import Http from "../../../../services/Http";
import ToastNotification from "../../../../components/ToastNotification";
import PaymentIcon from "@mui/icons-material/AddBox";

const AddPayMeth = ({ forceUpdate }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [recipient, setRecipient] = useState("");
  const [number, setNumber] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const paymentMethodData = new FormData();
    paymentMethodData.append("name", name);
    paymentMethodData.append("logo", selectedFile);
    paymentMethodData.append("recipient", recipient);
    paymentMethodData.append("number", number);
    paymentMethodData.append("special_instructions", instructions);

    Http.post("add/payment-method", paymentMethodData)
      .then(() => {
        handleClose();
        ToastNotification("success", "Payment method added successfully!");
        forceUpdate();
      })
      .catch((error) => {
        ToastNotification("error", error.message);
      });
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <PaymentIcon
        onClick={handleClickOpen}
        sx={{
          m: 1,
          fontsize: "30px",
          cursor: "pointer",
          color: "gray",
          position: "relative",
          left: "10px",
          transition: ".5s",
          "&:hover": {
            color: "black",
          },
        }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Payment Method</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Recipient"
            type="text"
            fullWidth
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Number"
            type="text"
            fullWidth
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Instructions"
            type="text"
            fullWidth
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          {/* <div className="d-flex flex-column mt-3">
            <label htmlFor="file-upload">Choose a file:</label>
            <TextField
              id="file-upload"
              type="file"
              value={selectedFile}
              onChange={(e) => setLogo(e.target.value)}
              inputProps={{
                accept: ".jpg, .png, .pdf",
                onChange: handleFileChange,
              }}
            />
            <p>Selected file: {selectedFile ? selectedFile.name : "None"}</p>
          </div> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPayMeth;
