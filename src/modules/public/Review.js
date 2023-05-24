import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Paper, Rating, TextField, Typography } from '@mui/material';
import ToastNotification from '../../components/ToastNotification';
import { handleErrorResponse } from '../../utils/helpers';
import Http from '../../services/Http';

const reviewBox = {
  width: '50%',
  marginRight: '15px',
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
  width: '50%',
  marginLeft: '15px',
  maxHeight: '300px',
  overflowY: 'auto',
};

function Review() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userComment, setUserComment] = useState('');
  const [adminReply, setAdminReply] = useState([]);

  useEffect(() => {
    fetchUserComment();
    fetchAdminReply();
  }, []);

  const fetchUserComment = (userId) => {
    Http.get(`user/comments/${userId}`)
      .then((res) => {
        console.log(res.data.data);
        setUserComment(res.data.data.comments);
      })
      .catch((err) => {
        console.error('Error fetching user comment:', err);
      });
  };

  const fetchAdminReply = () => {
    Http.get('admin/replies')
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
    Http.post('add/reviews', formData)
      .then((res) => {
        if (res.data.status === 200) {
          // Handle success message and any other necessary actions
          ToastNotification('success', 'Successfully Saved Data!');
          setRating(0);
          setComment('');
        } else {
          // Handle error message
          ToastNotification('error', res.data.message);
        }
      })
      .catch((err) => {
        // Handle error message
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
      <Box sx={reviewCon}>
        <Box sx={reviewBox}>
          <Box sx={reviewBox2}>
            <Typography variant="h5" component="h1" gutterBottom>
              Rate and Review the Laundry Shop
            </Typography>
            <Rating name="rating" value={rating} onChange={handleRatingChange} />
            <TextField
              name="comment"
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
        <Box sx={commentBox}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6">User Comment:</Typography>
              {userComment ? (
                <>
                  {userComment.length > 100 ? (
                    <>
                      <Typography>{`${userComment.slice(0, 100)}...`}</Typography>
                      <Typography color="primary">See More</Typography>
                    </>
                  ) : (
                    <Typography>{userComment}</Typography>
                  )}
                </>
              ) : (
                <Typography>No comment</Typography>
              )}
            </Box>
            <Box p={2}>
              <Typography variant="h6">Admin Reply:</Typography>
              {adminReply.length > 0 ? (
                adminReply.map((reply, index) => (
                  <div key={index}>
                    {reply.length > 100 ? (
                      <>
                        <Typography>{`${reply.slice(0, 100)}...`}</Typography>
                        <Typography color="primary">See More</Typography>
                      </>
                    ) : (
                      <Typography>{reply}</Typography>
                    )}
                  </div>
                ))
              ) : (
                <Typography>No reply</Typography>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}

export default Review;
