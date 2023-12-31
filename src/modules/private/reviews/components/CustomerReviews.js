import React, { useEffect, useReducer, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import Http from "../../../../services/Http";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";

const reviewCon = {
  display: "flex",
  marginLeft: "10%",
  marginRight: "10%",
};

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    fetchReviews();
  }, [ignored]);

  const fetchReviews = () => {
    Http.get("/reviews")
      .then((res) => {
        console.log(res.data.data);
        setReviews(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  };

  const handleReplySubmit = (reviewId, reply) => {
    const data = {
      reply: reply,
      reply_at: new Date().toISOString(),
    };

    Http.post(`/reviews/${reviewId}/reply`, data)
      .then((response) => {
        console.log("Reply submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting reply:", error);
      });
  };
  const handleDelete = (reviewId) => {
    Http.delete(`/delete/reviews/${reviewId}`)
      .then((response) => {
        forceUpdate();
        console.log("Review deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
      });
  };

  return (
    <div style={{ maxHeight: "400px", overflow: "auto" }}>
      {reviews &&
        reviews.map((review) => (
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
  const [reply, setReply] = useState("");
  const [adminReply, setAdminReply] = useState(review.reply || "");
  const [open, setOpen] = useState(false);
  const [openReplyModal, setOpenReplyModal] = useState(false);

  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    onReplySubmit(review.id, reply);
    setReply("");
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
    <>
      <Box>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            paddingLeft: "10%",
            paddingRight: "10%",
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography sx={{ fontSize: ".8em" }}>
                      Rate: {review.ratings}
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
                      {review.user?.first_name} {review.user?.last_name}
                    </Typography>
                    <span> — {review.comments}</span>
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
                      {adminReply && <span> — {adminReply}</span>}
                    </Typography>
                    <Typography sx={{ fontSize: "10px" }}>
                      ({review.reply_at})
                    </Typography>
                  </React.Fragment>
                }
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleOpenReplyModal}>
                <ReplyIcon
                  color="primary"
                  sx={{
                    width: ".8em",
                    height: ".8em",
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
                    width: ".8em",
                    height: ".8em",
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
            </Box>
          </ListItem>
          <Divider
            variant="inset"
            component="li"
            style={{
              color: "black",
              marginLeft: "4%",
              marginRight: "4%",
              listStyle: "none",
            }}
          />
        </List>
      </Box>
      <Dialog open={openReplyModal}>
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
    </>
  );
};

export default CustomerReviews;
