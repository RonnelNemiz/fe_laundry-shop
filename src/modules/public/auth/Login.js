import React, { useEffect, useState } from "react";
import "./auth.css";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import bg3L from "./../../../assets/images/bg3L.jpg";
import Http from "./../../../services/Http";
import { isAuth } from "../../../utils/helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Login() {
	const history = useHistory();
	const [visible, setVisible] = useState(true);

	// const handleClickShowPassword = () => setShowPassword((show) => !show);

	// const handleMouseDownPassword = (event) => {
	// 	event.preventDefault();
	// };
	const [loginInput, setLogin] = useState({
		email: "",
		password: "",
		error_list: [],
	});

	const handleInput = (e) => {
		const { name, value } = e.target;
		setLogin((prev) => ({ ...prev, [name]: value }));
	};

	const loginSubmit = (e) => {
		e.preventDefault();
		Http.post("/login", loginInput).then((res) => {
			console.log(res);
			if(res.data.user.role === "Customer"){
				history.push("/");
			}
			else{
			
			history.push("/dashboard");
			}
			localStorage.setItem("access_token", res.data.access_token);
			swal("Success", "Yeheey!!!", "success");
		}).catch(()=>{alert("Network Error")});
	};
	useEffect(() => {
		if (isAuth()) {
			history.push("/dashboard");
			console.log("effect rendered");
		}
	}, [history]);

	return (
		<section>
			<div
				className="registerLoginbox "
				style={{ background: `url(${bg3L})no-repeat` }}>
				<div className="form-box">
					<div className="form-value">
						<form onSubmit={loginSubmit}>
							<h2>Login</h2>
							<div className="inputbox">
								<input
									type="email"
									name="email"
									className="inputInput"
									onChange={handleInput}
									value={loginInput.email}
									required
								/>
								<label className="labelLabel">Email</label>
								<span>{loginInput.error_list.email}</span>
							</div>
							
							<div className="inputbox">
								<input
									type={visible ? "text": "password"}
									name="password"
									className="inputInput"
									onChange={handleInput}
									value={loginInput.password}
									required
									
								/>

								<label className="labelLabel">Password</label>
								<div className="p-2 span-eye" onClick={() => setVisible(!visible)}>
									{
										visible ? <FontAwesomeIcon icon="fa-solid fa-eye" /> : <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
									}
								</div>
								<span>{loginInput.error_list.password}</span>
								</div>
							<div>
								<button type="submit" className="buttonButton">
									Login
								</button>
								
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>

		
	);
}

export default Login;
