const routes = [
  {
    path: "/",
    component: "modules/public/Home",
  },
  {
    path: "/about",
    component: "modules/public/About",
  },
  {
    path: "/contact",
    component: "modules/public/Contact",
  },
  {
    path: "/services",
    component: "modules/public/Services",
  },

  {
    path: "/order",
    component: "modules/public/orderfe/Order",
  },

  {
    path: "/dashboard",
    component: "modules/private/dashboard/Dashboard",
    auth: true,
    role: "Admin, Staff, Delivery Boy",
  },
  {
    path: "/admin/orders",
    component: "modules/private/orders/Orders",
    auth: true,
    role: "Admin, Staff, Delivery Boy",
  },
  {
    path: "/sms",
    component: "modules/private/sms/SMS",
    auth: true,
    role: "Admin, Staff",
  },
  {
    path: "/reviews",
    component: "modules/private/reviews/page/Reviews",
    auth: true,
    role: "Admin",
  },
  {
    path: "/login",
    component: "modules/public/auth/Login",
  },
  {
    path: "/register",
    component: "modules/public/auth/Register",
  },
  {
    path: "/home",
    component: "modules/public/Home",
  },
  {
    path: "/settings",
    component: "modules/private/settings/Settings",
    auth: true,
    role: "Admin",
  },
  {
    path: "/admin/customers",
    component: "modules/private/customer/page/Customers",
    auth: true,
    role: "Admin, Staff",
  },
  {
    path: "/reports",
    component: "modules/private/reports/page/Reports",
    auth: true,
    role: "Admin",
  },
  {
    path: "/sales",
    component: "modules/private/reports/sales/Sales",
    auth: true,
    role: "Admin",
  },
  {
    path: "/expenditures",
    component: "modules/private/reports/expenditures/Expenditures",
    auth: true,
    role: "Admin",
  },
  {
    path: "/admin/services",
    component: "modules/private/settings/services/Services",
    auth: true,
    role: "Admin",
  },
  {
    path: "/admin/users",
    component: "modules/private/settings/users/pages/Users",
    auth: true,
    role: "Admin",

  },
  {
    path: "/admin/handling",
    component: "modules/private/settings/handling/Handling",
    auth: true,
    role: "Admin",
  },
  {
    path: "/admin/paymentMethod",
    component: "modules/private/settings/paymentMethod/PaymentMethod",
    auth: true,
    role: "Admin",
  },
];
export default routes;
