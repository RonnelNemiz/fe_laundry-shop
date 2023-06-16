import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Rating, TextField, Typography } from '@mui/material';
import Http from '../../../services/Http';
import ToastNotification from '../../../components/ToastNotification';
import { handleErrorResponse } from '../../../utils/helpers';
import "./review.css";

const reviewBox = {
  width: '50%',
};

const reviewBox2 = {
  display: 'flex',
  flexDirection: 'column',
  width: '80%',
};

const reviewCon = {
  display: 'flex',
};

const commentBox = {
  width: '100%',
  marginLeft: '15px',
  maxHeight: '300px',
  overflowY: 'auto',
};

function Review() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userComment, setUserComment] = useState('');
  const [adminReply, setAdminReply] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserComment();
    fetchAdminReply();
  }, [loading]);

  const fetchUserComment = () => {
    const userId = localStorage.getItem('user_id'); 
  
    Http.get(`user/comments/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((res) => {
        setUserComment(res.data.data.comments);
      })
      .catch((err) => {
        console.error('Error fetching user comment:', err);
      });
  };
  
  const fetchAdminReply = () => {
    Http.get('admin/replies', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((res) => {
        setAdminReply(res.data.data.replies);
      })
      .catch((err) => {
        console.error('Error fetching admin reply:', err);
      });
  };

  const handleSubmitRating = (e) => {
    e.preventDefault();

    const formData = {
      rating,
      comment,
    };
    Http.post('add/reviews', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then((res) => {
        if (res.data.status === 200) {
          ToastNotification('success', 'Successfully Saved Data!');
          setRating(0);
          setComment('');
          setLoading(!loading);
        } else {
          ToastNotification('error', res.data.message);
        }
      })
      .catch((err) => {
        ToastNotification('error', handleErrorResponse(err));
      });
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <Box sx={reviewCon} id="reviewsa">
        <Box sx={reviewBox}>
          <Box sx={reviewBox2}>
            <Typography variant="h5" component="h1" gutterBottom id="headshot">
              Rate and Review the Laundry Shop
            </Typography>
            <Rating name="rating" id="stars-ship" value={rating} onChange={handleRatingChange} />
            <TextField
              name="comments"
              label="Comment"
              multiline
              rows={4}
              value={comment}
              onChange={handleCommentChange}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmitRating}>
              Submit
            </Button>
          </Box>
        </Box>
        <Box sx={commentBox} id="commentkuno">
          <Paper style={{ width: "unset" }}>
            <Box p={2}>
              <Typography variant="h6">User Comment:</Typography>
              {userComment ? (
                <>
                  {userComment?.length > 100 ? (
                    <>
                      <Typography>{`${userComment.slice(0, 100)}...`}</Typography>
                      <Typography color="primary">See More</Typography>
                    </>
                  ) : (
                    <Typography>{userComment}</Typography>
                  )}
                </>
              ) : (
                <Typography>No comments yet.</Typography>
              )}
            </Box>
          </Paper>
          <Paper style={{ width: "unset" }}>
            <Box p={2}>
              <Typography variant="h6">Admin Reply:</Typography>
              {adminReply ? (
                <>
                  {adminReply?.length > 100 ? (
                    <>
                      <Typography>{`${adminReply.slice(0, 100)}...`}</Typography>
                      <Typography color="primary">See More</Typography>
                    </>
                  ) : (
                    <Typography>{adminReply}</Typography>
                  )}
                </>
              ) : (
                <Typography>No replies yet.</Typography>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}

export default Review;
