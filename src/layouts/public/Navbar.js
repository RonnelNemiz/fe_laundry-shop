import React, { useState } from "react";
import { Link, } from 'react-router-dom';
import logo1 from '../../assets/images/laundrylogo.png'
import './navbar.css'
import { isAuth, logout } from './../../utils/helpers';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


function Navbar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <nav className="navbar navbar-expand-lg bg-light sticky-top px-5">
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
                <img src={logo1} alt="logo" className="logo-name1" />
            </div>
            <div className="container-fluid">
                {/* <Link to="/" className="navbar-brand">Laundry Shop Management System</Link> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link active" aria-current="page">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/services" className="nav-link active" aria-current="page">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link active" aria-current="page">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/order" className="nav-link active" aria-current="page">Order</Link>
                        </li>
                        {isAuth() ? (<li className="nav-item">
                            <Button variant="danger" onClick={handleShow}>
                                Logout
                            </Button>
                        </li>) : (<> <li className="nav-item">
                            <Link to="/login" className="nav-link active" aria-current="page">Login</Link>
                        </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link active" aria-current="page">Register</Link>
                            </li></>)}
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;
