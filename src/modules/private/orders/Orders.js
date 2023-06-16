import React, { useState, useEffect, useReducer } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Tooltip,
  Typography,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddOrders from "./components/AddOrders";
import EditOrders from "./components/EditOrders";
import Delete from "./components/Delete";
import ViewOrders from "./components/ViewOrders";
import Http from "../../../services/Http";
import EditIcon from "@mui/icons-material/Edit";
import KiloModal from "./components/KiloModal";
import TotalModal from "./components/TotalModal";
import ChangeModal from "./components/ChangeModal";
import AmountModal from "./components/AmountModal";
import RefNumModal from "./components/RefNumModal";
import CheckIcon from "@mui/icons-material/Check";
import FabconModal from "./components/FabconModal";
import TablePagination from "@mui/material/TablePagination";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import DetergentModal from "./components/DetergentModal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "../assets/table.css"


const handlingStyle = {
  color: "#0d6efd",
  fontWeight: 600
};
const makeStyles = (status) => {
  if (status === "completed") {
    return {
      color: "green",
      cursor: "pointer",
      fontSize:"0.875rem",
      width:"150px"
    };
  }  else if (status === "ready to deliver") {
    return {
      background: "#f94d00",
      color: "#ff8c00",
      cursor: "pointer",
      fontSize:"0.875rem",
      width:"150px"
    };
  } else if (status === "ready to pickup") {
    return {
      background: "#ffada8f",
      color: "ff8c00",
      cursor: "pointer",
      fontSize:"0.875rem",
      width:"150px"
    };
  }  else if (status === "ready for pickup") {
    return {
      background: "#ffada8f",
      color: "#f94d00",
      cursor: "pointer",
      fontSize:"0.875rem",
      width:"150px"
    };
  }  else if (status === "in progress") {
    return {
      background: "#ffada8f",
      color: "orange",
      cursor: "pointer",
      fontSize:"0.875rem",
      width:"150px"
    };
  } else if (status === "pending") {
    return {
      background: "#ffada8f",
      color: "red",
      cursor: "pointer",
      fontSize:"0.875rem",
      width:"150px"
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
      cursor: "pointer",
      fontSize:"0.875rem",
      width:"150px"
    };
  }
};

const makeStyle = (payment_status) => {
  if (payment_status === "paid") {
    return {
      // background: 'rgb(145 254 159 / 47%)',
      color: "green",
      cursor: "pointer",
    };
  } else if (payment_status === "unpaid") {
    return {
      background: "#ffada8f",
      color: "red",
      cursor: "pointer",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
      cursor: "pointer",
    };
  }
};

