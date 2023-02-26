import { formInterface } from "../../Helpers/Form/firmInterface";
import { Form } from "../../Helpers/Form/form";

export const GenericForm = (config:formInterface[]) =>{
    return config.map((field:any)=>{ return Form(field); })
}