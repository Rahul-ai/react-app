import React from "react";
import { FormLabel, FormSelect } from "react-bootstrap";
import { Col, FormControl, FormGroup } from "react-bootstrap";
import { FileUpload } from "../FileUpload/FileUpload";
import { formInterface } from "./formInterface";

interface FormClass {
    field: formInterface,
    onChange: React.ChangeEvent<HTMLFormElement> | any,
    data:any
    condition?:any
};

export class Form extends React.Component<FormClass>{

    renderLabel = (field: formInterface) => {
        return <FormLabel>{field.name}
            {field.require ? <span style={{ color: 'rgb(240, 68, 56)' }}>*</span> : ''}
        </FormLabel>
    };

    render() {
        let params = this.props;
        var formdata:any;
        switch (this.props.field.type) {
            case "password":
                formdata = <Col md={params.field.md || 4}>
                    <FormGroup controlId={params.field.key}>
                        {this.renderLabel(params.field)}
                        <FormControl type="password" 
                            onChange={(e: any) => { params.onChange(params.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>
                break;

            case "number":
                formdata =  <Col md={params.field.md || 4}>
                    <FormGroup controlId={params.field.key}>
                        {this.renderLabel(params.field)}
                        <FormControl type="number" value={params?.data}
                            onChange={(e: any) => {params.onChange(params.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>  
                break; 
                
                case "select":
                    formdata =  <Col md={params.field.md || 4}>
                        <FormGroup controlId={params.field.key}>
                            {this.renderLabel(params.field)}
                            <FormSelect value={params?.data}
                                onChange={(e: any) => { params.onChange(params.field.key, e.target.value) }} >
                                    <option>Please Select</option>
                                    {params.field.options?.map((option)=>{
                                       return <option value={option}>{option}</option>
                                    })}
                            </FormSelect>
                        </FormGroup>
                        {/* {renderError(errors[field.key])} */}
                    </Col>             
                    break; 
            
            case "email":
                formdata =  <Col md={params.field.md || 4}>
                    <FormGroup controlId={params.field.key}>
                        {this.renderLabel(params.field)}
                        <FormControl type="email" value={params?.data}
                            onChange={(e: any) => { params.onChange(params.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>
                break;

            case "textarea":
                formdata =  <Col md={params.field.md || 4}>
                    <FormGroup controlId={params.field.key}>
                        {this.renderLabel(params.field)}
                        <FormControl type="textarea" value={params?.data}
                            onChange={(e: any) => { params.onChange(params.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>
                break;

            case "text":
                formdata =  <Col md={params.field.md || 4}>
                    <FormGroup controlId={params.field.key}>
                        {this.renderLabel(params.field)}
                        <FormControl type="text" value={params?.data}
                            onChange={(e: any) => { params.onChange(params.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>
                break;

            case "fileUpload":
                formdata =  <FileUpload value={params?.data[params?.field?.key]} />
                break;

            default:
                formdata =  <Col md={params.field.md || 4}>
                    <FormGroup controlId={params.field.key}>
                        {this.renderLabel(params.field)}
                        <FormControl type="text" value={params?.data}
                            onChange={(e: any) => { params.onChange(params.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>
        }
        if(params.field.condition)
        console.log(params?.condition);

        if(params.field.condition && params?.field.key !== params.condition) {
            formdata = <FormControl type="hidden" hidden
                onChange={event => params.onChange(params.field.key, event.target.value)}
                placeholder="" />
        }
        return formdata;
    }
};