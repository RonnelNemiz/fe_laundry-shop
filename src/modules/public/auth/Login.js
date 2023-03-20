import React, { useEffect, useState } from "react";
import "./auth.css";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import bg2 from "./../../../assets/images/bg2.jpg";
import Http from "./../../../services/Http";
import { isAuth } from "../../../utils/helpers";

function Login() {
	useEffect(() => {
		if (isAuth()) {
			history.push("/dashboard");
		}
	}, []);
	const history = useHistory();
	const [loginInput, setLogin] = useState({
		email: "",
		password: "",
		error_list: [],
	});

	const handleInput = (e) => {
		const { name, value } = e.target;
		setLogin((prev) => ({ ...prev, [name]: value }));
	};

	console.log(loginInput);

	const loginSubmit = (e) => {
		e.preventDefault();
		Http.post("/login", {
			email: loginInput.email,
			password: loginInput.password,
		})
			.then((res) => {
				localStorage.setItem("access_token", res.data.access_token);
				swal("Success", res.data.message, "success");
				history.push("/");
			})
			.catch((err) => {
				console.log(err);
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
									type="password"
									name="password"
									className="inputInput"
									onChange={handleInput}
									value={loginInput.password}
									required
								/>
								<label className="labelLabel">Password</label>
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

		// <div>
		//   <NavbarFe />
		//   <div className="container py-5" id='registerBox'>
		//     <div className="row justify-content-center">
		//       <div className="col-ml-6">
		//         <div className="card">
		//           <div className="card-header">
		//             <h4>Login</h4>
		//           </div>
		//           <div className="card-body">
		//             <form onSubmit={loginSubmit}>

		//               <div className="form-group mb-3">
		//                 <label>Email</label>
		//                 <input type="email" name="email" onChange={handleInput} value={loginInput.email} className="form-control" />
		//                 <span>{loginInput.error_list.email}</span>
		//               </div>
		//               <div className="form-group mb-3">
		//                 <label>Password</label>
		//                 <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control" required />
		//                 <span>{loginInput.error_list.password}</span>
		//               </div>
		//               <div className="form-group mb-3">
		//                 <button type="submit" className="btn btn-primary">Login</button>
		//               </div>
		//             </form>
		//           </div>
		//         </div>
		//       </div>
		//     </div>
		//   </div>
		// </div>
	);
}

export default Login;
