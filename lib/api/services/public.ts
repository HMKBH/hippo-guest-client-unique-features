import axios from "axios";
// import {
//   handleError,
//   handleSuccess,
// } from "./interceptors/shared/responseInterceptor";
import { SERVER_URL_GUEST_NODE } from "@/constants/links.constants";

const publicApi = axios.create({
  baseURL: "http://localhost:5000/api/",
});

// publicApi.interceptors.response.use(handleSuccess, handleError);

export default publicApi;
