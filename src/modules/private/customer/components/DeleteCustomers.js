// import * as React from 'react';
// import Http from '../../../../services/Http';
// import  DeleteIcon from '@mui/icons-material/Delete';
// import { Box, Button, Modal } from '@mui/material';
// import { Typography } from '@mui/material';

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

// export default function DeleteCustomers() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleDelete = (id) => {
//     Http.delete(`delete/customers/${id}`)
//   }
//   return (
//     <span>
//      <DeleteIcon onClick={handleOpen}
//       sx={{
//         fontSize: '20px',
//         color: 'red',
//         mr: 1,
//         cursor: 'pionter',
//         "&:hover":{
//           color:'black',
//         }
//       }} 
//      />
//      <Modal
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
//         <Button variant="outlined" color="error" onClick={handleDelete} >
//           Procced
//         </Button>
//       </Box>
//      </Modal>
      
//     </span>
//   );
// }

