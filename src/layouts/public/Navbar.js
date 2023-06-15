import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import labanderas from "../../assets/images/labanderas.png";
import "./navbar.css";
import { isAuth, logout } from "./../../utils/helpers";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import Fetchinfo from "../../utils/fetchinfo";

function Navbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [accountName, setAccountName] = useState(""); // New state variable for account name
  const [accountAvatar, setAccountAvatar] = useState("");
  const [data, setData] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleExit = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isAuth()) {
      fetch("/api/account")
        .then((response) => response.json())
        .then((responseData) => {
          setData(responseData);
        })
        .catch((error) => {
          console.error("Error fetching account data:", error);

          if (data.name) {
            setAccountName(data.name);
          }
          if (data.avatar) {
            setAccountAvatar(data.avatar);
          }
        });
    }
  }, []);

  const info = Fetchinfo();

  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top px-5 mainNavbarNav">
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={logout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="logoContainer">
        <NavLink to="/">
          <img src={labanderas} alt="logo" className="logo-name1" />
        </NavLink>
      </div>
      <div className="container-fluid linkBoxbox">
        {/* <Link to="/" className="navbar-brand">Laundry Shop Management System</Link> */}
        {/* <button
        
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}

        <div className="navbar-toggler ">
          <NavLink
            to="#"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            // aria-expanded="false"
            // aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars"></i>
          </NavLink>
        </div>
        <div
          className="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          style={{ visibility: "unset" }}
        >
          {/* <div classNameName="nnavNavbarItems "> */}
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Offcanvas
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item ">
                <NavLink
                  to="/home"
                  className="nav-link"
                  activeClassName="active"
                  aria-current="page"
                  style={{ color: "#0d6efd" }}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className="nav-link"
                  activeClassName="active"
                  aria-current="page"
                  style={{ color: "#0d6efd" }}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/services"
                  className="nav-link"
                  activeClassName="active"
                  aria-current="page"
                  style={{ color: "#0d6efd" }}
                >
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className="nav-link"
                  activeClassName="active"
                  aria-current="page"
                  style={{ color: "#0d6efd" }}
                >
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/order"
                  className="nav-link"
                  activeClassName="active"
                  aria-current="page"
                  style={{ color: "#0d6efd" }}
                >
                  Order
                </NavLink>
              </li>
              {isAuth() ? (
                <React.Fragment>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                    </IconButton>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleExit}
                    onClick={handleExit}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleExit}>
                      <Avatar />
                      {info?.profile?.first_name
                        ? info?.profile?.first_name
                        : "Profile"}
                    </MenuItem>
                    <MenuItem onClick={handleExit}>
                      <Avatar />
                      <NavLink
                        to="/myaccount"
                        className="nav-link"
                        activeClassName="active"
                        aria-current="page"
                      >
                        My Account
                      </NavLink>
                    </MenuItem>
                    <Divider />
                    {/* <MenuItem onClick={handleExit}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem> */}
                    <MenuItem onClick={handleShow}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              ) : (
                <>
                  {" "}
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                        activeClassName="active"
                      aria-current="page"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link"
                        activeClassName="active"
                      aria-current="page"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
