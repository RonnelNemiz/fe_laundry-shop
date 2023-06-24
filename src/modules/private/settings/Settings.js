import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CMS from "./cms/CMS";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import Http from "../../../services/Http";
import ToastNotification from "../../../components/ToastNotification";
import { handleErrorResponse } from "../../../utils/helpers";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function LabTabs() {
  const [value, setValue] = useState("1");
  const [checked, setChecked] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSwitchChange = () => {
    setChecked((prevChecked) => !prevChecked);
    updateSetting(!checked);
  };

  const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    draggable: true,
    draggableDirection: 60,
    theme: "colored",
  };

  const updateSetting = (newValue) => {
    Http.put(`/settings/sms/${newValue}`)
      .then((res) => {
        if (res.data.status === 200) {
          ToastNotification("success", "Settings Saved!", options);
        } else {
          ToastNotification("error", res.data.message, options);
        }
      })
      .catch((err) => {
        ToastNotification("error", handleErrorResponse(err), options);
      });
  };

  useEffect(() => {
    fetchSMSStatus();
  }, []);

  const fetchSMSStatus = () => {
    Http.get("/settings/sms/")
      .then((res) => {
        if (res.data.status === 200) {
          const smsStatus = res.data.sms_status.value === "true";
          setChecked(smsStatus);
        }
      })
      .catch((err) => {
        ToastNotification("error", handleErrorResponse(err), options);
      });
  };

  console.log("SMS Value: ", checked);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <ToastContainer />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Settings Tabs">
            <Tab label="CMS" value="1" />
            <Tab label="SMS" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CMS />
        </TabPanel>
        <TabPanel value="2">
          <p className="m-0">Send SMS Notifications?</p>
          <Switch
            checked={checked}
            onChange={handleSwitchChange}
            label="SMS Notification"
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
