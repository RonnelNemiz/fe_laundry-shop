import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AboutCms from './components/AboutCms';
import ContactCms from './components/ContactCms';
import HomeCms from './components/HomeCms';
import ServiceCms from './components/ServicesCms';


export default function CmsTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="About" value="1" />
            <Tab label="Contact" value="2" />
			<Tab label="Home" value="3" />
			<Tab label="Service" value="4" />
    
          </TabList>
        </Box>
        <TabPanel value="1">
			<AboutCms />
		</TabPanel>
        <TabPanel value="2">
			<ContactCms />
		</TabPanel>      
		<TabPanel value="3">
			<HomeCms />
		</TabPanel>
		<TabPanel value="4">
			<ServiceCms />
		</TabPanel>
   
      </TabContext>
    </Box>
  );
}