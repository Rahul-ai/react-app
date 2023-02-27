import React from "react";
import { Col, FormControl, FormGroup } from "react-bootstrap";
import { FileUpload } from "../../Component/FileUpload/FileUpload";
import { formInterface } from "./formInterface";

export class Form extends React.Component<{field: formInterface}> {
    renderLabel = (field:formInterface) => {
        return <>{field.name}
        {field.require ? <span style={{color:'rgb(240, 68, 56)'}}>*</span> : ''}
        </>
    };

    render(){
    switch (this.props.field.type) {
        case "password":
            return <Col md={4}><FormGroup controlId={this.props.field.key}>
            {/* {renderLabel(field)} */}
            <FormControl type="password" />
            </FormGroup>  
        {/* {renderError(errors[field.key])} */}
        </Col>

        case "text":
           return <Col md={4}><FormGroup controlId={this.props.field.key}>
            {/* {renderLabel(field)} */}
            <FormControl type="text" />
            </FormGroup>  
        {/* {renderError(errors[field.key])} */}
        </Col>

        case "fileUpload":
            return <><FileUpload /></>

        default:
            return <Col md={4}><FormGroup controlId={this.props.field.key}>
            {/* {renderLabel(field)} */}
            <FormControl type="text" />
            </FormGroup>  
        {/* {renderError(errors[field.key])} */}
        </Col>
    }
}
};