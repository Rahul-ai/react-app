import { formInterface } from "./formInterface";
import { Form } from "./form";

export const GenericForm = (config:formInterface[],onChange:any) =>{
    return config.map((field:any,index)=>{ return <Form onChange={onChange} key={index} field={field}/>; })
}