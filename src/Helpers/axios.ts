import { Axios, AxiosRequestConfig, AxiosRequestHeaders, RawAxiosRequestHeaders } from "axios"
import { json } from "stream/consumers";
import { Api_url } from "./config";


export const axios = (auth: boolean = true, multi: boolean = false) => {
    
    const Accept = 'application/json';
    const header: Partial<RawAxiosRequestHeaders> = {
        Accept: Accept,
    }

    if (auth) {
        let Authorization = `Bearer sdsddfdsfdsfds`; // through storage
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
            let d = await axios(false,true).post("/upload", data);
            if(d.statusText === 'OK') return JSON.parse(d.data);

            throw new Error(d.status.toString());
        }
        catch (error) {
             console.log(error);
        }
    },

    logIn: async(params:Map<string,any>)=>{
        try {
            let d = await axios(false);
            return d;
        }
        catch (error) {
            return error;
        }
    }
}