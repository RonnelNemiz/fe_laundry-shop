import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import { Input, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Http from "../../../../services/Http";
import styled from "@emotion/styled";



const CssInput = styled(FormControl)({
	'& .MuiInput-input': {
		color: 'black',
	},
	'& .MuiSvgIcon-root': {
		color: 'blue',
	},

});
const styles = {
	modalStyle: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	},
	mainBox: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '110vh',
		width: '100%',
		backgroundPosition: 'center !important',
		backgroundSize: 'cover !important',
		position: 'relative',
	},
	boxStyle: {
		width: '450px',
		height: '700px',
		background: 'transparent',
		border: `2px solid white`,
		borderRadius: '20px',
		backdropFilter: `blur(15px)`,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '10% 0%',
	},
	inputStyle: {
		mb: 1,
		color: '#fff !important',
	},

	registerText: {
		fontSize: '1.5em',
		textAlign: 'center',
	},
	inputBox: {
		position: 'relative',
		margin: '30px 0',
		width: '310px',
		// borderBottom: `2px solid #fff`,
	},
	buttonStyle: {
		width: '100%',
		height: '40px',
		borderRadius: '40px',
		background: 'grey',
		border: 'none',
		outline: 'none',
		cursor: 'pointer',
		fontSize: '1em',
		fontWeight: 600,
		textTransform: 'capitalize',
	}

};

export default function EditCustomers(props) {

	const { onClose, selectedItem, forceUpdate } = props;
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	// 	const [showPassword, setShowPassword] = React.useState(false);

	// 	const handleClickShowPassword = () => setShowPassword((show) => !show);

	// 	const handleMouseDownPassword = (event) => {
	// 		event.preventDefault();
	// 	};

	// 	const [data, setData] = useState({
	// 		first_name: selectedItem.first_name,
	// 		last_name: selectedItem.last_name,
	// 		purok: selectedItem.purok,
	// 		brgy: selectedItem.brgy,
	// 		municipality: selectedItem.municipality,
	// 		contact_number: selectedItem.contact_number,
	// 		land_mark: selectedItem.land_mark,
	// 		role: 'Customer',
	// 		email: selectedItem.email,
	// 		password: "",
	// 		error_list: [],
	// 	});


	//   useEffect(() => {
	//     setData({
	//       first_name: selectedItem.first_name,
	// 		last_name: selectedItem.last_name,
	// 		purok: selectedItem.purok,
	// 		brgy: selectedItem.brgy,
	// 		municipality: selectedItem.municipality,
	// 		contact_number: selectedItem.contact_number,
	// 		land_mark: selectedItem.land_mark,
	// 		role: 'Customer',
	// 		email: selectedItem.email,
	// 		password: "",
	//     });
	//   },[selectedItem]);

	//   const handleChange = (e) => {
	//     const newData = { ...data };
	//     newData[e.target.name] = e.target.value;
	//     setData(newData);
	//   };

	//   const handleUpdate = () => {
	//     Http.put(`update/cutomers/${selectedItem.id}`,data)
	//       .then((res) => {
	//         forceUpdate();
	//         onClose();
	//         swal("Success", "Successfully Saved Data!", "success");
	//       });
	//   };

	return (
		<div>Edit Customer</div>
		// 	<div >
		//   <Button onClick={handleOpen}>Add Customers</Button>
		//   <Modal
		//     key={selectedItem.id}
		//     open={open}
		//     onClose={handleClose}
		//     aria-labelledby="modal-modal-title"
		//     aria-describedby="modal-modal-description"

		//   >

		// 		<Box sx={styles.modalStyle}
		// 			// style={{ background: `url(${bg6R})no-repeat` }}
		//     >
		// 			<Box sx={styles.mainBox} >
		// 				<Box sx={styles.boxStyle} >
		// 					<Box sx={styles.inputBox} >
		// 						<Typography sx={styles.registerText} >Edit Customers</Typography>
		// 						<TextField
		// 							id="standard-basic "
		// 							label="First Name"
		// 							value={data.first_name}
		// 							name="first_name"
		// 							onChange={handleChange}
		// 							fullWidth
		// 							sx={styles.inputStyle}
		// 							variant="standard"

		// 						/>
		// 						<TextField
		// 							id="standard-basic "
		// 							label="Last Name"
		// 							value={data.last_name}
		// 							name="last_name"
		// 							onChange={handleChange}
		// 							fullWidth
		// 							sx={styles.inputStyle}
		// 							variant="standard"
		// 						/>
		// 						<TextField
		// 							id="standard-basic "
		// 							label="Purok"
		// 							value={data.purok}
		// 							name="purok"
		// 							onChange={handleChange}
		// 							fullWidth
		// 							sx={styles.inputStyle}
		// 							variant="standard"
		// 						/>
		// 						<TextField
		// 							id="standard-basic "
		// 							label="Barangay"
		// 							value={data.brgy}
		// 							name="brgy"
		// 							onChange={handleChange}
		// 							fullWidth
		// 							sx={styles.inputStyle}
		// 							variant="standard"
		// 						/>
		// 						<TextField
		// 							id="standard-basic "
		// 							label="Municipality"
		// 							value={data.municipality}
		// 							name="municipality"
		// 							onChange={handleChange}
		// 							fullWidth
		// 							sx={styles.inputStyle}
		// 							variant="standard"
		// 						/>
		// 						<TextField
		// 							id="standard-basic "
		// 							label="Contact Number"
		// 							type="number"
		// 							value={data.contact_number}
		// 							name="contact_number"
		// 							onChange={handleChange}
		// 							fullWidth
		// 							sx={styles.inputStyle}
		// 							variant="standard"
		// 						/>
		// 						<TextField
		// 							id="standard-basic "
		// 							label="Landmark"
		// 							value={data.land_mark}
		// 							name="land_mark"
		// 							onChange={handleChange}
		// 							fullWidth
		// 							sx={styles.inputStyle}
		// 							variant="standard"
		// 						/>
		// 						<TextField
		// 							id="standard-basic "
		// 							label="Email"
		// 							type="email"
		// 							value={data.email}
		// 							name="email"
		// 							onChange={handleChange}
		// 							fullWidth
		// 							sx={styles.inputStyle}
		// 							variant="standard"
		// 						/>
		// 						<CssInput fullWidth variant="standard">
		// 							<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
		// 							<Input
		// 								id="standard-adornment-password"
		// 								type={showPassword ? 'text' : 'password'}
		// 								endAdornment={
		// 									<InputAdornment position="end">
		// 										<IconButton
		// 											aria-label="toggle password visibility"
		// 											onClick={handleClickShowPassword}
		// 											onMouseDown={handleMouseDownPassword}
		// 											edge="end"
		// 										>
		// 											{showPassword ? <VisibilityOff /> : <Visibility />}
		// 										</IconButton>
		// 									</InputAdornment>
		// 								}
		// 								label="Password"
		// 								value={data.password}
		// 								name="password"
		// 								onChange={handleChange}
		// 								fullWidth
		// 								sx={styles.inputStyle}

		// 							/>
		// 						</CssInput>
		// 						<Button
		// 							fullWidth
		//             sx={styles.buttonStyle}
		// 							variant="contained"
		// 							onClick={handleUpdate}
		// 						>
		// 							Update
		// 						</Button>
		// 					</Box>
		// 				</Box>
		// 			</Box>
		//     </Box>
		//   </Modal>
		// 	</div>
	);
}

