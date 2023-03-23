import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "./auth.css";
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
// import bg2 from "./../../../assets/images/bg2.jpg";
import Http from "../../../services/Http";
import { TextField } from '@mui/material';


const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };

function Register() {
	const history = useHistory();
	const [registerInput, setRegister] = useState({
		first_name:'',
		last_name:'',
		purok:'',
		brgy:'',
		municipality:'',
		contact_number:'',
		land_mark:'',
		role:'Customer',
		email:'',
		password:'',
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
						first_name:'',
						last_name:'',
						purok:'',
						brgy:'',
						municipality:'',
						contact_number:'',
						land_mark:'',
						role:'Customer',
						email:'',
						password:'',
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
    <Box>
     
        <Box sx={style}>
		<TextField
          id="outlined-multiline-flexible"
          label="First Name"
		  value={registerInput.first_name}
		  name="first_name"
		  onChange={handleInput}
		  multiline
        />
		<TextField
          id="outlined-multiline-flexible"
          label="Last Name"
		  value={registerInput.last_name}
		  name="last_name"
		  onChange={handleInput}
          multiline
        />
		<TextField
          id="outlined-multiline-flexible"
          label="Purok"
		  value={registerInput.purok}
		  name="purok"
		  onChange={handleInput}
          multiline
        />
		<TextField
          id="outlined-multiline-flexible"
          label="Barangay"
		  value={registerInput.brgy}
		  name="brgy"
		  onChange={handleInput}
          multiline
        />
		<TextField
          id="outlined-multiline-flexible"
          label="Municipality"
		  value={registerInput.municipality}
		  name="municipality"
		  onChange={handleInput}
          multiline
        />
		<TextField
          id="outlined-multiline-flexible"
          label="Contact Number"
		  type="number"
		  value={registerInput.contact_number}
		  name="contact_number"
		  onChange={handleInput}
          multiline
        />
		<TextField
          id="outlined-multiline-flexible"
          label="Landmark"
		  value={registerInput.land_mark}
		  name="land_mark"
		  onChange={handleInput}
          multiline
        />
		<TextField
          id="outlined-multiline-flexible"
          label="Email"
		  type="email"
		  value={registerInput.email}
		  name="email"
		  onChange={handleInput}
          multiline
        />
		<TextField
          id="outlined-multiline-flexible"
          label="Password"
		  type="password"
		  value={registerInput.password}
		  name="password"
		  onChange={handleInput}
          multiline
        />
		<Button
			fullWidth
			variant="contained"
			color="primary"
			onClick={registerSubmit}
		>
			Submit
		</Button>
        </Box>
    
    </Box>
  );
}

export default Register
