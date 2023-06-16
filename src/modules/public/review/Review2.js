// import React, { useState } from 'react';
// import { Box, Button, Paper, Rating, TextField, Typography } from '@mui/material';
// import Http from '../../../services/Http';
// import ToastNotification from '../../../components/ToastNotification';
// import { handleErrorResponse } from '../../../utils/helpers';




// const reviewBox ={
//   width:"50%",
//   marginRight:"15px",
// };
// const reviewBox2 = {
//   display:"flex",
//   // justifyContent:"center",
//   flexDirection:"column",
//   width:"80%",
// };
// const reviewCon = {
//   display:"flex",
// };
// const commentBox = {
//   width:"50%",
//   marginLeft:"15px",
// };

// function Review2() {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');
//   const [userComment, setUserComment] = useState('');
//   const [adminReply, setAdminReply] = useState('');

//   React.useEffect(() => {
//     fetchUserComment();
//     fetchAdminReply();
//   }, []);
  
//   const fetchUserComment = (userId) => {
//     Http.get(`user/comments/${userId}`,{headers:{
//       Authorization: `Bearer ${localStorage.getItem("access_token")}`
//     }})
//       .then((res) => {
//         console.log(res.data.data);
//         setUserComment(res.data.data.comments);
//             // setAdminReply(res.data.replies);
        
//       })
//       .catch((err) => {
//         console.error('Error fetching user comment:', err);
//       });
//   };
  
//   const fetchAdminReply = () => {
//     Http.get("admin/replies",{headers:{
//       Authorization: `Bearer ${localStorage.getItem("access_token")}`
//     }})
//       .then((res) => {
//         // const adminReply = res.data.data.reply; 
//         setAdminReply(res.data.data.replies);
//       })
//       .catch((err) => {
//         console.error('Error fetching admin reply:', err);
//       });
//   };

//   const handleSubmitRating = (e) => {
//     e.preventDefault();

//     const formData = {
//       rating,
//       comment
//     };
//     Http.post("add/reviews",{headers:{
//       Authorization: `Bearer ${localStorage.getItem("access_token")}`
//     }}, formData)
//     .then((res) => {
//       if (res.data.status === 200) {
//         // Handle success message and any other necessary actions
//         ToastNotification("success", "Successfully Saved Data!");
//         setRating(0);
//         setComment('');
//       } else {
//         // Handle error message
//         ToastNotification('error', res.data.message);
//       }
//     })
//     .catch((err) => {
//       // Handle error message
//       ToastNotification("error", handleErrorResponse(err));
//     });
// };

// const handleRatingChange = (event, newValue) => {
//   setRating(newValue);
// };

// const handleCommentChange = (e) => {
//   setComment(e.target.value);
// };
 


//   return (
//     <div>
//       <Box sx={reviewCon}>
//         <Box sx={reviewBox}>
//           <Box sx={reviewBox2}>
//             <Typography variant="h5" component="h1" gutterBottom>
//               Rate and Review the Laundry Shop
//             </Typography>
//             <Rating
//               name="rating"
//               value={rating}
//               onChange={handleRatingChange}
//             />
//             <TextField
//               name="comment"
//               label="Comment"
//               multiline
//               rows={4}
//               value={comment}
//               onChange={handleCommentChange}
//               margin="normal"
//             />
//             <Button type="submit" variant="contained" color="primary" onClick={handleSubmitRating}>
//               Submit
//             </Button>
//           </Box>
//         </Box>
//         <Box sx={commentBox}>
//           <Box  >
//             <Paper sx={{ height:300}}>
//             <Typography>User Comment: {userComment || 'No comment'}</Typography>
//               <Typography>Admin Reply: {adminReply || 'No reply'}</Typography>
//             </Paper>
//           </Box>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default Review2;
