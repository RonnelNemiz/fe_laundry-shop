import React, { useState } from "react";
import { Dialog, DialogTitle, Button, TextField } from "@mui/material";
import ToastNotification from "../../../../components/ToastNotification";
import { handleErrorResponse } from "../../../../utils/helpers";
import Http from "../../../../services/Http";
import { Box, Rating, Typography } from "@mui/material";
const reviewBox = {
  display: "flex",
  justifyContent: "center",
};

const reviewBox2 = {
  display: "flex",
  flexDirection: "column",
  width: "80%",
};

function CommentModal(props) {
  const { open, onClose, onSubmit } = props;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmitRating = (e) => {
    e.preventDefault();

    const formData = {
      rating,
      comment,
    };
    Http.post("add/reviews", formData)
      .then((res) => {
        if (res.data.status === 200) {
          ToastNotification("success", "Successfully Saved Data!");
          setRating(0);
          setComment("");
          setLoading(!loading);
        } else {
          ToastNotification("error", res.data.message);
        }
      })
      .catch((err) => {
        ToastNotification("error", handleErrorResponse(err));
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: "center" }}>Rate and Reviews</DialogTitle>
      <form onSubmit={handleSubmit}>
        <Box sx={reviewBox}>
          <Box sx={reviewBox2}>
            <Typography variant="h5" component="h1" gutterBottom id="headshot">
              Rate and Review the Laundry Shop
            </Typography>
            <Rating
              name="rating"
              id="stars-ship"
              value={rating}
              onChange={handleRatingChange}
            />
            <TextField
              name="comment"
              label="Comment"
              multiline
              rows={4}
              value={comment}
              onChange={handleCommentChange}
              margin="normal"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            paddingBottom: "25px",
            paddingTop: "25px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmitRating}
          >
            Submit
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </form>
    </Dialog>
  );
}

export default CommentModal;
