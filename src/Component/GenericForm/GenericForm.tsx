import { formInterface } from "../../Helpers/Form/formInterface";
import { Form } from "../../Helpers/Form/form";

export const GenericForm = (config:formInterface[],onChange:any) =>{
    return config.map((field:any,index)=>{ return <Form onChange={onChange} key={index} field={field}/>; })
}