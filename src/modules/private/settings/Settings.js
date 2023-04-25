import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Services from './services/Services';
import Users from './users/pages/Users';
import CMS from './cms/CMS';
import Handling from './handling/Handling';
import PaymentMethod from './paymentMethod/PaymentMethod';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Services" value="1" />
            <Tab label="Users" value="2" />
            <Tab label="CMS" value="3" />
			<Tab label="Handling" value="4" />
			<Tab label="Payment Method" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
			<Services />
		</TabPanel>
        <TabPanel value="2">
			<Users />
		</TabPanel>
        <TabPanel value="3">
			<CMS />
		</TabPanel>
		<TabPanel value="4">
			<Handling />
		</TabPanel>
		<TabPanel value="5">
			<PaymentMethod />
		</TabPanel>
      </TabContext>
    </Box>
  );
}