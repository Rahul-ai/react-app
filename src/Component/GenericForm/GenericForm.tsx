import { formInterface } from "./formInterface";
import { Form } from "./form";

export const GenericForm = (config:formInterface[],onChange:any,data:any = {}) =>{
    return config.map((field:any,index)=>{ return <Form data={data[field.key]} condition={data[field.condition]} 
    onChange={onChange} key={index} field={field}/>; })
}