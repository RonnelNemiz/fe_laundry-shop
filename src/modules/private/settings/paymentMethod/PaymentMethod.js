import React from 'react'
import"../../assets/table.css"

function PaymentMethod() {
  return (
    <div>
    
		<div className="container bg-light">
          <h2>Payment Method Table</h2>
              <div className ="card mt-5">
                <div className="card-body">
                <a name="add new" className="btn btn-primary" href="Add.js" role="button">+ Add New</a><br /><br />
            
                <table className="table table-striped ">
	
    <thead>
      <tr>
        <th>Name</th>
        <th>Icon</th>
        <th>Details</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Karen Lina</td>
        <th>Image</th>
        <th>Details</th>
        <td>
        <select name="cars" id="cars">
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

export default PaymentMethod
