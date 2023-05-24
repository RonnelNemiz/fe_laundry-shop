// import React from "react";
// import {
//     Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Modal,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Http from "../../../../../services/Http";


// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   borderColor: "none",
//   borderRadius: "10px 10px",
// };

// export default function DeleteHandling(props) {
//   const { selectedItem, onDelete, forceUpdate } = props;
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

// //   const handleDelete = () => {
// //     Http.delete(`delete/handlings/${selectedItem.id}`)
// //       .then(() => {
// //         forceUpdate();
// //         handleClose();
// //         onDelete(selectedItem.id);
      
// //       })
// //       .catch((err) => console.log(err));
// //   };
// const handleDelete = () => {
//     Http.delete(`/delete/handlings/${selectedItem.id}`)
//       .then(() => {
//         onDelete();
//         forceUpdate();
//         handleClose();
//       })
//       .catch((err) => {
//         console.log(err);
//         handleClose();
//       });
//   };
  

//   return (
//     <>
//       <Tooltip title="Delete">
//       <DeleteIcon 
//         onClick={handleOpen}
//         color="error"
//         sx={{
//           m: 1,
//           fontsize: "30px",
//           cursor: "pointer",
//           position: "relative",
//           left: "10px",
//           transition: ".5s",
//           "&:hover": {
//             color: "black",
//           },
//         }}
//       />
//       </Tooltip>
//       {/* <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Delete Handling</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this handling?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleDelete} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog> */}
//       <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//      >
//       <Box sx={style}>
//         <Typography id="modal-modal-title" variant="h6" component="h2">
//           Are you sure? If deleted you will not able to recover the data.
//         </Typography>

//         <Button variant="outlined" color="primary" onClick={handleClose} >
//           Cancel
//         </Button>
//         <Button variant="outlined" color="error"  onClick={handleDelete} autoFocus >
//           Procced
//         </Button>
//       </Box>
//      </Modal>
//     </>
//   );
// }

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import Http from "../../../../../services/Http";
import DeleteIcon from "@mui/icons-material/Delete";
import ToastNotification from "../../../../../components/ToastNotification";
import { handleErrorResponse } from "../../../../../utils/helpers";


const options = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  draggable: true,
  draggableDirection: 60,
  theme: "colored",
};

export default function DeleteHandling(props) {
  const { selectedItem, onDelete, forceUpdate } = props;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    setLoading(true);
    Http.delete(`/delete/handlings/${id}`)
      .then((res) => {
        onDelete();
        forceUpdate();
        ToastNotification("success", "Successfully Deleted Data", options);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        ToastNotification("error", handleErrorResponse(err), options);
      });
  };

  return (
    <>
      <Button onClick={handleClickOpen}>
      <DeleteIcon 
        color="error"
        sx={{
          m: 1,
          fontsize: "30px",
          cursor: "pointer",
          position: "relative",
          left: "10px",
          transition: ".5s",
          "&:hover": {
            color: "black",
          },
        }}
      /></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Handling</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{fontWeight:"500"}}>
            Are you sure you want to delete the handling "{selectedItem.handling_name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={() => handleDelete(selectedItem.id)} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
