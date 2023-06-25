import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import {
  Typography,
  Box,
  LinearProgress,
  IconButton,
  Divider,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Http from "../../../../services/Http";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OrderCategories from "./OrderCategories";
import OrderPayments from "./OrderPayments";
import CloseIcon from "@mui/icons-material/Close";
import OrderStatus from "./OrderStatus";
import ToastNotification from "../../../../components/ToastNotification";
import ToastNotificationContainer from "../../../../components/ToastNotificationContainer";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Form } from "react-bootstrap";
import AddMoreCategories from "./AddMoreCategories";
import ReactTextEditor from "../../../../components/ReactTextEditor";
import AddConsumables from "./AddConsumables";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// const paymentStatuses = [
//   {
//     value: "1",
//     label: "Paid",
//   },
//   {
//     value: "0",
//     label: "Unpaid",
//   },
// ];

// const handlingStatuses = [
//   {
//     value: "0",
//     label: "Pending",
//   },
//   {
//     value: "1",
//     label: "Rider is On Pickup",
//   },
//   {
//     value: "2",
//     label: "Ready for Pickup",
//   },
//   {
//     value: "3",
//     label: "Ready for Delivery",
//   },
//   {
//     value: "4",
//     label: "Rider is On Delivery",
//   },
//   {
//     value: "5",
//     label: "Completed",
//   },
// ];

// const makeStyles = (status) => {
//   if (status === "completed") {
//     return {
//       color: "green",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//       width: "150px",
//     };
//   } else if (status === "ready to deliver") {
//     return {
//       background: "#f94d00",
//       color: "#ff8c00",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//       width: "150px",
//     };
//   } else if (status === "ready to pickup") {
//     return {
//       background: "#ffada8f",
//       color: "ff8c00",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//       width: "150px",
//     };
//   } else if (status === "ready for pickup") {
//     return {
//       background: "#ffada8f",
//       color: "#f94d00",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//       width: "150px",
//     };
//   } else if (status === "in progress") {
//     return {
//       background: "#ffada8f",
//       color: "orange",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//       width: "150px",
//     };
//   } else if (status === "pending") {
//     return {
//       background: "#ffada8f",
//       color: "red",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//       width: "150px",
//     };
//   } else {
//     return {
//       background: "#59bfff",
//       color: "white",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//       width: "150px",
//     };
//   }
// };

// const handlingStyle = {
//   color: "#0d6efd",
//   fontWeight: 600,
// };

