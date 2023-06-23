import React, { useState, useEffect, useReducer } from "react";

import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddServices from "./../components/AddServices";
import MUIDataTable from "mui-datatables";

const DataTables = ({ data, columns, options }) => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  return (
    <MUIDataTable
      title={"Services List"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default DataTables;
