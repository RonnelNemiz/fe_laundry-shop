import React from 'react'
import "../../assets/table.css"

function Services() {
  return (
    <div>
    <div className="container bg-light">
      <h1>Service Table</h1>
          <div className ="card mt-5">
            <div className="card-body">
            <a name="add new" className="btn btn-primary" href="Add.js" role="button">+ Add New</a><br /><br />
        
            <table className="table table-striped ">

<thead>
  <tr>
    <th>Service Name</th>
    <th>Service Discription</th>
    <th>Service Price</th>
    <th>Service Image</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Wash Dry&Fold</td>
    <td>Per Load</td>
    <td>189</td>
    <td>icon</td>
    <td>
    <select name="cars" id="cars">
      <option value="volvo">Edit</option>
      <option value="saab">Delete</option>
    </select>
    </td>
    <td>
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

export default Services
