import { Button } from '@mui/material'
import React from 'react'
import Expenditures from './expenditures/Expenditures';
import Sales from './sales/Sales';

function Reports() {
  return (
    <div>
      <Button>
        <Expenditures />
      </Button>
      <Button>
        <Sales /> 
      </Button>
    </div>
  )
}

export default Reports
