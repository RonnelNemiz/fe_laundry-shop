import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./order.css";
import Navbar from "../../../layouts/public/Navbar";
import Stepper from "./components/Stepper";

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="container">
          <Stepper />
        </div>
      </div>
    </div>
  );
}

export default App;
