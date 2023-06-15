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

const DetergentModal = ({ isOpen, onClose, order, onUpdate}) => {
  const [detergentValue, setDetergentValue] = useState("");
  const [detergents, setDetergents] = useState([]);

  const handleSubmit = () => {
    Http.post(`/select/detergent/${detergentValue}/${order.id}`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }}, detergentValue)
      .then((res) => {
        if (res.data) {
          onClose();
          onUpdate();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleInputChange = (e) => {
    setDetergentValue(e.target.value);
  };

  React.useEffect(() => {
    fetchDetergent();
  }, []);

  const fetchDetergent = () => {
    Http.get("/detergents",{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then((res) => {
        setDetergents(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Select Detergent</DialogTitle>
      <DialogContent>
        <FormControl fullWidth size="small" variant="outlined" margin="dense">
          <InputLabel id="detergent-label">Detergent</InputLabel>
          <Select
            labelId="detergent-label"
            id="detergent_name"
            label="Detergent"
            value={detergentValue}
            onChange={handleInputChange}
          >
            {detergents &&
              detergents.map((detergent) => {
                return (
                  <MenuItem key={detergent.id} value={detergent.id} id="detergent_name">
                    {detergent.detergent_name}
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

export default DetergentModal;
