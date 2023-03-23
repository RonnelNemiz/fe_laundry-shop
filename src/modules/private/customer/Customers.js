import React, {useEffect, useState} from "react";
import Http from "../../../services/Http";
import "./customers.css";

function Customers() {
<<<<<<< Updated upstream
	return <div>
		<h1>welcome to Vergin Karen</h1>
		<div className="container bg-light">
              <div className ="card mt-5">
                <div className="card-body">
                <a name="add new" className="btn btn-primary" href="Add.js" role="button">+ Add New</a><br /><br />
            
                <table className="table table-striped ">
                  
    <thead>
      <tr>
        <th>Service Type</th>
        <th>Full Name</th>
        <th>Address</th>
        <th>Contact Number</th>
        <th>Quantity</th>
        <th>Weight</th>
        <th>Total</th>
        <th>Amount Recieved</th>
        <th>Change</th>
        <th>Payment Status</th>
        <th>Orders Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Wash Dry&Fold</td>
        <td>Karen Lina</td>
        <td>Hilongos,Leyte</td>
        <td>09252654321</td>
        <td>T-shrt 15pcs</td>
        <td>7 kg</td>
        <td>190</td>
        <td>200</td>
        <td>10</td>
        <td>
        <select name="cars" id="cars">
          <option value="volvo">Paid</option>
          <option value="saab">Unpaid</option>
          
        </select>
        </td>
     <td>
      <select name="cars" id="cars">
        <option value="volvo">pending</option>
          <option value="saab">Inprogress</option>
          <option value="opel">Completed</option>
        </select>
        </td>
        <td>
          <button type="button"class="btn btn-primary">View</button>
          <button type="button"class="btn btn-primary">Edit</button>
          <button type="button"class="btn btn-primary">Delete</button>
        </td>
        </tr>
      <tr>
        <td>Wash Dry&Fold</td>
        <td>Karen Lina</td>
        <td>Hilongos,Leyte</td>
        <td>09252654321</td>
        <td>T-shrt 15pcs</td>
        <td>7 kg</td>
        <td>190</td>
        <td>200</td>
        <td>10</td>
        <td>
        <select name="cars" id="cars">
          <option value="volvo">Paid</option>
          <option value="saab">Unpaid</option>
          
        </select>
        </td>
        <td>
        <select name="cars" id="cars">
        <option value="volvo">pending</option>
          <option value="saab">Inprogress</option>
          <option value="opel">Completed</option>
        </select>
        </td>
      </tr>
      <tr>
        <td>Wash Dry&Fold</td>
        <td>Karen Lina</td>
        <td>Hilongos,Leyte</td>
        <td>09252654321</td>
        <td>T-shrt 15pcs</td>
        <td>7 kg</td>
        <td>190</td>
        <td>200</td>
        <td>10</td>
        <td>
        <select name="cars" id="cars">
          <option value="volvo">Paid</option>
          <option value="saab">Unpaid</option>
          
        </select>
        </td>
        <td>
        <select name="cars" id="cars">
        <option value="volvo">pending</option>
          <option value="saab">Inprogress</option>
          <option value="opel">Completed</option>
        </select>
        </td>
      </tr>
      <tr>
        <td>Wash Dry&Fold</td>
        <td>Karen Lina</td>
        <td>Hilongos,Leyte</td>
        <td>09252654321</td>
        <td>T-shrt 15pcs</td>
        <td>7 kg</td>
        <td>190</td>
        <td>200</td>
        <td>10</td>
        <td>
        <select name="cars" id="cars">
          <option value="volvo">Paid</option>
          <option value="saab">Unpaid</option>
          
        </select>
        </td>
        <td>
        <select name="cars" id="cars">
        <option value="volvo">pending</option>
          <option value="saab">Inprogress</option>
          <option value="opel">Completed</option>
        </select>
        </td>
      </tr>
      <tr>
        <td>Wash Dry&Fold</td>
        <td>Karen Lina</td>
        <td>Hilongos,Leyte</td>
        <td>09252654321</td>
        <td>T-shrt 15pcs</td>
        <td>7 kg</td>
        <td>190</td>
        <td>200</td>
        <td>10</td>
        <td>
        <select name="cars" id="cars">
          <option value="volvo">Paid</option>
          <option value="saab">Unpaid</option>
          
        </select>
        </td>
        <td>
        <select name="cars" id="cars">
        <option value="volvo">pending</option>
          <option value="saab">Inprogress</option>
          <option value="opel">Completed</option>
        </select>
        </td>
      </tr>
      <tr>
        <td>Wash Dry&Fold</td>
        <td>Karen Lina</td>
        <td>Hilongos,Leyte</td>
        <td>09252654321</td>
        <td>T-shrt 15pcs</td>
        <td>7 kg</td>
        <td>190</td>
        <td>200</td>
        <td>10</td>
        <td>
        <select name="cars" id="cars">
          <option value="volvo">Paid</option>
          <option value="saab">Unpaid</option>
          
        </select>
        </td>
        <td>
        <select name="cars" id="cars">
        <option value="volvo">pending</option>
          <option value="saab">Inprogress</option>
          <option value="opel">Completed</option>
        </select>
        </td>
      </tr>
    </tbody>
  </table>
                 </div>
                </div>
            </div>
			
		
		</div>;
=======

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

          <table class="table table-striped">
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
	
>>>>>>> Stashed changes
}

export default Customers;
