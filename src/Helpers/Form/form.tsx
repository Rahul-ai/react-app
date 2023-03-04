import React from "react";
import { FormLabel, FormSelect } from "react-bootstrap";
import { Col, FormControl, FormGroup } from "react-bootstrap";
import { FileUpload } from "../../Component/FileUpload/FileUpload";
import { formInterface } from "./formInterface";

interface FormClass {
    field: formInterface,
    onChange: React.ChangeEvent<HTMLFormElement> | any,
};

export class Form extends React.Component<FormClass>{

    renderLabel = (field: formInterface) => {
        return <FormLabel>{field.name}
            {field.require ? <span style={{ color: 'rgb(240, 68, 56)' }}>*</span> : ''}
        </FormLabel>
    };

    render() {
        switch (this.props.field.type) {
            case "password":
                return <Col md={4}>
                    <FormGroup controlId={this.props.field.key}>
                        {this.renderLabel(this.props.field)}
                        <FormControl type="password"
                            onChange={(e: any) => { this.props.onChange(this.props.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>

            case "number":
                return <Col md={4}>
                    <FormGroup controlId={this.props.field.key}>
                        {this.renderLabel(this.props.field)}
                        <FormControl type="number"
                            onChange={(e: any) => { this.props.onChange(this.props.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>   
                
                case "select":
                    return <Col md={4}>
                        <FormGroup controlId={this.props.field.key}>
                            {this.renderLabel(this.props.field)}
                            <FormSelect
                                onChange={(e: any) => { this.props.onChange(this.props.field.key, e.target.value) }} >
                                    <option>Please Select</option>
                                    {this.props.field.options?.map((option)=>{
                                       return <option value={option}>{option}</option>
                                    })}
                            </FormSelect>
                        </FormGroup>
                        {/* {renderError(errors[field.key])} */}
                    </Col>              
            
            case "email":
                return <Col md={4}>
                    <FormGroup controlId={this.props.field.key}>
                        {this.renderLabel(this.props.field)}
                        <FormControl type="email"
                            onChange={(e: any) => { this.props.onChange(this.props.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>


            case "textarea":
                return <Col md={4}>
                    <FormGroup controlId={this.props.field.key}>
                        {this.renderLabel(this.props.field)}
                        <FormControl type="textarea"
                            onChange={(e: any) => { this.props.onChange(this.props.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>

            case "text":
                return <Col md={4}>
                    <FormGroup controlId={this.props.field.key}>
                        {this.renderLabel(this.props.field)}
                        <FormControl type="text"
                            onChange={(e: any) => { this.props.onChange(this.props.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>

            case "fileUpload":
                return <FileUpload />

            default:
                return <Col md={4}>
                    <FormGroup controlId={this.props.field.key}>
                        {this.renderLabel(this.props.field)}
                        <FormControl type="text"
                            onChange={(e: any) => { this.props.onChange(this.props.field.key, e.target.value) }} />
                    </FormGroup>
                    {/* {renderError(errors[field.key])} */}
                </Col>
        }
    }
};