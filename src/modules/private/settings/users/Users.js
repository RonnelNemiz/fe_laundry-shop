import React from 'react'
import"../../assets/table.css"
import Delete from '../../orders/components/Delete';

function Users() {
  return (
    <div>
		ORDER NI ATE ANABELE
		<div className="container bg-light">
          <h1>Users Table</h1>
              <div className ="card mt-5">
                <div className="card-body">
                <a name="add new" className="btn btn-primary" href="Add.js" role="button">+ Add New</a><br /><br />
            
                <table className="table table-striped ">
	
    <thead>
      <tr>
        <th>Image</th>
        <th>Last Name</th>
        <th>First Name</th>
        <th>Address</th>
        <th>Contact Number</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Icon</td>
        <th>Lina</th>
        <th>Karen</th>
        <td>Hilongos,Leyte</td>
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
