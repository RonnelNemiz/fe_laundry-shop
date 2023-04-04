import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "./auth.css";
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
// import bg2 from "./../../../assets/images/bg2.jpg";
import Http from "../../../services/Http";
import { Input, InputAdornment, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import bg6R from "./../../../assets/images/bg6R.jpg";
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
	'& label.Mui-focused': {
		color: 'white',
		borderColor: '#fff !important',
	},
	'& label.MuiInputLabel-root': {
		color: 'white',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: 'white',
	},
	'& .MuiInput-underline:before': {
		borderBottomColor: 'white',
	},
	'&:hover .MuiInput-underline:before': {
		borderBottomColor: 'white !important',
	},
	'& .MuiInput-input': {
		color: 'white',
	},
});
const CssInput = styled(FormControl)({
	'& label.Mui-focused': {
		color: 'white',
		borderColor: '#fff !important',
	},
	'& label.MuiInputLabel-root': {
		color: 'white',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: 'white',
	},
	'& .MuiInput-underline:before': {
		borderBottomColor: 'white',
	},
	'&:hover .MuiInput-underline:before': {
		borderBottomColor: 'white !important',
	},
	'& .MuiInput-input': {
		color: 'white',
	},

	'& .MuiSvgIcon-root': {
		color: 'blue',
	},


});
const styles = {
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
		mb: 2,
		color: '#fff !important',
	},
	registerText: {
		fontSize: '2em',
		textAlign: 'center',
		color: 'white',
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
		background: '#fff',
		border: 'none',
		outline: 'none',
		cursor: 'pointer',
		fontSize: '1em',
		fontWeight: 600,
	}

};

function Register() {
	const history = useHistory();
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const [registerInput, setRegister] = useState({
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
					history.push("/");
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
			<Box sx={styles.mainBox}
				style={{ background: `url(${bg6R})no-repeat` }}>
				<Box  >
					<Box sx={styles.boxStyle} >
						<Box sx={styles.inputBox} >
							<Typography sx={styles.registerText} >Register</Typography>
							<CssTextField
								id="standard-basic "
								label="First Name"
								value={registerInput.first_name}
								name="first_name"
								onChange={handleInput}
								fullWidth
								sx={styles.inputStyle}
								variant="standard"

							/>
							<CssTextField
								id="standard-basic "
								label="Last Name"
								value={registerInput.last_name}
								name="last_name"
								onChange={handleInput}
								fullWidth
								sx={styles.inputStyle}
								variant="standard"
							/>
							<CssTextField
								id="standard-basic "
								label="Purok"
								value={registerInput.purok}
								name="purok"
								onChange={handleInput}
								fullWidth
								sx={styles.inputStyle}
								variant="standard"
							/>
							<CssTextField
								id="standard-basic "
								label="Barangay"
								value={registerInput.brgy}
								name="brgy"
								onChange={handleInput}
								fullWidth
								sx={styles.inputStyle}
								variant="standard"
							/>
							<CssTextField
								id="standard-basic "
								label="Municipality"
								value={registerInput.municipality}
								name="municipality"
								onChange={handleInput}
								fullWidth
								sx={styles.inputStyle}
								variant="standard"
							/>
							<CssTextField
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
							<CssTextField
								id="standard-basic "
								label="Landmark"
								value={registerInput.land_mark}
								name="land_mark"
								onChange={handleInput}
								fullWidth
								sx={styles.inputStyle}
								variant="standard"
							/>
							<CssTextField
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
								style={{
									color: 'black', fontWeight: 600, fontSize: '1em', outline: 'none !important',
									border: 'none !important', textTransform: 'capitalize',
									backgroundColor: 'white', cursor: 'pointer', borderRadius: '40px'
								}}
								variant="contained"
								onClick={registerSubmit}
							>
								Submit
							</Button>
						</Box>
					</Box>
				</Box>

			</Box>
		</div>
	);
}

export default Register
