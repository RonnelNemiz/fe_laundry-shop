import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Services from "./dashServices/pages/Services";
import Users from "./users/pages/Users";
import CMS from "./cms/CMS";
import Handling from "./handling/Handling";
import PaymentMethod from "./paymentMethod/pages/PaymentMethod";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Users" value="1" />
            <Tab label="Services" value="2" />
            <Tab label="Handling" value="3" />
            <Tab label="Payment Method" value="4" />
            <Tab label="CMS" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Users />
        </TabPanel>
        <TabPanel value="2">
          <Services />
        </TabPanel>
        <TabPanel value="3">
          <Handling />
        </TabPanel>
        <TabPanel value="4">
          <PaymentMethod />
        </TabPanel>
        <TabPanel value="5">
          <CMS />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
