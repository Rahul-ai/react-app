import { formInterface } from "../../Helpers/Form/formInterface";
import { Form } from "../../Helpers/Form/form";

export const GenericForm = (config:formInterface[]) =>{
    return config.map((field:any,index)=>{ return <Form key={index} field={field}/>; })
}