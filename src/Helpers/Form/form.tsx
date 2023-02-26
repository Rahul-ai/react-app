import { FileUpload } from "../../Component/FileUpload/FileUpload";
import { formInterface } from "./firmInterface";

export const Form = (field:formInterface) =>{
switch(field.type){
    case "password":
    return <><input type="password" required /></>

    case "text":
    return <><input type="text" required /></>

    case "fileUpload":
    return <><FileUpload /></>

    default:
    return <><input type="password" required /></>   
}
};