import React from 'react'

function View() {
  return (
    <div>
      <div class="table-wrapper">
	
                <div class="table-row table-header">
                    <div class="col-wrapper order-date-number-po">
                        <div class="table-col order-date">Date</div>
                        <div class="table-col order-number">Sales Order #</div>
                    </div>
                    
                    <div class="col-wrapper order-year-model-customer">
                        <div class="col-wrapper order-year-model">
                            <div class="table-col order-year">Year</div>
                            <div class="table-col order-model">Model</div>
                        </div>
                        <div class="table-col order-customer">Customer</div>
                    </div>
                    
                    <div class="col-wrapper order-status-signed">
                        <div class="table-col order-status">Status</div>
                        <div class="table-col order-signed">Signed</div>
                    </div>
                    
                    <div class="col-wrapper order-actions">
                        <div class="table-col order-sign">Sign</div>
                        <div class="table-col order-view">View</div>
                    </div>
                    
                </div>
                
                <div class="table-row">
                    <div class="col-wrapper order-date-number-po">
                        <div class="table-col order-date">12 May 2017</div>
                        <div class="table-col order-number">SO-22204</div>
                    </div>
                    
                    <div class="col-wrapper order-year-model-customer">
                        <div class="col-wrapper order-year-model">
                            <div class="table-col order-year">2018</div>
                            <div class="table-col order-model">U24MB</div>
                        </div>
                        <div class="table-col order-customer">Willy Coyote & Road Runner</div>
                    </div>
                    
                    <div class="col-wrapper order-status-signed">
                        <div class="table-col order-status">Open</div>
                        <div class="table-col order-signed">✅</div>
                    </div>
                    
                    <div class="col-wrapper order-actions">
                        <div class="table-col order-sign">Sign</div>
                        <div class="table-col order-view">View</div>
                    </div>
                    
                </div>
                
                <div class="table-row">
                    <div class="col-wrapper order-date-number-po">
                        <div class="table-col order-date">09 May 2017</div>
                        <div class="table-col order-number">SO-21904</div>
                    </div>
                    
                    <div class="col-wrapper order-year-model-customer">
                        <div class="col-wrapper order-year-model">
                            <div class="table-col order-year">2018</div>
                            <div class="table-col order-model">U24TB</div>
                        </div>
                        <div class="table-col order-customer">Jerry & Elaine</div>
                    </div>
                    
                    <div class="col-wrapper order-status-signed">
                        <div class="table-col order-status">Open</div>
                        <div class="table-col order-signed">❌</div>
                    </div>
                    
                    <div class="col-wrapper order-actions">
                        <div class="table-col order-sign">Sign</div>
                        <div class="table-col order-view">View</div>
                    </div>
                    
                </div>
                
            </div>
    </div>
  )
}

export default View

