import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { useHistory, useLocation } from "react-router-dom";
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SmsIcon from '@mui/icons-material/Sms';
import SettingsIcon from '@mui/icons-material/Settings';

function Sidebar() {
	const history = useHistory();
	const location = useLocation();

	const links = [
		{
			path: "/dashboard",
			label: "Dashboard",
			icon: <DashboardIcon />,
		},
		{
			path: "/customers",
			label: "Customers",
			icon: <PersonIcon />,
		},
		{
			path: "/orders",
			label: "Orders",
			icon: <ShoppingCartIcon />,
		},
		{
			path: "/reports",
			label: "Reports",
			icon: <AssessmentIcon />,
		},
		{
			path: "/reviews",
			label: "Reviews",
			icon: <ReviewsIcon />,
		},
		{
			path: "/sms",
			label: "Sms",
			icon: <SmsIcon/>,
		},
		{
			path: "/settings",
			label: "Settings",
			icon: <SettingsIcon />,
		},
	];

	const handleNavigate = (url) => {
		history.push(url);
	};

	return (
		<div>
			<List>
				{links.map((link, index) => (
					<ListItem
						sx={{
							display: "block",
							"& .Mui-selected": {
								backgroundColor: "darkgray",
							},
							"&:hover .Mui-selected": {
								backgroundColor: "darkgray",
							},
						}}
						key={index}
						disablePadding>
						<ListItemButton
							onClick={() => handleNavigate(link.path)}
							selected={link.path === location.pathname}>
							<ListItemIcon sx={{ color: "#0E4C91" }}>{link.icon}</ListItemIcon>
							<ListItemText primary={link.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	);
}

export default Sidebar;
