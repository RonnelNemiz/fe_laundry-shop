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
    path: "/services",
    component: "modules/public/Services",
  },
  {
    path: "/contact",
    component: "modules/public/Contact",
  },
  {
    path: "/order",
    component: "modules/public/orderfe/Order",
  },
  {
    path: "/dashboard",
    component: "modules/private/dashboard/Dashboard",
    auth: true,
    role: "Admin",
  },
  {
    path: "/orders",
    component: "modules/private/orders/Orders",
    auth: true,
    role: "Admin",
  },
  {
    path: "/settings",
    component: "modules/private/settings/Settings",
    auth: true,
    role: "Admin",
  },
  {
    path: "/customers",
    component: "modules/private/customer/Customers",
    auth: true,
    role: "Admin",
  },
  {
    path: "/reports",
    component: "modules/private/reports/Reports",
    auth: true,
    role: "Admin",
  },
  {
    path: "/sms",
    component: "modules/private/sms/SMS",
    auth: true,
    role: "Admin",
  },
  {
    path: "/reviews",
    component: "modules/private/reviews/Reviews",
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
    path: "/dashboard",
    component: "modules/private/dashboard/Dashboard",
    auth: true,
  },
  {
    path: "/orders",
    component: "modules/private/orders/Orders",
    auth: true,
    role: "Admin",
  },
  {
    path: "/settings",
    component: "modules/private/settings/Settings",
    auth: true,
    role: "Admin",
  },
  {
    path: "/customers",
    component: "modules/private/customer/Customers",
    auth: true,
    role: "Admin",
  },
  {
    path: "/reports",
    component: "modules/private/reports/Reports",
    auth: true,
    role: "Admin",
  },
  {
    path: "/sms",
    component: "modules/private/sms/SMS",
    auth: true,
    role: "Admin",
  },
  {
    path: "/reviews",
    component: "modules/private/reviews/Reviews",
    auth: true,
    role: "Admin",
  },
  {
    path: "/users",
    component: "modules/private/users/Users",
    auth: true,
    role: "Admin",
  },
];

export default routes;
