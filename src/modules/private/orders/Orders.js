import React from "react";
import "./../assets/table.css"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Orders() {
	return <div>
		<div className="container bg-light">
          <h2>List Of Orders</h2>
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
        <td style={{display:"flex", justifyContent:"center"}}>
          <button type="button"className="btn btn-primary"> <EditIcon /></button>
          <button type="button"className="btn btn-primary"> <DeleteIcon /></button>
          <button type="button"className="btn btn-primary"> Show</button>
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
			
}

export default Orders;
