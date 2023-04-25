import React from "react";
import "../../assets/table.css";


function Sales() {
  return (
    <div>
      <div className="container bg-light">
        <h1>Sales</h1>
        <div className="card mt-5">
          <div className="card-body">

            <table className="table table-striped">
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2500</td>
                  <td>5400</td>
                  <td>1050</td>
                  <td>18400</td>
                  <td>50600</td>
                  <td>98600</td>
                  <td>98600</td>
                  <td>Custom Defined</td>
                </tr>


              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sales;
