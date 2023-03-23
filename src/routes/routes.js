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
    path: "/dashboard",
    component: "modules/private/dashboard/Dashboard",
    auth: true,
  },
  {
    path: "/orders",
    component: "modules/private/orders/Orders",
    auth: true,
  },
  {
    path: "/settings",
    component: "modules/private/settings/Settings",
    auth: true,
  },
  {
    path: "/customers",
    component: "modules/private/customer/Customers",
    auth: true,
  },
  {
    path: "/reports",
    component: "modules/private/reports/Reports",
    auth: true,
  },
  {
    path: "/sms",
    component: "modules/private/sms/SMS",
    auth: true,
  },
  {
    path: "/reviews",
    component: "modules/private/reviews/Reviews",
    auth: true,
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
    path: "/about",
    component: "modules/public/About",
  },
  {
    path: "/services",
    component: "modules/public/Services",
  },
  {
    path: "/dashboard",
    component: "modules/private/dashboard/Dashboard",
    auth: true,
  },
  {
    path: "/orders",
    component: "modules/private/orders/Orders",
    auth: true,
  },
  {
    path: "/settings",
    component: "modules/private/settings/Settings",
    auth: true,
  },
  {
    path: "/customers",
    component: "modules/private/customer/Customers",
    auth: true,
  },
  {
    path: "/reports",
    component: "modules/private/reports/Reports",
    auth: true,
  },
  {
    path: "/sms",
    component: "modules/private/sms/SMS",
    auth: true,
  },
  {
    path: "/reviews",
    component: "modules/private/reviews/Reviews",
    auth: true,
  },
];

export default routes;
