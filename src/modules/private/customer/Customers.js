import React, {useEffect, useState} from "react";
import Http from "../../../services/Http";
import "./../assets/table.css";

function Customers() {

const [customers, setCustomers] = useState([]);

useEffect(()=>{
  Http.get('/all-customers').then((res)=>{
    setCustomers(res.data)
  })
},[])
console.log(customers);
  return (
	 
    <div className="container bg-light">
      <h1>List Of Customers</h1>
      <div className="card mt-5">
        <div className="card-body">

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Landmark</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer,index)=>{
                return (
                  <tr key={index}>
                  <td>{customer.first_name + " " + customer.last_name + " "}</td>
                  <td>{customer.profile.purok +" " + customer.profile.brgy + " " +  customer.profile.municipality}</td>
                  <td>{customer.profile.contact_number}</td>
                  <td>{customer.profile.land_mark}</td>
                  <td>{customer.email}</td>
                  <td>
                  <select name="actions" id="actions">
                  <option value="view">View</option>
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                </select>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    )
	
}

export default Customers;
