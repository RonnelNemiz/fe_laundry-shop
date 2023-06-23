import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import DashboardCustomizeIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory, useLocation } from "react-router-dom";
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import "../../assets/css/admin.css";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import UsersIcon from '@mui/icons-material/Person2';
import ServicesIcon from '@mui/icons-material/CleaningServices';
import HandlingIcon from '@mui/icons-material/LocalShipping';
import PaymentMethodIcon from '@mui/icons-material/Payments';
import ConsumablesIcon from '@mui/icons-material/ShopTwo';

function Sidebar() {
	const history = useHistory();
	const location = useLocation();

	const links = [
		{
			path: "/dashboard",
			label: "Dashboard",
			icon: <DashboardCustomizeIcon />,
		},
		{
			path: "/admin/customers",
			label: "Customers",
			icon: <PeopleIcon />,
		},
		{
			path: "/admin/orders",
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
			path: "/users",
			label: "Users",
			icon: <UsersIcon />,
		},
		{
			path: "/services",
			label: "Services",
			icon: <ServicesIcon />,
		},
		{
			path: "/handling",
			label: "Handling",
			icon: <HandlingIcon />,
		},
		{
			path: "/payment-methods",
			label: "Payment Methods",
			icon: <PaymentMethodIcon />,
		},
		{
			path: "/consumables",
			label: "Consumables",
			icon: <ConsumablesIcon />,
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
						disablePadding className="sidebarItem">
						<ListItemButton
							onClick={() => handleNavigate(link.path)}
							selected={link.path === location.pathname}>
							<ListItemIcon sx={{ color: "#0E4C91", marginLeft: "8px" }}>{link.icon}</ListItemIcon>
							<ListItemText primary={link.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	);
}

export default Sidebar;
