import React, { useReducer, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Http from "../../../../services/Http";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import DeleteHistory from "../components/DeleteHistory";
import ShowHistory from "../components/ShowHistory";
import { NavLink } from "react-router-dom";
import UpdateProfile from "../components/UpdateProfile";
import CommentModal from "../components/CreateModal";

const styleLink = {
  color: "red",
  paddingRight: "5px",
};

const styleBox1 = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingTop: "15px",
  paddingLeft: "20px",
};
const accountStyle = {
  padding: "50px",
};

const profileBoxStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontSize: "20px",
};

const tableContainerStyle = {
  marginTop: "10px",
  padding: "10px",
};
const orderStyle = {
  padding: "50px",
};

function MyAccount() {
  const [customerAccount, setCustomerAccount] = useState(null);
  const [customerHistory, setCustomerHistory] = useState([]);
  const [showOrder, setShowOrder] = useState(null);
  const [showCommendModal, setShowCommendModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    handleFetchCustomer();
  }, []);

  const handleFetchCustomer = () => {
    Http.get("customer", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        if (res.data.status === 200) {
          setCustomerAccount(res.data.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    handleFetchCustomerHistory();
  }, [ignored]);

  const handleFetchCustomerHistory = () => {
    Http.get("history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        if (res.data.status === 200) {
          setCustomerHistory(res.data.orders);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (values) => {
    Http.delete(`/delete/orders/${values}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then();
  };

  const handleUpdate = (params) => {
    Http.put(
      `edit/profile/${params.user_id}`,
      params
      // {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      //   },
      // },
    )
      .then((res) => {
        console.log(res.data);
        setCustomerAccount(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShow = (orders) => {
    setShowOrder(orders);
  };

  const handleShowInsertComment = (order) => {
    setSelectedOrder(order);
    setShowCommendModal(true);
  };

  return (
    <Box>
      <div style={styleBox1}>
        <NavLink to="/home" style={styleLink}>
          Home
        </NavLink>
        <ArrowForwardIosIcon sx={{ fontSize: "1em" }} />
        <Typography>Your Account</Typography>
      </div>
      <Box sx={accountStyle}>
        <h2>Your Account</h2>
        <Typography>Your Profile</Typography>
      </Box>

      <Box sx={profileBoxStyle}>
        {customerAccount?.profile.map((profile) => (
          <p key={profile.user_id}>
            <span style={{ textAlign: "center" }}>
              Name: {profile.first_name}
            </span>
            <br />
            <span style={{ textAlign: "center" }}>
              Email: {customerAccount?.email}
            </span>
            <br />
            <span style={{ textAlign: "center" }}>
              Password: **************
            </span>

            <UpdateProfile
              selectedItem={profile}
              onEdit={handleUpdate}
              forceUpdate={forceUpdate}
              customerAccount={customerAccount}
            />
          </p>
        ))}
      </Box>

      <Box sx={orderStyle}>
        <Typography>Your Orders</Typography>
        <TableContainer sx={tableContainerStyle}>
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
                <TableCell size="small">Actions</TableCell>
                <TableCell size="small">Transaction#</TableCell>
                <TableCell size="small">Date</TableCell>
                <TableCell size="small">Payment Method</TableCell>
                <TableCell size="small">Total</TableCell>
                <TableCell size="small">Status</TableCell>
                <TableCell size="small">Payment Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerHistory?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell
                    size="small"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "10vh",
                    }}
                  >
                    {(order.status.includes("completed") ||
                      order.status.includes("paid")) && (
                      <Tooltip title="Insert Comment">
                        <InsertCommentIcon
                          onClick={() => handleShowInsertComment(order)}
                          style={{ cursor: "pointer", color: "gray" }}
                        />
                      </Tooltip>
                    )}
                    <Tooltip title="View">
                      <VisibilityIcon
                        onClick={() => handleShow(order)}
                        style={{ cursor: "pointer", color: "gray" }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <DeleteHistory
                        selectedItem={order}
                        onDelete={handleDelete}
                        forceUpdate={() => forceUpdate()}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell size="small">{order.trans_number}</TableCell>
                  <TableCell size="small">{order.created_at}</TableCell>
                  <TableCell size="small">
                    {order.payment.payment_name}{" "}
                  </TableCell>
                  <TableCell size="small">{order.total}</TableCell>
                  <TableCell size="small">{order.status}</TableCell>
                  <TableCell size="small">{order.payment_status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {showOrder && (
          <ShowHistory
            sx={{ maxWidth: "500px" }}
            showOrder={showOrder}
            onClose={() => setShowOrder(null)}
          />
        )}
      </Box>

      <CommentModal
        order={selectedOrder}
        open={showCommendModal}
        onClose={() => setShowCommendModal(false)}
      />
    </Box>
  );
}

export default MyAccount;