const Orders = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showOrder, setShowOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState({});

  const [isKiloModalOpen, setIsKiloModalOpen] = useState(false);
  const [isTotalModalOpen, setIsTotalModalOpen] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [isAmountModalOpen, setIsAmountModalOpen] = useState(false);
  const [isRefModalOpen, setIsRefModalOpen] = useState(false);
  const [isFabconModalOpen, setIsFabconModalOpen] = useState(false);
  const [isDetergentModalOpen, setIsDetergentModalOpen] = useState(false);
  const [openEd, setOpenEd] = useState(false);

  // const [selectedOrderId, setSelectedOrderId] = useState("");
  // const [selectedOrderTotal, setSelectedOrderTotalId] = useState("");
  // const [selectedOrderAmount, setSelectedOrderAmountId] = useState("");
  // const [selectedOrderChange, setSelectedOrderChangeId] = useState("");
  // const [selectedOrderRef, setSelectedOrderRefId] = useState("");
  // const [selectedOrderFabcon, setSelectedOrderFabconId] = useState("");

  const [kiloValues, setKiloValues] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    Http.get("/orders",{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then((res) => {
        const ordersData = res.data;
        setOrders(ordersData.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(ordersData.length / rowsPerPage));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [ignored, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (values) => {
    Http.delete(`/delete/orders/${values}`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }}).then();
  };
  const handleShow = (data) => {
    setShowOrder(data);
  };

  const handleUpdate = (orderId, updatedStatus) => {
    Http.put(`/orders/${orderId}/status`, { status: updatedStatus},{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then(() => {
        forceUpdate();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdatePayStatus = (orderId, currentPaymentStatus) => {
    let updatedPaymentStatus = "";

    if (currentPaymentStatus === "unpaid") {
      updatedPaymentStatus = "paid";
    } else {
      return;
    }

    Http.put(`/orders/${orderId}/paymentstatus`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }}, {
      payment_status: updatedPaymentStatus,
    })
      .then(() => {
        forceUpdate();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdateOrder = (order) => {
    setSelectedOrder(order);
    setOpenEd(true);
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsKiloModalOpen(true);
  };
  const closeModal = () => {
    setIsKiloModalOpen(false);
    setSelectedOrder({});
  };

  const openTotalModal = (order) => {
    setSelectedOrder(order);
    setIsTotalModalOpen(true);
  };
  const closeTotalModal = () => {
    setIsTotalModalOpen(false);
  };

  const openAmountModal = (order) => {
    setSelectedOrder(order);
    setIsAmountModalOpen(true);
  };
  const closeAmountModal = () => {
    setIsAmountModalOpen(false);
  };

  const openChangeModal = (order) => {
    setSelectedOrder(order);
    setIsChangeModalOpen(true);
  };
  const closeChangeModal = () => {
    setIsChangeModalOpen(false);
  };

  const openRefModal = (order) => {
    setSelectedOrder(order);
    setIsRefModalOpen(true);
  };
  const closeRefModal = () => {
    setIsRefModalOpen(false);
  };

  const openFabconModal = (order) => {
    setSelectedOrder(order);
    setIsFabconModalOpen(true);
  };
  const closeFabconModal = () => {
    setIsFabconModalOpen(false);
    setSelectedOrder({});
  };

  const openDetergentModal = (order) => {
    setSelectedOrder(order);
    setIsDetergentModalOpen(true);
  };
  const closeDetergentModal = () => {
    setIsDetergentModalOpen(false);
    setSelectedOrder({});
  };

  const handleKiloSubmit = (id, categoryId, value) => {
    Http.put(`/orders/${id}/${categoryId}/kilo`, { kilo: value },{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then(() => {
        const updatedOrders = orders.map((order) => {
          if (order.id === id) {
            return {
              ...order,
              kilo: value,
            };
          }
          return order;
        });
        setOrders(updatedOrders);
        closeModal();
        forceUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTotalSubmit = (order, totalValue) => {
    Http.put(`/orders/${order.id}/total`, { total: totalValue },{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then(() => {
        closeTotalModal();
        forceUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAmountSubmit = (order, amountValue) => {
    Http.put(`/orders/${order.id}/amount`, { amount: amountValue },{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then(() => {
        closeAmountModal();
        forceUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeSubmit = (order, changeValue) => {
    Http.put(`/orders/${order.id}/change`, { change: changeValue },{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then(() => {
        closeChangeModal();
        forceUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRefSubmit = (order, refValue) => {
    Http.put(`/orders/${order.id}/ref_num`, { ref_num: refValue },{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then(() => {
        closeRefModal();
        forceUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFabconSubmit = (order, fabconValue) => {
    Http.put(`/orders/${order.fabcon_id}/update-fabcon`,{
      fabcon_id: fabconValue,
    },{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then(() => {
        closeFabconModal();
        forceUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDetergentSubmit = (order, detergentValue) => {
    Http.put(`/orders/${order.detergent_id}/update-detergent`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }}, {
      detergent_id: detergentValue,
    })
      .then(() => {
        closeDetergentModal();
        forceUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);
  return (
    <>
      <AddOrders forceUpdate={() => forceUpdate()} />
      <TableContainer component={Paper} id="tableContainerStyle">
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
              <TableRow >
                <TableCell size="small">Actions</TableCell>
                <TableCell size="small">Trans ID</TableCell>
                <TableCell size="small">First Name</TableCell>
                <TableCell size="small">Last Name</TableCell>
                <TableCell size="small">Handling</TableCell>
                <TableCell size="small">Handling Price</TableCell>
                <TableCell size="small">Service</TableCell>
                <TableCell size="small">Service Price</TableCell>
                <TableCell size="small">Kilo</TableCell>
                <TableCell size="small">Fabcon</TableCell>
                <TableCell size="small">Detergent</TableCell>
                <TableCell size="small">Total</TableCell>
                <TableCell size="small">Amount</TableCell>
                <TableCell size="small">Change</TableCell>
                <TableCell size="small">Reference#</TableCell>
                <TableCell size="small">Order Status</TableCell>
                <TableCell size="small">Payment Status</TableCell>
                <TableCell size="small">Payment Method</TableCell>
                <TableCell size="small">Approved By</TableCell>
                <TableCell size="small">Date Ordered</TableCell>
              </TableRow>
            </TableHead>
            <TableBody  id="tableBodyStyle">
              {orders && orders.map((data) => {
                return (
                  <TableRow key={data.id} >
                    <TableCell
                      size="small"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "20vh",
                      }}
                    >
                      <Tooltip title="View">
                        <VisibilityIcon
                          onClick={() => handleShow(data)}
                          style={{ cursor: "pointer", color: "gray" }}
                        />
                      </Tooltip>
                      <Tooltip title="Edit">
                        <EditIcon
                          onClick={() => handleUpdateOrder(data)}
                          sx={{
                            fontsize: "30px",
                            cursor: "pointer",
                            color: "#0d6efd",
                            position: "relative",
                            left: "10px",
                            transition: ".5s",
                            "&:hover": {
                              color: "black",
                            },
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Delete
                          selectedItem={data}
                          onDelete={(orderId) => handleDelete(orderId)}
                          forceUpdate={() => forceUpdate()}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell size="small">{data.trans_number}</TableCell>
                    <TableCell size="small">
                      {data.user?.profile?.first_name ?? "Admin"}
                    </TableCell>
                    <TableCell size="small">
                      {data.user?.profile?.last_name ?? "Admin"}
                    </TableCell>
                    <TableCell size="small">
                      {(data.handling_id === 1 && "Pickup & Delivery") ||
                        (data.handling_id === 2 && "Pickup") ||
                        (data.handling_id === 3 && "Delivery") ||
                        (data.handling_id === 4 && "Walk-in")}
                    </TableCell>
                    <TableCell size="small">
                      {(data.handling_id === 1 && "40") ||
                        (data.handling_id === 2 && "20") ||
                        (data.handling_id === 3 && "20") ||
                        (data.handling_id === 4 && "0")}
                    </TableCell>
                    <TableCell size="small">
                      {(data.service_id === 1 && "Wash Dry & Fold") ||
                        (data.service_id === 2 && "Ironing")}
                    </TableCell>
                    <TableCell size="small">
                      {(data.service_id === 1 && "20") ||
                        (data.service_id === 2 && "50")}
                    </TableCell>
                    <TableCell size="small">
                      <Typography component="ul" style={{ padding: "0px" }}>
                        {data &&
                          data.categories &&
                          data.categories
                            .reduce((uniqueCategories, category, i) => {
                              // Check if the category ID has already been displayed
                              const isDuplicateId = uniqueCategories.some(
                                (c) => c.parent_id === category.parent_id
                              );
                              // If it's the first occurrence, add it to the uniqueCategories array
                              if (!isDuplicateId) {
                                uniqueCategories.push(category);
                              }

                              return uniqueCategories;
                            }, [])
                            .map((category, i) => {
                              return (
                                <Typography
                                  key={i}
                                  component="li"
                                  sx={{ display: "flex  " }}
                                >
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      paddingRight: "10px",
                                      width: "25px",
                                    }}
                                  >
                                    {category.parent_id}{" "}
                                  </span>
                                  {/* <Box sx={{ paddingTop:'0px', paddingBottom:'0px', width:'40px', border: '1px solid grey' }} onClick={() => openModal(data.id)}>
                              {category.pivot.kilo} 
                            </Box> */}

                                  <input
                                    style={{ width: "40px" }}
                                    type="number"
                                    value={
                                      kiloValues[`${data.id}-${i}`] ||
                                      category.pivot.kilo
                                    }
                                    onChange={(e) =>
                                      setKiloValues({
                                        ...kiloValues,
                                        [`${data.id}-${i}`]: e.target.value,
                                      })
                                    }
                                  />
                                  <button
                                    onClick={() =>
                                      handleKiloSubmit(
                                        data.id,
                                        category.id,
                                        kiloValues[`${data.id}-${i}`]
                                      )
                                    }
                                  >
                                    {" "}
                                    <CheckIcon style={{ width: "10px" }} />
                                  </button>
                                </Typography>
                              );
                            })}
                      </Typography>
                    </TableCell>
                    <TableCell
                      size="small"
                      onClick={() => openFabconModal(data)}
                    >
                      {(data.fabcon_id === 1 && "Downy") ||
                        (data.fabcon_id === 2 && "Del") ||
                        (data.fabcon_id === 3 && "Surf")}
                    </TableCell>
                    <TableCell
                      size="small"
                      onClick={() => openDetergentModal(data)}
                    >
                      {(data.detergent_id === 1 && "Surf") ||
                        (data.detergent_id === 2 && "Ariel") ||
                        (data.detergent_id === 3 && "Breeze")||
                        (data.detergent_id === 4 && "LiquidAriel")}
                        {/* {data.detergent_id} */}
                    </TableCell>
                    <TableCell
                      size="small"
                      onClick={() => openTotalModal(data)}
                    >
                      {data.total}
                    </TableCell>
                    <TableCell
                      size="small"
                      onClick={() => openAmountModal(data)}
                    >
                      {data.amount}
                    </TableCell>
                    <TableCell
                      size="small"
                      onClick={() => openChangeModal(data)}
                    >
                      {data.change}
                    </TableCell>
                    <TableCell size="small" onClick={() => openRefModal(data)}>
                      {data.ref_num}
                    </TableCell>
                    <TableCell size="small" >
                      <Select
                      style={makeStyles(data.status)}
                        value={data.status}
                        onChange={(event) => handleUpdate(data.id, event.target.value)}
                       
                      >
                      <Typography sx={handlingStyle}>Pickup & Delivery</Typography>
                          <MenuItem value="ready to pickup">ready to pickup</MenuItem>
                          <MenuItem value="in progress">in progress</MenuItem>
                          <MenuItem value="ready to deliver">ready to deliver</MenuItem>
                          <MenuItem value="completed">completed</MenuItem>
                        <Typography sx={handlingStyle}>Pickup</Typography>
                          <MenuItem value="ready to pickup">ready to pickup</MenuItem>
                          <MenuItem value="in progress">in progress</MenuItem>
                          <MenuItem value="ready for pickup">ready for pickup</MenuItem>
                          <MenuItem value="completed">completed</MenuItem>
                        <Typography sx={handlingStyle}>Delivery</Typography>
                        <MenuItem value="in progress">in progress</MenuItem>
                          <MenuItem value="ready to deliver">ready to deliver</MenuItem>
                          <MenuItem value="completed">completed</MenuItem>
                        <Typography sx={handlingStyle}>Walkin</Typography>
                          <MenuItem value="in progress">in progress</MenuItem>
                          <MenuItem value="ready for pickup">ready for pickup</MenuItem>
                          <MenuItem value="completed">completed</MenuItem>   
                      </Select>
                    </TableCell>

                    {/* <TableCell
                      size="small"
                      style={makeStyles(data.status)}
                      onClick={() => handleUpdate(data.id, data.status)}
                    >
                      {" "}
                      {data.status}
                    </TableCell> */}
                    <TableCell
                      size="small"
                      style={makeStyle(data.payment_status)}
                      onClick={() =>
                        handleUpdatePayStatus(data.id, data.payment_status)
                      }
                    >
                      {data.payment_status}
                    </TableCell>
                    <TableCell size="small">
                      {(data.payment_id === 1 && "GCASH") ||
                        (data.payment_id === 2 && "COD") ||
                        (data.payment_id === 3 && "COP")}
                    </TableCell>
                    <TableCell size="small">{data.approved_by}</TableCell>
                    <TableCell size="small">{data.created_at}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 1 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Rows per page"
        nextIconButtonProps={{
          onClick: handleNextPage,
          disabled: page === totalPages - 1,
        }}
        backIconButtonProps={{
          onClick: handlePreviousPage,
          disabled: page === 0,
        }}
        ActionsComponent={() => (
          <div style={{ display: "flex" }}>
            <Tooltip title="Previous Page">
              <span>
                <IconButton onClick={handlePreviousPage} disabled={page === 0}>
                  <KeyboardArrowLeftIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Next Page">
              <span>
                <IconButton
                  onClick={handleNextPage}
                  disabled={page === totalPages - 1}
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        )}
      />

      <ChangeModal
        isOpen={isChangeModalOpen}
        onClose={closeChangeModal}
        onSubmit={(changeValue) =>
          handleChangeSubmit(selectedOrder, changeValue)
        }
      />
      <AmountModal
        isOpen={isAmountModalOpen}
        onClose={closeAmountModal}
        onSubmit={(amountValue) =>
          handleAmountSubmit(selectedOrder, amountValue)
        }
      />
      <RefNumModal
        isOpen={isRefModalOpen}
        onClose={closeRefModal}
        onSubmit={(refValue) => handleRefSubmit(selectedOrder, refValue)}
      />
      <FabconModal
        isOpen={isFabconModalOpen}
        onClose={() => closeFabconModal()}
        onSubmit={(fabconValue) =>
          handleFabconSubmit(selectedOrder, fabconValue)
        }
        order={selectedOrder}
        // onUpdate={forceUpdate}
        forceUpdate={() => forceUpdate()} 
      />
      <DetergentModal
        isOpen={isDetergentModalOpen}
        onClose={() => closeDetergentModal()}
        onSubmit={(detergentValue) =>
          handleDetergentSubmit(selectedOrder, detergentValue)
        }
        order={selectedOrder}
        onUpdate={forceUpdate}
      />
      <KiloModal
        isOpen={isKiloModalOpen}
        onClose={() => closeModal()}
        onSubmit={(kiloValue) => handleKiloSubmit(selectedOrder, kiloValue)}
      />
      <TotalModal
        isOpen={isTotalModalOpen}
        onClose={closeTotalModal}
        onSubmit={(totalValue) => handleTotalSubmit(selectedOrder, totalValue)}
      />
      <EditOrders
        open={openEd}
        order={selectedOrder}
        onClose={() => setOpenEd(false)}
        onUpdate={forceUpdate}
      />
      {showOrder && (
        <ViewOrders
          sx={{ maxWidth: "500px" }}
          showOrder={showOrder}
          onClose={() => setShowOrder(null)}
        />
      )}
    </>
  );
};

export default Orders;
