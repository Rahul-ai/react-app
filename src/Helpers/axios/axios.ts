import { Axios, AxiosRequestConfig, RawAxiosRequestHeaders } from "axios"
import { Api_url } from "../config/config";

export const axios = (auth: boolean = true, multi: boolean = false) => {

    const Accept = '*/*';
    const header: Partial<RawAxiosRequestHeaders> = {
        "Content-Type":'application/json',
        Accept: Accept,
    }

    if (auth) {
        let Authorization = `Bearer sdsddfdsfdsfds`; // through storage
        header.Authorization = Authorization;
    }

    if (multi) {
        header["Content-Type"] = 'multipart/form-data';
    }
    console.log(header)
    const axiosConfig: AxiosRequestConfig = {
        baseURL: Api_url,
        headers: header
    }

    const axios = new Axios(axiosConfig);
    return axios;
}

export const Api = {
    upload: async (data: FormData) => {
        try {
            let d = await axios(false, true).patchForm("/upload", data);
            if (d.statusText === 'OK') return result(d.data);
            throw errors(d.status);
        }
        catch (error) {
            console.log(error);
        }
    },

    logIn: async (body: Map<string,any>) => {
        try {
            let d = await axios(false).post("/login",request(body));
            if (d.statusText === 'OK') return result(d.data);
            throw errors(d.status);
        }
        catch (error) {
            return error;
        }
    }
}

const errors = (error: any) => { return new Error(error.toString()); };
const result = (data: any) => { return JSON.parse(data); };
const request = (data: any) => { return JSON.stringify(data);};