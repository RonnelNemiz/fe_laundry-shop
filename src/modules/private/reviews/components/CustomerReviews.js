import React, { useEffect, useReducer, useState } from 'react';
import { TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Http from '../../../../services/Http';
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from '@mui/icons-material/Reply';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    fetchReviews();
  }, [ignored]);

  const fetchReviews = () => {
    Http.get("/reviews",{headers:{
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }})
      .then((res) => {
        setReviews(res.data.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  };

  const handleReplySubmit = (reviewId, reply) => {
    const data = {
      reply: reply,
      reply_at: new Date().toISOString(),
    };

    Http.post(`/reviews/${reviewId}/reply`, data,{headers:{
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }})
      .then(response => {
        console.log('Reply submitted successfully:', response.data);
        // Update the reviews state or perform any other necessary actions
      })
      .catch(error => {
        console.error('Error submitting reply:', error);
      });
  };
  const handleDelete = (reviewId) => {
    Http.delete(`/delete/reviews/${reviewId}`,{headers:{
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }})
      .then(response => {
        forceUpdate();
        console.log('Review deleted successfully:', response.data);
        // Update the reviews state or perform any other necessary actions
      })
      .catch(error => {
        console.error('Error deleting review:', error);
      });
  };

  return (
    <div>
      {/* <Typography variant="h4">Reviews</Typography> */}
      {reviews && reviews.map(review => (
        <ReviewItem
          key={review.id}
          review={review}
          onReplySubmit={handleReplySubmit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const ReviewItem = ({ review, onReplySubmit, onDelete }) => {
  const [reply, setReply] = useState('');
  const [adminReply, setAdminReply] = useState(review.reply || '');
  const [open, setOpen] = useState(false);
  const [openReplyModal, setOpenReplyModal] = useState(false);
  


  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    onReplySubmit(review.id, reply);
    setReply('');
    setAdminReply(reply); // Update the admin's reply immediately in the UI
    setOpenReplyModal(false);
  };

  const handleOpenReplyModal = () => {
    setOpenReplyModal(true);
  };

  const handleCloseReplyModal = () => {
    setOpenReplyModal(false);
  };
  const handleDelete = () => {
    onDelete(review.id);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  return (
    <Box my={2}>
      <Typography variant="medium">{review.user?.profile?.first_name} {review.user?.profile?.last_name}</Typography>
      <Typography>Rating: {review.ratings}</Typography>
      <Typography>Comment: {review.comments}</Typography>
      {adminReply && <Typography>Admin Reply: {adminReply}</Typography>}
      <Button onClick={handleOpenReplyModal}>
        <ReplyIcon 
          color="primary"
          sx={{
            width:".8em",
            height:".8em",
            fontsize: "10px",
            cursor: "pointer",
            position: "relative",
            left: "10px",
            transition: ".5s",
            "&:hover": {
              color: "black",
            },
          }}
        />
      </Button>
      <Button onClick={handleClickOpen}>
        <DeleteIcon 
          color="error"
          sx={{
            width:".8em",
            height:".8em",
            fontsize: "10px",
            cursor: "pointer",
            position: "relative",
            left: "10px",
            transition: ".5s",
            "&:hover": {
              color: "black",
            },
          }}
        />
      </Button>
      <Dialog open={openReplyModal} >
        <DialogTitle>Reply to Review</DialogTitle>
        <DialogContent>
          <form onSubmit={handleReplySubmit}>
            <TextField
              label="Reply"
              value={reply}
              onChange={handleReplyChange}
              fullWidth
              multiline
              rows={4}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit Reply
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReplyModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this review?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
    </Box>
  );
};

export default CustomerReviews;
