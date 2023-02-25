import { Axios, AxiosRequestHeaders } from "axios"
import { Api_url } from "./config";


export const axios = (auth: boolean = true, multi: boolean = true) => {
    const axios = new Axios();
    const Accept = 'application/json';

    const header: Partial<AxiosRequestHeaders> = {
        Accept: Accept,
    }

    if (auth) {
        let Authorization = `Bearer sdsddfdsfdsfds`;
        header.Authorization = Authorization;
    }

    if (multi) {
        header["Content-Type"] = 'multipart/form-data';
    }

    axios.defaults.baseURL = Api_url;
    axios.defaults.headers.common = header;
    return axios;
}

export const Api = {
    upload: async (data: FormData) => {
        try {
            return await axios(false).post("/upload", data);
        }
        catch (error) {
            return error;
        }
    },

    logIn: async(params:Map<string,any>)=>{
        try {
            return await axios(false).post("/upload", params);
        }
        catch (error) {
            return error;
        }
    }
}