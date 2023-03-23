import React from "react";

function Reports() {
	return
	 <div>
		<div className="container bg-light">
          <h1>List Of Orders</h1>
              <div className ="card mt-5">
                <div className="card-body">
            
                <table class="table table-striped">
    <thead>
      <tr>
        <th>Today</th>
        <th>Yesterday</th>
		<th>This Week</th>
		<th>Last week</th>
		<th>Monthly</th>
		<th>Quarterly</th>
        <th>Annually</th>
        <th>Custom Defined</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
        <select name="cars" id="cars">
          <option value="volvo">Paid</option>
          <option value="saab">Unpaid</option>
        </select>
        </td>
        <td>
                            
        </td>
      </tr>
      <select name="cars" id="cars">
        <option value="volvo">View</option>
          <option value="saab">Edit</option>
          <option value="opel">Delete</option>
        </select>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
        <select name="cars" id="cars">
          <option value="volvo">Paid</option>
          <option value="saab">Unpaid</option>
          
        </select>
        </td>
        <td>
        <select name="cars" id="cars">
        <option value="volvo">View</option>
          <option value="saab">Edit</option>
          <option value="opel">Delete</option>
        </select>
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
        <select name="cars" id="cars">
          <option value="volvo">Paid</option>
          <option value="saab">Unpaid</option>
          
        </select>
        </td>
        <td>
        <select name="cars" id="cars">
        <option value="volvo">View</option>
          <option value="saab">Edit</option>
          <option value="opel">Delete</option>
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
		</div>;
}

export default Reports;
