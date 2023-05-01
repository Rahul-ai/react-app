import { useEffect, useState } from "react";                                                                                                                                                                                                                                                                                                                                                                                                                
import { Form, Button, Row, Container,Col } from "react-bootstrap";
import { GenericForm } from "../../Component/GenericForm/GenericForm";
import { Api } from "../../Helpers/axios/axios";
import { formInterface } from "../../Component/GenericForm/formInterface";
import { useNavigate,useParams } from "react-router-dom";

export const QueryGenerator = (props:any) =>{
    const config = props.queryRef;
    const data:any = [];
    console.log(props.qChange);
    return <Container>
      <Row style={{ width:500,height:50}}>
        {GenericForm(config, props.qChange, data)}
        <Col md={12}>
        </Col>
      </Row>
  </Container>
}