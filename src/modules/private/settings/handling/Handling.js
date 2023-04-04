import React from 'react'
import"../../assets/table.css"

function Users() {
  return (
    <div>
		ORDER NI ATE ANABELE
		<div className="container bg-light">
          <h1>Handling Table</h1>
              <div className ="card mt-5">
                <div className="card-body">
                <a name="add new" className="btn btn-primary" href="Add.js" role="button">+ Add New</a><br /><br />
            
                <table className="table table-striped ">
	
    <thead>
      <tr>
        <th>Handling</th>
        <th>Price</th>
        <th>First Name</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td>
        <select name="cars" id="cars">
        <option value="volvo">Pick-up and Delivery</option>
          <option value="saab">Delivery</option>
          <option value="opel">Pick-up</option>
        </select>
        </td>
        <td>Pick up</td>
        <td>189</td>
        <td>01234567890</td>
        <td>Role</td>
        <td>
        <select name="cars" id="cars">
        <option value="volvo">View</option>
          <option value="saab">Edit</option>
          <option value="opel">Delete</option>
        </select>
        </td>
      </tr>
    </tbody>
  </table>
                 </div>
                </div>
            </div>
    </div>
  )
}

export default Users
