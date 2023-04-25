import { Button } from '@mui/material'
import React from 'react'
import Expenditures from '../components/Expenditures';
import Sales from '../components/Sales';

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
