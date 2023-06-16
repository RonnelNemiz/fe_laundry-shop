import React from "react";
// import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import StepperP from "./addComponents/StepperP";
import Http from "../../../../services/Http";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box, Modal, Tooltip } from "@mui/material";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height:"100vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderColor: "none",
  borderRadius: "10px 10px",
  overflow: "auto",
};

function AddOrders() {
  const [categories, setCategories] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    Http.get('/categories',{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }}).then(res => {
      if (res.data.data) {
        setCategories(res.data.data);
      } else {
        console.log('Error occured!');
      }
    }).catch(err => {
      console.log(err)
    })
  }, []);

  return (
    <div>
       <Tooltip title="Add">
      <AddBoxIcon
        onClick={handleOpen}
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
      </Tooltip>
       <Modal open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <StepperP categories={categories} />
        </Box>
        </Modal>
    </div>
  );
}

export default AddOrders;
