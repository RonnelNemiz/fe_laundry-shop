import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Http from "../../../services/Http";
import ToastNotification from "../../../components/ToastNotification";
import { handleErrorResponse } from "../../../utils/helpers";
import "./review.css";
// import DeleteIcon from "@mui/icons-material/Delete";
// import DeleteReviewModal from "./DeleteReviewModal";

const reviewBox = {
  width: "50%",
  // marginRight: '15px',
};

const reviewBox2 = {
  display: "flex",
  flexDirection: "column",
  width: "80%",
};

const reviewCon = {
  display: "flex",
};

function Review() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [userReviews, setUserReviews] = useState([]);

  // const [isModalOpen, setModalOpen] = useState(false);
  // const [selectedReview, setSelectedReview] = useState(null);

  // const handleOpenModal = (review) => {
  //   setSelectedReview(review);
  //   setModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setModalOpen(false);
  // };

  useEffect(() => {
    fetchUserComment();
  }, [loading]);

  const fetchUserComment = (userId) => {
    Http.get(`user/comments/${userId}`)
      .then((res) => {
        setUserReviews(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching user comments:", err);
      });
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

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // const handleDeleteReview = () => {
  //   if (selectedReview) {
  //     Http.delete(`delete/customerside/${selectedReview.id}`)
  //       .then((res) => {
  //         if (res.data.message) {
  //           ToastNotification("success", res.data.message);
  //           setLoading(!loading);
  //         } else {
  //           ToastNotification("error", "Failed to delete review");
  //         }
  //       })
  //       .catch((err) => {
  //         ToastNotification("error", "Failed to delete review");
  //       })
  //       .finally(() => {
  //         handleCloseModal();
  //       });
  //   }
  // };
  

  return (
    <div>
      <Box sx={reviewCon} id="reviewsa">
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmitRating}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Box style={{ height: "50vh", overflowX: "auto", width: "40%" }}>
          {userReviews && userReviews.length > 0 ? (
            <>
              {userReviews.map((review, index) => (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 500,
                    bgcolor: "background.paper",
                  }}
                  key={index}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <Box style={{ display: "flex", flexDirection: "column" }}>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography sx={{ fontSize: ".8em" }}>
                              Rating: {review.rating}
                            </Typography>
                          </React.Fragment>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              You
                            </Typography>
                            <span> — {review.comment}</span>
                            <Typography sx={{ fontSize: "10px" }}>
                              ({review.created_at})
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <ListItemText
                        style={{ textIndent: "50px" }}
                        primary={<React.Fragment></React.Fragment>}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Admin
                              <span> — {review.reply}</span>
                            </Typography>
                            <Typography sx={{ fontSize: "10px" }}>
                              ({review.reply_at})
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </Box>
                    {/* <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleOpenModal(review)}
                    >
                      <DeleteIcon />
                    </IconButton> */}
                  </ListItem>

                  <Divider
                    variant="inset"
                    component="li"
                    style={{
                      color: "black",
                      marginLeft: "4%",
                      marginRight: "4%",
                    }}
                  />
                </List>
              ))}
            </>
          ) : (
            <Typography>No comment</Typography>
          )}
        </Box>
      </Box>
      {/* {selectedReview && (
        <DeleteReviewModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onDelete={handleDeleteReview}
        />
      )} */}
    </div>
  );
}

export default Review;
