export const isAuth = () => {
  return !!localStorage.getItem("access_token");
};

export const isCustomer = () => {
  const role = localStorage.getItem("role");
  if (role === "Customer") {
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("access_token");
  window.location.href = "/";
};

export const handleErrorResponse = (err) => {
  if (
    err &&
    err.response &&
    err.response.data &&
    err.response.data &&
    err.response.data.errors
  ) {
    const message = [];
    for (const key in err.response.data.errors) {
      message.push(err.response.data.errors[key][0]);
    }
    return message.join(" ");
  }
  return (
    (err && err.response && err.response.data && err.response.data.message) ||
    err.message
  );
};
