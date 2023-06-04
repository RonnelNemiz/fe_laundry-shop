import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Http from '../../../../services/Http';
import { Tooltip } from '@mui/material';

const Delete = ({ selectedItem, onDelete, forceUpdate }) => {
  const handleDelete = () => {
    Http.delete(`/delete/orders/${selectedItem.id}`)
      .then(() => {
        onDelete(selectedItem.id);
        forceUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Tooltip title="Delete">
    <DeleteIcon
      onClick={handleDelete}
      color="error"
      sx={{
        fontsize: "30px",
        cursor: "pointer",
        position: "relative",
        left: "10px",
        transition: ".5s",
        "&:hover": {
          color: "black",
        },
      }}
    />
    </Tooltip>
  );
};

export default Delete;
