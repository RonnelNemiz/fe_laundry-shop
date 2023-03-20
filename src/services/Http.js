import axios from "axios";

export const Https = axios.create();

Http.defaults.baseURL = process.env.REACT_APP_API_DOMAIN;
Http.defaults.headers.common["Accept"] = "application/json";
Http.defaults.headers.common["Content-Type"] = "application/json";
Http.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
	"access_token",
)}`;

Http.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.message === "Network Error") {
			return Promise.reject(error);
		}

		switch (error.response && error.response.status) {
			case 401:
				localStorage.removeItem("access_token");
				window.location.href = "/login";
				break;
			default:
				break;
		}

		return Promise.reject(error);
	},
);

export default Http;
