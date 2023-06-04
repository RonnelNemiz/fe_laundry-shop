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
} from "@mui/material";
import { Button } from "react-bootstrap";
import Http from "../../../../services/Http";

const FabconModal = ({ isOpen, onClose, onSubmit,orderId }) => {
  const [fabconValue, setFabconValue] = useState("");
  const [fabcons, setFabcons] = useState([]);

  const handleSubmit = () => {
    const formData = {
      fabcon_id: fabconValue,
    };
    onSubmit(formData);
    setFabconValue("");
  };  

  const handleInputChange = (e) => {
    setFabconValue(e.target.value);
  };

  React.useEffect(() => {
    fetchFabcons();
  }, []);

  const fetchFabcons = () => {
    Http.get("/show/fabcons")
      .then((res) => {
        console.log(res.data);
        setFabcons(res.data);
      })
      .catch((err) => {
        console.log(err);
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
            {fabcons && fabcons.map((fabcon) => {
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FabconModal;
