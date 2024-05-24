import axios, { AxiosResponse } from "axios";
import { Enviroment } from "../../../environment";
import { addTokenToRequest, handleResponseError } from "./interceptors";


const API = axios.create({
    baseURL: Enviroment.URL_BASE,
    headers: {
        'Accept': 'application/json;version=v1_web',
        'Content-Type': 'application/json'
    }
});

API.interceptors.request.use(addTokenToRequest, (error) => Promise.reject(error));

API.interceptors.response.use(
    (response: AxiosResponse) => response,
    handleResponseError
);

export { API };