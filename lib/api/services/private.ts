import axios from "axios";
// import {
//   handleError,
//   handleSuccess,
// } from "./interceptors/shared/responseInterceptor";
// import requestInterceptor from "./interceptors/private/request.interceptor";
import { SERVER_URL_GUEST_NODE } from "@/constants/links.constants";

const privateApi = axios.create({
  baseURL: SERVER_URL_GUEST_NODE + "/api/",
  withCredentials: true,
});

// privateApi.interceptors.request.use((config) => requestInterceptor(config));
// privateApi.interceptors.response.use(handleSuccess, handleError);

export default privateApi;
