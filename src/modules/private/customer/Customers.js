import React, { useEffect, useState } from "react";
import Http from "../../../services/Http";
import "./../assets/table.css";
import AddCustomers from "./components/AddCustomers";
import Button from "@mui/material/Button";
import EditCustomers from "./components/EditCustomers";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    Http.get("/all-customers").then((res) => {
      setCustomers(res.data);
    });
  }, []);

  return (
    <div className="container bg-light">
      <AddCustomers />
      <div className="card mt-5">
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Landmark</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => {
                return (
                  <tr key={index}>
                    <td>{customer.id}</td>
                    <td>
                      {customer.first_name + " " + customer.last_name + " "}
                    </td>
                    <td>
                      {customer.profile.purok +
                        " " +
                        customer.profile.brgy +
                        " " +
                        customer.profile.municipality}
                    </td>
                    <td>{customer.profile.contact_number}</td>
                    <td>{customer.profile.land_mark}</td>
                    <td>{customer.email}</td>
                    <td>
                      <Button value="view">
                        <EditCustomers />
                      </Button>
                      <Button value="edit">Edit</Button>
                      <Button value="edit">Delete</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Customers;
