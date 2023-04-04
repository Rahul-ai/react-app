import { Axios, AxiosRequestConfig, RawAxiosRequestHeaders } from "axios"
import { store } from "../../Redux/store/Store";
import { Api_url } from "../config/config";

export const axios = (auth: boolean = true, multi: boolean = false) => {

    const header: Partial<RawAxiosRequestHeaders> = {
        "Content-Type":'application/json',
        Accept: '*/*',
    }

    let Token = store.getState()?.Token;
    if (auth && Token) {
        let Authorization = `Bearer ${Token}`; // through storage
        header.Authorization = Authorization;
    }

    if (multi) {
        header["Content-Type"] = 'multipart/form-data';
    }

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
    },

    post: async (url:any,data: any) => {
        try {
            let d = await axios(false).post(url, request(data));
            if (d.statusText === 'OK') return result(d.data);
            throw errors(d.status);
        }
        catch (error) {
            console.log(error);
        }
    },

   

    put: async (url:string, data: Map<string,any>) => {
        try {
            console.log(data)
            let d = await axios(false).put(url, request(data));
            if (d.statusText === 'OK') return result(d.data);
            throw errors(d.status);
        }
        catch (error) {
            console.log(error);
        }
    },

    get: async (url: any) => {
        try {
            let d = await axios(false).get(url);
            if (d.statusText === 'OK') return result(d.data);
            throw errors(d.status);
        }
        catch (error) {
            console.log(error);
        }
    },

    delete: async (url:string) => {
        try {
            let d = await axios(false).delete(url);
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