import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Rating, TextField, Typography } from '@mui/material';
import Http from '../../../services/Http';
import ToastNotification from '../../../components/ToastNotification';
import { handleErrorResponse } from '../../../utils/helpers';
import "./review.css";


const reviewBox = {
  width: '50%',
  // marginRight: '15px',
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
  }, []);

  useEffect(() => {
    fetchAdminReply();
    fetchUserComment();
  }, [loading]);

  const fetchUserComment = (userId) => {
    Http.get(`user/comments/${userId}`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then((res) => {
        console.log(res.data.data);
        setUserComment(res.data.data.comments);
      })
      .catch((err) => {
        console.error('Error fetching user comment:', err);
      });
  };

  const fetchAdminReply = () => {
    Http.get('admin/replies',{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
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
    Http.post('add/reviews',{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }}, formData)
      .then((res) => {
        if (res.data.status === 200) {
          // Handle success message and any other necessary actions
          ToastNotification('success', 'Successfully Saved Data!');
          setRating(0);
          setComment('');
          setLoading(!loading);
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
      <Box sx={reviewCon} id="reviewsa">
        <Box sx={reviewBox}>
          <Box sx={reviewBox2}>
            <Typography variant="h5" component="h1" gutterBottom id="headshot">
              Rate and Review the Laundry Shop
            </Typography>
            <Rating name="rating" id="stars-ship" value={rating} onChange={handleRatingChange} />
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
        <Box sx={commentBox} id="commentkuno">
          <Paper style={{width:"unset"}}>
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
                <Typography>No comment</Typography>
              )}
            </Box>
            <Box p={2}>
              <Typography variant="h6">Admin Reply:</Typography>
              {adminReply?.length > 0 ? (
                adminReply.map((reply, index) => (
                  <div key={index}>
                    {reply?.length > 100 ? (
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
