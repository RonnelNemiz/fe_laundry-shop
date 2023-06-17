import React, { useState, useEffect, useReducer } from "react";
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
import Http from "../../../../../services/Http";
import "./sales.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToastNotificationContainer from "../../../../../components/ToastNotificationContainer";
import AddSales from "../components/AddSales";
import EditSales from "../components/EditSales";
import DeleteSales from "../components/DeleteSales";

function Sales() {
  const [sales, setSales] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [isLoading, setIsLoading] = useState(false);

  const [totalsales, setTotalSales] = useState([]);
  useEffect(() => {
    fetchingTotalSales();
  }, []);

  const fetchingTotalSales = (params = {}) => {
    setIsLoading(true);
    Http.get("/totalsales")
      .then((res) => {
        setTotalSales(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchingData();
  }, [ignored]); //eslint-disable-line

  const fetchingData = (params = {}) => {
    setIsLoading(true);
    Http.get("/sales")
      .then((res) => {
        setSales(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleUpdate = (values) => {
    Http.get(`update/sales/${values}`).then();
  };
  const handleDelete = (id) => {
    Http.delete(`delete/sales/${id}`).then();
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
      <div className="row my-2" id="rw">
        <div className="col-md-3" id="bg1">
          <div className="p-3  d-flex justify-content-around align-items-center">
            <div>
              <h3 className="fs-4">Today</h3>

              {totalsales?.sales && (
                <div key={totalsales?.sales.week}>
                  <p className="fs-6">{totalsales?.sales.week}</p>
                </div>
              )}
            </div>
            <FontAwesomeIcon icon="fa-solid fa-chart-line" size="2x" />
          </div>
        </div>
        <div className="col-md-3 " id="bg2">
          <div className="p-3  d-flex justify-content-around align-items-center">
            <div>
              <h3 className="fs-4">This Week</h3>
              {totalsales?.sales && (
                <div key={totalsales?.sales.week}>
                  <p className="fs-6">{totalsales?.sales.week}</p>
                </div>
              )}
            </div>
            <FontAwesomeIcon icon="fa-solid fa-chart-line" size="2x" />
          </div>
        </div>
        <div className="col-md-3" id="bg3">
          <div className="p-3  d-flex justify-content-around align-items-center">
            <div>
              <h3 className="fs-4">This Month</h3>

              {totalsales?.sales && (
                <div key={totalsales?.sales.week}>
                  <p className="fs-6">{totalsales?.sales.month}</p>
                </div>
              )}
            </div>
            <FontAwesomeIcon icon="fa-solid fa-chart-line" size="2x" />
          </div>
        </div>
      </div>
      <ToastNotificationContainer />
      <AddSales forceUpdate={() => forceUpdate()} />
      <Box>
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
                }}
              >
                <TableRow>
                  <TableCell size="small">Title</TableCell>
                  <TableCell size="small">Description</TableCell>
                  <TableCell size="small">Amount</TableCell>
                  <TableCell size="small">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sales.map((sales) => (
                  <TableRow key={sales.id}>
                    <TableCell size="small">{sales.title}</TableCell>
                    <TableCell size="small">{sales.description}</TableCell>
                    <TableCell size="small">{sales.amount}</TableCell>
                    <TableCell size="small">
                      <EditSales
                        selectedItem={sales}
                        onEdit={handleUpdate}
                        forceUpdate={() => forceUpdate()}
                      />
                      <DeleteSales
                        selectedItem={sales}
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
}

export default Sales;
