import { Axios, AxiosRequestConfig, AxiosRequestHeaders, RawAxiosRequestHeaders } from "axios"
import { Api_url } from "./config";


export const axios = (auth: boolean = true, multi: boolean = false) => {
    
    const Accept = 'application/json';
    const header: Partial<RawAxiosRequestHeaders> = {
        Accept: Accept,
    }

    if (auth) {
        let Authorization = `Bearer sdsddfdsfdsfds`;
        header.Authorization = Authorization;
    }

    if (multi) {
        header["Content-Type"] = 'multipart/form-data';
    }

    const axiosConfig:AxiosRequestConfig ={
        baseURL:Api_url,
        headers: header
    }

    const axios = new Axios(axiosConfig);
    return axios;
}

export const Api = {
    upload: async (data: FormData) => {
        try {
            // console.log(axios(false,true));
            return await axios(false,true).post("/upload", data);
        }
        catch (error) {
            return error;
        }
    },

    logIn: async(params:Map<string,any>)=>{
        try {
            return await axios(false);
            // .post("/upload", params);
        }
        catch (error) {
            return error;
        }
    }
}