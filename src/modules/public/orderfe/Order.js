import React from "react";
// import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./order.css";
import Navbar from "../../../layouts/public/Navbar";
import Stepper from "./components/Stepper";
import Http from "../../../services/Http";


function Order() {
  const [categories, setCategories] = React.useState();


  React.useEffect(() => {
    Http.get('/categories').then(res => {
      if (res.data.data) {
        setCategories(res.data.data);
      } else {
        console.log('Error occured!');
      }
    }).catch(err => {
      console.log(err)
    })
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div className="container">
          <Stepper categories={categories} />
        </div>
      </div>
    </div>
  );
}

export default Order;
