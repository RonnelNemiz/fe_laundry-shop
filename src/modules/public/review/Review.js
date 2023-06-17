import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Http from "../../../services/Http";
import "./review.css";

const reviewCon = {
  display: "flex",
  marginLeft: "10%",
  marginRight: "10%",
};

function Review() {
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    fetchUserComment();
  }, []);

  const fetchUserComment = (userId) => {
    Http.get(`user/comments/${userId}`)
      .then((res) => {
        setUserReviews(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching user comments:", err);
      });
  };

  return (
    <div>
      <Box sx={reviewCon} id="reviewsa">
        <Box style={{ height: "50vh", overflowX: "auto", width: "100%" }}>
          {userReviews && userReviews.length > 0 ? (
            <>
              {userReviews.map((review, index) => (
                <List
                  sx={{
                    width: "100%",
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
    </div>
  );
}

export default Review;
