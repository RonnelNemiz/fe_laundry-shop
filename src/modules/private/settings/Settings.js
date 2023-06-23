import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Services from "../dashServices/pages/Services";
import CMS from "./cms/CMS";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
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
        <TabPanel value="2">SMS Settings</TabPanel>
      </TabContext>
    </Box>
  );
}
