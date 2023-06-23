import React, { useState, useEffect } from "react";
import Http from "../../../services/Http";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoneyIcon from "@mui/icons-material/Money";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [newOrders, setNewOrders] = useState([]);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [totalsales, setTotalSales] = useState([]);
  useEffect(() => {
    fetchingTotalSales();
    fetchingNewOrders();
    fetchingPendingOrders();
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
  const fetchingNewOrders = (params = {}) => {
    setIsLoading(true);
    Http.get("/totalneworders")
      .then((res) => {
        console.log(res.data);
        setNewOrders(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const fetchingPendingOrders = (params = {}) => {
    setIsLoading(true);
    Http.get("/pending-orders-count")
      .then((res) => {
        setPendingOrdersCount(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row my-2">
          <div className="col-md-4 card py-3">
            <div className="d-flex justify-content-around align-items-center p-3">
              <div>
                <h3 className="fs-4 pt-2">New Orders</h3>
                {newOrders && (
                  <div key={newOrders?.todays_orders_count}>
                    <h3>{newOrders?.todays_orders_count}</h3>
                  </div>
                )}
              </div>
              <div>
                <ShoppingCartIcon
                  style={{ paddingTop: "10px", fontSize: "3em" }}
                />
                <p style={{ fontSize: ".6em" }}>Last 24hrs</p>
              </div>
            </div>
            <Divider
              variant="inset"
              component="li"
              style={{
                margin: "15px 0",
                listStyle: "none",
              }}
            />
            <NavLink
              to="/admin/orders"
              className=""
              style={{
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              See More
            </NavLink>
          </div>

          <div className="col-md-4 card py-3">
            <div className="d-flex justify-content-around align-items-center p-3">
              <div>
                <h3>Pending</h3>
                <h3>{pendingOrdersCount}</h3>
              </div>
              <div>
                <ShoppingCartIcon
                  style={{ paddingTop: "10px", fontSize: "3em" }}
                />
                <p style={{ fontSize: ".6em" }}>Last 24hrs</p>
              </div>
            </div>
            <Divider
              variant="inset"
              component="li"
              style={{
                margin: "15px 0",
                listStyle: "none",
              }}
            />
            <NavLink
              to="/admin/orders"
              className=""
              style={{
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              See More
            </NavLink>
          </div>

          <div className="col-md-4 card py-3">
            <div className="d-flex justify-content-around align-items-center p-3">
              <div>
                <h3>Sales</h3>
                <h3>{pendingOrdersCount}</h3>
              </div>
              <div>
                <ShoppingCartIcon
                  style={{ paddingTop: "10px", fontSize: "3em" }}
                />
                <p style={{ fontSize: ".6em" }}>Last 24hrs</p>
              </div>
            </div>
            <Divider
              variant="inset"
              component="li"
              style={{
                margin: "15px 0",
                listStyle: "none",
              }}
            />
            <NavLink
              to="/admin/orders"
              className=""
              style={{
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              See More
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
