import React, { useState, useEffect, useReducer, userList } from "react";
import TablePagination from "@mui/material/TablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToastNotificationContainer from "../../../../../components/ToastNotificationContainer";

import Http from "../../../../../services/Http";
import "./expenditures.css";
import AddExpenditure from '../components/AddExpenditure';
import EditExpenditures from '../components/EditExpenditure';
import DeleteExpenditure from '../components/DeleteExpenditure';

const Expenditures = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [expendData, setExpendData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [paginationData, setPaginationData] = useState({ total: 0 });

  useEffect(() => {
    setIsLoading(true);
    Http.get("/expend")
      .then((res) => {
        setExpendData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [ignored]);

  const handleUpdate = (values) => {
    Http.get(`update/expends/${values}`).then();
  };
  const handleDelete = (id) => {
    Http.delete(`delete/expends/${id}`).then();
  };

  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="container-fluid">
      <div className="row my-2" id="row">
        <div className="col-md-3" id="background1">
          <div className="p-3 d-flex justify-content-around align-items-center">
            <div>
              <h3 className="fs-4">Today</h3>
              <p className="fs-6">₱1,000</p>
            </div>
            <FontAwesomeIcon icon="fa-solid fa-chart-line" size="2x" />
          </div>
        </div>
        <div className="col-md-3 " id="background2">
          <div className="p-3  d-flex justify-content-around align-items-center">
            <div>
              <h3 className="fs-4">This Week</h3>
              <p className="fs-6">₱6,000</p>
            </div>
            <FontAwesomeIcon icon="fa-solid fa-chart-line" size="2x" />
          </div>
        </div>
        <div className="col-md-3" id="background3">
          <div className="p-3  d-flex justify-content-around align-items-center">
            <div>
              <h3 className="fs-4">This Month</h3>
              <p className="fs-6">₱25,000</p>
            </div>
            <FontAwesomeIcon icon="fa-solid fa-chart-line" size="2x" />
          </div>
        </div>
      </div>
      <Box>
        <ToastNotificationContainer />
        <AddExpenditure forceUpdate={() => forceUpdate()} />
        <TableContainer component={Paper}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Table>
              <TableHead
                sx={{
                  "& th": {
                    color: "white",
                    backgroundColor: "#0E4C91",
                  },
                }}>
                <TableRow>
                  <TableCell size="small">Title</TableCell>
                  <TableCell size="small">Description</TableCell>
                  <TableCell size="small">Amount</TableCell>
                  <TableCell size="small">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expendData.map((expend) => (
                  <TableRow key={expend.id}>
                    <TableCell size="small">{expend.title}</TableCell>
                    <TableCell size="small">{expend.description}</TableCell>
                    <TableCell size="small">{expend.amount}</TableCell>
                    <TableCell size="small">
                      <EditExpenditures
                        selectedItem={expend}
                        onEdit={handleUpdate}
                        forceUpdate={() => forceUpdate()}
                      />
                      <DeleteExpenditure
                        selectedItem={expend}
                        onDelete={handleDelete}
                        forceUpdate={() => forceUpdate()}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Box>
      <TablePagination
        component="div"
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Expenditures;