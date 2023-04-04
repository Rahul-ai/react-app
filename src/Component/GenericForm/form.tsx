import React from "react";
import { FormLabel, FormSelect } from "react-bootstrap";
import { Col, FormControl, FormGroup } from "react-bootstrap";
import { FileUpload } from "../FileUpload/FileUpload";
import { formInterface } from "./formInterface";

interface FormClass {
    field: formInterface,
    onChange: React.ChangeEvent<HTMLFormElement> | any,
    data:any
};

export class Form extends React.Component<FormClass>{

    renderLabel = (field: formInterface) => {
        return <FormLabel>{field.name}
            {field.require ? <span style={{ color: 'rgb(240, 68, 56)' }}>*</span> : ''}
        </FormLabel>
    };

    render() {
        let params = this.props;
        switch (this.props.field.type) {
            case "password":
                return <Col md={params.field.md || 4}>
                    <FormGroup controlId={params.field.key}>
                        {this.renderLabel(params.field)}
                        <FormControl type="password" 
                            onChange={(e: any) => { params.onChange(params.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>

            case "number":
                return <Col md={params.field.md || 4}>
                    <FormGroup controlId={params.field.key}>
                        {this.renderLabel(params.field)}
                        <FormControl type="number" value={params?.data[params?.field?.key]}
                            onChange={(e: any) => {params.onChange(params.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>   
                
                case "select":
                    return <Col md={params.field.md || 4}>
                        <FormGroup controlId={params.field.key}>
                            {this.renderLabel(params.field)}
                            <FormSelect value={params?.data[params?.field?.key]}
                                onChange={(e: any) => { params.onChange(params.field.key, e.target.value) }} >
                                    <option>Please Select</option>
                                    {params.field.options?.map((option)=>{
                                       return <option value={option}>{option}</option>
                                    })}
                            </FormSelect>
                        </FormGroup>
                        {/* {renderError(errors[field.key])} */}
                    </Col>              
            
            case "email":
                return <Col md={params.field.md || 4}>
                    <FormGroup controlId={params.field.key}>
                        {this.renderLabel(params.field)}
                        <FormControl type="email" value={params?.data[params?.field?.key]}
                            onChange={(e: any) => { params.onChange(params.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>


            case "textarea":
                return <Col md={params.field.md || 4}>
                    <FormGroup controlId={params.field.key}>
                        {this.renderLabel(params.field)}
                        <FormControl type="textarea" value={params?.data[params?.field?.key]}
                            onChange={(e: any) => { params.onChange(params.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>

            case "text":
                return <Col md={params.field.md || 4}>
                    <FormGroup controlId={params.field.key}>
                        {this.renderLabel(params.field)}
                        <FormControl type="text" value={params?.data[params?.field?.key]}
                            onChange={(e: any) => { params.onChange(params.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>

            case "fileUpload":
                return <FileUpload value={params?.data[params?.field?.key]} />

            default:
                return <Col md={params.field.md || 4}>
                    <FormGroup controlId={params.field.key}>
                        {this.renderLabel(params.field)}
                        <FormControl type="text" value={params?.data[params?.field?.key]}
                            onChange={(e: any) => { params.onChange(params.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>
        }
    }
};