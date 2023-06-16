import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Http from "../../../../services/Http";

const FabconModal = ({ isOpen, onClose, order, forceUpdate}) => {
  const [fabconValue, setFabconValue] = useState("");
  const [fabcons, setFabcons] = useState([]);

  const handleSubmit = () => {
    Http.post(`/choose/fabcon/${fabconValue}/${order.id}`, {headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }}, fabconValue)
      .then((res) => {
        if (res.data) {
          onClose();
          forceUpdate();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleInputChange = (e) => {
    setFabconValue(e.target.value);
  };

  React.useEffect(() => {
    fetchFabcons();
  }, []);

  const fetchFabcons = () => {
    Http.get("/fabcons",{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then((res) => {
        setFabcons(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Select Fabcon</DialogTitle>
      <DialogContent>
        <FormControl fullWidth size="small" variant="outlined" margin="dense">
          <InputLabel id="fabcon-label">Fabcon</InputLabel>
          <Select
            labelId="fabcon-label"
            id="fabcon_name"
            label="Fabcon"
            value={fabconValue}
            onChange={handleInputChange}
          >
            {fabcons &&
              fabcons.map((fabcon) => {
                return (
                  <MenuItem key={fabcon.id} value={fabcon.id} id="fabcon_name">
                    {fabcon.fabcon_name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" size="small">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" size="small">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FabconModal;
