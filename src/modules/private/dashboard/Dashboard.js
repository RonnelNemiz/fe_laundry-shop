import React, { useState, useEffect } from "react";
import Http from "../../../services/Http";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import PendingIcon from "@mui/icons-material/PendingActions";
import PriceCheck from "@mui/icons-material/PriceCheck";
import MoneyIcon from "@mui/icons-material/Money";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import "./dashboard.css";

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
        console.log(res.data);
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
      <div className="content-header">
        <div className="container-fluid">
          <div className="row my-2">
            <h2 className="m-0">Dashboard</h2>
            <div className="col-md-3 py-3 " style={{ margin: "5px" }}>
              <div className="d-flex justify-content-around align-items-center p-3 bg-info ">
                <div className="orders" style={{ color: "white" }}>
                  <h3 className="fs-4 pt-2">New Orders </h3>

                  {newOrders && (
                    <div key={newOrders?.todays_orders_count}>
                      <h3>{newOrders?.todays_orders_count}</h3>
                    </div>
                  )}
                </div>
                <div>
                  <ShoppingBag
                    style={{ paddingTop: "10px", fontSize: "3em" }}
                  />
                  <p style={{ fontSize: ".6em" }}>Last 24hrs</p>
                </div>
              </div>
              {/* <Divider
                variant="inset"
                component="li"
                style={{
                  margin: "15px 0",
                  listStyle: "none",
                }}
              /> */}
              <NavLink
                to="/admin/orders"
                className=""
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                {/* See More <i className="fas fa-arrow-circle-right"></i> */}
                <a href="#" class="small-box-footer">
                  See More <i class="fas fa-arrow-circle-right"></i>
                </a>
              </NavLink>
            </div>

            <div className="col-md-3 py-3 " style={{ margin: "5px" }}>
              <div className="d-flex justify-content-around align-items-center p-3 bg-success">
                <div className="orders" style={{ color: "white" }}>
                  <h3>Pending</h3>
                  <h3>{pendingOrdersCount}</h3>
                </div>
                <div>
                  <PendingIcon
                    style={{ paddingTop: "10px", fontSize: "3em" }}
                  />
                  <p style={{ fontSize: ".6em" }}>Last 24hrs</p>
                </div>
              </div>
              {/* <Divider
                variant="inset"
                component="li"
                style={{
                  margin: "15px 0",
                  listStyle: "none",
                }}
              /> */}
              <NavLink
                to="/admin/orders"
                className=""
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                <a href="#" class="small-box-footer">
                  See More <i class="fas fa-arrow-circle-right"></i>
                </a>
              </NavLink>
            </div>

            <div className="col-md-3 py-3" style={{ margin: "5px" }}>
              <div className="d-flex justify-content-around align-items-center p-3 bg-warning">
                <div className="orders" style={{ color: "white" }}>
                  <h3>Sales</h3>
                  {totalsales && (
                    <div key={totalsales?.sales?.today}>
                      <h3>{totalsales?.sales?.today}</h3>
                    </div>
                  )}
                </div>
                <div>
                  <PriceCheck style={{ paddingTop: "10px", fontSize: "3em" }} />
                  <p style={{ fontSize: ".6em" }}>Last 24hrs</p>
                </div>
              </div>
              {/* <Divider
                variant="inset"
                component="li"
                style={{
                  margin: "15px 0",
                  listStyle: "none",
                }}
              /> */}
              <NavLink
                to="/admin/orders"
                className=""
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                <a href="#" class="small-box-footer">
                  See More <i class="fas fa-arrow-circle-right"></i>
                </a>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
