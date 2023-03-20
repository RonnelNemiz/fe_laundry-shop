import React, { useState } from 'react'
import "./auth.css";
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import bg2 from "./../../../assets/images/bg2.jpg";
import Http from "../../../services/Http";

function Register() {
	const history = useHistory();
	const [registerInput, setRegister] = useState({
		// first_name:'',
		// last_name:'',
		// address:'',
		// landmark:'',
		// contact_num:'',
		// email:'',
		// password:'',
		name: "",
		email: "",
		password: "",
		error_list: [],
	});

	const handleInput = (e) => {
		const { name, value } = e.target;
		setRegister((prev) => ({ ...prev, [name]: value }));
	};

	const registerSubmit = (e) => {
		e.preventDefault();
		Http.post("register", registerInput)
			.then((res) => {
				if (res.status === 200) {
					swal("Success", res.data.message, "success");
					history.push("/login");
				}
			})
			.catch((err) => {
				if (err) {
					swal("Danger", "Unsuccsessful", "danger");
				}
			});
	};
	return (
		<section>
			{/* <Navbar /> */}
			<div
				className="registerLoginbox "
				style={{ background: `url(${bg2})no-repeat` }}>
				<div className="form-box">
					<div className="form-value">
						<form onSubmit={registerSubmit}>
							<h2>Register</h2>
							<div className="inputbox">
								<input
									type="text"
									name="name"
									className="inputInput"
									onChange={handleInput}
									value={registerInput.name}
									required
								/>
								<label className="labelLabel">Name</label>
							</div>
							<div className="inputbox">
								<input
									type="email"
									name="email"
									className="inputInput"
									onChange={handleInput}
									value={registerInput.email}
									required
								/>
								<label className="labelLabel">Email</label>
								<span>{registerInput.error_list.email}</span>
							</div>
							<div className="inputbox">
								<input
									type="text"
									name="password"
									className="inputInput"
									onChange={handleInput}
									value={registerInput.password}
									required
								/>
								<label className="labelLabel">Password</label>
								<span>{registerInput.error_list.password}</span>
							</div>
							<div>
								<button type="submit" name="password" className="buttonButton">
									Register
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Register
