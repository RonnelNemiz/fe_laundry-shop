import React, { useEffect, useState } from "react";
import "./auth.css";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import machine from "./../../../assets/images/machine.gif";
import { isAuth } from "../../../utils/helpers";
import * as service from "./service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo1 from "./../../../assets/images/labanderas.png";
import Http from "../../../services/Http";

function Login() {
  const history = useHistory();
  const [visible, setVisible] = useState(false);

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
    service
      .login(loginInput)
      .then((res) => {
        if (res.data.code === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          Http.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.access_token}`;
          localStorage.setItem("role", res.data.user.role_id);
          // swal("Success", "Yeheey!!!", "success");
          if (
            localStorage.getItem("personal_details") ||
            localStorage.getItem("payment_method") ||
            localStorage.getItem("handling") ||
            localStorage.getItem("service")
          ) {
            history.push("/order");
          } else {
            let role = localStorage.getItem("role");
            if (role == 4) {
              history.push("/myaccount");
            } else {
              history.push("/dashboard");
            }
          }
        } else {
          swal("Error", "Error!!!", "danger");
        }
      })
      .catch(() => {
        alert("Network Error");
      });
  };
  useEffect(() => {
    if (isAuth()) {
      history.push("/dashboard");
      console.log("effect rendered");
    }
  }, [history]);

  return (
    <div className="sec-boxLogin">
      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-left">
            <h4>Welcome To LaundryShop</h4>
            <p className="textLorem">
              <i>
                "Let us take care of your laundry needs, so you can focus on
                what matters most to you."
              </i>
            </p>
            <img src={machine} alt="images" width="300px" />
          </div>
          <div className="form-right">
            <div className="social-login">
              <div className="form-value">
                <form onSubmit={loginSubmit}>
                  <Link to="/">
                    <div className="logo-login">
                      <img src={logo1} alt="logo" className="logo-laundry" />
                    </div>
                  </Link>
                  <h2 className="login-text">Login</h2>
                  <div className="inputbox">
                    <input
                      autoFocus
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
                      type={visible ? "text" : "password"}
                      name="password"
                      className="inputInput"
                      onChange={handleInput}
                      value={loginInput.password}
                      required
                    />

                    <label className="labelLabel">Password</label>
                    <div
                      className="p-2 span-eye"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? (
                        <FontAwesomeIcon icon="fa-solid fa-eye" />
                      ) : (
                        <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
                      )}
                    </div>
                    <span>{loginInput.error_list.password}</span>
                  </div>
                  <div>
                    <button type="submit" className="buttonButton">
                      Login
                    </button>
                  </div>
                  <div className="form-account">
                    <p className="p-acc">Don't have an account?</p>
                    <Link
                      to="/register"
                      className="nav-link active link-acc"
                      aria-current="page"
                    >
                      Register
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
