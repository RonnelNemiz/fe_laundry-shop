import React, { useState, useEffect } from "react";
import "./Dash.css";
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
        <div
          className="row my-2 "
          id="rw"
          style={{ justifyContent: "space-evenly" }}
        >
          <div className="col-md-3" id="bg1">
            <div>
              <div className="p-1  d-flex justify-content-around align-items-center">
                <div>
                  <h3 className="fs-4 pt-2">New Orders</h3>
                  {newOrders && (
                    <div key={newOrders?.todays_orders_count}>
                      <p className="fs-6">{newOrders?.todays_orders_count}</p>
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
                  color: "white",
                  marginLeft: "4%",
                  marginRight: "4%",
                  listStyle: "none",
                }}
              />
              <NavLink
                to="/admin/orders"
                className="fs-6 "
                id="style-linkButar"
                style={{
                  color: "white",
                  cursor: "pointer",
                }}
              >
                See More
              </NavLink>
            </div>
          </div>

          <div className="col-md-3" id="bg2">
            <div>
              <div className="p-1  d-flex justify-content-around align-items-center">
                <div>
                  <h3 className="fs-4 pt-2">Pending</h3>

                  <div>
                    <p className="fs-6">{pendingOrdersCount}</p>
                  </div>
                </div>
                <div>
                  <EventNoteIcon
                    style={{ paddingTop: "10px", fontSize: "3em" }}
                  />
                  <p style={{ fontSize: ".6em" }}>Last 24hrs</p>
                </div>
              </div>
              <Divider
                variant="inset"
                component="li"
                style={{
                  color: "white",
                  marginLeft: "4%",
                  marginRight: "4%",
                  listStyle: "none",
                }}
              />
              <NavLink
                to="/reports"
                className="fs-6 "
                id="style-linkButar"
                style={{
                  color: "white",
                  cursor: "pointer",
                  paddingTop: "4%",
                  paddingBottom: "4%",
                }}
              >
                See More
              </NavLink>
            </div>
          </div>
          <div className="col-md-3" id="bg3">
            <div>
              <div className="p-1  d-flex justify-content-around align-items-center">
                <div>
                  <h3 className="fs-4 pt-2">Sales</h3>
                  {totalsales?.sales && (
                    <div key={totalsales?.sales.week}>
                      <p className="fs-6">{totalsales?.sales.week}</p>
                    </div>
                  )}
                </div>
                <div>
                  <MoneyIcon style={{ paddingTop: "10px", fontSize: "3em" }} />
                  <p style={{ fontSize: ".6em" }}>Last 24hrs</p>
                </div>
              </div>
              <Divider
                variant="inset"
                component="li"
                style={{
                  color: "white",
                  marginLeft: "4%",
                  marginRight: "4%",
                  listStyle: "none",
                }}
              />
              <NavLink
                to="/reports"
                className="fs-6 "
                id="style-linkButar"
                style={{
                  color: "white",
                  cursor: "pointer",
                }}
              >
                See More
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
