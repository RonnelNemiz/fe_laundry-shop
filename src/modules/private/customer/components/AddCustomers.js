import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
// import { useHistory } from 'react-router-dom';
// import bg2 from "./../../../assets/images/bg2.jpg";
import { Input, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Http from "../../../../services/Http";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";


const CssInput = styled(FormControl)({
	'& .MuiInput-input': {
		color: 'black',
	},
	'& .MuiSvgIcon-root': {
		color: 'blue',
	},

});
const styles = {
  modalStyle:{
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
		margin:'10% 0%',
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

export default function AddCustomers() {
 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const [registerInput, setRegister] = useState({
    id:'',
		first_name: '',
		last_name: '',
		purok: '',
		brgy: '',
		municipality: '',
		contact_number: '',
		land_mark: '',
		role: 'Customer',
		email: '',
		password: '',
		error_list: [],
	});
	const handleInput = (e) => {
		const { name, value } = e.target;
		setRegister((prev) => ({ ...prev, [name]: value }));
	};

	const registerSubmit = (e) => {
		e.preventDefault();
		Http.post("/register", registerInput)
			.then((res) => {
				if (res.status === 200) {
					swal("Success", res.data.message, "success");
					// history.push("/");
					setRegister({
						first_name: '',
						last_name: '',
						purok: '',
						brgy: '',
						municipality: '',
						contact_number: '',
						land_mark: '',
						role: 'Customer',
						email: '',
						password: '',
					})
				}
			})
			.catch((err) => {
				if (err) {
					swal("Danger", "Unsuccsessful", "danger");
				}
			});
	};


	return (
		<div >
      <Button onClick={handleOpen}>Add Customers</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
    
			<Box sx={styles.modalStyle}
				// style={{ background: `url(${bg6R})no-repeat` }}
        >
				<Box sx={styles.mainBox} >
					<Box sx={styles.boxStyle} >
						<Box sx={styles.inputBox} >
							<Typography sx={styles.registerText} >Add Customers</Typography>
							<TextField
								id="standard-basic "
								label="First Name"
								value={registerInput.first_name}
								name="first_name"
								onChange={handleInput}
								fullWidth
								sx={styles.inputStyle}
								variant="standard"

							/>
							<TextField
								id="standard-basic "
								label="Last Name"
								value={registerInput.last_name}
								name="last_name"
								onChange={handleInput}
								fullWidth
								sx={styles.inputStyle}
								variant="standard"
							/>
							<TextField
								id="standard-basic "
								label="Purok"
								value={registerInput.purok}
								name="purok"
								onChange={handleInput}
								fullWidth
								sx={styles.inputStyle}
								variant="standard"
							/>
							<TextField
								id="standard-basic "
								label="Barangay"
								value={registerInput.brgy}
								name="brgy"
								onChange={handleInput}
								fullWidth
								sx={styles.inputStyle}
								variant="standard"
							/>
							<TextField
								id="standard-basic "
								label="Municipality"
								value={registerInput.municipality}
								name="municipality"
								onChange={handleInput}
								fullWidth
								sx={styles.inputStyle}
								variant="standard"
							/>
							<TextField
								id="standard-basic "
								label="Contact Number"
								type="number"
								value={registerInput.contact_number}
								name="contact_number"
								onChange={handleInput}
								fullWidth
								sx={styles.inputStyle}
								variant="standard"
							/>
							<TextField
								id="standard-basic "
								label="Landmark"
								value={registerInput.land_mark}
								name="land_mark"
								onChange={handleInput}
								fullWidth
								sx={styles.inputStyle}
								variant="standard"
							/>
							<TextField
								id="standard-basic "
								label="Email"
								type="email"
								value={registerInput.email}
								name="email"
								onChange={handleInput}
								fullWidth
								sx={styles.inputStyle}
								variant="standard"
							/>
							<CssInput fullWidth variant="standard">
								<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
								<Input
									id="standard-adornment-password"
									type={showPassword ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
									label="Password"
									value={registerInput.password}
									name="password"
									onChange={handleInput}
									fullWidth
									sx={styles.inputStyle}

								/>
							</CssInput>
							<Button
								fullWidth
                sx={styles.buttonStyle}
								variant="contained"
								onClick={registerSubmit}
							>
								Submit
							</Button>
						</Box>
					</Box>
				</Box>
        </Box>
      </Modal>
		</div>
	);
}

