import { Box, Typography } from "@mui/material";
import React from "react";

const styles = {
	root: {
		display: "flex",
		height: "100vh",
		justifyContent: "center",
		alignItems: "center",
	},
};
function NotFound() {
	return (
		<Box sx={styles.root}>
			<Typography>404 Page Not Found</Typography>
		</Box>
	);
}

export default NotFound;
