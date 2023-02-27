import React from "react";
import { FileUpload } from "../../Component/FileUpload/FileUpload";
import { formInterface } from "./firmInterface";

export class Form extends React.Component<{field: formInterface}> {
    render(){
    switch (this.props.field.type) {
        case "password":
            return <><input type="password" /></>

        case "text":
            return <><input type="text" /></>

        case "fileUpload":
            return <><FileUpload /></>

        default:
            return <><input type="password" /></>
    }
}
};