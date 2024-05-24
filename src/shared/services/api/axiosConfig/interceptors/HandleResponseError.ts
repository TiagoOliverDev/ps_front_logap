import { AxiosError } from "axios";

export const handleResponseError = (error: AxiosError) => {
    return Promise.reject(error);
};