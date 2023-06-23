import React, { useState } from "react";
import machine from "./../../../assets/images/machine.gif";
import Http from "../../../services/Http";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import logo1 from "./../../../assets/images/labanderas.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./auth.css";

function Register() {
  const history = useHistory();
  const [visible, setVisible] = useState(true);

  const [registerInput, setRegister] = useState({
    first_name: "",
    last_name: "",
    purok: "",
    brgy: "",
    municipality: "",
    contact_number: "",
    land_mark: "",
    role_id: 4,
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
    Http.post("/register", registerInput)
      .then((res) => {
        if (res.status === 200) {
          swal("Success", res.data.message, "success");
          history.push("/login");
          setRegister({
            first_name: "",
            last_name: "",
            purok: "",
            brgy: "",
            municipality: "",
            contact_number: "",
            land_mark: "",
            role_id: 4,
            email: "",
            password: "",
          });
        }
      })
      .catch((err) => {
        if (err) {
          swal("Danger", "Unsuccsessful", "danger");
        }
      });
  };
  return (
    <div className="sec-boxLogin">
      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-left">
            <h4>Welcome To LaundryShop</h4>
            <p className="textLorem">
              <i>
                "At our laundry shop system, we believe that clean clothes can
                make all the difference. From fresh-smelling linens to crisp
                business attire, our goal is to help you look and feel your best
                everyday."{" "}
              </i>
            </p>
            <img src={machine} alt="images" width="300px" />
          </div>
          <div className="form-right">
            <div className="social-login">
              <div className="form-value formValue-reg">
                <form onSubmit={registerSubmit}>
                  <div className="logo-login" style={{ marginBottom: "0%" }}>
                    <img src={logo1} alt="logo" className="logo-laundry" />
                  </div>

                  <h2 className="login-text">Register</h2>
                  <div className="fullName">
                    <div
                      className="inputbox fn1"
                      style={{ margin: "20px 0px 0px 0px" }}
                    >
                      <input
                        autoFocus
                        name="first_name"
                        className="inputInput sizeLabel"
                        onChange={handleInput}
                        value={registerInput.first_name}
                        required
                      />
                      <label className="labelLabel sizeLabel">First Name</label>
                      {/* <span>{loginInput.error_list.email}</span> */}
                    </div>
                    <div
                      className="inputbox ln2"
                      style={{ margin: "20px 0px 0px 0px" }}
                    >
                      <input
                        autoFocus
                        name="last_name"
                        className="inputInput sizeLabel"
                        onChange={handleInput}
                        value={registerInput.last_name}
                        required
                      />
                      <label className="labelLabel sizeLabel">Last Name</label>
                      {/* <span>{loginInput.error_list.email}</span> */}
                    </div>
                  </div>
                  <div className="address">
                    <div
                      className="inputbox prk1"
                      style={{ margin: "20px 0px 0px 0px" }}
                    >
                      <input
                        autoFocus
                        name="purok"
                        className="inputInput sizeLabel"
                        onChange={handleInput}
                        value={registerInput.purok}
                        required
                      />
                      <label className="labelLabel sizeLabel">Purok</label>
                      {/* <span>{loginInput.error_list.email}</span> */}
                    </div>
                    <div
                      className="inputbox brgy2"
                      style={{ margin: "20px 0px 0px 0px" }}
                    >
                      <input
                        autoFocus
                        name="brgy"
                        className="inputInput sizeLabel"
                        onChange={handleInput}
                        value={registerInput.brgy}
                        required
                      />
                      <label className="labelLabel sizeLabel">Barangay</label>
                      {/* <span>{loginInput.error_list.email}</span> */}
                    </div>
                  </div>
                  <div className="munCon">
                    <div
                      className="inputbox muncplty1"
                      style={{ margin: "20px 0px 0px 0px" }}
                    >
                      <input
                        autoFocus
                        name="municipality"
                        className="inputInput sizeLabel"
                        onChange={handleInput}
                        value={registerInput.municipality}
                        required
                      />
                      <label className="labelLabel sizeLabel">
                        Municipality
                      </label>
                      {/* <span>{loginInput.error_list.email}</span> */}
                    </div>

                    <div
                      className="inputbox contct2"
                      style={{ margin: "20px 0px 0px 0px" }}
                    >
                      <input
                        autoFocus
                        name="contact_number"
                        className="inputInput sizeLabel"
                        onChange={handleInput}
                        value={registerInput.contact_number}
                        required
                      />
                      <label className="labelLabel sizeLabel">Contact</label>
                      {/* <span>{loginInput.error_list.email}</span> */}
                    </div>
                  </div>
                  <div
                    className="inputbox"
                    style={{ margin: "20px 0px 0px 0px" }}
                  >
                    <input
                      autoFocus
                      name="land_mark"
                      className="inputInput sizeLabel"
                      onChange={handleInput}
                      value={registerInput.land_mark}
                      required
                    />
                    <label className="labelLabel sizeLabel">Landmark</label>
                    {/* <span>{loginInput.error_list.email}</span> */}
                  </div>
                  <div
                    className="inputbox"
                    style={{ margin: "20px 0px 0px 0px" }}
                  >
                    <input
                      autoFocus
                      type="email"
                      name="email"
                      className="inputInput sizeLabel"
                      onChange={handleInput}
                      value={registerInput.email}
                      required
                    />
                    <label className="labelLabel sizeLabel">Email</label>
                    {/* <span>{loginInput.error_list.email}</span> */}
                  </div>

                  <div
                    className="inputbox"
                    style={{ margin: "20px 0px 0px 0px" }}
                  >
                    <input
                      type={visible ? "text" : "password"}
                      name="password"
                      className="inputInput sizeLabel"
                      onChange={handleInput}
                      value={registerInput.password}
                      required
                    />

                    <label className="labelLabel sizeLabel">Password</label>
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
                    {/* <span>{loginInput.error_list.password}</span> */}
                  </div>
                  <div>
                    <button type="submit" className="buttonButton">
                      Register
                    </button>
                  </div>

                  <div className="form-account">
                    <p className="p-acc">Have already an account?</p>
                    <Link
                      to="/login"
                      className="nav-link active link-acc"
                      aria-current="page"
                    >
                      Login
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

export default Register;
