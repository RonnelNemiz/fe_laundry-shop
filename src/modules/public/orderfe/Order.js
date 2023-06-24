import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../../layouts/public/Navbar";
import Stepper from "./components/Stepper";
import Http from "../../../services/Http";
import { LinearProgress } from "@mui/material";

function Order() {
  const [categories, setCategories] = React.useState();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    Http.get("/categories")
      .then((res) => {
        if (res.data.data) {
          setCategories(res.data.data);
          setIsLoading(false);
        } else {
          console.log("Error occured!");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <Navbar style={{ width: "unset" }} />
      <div>
        <div className="container">
          {isLoading && <LinearProgress />}
          <Stepper categories={categories} />
        </div>
      </div>
    </div>
  );
}

export default Order;
