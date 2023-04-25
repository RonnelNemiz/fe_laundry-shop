import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CompactCard from './CompactCard';
import ExpandedCard from './ExpandedCard';
import "react-circular-progressbar/dist/styles.css";


const dashStyle = {
  position: 'absolute',
  top: '50%',
  left: '43%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  
};


export default function DashCardItem(props) {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div  onClick={handleOpen}>
      <CompactCard param={props}/>
      </div>
      
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={dashStyle}>
      <ExpandedCard param={props} />
      </Box>
    
      </Modal>
    </div>
  );
}