export default function EditModal(props) {
  const { open, onClose, order } = props;
  // const [categoryList, setCategoryList] = useState([]);
  const orderId = (order && order.id) || "";

  const [openConsumables, setOpenConsumables] = React.useState(false);
  const [consumables, setComsumables] = React.useState([]);
  const [openTextEditor, setOpenTextEditor] = React.useState(false);
  const [selectedDetails, setSelectedDetails] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const [openAddMoreCategories, setOpenAddMoreCategories] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingOnSubmit, setLoadingOnSubmit] = React.useState(false);
  const [formValues, setFormValues] = useState({
    trans_number: "",
    first_name: "",
    last_name: "",
    purok: "",
    brgy: "",
    municipality: "",
    contact_number: "",
    land_mark: "",
  });

  const [value, setValue] = React.useState("1");

  useEffect(() => {
    if (open) {
      fetchOrderDetail();
      // fetchConsumables();
    }
  }, [open]);

  useEffect(() => {
    if (orderDetails) {
      setFormValues((prev) => ({
        ...prev,
        trans_number: orderDetails?.order?.trans_number,
        ...orderDetails?.profile,
      }));
    }
  }, [orderDetails]);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  };

  const categoryList = [
    {
      id: 1,
      category_name: "Colored Beddings & Bathroom Accessories",
      children: [
        {
          id: 1,
          name: "bedsheet",
          category_id: 1,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 2,
          name: "towel",
          category_id: 1,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 3,
          name: "curtain",
          category_id: 1,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 4,
          name: "pillowcase",
          category_id: 1,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 5,
          name: "blanket",
          category_id: 1,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
      ],
    },
    {
      id: 2,
      category_name: "White Beddings & Bathroom Accessories",
      children: [
        {
          id: 6,
          name: "tshirt",
          category_id: 2,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 7,
          name: "shorts",
          category_id: 2,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 8,
          name: "trousers",
          category_id: 2,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 9,
          name: "jacket",
          category_id: 2,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 10,
          name: "underwear",
          category_id: 2,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 11,
          name: "blouse",
          category_id: 2,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 12,
          name: "socks",
          category_id: 2,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 13,
          name: "handkerchief",
          category_id: 2,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 14,
          name: "pants",
          category_id: 2,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
      ],
    },
    {
      id: 3,
      category_name: "Colored Garments",
      children: [
        {
          id: 15,
          name: "bedsheet",
          category_id: 3,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 16,
          name: "towel",
          category_id: 3,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 17,
          name: "curtain",
          category_id: 3,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 18,
          name: "pillowcase",
          category_id: 3,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 19,
          name: "blanket",
          category_id: 3,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
      ],
    },
    {
      id: 4,
      category_name: "White Garments",
      children: [
        {
          id: 20,
          name: "tshirt",
          category_id: 4,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 21,
          name: "shorts",
          category_id: 4,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 22,
          name: "trousers",
          category_id: 4,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 23,
          name: "jacket",
          category_id: 4,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 24,
          name: "underwear",
          category_id: 4,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 25,
          name: "blouse",
          category_id: 4,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 26,
          name: "socks",
          category_id: 4,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 27,
          name: "handkerchief",
          category_id: 4,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
        {
          id: 28,
          name: "pants",
          category_id: 4,
          created_at: "2023-06-24T06:37:42.000000Z",
          updated_at: "2023-06-24T06:37:42.000000Z",
        },
      ],
    },
  ];

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchOrderDetail = () => {
    setLoading(true);
    Http.get(`/order-details/${orderId}`)
      .then((res) => {
        if (res.data) {
          setOrderDetails(res.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // const fetchConsumables = () => {
  //   Http.get("/consumables")
  //     .then((res) => {
  //       if (res.data) {
  //         setComsumables(res.data);
  //       }
  //     })
  //     .then((err) => {
  //       console.log(err.message);
  //     });
  // };

  const handleUpdateDetails = () => {
    setLoading(true);
    Http.put(`/orders/update-details/${orderId}`, formValues).then((res) => {
      setLoading(false);
      ToastNotification("success", "Order detail updated!", toastOptions);
    });
  };

  const handleUpdateOrderDetails = (data) => {
    setLoadingOnSubmit(true);
    const formData = new FormData();
    formData.append("category", data);
    Http.post(
      `/update/order-details/${selectedDetails.category_id}/${selectedDetails.id}`,
      formData
    )
      .then((res) => {
        if (res.data.status === 200) {
          setOpenTextEditor(false);
          onClose();
          ToastNotification("success", res.data.message, toastOptions);
        } else {
          ToastNotification("error", res.data.message, toastOptions);
        }
        setLoadingOnSubmit(false);
      })
      .catch((err) => {
        setLoadingOnSubmit(false);

        ToastNotification("error", err.message, toastOptions);
      });
  };

  const handleUpdateProfile = () => {
    setLoadingOnSubmit(true);
    Http.post(`/update/profile/${orderDetails.order.profile_id}`, formValues)
      .then((res) => {
        if (res.data.status === 200) {
          onClose();
          ToastNotification("success", res.data.message, toastOptions);
        } else {
          ToastNotification("error", res.data.message, toastOptions);
        }
        setLoadingOnSubmit(false);
      })
      .catch((err) => {
        setLoadingOnSubmit(false);
        ToastNotification("error", err.message, toastOptions);
      });
  };
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const tableStyle = {
    textAlign: "right",
  };

  const handleAddMoreCategories = () => {
    setOpenAddMoreCategories(true);
  };

  const handleSelectDetails = (data) => {
    setSelectedDetails(data);
    setOpenTextEditor(true);
  };

  return (
    <div>
      <ToastNotificationContainer />
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="card-header">
          <Box className="d-flex justify-content-between align-items-center">
            <Typography>Edit Order</Typography>
            <IconButton color="error" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{ width: "100%", typography: "body1" }}
            className="card-body"
          >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChangeTab}>
                  <Tab label="Details" value="1" />
                  <Tab label="Payment" value="3" />
                  <Tab label="Status" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {/* {loading && <LinearProgress />} */}
                <main className="mt-3">
                  <section className="card">
                    <div className="card-header bg-primary bg-gradient text-light">
                      <h3 className="m-0">CUSTOMER PROFILE</h3>
                      {/* {loading && <LinearProgress />} */}
                    </div>
                    <div className="card-body">
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "95%" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id=""
                          label="Transaction #"
                          variant="standard"
                          value={formValues.trans_number || ""}
                          onChange={handleChange}
                          name="trans_number"
                          disabled
                        />
                        <Box className={"d-flex"}>
                          <TextField
                            id=""
                            label="First Name"
                            variant="standard"
                            value={formValues.first_name || ""}
                            onChange={handleChange}
                            name="first_name"
                            className="flex-fill"
                          />
                          <TextField
                            id=""
                            label="Last Name"
                            variant="standard"
                            value={formValues.last_name || ""}
                            onChange={handleChange}
                            name="last_name"
                            className="flex-fill"
                          />
                        </Box>
                        <Box className={"d-flex"}>
                          <TextField
                            className="flex-fill"
                            id=""
                            label="Purok"
                            variant="standard"
                            value={formValues.purok || ""}
                            onChange={handleChange}
                            name="purok"
                          />
                          <TextField
                            className="flex-fill"
                            id=""
                            label="Barangay"
                            variant="standard"
                            value={formValues.brgy || ""}
                            onChange={handleChange}
                            name="brgy"
                          />
                          <TextField
                            className="flex-fill"
                            id=""
                            label="Municipality"
                            variant="standard"
                            value={formValues.municipality || ""}
                            onChange={handleChange}
                            name="municipality"
                          />
                          <TextField
                            className="flex-fill"
                            id=""
                            label="Landmark"
                            variant="standard"
                            value={formValues.land_mark || ""}
                            onChange={handleChange}
                            name="land_mark"
                          />
                        </Box>
                        <TextField
                          className="flex-fill"
                          id=""
                          label="Contact #"
                          variant="standard"
                          value={formValues.contact_number || ""}
                          onChange={handleChange}
                          name="contact_number"
                        />
                      </Box>
                    </div>
                    <div className="card-footer">
                      <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={handleUpdateProfile}
                        className="py-1 px-5"
                        // fullWidth
                        disabled={loadingOnSubmit}
                      >
                        {loadingOnSubmit ? (
                          <CircularProgress size={24} />
                        ) : (
                          " Update Profile"
                        )}
                      </Button>
                    </div>
                  </section>
                </main>
                <Divider className="mt-3" />
                <main className="mt-3">
                  <section className="card">
                    <div className="card-header bg-primary bg-gradient text-light">
                      <h3 className="m-0">ORDER DETAILS</h3>
                      {/* {loading && <LinearProgress />} */}
                    </div>
                    <div className="card-body">
                      {orderDetails?.orderItems?.length <= 0 && (
                        <Typography>No Items</Typography>
                      )}

                      {orderDetails?.orderItems?.length > 0 &&
                        orderDetails?.orderItems.map((item, i) => (
                          <Box
                            key={i}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography>{item.name}</Typography>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.items_breakdown,
                                }}
                              />
                            </Box>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{ height: 30 }}
                              onClick={() => handleSelectDetails(item)}
                            >
                              Edit
                            </Button>
                          </Box>
                        ))}
                    </div>
                    <div className="card-footer">
                      <Button
                        size="small"
                        color="success"
                        variant="contained"
                        onClick={handleAddMoreCategories}
                        className="py-1 px-5 mr-3"
                        style={{ marginRight: "15px" }}
                        // fullWidth
                      >
                        Add More Items
                      </Button>
                      {/* <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={handleUpdateDetails}
                        className="py-1 px-5"
                        // fullWidth
                      >
                        Update Order Details
                      </Button> */}
                    </div>
                  </section>
                </main>

                <Divider className="mt-3" />
                <main className="mt-3">
                  {/* {orderDetails.consumables?.length <= 0 && (
                    <Box>
                      <Typography>No Item</Typography>
                    </Box>
                  )} */}
                  <section className="card">
                    <div className="card-header bg-primary bg-gradient text-light">
                      <h3 className="m-0">CONSUMABLES</h3>
                      {/* {loading && <LinearProgress />} */}
                    </div>
                    <div className="card-body">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Amount</th>
                            <th scope="col">Item</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row" style={tableStyle}>
                              500
                            </th>
                            <td>Consumables: Downy</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <div className="card-footer">
                    <Button
                      size="small"
                      color="success"
                      variant="contained"
                      onClick={() => setOpenConsumables(true)}
                      className="py-1 px-5 mr-3"
                      style={{ marginRight: "15px" }}
                      // fullWidth
                    >
                      Add More Items
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      variant="contained"
                      onClick={handleUpdateDetails}
                      className="py-1 px-5"
                      // fullWidth
                    >
                      Update Consumables
                    </Button>
                  </div>
                </main>
              </TabPanel>
              <TabPanel value="3" sx={{ padding: "15px 5px" }}>
                <OrderPayments order={order} orderDetails={orderDetails} />
              </TabPanel>
              <TabPanel value="4" sx={{ padding: "15px 5px" }}>
                <OrderStatus order={order} onClose={onClose} />
              </TabPanel>
            </TabContext>
          </Box>
          <AddMoreCategories
            open={openAddMoreCategories}
            onClose={() => setOpenAddMoreCategories(false)}
            orderItems={orderDetails?.orderItems}
            categories={orderDetails?.categories}
            order={order}
          />
          <ReactTextEditor
            open={openTextEditor}
            onClose={() => setOpenTextEditor(false)}
            data={selectedDetails}
            placeholder={selectedDetails?.name}
            onConfirm={(data) => handleUpdateOrderDetails(data)}
            loading={loadingOnSubmit}
          />
          <AddConsumables
            open={openConsumables}
            onClose={() => setOpenConsumables(false)}
            // consumables={consumables}
            order={order}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
